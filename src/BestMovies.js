import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import TicketReservation from "./TicketReservation";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Button from "./Button";
import "./css/BestMovies.scss";
import { halls } from "./HallScheme";

export default class BestMovies {
    constructor(container) {
        this.container = container;
        this.movies = [];
        this.bestMoviesLayer = null;
        this.currentPage = 12;
        this.bestMoviesUrl = `&primary_release_date.gte=2015-11-15&primary_release_date.lte=2017-2-22&page=`;
        this.modalWithInfo = null;
        this.modal = null;
        this.pagination = [];
        this.countPages = 0;
        this.moviesWrap = null;
    }
    create() {
        this.moviesWrap = createElement({
            tag: "div",
            classList: ["movies-wrap"]
        });
        this.bestMoviesLayer = createElement({
                tag: "div",
                classList: ["best-movies"]
            },
            this.moviesWrap
        );
        const prevBtn = new Button({
            title: "prev",
            classList: ["pagination-btn", "pagination-prev"]
        });
        const nextBtn = new Button({
            title: "next",
            classList: ["pagination-btn", "pagination-next"]
        });
        this.pagination = [prevBtn.create(), nextBtn.create()];
        const pagintaionWrapper = createElement({
                tag: "div",
                classList: ["pagintaion-wrap"]
            },
            ...this.pagination
        );
        const bestMoviesLayerWrap = createElement({
                tag: "div",
                classList: ["best-movies-wrap"]
            },
            this.bestMoviesLayer,
            pagintaionWrapper
        );
        this.container.appendChild(bestMoviesLayerWrap);
        this.modal = new Modal(this.bestMoviesLayer, "best-movies");
        this.modal.create();
        document.addEventListener("keydown", event => {
            if (event.keyCode == 27) {
                this.modal.hide();
            }
        });
        this.pagination[0].addEventListener("click", this.prevPage.bind(this));
        this.pagination[1].addEventListener("click", this.nextPage.bind(this));
    }
    loadingMovies(
        url = "&primary_release_date.gte=2015-11-15&primary_release_date.lte=2017-2-22&page=12"
    ) {
        this.moviesWrap.innerHTML = "";
        let movieHelper = new MovieHelper();
        let movieItem = null;
        movieHelper
            .getData(
                movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + url
            )
            .then(data => {
                this.countPages = data.total_pages;
                for (let movie of data.results) {
                    movieItem = new MovieCard(this.moviesWrap, movie);
                    movieItem.create("full");
                    console.log(movieItem.buyTicketButton);
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
    nextPage() {
        this.currentPage++;
        if (this.currentPage + 1 < this.countPages) {
            let newUrl = this.bestMoviesUrl + this.currentPage;
            this.loadingMovies(newUrl);
        }
    }
    prevPage() {
        if (this.currentPage - 1 > 0) {
            this.currentPage--;
            let newUrl = this.bestMoviesUrl + this.currentPage;
            this.loadingMovies(newUrl);
        }
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
                    this.modal.appendInnerStructure(
                        function() {
                            let temp = createElement({
                                tag: "div",
                                classList: ["movie-card-"]
                            });
                            let movieItem = new MovieCard(temp, data);
                            movieItem.create("modal");
                            movieItem.buyTicketButton.addEventListener(
                                "click",
                                this.handleBuyTicketBtnClick.bind(this, data)
                            );
                            return movieItem.card;
                        }.bind(this)
                    );
                })
                .catch(e => {
                    console.log(e);
                });
            this.modal.show();
        }
    }
    handleBuyTicketBtnClick(data) {
        this.modal.modal.innerHTML = "";
        this.modal.appendInnerStructure(
            function() {
                console.log(data);
                console.log(halls.hallOne);
                let ticketReservation = new TicketReservation({
                    countPlace: 120,
                    data: data,
                    hallScheme: halls.hallOne
                });
                return ticketReservation.create();
            }.bind(this)
        );
    }
}