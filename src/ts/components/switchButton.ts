import "@/style/components/switch.css"

export class SwitchButton {
  private currentMode: string;
  private container: HTMLElement;
  private button: HTMLButtonElement;
  private switch: HTMLDivElement;
  private labelContainer: HTMLDivElement;
  private labels: HTMLSpanElement[];

  // Define custom event name
  private static readonly MODE_CHANGE_EVENT = "cfModeChanged";

  constructor(currentMode: string = "C") {
    this.currentMode = localStorage.getItem("mode") || "C";
    this.container = document.createElement("div");
    this.button = document.createElement("button");
    this.switch = document.createElement("div");
    this.labelContainer = document.createElement("div");
    this.labels = ["C", "F"].map((label) => {
      const span = document.createElement("span");
      span.textContent = label;
      span.classList.add("switch__label", "button-l");
      return span;
    });

    this.setup();
  }

  private setup() {
    this.button.addEventListener("click", () => this.onSwitch());

    this.container.classList.add("switch");
    
    this.switch.classList.add("switch__thumb");
    
    this.labelContainer.classList.add("switch__labels");
    this.button.classList.add("switch__button");
    if(this.currentMode === "F"){
      this.button.classList.add("mode-f")
    }else{
      this.button.classList.remove("mode-f")
    }

    this.labels.forEach((label) => {;
      if (this.currentMode === label.textContent) {
        label.classList.add("switch__label--active");
      }
      this.labelContainer.appendChild(label);
    });

    this.button.appendChild(this.switch);
    this.container.appendChild(this.labelContainer);
    this.container.appendChild(this.button);
  }

  private onSwitch() {
    const newMode = this.currentMode === "C" ? "F" : "C";
    this.switch.classList.toggle("switch__thumb--right");
    this.currentMode = newMode;

    // Update active label styles
    this.labels.forEach(label => {
      label.classList.toggle("switch__label--active");
    });

    localStorage.setItem("mode", newMode);
    this.dispatchModeChangeEvent(newMode);
  }

  private dispatchModeChangeEvent(mode: string) {
    const event = new CustomEvent(SwitchButton.MODE_CHANGE_EVENT, {
      detail: mode,
    });
    window.dispatchEvent(event);
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}
