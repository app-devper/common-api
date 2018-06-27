import logger from '../../utils/logger'; // 	Load logger
import UsersSchema from './user.model';

export const addUser = (req, user, callback) => {
  try {
    let usersData = new UsersSchema(user);
    usersData.save((err, user) => {
      if (err) {
        logger.warn('Users.add Failed!' + err);
        callback(err);
      } else {
        callback(null, user);
      }
    });
  } catch (err) {
    logger.error('user.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const getUserById = (req, _id, callback) => {
  try {
    UsersSchema.findById(_id, '-password -__v')
      .exec(function (err, user) {
        if (err) {
          logger.warn('Users.find Failed!' + err);
          callback(err);
        } else {
          callback(null, user);
        }
      });
  } catch (err) {
    logger.error('user.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const getUser = (req, callback) => {
  try {
    UsersSchema.find({}, '-password -__v')
      .exec(function (err, users) {
        if (err) {
          logger.warn('Users.find Failed!' + err);
          callback(err);
        } else {
          callback(null, users);
        }
      });
  } catch (err) {
    logger.error('user.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const updateLoginStatus = (req, reqParam, callback) => {
  try {
    logger.info('mongoose updateLoginStatus');
    UsersSchema.update({_id: reqParam._id}, {
      $set: {
        "countLoginFailed": reqParam.countLoginFailed,
        "timeToUnlock": reqParam.timeToUnlock,
        "updatedDate": new Date()
      }
    }).exec(function (err) {
      if (err) {
        logger.error('updateLoginStatus Failed!! >> ' + err);
        callback(err)
      } else {
        logger.info('updateLoginStatus Success');
        callback(null)
      }
    })
  } catch (err) {
    logger.error('updateLoginStatus.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};

export const unlockLoginStatus = (req, username, callback) => {
  try {
    logger.info('mongoose unlockLoginStatus');
    UsersSchema.update({username: username}, {
      $set: {
        countLoginFailed: 0,
        timeToUnlock: null,
        updatedDate: new Date()
      }
    }).exec(function (err) {
      if (err) {
        logger.error('unlockLoginStatus Failed!! >> ' + err);
        callback(err)
      } else {
        logger.info('unlockLoginStatus Success');
        callback(null)
      }
    })
  } catch (err) {
    logger.error('unlockLoginStatus.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};

export const getUserByUsername = (req, username, callback) => {
  try {
    logger.info('mongoose getUserByUsername');
    logger.info('username : ' + username);
    UsersSchema.findOne({username: username.toLowerCase(), status: 'ACTIVE'})
      .exec(function (err, user) {
        if (err) {
          logger.error('getUserByUsername  Failed!' + err);
          callback(err);
        } else {
          callback(null, user);
        }
      });
  } catch (err) {
    logger.error('getUserByUsername.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};

export const getUserByCriteria = (req, criteria, callback) => {
  try {
    logger.info('mongoose getUserByCriteria');
    UsersSchema.findOne(criteria, '-password -__v')
      .exec(function (err, results) {
        if (err) {
          logger.error('getUserByCriteria  Failed!' + err);
          callback(err);
        } else {
          callback(null, results);
        }
      });
  } catch (err) {
    logger.error('getUserByCriteria.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};
