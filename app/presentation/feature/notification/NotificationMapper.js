import _ from 'lodash'
import ApiError from "../../ApiError";
import { general } from "../../core/error/MessageProperties";
import mongoose from "mongoose";

export default class NotificationMapper {
  constructor() {
  }

  getDevice(body, userId) {
    if (_.isEmpty(userId)) {
      throw new ApiError('Invalid userId', general.invalidData)
    }
    if (_.isEmpty(body.deviceToken)) {
      throw new ApiError('Invalid deviceToken', general.invalidData)
    }
    if (_.isEmpty(body.channel)) {
      throw new ApiError('Invalid channel', general.invalidData)
    }
    return {userId: userId, channel: body.channel, deviceToken: body.deviceToken}
  }

  getPaging(query, userId) {
    const page = parseInt(query['page'], 10) || 1;
    const limit = parseInt(query['limit'], 10) || 10;
    return {userId: userId, page, limit}
  }

  getNotification(body) {
    if (!mongoose.Types.ObjectId.isValid(body.receiver)) {
      throw new ApiError('Invalid receiver format', general.invalidData)
    }
    if (_.isEmpty(body.title)) {
      throw new ApiError('Invalid title', general.invalidData)
    }
    if (_.isEmpty(body.body)) {
      throw new ApiError('Invalid body', general.invalidData)
    }
    let notification = {}
    notification.receiver = body.receiver
    notification.title = body.title
    notification.body = body.body
    notification.action = body.action
    return notification
  }

  getNotificationId(params, userId) {
    if (_.isEmpty(userId)) {
      throw new ApiError('Invalid userId', general.invalidData)
    }
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      throw new ApiError('Invalid id format', general.invalidData)
    }
    if (_.isEmpty(params.id)) {
      throw new ApiError('Invalid id', general.invalidData)
    }
    let param = {}
    param.id = params.id
    param.userId = userId
    return param
  }

}
