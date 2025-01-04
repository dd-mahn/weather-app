export type currentWeather = {
  datetime: string;
  temp: number;
  tempmin: number,
  tempmax: number,
  conditions: string;
  subStates: currentSubStates;
};

export type currentSubStates = {
  feelslike: number;
  humidity: number;
  windspeed: number;
  precip: number;
  cloudcover: number;
  sunrise: string;
  sunset: string;
  
}

export type forecastWeather = {
  date: string;
  tempmax: number;
  tempmin: number;
  humidity: number;
  windspeed: number;
  conditions: string;
  precip: number;
};

export interface weatherState {
  day: string[];
  time: string;
  timeState: string;
  weatherCondition: string;
  current: currentWeather;
  forecast: forecastWeather[];
  address: string;
  timezone: string;
  tzoffset: number;
}
