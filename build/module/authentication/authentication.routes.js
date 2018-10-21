'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('./authentication.controller');

var controller = _interopRequireWildcard(_authentication);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load logger

var authenRouter = _express2.default.Router(); // Load controller


_logger2.default.info('authentication.routes loaded');

authenRouter.post('/', function (req, res) {
  _logger2.default.info('authen router post login');
  controller.login(req, res);
});

authenRouter.post('/social', function (req, res) {
  _logger2.default.info('authen router post login social');
  controller.loginSocial(req, res);
});

authenRouter.get('/logout', function (req, res) {
  _logger2.default.info('authen router get logout');
  controller.logout(req, res);
});

exports.default = authenRouter;
//# sourceMappingURL=authentication.routes.js.map