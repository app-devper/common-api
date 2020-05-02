import _ from 'lodash'
import ApiError from "../../domain/core/api.error";
import { general } from "../../domain/core/message.properties";
import mongoose from "mongoose";
import { USER } from "../../domain/constant/user.role";
import { ACTIVE } from "../../domain/constant/user.status";

export default class UserMapper {
  constructor(logger) {
    this.logger = logger
  }

  getUserId(id) {
    if (_.isEmpty(id)) {
      throw new ApiError('Invalid id', general.invalidData)
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    return { id }
  }

  getUserBody(body, id) {
    if (_.isEmpty(body.firstName)) {
      throw new ApiError('Invalid firstName', general.invalidData)
    }
    if (_.isEmpty(body.lastName)) {
      throw new ApiError('Invalid lastName', general.invalidData)
    }
    if (_.isEmpty(body.phone)) {
      throw new ApiError('Invalid phone', general.invalidData)
    }
    if (_.isEmpty(body.email)) {
      throw new ApiError('Invalid email', general.invalidData)
    }
    if (_.isEmpty(body.gender)) {
      throw new ApiError('Invalid gender', general.invalidData)
    }
    let user = {}
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.phone = body.phone
    user.email = body.email
    user.gender = body.gender
    user.updatedDate = new Date()
    user.updatedBy = id
    return { user }
  }

  addUserBody(body, id) {
    if (_.isEmpty(body.username)) {
      throw new ApiError('Invalid username', general.invalidData)
    }
    if (_.isEmpty(body.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    if (_.isEmpty(body.phone)) {
      throw new ApiError('Invalid phone', general.invalidData)
    }
    if (_.isEmpty(body.email)) {
      throw new ApiError('Invalid email', general.invalidData)
    }
    let user = {}
    user.username = body.username.toLowerCase()
    user.password = body.password
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.phone = body.phone
    user.email = body.email
    user.gender = body.gender
    user.role = USER
    user.status = ACTIVE
    user.createdDate = new Date()
    user.createdBy = id
    return { user }
  }

  getPaging(query) {
    const page = parseInt(query['page'], 10) || 1;
    const limit = parseInt(query['limit'], 10) || 10;
    return { page, limit }
  }
}
