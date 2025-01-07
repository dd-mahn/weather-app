import { SearchBar } from "@/ts/components/searchBar";
import "@/style/main.css";
import { CurrentCard } from "@/ts/components/currentCard";
import { getFullWeatherData } from "@/ts/utils/data/weatherUtils";
import { ForecastList } from "@/ts/components/forecastList";
import { Header } from "@/ts/components/header";
import { LoadingState } from "@/ts/components/loadingState";
import { WeatherStateImage } from "./ts/components/weatherStateImage";

class WeatherUIManager {
  private static readonly CONTAINER_IDS = ["current", "forecast", "header"];
  private loadingState: LoadingState | null = null;

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
  }

  private handleDataChanging(): void {
    this.emptyContainers();
    this.loadingState = new LoadingState("content");
  }

  private handleDataChanged(): void {
    this.loadingState?.stopLoading();
    this.loadingState = null;
    updateUI();
  }

  private handleCFModeChanged(): void {
    this.emptyContainers();
    updateUI();
  }

  private emptyContainers(): void {
    WeatherUIManager.CONTAINER_IDS.forEach((id) => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = "";
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
  console.log(JSONdata)

  const body = document.querySelector("body")
  // Remove any existing time classes first
  body?.classList.remove("morning", "afternoon", "evening", "night");
  // Add the new time class
  body?.classList.add(JSONdata.timeState || "morning");

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
