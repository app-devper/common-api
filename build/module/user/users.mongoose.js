'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserListByCriteria = exports.getUserByCriteria = exports.getUserByUsername = exports.unlockLoginStatus = exports.updateLoginStatus = exports.getUser = exports.removeUser = exports.getUserById = exports.updateUser = exports.registerUser = exports.addUser = undefined;

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _users = require('./users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addUser = exports.addUser = function addUser(req, user) {
  _logger2.default.info('mongoose addUser');
  var usersData = new _users2.default(user);
  return usersData.save();
}; // Load logger
var registerUser = exports.registerUser = function registerUser(req, user) {
  _logger2.default.info('mongoose registerUser');
  var usersData = new _users2.default(user);
  return usersData.save();
};

var updateUser = exports.updateUser = function updateUser(req, userId, user) {
  _logger2.default.info('mongoose updateUser');
  return _users2.default.findByIdAndUpdate({ _id: userId }, { $set: user }, { new: true });
};

var getUserById = exports.getUserById = function getUserById(req, _id) {
  _logger2.default.info('mongoose getUserById');
  return _users2.default.findById(_id, '-password -__v');
};

var removeUser = exports.removeUser = function removeUser(req, userId) {
  _logger2.default.info('mongoose removeUser');
  return _users2.default.remove({ _id: userId });
};

var getUser = exports.getUser = function getUser(req) {
  _logger2.default.info('mongoose getUser');
  return _users2.default.find({}, '-password -__v');
};

var updateLoginStatus = exports.updateLoginStatus = function updateLoginStatus(req, param) {
  _logger2.default.info('mongoose updateLoginStatus');
  return _users2.default.update({ _id: param._id }, {
    $set: {
      countLoginFailed: param.countLoginFailed,
      timeToUnlock: param.timeToUnlock,
      updatedDate: new Date()
    }
  });
};

var unlockLoginStatus = exports.unlockLoginStatus = function unlockLoginStatus(req, username) {
  _logger2.default.info('mongoose unlockLoginStatus');
  return _users2.default.update({ username: username }, {
    $set: {
      countLoginFailed: 0,
      timeToUnlock: null,
      updatedDate: new Date()
    }
  });
};

var getUserByUsername = exports.getUserByUsername = function getUserByUsername(req, username) {
  _logger2.default.info('mongoose getUserByUsername');
  _logger2.default.info('username : ' + username);
  return _users2.default.findOne({ username: username.toLowerCase() });
};

var getUserByCriteria = exports.getUserByCriteria = function getUserByCriteria(req, criteria) {
  _logger2.default.info('mongoose getUserByCriteria');
  return _users2.default.findOne(criteria, '-password -__v');
};

var getUserListByCriteria = exports.getUserListByCriteria = function getUserListByCriteria(req, criteria) {
  _logger2.default.info('mongoose getUserByCriteria');
  return _users2.default.find(criteria, '-password -__v');
};
//# sourceMappingURL=users.mongoose.js.map