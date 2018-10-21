import express from 'express'
import * as controller from './authentication.controller' // Load controller
import logger from '../../log/logger' // Load logger

let authenRouter = express.Router();

logger.info('authentication.routes loaded');

authenRouter.post('/', (req, res) => {
  logger.info('authen router post login');
  controller.login(req, res)
});

authenRouter.post('/social', (req, res) => {
  logger.info('authen router post login social');
  controller.loginSocial(req, res)
});

authenRouter.get('/logout', (req, res) => {
  logger.info('authen router get logout');
  controller.logout(req, res)
});

export default authenRouter
