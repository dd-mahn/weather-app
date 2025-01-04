import { dayImages, nightImages } from "../utils/ui/images";

export class WeatherStateImage {
  private container: HTMLElement;
  private image: HTMLImageElement;
  private weatherCondition: string;

  constructor(conditions: string, time: string) {
    this.weatherCondition = conditions;
    this.container = document.createElement("div");
    this.image = document.createElement("img");
    this.setup(time);
  }

  private setup(time: string) {
    const images = time.includes("AM") ? dayImages : nightImages;

    const weatherImage = images[this.weatherCondition];
    if (!weatherImage) {
      console.error(`No image found for condition: ${this.weatherCondition}`);
      this.image.src = images["Clear"];
    } else {
      this.image.src = weatherImage;
    }

    this.container.classList.add("weather-image__container");

    this.image.alt = this.weatherCondition;
    this.image.classList.add("weather-image__img");

    this.image.onerror = () => {
      console.error(`Failed to load image for ${this.weatherCondition}`);
      this.image.src = images["Clear"];
    };

    this.container.innerHTML = "";
    this.container.appendChild(this.image);
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}
