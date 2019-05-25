// authentication service

import logger from '../../log/logger' // Load logger
import * as appUtils from '../../utils/app-utils'
import * as authenMongoose from './authentication.mongoose'
import * as usersMongoose from '../users/users.mongoose'
import config from 'config'
import { resMessage } from '../../common/message.properties'
import { header } from '../../common/constants'
import { ACTIVE } from '../../common/user.status'
import { ADMIN } from '../../common/user.role';

export const authenticate = async (req, username, password) => {
  const user = await usersMongoose.getUserByUsername(req, username);
  if (user) {
    if (user.status !== ACTIVE || user.role !== ADMIN) {
      logger.info('Unauthorized');
      return appUtils.genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
    }
    req.user = user;
    return validateUser(req, user, password)
  } else {
    logger.info('User not found');
    return appUtils.genResponse(req.language, resMessage.authentication.incorrectUserPass, 'User not found')
  }
};

export const validateUser = async (req, user, password) => {
  let isLocked = true;
  // case user lock
  if (user.countLoginFailed >= config.userLoginAttempt) {
    let date = new Date();
    // unlock
    if (date >= new Date(user.timeToUnlock)) {
      isLocked = false
    }
  } else {
    isLocked = false
  }

  logger.info('User is locked : ' + isLocked);

  if (user.password === password) {
    if (isLocked) {
      logger.info('User is locked');
      return appUtils.genResponse(req.language, resMessage.authentication.tooManyInvalidPass, 'User is locked', { timeToUnlock: user.timeToUnlock })
    } else {
      logger.info('Authenticate Success');
      return null
    }
  } else {
    if (isLocked) {
      // update time to lock
      let dateUnlock = new Date();
      dateUnlock.setSeconds(dateUnlock.getSeconds() + config.userLockTime);
      let reqParam = {
        _id: user._id,
        countLoginFailed: user.countLoginFailed,
        timeToUnlock: dateUnlock
      };
      await usersMongoose.updateLoginStatus(req, reqParam);
      logger.info('User is lock');
      return appUtils.genResponse(req.language, resMessage.authentication.tooManyInvalidPass, 'User is lock')
    } else {
      let param = {
        _id: user._id,
        countLoginFailed: user.countLoginFailed + 1,
        timeToUnlock: user.timeToUnlock
      };
      if (param.countLoginFailed >= config.userLoginAttempt) {
        let dateUnlock = new Date();
        dateUnlock.setSeconds(dateUnlock.getSeconds() + config.userLockTime);
        param.timeToUnlock = dateUnlock;
      }
      await usersMongoose.updateLoginStatus(req, param);
      logger.info('Incorrect password');
      return appUtils.genResponse(req.language, resMessage.authentication.incorrectUserPass, 'Incorrect password')
    }
  }
};

export const checkToken = async (req) => {
  let accessToken = req.get(header.token) || req.cookies.accessToken;
  try {
    if (appUtils.isBlank(accessToken)) {
      logger.info('Access token invalid');
      return appUtils.genResponse(req.language, resMessage.general.invalidData, 'Access token invalid')
    } else {
      const result = await authenMongoose.getAuthentication(req, accessToken.toLowerCase());
      if (result !== null && result.userId !== null) {
        if (result.userId.status === ACTIVE) {
          let dateNow = Date.now();
          if (dateNow - result.accessTime.getTime() < config.timeout) {
            logger.info('Authorize success');
            await authenMongoose.updateLogin(req, result._id);
            req.user = result.userId;
            return null
          } else {
            logger.info('Session has expired');
            return appUtils.genResponse(req.language, resMessage.authentication.tokenExpired, 'Token has expired')
          }
        } else {
          logger.info('Unauthorized');
          return appUtils.genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
        }
      } else {
        logger.info('Session is invalid');
        return appUtils.genResponse(req.language, resMessage.authentication.tokenInvalid, 'Token is invalid')
      }
    }
  } catch (err) {
    logger.error('service checkToken Unhandled Exception: ', err);
    return appUtils.genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const login = async (req, res) => {
  let rcvBody = req.body;
  try {
    logger.info('body.username ==> ' + rcvBody.username);
    logger.info('body.channel ==> ' + rcvBody.channel);

    // validate username & password : res user
    if (appUtils.isBlank(rcvBody.username) || appUtils.isBlank(rcvBody.pwd) || appUtils.isBlank(rcvBody.channel)) {
      logger.info('Invalid login data');
      return appUtils.genResponse(req.language, resMessage.general.invalidData, 'Invalid login data')
    } else {
      /// get user
      const user = await usersMongoose.getUserByUsername(req, rcvBody.username);
      if (user) {
        if (user.status !== ACTIVE) {
          logger.info('Unauthorized');
          return appUtils.genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
        }
        let result = await validateUser(req, user, rcvBody.pwd);
        if (result) {
          return result
        }
        let reqParam = {
          _id: user._id,
          countLoginFailed: 0,
          timeToUnlock: user.timeToUnlock
        };
        await usersMongoose.updateLoginStatus(req, reqParam);
        let authenData = {};
        authenData.userId = user._id;
        authenData.username = user.username;
        authenData.token = appUtils.genToken();
        authenData.channel = rcvBody.channel;
        authenData.valid = true;
        authenData.deviceToken = rcvBody.deviceToken;
        authenData.deviceType = rcvBody.deviceType;
        authenData.deviceId = rcvBody.deviceId;
        delete user.password;
        delete user.countLoginFailed;
        delete user.timeToUnlock;
        const authen = await authenMongoose.addAuthentication(req, authenData);
        res.cookie('accessToken', authen.token, { maxAge: config.timeout, httpOnly: true });
        return appUtils.genResponse(req.language, resMessage.general.success, 'Login success', { user, accessToken: authen.token })
      } else {
        logger.info('User not found');
        return appUtils.genResponse(req.language, resMessage.authentication.incorrectUserPass, 'User not found')
      }
    }
  } catch (err) {
    logger.error('service login Unhandled Exception: ' + err);
    return appUtils.genResponse(req.language, resMessage.general.error, err.message)
  }
};

// logout
export const logout = async (req) => {
  let accessToken = req.get(header.token) || req.cookies.accessToken;
  try {
    if (appUtils.isBlank(accessToken)) {
      return appUtils.genResponse(req.language, resMessage.general.invalidData, 'invalidData')
    } else {
      const result = await authenMongoose.getAuthentication(req, accessToken);
      if (result !== null) {
        await authenMongoose.removeAuthentication(req, result.userId._id);
      }
      return appUtils.genResponse(req.language, resMessage.general.success, 'Logout success')
    }
  } catch (err) {
    logger.error('service logout Unhandled Exception: ' + err);
    return appUtils.genResponse(req.language, resMessage.general.error, err.message)
  }
};
