import express from 'express';
import * as controller from '../module/user/user.controller'; // Load controller
import logger from '../utils/logger'; // Load logger

let userRouter = express.Router();

logger.info('user.routes loaded');

userRouter.post('/', (req, res) => {
  logger.info('user router get user');
  controller.addUser(req, res);
});

userRouter.get('/', (req, res) => {
  logger.info('user router get user');
  controller.getUser(req, res);
});

userRouter.get('/:userId', (req, res) => {
  logger.info('user router get user');
  controller.getUserById(req, res);
});

export default userRouter;
