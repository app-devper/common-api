'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users.controller');

var controller = _interopRequireWildcard(_users);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load logger

var userRouter = _express2.default.Router(); // Load controller


_logger2.default.info('user.routes loaded');

userRouter.post('/', function (req, res) {
  _logger2.default.info('user router add user');
  controller.addUser(req, res);
});

userRouter.post('/register', function (req, res) {
  _logger2.default.info('user router register user');
  controller.registerUser(req, res);
});

userRouter.get('/', function (req, res) {
  _logger2.default.info('user router get user');
  controller.getUser(req, res);
});

userRouter.get('/:userId', function (req, res) {
  _logger2.default.info('user router get user');
  controller.getUserById(req, res);
});

userRouter.put('/:userId', function (req, res) {
  _logger2.default.info('user router update user');
  controller.updateUser(req, res);
});

userRouter.delete('/:userId', function (req, res) {
  _logger2.default.info('user router remove user');
  controller.removeUser(req, res);
});

exports.default = userRouter;
//# sourceMappingURL=users.routes.js.map