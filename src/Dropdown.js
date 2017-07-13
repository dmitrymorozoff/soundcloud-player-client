import { createElement } from "./Helpers";
import "./css/Dropdown.scss";

export default class Dropdown {
  constructor(props) {
    this.title = props.title;
    this.links = props.links;
    this.classList = props.classList;
    this.dropDownList = null;
    this.dropDownBtn = null;
    this.activeItem = "";
    this.linkItems = [];
  }
  create() {
    const dropdownWrap = createElement({
      tag: "div",
      classList: ["dropdown", ...this.classList]
    });

    const btnTitle = createElement({
      tag: "span",
      classList: ["dropdown-btn-title"]
    });
    btnTitle.innerHTML = this.title;
    const btnIcon = createElement({
      tag: "span",
      classList: ["dropdown-btn-icon"]
    });
    this.dropDownBtn = createElement(
      {
        tag: "div",
        classList: ["dropdown-btn"]
      },
      btnTitle,
      btnIcon
    );
    this.dropDownList = createElement({
      tag: "ul",
      classList: ["dropdown-list"]
    });
    for (let i = 0; i < this.links.length; i++) {
      let dropdownLinkItem = createElement({
        tag: "li",
        classList: ["dropdown-list-link"],
        "data-type": this.links[i].replace(" ", "").toLowerCase()
      });
      dropdownLinkItem.innerHTML = this.links[i];
      this.linkItems.push(dropdownLinkItem);
      this.dropDownList.appendChild(dropdownLinkItem);
    }
    dropdownWrap.appendChild(this.dropDownBtn);
    dropdownWrap.appendChild(this.dropDownList);
    return dropdownWrap;
  }
  hasActive() {
    return this.dropDownList.classList.contains("active");
  }
  show() {
    this.dropDownList.classList.add("active");
  }
  hide() {
    this.dropDownList.classList.remove("active");
    return this.activeItem;
  }
}
