import { currentSubStates, weatherState } from "@/ts/types/weatherTypes";
import { SwitchButton } from "@/ts/components/switchButton";
import { WeatherStateImage } from "@/ts/components/weatherStateImage";
import { iconSet } from "@/ts/utils/ui/icons";
import { labelSet } from "@/ts/utils/ui/labels";
import { unit } from "@/ts/utils/ui/unit";
import "@/style/components/current.css";

export class CurrentCard {
  private readonly container: HTMLElement;
  private readonly weatherImage: WeatherStateImage;
  private readonly switchButton: SwitchButton;
  private readonly mainState: HTMLElement;
  private readonly subStates: HTMLElement;

  constructor(data: string, containerId: string) {
    const weatherData: weatherState = JSON.parse(data);
    
    this.container = document.getElementById(containerId) as HTMLElement;
    this.container.classList.add("current-weather");

    this.weatherImage = new WeatherStateImage(
      weatherData.weatherCondition,
      weatherData.time
    );

    this.switchButton = new SwitchButton();
    this.mainState = this.createMainState(weatherData);
    this.subStates = this.createSubStates(weatherData);

    this.render();
  }

  private createMainState(weatherData: weatherState): HTMLElement {
    const mainState = document.createElement("div");
    mainState.classList.add("current-weather__main");

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("current-weather__content");

    const temp = document.createElement("h3");
    temp.classList.add("current-weather__temp", "text-h3");
    temp.textContent = `${weatherData.current.temp}°`;

    const description = document.createElement("p");
    description.classList.add("current-weather__description", "text-s");
    description.textContent = weatherData.current.conditions;

    const tempRange = document.createElement("span");
    tempRange.classList.add("current-weather__temp-range", "text-l");
    tempRange.textContent = `${weatherData.current.tempmin}°/${weatherData.current.tempmax}°`;

    if (window.innerWidth < 768) {
      contentContainer.append(temp, description);
    } else {
      const leftContainer = document.createElement("div");
      leftContainer.classList.add("current-weather__content-left");
      leftContainer.append(temp, description);

      const rightContainer = document.createElement("div");
      rightContainer.classList.add("current-weather__content-right");
      rightContainer.appendChild(tempRange);

      contentContainer.append(leftContainer, rightContainer);
    }

    mainState.append(contentContainer, this.switchButton.getElement());
    return mainState;
  }

  private createSubStates(weatherData: weatherState): HTMLElement {
    const subStates = document.createElement("div");
    subStates.classList.add("current-weather__substates");

    const keys = window.innerWidth < 768 
      ? ["feelslike", "humidity", "windspeed", "precip"]
      : Object.keys(weatherData.current.subStates);

    keys.forEach(key => {
      const value = weatherData.current.subStates[key as keyof currentSubStates];
      const item = this.createSubStateItem(key, value);
      subStates.appendChild(item);
    });

    return subStates;
  }

  private createSubStateItem(key: string, value: string | number): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("current-weather__substate-item");

    const label = document.createElement("div");
    label.classList.add("current-weather__substate-label");

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined", "current-weather__substate-icon");
    icon.textContent = iconSet[key];

    const name = document.createElement("p");
    name.classList.add("current-weather__substate-name", "text-xs");
    name.textContent = labelSet[key];

    const valueEl = document.createElement("p");
    valueEl.classList.add(
      "current-weather__substate-value", 
      window.innerWidth < 768 ? "text-s" : "text-m"
    );
    valueEl.textContent = `${value}${unit[key] || ""}`;

    label.append(icon, name);
    container.append(label, valueEl);

    return container;
  }

  private render(): void {
    if (window.innerWidth < 768) {
      const leftContainer = document.createElement("div");
      leftContainer.classList.add("current-weather__mobile-left");
      leftContainer.appendChild(this.weatherImage.getElement());

      const rightContainer = document.createElement("div");
      rightContainer.classList.add("current-weather__mobile-right");
      rightContainer.append(this.mainState, this.subStates);

      this.container.append(leftContainer, rightContainer);
    } else {
      this.container.append(this.mainState, this.subStates);
    }
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}
