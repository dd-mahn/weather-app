import { forecastWeather } from "@/ts/types/weatherTypes";
import { DayCard } from "@/ts/components/dayCard";
import "@/style/components/list.css"

export class ForecastList{
    private container: HTMLElement;
    
    constructor(data: string, containerId: string){
        const weatherData: forecastWeather[] = JSON.parse(data).forecast;
        this.container = document.getElementById(containerId) as HTMLElement
        this.addForecastDays(weatherData)
        
    }

    private addForecastDays(daysData: forecastWeather[]){
        daysData.slice(0,7).forEach(day => {
            this.container.appendChild(new DayCard(day).getElement())
        })
    }
}