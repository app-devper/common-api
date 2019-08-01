import mongoose from 'mongoose' // Load mongoose
import logger from '../../log/logger' // Load logger
import loggerAccess from '../../log/logger-access'
import { LogModel } from '../../log/log.model'
import { resMessage } from '../../common/message.properties'
import { header } from '../../common/constants'
import { bypass } from '../../common/authorization'
import { sendResponse } from './api.helper';
import { genResponse } from '../../utils/utils';

export const apiHandler = (req, res, next) => {
  const logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());

  logger.info('Start ==================================================================================================================');
  logger.info('Route url : ' + req.url);
  logger.info('Route method : ' + req.method);

  req.language = req.headers[header.language] || 'en';
  req.bypass = bypass.includes(req.url);

  const connectionStatus = mongoose.connection.readyState;
  if (connectionStatus === 0) {
    const errMessage = 'Failed to connect to MongoDB';
    logger.info(errMessage);
    const response = genResponse(req.language, resMessage.db.connectionFail, errMessage);
    sendResponse(req, res, response)
  } else {
    next()
  }
};

export const authorize = (req, res) => {
  logger.info('Not found');
  const response = genResponse(req.language, resMessage.general.serviceNotFound, 'Not found');
  sendResponse(req, res, response)
};

export const methodNotAllowed = (req, res) => {
  logger.info('Method not allowed');
  const response = genResponse(req.language, resMessage.general.methodNotAllowed, 'Method not allowed');
  sendResponse(req, res, response)
};
