import express from 'express'; // Load express
import logger from '../utils/logger'; // Load logger
import serveIndex from 'serve-index';
import config from '../config/config';

let router = express.Router(); // Load router

router.use('/logs', serveIndex(config.logPathConfig.appLog, {'icons': true}));
router.use('/logs', express.static(config.logPathConfig.appLog));
router.use('/access', serveIndex(config.logPathConfig.accessLog, {'icons': true}));
router.use('/access', express.static(config.logPathConfig.accessLog));
router.use('/info', serveIndex(config.logPathConfig.infoLog, {'icons': true}));
router.use('/info', express.static(config.logPathConfig.infoLog));

logger.info('web.routes loaded');

export default router;
