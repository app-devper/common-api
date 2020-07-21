import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';

export default class GetInfoUseCase {
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
    delete user.password
    delete user.pin
    return user
  }
}
