import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';
import jwt from 'jsonwebtoken';
import _ from 'lodash'

export default class VerifyPinUseCase {
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
    if (_.isEmpty(user.pin)) {
      throw new ApiError('Not set PIN', auth.emptyPin);
    }
    if (user.countLoginFailed >= this.config.userLoginAttempt) {
      throw new ApiError('Max invalid attempts', auth.maxInvalidPassword)
    }
    const isPass = param.pin === user.pin
    if (!isPass) {
      user = await this.userDao.updateUser(user._id, {countPinFailed: user.countPinFailed + 1});
    }
    if (user.countPinFailed >= this.config.userPinAttempt) {
      throw new ApiError('Max invalid attempts', auth.maxInvalidPin)
    }
    if (!isPass) {
      throw new ApiError('Invalid PIN', auth.invalidData)
    } else {
      user = await this.userDao.updateUser(user._id, {countPinFailed: 0});
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
            channel: "PIN",
            refCode: user.username,
            code: user.pin
          }
          await this.referenceDao.removeByUserId(data.userId);
          let ref = await this.referenceDao.addUserRef(data);
          const actionToken = await jwt.sign({data: ref._id}, this.config.secret, {expiresIn: this.config.actionTokenTime});
          return {actionToken}
        }
      } catch (err) {
        this.logger.error(err.message);
        throw new ApiError(err.message, auth.internalError)
      }

    }
  }
}
