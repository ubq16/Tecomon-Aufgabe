import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateWidget from '../components/CreateWidget';
import ShowWidgets from '../components/ShowWidgets';

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

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const fetchWidgets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/widgets');
      console.log(res.data);
      setWidgets(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Search Cities and Add Widgets</h1>

      <CreateWidget onWidgetAdded={fetchWidgets} />

      <ShowWidgets widgets={widgets} refreshWidgets={fetchWidgets} />
    </div>
  );
}
