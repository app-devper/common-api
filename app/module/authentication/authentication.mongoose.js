import logger from '../../utils/logger'; // 	Load logger
import AuthenticationSchema from './authentication.model'

export const addAuthentication = (req, data, callback) => {
  try {
    let authenticationSchema = new AuthenticationSchema(data);
    authenticationSchema.save((err) => {
      if (err) {
        logger.warn('addAuthentication Failed!' + err);
        callback(err);
      } else {
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
        logger.warn('findDuplicateLogin Failed!' + err);
        callback(err);
      } else {
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
            logger.warn('updateLogin Failed!' + err);
            callback(err);
          } else {
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

export const updateValid = (req, _id, callback) => {
  try {
    AuthenticationSchema.findOne({_id: _id, valid: true}, function (err, authen) {
      if (err) {
        logger.warn('updateValid Failed!' + err);
        callback(err)
      } else {
        if (authen) {
          authen.valid = false;
          authen.save((err) => {
            logger.info('err: ' + err || null);
            if (err) {
              logger.warn('updateValid Failed!' + err);
              callback(err)
            } else {
              callback(null)
            }
          })
        } else {
          callback(null)
        }
      }
    });
  } catch (err) {
    logger.error('updateValid Unhandled Exception: ', err);
    callback(err);
  }
};

export const removeAuthentication = (req, userId, callback) => {
  try {
    AuthenticationSchema.remove({userId: userId}, (err, authen) => {
      if (err) {
        logger.warn('removeAuthentication Failed!' + err);
        callback(err)
      } else {
        if (err) {
          logger.warn('removeAuthentication Failed!' + err);
          callback(err)
        } else {
          callback(null)
        }
      }
    });
  } catch (err) {
    logger.error('removeAuthentication  Unhandled Exception: ', err);
    callback(err);
  }
};

export const removeAllAuthentication = (req, username, callback) => {
  try {
    let setUpdate = {valid: false};
    AuthenticationSchema.update({username: username}, {$set: setUpdate}, {multi: true})
      .exec((err) => {
        if (err) {
          logger.warn('removeAllAuthentication Failed!' + err);
          callback(err);
        } else {
          logger.info('removeAllAuthentication Success!');
          callback(null);
        }
      })
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
          logger.warn('getAuthentication Failed!' + err);
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


export const getAuthenticationByDeviceToken = (req, _deviceToken, callback) => {
  try {
    AuthenticationSchema.findOne({deviceToken: _deviceToken})
      .populate('userId')
      .exec((err, authen) => {
        if (err) {
          logger.warn('getAuthenticationByDeviceToken Failed!' + err);
          callback(err);
        } else {
          callback(null, authen);
        }
      });
  } catch (err) {
    logger.error('getAuthenticationByDeviceToken  Unhandled Exception: ', err);
    callback(err);
  }
};
