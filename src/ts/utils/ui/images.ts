import dayCloudy from "@/assets/images/day-clouds.png";
import dayRain from "@/assets/images/day-rain.png";
import daySnow from "@/assets/images/day-snow.png";
import dayStorm from "@/assets/images/day-storm.png";
import dayClear from "@/assets/images/day-sun.png";
import dayWindy from "@/assets/images/day-wind.png";
import nightCloudy from "@/assets/images/night-clouds.png";
import nightRain from "@/assets/images/night-rain.png";
import nightSnow from "@/assets/images/night-snow.png";
import nightClear from "@/assets/images/night-moon.png";
import nightWindy from "@/assets/images/night-wind.png";
import nightStorm from "@/assets/images/night-storm.png";

export const dayImages: Record<string, string> = {
  Clear: dayClear,
  Sunny: dayClear,
  "Partly Cloudy": dayCloudy,
  "Mostly Cloudy": dayCloudy,
  Overcast: dayCloudy,
  Rain: dayRain,
  "Light Rain": dayRain,
  "Heavy Rain": dayStorm,
  Thunderstorm: dayStorm,
  Snow: daySnow,
  "Light Snow": daySnow,
  "Heavy Snow": daySnow,
  Haze: dayCloudy,
  Fog: dayCloudy,
  Windy: dayWindy,
  Blustery: dayWindy,
  Hail: dayStorm,
  Sleet: daySnow,
  Tornado: dayStorm,
  Hurricane: dayStorm,
  Sandstorm: dayCloudy,
  Dust: dayCloudy,
  Smoke: dayCloudy,
  "Freezing Rain": dayRain,
};

export const nightImages: Record<string, string> = {
  Clear: nightClear,
  Sunny: nightClear,
  "Partly Cloudy": nightCloudy,
  "Mostly Cloudy": nightCloudy,
  Overcast: nightCloudy,
  Rain: nightRain,
  "Light Rain": nightRain,
  "Heavy Rain": nightStorm,
  Thunderstorm: nightStorm,
  Snow: nightSnow,
  "Light Snow": nightSnow,
  "Heavy Snow": nightSnow,
  Haze: nightCloudy,
  Fog: nightCloudy,
  Windy: nightWindy,
  Blustery: nightWindy,
  Hail: nightStorm,
  Sleet: nightSnow,
  Tornado: nightStorm,
  Hurricane: nightStorm,
  Sandstorm: nightCloudy,
  Dust: nightCloudy,
  Smoke: nightCloudy,
  "Freezing Rain": nightRain,
};

