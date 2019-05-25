import logger from '../../log/logger'
import * as appUtils from '../../utils/app-utils'
import * as usersMongoose from './users.mongoose'
import { resMessage } from '../../common/message.properties'
import { ACTIVE } from '../../common/user.status';
import { USER } from '../../common/user.role';

export const addUser = async (req, callback) => {
  try {
    let reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      logger.info('Invalid data');
      callback(appUtils.genResponse(req.language, resMessage.general.invalidData, 'Invalid data'))
    } else {
      let user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        logger.info('User duplicate');
        callback(appUtils.genResponse(req.language, resMessage.user.duplicate, 'User duplicate'))
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.createdBy = req.user._id;
        reqBody.updatedBy = req.user._id;
        reqBody.status = ACTIVE;
        let result = await usersMongoose.addUser(req, reqBody);
        callback(appUtils.genResponse(req.language, resMessage.general.success, 'Add user success', result))
      }
    }
  } catch (err) {
    logger.error('service addUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};

export const registerUser = async (req, callback) => {
  try {
    let reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      logger.info('Invalid data');
      callback(appUtils.genResponse(req.language, resMessage.general.invalidData, 'Invalid data'))
    } else {
      let user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        logger.info('User duplicate');
        callback(appUtils.genResponse(req.language, resMessage.user.duplicate, 'User duplicate'))
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.status = ACTIVE;
        reqBody.role = USER;
        let result = await usersMongoose.registerUser(req, reqBody);
        callback(appUtils.genResponse(req.language, resMessage.general.success, 'Add user success', result))
      }
    }
  } catch (err) {
    logger.error('service registerUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};

export const updateUser = async (req, callback) => {
  let reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.user._id;
  try {
    let result = await usersMongoose.updateUser(req, req.params.userId, reqBody);
    callback(appUtils.genResponse(req.language, resMessage.general.success, 'Update user success', result))
  } catch (err) {
    logger.error('service updateUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};

export const removeUser = async (req, callback) => {
  try {
    let result = await usersMongoose.removeUser(req, req.params.userId);
    callback(appUtils.genResponse(req.language, resMessage.general.success, 'Remove user success', result))
  } catch (err) {
    logger.error('service removeUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};

export const getUser = async (req, callback) => {
  try {
    let result = await usersMongoose.getUser(req);
    callback(appUtils.genResponse(req.language, resMessage.general.success, 'Get user success', result))
  } catch (err) {
    logger.error('service getUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};

export const getUserById = async (req, callback) => {
  try {
    let result = await usersMongoose.getUserById(req, req.params.userId);
    if (result) {
      callback(appUtils.genResponse(req.language, resMessage.general.success, 'Get user success', result))
    } else {
      logger.info('User not found');
      callback(appUtils.genResponse(req.language, resMessage.general.dataNotFound, 'User not found'))
    }
  } catch (err) {
    logger.error('service getUserById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};
