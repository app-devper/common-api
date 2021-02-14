import ApiError from "../../../presentation/ApiError";
import { general } from "../../../core/MessageProperties";

export default class GetNotificationUseCase {

  constructor({database, logger}) {
    this.notificationDao = database.notificationDao();
    this.logger = logger;
  }

  async execute(param) {
    let data = await this.notificationDao.getNotificationById(param.id);
    if (data) {
      return data
    } else {
      throw new ApiError('Notification not found', general.dataNotFound)
    }
  }

}
