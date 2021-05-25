import _ from 'lodash'
import ApiError from "../../ApiError";
import { general } from "../../core/error/MessageProperties";
import mongoose from "mongoose";

export default class RestaurantMapper {
  constructor(logger) {
    this.logger = logger
  }

  getRestaurantId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    return {id}
  }

  getRestaurantBody(body) {
    if (_.isEmpty(body.restaurantName)) {
      throw new ApiError('Invalid restaurantName', general.invalidData)
    }
    if (_.isEmpty(body.location)) {
      throw new ApiError('Invalid location', general.invalidData)
    }
    if (_.isEmpty(body.officialPhone)) {
      throw new ApiError('Invalid officialPhone', general.invalidData)
    }
    if (_.isEmpty(body.rate)) {
      throw new ApiError('Invalid rate', general.invalidData)
    }
    if (_.isEmpty(body.priceRate)) {
      throw new ApiError('Invalid priceRate', general.invalidData)
    }
    let data = {}
    data.restaurantName = body.restaurantName
    data.logo = body.logo
    data.logoPath = body.logoPath
    data.address = body.address
    data.city = body.city
    data.state = body.state
    data.postcode = body.postcode
    data.officialPhone = body.officialPhone
    data.phoneNumber = body.phoneNumber
    data.rate = body.rate
    data.priceRate = body.priceRate
    return data
  }

  loginBody(body) {
    if (_.isEmpty(body.email)) {
      throw new ApiError('Invalid email', general.invalidData)
    }
    if (_.isEmpty(body.password)) {
      throw new ApiError('Invalid password', general.invalidData)
    }
    let data = {}
    data.email = body.email
    data.password = body.password
    return data
  }

  getPaging(query) {
    const page = parseInt(query['page'], 10) || 1;
    const limit = parseInt(query['limit'], 10) || 10;
    return {page, limit}
  }
}
