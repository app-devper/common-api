import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class LogoutUsecase {
  constructor({ userRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserById(param.id);
    if (!user) {
      throw new ApiError('User not found', general.dataNotFound)
    }
    delete user.password
    return user
  }
}
