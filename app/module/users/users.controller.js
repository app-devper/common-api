import * as service from './users.service'
import logger from '../../log/logger' // Load logger
import { sendErrorResponse, sendResponse } from '../api/api.helper';

export const addUser = (req, res) => {
  try {
    service.addUser(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('addUser Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

export const registerUser = (req, res) => {
  try {
    service.registerUser(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('registerUser Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

export const updateUser = (req, res) => {
  try {
    service.updateUser(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('updateUser Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

export const removeUser = (req, res) => {
  try {
    service.removeUser(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('removeUser Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

export const getUser = (req, res) => {
  try {
    service.getUser(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getUser Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};

export const getUserById = (req, res) => {
  try {
    service.getUserById(req).then((response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getUserById Unhandled Exception: ' + err.message);
    sendErrorResponse(req, res, err)
  }
};
