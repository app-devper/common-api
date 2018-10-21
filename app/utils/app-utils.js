import logger from '../log/logger' //     Load logger
import { resCode } from '../common/constants' // Load config (environment)
import { MainResponse } from '../response/main.response'
import { resMessage } from '../common/message.properties'
import moment from "moment";

export const genResponse = (_language = 'en', _resCode, _devMessage, _data = undefined) => {
  let responseObj;
  try {
    let messageCode = resCode[_resCode];
    let messageRes = messageCode[_language];
    let resHttpCode = messageCode.httpCode;
    responseObj = new MainResponse(_resCode, messageRes, _devMessage, _data, resHttpCode)
  } catch (error) {
    logger.error('AppUtils Unhandled Exception: ' + error);
    responseObj = new MainResponse('CM5000000', resMessage.general.error.en, error.message, undefined, 500)
  }
  return responseObj
};

export const genToken = () => {
  return s4() + s4() + s4() + s4() + s4()
};

export const genRequestId = () => {
  return moment(new Date()).format('YYYYMMDDHHmmssSSS') + s4().toUpperCase()
};

export const isBlank = (str) => {
  return str === undefined || str === null || str === ''
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
};
