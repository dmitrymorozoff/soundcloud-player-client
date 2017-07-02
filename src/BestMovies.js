import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import "./css/BestMovies.scss";

export default class BestMovies {
    constructor(container) {
        this.container = container;
        this.movies = [];
        this.bestMoviesLayer = null;
        this.bestMoviesUrl =
            "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22";
    }
    create() {
        this.bestMoviesLayer = createElement({
            tag: "div",
            classList: ["best-movies"]
        });
        const bestMoviesLayerWrap = createElement({
                tag: "div",
                classList: ["best-movies-wrap"]
            },
            this.bestMoviesLayer
        );
        this.container.appendChild(bestMoviesLayerWrap);
    }
    loadingMovies() {
        let movieHelper = new MovieHelper();
        let movieItem = null;
        movieHelper
            .getData(this.bestMoviesUrl)
            .then(data => {
                for (let movie of data) {
                    movieItem = new MovieCard(this.bestMoviesLayer, movie);
                    movieItem.create("full");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
}