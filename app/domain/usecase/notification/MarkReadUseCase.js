export default class MarkReadUseCase {
  constructor({database, logger}) {
    this.notificationDao = database.notificationDao();
    this.logger = logger;
  }

  async execute(param) {
    await this.notificationDao.updateNotification(param.id, {status: "READ"})
    let result = await this.notificationDao.countUnread(param.userId)
    return {unread: result}
  }
}
