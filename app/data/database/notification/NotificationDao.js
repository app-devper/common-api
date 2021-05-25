import NotificationSchema from './NotificationSchema'

export default class NotificationDao {
  constructor(logger) {
    this.logger = logger;
  }

  addNotification(it) {
    this.logger.info('mongoose addNotification');
    return NotificationSchema.create(it)
  }

  updateNotification(id, data) {
    this.logger.info('mongoose updateNotification');
    return NotificationSchema.findByIdAndUpdate({_id: id}, {$set: data}, {new: true}).lean()
  }

  getNotificationsByPage(receiver, page, limit) {
    this.logger.info('mongoose getNotificationsByPage');
    return NotificationSchema.find({receiver})
      .sort({'createdDate': -1})
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
  }

  getNotificationById(id, userId) {
    this.logger.info('mongoose getNotificationById');
    return NotificationSchema.findByIdAndUpdate({
      _id: id,
      receiver: userId
    }, {$set: {status: "READ"}}, {new: true}).lean()
  }

  countNotification(receiver) {
    this.logger.info('mongoose countNotification');
    return NotificationSchema.countDocuments({receiver})
  }

  countUnread(receiver) {
    this.logger.info('mongoose countUnread');
    return NotificationSchema.countDocuments({receiver, status: "UNREAD"})
  }
}
