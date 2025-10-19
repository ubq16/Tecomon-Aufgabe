
export type Location = {
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
    is_day: number;
    weather_code: number; 
};

export type WidgetLocation = {
    latitude: number;
    longitude: number;
}