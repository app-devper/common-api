import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';

export default class SetPinUsecase {
  constructor({ userRepository, userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.userRefRepository.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref code not found', general.dataNotFound)
    }
    if (!ref.active) {
      throw new ApiError('Ref code is not active', authentication.unAuthorized);
    }
    let user = await this.repository.getUserById(ref.userId);
    if (!user) {
      throw new ApiError('User not found', general.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', authentication.unAuthorized);
    }
    const data = {}
    data.pin = param.pin
    data.updatedBy = ref.userId
    data.updatedDate = new Date()
    user = await this.repository.updateUser(ref.userId, data);
    await this.userRefRepository.removeByUserId(ref.userId);
    delete user.password
    delete user.pin
    return user
  }
}
