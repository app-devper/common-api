import express from 'express'
import logger from '../../log/logger'
import { basicAuth } from '../api/api.helper';
import { unlockUser } from './admin.controller';
import { methodNotAllowed } from '../api/api.controller';

const adminRouter = express.Router();

logger.info('admin.routes loaded');

adminRouter.get('/:username', basicAuth, unlockUser);

adminRouter.all('/*', methodNotAllowed);

export default adminRouter
