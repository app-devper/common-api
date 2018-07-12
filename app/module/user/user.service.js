import logger from "../../utils/logger";
import * as appUtils from "../../utils/app-utils";
import * as userMongoose from './user.mongoose';

export const addUser = (req, callback) => {
  try {
    let reqBody = req.body;
    userMongoose.getUserByUsername(req, reqBody.username, (err, user) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        if (user) {
          logger.info('User duplicate');
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4010101', "User duplicate"))
        } else {
          reqBody.updatedDate = new Date();
          reqBody.createdDate = new Date();
          reqBody.createdBy = req.get('dc-user-id');
          reqBody.updatedBy = req.get('dc-user-id');
          userMongoose.addUser(req, reqBody, (err, result) => {
            if (err) {
              callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
            } else {
              callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Add user success', result))
            }
          })
        }
      }
    })

  } catch (err) {
    logger.error('service addUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const updateUser = (req, callback) => {
  let reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.get('dc-user-id');
  try {
    userMongoose.updateUser(req, req.params.userId, reqBody, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Update user success', result))
      }
    })
  } catch (err) {
    logger.error('service updateUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const removeUser = (req, callback) => {
  try {
    userMongoose.removeUser(req, req.params.userId, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Remove user success', result))
      }
    })
  } catch (err) {
    logger.error('service removeUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getUser = (req, callback) => {
  try {
    userMongoose.getUser(req, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result))
      }
    })
  } catch (err) {
    logger.error('service getUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getUserById = (req, callback) => {
  try {
    userMongoose.getUserById(req, req.params.userId, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        if (result) {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result))
        } else {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4090100', 'User not found'))
        }
      }
    })
  } catch (err) {
    logger.error('service getUserById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};
