import logger from '../../logger/logger'
import { genResponse, isBlank, pagination } from '../../util/utils'
import * as notificationMongoose from './notification.mongoose'
import mongoose from 'mongoose';
import { resMessage } from '../../common/message.properties';
import { ACTIVE } from "../../common/user.status";
import { callFcm } from "./fcm.service";

export const addNotification = async (req) => {
  try {
    const reqBody = req.body;
    if (!reqBody || isBlank(reqBody.title) || isBlank(reqBody.body)) {
      logger.info('Invalid data');
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid data')
    } else {
      reqBody.status = ACTIVE;
      reqBody.createdDate = new Date();
      if (req.user) {
        reqBody.createdBy = req.user._id;
      }
      const result = await notificationMongoose.addNotification(reqBody);
      const count = await notificationMongoose.countNotification();
      sendNotification(result, count);
      return genResponse(req.language, resMessage.general.success, 'Add notification success', result)
    }
  } catch (err) {
    logger.error('service addNotification Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

const sendNotification = (result, badge) => {
  let message = {
    to: "/topics/all",
    data: {
      badge: badge,
      custom_notification: result
    }
  };
  callFcm(message)
};

export const getNotification = async (req) => {
  try {
    const count = await notificationMongoose.countNotification();
    const { offset, limit, nextUrl, previousUrl } = pagination(req, count);
    let result = await notificationMongoose.getNotificationLimit(offset, limit);
    return genResponse(req.language, resMessage.general.success, 'Get Notification success',
      { count, next: nextUrl, previous: previousUrl, results: result })
  } catch (err) {
    logger.error('service getNotification Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const getNotificationById = async (req) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid Notification id format')
    } else {
      const result = await notificationMongoose.getNotificationById(req.params.notificationId);
      if (result) {
        return genResponse(req.language, resMessage.general.success, 'Get Notification success', result)
      } else {
        logger.info('Notification not found');
        return genResponse(req.language, resMessage.general.dataNotFound, 'Notification not found')
      }
    }
  } catch (err) {
    logger.error('service getNotificationById Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
