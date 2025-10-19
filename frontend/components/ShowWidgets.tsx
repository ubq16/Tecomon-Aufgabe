'use client';

import { useState } from 'react';
import DeleteWidget from './DeleteWidget';
import axios from 'axios';
import weatherInterpretationCode from '../utils/weatherInterpretationCode.json' assert { type: 'json' };;

interface Widget {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  time: string;
  temperature_unit: string;
  temperature: number;
  wind_speed: number;
  wind_speed_unit: string;
  wind_direction: number;
  wind_direction_unit: string;
  weather_code: number;
  is_day: number;
}

interface ShowWidgetsProps {
  widgets: Widget[];
  refreshWidgets: () => void;
}


export default function ShowWidgets({ widgets, refreshWidgets }: ShowWidgetsProps) {
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedWidget) return;
    try {
      await axios.delete(`http://localhost:5000/api/widgets/${selectedWidget._id}`);
      setIsDialogOpen(false);
      refreshWidgets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-6 flex gap-4 flex-wrap">
        {widgets.map(w => {
          const bgColor = w.is_day
            ? 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100'
            : 'bg-gray-700 text-white';
          
          const borderColor = w.is_day ? 'border-gray-200' : 'border-gray-600';
          const timeOfday = w.is_day ? 'day' : 'night';
          const stringWeatherCode = w.weather_code.toString();
          const weatherImage = (weatherInterpretationCode as any)[stringWeatherCode]?.[timeOfday]?.image;
          return (
            <div
              key={w._id}
              className={`rounded-xl p-5 w-60 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 ${bgColor} border ${borderColor}`}
              onClick={() => {
                setSelectedWidget(w);
                setIsDialogOpen(true);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{w.name}</h3>
                {weatherImage && (
                  <img
                    src={weatherImage}
                    alt="weather"
                    className={`w-10 h-10 p-1 rounded-full ${
                      w.is_day ? '' : 'bg-gray-500' 
                    }`}
                  />
                )}
              </div>
              <p className="text-sm">
                Temp:
                {' '}
                <span className={`font-medium ${w.is_day ? 'text-blue-600' : 'text-blue-300'}`}>
                  {w.temperature} {w.temperature_unit}
                </span>
                ,{' '}
                Wind:
                <span className={`font-medium ${w.is_day ? 'text-green-600' : 'text-green-300'}`}>
                  {w.wind_speed} {w.wind_speed_unit}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {selectedWidget && (
        <DeleteWidget
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onDelete={handleDelete}
          widgetName={selectedWidget.name}
        />
      )}
    </>
  );
}
