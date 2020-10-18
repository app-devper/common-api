import PushDeviceSchema from './PushDeviceSchema'

export default class PushDeviceDao {
  constructor(logger) {
    this.logger = logger;
  }

  addDevice(device) {
    this.logger.info('mongoose addDevice');
    return PushDeviceSchema.create(device)
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
