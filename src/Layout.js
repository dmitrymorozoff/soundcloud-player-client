import { createElement } from "./Helpers";
import TopMovies from "./TopMovies";
import BestMovies from "./BestMovies";
import BestActors from "./BestActors";
import Genres from "./Genres";
import Bookmarks from "./Bookmarks";
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
    const topMovies = new TopMovies(this.layers[0]);
    topMovies.create();
    topMovies.loadingMovies();
    const bestActors = new BestActors(this.layers[0]);
    bestActors.create();
    bestActors.loadingActors();
    const bestMovies = new BestMovies(this.layers[0]);
    bestMovies.create();
    bestMovies.loadingMovies();
    const bookmarks = new Bookmarks(this.layers[3]);
    bestMovies.addObserver(bookmarks);
    const genres = new Genres(this.layers[1]);
    genres.create();
    genres.loadGenres();
  }

  toggleLayer(newActiveId) {
    this.activeLayer.classList.toggle("active");
    this.activeLayerIndex = newActiveId;
    this.activeLayer = this.layers[newActiveId];
    this.activeLayer.classList.add("active");
  }
}
