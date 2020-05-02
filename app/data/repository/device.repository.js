export default class DeviceRepository {
  constructor({ database }) {
    this.deviceDao = database.deviceDao()
  }

  addDevice(device) {
    return this.deviceDao.addDevice(device);
  }

  updateDevice(id, device) {
    return this.deviceDao.updateDevice(id, device);
  }

  getDeviceById(deviceId) {
    return this.deviceDao.getDeviceById(deviceId);
  }
}
