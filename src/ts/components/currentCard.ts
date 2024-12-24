import { currentWeather, weatherState } from "@/ts/types/weatherTypes";
import { SwitchButton } from "./switchButton";
import { WeatherStateImage } from "./weatherStateImage";
import { iconSet } from "../utils/ui/icons";
import { labelSet } from "../utils/ui/labels";

export class CurrentCard {
  private container: HTMLElement;

  private mobileLeftContainer: HTMLElement;
  private mobileRightContainer: HTMLElement;

  private switchButton: SwitchButton;

  private topContainer: HTMLElement;
  private mainState: HTMLElement;
  private mainStateDegree: HTMLHeadingElement;
  private mainStateDescription: HTMLParagraphElement;

  private weatherImage: WeatherStateImage;

  private subStates: HTMLElement;

  constructor(data: string, containerId: string) {
    const weatherData: weatherState = JSON.parse(data);
    const currentMode = localStorage.getItem("mode") || "C";

    this.container = document.getElementById(containerId) as HTMLElement;
    this.weatherImage = new WeatherStateImage(
      weatherData.weatherCondition,
      weatherData.time
    );
    this.switchButton = new SwitchButton(currentMode);
    this.topContainer = document.createElement("div");
    this.mobileLeftContainer = document.createElement("div");
    this.mobileRightContainer = document.createElement("div");
    this.mainState = document.createElement("div");
    this.mainStateDegree = document.createElement("h2");
    this.mainStateDescription = document.createElement("p");
    this.subStates = document.createElement("div");

    this.setupMainState(weatherData);
    this.setupSubStates(weatherData);
    this.render();
  }

  private setupMainState(weatherData: weatherState) {
    this.mainStateDegree.textContent = `${weatherData.current.temp}°`;
    this.mainStateDescription.textContent = weatherData.current.conditions;

    this.mainState.appendChild(this.mainStateDegree);
    this.mainState.appendChild(this.mainStateDescription);

    this.topContainer.appendChild(this.mainState);
    this.topContainer.appendChild(this.switchButton.getElement());
  }

  private setupSubStates(weatherData: weatherState) {
    const subStatesData = weatherData.current.subStates;
    const count = window.innerWidth < 768 ? 4 : 8;
    const subStatesItems = Object.entries(subStatesData)
      .slice(0, count)
      .map(([key, value]) => {
        const itemContainer = document.createElement("div");
        const itemLabel = document.createElement("div");
        const itemIcon = document.createElement("span");
        const itemName = document.createElement("p");
        const itemValue = document.createElement("p");

        itemIcon.classList.add("material-symbols-outlined");
        itemIcon.textContent = iconSet[key];
        itemLabel.appendChild(itemIcon);

        itemName.textContent = labelSet[key];
        itemLabel.appendChild(itemName);

        itemContainer.appendChild(itemLabel);

        itemValue.textContent = `${value}`;
        itemContainer.appendChild(itemValue);

        return itemContainer;
      });

    subStatesItems.forEach((item) => {
      this.subStates.appendChild(item);
    });
  }

  private render() {
    if (window.innerWidth < 768) {
      this.mobileLeftContainer.appendChild(this.weatherImage.getElement());
      this.mobileRightContainer.appendChild(this.mainState);
      this.mobileRightContainer.appendChild(this.subStates);

      this.container.appendChild(this.mobileLeftContainer);
      this.container.appendChild(this.mobileRightContainer);
    } else {
      this.container.appendChild(this.mainState);
      this.container.appendChild(this.subStates);
    }
  }

  public getElement() {
    return this.container;
  }
}
