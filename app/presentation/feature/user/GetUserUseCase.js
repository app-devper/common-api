import ApiError from '../../ApiError';
import { general } from '../../core/error/MessageProperties';

export default class GetUserUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.userDao.getUserById(param.id);
    if (user) {
      return user
    } else {
      throw new ApiError('User not found', general.dataNotFound)
    }
  }
}
