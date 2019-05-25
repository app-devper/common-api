import express from 'express'
import * as controller from './authentication.controller' // Load controller
import * as apiController from '../api/api.controller' // Load controller
import logger from '../../log/logger'
import { handlerRequest } from '../api/api.helper';

let authenRouter = express.Router();

authenRouter.post('/', handlerRequest, (req, res) => {
  logger.info('authen router post login');
  controller.login(req, res)
});

authenRouter.get('/logout', handlerRequest, (req, res) => {
  logger.info('authen router get logout');
  controller.logout(req, res)
});

authenRouter.all('/*', (req, res) => {
  apiController.methodNotAllowed(req, res)
});

export default authenRouter
