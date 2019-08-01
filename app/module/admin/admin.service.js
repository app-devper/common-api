import logger from '../../log/logger'
import { resMessage } from '../../common/message.properties'
import * as usersMongoose from '../users/users.mongoose';
import { genResponse } from '../../utils/utils';

export const unlockUser = async (req, callback) => {
  try {
    const user = await usersMongoose.getUserByUsername(req, req.params.username);
    if (user) {
      const reqParam = {
        _id: user._id,
        countLoginFailed: 0,
        timeToUnlock: new Date()
      };
      await usersMongoose.updateLoginStatus(req, reqParam);
      callback(genResponse(req.language, resMessage.general.success, 'Unlock user success'))
    } else {
      logger.info('User not found');
      callback(genResponse(req.language, resMessage.general.dataNotFound, 'User not found'))
    }
  } catch (err) {
    logger.error('service unlockUser Unhandled Exception: ' + err);
    callback(genResponse(req.language, resMessage.general.error, err.message))
  }
};
