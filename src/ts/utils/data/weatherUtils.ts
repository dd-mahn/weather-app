import { forecastWeather } from "@/ts/types/weatherTypes";
import { currentWeather } from "@/ts/types/weatherTypes";
import {
  formatDay,
  formatTime,
  getTimeState,
} from "@/ts/utils/data/datetimeUtils";
import { convertToFahrenheit } from "./degreeUtils";

export function getWeatherState(currentWeather: currentWeather, forecastDay: forecastWeather) {
  const day = forecastDay.date;
  const time = formatTime(currentWeather.datetime);
  const timeState = getTimeState(currentWeather.datetime);
  const weatherCondition = currentWeather.conditions;

  return {
    day,
    time,
    timeState,
    weatherCondition,
  };
}

function convertTemperatures(data: any, mode: string) {
  // Return early if data is null or undefined
  if (!data) return data;

  if (mode === "F") {
    // Handle direct temperature properties
    const tempFields = ["temp", "feelslike", "tempmax", "tempmin"];
    tempFields.forEach((field) => {
      if (data[field] !== undefined) {
        data[field] = convertToFahrenheit(data[field]);
      }
    });

    // Handle nested subStates if they exist
    if (data.subStates && typeof data.subStates === "object") {
      data.subStates = convertTemperatures(data.subStates, mode);
    }
  }
  return data;
}

export function getCurrentWeather(
  data: string,
  mode: string = "C"
): currentWeather {
  const weatherData = JSON.parse(data);
  const currentWeather = weatherData.currentConditions;
  const dayWeather = weatherData.days[0];

  const processedWeather = {
    datetime: currentWeather.datetime,
    temp: currentWeather.temp,
    tempmin: dayWeather.tempmin,
    tempmax: dayWeather.tempmax,
    conditions: currentWeather.conditions,
    subStates: {
      feelslike: currentWeather.feelslike,
      humidity: currentWeather.humidity,
      windspeed: currentWeather.windspeed,
      precip: currentWeather.precip,
      cloudcover: currentWeather.cloudcover,
      sunrise: formatTime(currentWeather.sunrise),
      sunset: formatTime(currentWeather.sunset),
    },
  };

  return convertTemperatures(processedWeather, mode);
}

export function getForecastDays(
  data: string,
  mode: string = "C"
): forecastWeather[] {
  const weatherData = JSON.parse(data);
  const forecast = weatherData.days;

  return forecast.map((day: any) => {
    const processedDay = {
      date: formatDay(day.datetime),
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      humidity: day.humidity,
      windspeed: day.windspeed,
      icon: day.icon,
      conditions: day.conditions,
      precip: day.precip,
    };
    return convertTemperatures(processedDay, mode);
  });
}

export function getFullWeatherData(data: string, mode: string = "C"): string {
  const weatherData = JSON.parse(data);
  const currentWeather = getCurrentWeather(data, mode);
  const forecast = getForecastDays(data, mode);
  const weatherState = getWeatherState(currentWeather, forecast[0]);

  return JSON.stringify({
    ...weatherState,
    current: currentWeather,
    forecast,
    address: weatherData.address,
    timezone: weatherData.timezone,
    tzoffset: weatherData.tzoffset,
  });
}

export function updateWeatherDataMode(
  weatherState: string,
  mode: string
): string {
  const data = JSON.parse(weatherState);

  // Convert current weather temperatures if it exists
  if (data.current) {
    data.current = convertTemperatures(data.current, mode);
  }

  // Convert forecast temperatures if they exist
  if (data.forecast && Array.isArray(data.forecast)) {
    data.forecast = data.forecast.map((day: any) =>
      convertTemperatures(day, mode)
    );
  }

  return JSON.stringify(data);
}
