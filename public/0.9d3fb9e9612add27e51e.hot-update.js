webpackHotUpdate(0,{

/***/ "./TicketReservation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/TicketReservation.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicketReservation = function () {
  function TicketReservation(props) {
    _classCallCheck(this, TicketReservation);

    this.countPlaces = props.countPlace;
    this.dataAboutMovie = props.data;
    this.hallScheme = props.hallScheme;
    this.places = [];
  }

  _createClass(TicketReservation, [{
    key: "create",
    value: function create() {
      console.log(this.hallScheme);
      var ticketReservWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["ticket-reserv-wrapper"]
      });
      var placesWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["places-wrap"]
      });
      var startPosition = 25;
      var topPlank = 40;
      var leftPlank = startPosition;
      var placeMargin = 35;
      for (var i = 0; i < this.hallScheme.length; i++) {
        for (var j = 0; j < this.hallScheme[i].length; j++) {
          if (this.hallScheme[i][j] !== 0) {
            var placeElement = (0, _Helpers.createElement)({
              tag: "div",
              classList: ["place"]
            });
            placeElement.style.top = topPlank + "px";
            placeElement.style.left = leftPlank + "px";
            placeElement.addEventListener("click", this.handePlaceClick.bind(this));
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
  }, {
    key: "handePlaceClick",
    value: function handePlaceClick(event) {
      var currentPlace = event.target;
      currentPlace.classList.add("active");
    }
  }]);

  return TicketReservation;
}();

exports.default = TicketReservation;

/***/ })

})