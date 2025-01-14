import '@/style/components/error.css'

export class ErrorState {
  private container: HTMLElement;
  private errorHeading: HTMLElement;
  private errorText: HTMLElement;

  constructor(containerId: string, errorMessage: string) {
    this.container = document.getElementById(containerId) as HTMLElement;

    this.errorHeading = document.createElement("h1");
    this.errorHeading.classList.add("error__heading", "text-h1");

    this.errorText = document.createElement("h3");
    this.errorText.classList.add("error__text", "text-h3");

    this.setUpError(errorMessage);
  }

  private setUpError(message: string) {
    const container = document.createElement("div");
    container.classList.add("error__container");

    this.errorHeading.textContent = "404";
    this.errorText.textContent =
      message || "Error getting the data, please try again later.";

    container.appendChild(this.errorHeading);
    container.appendChild(this.errorText);
    this.container.appendChild(container);
  }
}
