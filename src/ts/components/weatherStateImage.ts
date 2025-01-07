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
    // Extract hour from time string (e.g. "10:00 AM" -> 10)
    const hour = parseInt(time.split(':')[0]);
    const period = time.includes('AM') ? 'AM' : 'PM';
    
    // Convert to 24 hour format
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }

    // Use day images from 5AM to 5PM (5-17), night images otherwise
    const images = (hour24 >= 5 && hour24 < 17) ? dayImages : nightImages;

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
