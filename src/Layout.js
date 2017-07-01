import { createElement } from "./Helpers";
import "./css/Layout.scss";

export default class Layout {
    constructor(container, props) {
        this.container = container;
        this.count = props.layersList.length;
        this.layers = [];
        this.activeLayerIndex = props.activeLayer;
        this.props = props;
        this.activeLayer = null;
    }
    create() {
        let indexLayer = 1;
        for (let item of this.props.layersList) {
            const layer = createElement({
                tag: "div",
                classList: ["layer", `layer-${indexLayer}`, item.link],
                "data-id": indexLayer
            });
            this.layers.push(layer);
            this.container.appendChild(layer);
            indexLayer++;
        }
        this.activeLayer = this.layers[this.activeLayerIndex];
        this.activeLayer.classList.add("active");
    }
    toggleLayer(newActiveId) {
        this.activeLayer.classList.toggle("active");
        this.activeLayerIndex = newActiveId;
        this.activeLayer = this.layers[newActiveId];
        this.activeLayer.classList.add("active");
    }
}