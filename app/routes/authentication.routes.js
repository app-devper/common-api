import express from 'express';
import * as controller from '../module/authentication/authentication.controller'; // Load controller
import logger from '../utils/logger'; // Load logger

let router = express.Router();

logger.info('authentication.routes loaded');

router.post('/', (req, res) => {
  logger.info('authen router post login');
  controller.login(req, res);
});

router.get('/logout', (req, res) => {
  logger.info('authen router get logout');
  controller.logout(req, res);
});

module.exports = router;
