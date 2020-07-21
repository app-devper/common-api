import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';
import jwt from 'jsonwebtoken';

export default class KeepAliveUseCase {
  constructor({userRepository, logger, config}) {
    this.config = config;
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserByUsername(param.username);
    if (!user) {
      throw new ApiError('Invalid username', auth.invalidData)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', auth.unAuthorized);
    }
    try {
      delete user.password;
      delete user.pin;
      const accessToken = await jwt.sign({data: user}, this.config.secret, {expiresIn: this.config.accessTokenTime});
      return {accessToken}
    } catch (err) {
      throw new ApiError(err.message, general.error)
    }
  }
}
