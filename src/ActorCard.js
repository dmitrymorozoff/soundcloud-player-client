import { createElement } from "./Helpers";
import "./css/ActorCard.scss";

export default class ActorCard {
  constructor(container, props) {
    this.container = container;
    this.name = props.name;
    this.id = props.id;
    this.photoPath = "https://image.tmdb.org/t/p/w500" + props.profile_path;
    this.photo = null;
  }
  create() {
    const actorPhoto = createElement({
      tag: "img",
      classList: ["actor-photo"]
    });
    actorPhoto.src = this.photoPath;
    actorPhoto.alt = this.name;
    const photoWrap = createElement(
      {
        tag: "div",
        classList: ["actor-photo-wrap"]
      },
      actorPhoto
    );
    const actorName = createElement({
      tag: "div",
      classList: ["actor-name"]
    });
    actorName.innerHTML = this.name;
    const cardWrap = createElement(
      {
        tag: "div",
        classList: ["actor-card-wrap"]
      },
      photoWrap,
      actorName
    );
    this.container.appendChild(cardWrap);
    return cardWrap;
  }
}
