export default class GetNotificationsUseCase {
  constructor({database, logger}) {
    this.notificationDao = database.notificationDao();
    this.logger = logger;
  }

  async execute(param) {
    const total = await this.notificationDao.countNotification(param.userId)
    let results = [];
    if (param.page > 0) {
      results = await this.notificationDao.getNotificationsByPage(param.userId, param.page, param.limit);
    }
    const totalPages = Math.ceil(total / param.limit);
    return {results, total, page: param.page, totalPages}
  }
}
