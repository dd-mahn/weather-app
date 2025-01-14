import "@/style/components/switch.css"

export class SwitchButton {
  private static readonly MODE_CHANGE_EVENT = "cfModeChanged";
  private static readonly MODES = ["C", "F"] as const;
  private static readonly DEFAULT_MODE = "C";

  private currentMode: typeof SwitchButton.MODES[number];
  private readonly elements: {
    container: HTMLElement;
    button: HTMLButtonElement; 
    switch: HTMLDivElement;
    labelContainer: HTMLDivElement;
    labels: HTMLSpanElement[];
  };

  constructor() {
    this.currentMode = localStorage.getItem("mode") as typeof SwitchButton.MODES[number] || SwitchButton.DEFAULT_MODE;
    
    this.elements = {
      container: document.createElement("div"),
      button: document.createElement("button"),
      switch: document.createElement("div"),
      labelContainer: document.createElement("div"),
      labels: SwitchButton.MODES.map(this.createLabel)
    };

    this.setup();
  }

  private createLabel(label: string): HTMLSpanElement {
    const span = document.createElement("span");
    span.textContent = label;
    span.classList.add("switch__label", "button-l");
    return span;
  }

  private setup(): void {
    const { container, button, switch: switchThumb, labelContainer, labels } = this.elements;

    button.addEventListener("click", () => this.onSwitch());

    container.classList.add("switch");
    switchThumb.classList.add("switch__thumb");
    labelContainer.classList.add("switch__labels");
    button.classList.add("switch__button");
    
    this.updateButtonState();

    labels.forEach(label => {
      if (this.currentMode === label.textContent) {
        label.classList.add("switch__label--active");
      }
      labelContainer.appendChild(label);
    });

    button.appendChild(switchThumb);
    container.appendChild(labelContainer);
    container.appendChild(button);
  }

  private updateButtonState(): void {
    if (this.currentMode === "F") {
      this.elements.button.classList.add("mode-f");
    } else {
      this.elements.button.classList.remove("mode-f");
    }
  }

  private onSwitch(): void {
    this.currentMode = this.currentMode === "C" ? "F" : "C";
    this.elements.switch.classList.toggle("switch__thumb--right");
    
    this.elements.labels.forEach(label => {
      label.classList.toggle("switch__label--active");
    });

    this.updateButtonState();
    localStorage.setItem("mode", this.currentMode);
    this.dispatchModeChangeEvent();
  }

  private dispatchModeChangeEvent(): void {
    window.dispatchEvent(
      new CustomEvent(SwitchButton.MODE_CHANGE_EVENT, {
        detail: this.currentMode
      })
    );
  }

  public getElement(): HTMLElement {
    return this.elements.container;
  }
}
