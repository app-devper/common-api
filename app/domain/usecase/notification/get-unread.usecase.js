export default class GetUnreadUseCase {
  constructor({notificationRepository, logger}) {
    this.repository = notificationRepository;
    this.logger = logger;
  }

  async execute(param) {
    let result = await this.repository.countUnread(param.userId);
    return {unread: result}
  }
}
