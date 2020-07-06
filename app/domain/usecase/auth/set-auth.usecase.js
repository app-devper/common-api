import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';

export default class SetAuthUseCase {
  constructor({userRepository, userRefRepository, logger, config}) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.userRefRepository.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref not found', general.dataNotFound)
    }
    if (!ref.active) {
      throw new ApiError('Ref is not active', auth.unAuthorized);
    }
    let user = await this.repository.getUserById(ref.userId);
    if (!user) {
      throw new ApiError('User not found', general.dataNotFound)
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
    user = await this.repository.updateUser(user._id, data);
    await this.userRefRepository.removeByUserId(user._id);
    delete user.password
    delete user.pin
    return user
  }
}
