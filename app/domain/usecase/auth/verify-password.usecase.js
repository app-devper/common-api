import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';
import jwt from 'jsonwebtoken';

export default class VerifyPasswordUsecase {
  constructor({ userRepository, userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserByUsername(param.username);
    if (!user) {
      this.logger.error('Incorrect username');
      throw new ApiError('Incorrect username or password', authentication.incorrectUserPass)
    }
    if (user.status !== ACTIVE) {
      this.logger.error('Unauthorized');
      throw new ApiError('Unauthorized', authentication.unAuthorized);
    }
    const isPass = param.password === user.password
    if (!isPass) {
      user = await this.repository.updateUser(user._id, { countLoginFailed: user.countLoginFailed + 1 });
    }
    if (user.countLoginFailed >= this.config.userLoginAttempt) {
      this.logger.error('Max invalid attempts');
      throw new ApiError('Max invalid attempts', authentication.tooManyInvalidPass)
    }
    if (isPass) {
      try {
        user = await this.repository.updateUser(user._id, { countLoginFailed: 0 });
        await this.userRefRepository.removeByUserId(user._id);
        const data = {
          userId: user._id,
          active: true,
          channel: "PASSWORD"
        }
        let ref = await this.userRefRepository.addUserRef(data);
        const actionToken = await jwt.sign({ data: ref._id }, this.config.secret, { expiresIn: this.config.actionTokenTime });
        return { actionToken }
      } catch (err) {
        this.logger.error(err.message);
        throw new ApiError(err.message, general.error)
      }
    } else {
      this.logger.error('Incorrect password');
      throw new ApiError('Incorrect username or password', authentication.incorrectUserPass)
    }
  }
}
