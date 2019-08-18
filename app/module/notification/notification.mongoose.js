import logger from '../../logger/logger' // Load logger
import NotificationSchema from './notification.schema'

export const addNotification = (notification) => {
  logger.info('mongoose addNotification');
  const notificationData = new NotificationSchema(notification);
  return notificationData.save()
};

export const updateNotification = (notificationId, notification) => {
  logger.info('mongoose updateNotification');
  return NotificationSchema.findByIdAndUpdate({ _id: notificationId }, { $set: notification }, { new: true }).lean()
};

export const getNotificationById = (_id) => {
  logger.info('mongoose getNotificationById');
  return NotificationSchema.findOne({ _id: _id }).lean()
};

export const getNotificationByFbId = (senderId) => {
  logger.info('mongoose getNotificationById');
  return NotificationSchema.findOne({ senderId: senderId }).lean()
};

export const removeNotification = (notificationId) => {
  logger.info('mongoose removeNotification');
  return NotificationSchema.findByIdAndRemove({ _id: notificationId })
};

export const removeNotificationList = (notificationIds) => {
  logger.info('mongoose removeNotificationList');
  return NotificationSchema.deleteMany({ _id: { $in: notificationIds } })
};

export const getNotification = () => {
  logger.info('mongoose getNotification');
  return NotificationSchema.find({}).lean()
};

export const countNotification = () => {
  logger.info('mongoose countNotification');
  return NotificationSchema.countDocuments({})
};

export const getNotificationLimit = (offset = 0, limit = 20) => {
  logger.info('mongoose getNotificationLimit');
  return NotificationSchema.find({}).limit(limit)
    .skip(offset).lean()
};
