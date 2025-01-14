import { SearchBar } from "@/ts/components/searchBar";
import "@/style/main.css";
import { CurrentCard } from "@/ts/components/currentCard";
import { getFullWeatherData } from "@/ts/utils/data/weatherUtils";
import { ForecastList } from "@/ts/components/forecastList";
import { Header } from "@/ts/components/header";
import { LoadingState } from "@/ts/components/loadingState";
import { WeatherStateImage } from "./ts/components/weatherStateImage";
import { ErrorState } from "@/ts/components/errorState";

class WeatherUIManager {
  private static readonly CONTAINER_IDS = [
    "current",
    "forecast",
    "header",
    "img__container-tablet",
    "img__container-desktop",
  ];
  private loadingState: LoadingState | null = null;
  private errorState: ErrorState | null = null;

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    window.addEventListener("weatherDataChanging", () =>
      this.handleDataChanging()
    );
    window.addEventListener("weatherDataChanged", () =>
      this.handleDataChanged()
    );
    window.addEventListener("cfModeChanged", () => this.handleCFModeChanged());
    window.addEventListener("weatherError", ((event: Event) => {
      this.handleError((event as CustomEvent).detail);
    }) as EventListener);
  }

  private handleDataChanging(): void {
    this.clearCurrentState();
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = "none";
      }
    });
    this.loadingState = new LoadingState("content");
  }

  private handleError(errorMessage: string): void {
    this.clearCurrentState();
    this.errorState = new ErrorState("error", errorMessage);
  }

  private clearCurrentState(): void {
    // Clear loading state if exists
    if (this.loadingState) {
      this.loadingState.stopLoading();
      this.loadingState = null;
    }

    // Clear error state if exists
    if (this.errorState) {
      const errorContainer = document.getElementById("error");
      const current = document.getElementById("current");
      const header = document.getElementById("header");
      const forecast = document.getElementById("forecast");

      if (errorContainer) errorContainer.innerHTML = "";
      if (current) current.innerHTML = "";
      if (header) header.innerHTML = "";
      if (forecast) forecast.innerHTML = "";

      this.errorState = null;
    }

    this.emptyContainers();
  }

  private handleDataChanged(): void {
    this.loadingState?.stopLoading();
    this.loadingState = null;
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = "";
      }
    });
    updateUI();
  }

  private handleCFModeChanged(): void {
    this.emptyContainers();
    updateUI();
  }

  private emptyContainers(): void {
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = "";
      }
    });
  }
}

// Initialize
new SearchBar("search-bar");
new WeatherUIManager();

const updateUI = () => {
  const data = localStorage.getItem("weatherData") || "";
  const mode = localStorage.getItem("mode") || "C";
  const filteredData = getFullWeatherData(data, mode);
  const JSONdata = JSON.parse(filteredData);

  const body = document.querySelector("body");
  // Remove any existing time classes first
  body?.classList.remove("morning", "afternoon", "evening", "night");
  // Add the new time class
  const timeState = JSONdata.timeState || "morning";
  body?.classList.add(timeState);

  const imgContainerTablet = document.getElementById("img__container-tablet");
  const imgContainerDesktop = document.getElementById("img__container-desktop");

  if (
    imgContainerTablet &&
    window.innerWidth < 1024 &&
    window.innerWidth >= 768
  ) {
    imgContainerTablet.textContent = "";
    imgContainerTablet.appendChild(
      new WeatherStateImage(
        JSONdata.weatherCondition,
        JSONdata.time
      ).getElement()
    );
  }

  if (imgContainerDesktop && window.innerWidth >= 1024) {
    imgContainerDesktop.textContent = "";
    imgContainerDesktop.appendChild(
      new WeatherStateImage(
        JSONdata.weatherCondition,
        JSONdata.time
      ).getElement()
    );
  }

  const currentCardContainer = document.getElementById("current");
  if (currentCardContainer) {
    new CurrentCard(filteredData, "current");
  }

  const forecastContainer = document.getElementById("forecast");
  if (forecastContainer) {
    new ForecastList(filteredData, "forecast");
  }

  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    new Header(filteredData, "header");
  }
};

const data = localStorage.getItem("weatherData");
if (data) {
  updateUI();
}
