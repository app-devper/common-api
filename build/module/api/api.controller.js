'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.api = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _appUtils = require('../../utils/app-utils');

var applicationUtils = _interopRequireWildcard(_appUtils);

var _authentication = require('../authentication/authentication.service');

var service = _interopRequireWildcard(_authentication);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loggerInfo = require('../../log/logger-info');

var _loggerInfo2 = _interopRequireDefault(_loggerInfo);

var _loggerAccess = require('../../log/logger-access');

var _loggerAccess2 = _interopRequireDefault(_loggerAccess);

var _log = require('../../log/log.model');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api
// Load mongoose
var api = exports.api = function api(req, res, next) {
  _logger2.default.info('Start ==================================================================================================================');
  _logger2.default.info('validator something route url : ' + req.url);
  _logger2.default.info('validator something route method : ' + req.method);

  var bypass = req.url === '/authen' && req.method === 'POST' || req.url === '/authen/social' && req.method === 'POST' || req.url === '/authen/logout' && req.method === 'GET' || req.url === '/user/register' && req.method === 'POST';

  var authentication = function authentication() {
    if (bypass) {
      next();
    } else {
      service.authenticationApi(req, function (response) {
        if (response) {
          var logModel = new _log.LogModel();
          logModel.setRequest(req);
          _loggerAccess2.default.info(logModel.getAccessLog());
          logModel.setResponse(response);
          _loggerInfo2.default.info(logModel.getInfoLog());
          res.status(response.httpCode).send(response);
        } else {
          next();
        }
      });
    }
  };

  var connectionStatus = _mongoose2.default.connection.readyState;
  if (connectionStatus === 0) {
    var errMessage = 'Failed to connect to MongoDB';
    _logger2.default.error(errMessage);
    // Response.
    var response = applicationUtils.genResponse(req.get('dc-language'), 'OB5000036', errMessage);
    res.status(response.httpCode).send(response);
  } else {
    authentication();
  }
};

// authorize
// Load logger
var authorize = exports.authorize = function authorize(req, res, next) {
  var logModel = new _log.LogModel();
  logModel.setRequest(req);
  _loggerAccess2.default.info(logModel.getAccessLog());
  var response = applicationUtils.genResponse(req.get('dc-language'), 'CM4040000', 'Not found');
  logModel.setResponse(response);
  _loggerInfo2.default.info(logModel.getInfoLog());
  return res.status(response.httpCode).send(response);
};
//# sourceMappingURL=api.controller.js.map