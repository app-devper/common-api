import * as service from './notification.service'
import { sendResponse } from '../../app.helper';

export const addNotification = (req, res) => {
  service.addNotification(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const getNotification = (req, res) => {
  service.getNotification(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const getNotificationById = (req, res) => {
  service.getNotificationById(req).then((response) => {
    sendResponse(req, res, response)
  })
};
