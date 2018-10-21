import express from 'express'
import * as controller from './users.controller' // Load controller
import logger from '../../log/logger' // Load logger

let userRouter = express.Router();

logger.info('user.routes loaded');

userRouter.post('/', (req, res) => {
  logger.info('user router add user');
  controller.addUser(req, res)
});

userRouter.post('/register', (req, res) => {
  logger.info('user router register user');
  controller.registerUser(req, res)
});

userRouter.get('/', (req, res) => {
  logger.info('user router get user');
  controller.getUser(req, res)
});

userRouter.get('/:userId', (req, res) => {
  logger.info('user router get user');
  controller.getUserById(req, res)
});

userRouter.put('/:userId', (req, res) => {
  logger.info('user router update user');
  controller.updateUser(req, res)
});

userRouter.delete('/:userId', (req, res) => {
  logger.info('user router remove user');
  controller.removeUser(req, res)
});

export default userRouter
