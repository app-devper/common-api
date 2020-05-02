import _ from 'lodash'
import ApiError from "../../domain/core/api.error";
import { general } from "../../domain/core/message.properties";

export default class AuthMapper {
  constructor() {
  }

  getBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', general.invalidData)
    }
    if (_.isEmpty(body.pwd)) {
      throw new ApiError('Invalid pwd', general.invalidData)
    }
    return { username: body.username, password: body.pwd }
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

  setPassword(param, userRefId) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    return { userRefId: userRefId, password: param.password }
  }

  verifyPassword(param, username) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    return { username, password: param.password }
  }

}
