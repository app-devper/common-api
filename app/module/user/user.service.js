import logger from '../../logger/logger'
import { genResponse, isBlank } from '../../util/utils'
import * as usersMongoose from './user.mongoose'
import { resMessage } from '../../common/message.properties'
import { ACTIVE } from '../../common/user.status';
import { USER } from '../../common/user.role';

export const addUser = async (req) => {
  try {
    const reqBody = req.body;
    if (!reqBody || isBlank(reqBody.username) || isBlank(reqBody.password)) {
      logger.info('Invalid data');
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid data')
    } else {
      const user = await usersMongoose.getUserByUsername(req, reqBody.username);
      if (user) {
        logger.info('User duplicate');
        return genResponse(req.language, resMessage.user.duplicate, 'User duplicate')
      } else {
        reqBody.status = ACTIVE;
        reqBody.role = USER;
        reqBody.username = reqBody.username.toLowerCase();
        reqBody.updatedDate = new Date();
        reqBody.createdDate = new Date();
        if (req.user) {
          reqBody.createdBy = req.user._id;
          reqBody.updatedBy = req.user._id;
        }
        const result = await usersMongoose.addUser(req, reqBody);
        return genResponse(req.language, resMessage.general.success, 'Add user success', result)
      }
    }
  } catch (err) {
    logger.error('service addUser Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const updateUser = async (req) => {
  const reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.user._id;
  try {
    const result = await usersMongoose.updateUser(req, req.params.userId, reqBody);
    return genResponse(req.language, resMessage.general.success, 'Update user success', result)
  } catch (err) {
    logger.error('service updateUser Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const removeUser = async (req) => {
  try {
    const result = await usersMongoose.removeUser(req, req.params.userId);
    if (result) {
      return genResponse(req.language, resMessage.general.success, 'Remove user success', result)
    } else {
      logger.info('User not found');
      return genResponse(req.language, resMessage.general.dataNotFound, 'User not found')
    }
  } catch (err) {
    logger.error('service removeUser Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const getUser = async (req) => {
  try {
    const result = await usersMongoose.getUser(req);
    return genResponse(req.language, resMessage.general.success, 'Get user success', result)
  } catch (err) {
    logger.error('service getUser Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const getUserById = async (req) => {
  try {
    const result = await usersMongoose.getUserById(req, req.params.userId);
    if (result) {
      return genResponse(req.language, resMessage.general.success, 'Get user success', result)
    } else {
      logger.info('User not found');
      return genResponse(req.language, resMessage.general.dataNotFound, 'User not found')
    }
  } catch (err) {
    logger.error('service getUserById Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
