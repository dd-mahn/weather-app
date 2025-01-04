import { forecastWeather } from "@/ts/types/weatherTypes";
import { iconSet } from "@/ts/utils/ui/icons";
import { unit } from "@/ts/utils/ui/unit";
import "@/style/components/day.css";

export class DayCard {
  private container: HTMLElement;
  private currentDay: HTMLSpanElement;
  private weatherIcon: HTMLElement;
  private tempRange: HTMLSpanElement;

  private topSect: HTMLElement;
  private midSect: HTMLElement;
  private botSect: HTMLElement;

  constructor(dayData: forecastWeather) {
    this.container = document.createElement("div");
    this.container.classList.add("forecast-day");

    this.currentDay = document.createElement("span");
    this.currentDay.classList.add("forecast-day__current")
    this.currentDay.textContent = dayData.date[0].slice(0,3);

    this.weatherIcon = document.createElement("span");
    this.weatherIcon.classList.add("material-symbols-outlined");
    this.weatherIcon.classList.add("forecast-day__condition");
    this.weatherIcon.textContent = `${iconSet[dayData.conditions]}`;

    this.tempRange = document.createElement("span");
    this.tempRange.classList.add("forecast-day__temp")

    this.topSect = document.createElement("div");
    this.topSect.classList.add("forecast-day__top")

    this.midSect = document.createElement("div");
    this.midSect.classList.add("forecast-day__mid")

    this.botSect = document.createElement("div");
    this.botSect.classList.add("forecast-day__bot")

    this.setupTopSect();
    this.setupMidSect(dayData);
    this.setupBotSect(dayData);
    this.render();
  }

  private setupTopSect() {
    if (window.innerWidth < 768) {
      this.topSect.appendChild(this.currentDay);
    } else {
      this.topSect.appendChild(this.currentDay);
      this.topSect.appendChild(this.weatherIcon);
    }
  }

  private setupMidSect(dayData: forecastWeather) {
    const midSectStates = ["precip", "humidity", "windspeed"];
    function addStates(key: string, value: any) {
      const container = document.createElement("div");
      container.classList.add("forecast-day__state")

      const label = document.createElement("span");
      const icon = document.createElement("span");
      const valueText = document.createElement("p");

      icon.classList.add("material-symbols-outlined");
      icon.textContent = iconSet[key];

      label.textContent =
        key === "precip"
          ? "Precipitation"
          : key === "humidity"
          ? "Humidity"
          : "Wind speed";

      valueText.textContent = value + unit[key];

      container.appendChild(icon);
      container.appendChild(label);
      container.appendChild(valueText);

      return container;
    }

    if (window.innerWidth < 768) {
      this.midSect.appendChild(this.weatherIcon);
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      Object.entries(dayData)
        .slice(0, 2)
        .forEach(([key, value]) => {
          if (midSectStates.includes(key)) {
            this.midSect.appendChild(addStates(key, value));
          }
        });
    } else {
      Object.entries(dayData).forEach(([key, value]) => {
        if (midSectStates.includes(key)) {
          this.midSect.appendChild(addStates(key, value));
        }
      });
    }
  }

  private setupBotSect(dayData: forecastWeather) {
    this.tempRange.textContent = `${dayData.tempmin}°/${dayData.tempmax}°`;
    this.botSect.appendChild(this.tempRange);
  }

  private render() {
    this.container.appendChild(this.topSect);
    this.container.appendChild(this.midSect);
    this.container.appendChild(this.botSect);
  }

  public getElement() {
    return this.container;
  }
}
