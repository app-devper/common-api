import logger from './logger'; //     Load logger
import * as config from '../config/config'; // Load config (environment)
import * as constants from '../common/constants.js'; // Load config (environment)
import {MainResponse} from '../response/main.response.js';

export const genResponseObj = (_language = 'en', _resCode, _devMessage, _data) => {
  let responseObj;
  try {
    let messageCode = eval('constants.resCode.' + _resCode);
    let resMessage = eval('config.' + messageCode + '.' + _language);
    let resHttpCode = eval('config.' + messageCode + '.httpCode');

    responseObj = new MainResponse(_resCode, resMessage, _devMessage, _data, resHttpCode);
  } catch (error) {
    logger.error('app utils Unhandled Exception: ' + error);
    responseObj = new MainResponse('CM5000000', config.resMessage.general.error.en, error.message, undefined, 500);
  }
  return responseObj;
};

export const genToken = () => {
  return s4() + s4() + s4() + s4() + s4();
};

export const genRequestId = () => {
  return s4() + s4() + s4() + s4();
};

export const isBlank = (str) => {
  return str === undefined || str === null || str === '';
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
