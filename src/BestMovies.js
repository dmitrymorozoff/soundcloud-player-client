import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import "./css/BestMovies.scss";

export default class BestMovies {
  constructor(container) {
    this.container = container;
    this.movies = [];
    this.bestMoviesLayer = null;
    this.bestMoviesUrl =
      "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22";
    this.modalWithInfo = null;
    this.modal = null;
  }
  create() {
    this.bestMoviesLayer = createElement({
      tag: "div",
      classList: ["best-movies"]
    });
    const bestMoviesLayerWrap = createElement(
      {
        tag: "div",
        classList: ["best-movies-wrap"]
      },
      this.bestMoviesLayer
    );
    this.container.appendChild(bestMoviesLayerWrap);
    this.modal = new Modal(this.bestMoviesLayer, "best-movies");
    this.modal.create();
    document.addEventListener("keydown", event => {
      if (event.keyCode == 27) {
        this.modal.hide();
      }
    });
  }
  loadingMovies() {
    let movieHelper = new MovieHelper();
    let movieItem = null;
    movieHelper
      .getData(
        movieHelper.getUrl() +
          "discover/movie" +
          movieHelper.getApiKey() +
          this.bestMoviesUrl
      )
      .then(data => {
        for (let movie of data.results) {
          movieItem = new MovieCard(this.bestMoviesLayer, movie);
          movieItem.create("full");
          movieItem.poster.addEventListener(
            "click",
            this.handleClickOnMovieCard.bind(this)
          );
          this.movies.push(movieItem);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleClickOnMovieCard(event) {
    if (event.target.className === "poster-wrap-full") {
      let currentCard = event.target.parentElement;
      let currentCardId = currentCard.getAttribute("data-id");
      let movieHelper = new MovieHelper();
      movieHelper
        .getData(
          movieHelper.getUrl() +
            "movie/" +
            currentCardId +
            movieHelper.getApiKey()
        )
        .then(data => {
          console.log(data);
          this.modal.appendInnerStructure(function() {
            const title = createElement({
              tag: "div",
              classList: ["modal-title"]
            });
            title.innerHTML = data.title;
            return title;
          });
        })
        .catch(e => {
          console.log(e);
        });
      this.modal.show();
    }
  }
}
