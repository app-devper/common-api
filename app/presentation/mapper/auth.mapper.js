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
