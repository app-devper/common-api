import ApiError from '../../ApiError';
import { general } from '../../core/error/MessageProperties';

export default class AddUserUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.userDao.getUserByUsername(param.user.username);
    if (user) {
      throw new ApiError('User duplicate', general.duplicateData)
    } else {
      return await this.userDao.addUser(param.user)
    }
  }
}
