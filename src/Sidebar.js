import { createElement } from "./Helpers";
import "./css/Sidebar.scss";

export default class Sidebar {
    constructor() {
        this.listItems = [];
        this.sidebarList = null;
    }
    create() {
        const sidebarListWrap = createElement({
            tag: "div",
            classList: ["sidebar-list-wrap"]
        });
        this.sidebarList = createElement({
            tag: "ul",
            classList: ["sidebar-list"]
        });
        return this.sidebarList;
    }
}