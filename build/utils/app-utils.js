'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlank = exports.genRequestId = exports.genToken = exports.genResponse = undefined;

var _logger = require('../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../common/constants');

var _main = require('../response/main.response');

var _message = require('../common/message.properties');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//     Load logger
var genResponse = exports.genResponse = function genResponse() {
  var _language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

  var _resCode = arguments[1];
  var _devMessage = arguments[2];

  var _data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var responseObj = void 0;
  try {
    var messageCode = _constants.resCode[_resCode];
    var messageRes = messageCode[_language];
    var resHttpCode = messageCode.httpCode;
    responseObj = new _main.MainResponse(_resCode, messageRes, _devMessage, _data, resHttpCode);
  } catch (error) {
    _logger2.default.error('AppUtils Unhandled Exception: ' + error);
    responseObj = new _main.MainResponse('CM5000000', _message.resMessage.general.error.en, error.message, undefined, 500);
  }
  return responseObj;
}; // Load config (environment)
var genToken = exports.genToken = function genToken() {
  return s4() + s4() + s4() + s4() + s4();
};

var genRequestId = exports.genRequestId = function genRequestId() {
  return (0, _moment2.default)(new Date()).format('YYYYMMDDHHmmssSSS') + s4().toUpperCase();
};

var isBlank = exports.isBlank = function isBlank(str) {
  return str === undefined || str === null || str === '';
};

var s4 = function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
//# sourceMappingURL=app-utils.js.map