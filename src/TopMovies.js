import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import Scrollbar from "./Scrollbar";
import "./css/TopMovies.scss";

export default class TopMovies {
  constructor(container) {
    this.container = container;
    this.movies = [];
    this.scrollBarLinks = [];
    this.topMoviesLayer = null;
    this.scroll = null;
    this.topMoviesUrl = "&primary_release_year=2016&page=12";
  }
  create() {
    this.topMoviesLayer = createElement({
      tag: "div",
      classList: ["top-movies"]
    });
    const topMoviesLayerWrap = createElement(
      {
        tag: "div",
        classList: ["top-movies-wrap"]
      },
      this.topMoviesLayer
    );
    this.scroll = new Scrollbar(
      topMoviesLayerWrap,
      this.scrollBarLinks,
      this.topMoviesLayer
    );
    this.scroll.create();
    this.container.appendChild(topMoviesLayerWrap);
  }
  loadingMovies() {
    let movieHelper = new MovieHelper();
    let movieItem = null;
    movieHelper
      .getData(
        movieHelper.getUrl() +
          "discover/movie" +
          movieHelper.getApiKey() +
          this.topMoviesUrl
      )
      .then(data => {
        for (let movie of data.results) {
          movieItem = new MovieCard(this.topMoviesLayer, movie);
          this.scrollBarLinks.push(movie.original_title);
          this.movies.push(movieItem);
          movieItem.create();
        }
        this.scroll.addLinks(this.scrollBarLinks);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
