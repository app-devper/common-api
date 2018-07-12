import logger from '../../utils/logger'; // 	Load logger
import AuthenticationSchema from './authentication.model'

export const addAuthentication = (req, data, callback) => {
  try {
    let authenticationSchema = new AuthenticationSchema(data);
    authenticationSchema.save((err) => {
      if (err) {
        logger.error('addAuthentication Failed!' + err);
        callback(err);
      } else {
        logger.info('addAuthentication Success!');
        callback(null);
      }
    });
  } catch (err) {
    logger.error('addAuthentication Unhandled Exception: ', err);
    callback(err);
  }
};

export const findDuplicateLogin = (req, _id, channel, callback) => {
  try {
    AuthenticationSchema.findOne({userId: _id, valid: true, channel: channel}, (err, authen) => {
      if (err) {
        logger.error('findDuplicateLogin Failed!' + err);
        callback(err);
      } else {
        logger.info('findDuplicateLogin Success!');
        callback(null, authen);
      }
    });
  } catch (err) {
    logger.error('findDuplicateLogin Unhandled Exception: ', err);
    callback(err);
  }
};

export const updateLogin = (req, _id, callback) => {
  try {
    AuthenticationSchema.findOne({_id: _id, valid: true}, (err, authen) => {
      if (err) {
        logger.warn('updateLogin Failed!' + err);
        callback(err);
      } else {
        authen.accessTime = Date.now();
        authen.save((err) => {
          if (err) {
            logger.error('updateLogin Failed!' + err);
            callback(err);
          } else {
            logger.info('updateLogin Success!');
            callback(null, authen);
          }
        });
      }
    });
  } catch (err) {
    logger.error('updateLogin  Unhandled Exception: ', err);
    callback(err);
  }
};

export const removeAuthentication = (req, userId, callback) => {
  try {
    AuthenticationSchema.remove({userId: userId}, (err, authen) => {
      if (err) {
        logger.error('removeAuthentication Failed!' + err);
        callback(err)
      } else {
        logger.info('removeAuthentication success!');
        callback(null)
      }
    });
  } catch (err) {
    logger.error('removeAuthentication  Unhandled Exception: ', err);
    callback(err);
  }
};

export const getAuthentication = (req, accessToken, callback) => {
  try {
    logger.info('accessToken :' + accessToken);
    AuthenticationSchema.findOne({token: accessToken, valid: true})
      .populate('userId')
      .exec((err, authen) => {
        if (err) {
          logger.error('getAuthentication Failed!' + err);
          callback(err);
        } else {
          logger.info('getAuthentication success!');
          callback(null, authen);
        }
      });
  } catch (err) {
    logger.error('getAuthentication Unhandled Exception: ', err);
    callback(err);
  }
};

