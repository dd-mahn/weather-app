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

// Define a type for the image records
type WeatherImages = {
  [key: string]: string;
};

export const dayImages: WeatherImages = {
  Clear: dayClear.toString(),  // Convert to string URL
  Sunny: dayClear.toString(),
  "Partially cloudy": dayCloudy.toString(),
  "Mostly cloudy": dayCloudy.toString(),
  Overcast: dayCloudy.toString(),
  Rain: dayRain.toString(),
  "Light rain": dayRain.toString(),
  "Heavy rain": dayStorm.toString(),
  Thunderstorm: dayStorm.toString(),
  Snow: daySnow.toString(),
  "Light snow": daySnow.toString(),
  "Heavy snow": daySnow.toString(),
  Haze: dayCloudy.toString(),
  Fog: dayCloudy.toString(),
  Windy: dayWindy.toString(),
  Blustery: dayWindy.toString(),
  Hail: dayStorm.toString(),
  Sleet: daySnow.toString(),
  Tornado: dayStorm.toString(),
  Hurricane: dayStorm.toString(),
  Sandstorm: dayCloudy.toString(),
  Dust: dayCloudy.toString(),
  Smoke: dayCloudy.toString(),
  "Freezing rain": dayRain.toString(),
};

export const nightImages: WeatherImages = {
  Clear: nightClear.toString(),
  Sunny: nightClear.toString(),
  "Partially cloudy": nightCloudy.toString(),
  "Mostly cloudy": nightCloudy.toString(),
  Overcast: nightCloudy.toString(),
  Rain: nightRain.toString(),
  "Light rain": nightRain.toString(),
  "Heavy rain": nightStorm.toString(),
  Thunderstorm: nightStorm.toString(),
  Snow: nightSnow.toString(),
  "Light snow": nightSnow.toString(),
  "Heavy snow": nightSnow.toString(),
  Haze: nightCloudy.toString(),
  Fog: nightCloudy.toString(),
  Windy: nightWindy.toString(),
  Blustery: nightWindy.toString(),
  Hail: nightStorm.toString(),
  Sleet: nightSnow.toString(),
  Tornado: nightStorm.toString(),
  Hurricane: nightStorm.toString(),
  Sandstorm: nightCloudy.toString(),
  Dust: nightCloudy.toString(),
  Smoke: nightCloudy.toString(),
  "Freezing rain": nightRain.toString(),
};

