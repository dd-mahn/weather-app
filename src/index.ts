import { getWeather } from "@/ts/api/getWeather";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form') as HTMLFormElement;
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const locationInput = (document.getElementById('location-input') as HTMLInputElement).value;
        const weatherDisplay = document.getElementById('weather-display') as HTMLDivElement;
        const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement;

        loadingSpinner.classList.remove('hidden');
        weatherDisplay.innerHTML = '';

        try {
            const weatherData = await getWeather(locationInput);
            weatherDisplay.innerHTML = `<pre>${JSON.stringify(weatherData, null, 2)}</pre>`;
        } catch (error: any) {
            weatherDisplay.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });
});
