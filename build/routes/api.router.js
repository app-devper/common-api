'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _logger = require('../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _api = require('../module/api/api.controller');

var controller = _interopRequireWildcard(_api);

var _appUtils = require('../utils/app-utils');

var appUtils = _interopRequireWildcard(_appUtils);

var _users = require('../module/user/users.routes');

var _users2 = _interopRequireDefault(_users);

var _authentication = require('../module/authentication/authentication.routes');

var _authentication2 = _interopRequireDefault(_authentication);

var _merchant = require('../module/merchant/merchant.routes');

var _merchant2 = _interopRequireDefault(_merchant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Load controller
// Load express
_logger2.default.info('Loading server api routes'); // Load logger


var apiRouter = express.Router(); // Load router

apiRouter.use(function (req, res, next) {
  req.reqId = appUtils.genRequestId();
  req.reqDate = new Date();
  controller.api(req, res, next);
});

//  Load routes for out controllers
apiRouter.use('/authen', _authentication2.default);
apiRouter.use('/user', _users2.default);
apiRouter.use('/merchant', _merchant2.default);

apiRouter.use(function (req, res, next) {
  controller.authorize(req, res, next);
});

_logger2.default.info('Server api routes loaded');

exports.default = apiRouter;
//# sourceMappingURL=api.router.js.map