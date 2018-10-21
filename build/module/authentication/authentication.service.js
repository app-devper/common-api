'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.loginSocial = exports.checkDuplicateLogin = exports.login = exports.authenticationApi = undefined;

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _appUtils = require('../../utils/app-utils');

var appUtils = _interopRequireWildcard(_appUtils);

var _authentication = require('./authentication.mongoose');

var authenMongoose = _interopRequireWildcard(_authentication);

var _users = require('../user/users.mongoose');

var usersMongoose = _interopRequireWildcard(_users);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load logger
var authenticationApi = exports.authenticationApi = async function authenticationApi(rcvReq, callback) {
  var req = rcvReq;
  try {
    if (appUtils.isBlank(req.get('dc-access-token')) || appUtils.isBlank(req.get('dc-user-id'))) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid header'));
    } else {
      var result = await authenMongoose.getAuthentication(req, req.get('dc-access-token'));
      var dateNow = Date.now();
      if (result !== null && result.userId !== null) {
        if (result.userId.status === 'ACTIVE') {
          if (dateNow - result.accessTime.getTime() < _config2.default.timeout) {
            await authenMongoose.updateLogin(req, result._id);
            _logger2.default.info('Authorize success');
            callback(null);
          } else {
            _logger2.default.info('Session has expired');
            callback(appUtils.genResponse(req.get('dc-language'), 'CM4010003', 'Session has expired'));
          }
        } else {
          _logger2.default.info('Unauthorized');
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4010001', 'Unauthorized'));
        }
      } else {
        _logger2.default.info('Session is invalid');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010007', 'Session is invalid'));
      }
    }
  } catch (err) {
    _logger2.default.error('service login Unhandled Exception: ', err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

// login step : 0
// authentication service

var login = exports.login = async function login(req, callback) {
  var rcvBody = req.body;
  try {
    _logger2.default.info('rcvBody.username ==>', rcvBody.username);
    _logger2.default.info('rcvBody.pwd ==> ', rcvBody.pwd);
    _logger2.default.info('rcvBody.channel ==> ', rcvBody.channel);

    // validate username & password : res user
    if (rcvBody === undefined || appUtils.isBlank(rcvBody.username) || appUtils.isBlank(rcvBody.pwd) || appUtils.isBlank(rcvBody.channel)) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'));
    } else {
      // next step get user Info
      var res = await getUserAndValidateLogin(req, rcvBody);
      callback(res);
    }
  } catch (err) {
    _logger2.default.error('service login Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

// step : 1
var getUserAndValidateLogin = async function getUserAndValidateLogin(req, rcvBody) {
  try {
    // get user
    var user = await usersMongoose.getUserByUsername(req, rcvBody.username);
    if (user === null) {
      // user is not found
      return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'User not found');
    } else {

      if (user.status !== "ACTIVE") {
        _logger2.default.info('Unauthorized');
        return appUtils.genResponse(req.get('dc-language'), 'CM4010001', 'Unauthorized');
      }

      // user is not null
      var isLocked = true;

      // case user lock
      if (user.timeToUnlock !== undefined && user.timeToUnlock !== null) {
        var nowDT = new Date();
        // unlock
        if (nowDT >= new Date(user.timeToUnlock)) {
          var reqParam = {
            '_id': user._id,
            countLoginFailed: 0,
            timeToUnlock: null
          };

          // update status
          await usersMongoose.updateLoginStatus(req, reqParam);
          user.countLoginFailed = 0;
          isLocked = false;
        }
      } else {
        isLocked = false;
      }

      _logger2.default.debug('IS ACCOUNT LOCKED >>>> ' + isLocked);

      if (user.password === rcvBody.pwd) {
        if (isLocked) {
          return appUtils.genResponse(req.get('dc-language'), 'CM4090005', 'User Locked');
        } else {
          // If login fail > 0, clear ...
          if (user.countLoginFailed && user.countLoginFailed > 0) {
            var _reqParam = {
              '_id': user._id,
              'countLoginFailed': 0,
              'timeToUnlock': null
            };
            await usersMongoose.updateLoginStatus(req, _reqParam);
          }

          return await checkDuplicateLogin(req, rcvBody, user);
        }
      } else {
        if (isLocked) {
          // update time to lock
          var vDateUnlock = user.timeToUnlock;
          vDateUnlock.setSeconds(user.timeToUnlock.getSeconds() + _config2.default.userLockTime);
          var _reqParam2 = {
            '_id': user._id,
            'countLoginFailed': user.countLoginFailed,
            'timeToUnlock': vDateUnlock
          };

          await usersMongoose.updateLoginStatus(req, _reqParam2);
          return appUtils.genResponse(req.get('dc-language'), 'CM4090005', 'User Locked');
        } else {
          var vCount = 0;
          var _vDateUnlock = null;

          if (user.countLoginFailed) {
            // failed to login not first time
            if (user.countLoginFailed < _config2.default.userLoginAttempt) {
              vCount = user.countLoginFailed + 1;

              if (vCount === _config2.default.userLoginAttempt) {
                _vDateUnlock = new Date();
                _vDateUnlock.setSeconds(_vDateUnlock.getSeconds() + _config2.default.userLockTime);
              }

              var _reqParam3 = {
                '_id': user._id,
                'countLoginFailed': vCount,
                'timeToUnlock': _vDateUnlock
              };

              await usersMongoose.updateLoginStatus(req, _reqParam3);
              return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password');
            } else {
              // failed to login on reset
              var _reqParam4 = {
                _id: user._id,
                'countLoginFailed': 1,
                'timeToUnlock': null
              };

              await usersMongoose.updateLoginStatus(req, _reqParam4);
              return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password');
            }
          } else {
            // failed to login on first time
            var _reqParam5 = {
              _id: user._id,
              'countLoginFailed': 1,
              'timeToUnlock': null
            };

            await usersMongoose.updateLoginStatus(req, _reqParam5);
            return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password');
          }
        }
      }
    }
  } catch (err) {
    _logger2.default.error('service getUserAndValidateLogin Unhandled Exception: ' + err);
    return appUtils.genResponse(req.get('dc-language'), 'CM5000000', err);
  }
};

// step : 2
var checkDuplicateLogin = exports.checkDuplicateLogin = async function checkDuplicateLogin(req, rcvBody, user) {
  try {
    // check duplicate login

    var authenData = {};
    authenData.userId = user._id;
    authenData.username = rcvBody.username;
    authenData.token = appUtils.genToken();
    authenData.channel = rcvBody.channel;
    authenData.valid = true;
    authenData.deviceToken = rcvBody.deviceToken === undefined ? undefined : rcvBody.deviceToken;
    authenData.deviceType = rcvBody.deviceType === undefined ? undefined : rcvBody.deviceType;
    authenData.deviceId = rcvBody.deviceId === undefined ? undefined : rcvBody.deviceId;

    var authen = await authenMongoose.addAuthentication(req, authenData);
    return appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Login success', { user: user, accessToken: authen.token });
  } catch (err) {
    _logger2.default.error('service checkDuplicateLogin Unhandled Exception: ' + err);
    return appUtils.genResponse(req.get('dc-language'), 'CM5000000', err);
  }
};

// login social
var loginSocial = exports.loginSocial = async function loginSocial(req, callback) {
  var rcvBody = req.body;
  try {
    _logger2.default.info('rcvBody.socialId ==>', rcvBody.socialId);
    _logger2.default.info('rcvBody.socialType ==> ', rcvBody.socialType);
    _logger2.default.info('rcvBody.socialName ==> ', rcvBody.socialName);
    _logger2.default.info('rcvBody.firstName ==> ', rcvBody.firstName);
    _logger2.default.info('rcvBody.email ==> ', rcvBody.email);

    // validate username & password : res user
    if (!rcvBody || appUtils.isBlank(rcvBody.socialId) || appUtils.isBlank(rcvBody.socialType) || appUtils.isBlank(rcvBody.socialName)) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'));
    } else {
      // next step get user Info
      var user = await usersMongoose.getUserByCriteria(req, { socialId: rcvBody.socialId, socialType: rcvBody.socialType });
      if (user === null) {
        // user is not found
        rcvBody.updatedDate = new Date();
        rcvBody.createdDate = new Date();
        rcvBody.status = "ACTIVE";
        rcvBody.role = "USER";
        var result = await usersMongoose.registerUser(req, rcvBody);
        var res = await checkDuplicateLogin(req, rcvBody, result);
        callback(res);
      } else {
        var _res = await checkDuplicateLogin(req, rcvBody, user);
        callback(_res);
      }
    }
  } catch (err) {
    _logger2.default.error('service login Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

// logout
var logout = exports.logout = async function logout(req, callback) {
  var accessToken = req.get('dc-access-token');
  try {
    if (appUtils.isBlank(accessToken)) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'invalidData'));
    } else {
      var res = await authenMongoose.getAuthentication(req, accessToken);
      if (res !== null) {
        await authenMongoose.removeAuthentication(req, req.get('dc-user-id'));
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Logout success'));
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010000', 'Unknown token'));
      }
    }
  } catch (err) {
    _logger2.default.error('service logout Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};
//# sourceMappingURL=authentication.service.js.map