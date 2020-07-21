import _ from 'lodash'
import ApiError from "../../domain/core/api.error";
import { general } from "../../domain/core/message.properties";
import { USER } from "../../domain/constant/user.role";
import { ACTIVE } from "../../domain/constant/user.status";

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
    return {username: body.username, password: body.pwd, flow: "login"}
  }

  getPinBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', general.invalidData)
    }
    if (_.isEmpty(body.pin)) {
      throw new ApiError('Invalid pin', general.invalidData)
    }
    return {username: body.username, pin: body.pin, flow: "login"}
  }

  setPassword(param, userRefId) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    return {userRefId: userRefId, password: param.password, flow: "password"}
  }

  setPin(param, userRefId) {
    if (_.isEmpty(param.pin)) {
      throw new ApiError('Invalid pin', general.invalidData)
    }
    return {userRefId: userRefId, pin: param.pin, flow: "pin"}
  }

  verifyPassword(param, username) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    return {username, password: param.password}
  }

  verifyPin(param, username) {
    if (_.isEmpty(param.pin)) {
      throw new ApiError('Invalid pin', general.invalidData)
    }
    return {username, pin: param.pin}
  }

  registerBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', general.invalidData)
    }
    if (_.isEmpty(body.phone)) {
      throw new ApiError('Invalid phone', general.invalidData)
    }
    if (_.isEmpty(body.email)) {
      throw new ApiError('Invalid email', general.invalidData)
    }
    let user = {}
    user.username = body.username.toLowerCase()
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.phone = body.phone
    user.email = body.email
    user.role = USER
    user.status = ACTIVE
    user.createdDate = new Date()
    return { user }
  }

}
