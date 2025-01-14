import { weatherState } from "../types/weatherTypes";
import "@/style/components/header.css";

export class Header {
  private readonly elements: {
    container: HTMLElement;
    date: HTMLParagraphElement;
    monthyear: HTMLParagraphElement; 
    time: HTMLHeadingElement;
    city: HTMLHeadingElement;
  };

  constructor(weatherData: string, containerId: string) {
    const isMobile = window.innerWidth < 768;
    const data = JSON.parse(weatherData) as weatherState;

    this.elements = {
      container: document.getElementById(containerId) as HTMLElement,
      date: this.createTextElement('p', ['header__date', isMobile ? 'text-xs' : 'text-s'], data.day[0]),
      monthyear: this.createTextElement('p', ['header__monthyear', isMobile ? 'text-xs' : 'text-s'], data.day[1]),
      time: this.createTextElement('h3', ['header__time', isMobile ? 'text-m' : 'text-h3'], data.time),
      city: this.createTextElement('h1', ['header__city', 'text-h1'], data.address)
    };

    this.render();
  }

  private createTextElement<K extends keyof HTMLElementTagNameMap>(
    tag: K, 
    classes: string[], 
    text: string
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;
    return element;
  }

  private createContainer(className: string, children: HTMLElement[]): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add(className);
    children.forEach(child => container.appendChild(child));
    return container;
  }

  private render(): void {
    const { container, date, monthyear, time, city } = this.elements;

    const dateContainer = this.createContainer('header__sub-1', [date, monthyear]);
    const timeContainer = this.createContainer('header__sub-2', [dateContainer, time]);

    container.innerHTML = '';
    
    if (window.innerWidth < 1024) {
      container.append(timeContainer, city);
    } else {
      container.append(city, timeContainer);
    }
  }
}
