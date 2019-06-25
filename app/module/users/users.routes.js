import express from 'express'
import logger from '../../log/logger'
import { methodNotAllowed } from '../api/api.controller';
import { handlerRequest } from '../api/api.helper';
import { addUser, getUser, getUserById, registerUser, removeUser, updateUser } from './users.controller';

let userRouter = express.Router();

logger.info('user.routes loaded');

userRouter.post('/', handlerRequest, addUser);

userRouter.post('/register', handlerRequest, registerUser);

userRouter.get('/', handlerRequest, getUser);

userRouter.get('/:userId', handlerRequest, getUserById);

userRouter.put('/:userId', handlerRequest, updateUser);

userRouter.delete('/:userId', handlerRequest, removeUser);

userRouter.all('/*', methodNotAllowed);

export default userRouter
