"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// main response

var MainResponse = exports.MainResponse = function MainResponse(_resCode, _resMessage, _devMessage, _data, _httpCode) {
  _classCallCheck(this, MainResponse);

  this.resCode = _resCode;
  this.resMessage = _resMessage;
  this.devMessage = _devMessage;
  this.data = _data;
  this.httpCode = _httpCode;
  this.serverTime = new Date();
};
//# sourceMappingURL=main.response.js.map