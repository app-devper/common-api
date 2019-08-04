import express from 'express'
import logger from '../../logger/logger'
import { basicAuth } from '../../app.helper';
import { unlockUser } from './admin.controller';
import { methodNotAllowed } from '../../app.controller';

const adminRouter = express.Router();

logger.info('admin.routes loaded');

adminRouter.get('/:username', basicAuth, unlockUser);

adminRouter.all('/*', methodNotAllowed);

export default adminRouter
