// authentication service

import logger from '../../utils/logger'; // 	Load logger
import * as appUtils from '../../utils/app-utils';
import * as authenticationMongoose from '../authentication/authentication.mongoose';
import * as userMongoose from '../user/user.mongoose';
import * as config from '../../config/config';

export const authenticationApi = (rcvReq, callback) => {
  let req = rcvReq;
  try {
    if (appUtils.isBlank(req.get('dc-access-token')) || appUtils.isBlank(req.get('dc-user-id'))) {
      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090000', 'Invalid header'))
    } else {
      authenticationMongoose.getAuthentication(req, req.get('dc-access-token'), (err, result) => {
        if (err) {
          callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message))
        } else {
          let dateNow = Date.now();
          if (result !== null) {
            if (result.userId.status === 'ACTIVE') {
              if (dateNow - result.accessTime.getTime() < config.timeout) {
                authenticationMongoose.updateLogin(req, result._id, (err) => {
                  if (err) {
                    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message))
                  } else {
                    logger.info("Authorize success");
                    callback(null)
                  }
                });
              } else {
                logger.info("Session has expired");
                callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4010003', 'Session has expired.', undefined))
              }
            } else {
              logger.info("Unauthorized");
              callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4010001', 'Unauthorized', undefined))
            }
          } else {
            logger.info("Session is invalid");
            callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4010007', 'Session is invalid.', undefined))
          }
        }
      });
    }

  } catch (err) {
    logger.error('service login Unhandled Exception: ', err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err))
  }
};

// login step : 0
export const login = (req, callback) => {
  let rcvBody = req.body;
  try {
    logger.info('rcvBody.username ==>', rcvBody.username);
    logger.info('rcvBody.pwd ==> ', rcvBody.pwd);
    logger.info('rcvBody.channel ==> ', rcvBody.channel);

    // validate username & password : res user
    if (rcvBody === undefined || appUtils.isBlank(rcvBody.username) || appUtils.isBlank(rcvBody.pwd) || appUtils.isBlank(rcvBody.channel)) {
      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090000', 'invalidData', undefined))
    } else {
      // next step get user Info
      getUserAndValidateLogin(req, rcvBody, function (res) {
        callback(res)
      });
    }
  } catch (err) {
    logger.error('service login Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

//step : 1
const getUserAndValidateLogin = (req, rcvBody, callback) => {
  try {
    //get user
    userMongoose.getUserByUsername(req, rcvBody.username, (err, user) => {
      if (err) {
        callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
      } else {
        if (user === null) {
          callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090006', 'User Not found', undefined))
        } else {
          //user is not null
          let isLoginSuccess = false;
          let isLocked = true;

          //case user lock
          if (user.timeToUnlock !== undefined && user.timeToUnlock !== null) {
            let nowDT = new Date();

            //unlock
            if (nowDT >= new Date(user.timeToUnlock)) {

              let reqParam = {
                "_id": user._id,
                countLoginFailed: 0,
                timeToUnlock: null,
              };

              //update status
              userMongoose.updateLoginStatus(req, reqParam, (err) => {
                if (err) {
                  callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                }
              });

              user.countLoginFailed = 0;
              isLocked = false;
            }
          } else {
            isLocked = false;
          }

          logger.debug('IS ACCOUNT LOCKED >>>> ' + isLocked);

          if (user.password === rcvBody.pwd) {
            if (isLocked) {
              callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090005', 'User Locked', undefined))
            } else {
              // If login fail > 0, clear ...
              if (user.countLoginFailed && user.countLoginFailed > 0) {
                let reqParam = {
                  "_id": user._id,
                  "countLoginFailed": 0,
                  "timeToUnlock": null,
                };

                userMongoose.updateLoginStatus(req, reqParam, (err) => {
                  if (err) {
                    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                  }
                });
              }
              isLoginSuccess = true;
            }
          } else {
            if (isLocked) {
              //update timetounlock
              let vDateUnlock = user.timeToUnlock;

              vDateUnlock.setSeconds(user.timeToUnlock.getSeconds() + config.userLockTime);

              let reqParam = {
                "_id": user._id,
                "countLoginFailed": user.countLoginFailed,
                "timeToUnlock": vDateUnlock,
              };

              userMongoose.updateLoginStatus(req, reqParam, (err) => {
                if (err) {
                  callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                } else {
                  callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090005', 'User Locked', undefined))
                }
              });

            } else {
              let vCount = 0;
              let vDateUnlock = null;
              // failed to login not first time
              if (user.countLoginFailed) {

                if (user.countLoginFailed < config.userLoginAttempt) {
                  vCount = user.countLoginFailed + 1;

                  if (vCount === config.userLoginAttempt) {
                    vDateUnlock = new Date();
                    vDateUnlock.setSeconds(vDateUnlock.getSeconds() + config.userLockTime);
                  }

                  let reqParam = {
                    "_id": user._id,
                    "countLoginFailed": vCount,
                    "timeToUnlock": vDateUnlock,
                  };

                  userMongoose.updateLoginStatus(req, reqParam, (err) => {
                    if (err) {
                      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                    } else {
                      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090006', 'Incorrect password', undefined))
                    }
                  });

                  // failed to login on first time
                } else {
                  let reqParam = {
                    _id: user._id,
                    "countLoginFailed": 1,
                    "timeToUnlock": null,
                  };

                  userMongoose.updateLoginStatus(req, reqParam, (err) => {
                    if (err) {
                      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                    } else {
                      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090006', 'Incorrect password', undefined))
                    }
                  });
                }
              } else {
                let reqParam = {
                  _id: user._id,
                  "countLoginFailed": 1,
                  "timeToUnlock": null,
                };

                userMongoose.updateLoginStatus(req, reqParam, (err) => {
                  if (err) {
                    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
                  } else {
                    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090006', 'Incorrect password', undefined))
                  }
                });
              }
            }
          }

          if (isLoginSuccess) {
            //set capabilities for user
            checkDuplicateLogin(req, rcvBody, user, (res) => {
              callback(res)
            })
          }

        }
      }
    });
  } catch (err) {
    logger.error('service getUserAndValidateLogin Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

// step : 2
const checkDuplicateLogin = (req, rcvBody, user, callback) => {
  try {
    //check duplicate login
    authenticationMongoose.findDuplicateLogin(req, user._id, rcvBody.channel, function (err, authen) {
      if (err) {
        callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err.message, undefined))
      } else {
        if (authen === null) {
          //new login gen token & insert authentication
          logger.debug('NEW LOGIN');
          authentication(req, rcvBody, user, function (res) {
            callback(res)
          });
        } else {
          //check duplicate login
          let dateNow = Date.now();
          if (dateNow - authen.accessTime.getTime() < config.timeout) {
            logger.debug('DUPLICATE LOGIN');
            callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4010004', "Duplicate Login", undefined))
          } else {
            logger.debug('NEW LOGIN AGAIN');
            removeAuthentication(req, authen._id, rcvBody, user, function (res) {
              callback(res)
            });
          }
        }
      }
    });
  } catch (err) {
    logger.error('service checkDuplicateLogin Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

const removeAuthentication = (req, _id, rcvBody, user, callback) => {
  try {
    // update access time
    authenticationMongoose.removeAuthentication(req, user._id, function (err) {
      if (err) {
        callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
      } else {
        authentication(req, rcvBody, user, function (res) {
          callback(res)
        });
      }
    });
  } catch (err) {
    logger.error('service removeAuthentication Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

const authentication = (req, rcvBody, user, callback) => {
  try {
    // gen token & insert token
    let authenData = {};
    authenData.userId = user._id;
    authenData.username = rcvBody.username;
    authenData.token = appUtils.genToken();
    authenData.channel = rcvBody.channel;
    authenData.valid = true;
    authenData.deviceToken = (rcvBody.deviceToken === undefined ? undefined : rcvBody.deviceToken);
    authenData.deviceType = (rcvBody.deviceType === undefined ? undefined : rcvBody.deviceType);
    authenData.deviceId = (rcvBody.deviceId === undefined ? undefined : rcvBody.deviceId);

    authenticationMongoose.addAuthentication(req, authenData, function (err) {
      if (err) {
        callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
      } else {
        let result = {user, accessToken: authenData.token};
        callback(appUtils.genResponseObj(req.get('dc-language'), 'CM2000000', 'success', result))
      }
    });
  } catch (err) {
    logger.error('service authentication Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

export const logout = (req, callback) => {
  let accessToken = req.get('dc-access-token');
  try {
    if (appUtils.isBlank(accessToken)) {
      callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4090000', 'invalidData', undefined))
    } else {
      authenticationMongoose.getAuthentication(req, accessToken, (err, res) => {
        if (err) {
          callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
        } else {
          if (res !== null) {
            authenticationMongoose.removeAuthentication(req, req.get('dc-user-id'), (err, res) => {
              if (err) {
                callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
              } else {
                callback(appUtils.genResponseObj(req.get('dc-language'), 'CM2000000', 'logout success', undefined))
              }
            });
          } else {
            callback(appUtils.genResponseObj(req.get('dc-language'), 'CM4010000', 'unknownToken', undefined))
          }
        }
      });
    }
  } catch (err) {
    logger.error('service logout Unhandled Exception: ' + err);
    callback(appUtils.genResponseObj(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};
