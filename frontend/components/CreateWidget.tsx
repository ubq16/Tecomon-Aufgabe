import { useState } from 'react';
import axios from 'axios';
import cities from '../utils/cities.json';

interface CreateWidgetProps {
  onWidgetAdded: () => void;
}

export default function CreateWidget({ onWidgetAdded }: CreateWidgetProps) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<null | { name: string; lat: number; lng: number }>(null);
  const [filteredCities, setFilteredCities] = useState<typeof cities>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 10)); 
    } else {
      setFilteredCities([]);
    }
  };

  const handleSelectCity = (city: { name: string; lat: number; lng: number }) => {
    setSelectedCity(city);
    setSearch(city.name);
    setFilteredCities([]);
  };

  const addWidget = async () => {
    if (!selectedCity) return;

    try {
      const resp = await axios.post('http://localhost:5000/api/widgets', {
        name: selectedCity.name,
        location: {
            latitude: selectedCity.lat,
            longitude: selectedCity.lng
        }
      });
      
      setSearch('');
      setSelectedCity(null);
      onWidgetAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Enter city"
        className="border rounded p-2 w-full"
      />
      {filteredCities.length > 0 && (
        <ul className="absolute border bg-white w-full max-h-60 overflow-auto z-10">
          {filteredCities.map(city => (
            <li
              key={`${city.name}-${city.coords.lat}-${city.coords.lon}`}
              onClick={() => handleSelectCity({ name: city.name, lat: parseFloat(city.coords.lat), lng: parseFloat(city.coords.lon) })}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={addWidget}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>
  );
}
