webpackHotUpdate(0,{

/***/ "./BestMovies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

var _MoviesHelper = __webpack_require__("./MoviesHelper.js");

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _TicketReservation = __webpack_require__("./TicketReservation.js");

var _TicketReservation2 = _interopRequireDefault(_TicketReservation);

var _MovieCard = __webpack_require__("./MovieCard.js");

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Modal = __webpack_require__("./Modal.js");

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = __webpack_require__("./Button.js");

var _Button2 = _interopRequireDefault(_Button);

__webpack_require__("./css/BestMovies.scss");

var _HallScheme = __webpack_require__("./HallScheme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BestMovies = function () {
  function BestMovies(container) {
    _classCallCheck(this, BestMovies);

    this.container = container;
    this.movies = [];
    this.bestMoviesLayer = null;
    this.currentPage = 3;
    this.bestMoviesUrl = "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22&page=";
    this.modalWithInfo = null;
    this.modal = null;
    this.pagination = [];
    this.countPages = 0;
    this.moviesWrap = null;
  }

  _createClass(BestMovies, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.moviesWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movies-wrap"]
      });
      this.bestMoviesLayer = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["best-movies"]
      }, this.moviesWrap);
      var prevBtn = new _Button2.default({
        title: "prev",
        classList: ["pagination-btn", "pagination-prev"]
      });
      var nextBtn = new _Button2.default({
        title: "next",
        classList: ["pagination-btn", "pagination-next"]
      });
      this.pagination = [prevBtn.create(), nextBtn.create()];
      console.log(this.pagination);
      var pagintaionWrapper = _Helpers.createElement.apply(undefined, [{
        tag: "div",
        classList: ["pagintaion-wrap"]
      }].concat(_toConsumableArray(this.pagination)));
      var bestMoviesLayerWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["best-movies-wrap"]
      }, this.bestMoviesLayer, pagintaionWrapper);
      this.container.appendChild(bestMoviesLayerWrap);
      this.modal = new _Modal2.default(this.bestMoviesLayer, "best-movies");
      this.modal.create();
      document.addEventListener("keydown", function (event) {
        if (event.keyCode == 27) {
          _this.modal.hide();
        }
      });
      this.pagination[0].addEventListener("click", this.prevPage.bind(this));
      this.pagination[1].addEventListener("click", this.nextPage.bind(this));
    }
  }, {
    key: "loadingMovies",
    value: function loadingMovies() {
      var _this2 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22&page=3";

      this.moviesWrap.innerHTML = "";
      var movieHelper = new _MoviesHelper2.default();
      var movieItem = null;
      movieHelper.getData(movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + url).then(function (data) {
        _this2.countPages = data.total_pages;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var movie = _step.value;

            movieItem = new _MovieCard2.default(_this2.moviesWrap, movie);
            movieItem.create("full");
            console.log(movieItem.buyTicketButton);
            movieItem.poster.addEventListener("click", _this2.handleClickOnMovieCard.bind(_this2));
            _this2.movies.push(movieItem);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }).catch(function (e) {
        console.log(e);
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      this.currentPage++;
      if (this.currentPage + 1 < this.countPages) {
        var newUrl = this.bestMoviesUrl + this.currentPage;
        this.loadingMovies(newUrl);
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.currentPage - 1 > 0) {
        this.currentPage--;
        var newUrl = this.bestMoviesUrl + this.currentPage;
        this.loadingMovies(newUrl);
      }
    }
  }, {
    key: "handleClickOnMovieCard",
    value: function handleClickOnMovieCard(event) {
      var _this3 = this;

      if (event.target.className === "poster-wrap-full") {
        var currentCard = event.target.parentElement;
        var currentCardId = currentCard.getAttribute("data-id");
        var movieHelper = new _MoviesHelper2.default();
        movieHelper.getData(movieHelper.getUrl() + "movie/" + currentCardId + movieHelper.getApiKey()).then(function (data) {
          _this3.modal.appendInnerStructure(function () {
            var temp = (0, _Helpers.createElement)({
              tag: "div",
              classList: ["movie-card-"]
            });
            var movieItem = new _MovieCard2.default(temp, data);
            movieItem.create("modal");
            movieItem.buyTicketButton.addEventListener("click", this.handleBuyTicketBtnClick.bind(this, data));
            return movieItem.card;
          }.bind(_this3));
        }).catch(function (e) {
          console.log(e);
        });
        this.modal.show();
      }
    }
  }, {
    key: "handleBuyTicketBtnClick",
    value: function handleBuyTicketBtnClick(data) {
      this.modal.modal.innerHTML = "";
      this.modal.appendInnerStructure(function () {
        console.log(data);
        console.log(_HallScheme.halls.hallOne);
        var ticketReservation = new _TicketReservation2.default({
          countPlace: 120,
          data: data,
          hallScheme: _HallScheme.halls.hallOne
        });
        return ticketReservation.create();
      }.bind(this));
    }
  }]);

  return BestMovies;
}();

exports.default = BestMovies;

/***/ })

})