import express from 'express' // Load express
import serveIndex from 'serve-index';
import config from 'config';

import logger from './logger/logger' // Load logger
import { header } from './common/constants';
import user from './module/user/user.routes'
import auth from './module/auth/auth.routes'
import admin from './module/admin/admin.routes';
import member from './module/member/member.routes';
import webhook from './module/webhook/webhook.routes';
import { apiHandler, authorize } from './app.controller';
import { genRequestId } from './util/utils';

logger.info('Loading server api routes');

const router = express.Router(); // Load router

router.use((req, res, next) => {
  req.reqId = req.get(header.transaction) || genRequestId();
  req.reqDate = new Date();
  apiHandler(req, res, next)
});

//  Load routes for out controllers
router.use('/admin', admin);
router.use('/auth', auth);
router.use('/users', user);
router.use('/members', member);
router.use('/webhook', webhook);

router.use('/logs', serveIndex(config.logPathConfig.appLog, { icons: true }));
router.use('/logs', express.static(config.logPathConfig.appLog));
router.use('/access', serveIndex(config.logPathConfig.accessLog, { icons: true }));
router.use('/access', express.static(config.logPathConfig.accessLog));
router.use('/info', serveIndex(config.logPathConfig.infoLog, { icons: true }));
router.use('/info', express.static(config.logPathConfig.infoLog));

router.use(authorize);

logger.info('Server api routes loaded');

export default router
