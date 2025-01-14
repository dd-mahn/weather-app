import { forecastWeather } from "@/ts/types/weatherTypes";
import { currentWeather } from "@/ts/types/weatherTypes";
import {
  formatDay,
  formatTime,
  getTimeState,
} from "@/ts/utils/data/datetimeUtils";
import { convertToFahrenheit } from "./degreeUtils";

export function getWeatherState(
  currentWeather: currentWeather,
  forecastDay: forecastWeather
) {
  return {
    day: forecastDay.date,
    time: formatTime(currentWeather.datetime),
    timeState: getTimeState(currentWeather.datetime),
    weatherCondition: currentWeather.conditions,
  };
}

function convertTemperatures(data: any, mode: string) {
  if (!data || mode !== "F") return data;

  const tempFields = ["temp", "feelslike", "tempmax", "tempmin"];
  const newData = { ...data };

  tempFields.forEach((field) => {
    if (newData[field] !== undefined) {
      newData[field] = convertToFahrenheit(newData[field]);
    }
  });

  if (newData.subStates && typeof newData.subStates === "object") {
    newData.subStates = convertTemperatures(newData.subStates, mode);
  }

  return newData;
}

export function getCurrentWeather(
  data: string,
  mode: string = "C"
): currentWeather {
  const { currentConditions, days } = JSON.parse(data);

  const processedWeather = {
    datetime: currentConditions.datetime,
    temp: Math.round(currentConditions.temp),
    tempmin: Math.round(days[0].tempmin),
    tempmax: Math.round(days[0].tempmax),
    conditions: currentConditions.conditions,
    subStates: {
      feelslike: Math.round(currentConditions.feelslike),
      humidity: currentConditions.humidity,
      windspeed: currentConditions.windspeed,
      precip: currentConditions.precip ?? 0,
      cloudcover: currentConditions.cloudcover,
      sunrise: formatTime(currentConditions.sunrise),
      sunset: formatTime(currentConditions.sunset),
    },
  };

  return convertTemperatures(processedWeather, mode);
}

export function getForecastDays(
  data: string,
  mode: string = "C"
): forecastWeather[] {
  const { days } = JSON.parse(data);

  return days.map((day: any) => 
    convertTemperatures({
      date: formatDay(day.datetime),
      tempmax: Math.round(day.tempmax),
      tempmin: Math.round(day.tempmin),
      humidity: day.humidity,
      windspeed: day.windspeed,
      icon: day.icon,
      conditions: day.conditions,
      precip: day.precip ?? 0,
    }, mode)
  );
}

export function getFullWeatherData(data: string, mode: string = "C"): string {
  const weatherData = JSON.parse(data);
  const currentWeather = getCurrentWeather(data, mode);
  const forecast = getForecastDays(data, mode);

  return JSON.stringify({
    ...getWeatherState(currentWeather, forecast[0]),
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
  const updatedData = {
    ...data,
    current: data.current && convertTemperatures(data.current, mode),
    forecast: data.forecast?.map((day: any) => convertTemperatures(day, mode))
  };

  return JSON.stringify(updatedData);
}
