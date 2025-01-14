import { SearchBar } from "@/ts/components/searchBar";
import { CurrentCard } from "@/ts/components/currentCard";
import { ForecastList } from "@/ts/components/forecastList";
import { Header } from "@/ts/components/header";
import { LoadingState } from "@/ts/components/loadingState";
import { WeatherStateImage } from "./ts/components/weatherStateImage";
import { ErrorState } from "@/ts/components/errorState";
import { getFullWeatherData } from "@/ts/utils/data/weatherUtils";
import "@/style/main.css";

class WeatherUIManager {
  private static readonly CONTAINER_IDS = [
    "current",
    "forecast",
    "header",
    "img__container-tablet",
    "img__container-desktop",
  ] as const;

  private loadingState: LoadingState | null = null;
  private errorState: ErrorState | null = null;

  constructor() {
    this.initializeEventListeners();
    this.initializeUI();
  }

  private initializeEventListeners(): void {
    window.addEventListener("weatherDataChanging", () =>
      this.handleDataChanging()
    );
    window.addEventListener("weatherDataChanged", () =>
      this.handleDataChanged()
    );
    window.addEventListener("cfModeChanged", () => this.handleCFModeChanged());
    window.addEventListener("weatherError", (event: Event) => {
      this.handleError((event as CustomEvent).detail);
    });
  }

  private initializeUI(): void {
    new SearchBar("search-bar");
    const data = localStorage.getItem("weatherData");
    if (data) {
      this.updateUI();
    }
  }

  private handleDataChanging(): void {
    this.clearCurrentState();
    this.hideContainers();
    this.loadingState = new LoadingState("content");
  }

  private handleError(errorMessage: string): void {
    this.clearCurrentState();
    this.errorState = new ErrorState("error", errorMessage);
  }

  private clearCurrentState(): void {
    if (this.loadingState) {
      this.loadingState.stopLoading();
      this.loadingState = null;
    }

    if (this.errorState) {
      ["error", "current", "header", "forecast"].forEach((id) => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = "";
      });
      this.errorState = null;
    }

    this.emptyContainers();
  }

  private handleDataChanged(): void {
    this.loadingState?.stopLoading();
    this.loadingState = null;
    this.showContainers();
    this.updateUI();
  }

  private handleCFModeChanged(): void {
    this.cfEmptyContainers();
    this.updateUI();
  }

  private hideContainers(): void {
    this.updateContainersDisplay("none");
  }

  private showContainers(): void {
    this.updateContainersDisplay("");
  }

  private updateContainersDisplay(display: string): void {
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = display;
      }
    });
  }

  private emptyContainers(): void {
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = "";
      }
    });
  }

  private cfEmptyContainers(): void {
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container && container.id !== "img__container-tablet" && container.id !== "img__container-desktop") {
        container.innerHTML = "";
      }
    });
  }

  private updateUI(): void {
    const data = localStorage.getItem("weatherData") || "";
    const mode = localStorage.getItem("mode") || "C";
    const filteredData = getFullWeatherData(data, mode);
    const JSONdata = JSON.parse(filteredData);

    this.updateBodyClass(JSONdata.timeState || "morning");
    this.updateWeatherImages(JSONdata);
    this.updateComponents(filteredData);
  }

  private updateBodyClass(timeState: string): void {
    const body = document.querySelector("body");
    if (body) {
      body.classList.remove("morning", "afternoon", "evening", "night");
      body.classList.add(timeState);
    }
  }

  private updateWeatherImages(data: any): void {
    const { innerWidth } = window;
    const tabletContainer = document.getElementById("img__container-tablet");
    const desktopContainer = document.getElementById("img__container-desktop");

    if (tabletContainer && innerWidth >= 768 && innerWidth < 1024) {
      this.renderWeatherImage(tabletContainer, data);
    }

    if (desktopContainer && innerWidth >= 1024) {
      this.renderWeatherImage(desktopContainer, data);
    }
  }

  private renderWeatherImage(container: HTMLElement, data: any): void {
    let weatherImage = container.querySelector(".weather-image__container");
    if (!weatherImage) {
      weatherImage = new WeatherStateImage(
        data.weatherCondition,
        data.time
      ).getElement();
      container.appendChild(weatherImage);
    } else {
      (weatherImage as any).update?.(data.weatherCondition, data.time);
    }
  }

  private updateComponents(data: string): void {
    const containers = {
      current: CurrentCard,
      forecast: ForecastList,
      header: Header,
    };

    Object.entries(containers).forEach(([id, Component]) => {
      const container = document.getElementById(id);
      if (container) {
        new Component(data, id);
      }
    });
  }
}

new WeatherUIManager();
