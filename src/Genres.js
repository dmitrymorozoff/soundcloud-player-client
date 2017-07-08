import Sidebar from "./Sidebar";
import { createElement } from "./Helpers";
import MoviesHelper from "./MoviesHelper";
import "./css/Genres.scss";

export default class Genres {
    constructor(container) {
        this.container = container;
        this.sidebar = null;
    }
    create() {
        const sidebar = new Sidebar();
        this.sidebar = sidebar.create();
        const genresWrap = createElement({
                tag: "div",
                classList: ["genres-wrap"]
            },
            this.sidebar
        );
        this.container.appendChild(genresWrap);
    }
    loadGenres() {
        const movieHelper = new MoviesHelper();
        movieHelper
            .getData(
                movieHelper.getUrl() + "genre/movie/list" + movieHelper.getApiKey()
            )
            .then(data => {
                console.log(data.genres);
                for (let item of data.genres) {
                    let genreItem = createElement({
                        tag: "li",
                        classList: ["sidebar-list-item"]
                    });
                    genreItem.innerHTML = item.name;
                    genreItem.addEventListener(
                        "click",
                        this.handleGenresListClick.bind(this)
                    );
                    this.sidebar.appendChild(genreItem);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    handleGenresListClick(event) {
        console.log(event.target);
    }
}