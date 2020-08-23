export default class SubscriptionUseCase {
  constructor({notificationRepository, logger}) {
    this.repository = notificationRepository;
    this.logger = logger;
  }

  async execute(param) {
    return await this.repository.addDevice(param);
  }
}
