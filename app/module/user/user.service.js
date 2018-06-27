import logger from "../../utils/logger";
import * as applicationUtils from "../../utils/app-utils";
import * as userMongoose from './user.mongoose';

export const addUser = (req, callback) => {
  let reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.createdDate = new Date();
  try {
    userMongoose.addUser(req, reqBody, (err, result) => {
      if (err) {
        callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message, undefined))
      } else {
        callback(applicationUtils.genResponse(req.get('dc-language'), 'CM2000000', 'success', result))
      }
    })
  } catch (err) {
    logger.error('service addUser Unhandled Exception: ' + err);
    callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

export const getUser = (req, callback) => {
  try {
    userMongoose.getUser(req, (err, result) => {
      if (err) {
        callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message, undefined))
      } else {
        callback(applicationUtils.genResponse(req.get('dc-language'), 'CM2000000', 'get user success', result))
      }
    })
  } catch (err) {
    logger.error('service getUser Unhandled Exception: ' + err);
    callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};

export const getUserById = (req, callback) => {
  try {
    userMongoose.getUserById(req, req.params.userId, (err, result) => {
      if (err) {
        callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message, undefined))
      } else {
        if (result) {
          callback(applicationUtils.genResponse(req.get('dc-language'), 'CM2000000', 'success', result))
        } else {
          callback(applicationUtils.genResponse(req.get('dc-language'), 'CM4090100', 'User not found', result))
        }
      }
    })
  } catch (err) {
    logger.error('service getUserById Unhandled Exception: ' + err);
    callback(applicationUtils.genResponse(req.get('dc-language'), 'CM5000000', err, undefined))
  }
};
