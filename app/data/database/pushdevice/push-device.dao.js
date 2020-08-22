import PushDeviceSchema from './push-device.schema'

export default class PushDeviceDao {
  constructor(logger) {
    this.logger = logger;
  }

  addDevice(device) {
    this.logger.info('mongoose addDevice');
    const deviceData = new PushDeviceSchema(device);
    return deviceData.save()
  }

  updateDevice(id, device) {
    this.logger.info('mongoose updateDevice');
    return PushDeviceSchema.findByIdAndUpdate({_id: id}, {$set: device}, {new: true}).lean()
  }

  getDeviceByUserId(userId) {
    this.logger.info('mongoose getDeviceByUserId');
    return PushDeviceSchema.find({userId}).lean()
  }

  getDeviceById(userId, channel) {
    this.logger.info('mongoose getDeviceById');
    return PushDeviceSchema.findOne({userId, channel}).lean()
  }
}
