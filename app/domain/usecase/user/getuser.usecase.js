import mongoose from 'mongoose';
import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class GetUserUseCase {
  constructor ({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute (param) {
    if (mongoose.Types.ObjectId.isValid(param.id)) {
      const user = await this.repository.getUserById(param.id);
      if (user) {
        return user
      } else {
        this.logger.error('User not found');
        throw new ApiError('User not found', general.dataNotFound)
      }
    } else {
      this.logger.error('Invalid id format');
      throw new ApiError('Invalid id format', general.invalidData)
    }
  }
}
