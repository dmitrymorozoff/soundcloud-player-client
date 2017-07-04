import { createElement } from "./Helpers";
import "./css/MovieCard.scss";

export default class MovieCard {
  constructor(container, props) {
    this.container = container;
    this.card = null;
    this.id = props.id;
    this.title = props.original_title;
    this.rate = props.vote_average;
    this.year = props.release_date;
    this.desc = props.overview;
    this.posterPath = "https://image.tmdb.org/t/p/w500" + props.poster_path;
    this.poster = null;
  }
  create(type = "part") {
    let postfix = type === "part" ? "part" : "full";

    const cardPoster = createElement({
      tag: "img",
      classList: ["poster-" + postfix]
    });
    cardPoster.src = this.posterPath;
    this.poster = createElement(
      {
        tag: "div",
        classList: ["poster-wrap-" + postfix]
      },
      cardPoster
    );
    const cardTitle = createElement({
      tag: "div",
      classList: ["movie-card-title-" + postfix]
    });
    cardTitle.innerHTML = this.title;
    const cardRate = createElement({
      tag: "div",
      classList: ["movie-card-rate-" + postfix]
    });
    cardRate.innerHTML = type === "part" ? `${this.rate}/10` : `${this.rate}`;
    const cardYear = createElement({
      tag: "div",
      classList: ["movie-card-year-" + postfix]
    });
    cardYear.innerHTML = this.year;
    const cardContnt = createElement(
      {
        tag: "div",
        classList: ["movie-card-content-" + postfix]
      },
      cardTitle,
      cardYear
    );
    const btnAddToBookmars = createElement({
      tag: "button",
      classList: ["movie-card-btn-" + postfix]
    });
    btnAddToBookmars.innerHTML = "Add Bookmark";
    if (type === "full") {
      this.poster.appendChild(btnAddToBookmars);
      const cardDesc = createElement({
        tag: "div",
        classList: ["movie-card-desc-" + postfix]
      });
      cardDesc.innerHTML = this.desc;
      cardContnt.appendChild(cardDesc);
    }
    this.card = createElement(
      {
        tag: "div",
        classList: ["movie-card-" + postfix],
        "data-id": this.id
      },
      this.poster,
      cardContnt,
      cardRate
    );
    this.container.appendChild(this.card);
  }
}
