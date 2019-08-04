import express from 'express'
import logger from '../../logger/logger'
import { methodNotAllowed } from '../../app.controller';
import { handlerRequest } from '../../app.helper';
import { addUser, getUser, getUserById, registerUser, removeUser, updateUser } from './user.controller';

const router = express.Router();

logger.info('user.routes loaded');

router.post('/', handlerRequest, addUser);
router.post('/register', handlerRequest, registerUser);
router.get('/', handlerRequest, getUser);
router.get('/:userId', handlerRequest, getUserById);
router.put('/:userId', handlerRequest, updateUser);
router.delete('/:userId', handlerRequest, removeUser);
router.all('/*', methodNotAllowed);

export default router
