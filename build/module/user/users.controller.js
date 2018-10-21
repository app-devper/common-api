'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.getUser = exports.removeUser = exports.updateUser = exports.registerUser = exports.addUser = undefined;

var _appUtils = require('../../utils/app-utils');

var applicationUtils = _interopRequireWildcard(_appUtils);

var _users = require('./users.service');

var service = _interopRequireWildcard(_users);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loggerAccess = require('../../log/logger-access');

var _loggerAccess2 = _interopRequireDefault(_loggerAccess);

var _loggerInfo = require('../../log/logger-info');

var _loggerInfo2 = _interopRequireDefault(_loggerInfo);

var _logModel = require('../../log/log.model.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addUser = exports.addUser = function addUser(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.addUser(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('addUser Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
}; // Load logger
var registerUser = exports.registerUser = function registerUser(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.registerUser(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('registerUser Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var updateUser = exports.updateUser = function updateUser(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.updateUser(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('updateUser Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var removeUser = exports.removeUser = function removeUser(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.removeUser(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('removeUser Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var getUser = exports.getUser = function getUser(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.getUser(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('getUser Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var getUserById = exports.getUserById = function getUserById(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.getUserById(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('getUserById Unhandled Exception: ' + err);
    var response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};
//# sourceMappingURL=users.controller.js.map