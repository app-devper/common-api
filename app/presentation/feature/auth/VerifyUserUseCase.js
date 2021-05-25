import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';
import randomize from 'randomatic'

export default class VerifyUserUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.referenceDao = database.referenceDao();
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.referenceDao.getUserRefById(param.userRefId);
    if (!ref) {
      throw new ApiError('Ref not found', auth.dataNotFound)
    }
    if (ref.active) {
      throw new ApiError('Ref is active', auth.activeCode);
    }
    if (ref.countRequest >= 3) {
      throw new ApiError('Ref max request ', auth.maxRequestRefCode);
    }
    let user = await this.userDao.getUserById(ref.userId);
    if (!user) {
      throw new ApiError('User not found', auth.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', auth.unAuthorized);
    }
    const data = {}
    const refCode = randomize('A', 4)
    const code = randomize('0', 6)
    data.refCode = refCode
    data.code = code
    data.channel = param.channel
    const date = new Date()
    data.expiredDate = new Date(date.getTime() + this.config.codeExpireIn * 60000)
    data.countFailed = 0
    data.countRequest = ref.countRequest + 1
    const result = await this.referenceDao.updateUserRef(ref._id, data);
    if (result.channel === "EMAIL") {
      if (user.email) {
        this.logger.info('Send e-mail');
      }
    } else {
      if (user.phone) {
        this.logger.info('Send SMS');
      }
    }
    data.userRefId = ref._id
    delete data.code
    delete data.countFailed
    return data
  }
}
