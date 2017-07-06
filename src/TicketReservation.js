import { createElement } from "./Helpers";
import "./css/TicketReservation.scss";

export default class TicketReservation {
  constructor(props) {
    this.countPlaces = props.countPlace;
    this.dataAboutMovie = props.data;
    this.hallScheme = props.hallScheme;
    this.places = [];
  }
  create() {
    console.log(this.hallScheme);
    const ticketReservWrapper = createElement({
      tag: "div",
      classList: ["ticket-reserv-wrapper"]
    });
    const placesWrapper = createElement({
      tag: "div",
      classList: ["places-wrap"]
    });
    let startPosition = 100;
    let topPlank = 270;
    let leftPlank = startPosition;
    let placeMargin = 35;
    for (let i = 0; i < this.hallScheme.length; i++) {
      for (let j = 0; j < this.hallScheme[i].length; j++) {
        if (this.hallScheme[i][j] !== 0) {
          let placeElement = createElement({
            tag: "div",
            classList: ["place"]
          });
          placeElement.style.top = topPlank + "px";
          placeElement.style.left = leftPlank + "px";
          placeElement.addEventListener(
            "click",
            this.handePlaceClick.bind(this)
          );
          this.places.push(placeElement);
          placesWrapper.appendChild(placeElement);
        }
        leftPlank += placeMargin;
      }
      leftPlank = startPosition;
      topPlank += placeMargin;
    }
    ticketReservWrapper.appendChild(placesWrapper);
    return ticketReservWrapper;
  }
  handePlaceClick(event) {
    let currentPlace = event.target;
    currentPlace.classList.add("active");
  }
}
