import * as service from './users.service'
import logger from '../../log/logger' // Load logger
import { sendErrorResponse, sendResponse } from '../api/api.helper';

export const addUser = (req, res) => {
  try {
    service.addUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('addUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const registerUser = (req, res) => {
  try {
    service.registerUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('registerUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const updateUser = (req, res) => {
  try {
    service.updateUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('updateUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const removeUser = (req, res) => {
  try {
    service.removeUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('removeUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const getUser = (req, res) => {
  try {
    service.getUser(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getUser Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};

export const getUserById = (req, res) => {
  try {
    service.getUserById(req, (response) => {
      sendResponse(req, res, response)
    })
  } catch (err) {
    logger.error('getUserById Unhandled Exception: ' + err);
    sendErrorResponse(req, res, err)
  }
};
