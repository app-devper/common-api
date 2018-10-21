'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../log/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load logger

// Load express
var appDir = _path2.default.join(__dirname, '../../dist/index.html');
var webDir = _path2.default.join(__dirname, '../../dist');

var router = _express2.default.Router(); // Load router

router.use('/logs', (0, _serveIndex2.default)(_config2.default.logPathConfig.appLog, { 'icons': true }));
router.use('/logs', _express2.default.static(_config2.default.logPathConfig.appLog));
router.use('/access', (0, _serveIndex2.default)(_config2.default.logPathConfig.accessLog, { 'icons': true }));
router.use('/access', _express2.default.static(_config2.default.logPathConfig.accessLog));
router.use('/info', (0, _serveIndex2.default)(_config2.default.logPathConfig.infoLog, { 'icons': true }));
router.use('/info', _express2.default.static(_config2.default.logPathConfig.infoLog));

router.use('/', _express2.default.static(webDir));

router.get('*', function (req, res) {
  res.sendFile(appDir);
});

_logger2.default.info('web.routes loaded');

exports.default = router;
//# sourceMappingURL=web.router.js.map