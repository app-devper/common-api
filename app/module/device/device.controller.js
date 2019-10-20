import * as service from './device.service'
import { sendResponse } from '../../app.helper';

export const addDevice = (req, res) => {
  service.addDevice(req).then((response) => {
    sendResponse(req, res, response)
  })
};
