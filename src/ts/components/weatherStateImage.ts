import { dayImages, nightImages } from "../utils/ui/images";

export class WeatherStateImage{
    private container: HTMLElement;
    private image: HTMLImageElement;
    private weatherCondition: string;

    constructor(conditions: string, time:string){
        this.weatherCondition = conditions;
        this.container = document.createElement("div");
        this.image = document.createElement("img");
        this.setup(time);
    }

    private setup(time:string){
        const images = time.includes("AM") ? dayImages : nightImages;
        const weatherImage = images[this.weatherCondition];
        this.image.src = weatherImage;
        this.image.alt = this.weatherCondition;
        this.image.classList.add("weather-image");
        this.container.appendChild(this.image);
    }

    public getElement(): HTMLElement{
        return this.container;
    }
}