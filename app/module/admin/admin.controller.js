import * as service from './admin.service'
import logger from '../../log/logger' // Load logger
import { sendErrorResponse, sendResponse } from '../api/api.helper';

export const unlockUser = (req, res) => {
  try {
    service.unlockUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('addUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};
