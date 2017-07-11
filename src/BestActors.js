import { createElement } from "./Helpers";
import MovieHelper from "./MoviesHelper";
import ActorCard from "./ActorCard";
import Button from "./Button";
import "./css/BestActors.scss";

export default class BestActors {
  constructor(container) {
    this.container = container;
    this.actors = [];
    this.bestActorsUrl = "person/popular";
    this.bestActorsWrap = null;
    this.bestActorsPhotosContainer = null;
    this.bestActorsNextBlock = null;
    this.currentPage = 1;
    this.nextButton = null;
  }
  create() {
    this.bestActorsPhotosContainer = createElement({
      tag: "div",
      classList: ["best-actors-photos-wrap"]
    });
    this.nextButton = new Button({
      title: "next",
      classList: ["next-button"]
    }).create();
    this.bestActorsNextBlock = createElement(
      {
        tag: "div",
        classList: ["best-actors-next-block"]
      },
      this.nextButton
    );

    this.bestActorsWrap = createElement(
      {
        tag: "div",
        classList: ["best-actors-wrap"]
      },
      this.bestActorsPhotosContainer,
      this.bestActorsNextBlock
    );
    this.container.appendChild(this.bestActorsWrap);
  }
  loadingActors() {
    let movieHelper = new MovieHelper();
    let actorItem = null;
    movieHelper
      .getData(
        movieHelper.getUrl() + this.bestActorsUrl + movieHelper.getApiKey()
      )
      .then(data => {
        data.results.forEach((actor, index) => {
          if (index <= 5) {
            actorItem = new ActorCard(this.bestActorsPhotosContainer, actor);
            actorItem.create();
            console.log(actor);
            this.actors.push(actorItem);
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
}
