import logger from '../../logger/logger' // Load logger
import UsersSchema from './user.schema'

export const addUser = (req, user) => {
  logger.info('mongoose addUser');
  const usersData = new UsersSchema(user);
  return usersData.save()
};

export const updateUser = (req, userId, user) => {
  logger.info('mongoose updateUser');
  return UsersSchema.findByIdAndUpdate({ _id: userId }, { $set: user }, { new: true })
};

export const getUserById = (req, _id) => {
  logger.info('mongoose getUserById');
  return UsersSchema.findById(_id, '-password -countLoginFailed -timeToUnlock')
};

export const removeUser = (req, userId) => {
  logger.info('mongoose removeUser');
  return UsersSchema.findOneAndRemove({ _id: userId })
};

export const getUser = (req) => {
  logger.info('mongoose getUser');
  return UsersSchema.find({}, '-password -countLoginFailed -timeToUnlock')
};

export const updateLoginStatus = (req, param) => {
  logger.info('mongoose updateLoginStatus');
  return UsersSchema.updateOne({ _id: param._id }, {
    $set: {
      countLoginFailed: param.countLoginFailed,
      timeToUnlock: param.timeToUnlock,
      updatedDate: new Date()
    }
  })
};

export const getUserByUsername = (req, username) => {
  logger.info('mongoose getUserByUsername');
  return UsersSchema.findOne({ username: username.toLowerCase() }).lean()
};

export const getUserByCriteria = (req, criteria) => {
  logger.info('mongoose getUserByCriteria');
  return UsersSchema.findOne(criteria, '-password -countLoginFailed -timeToUnlock')
};

export const getUserListByCriteria = (req, criteria) => {
  logger.info('mongoose getUserByCriteria');
  return UsersSchema.find(criteria, '-password -countLoginFailed -timeToUnlock')
};
