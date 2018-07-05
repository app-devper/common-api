import logger from '../../utils/logger'; // 	Load logger
import UsersSchema from './user.model';

export const addUser = (req, user, callback) => {
  try {
    let usersData = new UsersSchema(user);
    usersData.save((err, user) => {
      if (err) {
        logger.warn('addUser Failed!' + err);
        callback(err);
      } else {
        logger.info('addUser Success');
        callback(null, user);
      }
    });
  } catch (err) {
    logger.error('addUser.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const updateUser = (req, userId, user, callback) => {
  try {
    logger.info('mongoose updateUser');
    UsersSchema.findByIdAndUpdate({ _id: userId }, {
      $set: user
    }).exec(function (err, user) {
      if (err) {
        logger.error('updateUser Failed!! >> ' + err);
        callback(err)
      } else {
        logger.info('updateUser Success');
        callback(null, user)
      }
    })
  } catch (err) {
    logger.error('updateUser.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};

export const getUserById = (req, _id, callback) => {
  try {
    UsersSchema.findById(_id, '-password -__v')
      .exec(function (err, user) {
        if (err) {
          logger.warn('getUserById Failed!' + err);
          callback(err);
        } else {
          logger.info('getUserById Success');
          callback(null, user);
        }
      });
  } catch (err) {
    logger.error('getUserById.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const removeUser = (req, userId, callback) => {
  try {
    UsersSchema.remove({ _id: userId })
      .exec(function (err, user) {
        if (err) {
          logger.warn('removeUser Failed!' + err);
          callback(err);
        } else {
          logger.info('removeUser Success');
          callback(null, user);
        }
      });
  } catch (err) {
    logger.error('removeUser.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const getUser = (req, callback) => {
  try {
    UsersSchema.find({}, '-password -__v')
      .exec(function (err, users) {
        if (err) {
          logger.warn('getUser Failed!' + err);
          callback(err);
        } else {
          logger.info('getUser Success');
          callback(null, users);
        }
      });
  } catch (err) {
    logger.error('getUser.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

export const updateLoginStatus = (req, param, callback) => {
  try {
    logger.info('mongoose updateLoginStatus');
    UsersSchema.update({ _id: param._id }, {
      $set: {
        countLoginFailed: param.countLoginFailed,
        timeToUnlock: param.timeToUnlock,
        updatedDate: new Date()
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
    UsersSchema.update({ username: username }, {
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
    UsersSchema.findOne({ username: username.toLowerCase() })
      .exec(function (err, user) {
        if (err) {
          logger.error('getUserByUsername  Failed!' + err);
          callback(err);
        } else {
          logger.info('getUserByUsername Success');
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
          logger.info('getUserByCriteria Success');
          callback(null, results);
        }
      });
  } catch (err) {
    logger.error('getUserByCriteria.mongoose Unhandled Exception: ', err);
    callback(err)
  }
};
