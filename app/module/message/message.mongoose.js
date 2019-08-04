import logger from '../../logger/logger' // Load logger
import MessageSchema from './message.schema'

export const addMessage = (message) => {
  logger.info('mongoose addMessage');
  const messageData = new MessageSchema(message);
  return messageData.save()
};

export const updateMessage = (messageId, message) => {
  logger.info('mongoose updateMessage');
  return MessageSchema.findByIdAndUpdate({ _id: messageId }, { $set: message }, { new: true }).lean()
};

export const getMessageById = (_id) => {
  logger.info('mongoose getMessageById');
  return MessageSchema.findOne({ _id: _id }).lean()
};

export const removeMessage = (messageId) => {
  logger.info('mongoose removeMessage');
  return MessageSchema.remove({ _id: messageId })
};

export const removeMessageList = (messageIds) => {
  logger.info('mongoose removeMessageList');
  return MessageSchema.remove({ _id: { $in: messageIds } })
};

export const getMessage = () => {
  logger.info('mongoose getMessage');
  return MessageSchema.find({}).sort({ _id: -1 }).lean()
};

export const getMessagePaginate = (page, perPage = 10) => {
  logger.info('mongoose getMessagePaginate');
  return MessageSchema.find({}).sort({ _id: -1 }).limit(perPage)
    .skip(perPage * page).lean()
};

export const getMessageByKey = (key) => {
  logger.info('mongoose getMessageByKey');
  return MessageSchema.findOne({ key: key }).lean()
};
