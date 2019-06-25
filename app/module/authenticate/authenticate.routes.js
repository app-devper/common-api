import express from 'express'
import { handlerRequest } from '../api/api.helper';
import { methodNotAllowed } from '../api/api.controller';
import { login, logout } from './authenticate.controller';

let authenRouter = express.Router();

authenRouter.post('/', handlerRequest, login);

authenRouter.get('/logout', handlerRequest, logout);

authenRouter.all('/*', methodNotAllowed);

export default authenRouter
