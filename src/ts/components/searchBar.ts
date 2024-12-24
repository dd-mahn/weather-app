import { getWeather } from "@/ts/api/getWeather";
import { stringify } from "querystring";

export class SearchBar {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;
  private icon: HTMLSpanElement;
  private dataKey: string;
  private lastSearchKey: string = "lastSearch";

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.input = document.createElement("input");
    this.button = document.createElement("button");
    this.icon = document.createElement("span");
    this.dataKey = process.env.LOCAL_STORAGE_KEY || "weatherData";

    this.setup();
  }

  private setup() {
    this.input.type = "text";
    this.input.placeholder = "Enter location";
    this.input.value = this.getLastSearch() || "";

    this.button.appendChild(this.icon);

    this.icon.classList.add("material-symbols-outlined");
    this.icon.textContent = "search";

    this.button.addEventListener("click", () => this.onSearch());

    this.container.appendChild(this.input);
    this.container.appendChild(this.button);
  }

  private onSearch() {
    const query = this.input.value;
    if (query) {
      this.saveLastSearch(query);
      getWeather(query)
        .then((data) => {
          this.saveData(JSON.stringify(data));
        })
        .catch((error) => {
          this.saveData("Error:" + error);
        });
    }
  }

  private saveData(data: string) {
    localStorage.setItem(this.dataKey, data);
  }

  private getLastSearch() {
    return localStorage.getItem(this.lastSearchKey);
  }

  private saveLastSearch(query: string) {
    localStorage.setItem(this.lastSearchKey, query);
  }
}
