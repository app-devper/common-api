import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class RegisterUseCase {
  constructor({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.repository.getUserByUsername(param.user.username);
    if (user) {
      throw new ApiError('User duplicate', general.duplicateData)
    } else {
      return await this.repository.addUser(param.user)
    }
  }
}
