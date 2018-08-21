import * as applicationUtils from '../../utils/app-utils'
import * as service from './authentication.service'

import logger from '../../utils/logger'// Load logger
import loggerAccess from '../../utils/logger-access'
import loggerInfo from '../../utils/logger-info'

import {LogModel} from '../../config/log/log.model.js'

// login
export const login = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.login(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('login Unhandled Exception: ' + err);
    let response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response)
  }
};

// login social
export const loginSocial = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.loginSocial(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('login Unhandled Exception: ' + err);
    let response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response)
  }
};

// logout
export const logout = (req, res) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  try {
    service.logout(req, (response) => {
      logModel.setResponse(response);
      loggerInfo.info(logModel.getInfoLog());
      if (response.resCode === 'CM2000000') {
        res.json(response)
      } else {
        res.status(500).send(response)
      }
    })
  } catch (err) {
    logger.error('logout Unhandled Exception: ' + err);
    let response = applicationUtils.genResponse(req.get('dc-language'), 'DC5000000', err);
    logModel.setResponse(response);
    loggerInfo.info(logModel.getInfoLog());
    return res.status(response.httpCode).send(response)
  }
}
