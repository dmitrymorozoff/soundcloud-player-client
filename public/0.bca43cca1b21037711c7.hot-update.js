webpackHotUpdate(0,{

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ticket-reserv-wrapper {\n  width: 1200px;\n  height: 600px; }\n", ""]);

// exports


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
        placesWrapper.appendChild();
      }
      return ticketReservWrapper;
    }
  }]);

  return TicketReservation;
}();

exports.default = TicketReservation;

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