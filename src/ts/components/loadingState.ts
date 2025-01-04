export class LoadingState{
    private container: HTMLElement
    private loadingState: HTMLElement

    constructor(containerId: string){
        this.container = document.getElementById(containerId) as HTMLElement

        this.loadingState = document.createElement("div")
        this.loadingState.classList.add("loading-state")

        this.setupLoading()
        this.render()
    }

    private setupLoading(){
        const loadingContent = document.createElement("span")
        loadingContent.classList.add("material-symbols-outlined")
        loadingContent.classList.add("loading-state__content")
        loadingContent.textContent = "cyclone"

        this.loadingState.appendChild(loadingContent)
    }

    private render(){
        this.container.appendChild(this.loadingState)
    }

    public stopLoading(){
        this.container.removeChild(this.loadingState)
    }
}