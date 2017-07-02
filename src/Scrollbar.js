import { createElement } from "./Helpers";
import "./css/Scrollbar.scss";

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

export default class Scrollbar {
    constructor(container, items, slideWith) {
        this.container = container;
        this.scroll = null;
        this.shiftX = null;
        this.sliderCoords = null;
        this.newLeftCoods = null;
        this.mouseDownFlag = false;
        this.items = items;
        this.slideWith = slideWith;
    }
    create() {
        this.scroll = createElement({
            tag: "div",
            classList: ["scrollbar"]
        });
        const scrollWrap = createElement({
                tag: "div",
                classList: ["scrollbar-wrap"]
            },
            this.scroll
        );
        this.container.appendChild(scrollWrap);
        this.sliderCoords = getCoords(this.scroll);
        this.scroll.addEventListener("mousedown", this.startDrag.bind(this));
        this.scroll.addEventListener("dragstart", this.endDrag.bind(this));
        document.addEventListener("mouseup", this.endDrag.bind(this));
    }
    addLinks(items) {
        let scrollItem = null;
        items.forEach(item => {
            scrollItem = createElement({
                tag: "div",
                classList: ["scrollbar-item"]
            });
            scrollItem.innerHTML = item;
            this.scroll.appendChild(scrollItem);
        });
    }
    startDrag(event) {
        this.shiftX = event.pageX;
        document.addEventListener("mousemove", this.moveMouse.bind(this));
        this.mouseDownFlag = true;
    }
    endDrag() {
        this.mouseDownFlag = false;
    }
    moveMouse(event) {
        if (this.mouseDownFlag !== false) {
            this.newLeftCoods = event.pageX - this.shiftX - this.sliderCoords.left;
            if (this.newLeftCoods < 0) {
                this.newLeftCoods = 0;
            }
            this.scroll.style.left = -this.newLeftCoods + "px";
            this.slideWith.style.left = -this.newLeftCoods * 1.5 + "px";
            console.log(this.slideWith);
        }
    }
}