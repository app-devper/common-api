import _ from 'lodash'
import ApiError from "../ApiError";
import { general } from "../../core/MessageProperties";
import mongoose from "mongoose";

export default class MenuMapper {
  constructor(logger) {
    this.logger = logger
  }

  getMenuId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    return {id}
  }

  getMenuBody(body) {
    if (_.isEmpty(body.name)) {
      throw new ApiError('Invalid name', general.invalidData)
    }
    if (_.isEmpty(body.description)) {
      throw new ApiError('Invalid description', general.invalidData)
    }
    if (_.isEmpty(body.percentTax)) {
      throw new ApiError('Invalid percentTax', general.invalidData)
    }
    if (_.isEmpty(body.price)) {
      throw new ApiError('Invalid price', general.invalidData)
    }
    if (_.isEmpty(body.cookingTime)) {
      throw new ApiError('Invalid cookingTime', general.invalidData)
    }
    if (_.isEmpty(body.taxType)) {
      throw new ApiError('Invalid taxType', general.invalidData)
    }
    let data = {}
    data.name = body.name
    data.description = body.description
    data.percentTax = body.percentTax
    data.price = body.price
    data.imageM = body.imageM
    data.imageMPath = body.imageMPath
    data.imageL = body.imageL
    data.imageLPath = body.imageLPath
    data.cookingTime = body.cookingTime
    data.taxType = body.taxType
    return data
  }

}
