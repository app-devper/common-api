import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';
import jwt from 'jsonwebtoken';
import { auth } from '../../core/error/MessageProperties';

export default class VerifyPasswordUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.userDao = database.userDao();
    this.referenceDao = database.referenceDao();
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
    if (!user.password) {
      throw new ApiError('Empty password', auth.emptyPassword);
    }
    const isPass = param.password === user.password
    if (!isPass) {
      user = await this.userDao.updateUser(user._id, {countLoginFailed: user.countLoginFailed + 1});
    }
    if (user.countLoginFailed >= this.config.userLoginAttempt) {
      throw new ApiError('Max invalid attempts', auth.maxInvalidPassword)
    }
    if (!isPass) {
      throw new ApiError('Invalid password', auth.invalidData)
    } else {
      user = await this.userDao.updateUser(user._id, {countLoginFailed: 0});
      try {
        if (param.flow === "login") {
          delete user.password;
          delete user.pin;
          const accessToken = await jwt.sign({data: user}, this.config.secret, {expiresIn: this.config.accessTokenTime});
          return {accessToken}
        } else {
          const data = {
            userId: user._id,
            active: true,
            channel: "PASSWORD",
            refCode: user.username,
            code: user.password
          }
          await this.referenceDao.removeByUserId(data.userId);
          let ref = await this.referenceDao.addUserRef(data);
          const actionToken = await jwt.sign({data: ref._id}, this.config.secret, {expiresIn: this.config.actionTokenTime});
          return {actionToken}
        }
      } catch (err) {
        throw new ApiError(err.message, auth.internalError)
      }
    }
  }
}
