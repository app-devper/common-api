import _ from 'lodash'
import ApiError from "../../../ApiError";

export default class OtpMapper {
  constructor() {
  }

  getChannel(param) {
    if (_.isEmpty(param.username)) {
      throw new ApiError('Invalid username', auth.invalidData)
    }
    return { username: param.username }
  }

  verifyUser(param) {
    if (_.isEmpty(param.userRefId)) {
      throw new ApiError('Invalid userRefId', auth.invalidData)
    }
    if (_.isEmpty(param.channel)) {
      throw new ApiError('Invalid channel', auth.invalidData)
    }
    return { userRefId: param.userRefId, channel: param.channel }
  }

  verifyCode(param) {
    if (_.isEmpty(param.userRefId)) {
      throw new ApiError('Invalid userRefId', auth.invalidData)
    }
    if (_.isEmpty(param.refCode)) {
      throw new ApiError('Invalid refCode', auth.invalidData)
    }
    if (_.isEmpty(param.code)) {
      throw new ApiError('Invalid code', auth.invalidData)
    }
    return { userRefId: param.userRefId, refCode: param.refCode, code: param.code }
  }

  getCode(param) {
    return { refCode: param.refCode }
  }

}
