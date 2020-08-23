export default class MarkReadUseCase {
  constructor({notificationRepository, logger}) {
    this.repository = notificationRepository;
    this.logger = logger;
  }

  async execute(param) {
    let result = await this.repository.markRead(param.userId, param.id);
    return {unread: result}
  }
}
