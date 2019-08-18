import express from 'express'
import * as controller from './notification.controller' // Load controller
import logger from '../../logger/logger' // Load logger

const router = express.Router();

logger.info('notification.routes loaded');

router.get('/', (req, res) => {
  logger.info('notification router get notification');
  controller.getNotification(req, res)
});

router.post('/', (req, res) => {
  logger.info('notification router add notification');
  controller.addNotification(req, res)
});

router.get('/:notificationId', (req, res) => {
  logger.info('notification router get notification');
  controller.getNotificationById(req, res)
});

export default router
