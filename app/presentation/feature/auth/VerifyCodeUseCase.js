import ApiError from '../../ApiError';
import jwt from "jsonwebtoken";

export default class VerifyCodeUseCase {
  constructor({ database, logger, config }) {
    this.config = config;
    this.referenceDao = database.referenceDao();
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.referenceDao.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref code not found', auth.dataNotFound)
    }
    if (ref.active) {
      throw new ApiError('Ref code is active', auth.activeCode);
    }
    if (ref.refCode !== param.refCode) {
      throw new ApiError('Invalid ref code', auth.invalidData)
    }
    const isPass = ref.code === param.code
    if (!isPass) {
      ref = await this.referenceDao.updateUserRef(ref._id, { countFailed: ref.countFailed + 1 });
    }
    if (ref.countFailed >= this.config.userCodeAttempt) {
      throw new ApiError('Max invalid code', auth.maxInvalidCode)
    }
    if (ref.expiredDate.getTime() < new Date().getTime()) {
      throw new ApiError('Code expired', auth.codeExpired)
    }
    if (isPass) {
      try {
        ref = await this.referenceDao.updateUserRef(ref._id, { active: true });
        const actionToken = await jwt.sign({ data: ref._id }, this.config.secret, { expiresIn: this.config.actionTokenTime });
        return { actionToken }
      } catch (err) {
        throw new ApiError(err.message, auth.internalError)
      }
    } else {
      throw new ApiError('Incorrect code', auth.invalidCode)
    }
  }
}
