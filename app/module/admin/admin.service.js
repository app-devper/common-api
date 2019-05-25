import logger from '../../log/logger'
import * as appUtils from '../../utils/app-utils'
import { resMessage } from '../../common/message.properties'
import * as usersMongoose from '../users/users.mongoose';

export const unlockUser = async (req, callback) => {
  try {
    let user = await usersMongoose.getUserByUsername(req, req.params.username);
    if (user) {
      let reqParam = {
        _id: user._id,
        countLoginFailed: 0,
        timeToUnlock: new Date()
      };
      await usersMongoose.updateLoginStatus(req, reqParam);
      callback(appUtils.genResponse(req.language, resMessage.general.success, 'Unlock user success'))
    } else {
      logger.info('User not found');
      callback(appUtils.genResponse(req.language, resMessage.general.dataNotFound, 'User not found'))
    }
  } catch (err) {
    logger.error('service unlockUser Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.language, resMessage.general.error, err.message))
  }
};
