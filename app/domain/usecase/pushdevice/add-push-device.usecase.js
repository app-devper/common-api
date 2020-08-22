export default class AddPushDeviceUseCase {
  constructor({pushDeviceRepository, logger}) {
    this.repository = pushDeviceRepository;
    this.logger = logger;
  }

  async execute(param) {
    return await this.repository.addDevice(param);
  }
}
