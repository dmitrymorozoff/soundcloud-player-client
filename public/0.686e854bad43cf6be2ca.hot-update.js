webpackHotUpdate(0,{

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".best-movies-wrap {\n  padding: 50px 25px; }\n\n.best-movies,\n.movies-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  position: relative; }\n\n.pagintaion-wrap {\n  display: flex;\n  justify-content: center; }\n\n.pagination-btn,\n.modal-btn {\n  width: 150px;\n  margin: 10px;\n  border: none;\n  color: #fff;\n  text-transform: uppercase;\n  height: 40px;\n  background: #1e1d23;\n  border-top: 2px solid #2c2b34;\n  cursor: pointer;\n  transition: .2s; }\n  .pagination-btn:hover,\n  .modal-btn:hover {\n    background: #19181d; }\n\n.modal-btn {\n  margin-top: 20px;\n  margin-left: 0; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".overflow {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  visibility: hidden;\n  opacity: 0;\n  transition: .3s; }\n\n.overflow.active {\n  visibility: visible;\n  opacity: 1; }\n\n.modal {\n  min-width: 550px;\n  max-width: 900px;\n  min-height: 450px;\n  max-height: 600px;\n  background: #fff; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ticket-reserv-wrapper {\n  height: 600px;\n  padding: 20px;\n  background: #1e1d23; }\n\n.places-wrap {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap; }\n\n.place {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  transition: .1s;\n  margin: 3px;\n  background: #27262c; }\n  .place:hover {\n    background: #ff0707; }\n\n.place.active {\n  background: #ed0000; }\n", ""]);

// exports


/***/ }),

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

var _HallScheme2 = _interopRequireDefault(_HallScheme);

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
        var ticketReservation = new _TicketReservation2.default({
          countPlace: 120,
          data: data,
          hallSceheme: _HallScheme2.default.ty
        });
        return ticketReservation.create();
      }.bind(this));
    }
  }]);

  return BestMovies;
}();

exports.default = BestMovies;

/***/ }),

/***/ "./HallScheme.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var halls = exports.halls = {
  hallOne: [[0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0]]
};

/***/ }),

/***/ "./Modal.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/Modal.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
  function Modal(container, prefix) {
    _classCallCheck(this, Modal);

    this.container = container;
    this.overflow = null;
    this.prefix = prefix;
    this.modal = null;
  }

  _createClass(Modal, [{
    key: "create",
    value: function create() {
      this.modal = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["modal", "modal" + this.prefix]
      });
      this.overflow = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["overflow", "overflow" + this.prefix]
      }, this.modal);
      this.container.appendChild(this.overflow);
    }
  }, {
    key: "appendInnerStructure",
    value: function appendInnerStructure(innerStructure) {
      this.modal.appendChild(innerStructure());
    }
  }, {
    key: "show",
    value: function show() {
      this.overflow.classList.add("active");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.overflow.classList.remove("active");
      this.modal.innerHTML = "";
    }
  }]);

  return Modal;
}();

exports.default = Modal;

/***/ }),

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
      var ticketReservWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["ticket-reserv-wrapper"]
      });
      var placesWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["places-wrap"]
      });
      for (var i = 0; i < this.countPlaces; i++) {
        var placeElement = (0, _Helpers.createElement)({
          tag: "div",
          classList: ["place"]
        });
        placeElement.addEventListener("click", this.handePlaceClick.bind(this));
        this.places.push(placeElement);
        placesWrapper.appendChild(placeElement);
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

/***/ }),

/***/ "./css/BestMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Modal.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/TicketReservation.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

})