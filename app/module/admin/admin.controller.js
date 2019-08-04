import * as service from './admin.service'
import { sendResponse } from '../../app.helper';

export const unlockUser = (req, res) => {
  service.unlockUser(req).then(response => {
    sendResponse(req, res, response)
  })
};
