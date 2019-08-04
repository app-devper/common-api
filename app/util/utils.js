import logger from '../logger/logger' //     Load logger
import { Response } from './response'
import { resMessage } from '../common/message.properties'
import moment from 'moment';
import uuid from 'uuid'

export const genResponse = (language = 'en', messageCode, devMessage, data) => {
  let responseObj;
  try {
    const messageRes = messageCode[language];
    const resHttpCode = messageCode.httpCode;
    responseObj = new Response(resHttpCode + '', messageRes, devMessage, resHttpCode, data)
  } catch (err) {
    logger.error('Utils Exception: ' + err);
    responseObj = new Response('500', resMessage.general.error.en, err.message, 500)
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
  const offset = parseInt(req.query['offset'], 10) || 0;
  const limit = parseInt(req.query['limit'], 10) || 20;
  const next = offset + limit;
  const previous = offset - limit;
  const fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
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

const value = '0x10000';
const s4 = () => {
  return Math.floor((1 + Math.random()) * parseInt(value, 16)).toString(16).substring(1)
};
