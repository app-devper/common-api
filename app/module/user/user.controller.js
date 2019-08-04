import * as service from './user.service'
import { sendResponse } from '../../app.helper';

export const addUser = (req, res) => {
  service.addUser(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const registerUser = (req, res) => {
  service.registerUser(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const updateUser = (req, res) => {
  service.updateUser(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const removeUser = (req, res) => {
  service.removeUser(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const getUser = (req, res) => {
  service.getUser(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const getUserById = (req, res) => {
  service.getUserById(req).then((response) => {
    sendResponse(req, res, response)
  })
};
