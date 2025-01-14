import { getWeather } from "@/ts/api/getWeather";
import "@/style/components/search.css"
// Interface for storage operations
interface StorageService {
  save(key: string, value: string): void;
  get(key: string): string | null;
}

// Local storage implementation
class LocalStorageService implements StorageService {
  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }
}

// Interface for event dispatching
interface EventDispatcher {
  dispatchDataChanged(data: string): void;
  dispatchDataChanging(): void;
  dispatchError(error: string): void;
}

// Window event dispatcher implementation
class WindowEventDispatcher implements EventDispatcher {
  dispatchDataChanged(data: string): void {
    const event = new CustomEvent("weatherDataChanged", { detail: data });
    window.dispatchEvent(event);
  }

  dispatchDataChanging(): void {
    const event = new CustomEvent("weatherDataChanging");
    window.dispatchEvent(event);
  }

  dispatchError(error: string): void {
    const event = new CustomEvent("weatherError", { detail: error });
    window.dispatchEvent(event);
  }
}

// Interface for weather data fetching
interface WeatherService {
  fetchWeather(query: string): Promise<any>;
}

// Weather API implementation
class WeatherAPIService implements WeatherService {
  async fetchWeather(query: string): Promise<any> {
    return await getWeather(query);
  }
}

export class SearchBar {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;
  private icon: HTMLSpanElement;
  private readonly dataKey: string;
  private readonly lastSearchKey: string = "lastSearch";
  private readonly storageService: StorageService;
  private readonly eventDispatcher: EventDispatcher;
  private readonly weatherService: WeatherService;
  private isSearching: boolean = false;

  constructor(
    containerId: string,
    storageService: StorageService = new LocalStorageService(),
    eventDispatcher: EventDispatcher = new WindowEventDispatcher(),
    weatherService: WeatherService = new WeatherAPIService()
  ) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.input = document.createElement("input");
    this.button = document.createElement("button");
    this.icon = document.createElement("span");
    this.dataKey = process.env.LOCAL_STORAGE_KEY || "weatherData";
    this.storageService = storageService;
    this.eventDispatcher = eventDispatcher;
    this.weatherService = weatherService;

    this.setup();
    this.initializeDefaultSearch();
  }

  private setup(): void {
    this.setupInput();
    this.setupButton();
    this.setupIcon();
    this.attachEventListeners();
    this.render();
  }

  private setupInput(): void {
    this.input.type = "text";
    this.input.placeholder = "Enter location";
    this.input.value = this.getLastSearch() || "Hanoi";
  }

  private setupButton(): void {
    this.button.appendChild(this.icon);
  }

  private setupIcon(): void {
    this.icon.classList.add("material-symbols-outlined");
    this.icon.textContent = "search";
  }

  private attachEventListeners(): void {
    this.button.addEventListener("click", () => {
      if (!this.isSearching) {
        this.onSearch();
      }
    });

    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !this.isSearching) {
        this.onSearch();
      }
    });
  }

  private render(): void {
    this.container.appendChild(this.input);
    this.container.appendChild(this.button);
  }

  private async initializeDefaultSearch(): Promise<void> {
    const lastSearch = this.getLastSearch();
    if (!lastSearch) {
      this.input.value = "Hanoi";
      await this.onSearch();
    }
  }

  private async onSearch(): Promise<void> {
    const query = this.input.value;
    if (!query) return;

    try {
      this.isSearching = true;
      this.eventDispatcher.dispatchDataChanging();
      this.saveLastSearch(query);
      
      const data = await this.weatherService.fetchWeather(query);
      
      if (data.error) {
        throw new Error(data.error.message || "City not found");
      }
      
      const stringifiedData = JSON.stringify(data);
      this.saveData(stringifiedData);
      this.eventDispatcher.dispatchDataChanged(stringifiedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.eventDispatcher.dispatchError(error instanceof Error ? error.message : "Failed to fetch weather data");
    } finally {
      this.isSearching = false;
    }
  }

  private saveData(data: string): void {
    this.storageService.save(this.dataKey, data);
  }

  private getLastSearch(): string | null {
    return this.storageService.get(this.lastSearchKey);
  }

  private saveLastSearch(query: string): void {
    this.storageService.save(this.lastSearchKey, query);
  }
}
