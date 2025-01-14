import { dayImages, nightImages } from "@/ts/utils/ui/images";
import "@/style/components/image.css";

export class WeatherStateImage {
  private readonly container: HTMLElement;
  private readonly image: HTMLImageElement;
  private readonly defaultImage: string;

  constructor(conditions: string, time: string) {
    this.container = document.createElement("div");
    this.container.classList.add("weather-image__container");
    
    this.image = document.createElement("img");
    this.image.classList.add("weather-image__img");
    
    this.defaultImage = this.getImageSet(time)["Clear"];
    this.setupImage(conditions, time);
    this.render();
  }

  private getImageSet(time: string): Record<string, string> {
    const hour = this.convertTo24Hour(time);
    return (hour >= 5 && hour < 17) ? dayImages : nightImages;
  }

  private convertTo24Hour(time: string): number {
    const [hourStr, period] = [time.split(":")[0], time.includes("AM") ? "AM" : "PM"];
    let hour = parseInt(hourStr);

    if (period === "PM" && hour !== 12) hour += 12;
    else if (period === "AM" && hour === 12) hour = 0;

    return hour;
  }

  private setupImage(conditions: string, time: string): void {
    const images = this.getImageSet(time);
    this.image.src = images[conditions] || this.defaultImage;
    this.image.alt = conditions;
    this.image.onerror = () => this.image.src = this.defaultImage;
  }

  private render(): void {
    this.container.appendChild(this.image);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public update(conditions: string, time: string): void {
    this.setupImage(conditions, time);
  }
}
