import _ from 'lodash'
import ApiError from "../../ApiError";
import { general } from "../../core/error/MessageProperties";
import mongoose from "mongoose";
import { USER } from "../../../core/constant/Role";
import { ACTIVE } from "../../../core/constant/Status";

export default class UserMapper {
  constructor(logger) {
    this.logger = logger
  }

  getUserId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    return { id }
  }

  removeUserId(removeId, userId) {
    if (!mongoose.Types.ObjectId.isValid(removeId)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    if (removeId === userId) {
      throw new ApiError('Can not remove current user', general.invalidData)
    }
    return { id: removeId }
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
