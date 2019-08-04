import * as service from './member.service'
import { sendResponse } from '../../app.helper';

export const getMember = (req, res) => {
  service.getMember(req).then((response) => {
    sendResponse(req, res, response)
  })
};

export const getMemberById = (req, res) => {
  service.getMemberById(req).then((response) => {
    sendResponse(req, res, response)
  })
};
