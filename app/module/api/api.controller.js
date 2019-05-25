import mongoose from 'mongoose' // Load mongoose
import * as applicationUtils from '../../utils/app-utils'
import logger from '../../log/logger' // Load logger
import loggerAccess from '../../log/logger-access'
import { LogModel } from '../../log/log.model'
import { resMessage } from '../../common/message.properties'
import { header } from '../../common/constants'
import { bypass } from '../../common/authorization'
import { sendResponse } from './api.helper';

// api
export const api = (req, res, next) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());

  logger.info('Start ==================================================================================================================');
  logger.info('validator something route url : ' + req.url);
  logger.info('validator something route method : ' + req.method);

  req.language = req.get(header.language) || 'en';
  req.bypass = bypass.includes(req.url);

  let connectionStatus = mongoose.connection.readyState;
  if (connectionStatus === 0) {
    let errMessage = 'Failed to connect to MongoDB';
    logger.info(errMessage);
    let response = applicationUtils.genResponse(req.language, resMessage.db.connectionFail, errMessage);
    sendResponse(req, res, response)
  } else {
    next()
  }
};

// authorize
export const authorize = (req, res) => {
  logger.info('Not found');
  let response = applicationUtils.genResponse(req.language, resMessage.general.serviceNotFound, 'Not found');
  sendResponse(req, res, response)
};

export const methodNotAllowed = (req, res) => {
  logger.info('Method not allowed');
  let response = applicationUtils.genResponse(req.language, resMessage.general.methodNotAllowed, 'Method not allowed');
  sendResponse(req, res, response)
};
