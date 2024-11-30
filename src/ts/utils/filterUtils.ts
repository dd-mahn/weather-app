import {WeatherData, WeatherDay, TemperatureUnit} from "@/ts/types/weatherTypes";

// Temperature conversion
export const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
    return (fahrenheit - 32) * 5/9;
};

// Format temperature based on unit
export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
    if (unit === TemperatureUnit.Fahrenheit) {
        return `${Math.round(celsiusToFahrenheit(temp))}°F`;
    }
    return `${Math.round(temp)}°C`;
};

// Get current day and next 6 days forecast
export const getSevenDayForecast = (data: WeatherData): WeatherDay[] => {
    return data.days.slice(0, 7);
};

// Get current day weather
export const getCurrentWeather = (data: WeatherData): WeatherDay => {
    return data.days[0];
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

// Extract essential weather info
export const processWeatherDay = (day: WeatherDay, unit: TemperatureUnit) => {
    return {
        date: formatDate(day.datetime),
        maxTemp: formatTemperature(day.tempmax, unit),
        minTemp: formatTemperature(day.tempmin, unit),
        currentTemp: formatTemperature(day.temp, unit),
        conditions: day.conditions,
        icon: day.icon,
        description: day.description,
        humidity: `${day.humidity}%`,
        windSpeed: `${day.windspeed} km/h`,
        sunrise: day.sunrise,
        sunset: day.sunset
    };
};

// Process full forecast
export const processWeatherData = (data: WeatherData, unit: TemperatureUnit) => {
    const sevenDayForecast = getSevenDayForecast(data);
    return {
        location: data.resolvedAddress,
        timezone: data.timezone,
        current: processWeatherDay(getCurrentWeather(data), unit),
        forecast: sevenDayForecast.map(day => processWeatherDay(day, unit))
    };
};