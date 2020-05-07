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
      this.logger.error('Ref not found');
      throw new ApiError('Ref not found', general.dataNotFound)
    }
    if (!ref.active) {
      this.logger.error('Ref is not active');
      throw new ApiError('Ref is not active', authentication.unAuthorized);
    }
    let user = await this.repository.getUserById(ref.userId);
    if (!user) {
      this.logger.error('User not found');
      throw new ApiError('User not found', general.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      this.logger.error('Unauthorized');
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
