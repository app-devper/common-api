import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';
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
      this.logger.error('Ref not found');
      throw new ApiError('Ref not found', general.dataNotFound)
    }
    if (ref.active) {
      this.logger.error('Ref is active');
      throw new ApiError('Ref is active', authentication.activeCode);
    }
    if (ref.refCode !== param.refCode) {
      this.logger.error('Invalid ref code');
      throw new ApiError('Invalid ref code', general.invalidData)
    }
    const isPass = ref.code === param.code
    if (!isPass) {
      ref = await this.repository.updateUserRef(ref._id, { countFailed: ref.countFailed + 1 });
    }
    if (ref.countFailed >= this.config.userCodeAttempt) {
      this.logger.error('Max invalid code');
      throw new ApiError('Max invalid code', authentication.tooManyInvalidCode)
    }
    if (ref.expiredDate.getTime() < new Date().getTime()) {
      this.logger.error('Code expired');
      throw new ApiError('Code expired', authentication.codeExpired)
    }
    if (isPass) {
      try {
        ref = await this.repository.updateUserRef(ref._id, { active: true });
        const actionToken = await jwt.sign({ data: ref._id }, this.config.secret, { expiresIn: this.config.actionTokenTime });
        return { actionToken }
      } catch (err) {
        this.logger.error(err.message);
        throw new ApiError(err.message, general.error)
      }
    } else {
      this.logger.error('Incorrect code');
      throw new ApiError('Incorrect code', authentication.incorrectCode)
    }
  }
}
