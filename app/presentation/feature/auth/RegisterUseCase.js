import ApiError from '../../ApiError';
import { auth } from '../../core/error/MessageProperties';

export default class RegisterUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.userDao.getUserByUsername(param.user.username);
    if (user) {
      throw new ApiError('User duplicate', auth.duplicateData)
    } else {
      return await this.userDao.addUser(param.user)
    }
  }
}
