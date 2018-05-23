import * as applicationUtils from '../../utils/app-utils';
import * as service from './user.service';

import logger from '../../utils/logger'; // 	Load logger
import loggerAccess from '../../utils/logger-access';
import loggerInfo from '../../utils/logger-info';

import {LogModel} from '../../config/log/log.model.js';

export const addUser = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.addUser(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    logger.error('getUser Unhandled Exception: ' + err);
    let response = applicationUtils.genResponseObj(req.get('dc-language'), 'DC5000000', err, undefined);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

// login
export const getUser = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.getUser(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    logger.error('getUser Unhandled Exception: ' + err);
    let response = applicationUtils.genResponseObj(req.get('dc-language'), 'DC5000000', err, undefined);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};

// login
export const getUserById = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.getUserById(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response);
    });
  } catch (err) {
    logger.error('getUserById Unhandled Exception: ' + err);
    let response = applicationUtils.genResponseObj(req.get('dc-language'), 'DC5000000', err, undefined);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response);
  }
};




