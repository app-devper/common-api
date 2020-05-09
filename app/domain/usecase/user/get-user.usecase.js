import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class GetUserUsecase {
  constructor({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.repository.getUserById(param.id);
    if (user) {
      return user
    } else {
      throw new ApiError('User not found', general.dataNotFound)
    }
  }
}
