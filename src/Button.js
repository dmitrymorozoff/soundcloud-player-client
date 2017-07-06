import { createElement } from "./Helpers";

export default class Button {
  constructor(props) {
    this.title = props.title;
    this.classList = props.classList;
    this.button = null;
  }
  create() {
    this.button = createElement({
      tag: "button",
      classList: [...this.classList]
    });
    this.button.innerHTML = this.title;
    return this.button;
  }
}
