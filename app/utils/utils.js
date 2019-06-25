import logger from '../log/logger' //     Load logger
import { MainResponse } from '../response/main.response'
import { resMessage } from '../common/message.properties'
import moment from 'moment';
import uuid from 'uuid'

export const genResponse = (language = 'en', messageCode, devMessage, data = undefined) => {
  let responseObj;
  try {
    let messageRes = messageCode[language];
    let resHttpCode = messageCode.httpCode;
    responseObj = new MainResponse(resHttpCode + '', messageRes, devMessage, data, resHttpCode)
  } catch (error) {
    logger.error('app-utils Unhandled Exception: ' + error);
    responseObj = new MainResponse('500', resMessage.general.error.en, error.message, undefined, 500)
  }
  return responseObj
};

export const genToken = () => {
  return uuid()
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
