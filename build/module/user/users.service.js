'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.getUser = exports.removeUser = exports.updateUser = exports.registerUser = exports.addUser = undefined;

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _appUtils = require('../../utils/app-utils');

var appUtils = _interopRequireWildcard(_appUtils);

var _users = require('./users.mongoose');

var usersMongoose = _interopRequireWildcard(_users);

var _authentication = require('../authentication/authentication.service');

var authen = _interopRequireWildcard(_authentication);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addUser = exports.addUser = async function addUser(req, callback) {
  try {
    var reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      _logger2.default.info('Invalid data');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'));
    } else {
      var user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        _logger2.default.info('User duplicate');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010101', 'User duplicate'));
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.createdBy = req.get('dc-user-id');
        reqBody.updatedBy = req.get('dc-user-id');
        var result = await usersMongoose.addUser(req, reqBody);
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Add user success', result));
      }
    }
  } catch (err) {
    _logger2.default.error('service addUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var registerUser = exports.registerUser = async function registerUser(req, callback) {
  try {
    var reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      _logger2.default.info('Invalid data');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'));
    } else {
      var user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        _logger2.default.info('User duplicate');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010101', 'User duplicate'));
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.status = "ACTIVE";
        reqBody.role = "USER";
        var _user = await usersMongoose.registerUser(req, reqBody);
        var res = await authen.checkDuplicateLogin(req, reqBody, _user);
        callback(res);
      }
    }
  } catch (err) {
    _logger2.default.error('service registerUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var updateUser = exports.updateUser = async function updateUser(req, callback) {
  var reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.get('dc-user-id');
  try {
    var result = await usersMongoose.updateUser(req, req.params.userId, reqBody);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Update user success', result));
  } catch (err) {
    _logger2.default.error('service updateUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var removeUser = exports.removeUser = async function removeUser(req, callback) {
  try {
    var result = await usersMongoose.removeUser(req, req.params.userId);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Remove user success', result));
  } catch (err) {
    _logger2.default.error('service removeUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var getUser = exports.getUser = async function getUser(req, callback) {
  try {
    var result = await usersMongoose.getUser(req);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result));
  } catch (err) {
    _logger2.default.error('service getUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var getUserById = exports.getUserById = async function getUserById(req, callback) {
  try {
    var result = await usersMongoose.getUserById(req, req.params.userId);
    if (result) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result));
    } else {
      _logger2.default.info('User not found');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090100', 'User not found'));
    }
  } catch (err) {
    _logger2.default.error('service getUserById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};
//# sourceMappingURL=users.service.js.map