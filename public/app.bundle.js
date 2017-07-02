/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createElement(props) {
    var _element$classList;

    var element = document.createElement(props.tag);
    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(props.classList));
    Object.keys(props).forEach(function (key) {
        if (key.startsWith("data-")) {
            element.setAttribute(key, props[key]);
        }
    });

    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        children[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            element.appendChild(item);
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

    return element;
}

exports.createElement = createElement;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startActiveLayer = 0;
var player = new _Player2.default(startActiveLayer);
player.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = __webpack_require__(3);

var _Layout2 = _interopRequireDefault(_Layout);

var _Navigation = __webpack_require__(12);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Header = __webpack_require__(14);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabs = [{
    title: "Discover",
    link: "discoverx"
}, {
    title: "Trending",
    link: "trenfing"
}, {
    title: "New Releases",
    link: "new"
}, {
    title: "My Movies",
    link: "mytracks"
}];

var Player = function () {
    function Player(startActiveLayer) {
        _classCallCheck(this, Player);

        this.container = document.getElementById("app");
        this.navigation = new _Navigation2.default(this.container, {
            classList: ["tabs-list"],
            tabs: tabs,
            activeTab: startActiveLayer
        });
        this.header = new _Header2.default(this.container, {
            src: "./img/ArcLight_logo-2.png"
        });

        this.layout = new _Layout2.default(this.container, {
            layersList: tabs,
            activeLayer: startActiveLayer
        });
        this.header.create();
        this.navigation.create();
        this.layout.create();
        this.currentActiveTab = 0;
    }

    _createClass(Player, [{
        key: "init",
        value: function init() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.navigation.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var link = _step.value;

                    link.addEventListener("click", this.handleClick.bind(this));
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
        }
    }, {
        key: "handleClick",
        value: function handleClick(event) {
            event.preventDefault();
            var newActiveTab = event.target;
            var newActiveId = parseInt(newActiveTab.getAttribute("data-id"), 10) - 1;
            this.layout.toggleLayer(newActiveId);
            this.navigation.toggleActiveTab(newActiveId);
            console.log(newActiveId);
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _TopMovies = __webpack_require__(4);

var _TopMovies2 = _interopRequireDefault(_TopMovies);

var _BestMovies = __webpack_require__(27);

var _BestMovies2 = _interopRequireDefault(_BestMovies);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
    function Layout(container, props) {
        _classCallCheck(this, Layout);

        this.container = container;
        this.count = props.layersList.length;
        this.layers = [];
        this.activeLayerIndex = props.activeLayer;
        this.props = props;
        this.activeLayer = null;
    }

    _createClass(Layout, [{
        key: "create",
        value: function create() {
            var indexLayer = 1;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.layersList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var layer = (0, _Helpers.createElement)({
                        tag: "div",
                        classList: ["layer", "layer-" + indexLayer, item.link],
                        "data-id": indexLayer
                    });
                    this.layers.push(layer);
                    this.container.appendChild(layer);
                    indexLayer++;
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

            this.activeLayer = this.layers[this.activeLayerIndex];
            this.activeLayer.classList.add("active");
            var topMovies = new _TopMovies2.default(this.layers[0]);
            topMovies.create();
            topMovies.loadingMovies();
            var bestMovies = new _BestMovies2.default(this.layers[0]);
            bestMovies.create();
            bestMovies.loadingMovies();
        }
    }, {
        key: "toggleLayer",
        value: function toggleLayer(newActiveId) {
            this.activeLayer.classList.toggle("active");
            this.activeLayerIndex = newActiveId;
            this.activeLayer = this.layers[newActiveId];
            this.activeLayer.classList.add("active");
        }
    }]);

    return Layout;
}();

exports.default = Layout;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _MoviesHelper = __webpack_require__(5);

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _MovieCard = __webpack_require__(6);

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Scrollbar = __webpack_require__(8);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopMovies = function () {
    function TopMovies(container) {
        _classCallCheck(this, TopMovies);

        this.container = container;
        this.movies = [];
        this.scrollBarLinks = [];
        this.topMoviesLayer = null;
        this.scroll = null;
        this.topMoviesUrl = "&sort_by=popularity.desc";
    }

    _createClass(TopMovies, [{
        key: "create",
        value: function create() {
            this.topMoviesLayer = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["top-movies"]
            });
            var topMoviesLayerWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["top-movies-wrap"]
            }, this.topMoviesLayer);
            this.scroll = new _Scrollbar2.default(topMoviesLayerWrap, this.scrollBarLinks, this.topMoviesLayer);
            this.scroll.create();
            this.container.appendChild(topMoviesLayerWrap);
        }
    }, {
        key: "loadingMovies",
        value: function loadingMovies() {
            var _this = this;

            var movieHelper = new _MoviesHelper2.default();
            var movieItem = null;
            movieHelper.getData(this.topMoviesUrl).then(function (data) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var movie = _step.value;

                        movieItem = new _MovieCard2.default(_this.topMoviesLayer, movie);
                        _this.scrollBarLinks.push(movie.original_title);
                        _this.movies.push(movieItem);
                        movieItem.create();
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

                _this.scroll.addLinks(_this.scrollBarLinks);
            }).catch(function (e) {
                console.log(e);
            });
        }
    }]);

    return TopMovies;
}();

exports.default = TopMovies;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesHelper = function () {
    function MoviesHelper() {
        _classCallCheck(this, MoviesHelper);

        this.apiKey = "?api_key=191afa11366f646301a60a16fee09d34";
        this.url = "https://api.themoviedb.org/3/discover/movie";
        this.searchurl = "https://api.themoviedb.org/3/search/movie" + this.apikey + "&query=z";
    }

    _createClass(MoviesHelper, [{
        key: "getData",
        value: function getData(search) {
            var fullUrl = this.url + this.apiKey + search;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", fullUrl);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var json = JSON.parse(xhr.response);
                        console.log(json);
                        resolve(json.results);
                    } else {
                        reject(xhr.statusText);
                    }
                };
                xhr.onerror = function (error) {
                    reject(error);
                };
                xhr.send();
            });
        }
    }]);

    return MoviesHelper;
}();

exports.default = MoviesHelper;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieCard = function () {
    function MovieCard(container, props) {
        _classCallCheck(this, MovieCard);

        this.container = container;
        this.card = null;
        this.id = props.id;
        this.title = props.original_title;
        this.rate = props.vote_average;
        this.year = props.release_date;
        this.desc = props.overview;
        this.poster = "https://image.tmdb.org/t/p/w500" + props.poster_path;
    }

    _createClass(MovieCard, [{
        key: "create",
        value: function create() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "part";

            var postfix = type === "part" ? "part" : "full";

            var cardPoster = (0, _Helpers.createElement)({
                tag: "img",
                classList: ["poster-" + postfix]
            });
            cardPoster.src = this.poster;
            var cardPosterWrapper = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["poster-wrap-" + postfix]
            }, cardPoster);
            var cardTitle = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-title-" + postfix]
            });
            cardTitle.innerHTML = this.title;
            var cardRate = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-rate-" + postfix]
            });
            cardRate.innerHTML = type === "part" ? this.rate + "/10" : "" + this.rate;
            var cardYear = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-year-" + postfix]
            });
            cardYear.innerHTML = this.year;
            var cardContnt = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-content-" + postfix]
            }, cardTitle, cardYear);
            if (type === "full") {
                var cardDesc = (0, _Helpers.createElement)({
                    tag: "div",
                    classList: ["movie-card-desc-" + postfix]
                });
                cardDesc.innerHTML = this.desc;
                cardContnt.appendChild(cardDesc);
            }
            this.card = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-" + postfix],
                "data-id": this.id
            }, cardPosterWrapper, cardContnt, cardRate);
            this.container.appendChild(this.card);
        }
    }]);

    return MovieCard;
}();

exports.default = MovieCard;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

var Scrollbar = function () {
    function Scrollbar(container, items, slideWith) {
        _classCallCheck(this, Scrollbar);

        this.container = container;
        this.scroll = null;
        this.shiftX = null;
        this.sliderCoords = null;
        this.newLeftCoods = null;
        this.mouseDownFlag = false;
        this.items = items;
        this.slideWith = slideWith;
    }

    _createClass(Scrollbar, [{
        key: "create",
        value: function create() {
            this.scroll = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["scrollbar"]
            });
            var scrollWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["scrollbar-wrap"]
            }, this.scroll);
            this.container.appendChild(scrollWrap);
            this.sliderCoords = getCoords(this.scroll);
            this.scroll.addEventListener("mousedown", this.startDrag.bind(this));
            this.scroll.addEventListener("dragstart", this.endDrag.bind(this));
            document.addEventListener("mouseup", this.endDrag.bind(this));
        }
    }, {
        key: "addLinks",
        value: function addLinks(items) {
            var _this = this;

            var scrollItem = null;
            items.forEach(function (item) {
                scrollItem = (0, _Helpers.createElement)({
                    tag: "div",
                    classList: ["scrollbar-item"]
                });
                scrollItem.innerHTML = item;
                _this.scroll.appendChild(scrollItem);
            });
        }
    }, {
        key: "startDrag",
        value: function startDrag(event) {
            this.shiftX = event.pageX;
            document.addEventListener("mousemove", this.moveMouse.bind(this));
            this.mouseDownFlag = true;
        }
    }, {
        key: "endDrag",
        value: function endDrag() {
            this.mouseDownFlag = false;
        }
    }, {
        key: "moveMouse",
        value: function moveMouse(event) {
            if (this.mouseDownFlag !== false) {
                this.newLeftCoods = event.pageX - this.shiftX - this.sliderCoords.left;
                if (this.newLeftCoods < 0) {
                    this.newLeftCoods = 0;
                }
                this.scroll.style.left = -this.newLeftCoods + "px";
                this.slideWith.style.left = -this.newLeftCoods * 1.5 + "px";
                console.log(this.slideWith);
            }
        }
    }]);

    return Scrollbar;
}();

exports.default = Scrollbar;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(13);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
    function Navigation(container, props) {
        _classCallCheck(this, Navigation);

        this.container = container;
        this.props = props;
        this.navigation = (0, _Helpers.createElement)({
            tag: "div",
            classList: [].concat(_toConsumableArray(props.classList))
        });
        this.links = [];
        this.activeTabIndex = props.activeTab;
        this.activeTab = null;
    }

    _createClass(Navigation, [{
        key: "create",
        value: function create() {
            var indexTab = 1;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var link = (0, _Helpers.createElement)({
                        tag: "a",
                        classList: ["tab-link"],
                        "data-id": indexTab
                    });
                    link.innerHTML = item.title;
                    link.href = "#" + item.link;
                    this.links.push(link);
                    var tab = (0, _Helpers.createElement)({
                        tag: "div",
                        classList: ["tab", "tab-" + indexTab]
                    }, link);
                    this.activeTab = this.links[this.activeTabIndex];
                    this.activeTab.classList.add("active");
                    this.navigation.appendChild(tab);
                    indexTab++;
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

            this.container.appendChild(this.navigation);
        }
    }, {
        key: "toggleActiveTab",
        value: function toggleActiveTab(newActiveId) {
            this.activeTab.classList.toggle("active");
            this.activeTabIndex = newActiveId;
            this.activeTab = this.links[newActiveId];
            this.activeTab.classList.add("active");
        }
    }]);

    return Navigation;
}();

exports.default = Navigation;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(15);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header(container, props) {
        _classCallCheck(this, Header);

        this.container = container;
        this.props = props;
    }

    _createClass(Header, [{
        key: "create",
        value: function create() {
            var logoWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["header-logo-wrap"]
            });
            var logoTitle = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["header-logo-title"]
            });
            var logo = (0, _Helpers.createElement)({
                tag: "img",
                classList: ["logo"]
            });
            logo.src = this.props.src;
            logoTitle.innerHTML = "The Movie DB";
            logoWrap.appendChild(logo);
            var search = (0, _Helpers.createElement)({
                tag: "input",
                classList: ["search"]
            });
            search.type = "text";
            var header = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["header"]
            }, logoWrap, logoTitle, search);
            this.container.appendChild(header);
        }
    }]);

    return Header;
}();

exports.default = Header;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _MoviesHelper = __webpack_require__(5);

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _MovieCard = __webpack_require__(6);

var _MovieCard2 = _interopRequireDefault(_MovieCard);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BestMovies = function () {
    function BestMovies(container) {
        _classCallCheck(this, BestMovies);

        this.container = container;
        this.movies = [];
        this.bestMoviesLayer = null;
        this.bestMoviesUrl = "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22";
    }

    _createClass(BestMovies, [{
        key: "create",
        value: function create() {
            this.bestMoviesLayer = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["best-movies"]
            });
            var bestMoviesLayerWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["best-movies-wrap"]
            }, this.bestMoviesLayer);
            this.container.appendChild(bestMoviesLayerWrap);
        }
    }, {
        key: "loadingMovies",
        value: function loadingMovies() {
            var _this = this;

            var movieHelper = new _MoviesHelper2.default();
            var movieItem = null;
            movieHelper.getData(this.bestMoviesUrl).then(function (data) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var movie = _step.value;

                        movieItem = new _MovieCard2.default(_this.bestMoviesLayer, movie);
                        movieItem.create("full");
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
    }]);

    return BestMovies;
}();

exports.default = BestMovies;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);