import NotificationService from "../../../data/service/notification.service";
import ApiError from "../../core/api.error";
import { general } from "../../core/message.properties";

export default class AddNotificationUseCase {
  constructor({notificationRepository, userRepository, logger}) {
    this.repository = notificationRepository;
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    let service = new NotificationService()
    let user = await this.userRepository.getUserById(param.receiver);
    if (user) {
      let result = await this.repository.addNotification(param);
      let devices = await this.repository.getDeviceByUserId(param.receiver);
      devices.forEach((device) => {
        service.sendNotification(device.deviceToken, result)
      });
      return result
    } else {
      throw new ApiError('User not found', general.dataNotFound)
    }
  }
}
