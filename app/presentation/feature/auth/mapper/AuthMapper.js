import _ from 'lodash'
import ApiError from "../../../ApiError";
import { USER } from "../../../../core/constant/Role";
import { ACTIVE } from "../../../../core/constant/Status";
import mongoose from "mongoose";

export default class AuthMapper {
  constructor() {
  }

  getUserId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', auth.invalidData)
    }
    return { id }
  }

  getBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', auth.invalidData)
    }
    if (_.isEmpty(body.pwd)) {
      throw new ApiError('Invalid pwd', auth.invalidData)
    }
    return {username: body.username, password: body.pwd, flow: "login"}
  }

  getPinBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', auth.invalidData)
    }
    if (_.isEmpty(body.pin)) {
      throw new ApiError('Invalid pin', auth.invalidData)
    }
    return {username: body.username, pin: body.pin, flow: "login"}
  }

  setPassword(param, userRefId) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', auth.invalidData)
    }
    return {userRefId: userRefId, password: param.password, flow: "password"}
  }

  setPin(param, userRefId) {
    if (_.isEmpty(param.pin)) {
      throw new ApiError('Invalid pin', auth.invalidData)
    }
    return {userRefId: userRefId, pin: param.pin, flow: "pin"}
  }

  verifyPassword(param, username) {
    if (_.isEmpty(param.password)) {
      throw new ApiError('Invalid password', auth.invalidData)
    }
    return {username, password: param.password}
  }

  verifyPin(param, username) {
    if (_.isEmpty(param.pin)) {
      throw new ApiError('Invalid pin', auth.invalidData)
    }
    return {username, pin: param.pin}
  }

  registerBody(body) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', auth.invalidData)
    }
    if (_.isEmpty(body.phone)) {
      throw new ApiError('Invalid phone', auth.invalidData)
    }
    if (_.isEmpty(body.email)) {
      throw new ApiError('Invalid email', auth.invalidData)
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
