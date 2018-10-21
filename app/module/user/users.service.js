import logger from '../../log/logger'
import * as appUtils from '../../utils/app-utils'
import * as usersMongoose from './users.mongoose'
import * as authen from '../authentication/authentication.service'

export const addUser = async (req, callback) => {
  try {
    let reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      logger.info('Invalid data');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'))
    } else {
      let user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        logger.info('User duplicate');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010101', 'User duplicate'))
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.createdBy = req.get('dc-user-id');
        reqBody.updatedBy = req.get('dc-user-id');
        let result = await usersMongoose.addUser(req, reqBody);
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Add user success', result))
      }
    }
  } catch (err) {
    logger.error('service addUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const registerUser = async (req, callback) => {
  try {
    let reqBody = req.body;
    if (!reqBody || appUtils.isBlank(reqBody.username) || appUtils.isBlank(reqBody.password)) {
      logger.info('Invalid data');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090000', 'Invalid data'))
    } else {
      let user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        logger.info('User duplicate');
        callback(appUtils.genResponse(req.get('dc-language'), 'CM4010101', 'User duplicate'))
      } else {
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        reqBody.status = 'ACTIVE';
        reqBody.role = 'USER';
        let user = await usersMongoose.registerUser(req, reqBody);
        let res = await authen.checkDuplicateLogin(req, reqBody, user);
        callback(res)
      }
    }
  } catch (err) {
    logger.error('service registerUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const updateUser = async (req, callback) => {
  let reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.get('dc-user-id');
  try {
    let result = await usersMongoose.updateUser(req, req.params.userId, reqBody);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Update user success', result))
  } catch (err) {
    logger.error('service updateUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const removeUser = async (req, callback) => {
  try {
    let result = await usersMongoose.removeUser(req, req.params.userId);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Remove user success', result))
  } catch (err) {
    logger.error('service removeUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getUser = async (req, callback) => {
  try {
    let result = await usersMongoose.getUser(req);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result))
  } catch (err) {
    logger.error('service getUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getUserById = async (req, callback) => {
  try {
    let result = await usersMongoose.getUserById(req, req.params.userId);
    if (result) {
      callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get user success', result))
    } else {
      logger.info('User not found');
      callback(appUtils.genResponse(req.get('dc-language'), 'CM4090100', 'User not found'))
    }
  } catch (err) {
    logger.error('service getUserById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};
