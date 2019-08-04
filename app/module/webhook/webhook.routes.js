import express from 'express';

import * as controller from './webhook.controller'
import logger from '../../logger/logger'; // Load controller

const router = express.Router();

logger.info('webhook.routes loaded');

router.get('/', controller.verifyToken);
router.post('/', controller.handleReceive);

export default router;
