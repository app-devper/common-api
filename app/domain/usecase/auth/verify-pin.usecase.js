import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';
import jwt from 'jsonwebtoken';
import _ from 'lodash'

export default class VerifyPinUseCase {
  constructor({userRepository, userRefRepository, logger, config}) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
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
    if (_.isEmpty(user.pin)) {
      throw new ApiError('Not set PIN', auth.emptyPin);
    }
    const isPass = param.pin === user.pin
    if (!isPass) {
      user = await this.repository.updateUser(user._id, {countPinFailed: user.countPinFailed + 1});
    }
    if (user.countPinFailed >= this.config.userLoginAttempt) {
      throw new ApiError('Max invalid attempts', auth.maxInvalidPin)
    }
    if (!isPass) {
      throw new ApiError('Invalid PIN', auth.invalidData)
    } else {
      user = await this.repository.updateUser(user._id, {countPinFailed: 0});
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
          await this.userRefRepository.removeByUserId(data.userId);
          let ref = await this.userRefRepository.addUserRef(data);
          const actionToken = await jwt.sign({data: ref._id}, this.config.secret, {expiresIn: this.config.actionTokenTime});
          return {actionToken}
        }
      } catch (err) {
        this.logger.error(err.message);
        throw new ApiError(err.message, general.error)
      }

    }
  }
}
