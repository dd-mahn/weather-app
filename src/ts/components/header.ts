import { weatherState } from "../types/weatherTypes";
import "@/style/components/header.css"

export class Header {
  private container: HTMLElement;
  private date: HTMLElement;
  private monthyear: HTMLElement;
  private time: HTMLElement;
  private city: HTMLElement;

  constructor(weatherData: string, containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;

    this.date = document.createElement("p");
    this.date.classList.add("header__date", "text-xs");

    this.monthyear = document.createElement("p");
    this.monthyear.classList.add("header__monthyear", "text-xs");

    this.time = document.createElement("h3");
    this.time.classList.add("header__time", "text-m");

    this.city = document.createElement("h1");
    this.city.classList.add("header__city", "text-h1");

    this.setupHeader(JSON.parse(weatherData));
  }

  private setupHeader(data: weatherState) {
    this.date.textContent = data.day[0];
    this.monthyear.textContent = data.day[1];
    this.time.textContent = data.time;
    this.city.textContent = data.address;

    const subContainer1 = document.createElement("div");
    subContainer1.classList.add("header__sub-1");

    const subContainer2 = document.createElement("div");
    subContainer2.classList.add("header__sub-2");

    subContainer1.appendChild(this.date);
    subContainer1.appendChild(this.monthyear);
    subContainer2.appendChild(subContainer1);
    subContainer2.appendChild(this.time);

    if (window.innerWidth < 1024) {
      this.container.appendChild(subContainer2);
      this.container.appendChild(this.city);
    } else {
      this.container.appendChild(this.city);
      this.container.appendChild(subContainer2);
    }
  }
}
