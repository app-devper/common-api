import express from 'express';

import * as controller from './movie.controller'
import logger from '../../logger/logger'; // Load controller

const router = express.Router();

logger.info('movie.routes loaded');

router.all('/*', controller.handleReceive);

export default router;
