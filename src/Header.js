import { createElement } from "./Helpers";
import "./css/Header.scss";

export default class Header {
    constructor(container, props) {
        this.container = container;
        this.props = props;
    }
    create() {
        const header = createElement({
            tag: "div",
            classList: ["header"]
        });
        const logoWrap = createElement({
            tag: "div",
            classList: ["header-logo-wrap"]
        });
        const logoTitle = createElement({
            tag: "div",
            classList: ["header-logo-title"]
        });
        const logo = createElement({
            tag: "img",
            classList: ["logo"]
        });

        logo.src = this.props.src;
        logoTitle.innerHTML = "SoundCloud";
        logoWrap.appendChild(logo);
        header.appendChild(logoWrap);
        header.appendChild(logoTitle);
        this.container.appendChild(header);
    }
}