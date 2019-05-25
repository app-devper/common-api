import express from 'express'
import * as controller from './admin.controller' // Load controller
import logger from '../../log/logger'
import * as apiController from '../api/api.controller';
import { basicAuth } from '../api/api.helper';

let adminRouter = express.Router();

logger.info('admin.routes loaded');

adminRouter.get('/:username', basicAuth, (req, res) => {
  logger.info('user router add user');
  controller.addUser(req, res)
});

adminRouter.all('/*', (req, res) => {
  apiController.methodNotAllowed(req, res)
});

export default adminRouter
