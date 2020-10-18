import _ from 'lodash'
import ApiError from "../ApiError";
import { general } from "../../core/MessageProperties";

export default class OtpMapper {
  constructor() {
  }

  getChannel(param) {
    if (_.isEmpty(param.username)) {
      throw new ApiError('Invalid username', general.invalidData)
    }
    return { username: param.username }
  }

  verifyUser(param) {
    if (_.isEmpty(param.userRefId)) {
      throw new ApiError('Invalid userRefId', general.invalidData)
    }
    if (_.isEmpty(param.channel)) {
      throw new ApiError('Invalid channel', general.invalidData)
    }
    return { userRefId: param.userRefId, channel: param.channel }
  }

  verifyCode(param) {
    if (_.isEmpty(param.userRefId)) {
      throw new ApiError('Invalid userRefId', general.invalidData)
    }
    if (_.isEmpty(param.refCode)) {
      throw new ApiError('Invalid refCode', general.invalidData)
    }
    if (_.isEmpty(param.code)) {
      throw new ApiError('Invalid code', general.invalidData)
    }
    return { userRefId: param.userRefId, refCode: param.refCode, code: param.code }
  }

  getCode(param) {
    return { refCode: param.refCode }
  }

}
