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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
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
    this.url = "https://api.themoviedb.org/3/";
  }

  _createClass(MoviesHelper, [{
    key: "getApiKey",
    value: function getApiKey() {
      return this.apiKey;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: "getData",
    value: function getData(url) {
      var fullUrl = url;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", fullUrl);
        xhr.onload = function () {
          if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            resolve(json);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _Button = __webpack_require__(5);

var _Button2 = _interopRequireDefault(_Button);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        this.posterPath = "https://image.tmdb.org/t/p/w500" + props.poster_path;
        this.poster = null;
        this.buyTicketButton = null;
    }

    _createClass(MovieCard, [{
        key: "create",
        value: function create() {
            var cardCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "part";

            var postfix = cardCategory;

            var cardPoster = (0, _Helpers.createElement)({
                tag: "img",
                classList: ["poster-" + postfix]
            });
            cardPoster.src = this.posterPath;
            this.poster = (0, _Helpers.createElement)({
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
            cardRate.innerHTML = cardCategory === "part" ? this.rate + "/10" : "" + this.rate;
            var cardYear = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-year-" + postfix]
            });
            cardYear.innerHTML = this.year;
            var cardContnt = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-content-" + postfix]
            }, cardTitle, cardYear);
            var btnAddToBookmars = new _Button2.default({
                title: "Add Bookmark",
                classList: ["movie-card-btn-" + postfix]
            });
            if (cardCategory !== "modal") {
                this.poster.appendChild(btnAddToBookmars.create());
            }
            var cardDesc = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-desc-" + postfix]
            });
            cardDesc.innerHTML = this.desc;
            cardContnt.appendChild(cardDesc);
            var button = new _Button2.default({
                title: "Buy Ticket",
                classList: ["modal-btn"]
            });
            this.buyTicketButton = button.create();
            if (cardCategory === "modal") {
                cardContnt.appendChild(this.buyTicketButton);
            }
            this.card = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["movie-card-" + postfix],
                "data-id": this.id
            }, this.poster, cardContnt, cardRate);

            this.container.appendChild(this.card);
            return this.card;
        }
    }]);

    return MovieCard;
}();

exports.default = MovieCard;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(props) {
    _classCallCheck(this, Button);

    this.title = props.title;
    this.classList = props.classList;
    this.button = null;
  }

  _createClass(Button, [{
    key: "create",
    value: function create() {
      this.button = (0, _Helpers.createElement)({
        tag: "button",
        classList: [].concat(_toConsumableArray(this.classList))
      });
      this.button.innerHTML = this.title;
      return this.button;
    }
  }]);

  return Button;
}();

exports.default = Button;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__(7);

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startActiveLayer = 0;
var player = new _Player2.default(startActiveLayer);
player.init();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = __webpack_require__(8);

var _Layout2 = _interopRequireDefault(_Layout);

var _Navigation = __webpack_require__(39);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Header = __webpack_require__(42);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabs = [{
    title: "Discover",
    link: "discoverx"
}, {
    title: "Genres",
    link: "genres"
}, {
    title: "Person",
    link: "person"
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _TopMovies = __webpack_require__(9);

var _TopMovies2 = _interopRequireDefault(_TopMovies);

var _BestMovies = __webpack_require__(18);

var _BestMovies2 = _interopRequireDefault(_BestMovies);

var _Genres = __webpack_require__(31);

var _Genres2 = _interopRequireDefault(_Genres);

__webpack_require__(37);

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

            var genres = new _Genres2.default(this.layers[1]);
            genres.create();
            genres.loadGenres();
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _MoviesHelper = __webpack_require__(3);

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _MovieCard = __webpack_require__(4);

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Scrollbar = __webpack_require__(13);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

__webpack_require__(16);

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
        this.topMoviesUrl = "&primary_release_year=2016&page=12";
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
            movieHelper.getData(movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + this.topMoviesUrl).then(function (data) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./MovieCard.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./MovieCard.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".movie-card-part {\n  display: flex;\n  width: 640px;\n  height: 280px;\n  margin: 50px 20px;\n  background: #18171c;\n  border-top: 2px solid #26252d;\n  flex-wrap: wrap;\n  box-shadow: 0 36px 28px -20px rgba(0, 0, 0, 0.2);\n  position: relative; }\n\n.poster-wrap-part {\n  padding: 0;\n  width: 38%;\n  margin-left: -15px; }\n\n.poster-part {\n  width: 100%;\n  box-shadow: 0 36px 28px -20px rgba(0, 0, 0, 0.2);\n  cursor: pointer;\n  margin-left: 30px; }\n\n.movie-card-year-part {\n  margin: 5px 0; }\n\n.movie-card-title-part {\n  font-size: 20px;\n  text-align: left;\n  margin-top: -50px;\n  line-height: 26px;\n  color: #fff; }\n\n.movie-card-content-part {\n  display: flex;\n  color: #545457;\n  flex-direction: column;\n  padding: 15px;\n  text-align: center;\n  width: 45%; }\n\n.movie-card-desc-part {\n  overflow: hidden;\n  font-size: 13px;\n  line-height: 22px;\n  height: 90px; }\n\n.movie-card-rate-part {\n  font-family: 'Josefin Sans', sans-serif;\n  position: absolute;\n  top: 73%;\n  letter-spacing: 6px;\n  left: 35%;\n  color: #fff;\n  font-weight: bold;\n  font-size: 58px;\n  text-shadow: 0 0 0.2em rgba(255, 255, 255, 0.05), 0 0 0.2em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em rgba(0, 0, 0, 0.05); }\n\n.movie-card-btn-part {\n  cursor: pointer;\n  z-index: 5;\n  width: 120px;\n  height: 35px;\n  background: none;\n  border: 2px solid #ff0707;\n  color: #ff0707;\n  position: absolute;\n  font-size: 14px;\n  top: 78%;\n  left: 75%; }\n\n.movie-card-full {\n  width: 140px;\n  margin: 40px;\n  height: 260px;\n  display: flex;\n  transition: 3s;\n  position: relative;\n  background: #18171c;\n  border-top: 2px solid #26252d;\n  box-shadow: 0 36px 28px -20px rgba(0, 0, 0, 0.2);\n  padding: 25px 10px 5px 10px;\n  flex-direction: column;\n  justify-content: flex-end;\n  position: relative; }\n  .movie-card-full :hover .poster-full {\n    transform: scale(1.7); }\n\n.poster-wrap-full {\n  padding: 0;\n  width: 100%;\n  left: -40px;\n  top: -35px;\n  cursor: pointer;\n  position: absolute;\n  overflow: hidden; }\n  .poster-wrap-full:hover .movie-card-btn-full {\n    top: 45%; }\n  .poster-wrap-full:hover:after {\n    clip-path: circle(120% at 50% 50%); }\n  .poster-wrap-full:hover:before {\n    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 90%); }\n  .poster-wrap-full:after {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    content: '';\n    display: block;\n    z-index: 3;\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%);\n    clip-path: circle(0% at 50% 50%);\n    transition: .5s; }\n\n.poster-full {\n  width: 100%;\n  transition: .8s;\n  box-shadow: 0 36px 28px -20px rgba(0, 0, 0, 0.2); }\n\n.movie-card-title-full {\n  color: #fff;\n  text-align: center;\n  box-shadow: 0 10px 90px rgba(0, 0, 0, 0.16), 0 90px 90px rgba(0, 0, 0, 0.03);\n  font-size: 14px;\n  z-index: 9;\n  top: 185px;\n  left: -10px;\n  width: 170px;\n  border-top: 2px solid #26252d;\n  height: 20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  padding: 10px;\n  background: #1e1d23;\n  position: absolute; }\n\n.movie-card-year-full {\n  display: none; }\n\n.movie-card-content-full {\n  display: flex;\n  justify-content: center; }\n\n.movie-card-desc-full {\n  text-align: center;\n  height: 40px;\n  line-height: 20px;\n  font-weight: 600;\n  margin: 5px 0;\n  font-size: 13px;\n  overflow: hidden;\n  color: #545457; }\n\n.movie-card-rate-full {\n  background: #1e1d23;\n  font-family: 'Raleway', sans-serif;\n  width: 50px;\n  height: 50px;\n  text-align: center;\n  line-height: 50px;\n  position: absolute;\n  top: -60px;\n  left: -60px;\n  border-top: 2px solid #26252d;\n  color: #fff;\n  font-weight: bold;\n  font-size: 24px;\n  z-index: 5;\n  text-shadow: 0 0 0.2em rgba(255, 255, 255, 0.05), 0 0 0.2em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em rgba(0, 0, 0, 0.05); }\n\n.movie-card-btn-full {\n  transition: .4s;\n  position: absolute;\n  top: 120%;\n  left: 50%;\n  margin-left: -60px;\n  cursor: pointer;\n  z-index: 5;\n  width: 120px;\n  height: 35px;\n  background: #ff0707;\n  border: none;\n  color: #fff;\n  font-size: 14px; }\n\n.movie-card-modal {\n  height: 100%;\n  width: 750px;\n  position: relative;\n  display: flex; }\n\n.poster-wrap-modal {\n  height: 100%;\n  margin-top: -70px;\n  box-shadow: 0 10px 100px rgba(0, 0, 0, 0.2), 0 100px 100px rgba(0, 0, 0, 0.03); }\n\n.poster-modal {\n  height: 130%; }\n\n.movie-card-title-modal {\n  font-size: 28px;\n  margin-bottom: 20px; }\n\n.movie-card-year-modal {\n  margin-bottom: 20px; }\n\n.movie-card-desc-modal {\n  font-size: 14px;\n  font-weight: normal;\n  max-height: 125px;\n  overflow: hidden;\n  line-height: 26px; }\n\n.movie-card-content-modal {\n  display: flex;\n  flex-direction: column;\n  padding: 55px; }\n\n.movie-card-rate-modal {\n  background: #ff0707;\n  font-family: 'Josefin Sans', sans-serif;\n  font-weight: bold;\n  color: #fff;\n  padding: 10px;\n  width: 70px;\n  text-align: center;\n  line-height: 70px;\n  height: 70px;\n  font-size: 46px;\n  position: absolute;\n  right: -40px;\n  bottom: -40px; }\n\n.modal-btn {\n  min-height: 40px; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(14);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Scrollbar.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Scrollbar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".scrollbar {\n  position: absolute;\n  display: flex;\n  width: 10000px;\n  height: 60px;\n  margin-top: 85px;\n  cursor: w-resize;\n  color: #131313;\n  font-size: 20px;\n  background: #27262c;\n  border-bottom: 1px solid #19181d; }\n\n.scrollbar-wrap {\n  width: 100%;\n  position: relative;\n  top: 65%; }\n\n.scrollbar-item {\n  line-height: 60px;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 235px;\n  text-overflow: ellipsis;\n  color: #3d3c41;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./TopMovies.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./TopMovies.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".top-movies-wrap {\n  width: 100%;\n  padding-top: 50px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: 520px;\n  background: #1e1d23; }\n\n.top-movies {\n  position: absolute;\n  width: 100000px;\n  display: flex; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _MoviesHelper = __webpack_require__(3);

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _TicketReservation = __webpack_require__(19);

var _TicketReservation2 = _interopRequireDefault(_TicketReservation);

var _MovieCard = __webpack_require__(4);

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Modal = __webpack_require__(25);

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = __webpack_require__(5);

var _Button2 = _interopRequireDefault(_Button);

__webpack_require__(28);

var _HallScheme = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BestMovies = function () {
    function BestMovies(container) {
        _classCallCheck(this, BestMovies);

        this.container = container;
        this.movies = [];
        this.bestMoviesLayer = null;
        this.currentPage = 12;
        this.bestMoviesUrl = "&primary_release_date.gte=2015-11-15&primary_release_date.lte=2017-2-22&page=";
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

            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "&primary_release_date.gte=2015-11-15&primary_release_date.lte=2017-2-22&page=12";

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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

var _Dropdown = __webpack_require__(20);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

__webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var labels = [{
    title: "Available Seat",
    class: "label-available"
}, {
    title: "Reserved Seat",
    class: "label-reserved"
}, {
    title: "Your Seat",
    class: "label-your"
}, {
    title: "Wheelchair Access",
    class: "label-wheel"
}, {
    title: "Disabled Seat",
    class: "label-disabled"
}];

var TicketReservation = function () {
    function TicketReservation(props) {
        _classCallCheck(this, TicketReservation);

        this.countPlaces = props.countPlace;
        this.dataAboutMovie = props.data;
        this.hallScheme = props.hallScheme;
        this.places = [];
        this.dropdownList = [];
    }

    _createClass(TicketReservation, [{
        key: "create",
        value: function create() {
            var _this = this;

            var ticketReservWrapper = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["ticket-reserv-wrapper"]
            });
            var title = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["ticket-reserv-title"]
            });
            title.innerHTML = "Reserve your ticket";
            var placesWrapper = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["places-wrap"]
            });
            var startPosition = 60;
            var topPlank = 155;
            var leftPlank = startPosition;
            var placeMargin = 40;
            for (var i = 0; i < this.hallScheme.length; i++) {
                for (var j = 0; j < this.hallScheme[i].length; j++) {
                    if (this.hallScheme[i][j] !== 0) {
                        var placeElement = (0, _Helpers.createElement)({
                            tag: "div",
                            classList: ["place"]
                        });
                        placeElement.innerHTML = this.hallScheme[i][j];
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
            ticketReservWrapper.appendChild(title);
            var dropdownWrapper = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["dropdownWrapper"]
            });
            var dropFormat = new _Dropdown2.default({
                title: "Choose fromat",
                links: ["IMAX", "IMAX 3D", "3D"],
                classList: ["dropdown-format"]
            });
            var dropTime = new _Dropdown2.default({
                title: "Choose time",
                links: ["17:55", "18:20", "21:30"],
                classList: ["dropdown-time"]
            });
            this.dropdownList.push(dropFormat);
            this.dropdownList.push(dropTime);
            dropdownWrapper.appendChild(dropFormat.create());
            dropdownWrapper.appendChild(dropTime.create());
            var labelsWrapper = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["ticket-labels-wrap"]
            });
            for (var _i = 0; _i < labels.length; _i++) {
                var label = (0, _Helpers.createElement)({
                    tag: "div",
                    classList: ["label", labels[_i].class]
                });
                label.innerHTML = labels[_i].title;
                labelsWrapper.appendChild(label);
            }
            ticketReservWrapper.appendChild(dropdownWrapper);
            ticketReservWrapper.appendChild(placesWrapper);
            ticketReservWrapper.appendChild(labelsWrapper);
            this.dropdownList.forEach(function (item) {
                item.dropDownBtn.addEventListener("click", _this.handeDropdownClick.bind(_this, item));
            });
            return ticketReservWrapper;
        }
    }, {
        key: "handePlaceClick",
        value: function handePlaceClick(event) {
            var currentPlace = event.target;
            currentPlace.classList.add("active");
        }
    }, {
        key: "handeDropdownClick",
        value: function handeDropdownClick(item) {
            if (item.hasActive()) {
                item.hide();
            } else {
                item.show();
            }
        }
    }]);

    return TicketReservation;
}();

exports.default = TicketReservation;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(21);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    this.title = props.title;
    this.links = props.links;
    this.classList = props.classList;
    this.dropDownList = null;
    this.dropDownBtn = null;
    this.activeItem = "";
  }

  _createClass(Dropdown, [{
    key: "create",
    value: function create() {
      var dropdownWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["dropdown"].concat(_toConsumableArray(this.classList))
      });

      var btnTitle = (0, _Helpers.createElement)({
        tag: "span",
        classList: ["dropdown-btn-title"]
      });
      btnTitle.innerHTML = this.title;
      var btnIcon = (0, _Helpers.createElement)({
        tag: "span",
        classList: ["dropdown-btn-icon"]
      });
      this.dropDownBtn = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["dropdown-btn"]
      }, btnTitle, btnIcon);
      this.dropDownList = (0, _Helpers.createElement)({
        tag: "ul",
        classList: ["dropdown-list"]
      });
      for (var i = 0; i < this.links.length; i++) {
        var dropdownLinkItem = (0, _Helpers.createElement)({
          tag: "li",
          classList: ["dropdown-list-link"]
        });
        dropdownLinkItem.innerHTML = this.links[i];
        dropdownLinkItem.addEventListener("click", this.handleListItemcClick.bind(this));
        this.dropDownList.appendChild(dropdownLinkItem);
      }
      dropdownWrap.appendChild(this.dropDownBtn);
      dropdownWrap.appendChild(this.dropDownList);
      return dropdownWrap;
    }
  }, {
    key: "hasActive",
    value: function hasActive() {
      console.log(this.dropDownList.classList.contains("active"));
      return this.dropDownList.classList.contains("active");
    }
  }, {
    key: "show",
    value: function show() {
      this.dropDownList.classList.add("active");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.dropDownList.classList.remove("active");
      return this.activeItem;
    }
  }, {
    key: "handleListItemcClick",
    value: function handleListItemcClick() {
      this.hide();
      this.activeItem = event.target.innerHTML;
      this.dropDownBtn.innerHTML = event.target.innerHTML;
    }
  }]);

  return Dropdown;
}();

exports.default = Dropdown;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Dropdown.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Dropdown.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".dropdown {\n  position: relative;\n  margin-top: 20px; }\n\n.dropdown-btn {\n  width: 200px;\n  height: 40px;\n  background: #27262c;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  color: #fff; }\n\n.dropdown-list {\n  visibility: hidden;\n  opacity: 0;\n  position: absolute;\n  list-style: none;\n  z-index: 999; }\n\n.dropdown-list.active {\n  visibility: visible;\n  opacity: 1; }\n\n.dropdown-list-link {\n  width: 200px;\n  height: 40px;\n  text-align: center;\n  border-bottom: 1px solid #18181c;\n  line-height: 40px;\n  font-size: 14px;\n  cursor: pointer;\n  color: #fff;\n  background: #141316; }\n  .dropdown-list-link:hover {\n    background: #18181c; }\n", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./TicketReservation.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./TicketReservation.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".ticket-reserv-wrapper {\n  height: 600px;\n  width: 850px;\n  position: relative;\n  background: #1e1d23;\n  overflow: hidden; }\n\n.places-wrap {\n  position: absolute;\n  z-index: 0;\n  top: -75px;\n  height: 40px;\n  display: flex;\n  position: relative; }\n  .places-wrap:before {\n    content: '';\n    z-index: 1;\n    display: block;\n    width: 600px;\n    margin: 110px auto;\n    border-top: 7px solid #00aeef;\n    box-shadow: inset 0 120px 20px -100px rgba(1, 174, 240, 0.2); }\n\n.ticket-reserv-title {\n  width: 100%;\n  height: 50px;\n  background: #19181d;\n  text-align: center;\n  font-weight: bold;\n  line-height: 50px;\n  text-transform: uppercase;\n  color: #3d3c41;\n  font-size: 16px; }\n\n.place {\n  position: absolute;\n  width: 30px;\n  text-align: center;\n  line-height: 30px;\n  height: 30px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #3d3c41;\n  transition: .1s;\n  background: #27262c; }\n  .place:hover {\n    color: #fff;\n    background: #ff0707; }\n\n.place.active {\n  color: #fff;\n  background: #ed0000; }\n\n.dropdownWrapper {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  margin-top: 15px;\n  padding: 0 30px; }\n\n.ticket-labels-wrap {\n  display: flex;\n  width: 90%;\n  color: #56545c;\n  justify-content: space-around;\n  align-items: center;\n  position: absolute;\n  top: 545px;\n  margin-left: 5%; }\n\n.label:before {\n  content: '';\n  display: inline-block;\n  margin-right: 10px;\n  width: 10px;\n  height: 10px;\n  background: #27262c; }\n\n.label-available:before {\n  background: #605ca9; }\n\n.label-reserved:before {\n  background: #27262c; }\n\n.label-your:before {\n  background: #ff0707; }\n\n.label-wheel:before {\n  background: #eb962b; }\n\n.label-disabled:before {\n  background: #9d9d9d; }\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(26);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Modal.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Modal.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".overflow {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  visibility: hidden;\n  opacity: 0;\n  transition: .3s; }\n\n.overflow.active {\n  visibility: visible;\n  opacity: 1; }\n\n.modal {\n  height: 70%;\n  background: #fff; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./BestMovies.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./BestMovies.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".best-movies-wrap {\n  padding: 50px 25px; }\n\n.best-movies,\n.movies-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  position: relative; }\n\n.pagintaion-wrap {\n  display: flex;\n  justify-content: center; }\n\n.pagination-btn {\n  width: 150px;\n  margin: 10px;\n  border: none;\n  color: #fff;\n  text-transform: uppercase;\n  height: 40px;\n  background: #1e1d23;\n  border-top: 2px solid #2c2b34;\n  cursor: pointer;\n  transition: .2s; }\n  .pagination-btn:hover {\n    background: #19181d; }\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var halls = exports.halls = {
  hallOne: [[0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0]]
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sidebar = __webpack_require__(32);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Helpers = __webpack_require__(0);

var _MoviesHelper = __webpack_require__(3);

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

__webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Genres = function () {
    function Genres(container) {
        _classCallCheck(this, Genres);

        this.container = container;
        this.sidebar = null;
    }

    _createClass(Genres, [{
        key: "create",
        value: function create() {
            var sidebar = new _Sidebar2.default();
            this.sidebar = sidebar.create();
            var genresWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["genres-wrap"]
            }, this.sidebar);
            this.container.appendChild(genresWrap);
        }
    }, {
        key: "loadGenres",
        value: function loadGenres() {
            var _this = this;

            var movieHelper = new _MoviesHelper2.default();
            movieHelper.getData(movieHelper.getUrl() + "genre/movie/list" + movieHelper.getApiKey()).then(function (data) {
                console.log(data.genres);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.genres[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        var genreItem = (0, _Helpers.createElement)({
                            tag: "li",
                            classList: ["sidebar-list-item"]
                        });
                        genreItem.innerHTML = item.name;
                        genreItem.addEventListener("click", _this.handleGenresListClick.bind(_this));
                        _this.sidebar.appendChild(genreItem);
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
        key: "handleGenresListClick",
        value: function handleGenresListClick(event) {
            console.log(event.target);
        }
    }]);

    return Genres;
}();

exports.default = Genres;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sidebar = function () {
    function Sidebar() {
        _classCallCheck(this, Sidebar);

        this.listItems = [];
        this.sidebarList = null;
    }

    _createClass(Sidebar, [{
        key: "create",
        value: function create() {
            var sidebarListWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["sidebar-list-wrap"]
            });
            this.sidebarList = (0, _Helpers.createElement)({
                tag: "ul",
                classList: ["sidebar-list"]
            });
            return this.sidebarList;
        }
    }]);

    return Sidebar;
}();

exports.default = Sidebar;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Sidebar.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Sidebar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".sidebar-list-wrap {\n  background: #1e1d23; }\n\n.sidebar-list {\n  width: 250px;\n  list-style-type: none;\n  background: #1e1d23;\n  border-bottom: 1px solid #19181d;\n  border-top: 2px solid #2c2b34;\n  box-shadow: 0 36px 28px -20px rgba(0, 0, 0, 0.2); }\n\n.sidebar-list-item {\n  height: 40px;\n  font-size: 14px;\n  line-height: 40px;\n  color: #fff;\n  cursor: pointer;\n  padding-left: 25px; }\n  .sidebar-list-item:hover {\n    background: #232229; }\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Genres.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Genres.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".genres-wrap {\n  width: 100%;\n  padding: 25px; }\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Layout.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Layout.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".layer {\n  display: none;\n  width: 100%;\n  min-height: 550px;\n  height: auto; }\n\n.layer.active {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(40);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Navigation.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Navigation.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".tabs-list {\n  background: #19181d;\n  display: flex;\n  flex-wrap: wrap; }\n\n.tab {\n  height: 70px;\n  width: 130px;\n  background: #19181d;\n  padding-bottom: 3px; }\n\n.tab-link {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  text-decoration: none;\n  color: #3d3c41;\n  transition: .2s;\n  font-size: 18px; }\n  .tab-link:hover {\n    background: #1e1d23;\n    color: #fff; }\n\n.tab-link.active {\n  background: #1e1d23;\n  color: #fff;\n  border-bottom: 3px solid #ff0707; }\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(0);

__webpack_require__(43);

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
      logoTitle.innerHTML = "The Movie Database";
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Header.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./Header.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".header {\n  width: 100%;\n  height: 80px;\n  background: #1e1d23;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center; }\n\n.header-logo-title {\n  display: flex;\n  align-items: center;\n  font-size: 16px;\n  text-transform: uppercase;\n  font-weight: bold;\n  letter-spacing: 2px;\n  height: 100%;\n  color: #fff; }\n\n.header-logo-wrap {\n  display: flex;\n  align-items: center;\n  padding-left: 45px;\n  height: 100%;\n  width: 5%; }\n\n.header-logo-title {\n  width: 15%; }\n\n.logo {\n  height: 65%; }\n\n.search {\n  margin-left: 80px;\n  width: 60%;\n  display: inline-block;\n  height: 20px;\n  font-size: 20px;\n  border-radius: 2px;\n  background: #2a2931;\n  padding: 10px;\n  outline: none;\n  border: none;\n  color: #fff;\n  transition: 0.3s linear;\n  border-bottom: 1px solid #19181d; }\n\n.search:focus {\n  background: #f3f3f3; }\n", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Raleway);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Josefin+Sans);", ""]);

// module
exports.push([module.i, "* {\n  padding: 0;\n  margin: 0; }\n\nbody {\n  background: #242329;\n  font-family: 'Open Sans', sans-serif;\n  height: 100vh;\n  font-weight: 600; }\n\n.spinner {\n  position: fixed;\n  background: #2a2931;\n  border-radius: 50%;\n  left: 50%;\n  top: 50%;\n  z-index: 99999;\n  margin-top: -50px;\n  margin-left: -50px;\n  width: 100px;\n  height: 100px;\n  animation: spin 2s linear infinite; }\n  .spinner:after, .spinner:before {\n    content: '';\n    display: block;\n    background: #ff0707;\n    border-radius: 50%;\n    width: 15px;\n    height: 15px;\n    top: -8px;\n    left: 50%;\n    margin-left: -15px;\n    position: absolute; }\n  .spinner:after {\n    top: auto;\n    bottom: -10px;\n    animation: bounlinear infinite; }\n\n@keyframes bounce {\n  0% {\n    transform: scale(0.2); }\n  100% {\n    transform: rotate(1); } }\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n", ""]);

// exports


/***/ })
/******/ ]);