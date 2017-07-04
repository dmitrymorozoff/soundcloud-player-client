import { createElement } from "./Helpers";
import "./css/Modal.scss";
export default class Modal {
  constructor(container, prefix) {
    this.container = container;
    this.overflow = null;
    this.prefix = prefix;
    this.modal = null;
  }
  create() {
    this.modal = createElement({
      tag: "div",
      classList: ["modal", "modal" + this.prefix]
    });
    this.overflow = createElement(
      {
        tag: "div",
        classList: ["overflow", "overflow" + this.prefix]
      },
      this.modal
    );
    this.container.appendChild(this.overflow);
  }
  appendInnerStructure(innerStructure) {
    this.modal.appendChild(innerStructure());
  }
  show() {
    this.overflow.classList.add("active");
  }
  hide() {
    this.overflow.classList.remove("active");
    this.modal.innerHTML = "";
  }
}
