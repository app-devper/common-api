import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';
import jwt from 'jsonwebtoken';

export default class LoginUseCase {
  constructor ({ userRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute (param) {
    const user = await this.repository.getUserByUsername(param.username);
    if (user && param.password === user.password) {
      if (user.status === ACTIVE) {
        delete user.password;
        try {
          const accessToken = await jwt.sign({ data: user }, this.config.secret, { expiresIn: '1h' });
          return { user, accessToken }
        } catch (err) {
          this.logger.error(err.message);
          throw new ApiError(err.message, general.error)
        }
      } else {
        this.logger.error('Unauthorized');
        throw new ApiError('Unauthorized', authentication.unAuthorized);
      }
    } else {
      this.logger.error('Incorrect username or password');
      throw new ApiError('Incorrect username or password', authentication.incorrectUserPass)
    }
  }
}
