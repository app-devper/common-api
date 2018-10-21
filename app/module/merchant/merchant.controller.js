import * as appUtils from '../../utils/app-utils'
import * as service from './merchant.service'

import logger from '../../log/logger' // Load logger
import loggerAccess from '../../log/logger-access'
import loggerInfo from '../../log/logger-info'

import {LogModel} from '../../log/log.model.js'

export const addMerchant = (req, res) => {
  let logModel = new LogModel()
  logModel.setRequest(req)
  loggerAccess.info(logModel.getAccessLog())
  try {
    service.addMerchant(req, (response) => {
      logModel.setResponse(response)
      loggerInfo.info(logModel.getInfoLog())
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('addMerchant Unhandled Exception: ' + err)
    let response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err)
    logModel.setResponse(response)
    loggerInfo.info(logModel.getInfoLog())
    return res.status(response.httpCode).send(response)
  }
}

export const updateMerchant = (req, res) => {
  let logModel = new LogModel()
  logModel.setRequest(req)
  loggerAccess.info(logModel.getAccessLog())
  try {
    service.updateMerchant(req, (response) => {
      logModel.setResponse(response)
      loggerInfo.info(logModel.getInfoLog())
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('updateMerchant Unhandled Exception: ' + err)
    let response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err)
    logModel.setResponse(response)
    loggerInfo.info(logModel.getInfoLog())
    return res.status(response.httpCode).send(response)
  }
}

export const removeMerchant = (req, res) => {
  let logModel = new LogModel()
  logModel.setRequest(req)
  loggerAccess.info(logModel.getAccessLog())
  try {
    service.removeMerchant(req, (response) => {
      logModel.setResponse(response)
      loggerInfo.info(logModel.getInfoLog())
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('removeMerchant Unhandled Exception: ' + err)
    let response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err)
    logModel.setResponse(response)
    loggerInfo.info(logModel.getInfoLog())
    return res.status(response.httpCode).send(response)
  }
}

export const getMerchant = (req, res) => {
  let logModel = new LogModel()
  logModel.setRequest(req)
  loggerAccess.info(logModel.getAccessLog())
  try {
    service.getMerchant(req, (response) => {
      logModel.setResponse(response)
      loggerInfo.info(logModel.getInfoLog())
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('getMerchant Unhandled Exception: ' + err)
    let response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err)
    logModel.setResponse(response)
    loggerInfo.info(logModel.getInfoLog())
    return res.status(response.httpCode).send(response)
  }
}

export const getMerchantById = (req, res) => {
  let logModel = new LogModel()
  logModel.setRequest(req)
  loggerAccess.info(logModel.getAccessLog())
  try {
    service.getMerchantById(req, (response) => {
      logModel.setResponse(response)
      loggerInfo.info(logModel.getInfoLog())
      return res.status(response.httpCode).send(response)
    })
  } catch (err) {
    logger.error('getMerchantById Unhandled Exception: ' + err)
    let response = appUtils.genResponse(req.get('dc-language'), 'DC5000000', err)
    logModel.setResponse(response)
    loggerInfo.info(logModel.getInfoLog())
    return res.status(response.httpCode).send(response)
  }
}
