import Sidebar from "./Sidebar";
import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import "./css/Genres.scss";

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
  loadMovies(url = "&with_genres=28") {
    this.genresGrid.innerHTML = "";
    let movieHelper = new MovieHelper();
    let movieItem = null;
    let gridItem = null;
    movieHelper
      .getData(
        movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + url
      )
      .then(data => {
        for (let movie of data.results) {
          gridItem = createElement({
            tag: "div",
            classList: ["grid-item"]
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
    this.loadMovies();
    console.log(event.target);
  }
}
