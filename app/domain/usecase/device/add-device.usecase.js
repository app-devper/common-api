import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class AddDeviceUsecase {
  constructor({ deviceRepository, logger }) {
    this.repository = deviceRepository;
    this.logger = logger;
  }

  async execute(param) {
    if (param.deviceId) {
      const device = await this.repository.getDeviceById(param.deviceId);
      let result;
      if (device) {
        result = await this.repository.updateDevice(device._id, param);
      } else {
        result = await this.repository.addDevice(param);
      }
      return result
    } else {
      this.logger.error('Invalid id format');
      throw new ApiError('Invalid data', general.invalidData)
    }
  }
}
