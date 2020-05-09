import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';
import jwt from 'jsonwebtoken';

export default class LoginPinUsecase {
  constructor({ userRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserByUsername(param.username);
    if (!user) {
      throw new ApiError('Incorrect username', authentication.incorrectUserPass)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', authentication.unAuthorized);
    }
    const isPass = param.pin === user.pin
    if (!isPass) {
      user = await this.repository.updateUser(user._id, { countLoginFailed: user.countLoginFailed + 1 });
    }
    if (user.countLoginFailed >= this.config.userLoginAttempt) {
      throw new ApiError('Max invalid attempts', authentication.tooManyInvalidPass)
    }
    if (isPass) {
      try {
        user = await this.repository.updateUser(user._id, { countLoginFailed: 0 });
        delete user.password;
        const accessToken = await jwt.sign({ data: user }, this.config.secret, { expiresIn: this.config.accessTokenTime });
        return { accessToken }
      } catch (err) {
        this.logger.error(err.message);
        throw new ApiError(err.message, general.error)
      }
    } else {
      throw new ApiError('Incorrect pin', authentication.incorrectUserPass)
    }
  }
}
