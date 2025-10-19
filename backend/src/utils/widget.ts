import NodeCache from 'node-cache';
import  axios from 'axios';
import { Location } from '../types/widget';
const cache = new NodeCache({ stdTTL: 300 });

export async function getCachedData(_id: string, name: string, coordinates: [number, number]): Promise<Location> {
  const cached : Location | undefined = cache.get(coordinates[1] + ',' + coordinates[0]);
  if (cached) {
    console.log(`Return data from cache for ${coordinates[1]},${coordinates[0]}`);
    return cached;
  }
  console.log(`Fetching new data for ${coordinates[1]},${coordinates[0]}`);
  const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: coordinates[1],
      longitude: coordinates[0],
      current_weather: true
    }
  });

  const data: Location = {
    _id,
    name,
    latitude: response.data.latitude,
    longitude: response.data.longitude,
    timezone: response.data.timezone,
    time: response.data.current_weather.time,
    temperature_unit: response.data.current_weather_units.temperature,
    temperature: response.data.current_weather.temperature,
    wind_speed: response.data.current_weather.windspeed,
    wind_speed_unit: response.data.current_weather_units.windspeed,
    wind_direction: response.data.current_weather.winddirection,
    wind_direction_unit: response.data.current_weather_units.winddirection,
    weather_code: response.data.current_weather.weathercode,
    is_day: response.data.current_weather.is_day
  }

  cache.set(coordinates[1] + ',' + coordinates[0], data);

  return data;
}

export async function removeKeyFromCache(coordinates: [number, number]){
  return cache.del(coordinates[1] + ',' + coordinates[0]);
}
