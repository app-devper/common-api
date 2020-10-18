import DeviceSchema from './DeviceSchema'

export default class DeviceDao {
  constructor(logger) {
    this.logger = logger;
  }

  addDevice(device) {
    this.logger.info('mongoose addDevice');
    return DeviceSchema.create(device)
  }

  updateDevice(id, device) {
    this.logger.info('mongoose updateDevice');
    return DeviceSchema.findByIdAndUpdate({_id: id}, {$set: device}, {new: true}).lean()
  }

  getDeviceById(deviceId) {
    this.logger.info('mongoose getDeviceById');
    return DeviceSchema.findOne({deviceId: deviceId}).lean()
  }
}
