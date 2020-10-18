import ApiError from '../../../presentation/ApiError';
import { general } from '../../../core/MessageProperties';

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
      this.logger.error('Invalid id format');
      throw new ApiError('Invalid data', general.invalidData)
    }
  }
}
