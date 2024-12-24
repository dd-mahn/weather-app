import { forecastWeather, weatherState } from "@/ts/types/weatherTypes";
import { currentWeather } from "@/ts/types/weatherTypes";
import { formatDay, formatTime, getTimeState } from "@/ts/utils/data/datetimeUtils";

export function getWeatherState(currentWeather: currentWeather) {
  const day = formatDay(currentWeather.datetime);
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

export function getCurrentWeather(data: string): currentWeather {
  const weatherData = JSON.parse(data);
  const currentWeather = weatherData.currentConditions;

  return {
    datetime: currentWeather.datetime,
    temp: currentWeather.temp,
    conditions: currentWeather.conditions,
    subStates: {
      feelslike: currentWeather.feelslike,
      humidity: currentWeather.humidity,
      windspeed: currentWeather.windspeed,
      cloudcover: currentWeather.clouds,
      sunrise: currentWeather.sunrise,
      sunset: currentWeather.sunset,
      precip: currentWeather.precip,
    },
  };
}

export function getForecastDays(data: string): forecastWeather[] {
  const weatherData = JSON.parse(data);
  const forecast = weatherData.days;

  return forecast.map((day: any) => {
    return {
      datetime: day.datetime,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      humidity: day.humidity,
      windspeed: day.windspeed,
      conditions: day.description,
      precip: day.precip,
    };
  });
}

export function getFullWeatherData(data: string): string {
  const weatherData = JSON.parse(data);
  const currentWeather = getCurrentWeather(data);
  const forecast = getForecastDays(data);
  const weatherState = getWeatherState(currentWeather);

  return JSON.stringify({
    ...weatherState,
    current: currentWeather,
    forecast,
    resolveAddress: weatherData.resolveAddress,
    timezone: weatherData.timezone,
    tzoffset: weatherData.tzoffset,
  });
}
