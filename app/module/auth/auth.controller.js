import * as service from './auth.service'

import logger from '../../log/logger' // Load logger
import { sendErrorResponse, sendResponse } from '../api/api.helper';

// login
export const login = async (req, res) => {
  try {
    const channel = req.body.channel;
    let result = null;
    if (channel && channel.toLowerCase() === 'jwt') {
      result = await service.loginJwt(req, res);
    } else {
      result = await service.login(req, res);
    }
    sendResponse(req, res, result);
  } catch (err) {
    logger.error('controller login Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

// logout
export const logout = async (req, res) => {
  try {
    const result = await service.logout(req);
    sendResponse(req, res, result);
  } catch (err) {
    logger.error('controller logout Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};
