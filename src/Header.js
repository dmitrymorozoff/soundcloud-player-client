import { createElement } from "./Helpers";
import "./css/Header.scss";

export default class Header {
    constructor(container, props) {
        this.container = container;
        this.props = props;
    }
    create() {
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
        logoTitle.innerHTML = "The Movie DB";
        logoWrap.appendChild(logo);
        const search = createElement({
            tag: "input",
            classList: ["search"]
        });
        search.type = "text";
        const header = createElement({
                tag: "div",
                classList: ["header"]
            },
            logoWrap,
            logoTitle,
            search
        );
        this.container.appendChild(header);
    }
}