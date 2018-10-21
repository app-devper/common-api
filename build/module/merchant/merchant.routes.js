'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _merchant = require('./merchant.controller');

var controller = _interopRequireWildcard(_merchant);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load logger

var merchantRouter = _express2.default.Router(); // Load controller


_logger2.default.info('merchant.routes loaded');

merchantRouter.post('/', function (req, res) {
  _logger2.default.info('merchant router add merchant');
  controller.addMerchant(req, res);
});

merchantRouter.get('/', function (req, res) {
  _logger2.default.info('merchant router get merchant');
  controller.getMerchant(req, res);
});

merchantRouter.get('/:merchantId', function (req, res) {
  _logger2.default.info('merchant router get merchant');
  controller.getMerchantById(req, res);
});

merchantRouter.put('/:merchantId', function (req, res) {
  _logger2.default.info('merchant router update merchant');
  controller.updateMerchant(req, res);
});

merchantRouter.delete('/:merchantId', function (req, res) {
  _logger2.default.info('merchant router remove merchant');
  controller.removeMerchant(req, res);
});

exports.default = merchantRouter;
//# sourceMappingURL=merchant.routes.js.map