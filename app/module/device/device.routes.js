import express from 'express'
import * as controller from './device.controller' // Load controller
import logger from '../../logger/logger' // Load logger

const router = express.Router();

logger.info('device.routes loaded');

router.post('/', (req, res) => {
  logger.info('device router add device');
  controller.addDevice(req, res)
});

export default router
