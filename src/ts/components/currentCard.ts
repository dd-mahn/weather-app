import { currentSubStates, weatherState } from "@/ts/types/weatherTypes";
import { SwitchButton } from "@/ts/components/switchButton";
import { WeatherStateImage } from "@/ts/components/weatherStateImage";
import { iconSet } from "@/ts/utils/ui/icons";
import { labelSet } from "@/ts/utils/ui/labels";
import "@/style/components/current.css";
import { unit } from "@/ts/utils/ui/unit";

export class CurrentCard {
  private container: HTMLElement;

  private mobileLeftContainer: HTMLElement;
  private mobileRightContainer: HTMLElement;

  private switchButton: SwitchButton;

  private mainState: HTMLElement;
  private mainStateTemp: HTMLHeadingElement;
  private mainStateTempRange: HTMLSpanElement;
  private mainStateDescription: HTMLParagraphElement;

  private weatherImage: WeatherStateImage;

  private subStates: HTMLElement;

  constructor(data: string, containerId: string) {
    const weatherData: weatherState = JSON.parse(data);
    const currentMode = localStorage.getItem("mode") || "C";

    this.container = document.getElementById(containerId) as HTMLElement;
    this.container.classList.add("current-weather");

    this.weatherImage = new WeatherStateImage(
      weatherData.weatherCondition,
      weatherData.time
    );

    this.switchButton = new SwitchButton(currentMode);

    this.mobileLeftContainer = document.createElement("div");
    this.mobileLeftContainer.classList.add("current-weather__mobile-left");

    this.mobileRightContainer = document.createElement("div");
    this.mobileRightContainer.classList.add("current-weather__mobile-right");

    this.mainState = document.createElement("div");
    this.mainState.classList.add("current-weather__main");

    this.mainStateTemp = document.createElement("h3");
    this.mainStateTemp.classList.add("current-weather__temp", "text-h3");

    this.mainStateTempRange = document.createElement("span");
    this.mainStateTempRange.classList.add("current-weather__temp-range", "text-l");

    this.mainStateDescription = document.createElement("p");
    this.mainStateDescription.classList.add("current-weather__description", "text-s");

    this.subStates = document.createElement("div");
    this.subStates.classList.add("current-weather__substates");

    this.setupMainState(weatherData);
    this.setupSubStates(weatherData);
    this.render();
  }

  private setupMainState(weatherData: weatherState) {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("current-weather__content");

    this.mainStateTemp.textContent = `${weatherData.current.temp}°`;
    this.mainStateDescription.textContent = weatherData.current.conditions;

    this.mainStateTempRange.textContent = `${weatherData.current.tempmin}°/${weatherData.current.tempmax}°`;

    if (window.innerWidth < 768) {
      contentContainer.appendChild(this.mainStateTemp);
      contentContainer.appendChild(this.mainStateDescription);
    } else {
      const subLeftContainer = document.createElement("div");
      subLeftContainer.classList.add("current-weather__content-left");

      const subRightContainer = document.createElement("div");
      subRightContainer.classList.add("current-weather__content-right");

      subLeftContainer.appendChild(this.mainStateTemp)
      subLeftContainer.appendChild(this.mainStateDescription)

      subRightContainer.appendChild(this.mainStateTempRange)

      contentContainer.appendChild(subLeftContainer)
      contentContainer.appendChild(subRightContainer)
    }

    this.mainState.appendChild(contentContainer);
    this.mainState.appendChild(this.switchButton.getElement());
  }

  private setupSubStates(weatherData: weatherState) {
    const mobileSubstates = ["feelslike", "humidity", "windspeed", "precip"];
    const subStatesData = weatherData.current.subStates;
    const subStatesItems =
      window.innerWidth < 768
        ? mobileSubstates.map((key) => {
            const value = subStatesData[key as keyof currentSubStates];
            return createSubStateItem(key, value);
          })
        : Object.entries(subStatesData).map(([key, value]) => {
            return createSubStateItem(key, value);
          });

    function createSubStateItem(key: string, value: string | number) {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("current-weather__substate-item");

      const itemLabel = document.createElement("div");
      itemLabel.classList.add("current-weather__substate-label");

      const itemIcon = document.createElement("span");
      itemIcon.classList.add("material-symbols-outlined", "current-weather__substate-icon");

      const itemName = document.createElement("p");
      itemName.classList.add("current-weather__substate-name", "text-xs");

      const itemValue = document.createElement("p");
      itemValue.classList.add("current-weather__substate-value", `${window.innerWidth < 768 ? "text-s" : "text-m"}`);

      itemIcon.textContent = iconSet[key];
      itemLabel.appendChild(itemIcon);

      itemName.textContent = labelSet[key];
      itemLabel.appendChild(itemName);

      itemContainer.appendChild(itemLabel);

      itemValue.textContent = `${value}${unit[key] || ""}`;
      itemContainer.appendChild(itemValue);

      return itemContainer;
    }

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
