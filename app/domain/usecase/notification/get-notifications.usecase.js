export default class GetNotificationsUseCase {
  constructor({ notificationRepository, logger }) {
    this.repository = notificationRepository;
    this.logger = logger;
  }

  async execute(param) {
    return await this.repository.getNotificationsByPage(param.userId, param.page, param.limit)
  }
}
