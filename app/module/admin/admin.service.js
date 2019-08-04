import logger from '../../logger/logger'
import { resMessage } from '../../common/message.properties'
import * as usersMongoose from '../user/user.mongoose';
import { genResponse } from '../../util/utils';

export const unlockUser = async (req) => {
  try {
    const user = await usersMongoose.getUserByUsername(req, req.params.username);
    if (user) {
      const reqParam = {
        _id: user._id,
        countLoginFailed: 0,
        timeToUnlock: new Date()
      };
      await usersMongoose.updateLoginStatus(req, reqParam);
      return genResponse(req.language, resMessage.general.success, 'Unlock user success')
    } else {
      logger.info('User not found');
      return genResponse(req.language, resMessage.general.dataNotFound, 'User not found')
    }
  } catch (err) {
    logger.error('service unlockUser Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
