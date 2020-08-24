import _ from 'lodash'
import ApiError from "../../domain/core/api.error";
import { general } from "../../domain/core/message.properties";
import mongoose from "mongoose";
import { USER } from "../../domain/constant/user.role";
import { ACTIVE } from "../../domain/constant/user.status";

export default class TermConditionMapper {
  constructor(logger) {
    this.logger = logger
  }

  getTermConditionId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    return {id}
  }

  updateTermCondition(id, body) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    if (_.isEmpty(body.content)) {
      throw new ApiError('Invalid content', general.invalidData)
    }
    if (_.isEmpty(body.version)) {
      throw new ApiError('Invalid version', general.invalidData)
    }
    let data = {}
    data.content = body.content
    data.version = body.version
    return {id, data}
  }

  addTermCondition(body) {
    if (_.isEmpty(body.content)) {
      throw new ApiError('Invalid content', general.invalidData)
    }
    if (_.isEmpty(body.version)) {
      throw new ApiError('Invalid version', general.invalidData)
    }
    let data = {}
    data.content = body.content
    data.version = body.version
    return {data}
  }

}
