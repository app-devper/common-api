import { ACTIVE } from '../../../core/constant/Status';
import ApiError from '../../ApiError';
import { auth } from '../../core/error/MessageProperties';

export default class GetChannelUseCase {
  constructor({ database, logger, config }) {
    this.config = config;
    this.userDao = database.userDao();
    this.referenceDao = database.referenceDao();
    this.logger = logger;
  }

  async execute(param) {
    let user = await this.userDao.getUserByUsername(param.username);
    if (!user) {
      throw new ApiError('Data not found', auth.dataNotFound)
    }
    if (user.status !== ACTIVE) {
      throw new ApiError('Unauthorized', auth.unAuthorized);
    }
    await this.referenceDao.removeByUserId(user._id);
    const data = {
      userId: user._id
    }
    let ref = await this.referenceDao.addUserRef(data);
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
