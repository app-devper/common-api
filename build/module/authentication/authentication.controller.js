'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.loginSocial = exports.login = undefined;

var _appUtils = require('../../utils/app-utils');

var applicationUtils = _interopRequireWildcard(_appUtils);

var _authentication = require('./authentication.service');

var service = _interopRequireWildcard(_authentication);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loggerAccess = require('../../log/logger-access');

var _loggerAccess2 = _interopRequireDefault(_loggerAccess);

var _loggerInfo = require('../../log/logger-info');

var _loggerInfo2 = _interopRequireDefault(_loggerInfo);

var _logModel = require('../../log/log.model.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// login
var login = exports.login = function login(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.login(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('login Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

// login social
// Load logger
var loginSocial = exports.loginSocial = function loginSocial(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.loginSocial(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('login Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

// logout
var logout = exports.logout = function logout(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.logout(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      if (response.resCode === 'CM2000000') {
        res.json(response);
      } else {
        res.status(500).send(response);
      }
    });
  } catch (err) {
    _logger2.default.error('logout Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};
//# sourceMappingURL=authentication.controller.js.map