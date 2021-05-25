import NotificationService from "../../../data/remote/NotificationService";
import ApiError from "../../ApiError";
import { general } from "../../core/error/MessageProperties";

export default class AddNotificationUseCase {
  constructor({database, logger}) {
    this.notificationDao = database.notificationDao();
    this.pushDeviceDao = database.pushDeviceDao();
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    let service = new NotificationService()
    let user = await this.userDao.getUserById(param.receiver);
    if (user) {
      let result = await this.notificationDao.addNotification(param);
      let devices = await this.pushDeviceDao.getDeviceByUserId(param.receiver);
      devices.forEach((device) => {
        service.sendNotification(device.deviceToken, result)
      });
      return result
    } else {
      throw new ApiError('User not found', general.dataNotFound)
    }
  }
}
