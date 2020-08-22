export default class PushDeviceRepository {
  constructor({database}) {
    this.pushDeviceDao = database.pushDeviceDao()
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
}
