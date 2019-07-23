import * as service from './member.service'
import logger from '../../log/logger' // Load logger
import { sendErrorResponse, sendResponse } from "../api/api.helper";

export const getMember = (req, res) => {
  try {
    service.getMember(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getMember Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const getMemberById = (req, res) => {
  try {
    service.getMemberById(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getMemberById Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

