import { createElement } from "./Helpers";
import Dropdown from "./Dropdown";
import "./css/TicketReservation.scss";

const labels = [{
        title: "Available Seat",
        class: "label-available"
    },
    {
        title: "Reserved Seat",
        class: "label-reserved"
    },
    {
        title: "Your Seat",
        class: "label-your"
    },
    {
        title: "Wheelchair Access",
        class: "label-wheel"
    },
    {
        title: "Disabled Seat",
        class: "label-disabled"
    }
];

export default class TicketReservation {
    constructor(props) {
        this.countPlaces = props.countPlace;
        this.dataAboutMovie = props.data;
        this.hallScheme = props.hallScheme;
        this.places = [];
        this.dropdownList = [];
    }
    create() {
        const ticketReservWrapper = createElement({
            tag: "div",
            classList: ["ticket-reserv-wrapper"]
        });
        const title = createElement({
            tag: "div",
            classList: ["ticket-reserv-title"]
        });
        title.innerHTML = "Reserve your ticket";
        const placesWrapper = createElement({
            tag: "div",
            classList: ["places-wrap"]
        });
        let startPosition = 60;
        let topPlank = 155;
        let leftPlank = startPosition;
        let placeMargin = 40;
        for (let i = 0; i < this.hallScheme.length; i++) {
            for (let j = 0; j < this.hallScheme[i].length; j++) {
                if (this.hallScheme[i][j] !== 0) {
                    let placeElement = createElement({
                        tag: "div",
                        classList: ["place"]
                    });
                    placeElement.innerHTML = this.hallScheme[i][j];
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
        ticketReservWrapper.appendChild(title);
        const dropdownWrapper = createElement({
            tag: "div",
            classList: ["dropdownWrapper"]
        });
        const dropFormat = new Dropdown({
            title: "Choose fromat",
            links: ["IMAX", "IMAX 3D", "3D"],
            classList: ["dropdown-format"]
        });
        const dropTime = new Dropdown({
            title: "Choose time",
            links: ["17:55", "18:20", "21:30"],
            classList: ["dropdown-time"]
        });
        this.dropdownList.push(dropFormat);
        this.dropdownList.push(dropTime);
        dropdownWrapper.appendChild(dropFormat.create());
        dropdownWrapper.appendChild(dropTime.create());
        const labelsWrapper = createElement({
            tag: "div",
            classList: ["ticket-labels-wrap"]
        });
        for (let i = 0; i < labels.length; i++) {
            let label = createElement({
                tag: "div",
                classList: ["label", labels[i].class]
            });
            label.innerHTML = labels[i].title;
            labelsWrapper.appendChild(label);
        }
        ticketReservWrapper.appendChild(dropdownWrapper);
        ticketReservWrapper.appendChild(placesWrapper);
        ticketReservWrapper.appendChild(labelsWrapper);
        this.dropdownList.forEach(item => {
            item.dropDownBtn.addEventListener(
                "click",
                this.handeDropdownClick.bind(this, item)
            );
        });
        return ticketReservWrapper;
    }
    handePlaceClick(event) {
        let currentPlace = event.target;
        currentPlace.classList.add("active");
    }
    handeDropdownClick(item) {
        if (item.hasActive()) {
            item.hide();
        } else {
            item.show();
        }
    }
}