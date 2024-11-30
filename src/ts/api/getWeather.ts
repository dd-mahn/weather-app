export const getWeather = async (city: string = "Hanoi") => {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = process.env.WEATHER_API_URL;
  const apiUnitGroup = process.env.WEATHER_API_UNIT_GROUP;
  const apiContentType = process.env.WEATHER_API_CONTENT_TYPE;

  if (!apiKey || !apiUrl || !apiUnitGroup || !apiContentType) {
    throw new Error("API key, URL, unit group or content type is missing");
  }

  const data = new Promise((resolve, reject) => {
    fetch(
      `${apiUrl}${city}?unitGroup=${apiUnitGroup}&include=days%2Ccurrent&key=${apiKey}&contentType=${apiContentType}`
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });

  return data;
};
