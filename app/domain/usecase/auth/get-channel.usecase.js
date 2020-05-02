import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { authentication, general } from '../../core/message.properties';

export default class GetChannelUsecase {
  constructor({ userRepository, userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRepository;
    this.userRefRepository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserByUsername(param.username);
    if (!user) {
      this.logger.error('Data not found');
      throw new ApiError('Data not found', general.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      this.logger.error('Unauthorized');
      throw new ApiError('Unauthorized', authentication.unAuthorized);
    }
    await this.userRefRepository.removeByUserId(user._id);
    const data = {
      userId: user._id
    }
    let ref = await this.userRefRepository.addUserRef(data);
    const result = {}
    result.channels = []
    if (user.email) {
      result.channels.push({ channel: "EMAIL", value: user.email })
    }
    if (user.phone) {
      result.channels.push({ channel: "MOBILE", value: user.phone })
    }
    result.userRefId = ref._id
    return result
  }
}
