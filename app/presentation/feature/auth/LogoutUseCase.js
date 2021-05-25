import ApiError from '../../ApiError';
import { auth } from '../../core/error/MessageProperties';

export default class LogoutUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.userDao.getUserById(param.id);
    if (!user) {
      throw new ApiError('User not found', auth.dataNotFound)
    }
    delete user.password
    delete user.pin
    return user
  }
}
