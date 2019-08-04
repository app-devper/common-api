import * as service from './auth.service'
import { sendResponse } from '../../app.helper';

// login
export const login = async (req, res) => {
  const channel = req.body.channel;
  let result = null;
  if (channel && channel.toLowerCase() === 'jwt') {
    result = await service.loginJwt(req, res);
  } else {
    result = await service.login(req, res);
  }
  sendResponse(req, res, result);
};

// logout
export const logout = async (req, res) => {
  const result = await service.logout(req);
  sendResponse(req, res, result);
};
