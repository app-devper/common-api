import logger from '../../utils/logger'// Load logger
import UsersSchema from './users.model'

export const addUser = (req, user) => {
  logger.info('mongoose addUser')
  let usersData = new UsersSchema(user)
  return usersData.save()
}

export const updateUser = (req, userId, user) => {
  logger.info('mongoose updateUser')
  return UsersSchema.findByIdAndUpdate({_id: userId}, {$set: user})
}

export const getUserById = (req, _id) => {
  logger.info('mongoose getUserById')
  return UsersSchema.findById(_id, '-password -__v')
}

export const removeUser = (req, userId) => {
  logger.info('mongoose removeUser')
  return UsersSchema.remove({_id: userId})
}

export const getUser = (req) => {
  logger.info('mongoose getUser')
  return UsersSchema.find({}, '-password -__v')
}

export const updateLoginStatus = (req, param) => {
  logger.info('mongoose updateLoginStatus')
  return UsersSchema.update({_id: param._id}, {
    $set: {
      countLoginFailed: param.countLoginFailed,
      timeToUnlock: param.timeToUnlock,
      updatedDate: new Date()
    }
  })
}

export const unlockLoginStatus = (req, username) => {
  logger.info('mongoose unlockLoginStatus')
  return UsersSchema.update({username: username}, {
    $set: {
      countLoginFailed: 0,
      timeToUnlock: null,
      updatedDate: new Date()
    }
  })
}

export const getUserByUsername = (req, username) => {
  logger.info('mongoose getUserByUsername')
  logger.info('username : ' + username)
  return UsersSchema.findOne({username: username.toLowerCase()})
}

export const getUserByCriteria = (req, criteria) => {
  logger.info('mongoose getUserByCriteria')
  return UsersSchema.findOne(criteria, '-password -__v')
}
