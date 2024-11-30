export interface WeatherDay {
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    humidity: number;
    conditions: string;
    icon: string;
    description: string;
    windspeed: number;
    sunrise: string;
    sunset: string;
}

export interface WeatherData {
    resolvedAddress: string;
    timezone: string;
    days: WeatherDay[];
}

export enum TemperatureUnit {
    Celsius = 'C',
    Fahrenheit = 'F'
}