import NotificationSchema from './notification.schema'
import PushDeviceSchema from "../subscription/push-device.schema";

export default class NotificationDao {
  constructor(logger) {
    this.logger = logger;
  }

  addNotification(it) {
    this.logger.info('mongoose addNotification');
    const data = new NotificationSchema(it);
    return data.save()
  }

  updateNotification(id, data) {
    this.logger.info('mongoose updateNotification');
    return NotificationSchema.findByIdAndUpdate({_id: id}, {$set: data}, {new: true}).lean()
  }

  getNotificationsByPage(receiver, page, limit) {
    this.logger.info('mongoose getNotificationsByPage');
    return NotificationSchema.find({receiver}).sort({'createdDate': -1}).limit(limit).skip((page - 1) * limit).lean();
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
