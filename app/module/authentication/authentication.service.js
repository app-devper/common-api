// authentication service

import logger from '../../utils/logger'// Load logger
import * as appUtils from '../../utils/app-utils'
import * as authenMongoose from './authentication.mongoose'
import * as usersMongoose from '../user/users.mongoose'
import config from '../../config/config'

export const authenticationApi = async (rcvReq, callback) => {
  let req = rcvReq;
  try {
    if (appUtils.isBlank(req.get('dc-access-token')) || appUtils.isBlank(req.get('dc-user-id'))) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid header'))
    } else {
      const result = await authenMongoose.getAuthentication(req, req.get('dc-access-token'));
      let dateNow = Date.now();
      if (result !== null && result.userId !== null) {
        if (result.userId.status === 'ACTIVE') {
          if (dateNow - result.accessTime.getTime() < config.timeout) {
            await authenMongoose.updateLogin(req, result._id);
            logger.info('Authorize success');
            callback(null)
          } else {
            logger.info('Session has expired');
            callback(appUtils.genResponse(req.get('dc-language'), 'CM4010003', 'Session has expired'))
          }
        } else {
          logger.info('Unauthorized');
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4010001', 'Unauthorized'))
        }
      } else {
        logger.info('Session is invalid');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010007', 'Session is invalid'))
      }
    }
  } catch (err) {
    logger.error('service login Unhandled Exception: ', err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

// login step : 0
export const login = async (req, callback) => {
  let rcvBody = req.body;
  try {
    logger.info('rcvBody.username ==>', rcvBody.username);
    logger.info('rcvBody.pwd ==> ', rcvBody.pwd);
    logger.info('rcvBody.channel ==> ', rcvBody.channel);

    // validate username & password : res user
    if (rcvBody === undefined || appUtils.isBlank(rcvBody.username) || appUtils.isBlank(rcvBody.pwd) || appUtils.isBlank(rcvBody.channel)) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'))
    } else {
      // next step get user Info
      let res = await getUserAndValidateLogin(req, rcvBody);
      callback(res)
    }
  } catch (err) {
    logger.error('service login Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

// step : 1
const getUserAndValidateLogin = async (req, rcvBody) => {
  try {
    // get user
    const user = await usersMongoose.getUserByUsername(req, rcvBody.username);
    if (user === null) {
      // user is not found
      return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'User not found')
    } else {

      if (user.status !== "ACTIVE") {
        logger.info('Unauthorized');
        return appUtils.genResponse(req.get('dc-language'), 'CM4010001', 'Unauthorized')
      }

      // user is not null
      let isLocked = true;

      // case user lock
      if (user.timeToUnlock !== undefined && user.timeToUnlock !== null) {
        let nowDT = new Date();
        // unlock
        if (nowDT >= new Date(user.timeToUnlock)) {
          let reqParam = {
            '_id': user._id,
            countLoginFailed: 0,
            timeToUnlock: null
          };

          // update status
          await usersMongoose.updateLoginStatus(req, reqParam);
          user.countLoginFailed = 0;
          isLocked = false
        }
      } else {
        isLocked = false
      }

      logger.debug('IS ACCOUNT LOCKED >>>> ' + isLocked);

      if (user.password === rcvBody.pwd) {
        if (isLocked) {
          return appUtils.genResponse(req.get('dc-language'), 'CM4090005', 'User Locked')
        } else {
          // If login fail > 0, clear ...
          if (user.countLoginFailed && user.countLoginFailed > 0) {
            let reqParam = {
              '_id': user._id,
              'countLoginFailed': 0,
              'timeToUnlock': null
            };
            await usersMongoose.updateLoginStatus(req, reqParam)
          }

          return await checkDuplicateLogin(req, rcvBody, user)
        }
      } else {
        if (isLocked) {
          // update time to lock
          let vDateUnlock = user.timeToUnlock;
          vDateUnlock.setSeconds(user.timeToUnlock.getSeconds() + config.userLockTime);
          let reqParam = {
            '_id': user._id,
            'countLoginFailed': user.countLoginFailed,
            'timeToUnlock': vDateUnlock
          };

          await usersMongoose.updateLoginStatus(req, reqParam);
          return appUtils.genResponse(req.get('dc-language'), 'CM4090005', 'User Locked')
        } else {
          let vCount = 0;
          let vDateUnlock = null;

          if (user.countLoginFailed) { // failed to login not first time
            if (user.countLoginFailed < config.userLoginAttempt) {
              vCount = user.countLoginFailed + 1;

              if (vCount === config.userLoginAttempt) {
                vDateUnlock = new Date();
                vDateUnlock.setSeconds(vDateUnlock.getSeconds() + config.userLockTime)
              }

              let reqParam = {
                '_id': user._id,
                'countLoginFailed': vCount,
                'timeToUnlock': vDateUnlock
              };

              await usersMongoose.updateLoginStatus(req, reqParam);
              return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password')
            } else { // failed to login on reset
              let reqParam = {
                _id: user._id,
                'countLoginFailed': 1,
                'timeToUnlock': null
              };

              await usersMongoose.updateLoginStatus(req, reqParam);
              return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password')
            }
          } else { // failed to login on first time
            let reqParam = {
              _id: user._id,
              'countLoginFailed': 1,
              'timeToUnlock': null
            };

            await usersMongoose.updateLoginStatus(req, reqParam);
            return appUtils.genResponse(req.get('dc-language'), 'CM4090006', 'Incorrect password')
          }
        }
      }
    }
  } catch (err) {
    logger.error('service getUserAndValidateLogin Unhandled Exception: ' + err);
    return appUtils.genResponse(req.get('dc-language'), 'CM5000000', err)
  }
};

// step : 2
const checkDuplicateLogin = async (req, rcvBody, user) => {
  try {
    // check duplicate login
    // const result = await authenMongoose.findDuplicateLogin(req, user._id, rcvBody.channel);

    let authenData = {};
    authenData.userId = user._id;
    authenData.username = rcvBody.username;
    authenData.token = appUtils.genToken();
    authenData.channel = rcvBody.channel;
    authenData.valid = true;
    authenData.deviceToken = (rcvBody.deviceToken === undefined ? undefined : rcvBody.deviceToken);
    authenData.deviceType = (rcvBody.deviceType === undefined ? undefined : rcvBody.deviceType);
    authenData.deviceId = (rcvBody.deviceId === undefined ? undefined : rcvBody.deviceId);

    const authen = await authenMongoose.addAuthentication(req, authenData);
    return appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Login success', {user, accessToken: authen.token})
  } catch (err) {
    logger.error('service checkDuplicateLogin Unhandled Exception: ' + err);
    return appUtils.genResponse(req.get('dc-language'), 'CM5000000', err)
  }
};

export const logout = async (req, callback) => {
  let accessToken = req.get('dc-access-token');
  try {
    if (appUtils.isBlank(accessToken)) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'invalidData'))
    } else {
      const res = await authenMongoose.getAuthentication(req, accessToken);
      if (res !== null) {
        await authenMongoose.removeAuthentication(req, req.get('dc-user-id'));
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Logout success'))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010000', 'Unknown token'))
      }
    }
  } catch (err) {
    logger.error('service logout Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};
