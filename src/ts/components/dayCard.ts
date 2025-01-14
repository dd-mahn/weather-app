import { forecastWeather } from "@/ts/types/weatherTypes";
import { iconSet } from "@/ts/utils/ui/icons";
import { unit } from "@/ts/utils/ui/unit";
import "@/style/components/day.css";

export class DayCard {
  private readonly container: HTMLElement;
  private readonly elements: {
    currentDay: HTMLSpanElement;
    weatherIcon: HTMLElement; 
    conditions: HTMLElement;
    tempRange: HTMLSpanElement;
    sections: {
      top: HTMLElement;
      mid: HTMLElement;
      bot: HTMLElement;
    }
  };

  constructor(dayData: forecastWeather) {
    this.container = document.createElement("div");
    this.container.classList.add("forecast-day");

    const isMobile = window.innerWidth < 768;

    this.elements = {
      currentDay: this.createTextElement("span", 
        ["forecast-day__current", isMobile ? "text-s" : "button-l"],
        dayData.date[0].slice(0, 3)
      ),
      weatherIcon: this.createIconElement(
        ["material-symbols-outlined", "forecast-day__condition-icon"],
        iconSet[dayData.icon]
      ),
      conditions: this.createTextElement("p",
        ["forecast-day__condition-text"],
        this.formatConditions(dayData.conditions)
      ),
      tempRange: this.createTextElement("span",
        ["forecast-day__temp", isMobile ? "text-s" : "button-m"],
        `${dayData.tempmin}°/${dayData.tempmax}°`
      ),
      sections: {
        top: this.createSection("forecast-day__top"),
        mid: this.createSection("forecast-day__mid"),
        bot: this.createSection("forecast-day__bot")
      }
    };

    this.setupSections(dayData);
    this.render();
  }

  private createTextElement(tag: string, classes: string[], text: string): HTMLElement {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;
    return element;
  }

  private createIconElement(classes: string[], icon: string): HTMLElement {
    const element = document.createElement("span");
    element.classList.add(...classes);
    element.textContent = icon;
    return element;
  }

  private createSection(className: string): HTMLElement {
    const section = document.createElement("div");
    section.classList.add(className);
    return section;
  }

  private formatConditions(conditions: string): string {
    return conditions
      .split(",")[0]
      .replace("Partially ", "")
      .replace("cloudy", "Cloudy");
  }

  private setupSections(dayData: forecastWeather): void {
    const { currentDay, weatherIcon, conditions, tempRange, sections } = this.elements;
    const { top, mid, bot } = sections;

    if (window.innerWidth < 768) {
      top.appendChild(currentDay);
      mid.appendChild(weatherIcon);
    } else {
      const conditionContainer = document.createElement("div");
      conditionContainer.classList.add("forecast-day__condition-container");
      conditionContainer.append(weatherIcon, conditions);
      
      top.append(currentDay, conditionContainer);
      this.setupMidSectStates(mid, dayData);
    }

    bot.appendChild(tempRange);
  }

  private setupMidSectStates(midSection: HTMLElement, dayData: forecastWeather): void {
    const stateKeys = window.innerWidth >= 1024 
      ? ["precip", "humidity", "windspeed"]
      : ["precip", "humidity"];

    stateKeys.forEach(key => {
      if (key in dayData) {
        midSection.appendChild(this.createStateElement(key, dayData[key as keyof forecastWeather]));
      }
    });
  }

  private createStateElement(key: string, value: any): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("forecast-day__state");

    const icon = this.createIconElement(["material-symbols-outlined"], iconSet[key]);
    const valueText = this.createTextElement("p", [], value + unit[key]);

    container.appendChild(icon);

    if (window.innerWidth >= 1024) {
      const label = this.createTextElement("span", [], 
        key === "precip" ? "Precipitation" :
        key === "humidity" ? "Humidity" : "Wind speed"
      );
      container.appendChild(label);
    }

    container.appendChild(valueText);
    return container;
  }

  private render(): void {
    const { top, mid, bot } = this.elements.sections;
    this.container.append(top, mid, bot);
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}
