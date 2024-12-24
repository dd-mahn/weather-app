export class SwitchButton {
  private currentMode: string;
  private container: HTMLElement;
  private button: HTMLButtonElement;
  private switch: HTMLDivElement;
  private labelContainer: HTMLDivElement;
  private labels: HTMLSpanElement[];

  constructor(currentMode: string = "C") {
    this.currentMode = "C";
    this.container = document.createElement("div");
    this.button = document.createElement("button");
    this.switch = document.createElement("div");
    this.labelContainer = document.createElement("div");
    this.labels = ["C", "F"].map((label) => {
      const span = document.createElement("span");
      span.textContent = label;
      return span;
    });

    this.setup();
  }

  private setup() {
    this.button.addEventListener("click", () => this.onSwitch());

    this.switch.classList.add("switch");
    if (this.currentMode === "F") {
      this.switch.classList.add("switch-F");
    }
    
    this.labelContainer.classList.add("label-container");

    this.labels.forEach((label) => this.labelContainer.appendChild(label));

    this.container.appendChild(this.labelContainer);
    this.container.appendChild(this.button);

    this.button.appendChild(this.switch);
  }

  private onSwitch() {
    this.switch.classList.toggle("switch-F");
    this.currentMode = this.currentMode === "C" ? "F" : "C";
    localStorage.setItem("mode", this.currentMode);
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}
