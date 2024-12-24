import { SearchBar } from "@/ts/components/searchBar";
import "@/style/main.css";
import { CurrentCard } from "./ts/components/currentCard";
import { getFullWeatherData } from "./ts/utils/data/weatherUtils";

const searchbar = new SearchBar("search-bar");
const data = localStorage.getItem("weatherData");
if (data) {
  const filteredData = getFullWeatherData(data);
  const current = new CurrentCard(filteredData, "current-card");
}
