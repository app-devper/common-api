import logger from '../../logger/logger'
import { genResponse, isBlank } from '../../util/utils'
import * as deviceMongoose from './device.mongoose'
import { resMessage } from '../../common/message.properties';

export const addDevice = async (req) => {
  try {
    let reqBody = req.body;
    if (!reqBody || isBlank(reqBody.deviceId)) {
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid Device id')
    } else {
      const result = await deviceMongoose.getDeviceById(reqBody.deviceId);
      if (result) {
        await deviceMongoose.updateDevice(result._id, reqBody);
        return genResponse(req.language, resMessage.general.success, 'Update Device success',
          { publicKey: "" })
      } else {
        await deviceMongoose.addDevice(req.body);
        return genResponse(req.language, resMessage.general.success, 'Add Device success',
          { publicKey: "" })
      }
    }
  } catch (err) {
    logger.error('service getDeviceById Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
