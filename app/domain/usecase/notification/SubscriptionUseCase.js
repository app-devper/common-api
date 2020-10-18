export default class SubscriptionUseCase {
  constructor({database, logger}) {
    this.pushDeviceDao = database.pushDeviceDao();
    this.logger = logger;
  }

  async execute(param) {
    let result = await this.pushDeviceDao.getDeviceById(param.userId, param.channel)
    if (result) {
      return await this.pushDeviceDao.updateDevice(result._id, param);
    } else {
      return await this.pushDeviceDao.addDevice(param);
    }
  }
}
