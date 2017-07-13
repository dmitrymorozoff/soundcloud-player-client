import Sidebar from "./Sidebar";
import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import MovieCard from "./MovieCard";
import Button from "./Button";
import Dropdown from "./Dropdown";
import "./css/Genres.scss";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function appendToGenresCotainer(items, container) {
  container.innerHTML = "";
  let gridItem = null;
  for (let item of items) {
    gridItem = createElement(
      {
        tag: "div",
        classList: ["grid-item"]
      },
      item.card
    );
    container.appendChild(gridItem);
  }
}

const sortFunctions = {
  byRating: function(a, b) {
    return b.rate - a.rate;
  },
  byVoteCount: function(a, b) {
    return b.voteCount - a.voteCount;
  },
  byVoteCount: function(a, b) {
    return b.popularity - a.popularity;
  }
};

export default class Genres {
  constructor(container) {
    this.container = container;
    this.sidebar = null;
    this.genresGrid = null;
    this.gridItems = [];
    this.dropdownSort = null;
    this.currentPage = 1;
    this.genreId = "";
  }
  create() {
    const sidebar = new Sidebar();
    this.sidebar = sidebar.create();
    const genresGridWrap = createElement({
      tag: "div",
      classList: ["genres-grid-wrap"]
    });

    this.dropdownSort = new Dropdown({
      title: "Choose field",
      links: ["Rating", "Vote Count", "Popularity"],
      classList: ["dropdown-sort"]
    });
    const sortWrap = createElement(
      {
        tag: "div",
        classList: ["sort-wrap"]
      },
      this.dropdownSort.create()
    );
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
    const showMoreBtn = new Button({
      title: "Show More",
      classList: ["show-more-btn"]
    }).create();
    showMoreBtn.addEventListener(
      "click",
      this.handleShowMoreBtnClick.bind(this)
    );
    genresGridWrap.appendChild(sortWrap);
    genresGridWrap.appendChild(this.genresGrid);
    genresGridWrap.appendChild(showMoreBtn);
    genresWrap.appendChild(genresGridWrap);
    this.container.appendChild(genresWrap);

    this.dropdownSort.dropDownBtn.addEventListener(
      "click",
      this.handleDropdownBtnClick.bind(this, this.dropdownSort)
    );
    for (let item of this.dropdownSort.linkItems) {
      item.addEventListener("click", this.handleDropdownLinkClick.bind(this));
    }
  }
  loadGenres() {
    const movieHelper = new MovieHelper();
    movieHelper
      .getData(
        movieHelper.getUrl() + "genre/movie/list" + movieHelper.getApiKey()
      )
      .then(data => {
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
    this.currentPage = 1;
    this.gridItems = [];
    this.genreId = event.target.getAttribute("data-id");
    this.genresGrid.innerHTML = "";
    this.loadMovies(`&with_genres=${this.genreId}&page=${this.currentPage}`);
  }
  handleDropdownBtnClick(item) {
    if (item.hasActive()) {
      item.hide();
    } else {
      item.show();
    }
  }
  handleDropdownLinkClick(event) {
    this.dropdownSort.hide();
    let type = event.target.getAttribute("data-type");
    switch (type) {
      case "rating":
        this.gridItems.sort(sortFunctions.byRating);
        appendToGenresCotainer(this.gridItems, this.genresGrid);
        break;
      case "votecount":
        this.gridItems.sort(sortFunctions.byVoteCount);
        appendToGenresCotainer(this.gridItems, this.genresGrid);
        break;
      case "popularity":
        this.gridItems.sort(sortFunctions.popularity);
        appendToGenresCotainer(this.gridItems, this.genresGrid);
        break;
      default:
        break;
    }
  }
  handleShowMoreBtnClick() {
    this.currentPage++;
    this.loadMovies(`&with_genres=${this.genreId}&page=${this.currentPage}`);
  }
}
