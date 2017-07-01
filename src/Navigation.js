import { createElement } from "./Helpers";
import "./css/Navigation.scss";

export default class Navigation {
    constructor(container, props) {
        this.container = container;
        this.props = props;
        this.navigation = createElement({
            tag: "div",
            classList: [...props.classList]
        });
        this.links = [];
        this.activeTabIndex = props.activeTab;
        this.activeTab = null;
    }
    create() {
        let indexTab = 1;
        for (let item of this.props.tabs) {
            const link = createElement({
                tag: "a",
                classList: ["tab-link"],
                "data-id": indexTab
            });
            link.innerHTML = item.title;
            link.href = `#${item.link}`;
            this.links.push(link);
            const tab = createElement({
                    tag: "div",
                    classList: ["tab", `tab-${indexTab}`]
                },
                link
            );
            this.activeTab = this.links[this.activeTabIndex];
            this.activeTab.classList.add("active");
            this.navigation.appendChild(tab);
            indexTab++;
        }
        this.container.appendChild(this.navigation);
    }
    toggleActiveTab(newActiveId) {
        this.activeTab.classList.toggle("active");
        this.activeTabIndex = newActiveId;
        this.activeTab = this.links[newActiveId];
        this.activeTab.classList.add("active");
    }
}