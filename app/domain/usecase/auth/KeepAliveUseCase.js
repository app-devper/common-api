import { ACTIVE } from '../../constant/Status';
import ApiError from '../../../presentation/ApiError';
import { auth, general } from '../../../core/MessageProperties';
import jwt from 'jsonwebtoken';

export default class KeepAliveUseCase {
  constructor({database,logger, config}) {
    this.config = config;
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.userDao.getUserByUsername(param.username);
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
