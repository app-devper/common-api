import AuthenticationSchema from './auth.schema'
import logger from '../../logger/logger'

export const addAuthentication = (req, data) => {
  logger.info('mongoose addAuthentication');
  const authenticationSchema = new AuthenticationSchema(data);
  return authenticationSchema.save()
};

export const findDuplicateLogin = (req, _id, channel) => {
  logger.info('mongoose findDuplicateLogin');
  return AuthenticationSchema.findOne({ userId: _id, valid: true, channel: channel })
};

export const updateLogin = (req, _id) => {
  logger.info('mongoose updateLogin');
  return AuthenticationSchema.findOneAndUpdate({ _id: _id, valid: true }, { $set: { accessTime: Date.now() } }, { new: true })
};

export const removeAuthentication = (req, userId) => {
  logger.info('mongoose removeAuthentication');
  return AuthenticationSchema.deleteOne({ userId: userId })
};

export const getAuthentication = (req, accessToken) => {
  logger.info('mongoose getAuthentication');
  return AuthenticationSchema.findOne({ token: accessToken, valid: true }).populate('userId').lean().exec()
};
