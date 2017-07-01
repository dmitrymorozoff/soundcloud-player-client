import Layout from "./Layout";
import Navigation from "./Navigation";
import Header from "./Header";
const tabs = [{
        title: "Stream",
        link: "stream"
    },
    {
        title: "Discover",
        link: "discover"
    },
    {
        title: "Top List",
        link: "toplist"
    },
    {
        title: "My Tracks",
        link: "mytracks"
    },
    {
        title: "Home",
        link: "home"
    }
];

export default class Player {
    constructor(startActiveLayer) {
        this.container = document.getElementById("app");
        this.navigation = new Navigation(this.container, {
            classList: ["tabs-list"],
            tabs: tabs,
            activeTab: startActiveLayer
        });
        this.header = new Header(this.container, {
            src: "./img/SoundCloud1.png"
        });

        this.layout = new Layout(this.container, {
            layersList: tabs,
            activeLayer: startActiveLayer
        });
        this.header.create();
        this.navigation.create();
        this.layout.create();
        this.currentActiveTab = 0;
    }
    init() {
        for (let link of this.navigation.links) {
            link.addEventListener("click", this.handleClick.bind(this));
        }
    }
    handleClick(event) {
        event.preventDefault();
        let newActiveTab = event.target;
        let newActiveId = parseInt(newActiveTab.getAttribute("data-id"), 10) - 1;
        this.layout.toggleLayer(newActiveId);
        this.navigation.toggleActiveTab(newActiveId);
        console.log(newActiveId);
    }
}