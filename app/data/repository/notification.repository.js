export default class NotificationRepository {
  constructor({database}) {
    this.pushDeviceDao = database.pushDeviceDao()
    this.notificationDao = database.notificationDao()
  }

  async addDevice(device) {
    let result = await this.pushDeviceDao.getDeviceById(device.userId, device.channel)
    if (result) {
      return await this.pushDeviceDao.updateDevice(result._id, device);
    } else {
      return await this.pushDeviceDao.addDevice(device);
    }
  }

  async getDeviceByUserId(userId) {
    return await this.pushDeviceDao.getDeviceByUserId(userId);
  }

  async addNotification(it) {
    return await this.notificationDao.addNotification(it)
  }

  async getNotificationsByPage(receiver, page, limit) {
    const total = await this.notificationDao.countNotification(receiver)
    let results = [];
    if (page > 0) {
      results = await this.notificationDao.getNotificationsByPage(receiver, page, limit);
    }
    const totalPages = Math.ceil(total / limit);
    return {results, total, page: page, totalPages}
  }

  async countUnread(receiver) {
    return await this.notificationDao.countUnread(receiver)
  }

  async markRead(receiver, id) {
    await this.notificationDao.updateNotification(id, {status: "READ"})
    return await this.notificationDao.countUnread(receiver)
  }

}
