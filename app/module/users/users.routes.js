import express from 'express'
import * as controller from './users.controller' // Load controller
import logger from '../../log/logger'
import * as apiController from '../api/api.controller';
import { handlerRequest } from '../api/api.helper';

let userRouter = express.Router();

logger.info('user.routes loaded');

userRouter.post('/', handlerRequest, (req, res) => {
  logger.info('user router add user');
  controller.addUser(req, res)
});

userRouter.post('/register', handlerRequest, (req, res) => {
  logger.info('user router register user');
  controller.registerUser(req, res)
});

userRouter.get('/', handlerRequest, (req, res) => {
  logger.info('user router get user');
  controller.getUser(req, res)
});

userRouter.get('/:userId', handlerRequest, (req, res) => {
  logger.info('user router get user');
  controller.getUserById(req, res)
});

userRouter.put('/:userId', handlerRequest, (req, res) => {
  logger.info('user router update user');
  controller.updateUser(req, res)
});

userRouter.delete('/:userId', handlerRequest, (req, res) => {
  logger.info('user router remove user');
  controller.removeUser(req, res)
});

userRouter.all('/*', (req, res) => {
  apiController.methodNotAllowed(req, res)
});

export default userRouter
