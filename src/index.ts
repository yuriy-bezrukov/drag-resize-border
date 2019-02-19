export class dragResizeBorder {

  constructor(private selectorName: string, private sensitivityZone: number) {
    this.addListeners();
  }

  panel: HTMLDivElement = document.querySelector(this.selectorName);
  m_pos: number;

  onResize = e => {
    let dx = this.m_pos - e.x;
    this.m_pos = e.x;
    this.panel.style.width = (parseInt(getComputedStyle(this.panel, '').width) - dx) + "px";
  }

  onResizeOn = () => {
    this.panel.style.cursor = "w-resize";
    this.setVendorProperty(document.querySelector("body"), "userSelect", "none");
  }

  onResizeOff = () => {
    this.panel.style.cursor = "default";
    this.setVendorProperty(document.querySelector("body"), "userSelect", "");
  }

  isDragArea = (e: MouseEvent): boolean => {
    let inZone = e.pageX > (<HTMLDivElement>e.currentTarget).offsetWidth + (<HTMLDivElement>e.currentTarget).getBoundingClientRect().left - this.sensitivityZone;
    return inZone;
  }

  addListeners() {

    this.panel.addEventListener("mousedown", e => {
      if (!this.isDragArea(e))
        return
      this.m_pos = e.x;
      this.panel.classList.add("afterHandResize");
      document.addEventListener("mousemove", this.onResize, true);
    }, true);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.onResize, true);
    }, true);

    this.panel.addEventListener("mousemove", e => {
      if (this.isDragArea(e))
        this.onResizeOn();
      else
        this.onResizeOff();
    }, false);
    this.panel.addEventListener("mouseout", e => { this.onResizeOff() }, false);
  }

  setVendorProperty(element: HTMLElement, property: string, value: string) {
    element.style["webkit" + (property[0].toUpperCase() + property.slice(1))] = value;
    element.style["Moz" + (property[0].toUpperCase() + property.slice(1))] = value;
    element.style["ms" + (property[0].toUpperCase() + property.slice(1))] = value;
    element.style[property] = value;
  }
    
}

//export enum DirectionResize {
//  //left = "left",
//  right = "right"
//}

