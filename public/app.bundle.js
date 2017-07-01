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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__(10);

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startActiveLayer = 0;
var player = new _Player2.default(startActiveLayer);
player.init();

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(3);

__webpack_require__(5);

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
/* 3 */
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
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = __webpack_require__(2);

var _Layout2 = _interopRequireDefault(_Layout);

var _Navigation = __webpack_require__(11);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Header = __webpack_require__(16);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabs = [{
    title: "Stream",
    link: "stream"
}, {
    title: "Discover",
    link: "discover"
}, {
    title: "Top List",
    link: "toplist"
}, {
    title: "My Tracks",
    link: "mytracks"
}, {
    title: "Home",
    link: "home"
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
            src: "./img/SoundCloud1.png"
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(3);

__webpack_require__(12);

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
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(3);

__webpack_require__(17);

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
            var header = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["header"]
            });
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
            logoTitle.innerHTML = "SoundCloud";
            logoWrap.appendChild(logo);
            header.appendChild(logoWrap);
            header.appendChild(logoTitle);
            this.container.appendChild(header);
        }
    }]);

    return Header;
}();

exports.default = Header;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);