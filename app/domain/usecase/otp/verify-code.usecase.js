import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';
import jwt from "jsonwebtoken";

export default class VerifyCodeUsecase {
  constructor({ userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.repository.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref code not found', general.dataNotFound)
    }
    if (ref.active) {
      throw new ApiError('Ref code is active', auth.activeCode);
    }
    if (ref.refCode !== param.refCode) {
      throw new ApiError('Invalid ref code', general.invalidData)
    }
    const isPass = ref.code === param.code
    if (!isPass) {
      ref = await this.repository.updateUserRef(ref._id, { countFailed: ref.countFailed + 1 });
    }
    if (ref.countFailed >= this.config.userCodeAttempt) {
      throw new ApiError('Max invalid code', auth.maxInvalidCode)
    }
    if (ref.expiredDate.getTime() < new Date().getTime()) {
      throw new ApiError('Code expired', auth.codeExpired)
    }
    if (isPass) {
      try {
        ref = await this.repository.updateUserRef(ref._id, { active: true });
        const actionToken = await jwt.sign({ data: ref._id }, this.config.secret, { expiresIn: this.config.actionTokenTime });
        return { actionToken }
      } catch (err) {
        throw new ApiError(err.message, general.error)
      }
    } else {
      throw new ApiError('Incorrect code', auth.invalidCode)
    }
  }
}
