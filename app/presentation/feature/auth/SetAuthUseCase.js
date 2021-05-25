import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';

export default class SetAuthUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.userDao = database.userDao();
    this.referenceDao = database.referenceDao();
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.referenceDao.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref not found', auth.dataNotFound)
    }
    if (!ref.active) {
      throw new ApiError('Ref is not active', auth.unAuthorized);
    }
    let user = await this.userDao.getUserById(ref.userId);
    if (!user) {
      throw new ApiError('User not found', auth.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', auth.unAuthorized);
    }

    const data = {}
    if (param.flow === "password") {
      data.password = param.password
      data.countLoginFailed = 0
    } else if (param.flow === "pin") {
      data.pin = param.pin
      data.countPinFailed = 0
    }
    data.updatedBy = user._id
    data.updatedDate = new Date()
    user = await this.userDao.updateUser(user._id, data);
    await this.referenceDao.removeByUserId(user._id);
    delete user.password
    delete user.pin
    return user
  }
}
