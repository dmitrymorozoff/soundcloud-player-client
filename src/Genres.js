import Sidebar from "./Sidebar";
import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import "./css/Genres.scss";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default class Genres {
  constructor(container) {
    this.container = container;
    this.sidebar = null;
    this.genresGrid = null;
    this.gridItems = [];
  }
  create() {
    const sidebar = new Sidebar();
    this.sidebar = sidebar.create();
    const genresWrap = createElement(
      {
        tag: "div",
        classList: ["genres-wrap"]
      },
      this.sidebar
    );
    this.genresGrid = createElement({
      tag: "div",
      classList: ["genres-grid"]
    });
    genresWrap.appendChild(this.genresGrid);
    this.container.appendChild(genresWrap);
  }
  loadGenres() {
    const movieHelper = new MovieHelper();
    movieHelper
      .getData(
        movieHelper.getUrl() + "genre/movie/list" + movieHelper.getApiKey()
      )
      .then(data => {
        console.log(data.genres);
        for (let item of data.genres) {
          let genreItem = createElement({
            tag: "li",
            classList: ["sidebar-list-item"],
            "data-id": item.id
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
    this.loadMovies();
  }
  loadMovies(url = "&with_genres=27") {
    this.genresGrid.innerHTML = "";
    let movieHelper = new MovieHelper();
    let movieItem = null;
    let gridItem = null;
    let randomClassName = null;
    movieHelper
      .getData(
        movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + url
      )
      .then(data => {
        for (let movie of data.results) {
          if (getRandomInt(1, data.results.length) % 2 === 0) {
            randomClassName = "type1";
          } else if (getRandomInt(1, 30) % 3 !== 0) {
            randomClassName = "type2";
          } else {
            randomClassName = "type3";
          }
          gridItem = createElement({
            tag: "div",
            classList: ["grid-item", randomClassName]
          });
          movieItem = new MovieCard(this.genresGrid, movie);
          this.genresGrid.appendChild(gridItem);
          gridItem.appendChild(movieItem.create("grid"));
          this.gridItems.push(movieItem);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleGenresListClick(event) {
    let genreId = event.target.getAttribute("data-id");
    this.genresGrid.innerHTML = "";
    this.loadMovies(`&with_genres=${genreId}`);
  }
}
