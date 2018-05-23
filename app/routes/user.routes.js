import express from 'express';
import * as controller from '../module/user/user.controller'; // Load controller
import logger from '../utils/logger'; // Load logger

let router = express.Router();

logger.info('user.routes loaded');

router.post('/', (req, res) => {
  logger.info('user router get user');
  controller.addUser(req, res);
});

router.get('/', (req, res) => {
  logger.info('user router get user');
  controller.getUser(req, res);
});

router.get('/:userId', (req, res) => {
  logger.info('user router get user');
  controller.getUserById(req, res);
});

module.exports = router;
