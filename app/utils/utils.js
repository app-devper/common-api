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

export const pagination = (req, count) => {
  let offset = parseInt(req.query['offset'], 10) || 0;
  let limit = parseInt(req.query['limit'], 10) || 20;
  let next = offset + limit;
  let previous = offset - limit;
  let fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
  let nextUrl = null;
  if (next < count) {
    nextUrl = fullUrl + '?offset=' + next + '&limit=' + limit;
  }
  let previousUrl = null;
  if (previous > 0) {
    previousUrl = fullUrl + '?offset=' + previous + '&limit=' + limit;
  } else if (previous <= 0 && offset !== 0) {
    previousUrl = fullUrl + '?offset=' + 0 + '&limit=' + offset;
  }
  return { offset, limit, nextUrl, previousUrl, fullUrl }
};

const value = "0x10000";
const s4 = () => {
  return Math.floor((1 + Math.random()) * parseInt(value,16)).toString(16).substring(1)
};
