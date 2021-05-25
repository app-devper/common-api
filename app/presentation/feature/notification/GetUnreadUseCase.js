export default class GetUnreadUseCase {
  constructor({database, logger}) {
    this.notificationDao = database.notificationDao();
    this.logger = logger;
  }

  async execute(param) {
    let result = await this.notificationDao.countUnread(param.userId);
    return {unread: result}
  }
}
