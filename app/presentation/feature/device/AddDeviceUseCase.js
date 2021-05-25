import ApiError from '../../ApiError';
import { general } from '../../core/error/MessageProperties';

export default class AddDeviceUseCase {
  constructor({database, logger}) {
    this.deviceDao = database.deviceDao()
    this.logger = logger;
  }

  async execute(param) {
    if (param.deviceId) {
      const device = await this.deviceDao.getDeviceById(param.deviceId);
      let result;
      if (device) {
        result = await this.deviceDao.updateDevice(device._id, param);
      } else {
        result = await this.deviceDao.addDevice(param);
      }
      return result
    } else {
      this.logger.error('Invalid device id');
      throw new ApiError('Invalid device id', general.invalidData)
    }
  }
}
