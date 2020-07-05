import { ACTIVE } from '../../constant/user.status';
import ApiError from '../../core/api.error';
import { auth, general } from '../../core/message.properties';

export default class GetChannelUsecase {
  constructor({ userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.repository.getUserByUsername(param.username);
    if (!user) {
      throw new ApiError('Data not found', general.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', auth.unAuthorized);
    }
    await this.repository.removeByUserId(user._id);
    const data = {
      userId: user._id
    }
    let ref = await this.repository.addUserRef(data);
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
