import _ from 'lodash'
import ApiError from "../../domain/core/api.error";
import { general } from "../../domain/core/message.properties";

export default class NotificationMapper {
  constructor() {
  }

  getDevice(body, id) {
    if (_.isEmpty(id)) {
      throw new ApiError('Invalid userId', general.invalidData)
    }
    if (_.isEmpty(body.deviceToken)) {
      throw new ApiError('Invalid deviceToken', general.invalidData)
    }
    if (_.isEmpty(body.channel)) {
      throw new ApiError('Invalid channel', general.invalidData)
    }
    return { userId: id, channel: body.channel, deviceToken: body.deviceToken }
  }

}
