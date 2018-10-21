'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMerchantById = exports.getMerchant = exports.removeMerchant = exports.updateMerchant = exports.addMerchant = undefined;

var _appUtils = require('../../utils/app-utils');

var appUtils = _interopRequireWildcard(_appUtils);

var _merchant = require('./merchant.service');

var service = _interopRequireWildcard(_merchant);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loggerAccess = require('../../log/logger-access');

var _loggerAccess2 = _interopRequireDefault(_loggerAccess);

var _loggerInfo = require('../../log/logger-info');

var _loggerInfo2 = _interopRequireDefault(_loggerInfo);

var _logModel = require('../../log/log.model.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addMerchant = exports.addMerchant = function addMerchant(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.addMerchant(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('addMerchant Unhandled Exception: ' + err);
    var response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
}; // Load logger
var updateMerchant = exports.updateMerchant = function updateMerchant(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.updateMerchant(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('updateMerchant Unhandled Exception: ' + err);
    var response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var removeMerchant = exports.removeMerchant = function removeMerchant(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.removeMerchant(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('removeMerchant Unhandled Exception: ' + err);
    var response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var getMerchant = exports.getMerchant = function getMerchant(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.getMerchant(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('getMerchant Unhandled Exception: ' + err);
    var response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

var getMerchantById = exports.getMerchantById = function getMerchantById(req, res) {
  var logModel = new _logModel.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  try {
    service.getMerchantById(req, function (response) {
      logModel.setResponse(response);
      _loggerInfo2.default.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    _logger2.default.error('getMerchantById Unhandled Exception: ' + err);
    var response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    _loggerInfo2.default.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};
//# sourceMappingURL=merchant.controller.js.map