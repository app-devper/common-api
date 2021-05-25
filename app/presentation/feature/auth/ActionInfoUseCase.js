import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';
import { auth } from '../../core/error/MessageProperties';

export default class ActionInfoUseCase {
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
    delete user.password
    delete user.pin
    return user
  }
}
