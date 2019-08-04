// authentication service
import jwt from 'jsonwebtoken';
import config from 'config'
import logger from '../../logger/logger' // Load logger
import * as authenMongoose from './auth.mongoose'
import * as usersMongoose from '../user/user.mongoose'
import { resMessage } from '../../common/message.properties'
import { header } from '../../common/constants'
import { ACTIVE } from '../../common/user.status'
import { ADMIN } from '../../common/user.role';
import { genResponse, genToken, isBlank } from '../../util/utils';

export const authenticate = async (req, username, password) => {
  try {
    const user = await usersMongoose.getUserByUsername(req, username);
    if (user) {
      if (user.status !== ACTIVE || user.role !== ADMIN) {
        logger.info('Unauthorized');
        return genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
      }
      req.user = user;
      return await validateUser(req, user, password)
    } else {
      logger.info('User not found');
      return genResponse(req.language, resMessage.authentication.incorrectUserPass, 'User not found')
    }
  } catch (err) {
    logger.error('service authenticate Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const validateUser = async (req, user, password) => {
  let isLocked = true;
  // case user lock
  if (user.countLoginFailed >= config.userLoginAttempt) {
    const date = new Date();
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
      return genResponse(req.language, resMessage.authentication.tooManyInvalidPass, 'User is locked', { timeToUnlock: user.timeToUnlock })
    } else {
      logger.info('Authenticate Success');
      return null
    }
  } else {
    if (isLocked) {
      // update time to lock
      const dateUnlock = new Date();
      dateUnlock.setSeconds(dateUnlock.getSeconds() + config.userLockTime);
      const reqParam = {
        _id: user._id,
        countLoginFailed: user.countLoginFailed,
        timeToUnlock: dateUnlock
      };
      await usersMongoose.updateLoginStatus(req, reqParam);
      logger.info('User is lock');
      return genResponse(req.language, resMessage.authentication.tooManyInvalidPass, 'User is lock')
    } else {
      const param = {
        _id: user._id,
        countLoginFailed: user.countLoginFailed + 1,
        timeToUnlock: user.timeToUnlock
      };
      if (param.countLoginFailed >= config.userLoginAttempt) {
        const dateUnlock = new Date();
        dateUnlock.setSeconds(dateUnlock.getSeconds() + config.userLockTime);
        param.timeToUnlock = dateUnlock;
      }
      await usersMongoose.updateLoginStatus(req, param);
      logger.info('Incorrect password');
      return genResponse(req.language, resMessage.authentication.incorrectUserPass, 'Incorrect password')
    }
  }
};

export const checkToken = async (req) => {
  try {
    const accessToken = req.headers[header.token] || req.cookies.accessToken;
    if (isBlank(accessToken)) {
      logger.info('Missing Authorization Header');
      return genResponse(req.language, resMessage.general.missingAuthorization, 'Missing Authorization Header')
    } else {
      const result = await authenMongoose.getAuthentication(req, accessToken.toLowerCase());
      if (result !== null && result.userId !== null) {
        if (result.userId.status === ACTIVE) {
          const dateNow = Date.now();
          if (dateNow - result.accessTime.getTime() < config.timeout) {
            logger.info('Authorize success');
            await authenMongoose.updateLogin(req, result._id);
            req.user = result.userId;
            return null
          } else {
            logger.info('Session has expired');
            return genResponse(req.language, resMessage.authentication.tokenExpired, 'Token has expired')
          }
        } else {
          logger.info('Unauthorized');
          return genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
        }
      } else {
        logger.info('Session is invalid');
        return genResponse(req.language, resMessage.authentication.tokenInvalid, 'Token is invalid')
      }
    }
  } catch (err) {
    logger.error('service checkToken Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const checkJwt = async (req) => {
  try {
    let token = req.headers.authorization;
    logger.info('token: ' + token);
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      try {
        const decoded = await jwt.verify(token, config.secret);
        logger.info('Decoded: ' + JSON.stringify(decoded));
        req.user = decoded;
        return null;
      } catch (err) {
        logger.error('service checkJwt verify Exception: ' + err);
        return genResponse(req.language, resMessage.authentication.tokenInvalid, err.message)
      }
    } else {
      return genResponse(req.language, resMessage.general.missingAuthorization, 'Missing Authorization Header');
    }
  } catch (err) {
    logger.error('service checkJwt Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const loginJwt = async (req) => {
  try {
    const rcvBody = req.body;
    if (isBlank(rcvBody.username) || isBlank(rcvBody.pwd) || isBlank(rcvBody.channel)) {
      logger.info('Invalid login data');
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid login data')
    } else {
      const user = await usersMongoose.getUserByUsername(req, rcvBody.username);
      if (user) {
        if (user.status !== ACTIVE) {
          logger.info('Unauthorized');
          return genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
        }
        const result = await validateUser(req, user, rcvBody.pwd);
        if (result) {
          return result
        }
        delete user.password;
        delete user.countLoginFailed;
        delete user.timeToUnlock;
        const token = jwt.sign(user, config.secret);
        // res.cookie('accessToken', token, { maxAge: config.timeout, httpOnly: true });
        return genResponse(req.language, resMessage.general.success, 'Login success', { user, accessToken: token })
      } else {
        logger.info('User not found');
        return genResponse(req.language, resMessage.authentication.incorrectUserPass, 'User not found')
      }
    }
  } catch (err) {
    logger.error('service login Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const login = async (req) => {
  try {
    const rcvBody = req.body;
    logger.info('body.username ==> ' + rcvBody.username);
    logger.info('body.channel ==> ' + rcvBody.channel);

    // validate username & password : res user
    if (isBlank(rcvBody.username) || isBlank(rcvBody.pwd) || isBlank(rcvBody.channel)) {
      logger.info('Invalid login data');
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid login data')
    } else {
      /// get user
      const user = await usersMongoose.getUserByUsername(req, rcvBody.username);
      if (user) {
        if (user.status !== ACTIVE) {
          logger.info('Unauthorized');
          return genResponse(req.language, resMessage.authentication.unAuthorized, 'Unauthorized')
        }
        const result = await validateUser(req, user, rcvBody.pwd);
        if (result) {
          return result
        }
        const reqParam = {
          _id: user._id,
          countLoginFailed: 0,
          timeToUnlock: user.timeToUnlock
        };
        await usersMongoose.updateLoginStatus(req, reqParam);
        const authenData = {};
        authenData.userId = user._id;
        authenData.username = user.username;
        authenData.token = genToken();
        authenData.channel = rcvBody.channel;
        authenData.valid = true;
        authenData.deviceToken = rcvBody.deviceToken;
        authenData.deviceType = rcvBody.deviceType;
        authenData.deviceId = rcvBody.deviceId;
        delete user.password;
        delete user.countLoginFailed;
        delete user.timeToUnlock;
        const authen = await authenMongoose.addAuthentication(req, authenData);
        // res.cookie('accessToken', authen.token, { maxAge: config.timeout, httpOnly: true });
        return genResponse(req.language, resMessage.general.success, 'Login success', { user, accessToken: authen.token })
      } else {
        logger.info('User not found');
        return genResponse(req.language, resMessage.authentication.incorrectUserPass, 'User not found')
      }
    }
  } catch (err) {
    logger.error('service login Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

// logout
export const logout = async (req) => {
  try {
    const accessToken = req.headers[header.token] || req.headers.authorization || req.cookies.accessToken;
    if (isBlank(accessToken)) {
      return genResponse(req.language, resMessage.general.invalidData, 'invalidData')
    } else {
      const result = await authenMongoose.getAuthentication(req, accessToken);
      if (result !== null) {
        await authenMongoose.removeAuthentication(req, result.userId._id);
      }
      return genResponse(req.language, resMessage.general.success, 'Logout success')
    }
  } catch (err) {
    logger.error('service logout Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
