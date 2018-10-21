'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _logger = require('./log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _web = require('./routes/web.router');

var _web2 = _interopRequireDefault(_web);

var _api = require('./routes/api.router');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load api router

// Load config (environment)
// Load cors
// Load mongoose
_logger2.default.info('Starting: ' + _config2.default.app.name + '....'); // Load root router
// Load logger
// Load bodyParser
// Load express

_logger2.default.info('Connecting to MongoDB Instance: ' + _config2.default.db);

var db = _mongoose2.default.connection;
var port = process.env.PORT || _config2.default.app.port;

_mongoose2.default.connect(_config2.default.db, _config2.default.options);

db.on('connecting', function () {
  _logger2.default.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  _logger2.default.error('Could not connect to MongoDB!');
  _logger2.default.error(error.message);
  _mongoose2.default.disconnect();
});

db.on('connected', function () {
  if (db.client.s.url.startsWith('mongodb+srv')) {
    db.db = db.client.db('common');
  }
  _logger2.default.info('MongoDB connected!');
});

db.once('open', function () {
  _logger2.default.info('MongoDB connection opened!');
});

db.on('reconnected', function () {
  _logger2.default.info('MongoDB reconnected!');
});

db.on('disconnected', function () {
  _logger2.default.info('MongoDB disconnected!');
});

// Create the app
// ============================================================================================
var app = (0, _express2.default)(db);

app.enable('trust proxy');

// Configure app to use bodyParser()
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(_bodyParser2.default.json({ limit: '50mb' }));

// Enable CORS on Express server instance
app.use((0, _cors2.default)());

// Configure app routes
app.use('/api', _api2.default);
app.use('/', _web2.default);

// Start the app by listening on <port>
// ===========================================================================================
app.listen(port);

// Logging initialization
_logger2.default.info(_config2.default.app.name + ' listening on port: ' + port);
//# sourceMappingURL=server.js.map