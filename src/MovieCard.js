import { createElement } from "./Helpers";
import Button from "./Button";
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
    this.buyTicketButton = null;
  }
  create(cardCategory = "part") {
    let postfix = cardCategory;

    const cardPoster = createElement({
      tag: "img",
      classList: ["poster-" + postfix]
    });
    cardPoster.src = this.posterPath;
    cardPoster.alt = this.title;
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
    cardRate.innerHTML =
      cardCategory === "part" ? `${this.rate}/10` : `${this.rate}`;
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
    const btnAddToBookmars = new Button({
      title: "Add Bookmark",
      classList: ["movie-card-btn-" + postfix]
    });
    if (cardCategory !== "modal") {
      this.poster.appendChild(btnAddToBookmars.create());
    }
    const cardDesc = createElement({
      tag: "div",
      classList: ["movie-card-desc-" + postfix]
    });
    cardDesc.innerHTML = this.desc;
    cardContnt.appendChild(cardDesc);
    const button = new Button({
      title: "Buy Ticket",
      classList: ["modal-btn"]
    });
    this.buyTicketButton = button.create();
    if (cardCategory === "modal") {
      cardContnt.appendChild(this.buyTicketButton);
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
    return this.card;
  }
}
