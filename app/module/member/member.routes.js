import express from 'express'
import * as controller from '../member/member.controller' // Load controller
import logger from '../../log/logger' // Load logger

const router = express.Router();

logger.info('member.routes loaded');

router.get('/', (req, res) => {
  logger.info('member router get member');
  controller.getMember(req, res)
});

router.get('/:memberId', (req, res) => {
  logger.info('member router get member');
  controller.getMemberById(req, res)
});

export default router
