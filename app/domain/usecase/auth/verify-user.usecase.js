import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';
import randomize from 'randomatic'

export default class VerifyUserUsecase {
  constructor({ userRepository, userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.userRefRepository.getUserRefById(param.userRefId);
    if (!ref) {
      this.logger.error('Ref not found');
      throw new ApiError('Ref not found', general.dataNotFound)
    }
    if (ref.active) {
      this.logger.error('Ref is active');
      throw new ApiError('Ref is active', authentication.activeCode);
    }
    let user = await this.repository.getUserById(ref.userId);
    if (!user) {
      this.logger.error('User not found');
      throw new ApiError('User not found', general.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      this.logger.error('Unauthorized');
      throw new ApiError('Unauthorized', authentication.unAuthorized);
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
    const result = await this.userRefRepository.updateUserRef(ref._id, data);
    if (result.channel === "EMAIL") {
      if (user.email) {
        this.logger.error('Send e-mail');
      }
    } else {
      if (user.phone) {
        this.logger.error('Send SMS');
      }
    }
    data.userRefId = ref._id
    delete data.code
    delete data.countFailed
    return data
  }
}
