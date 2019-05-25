import express from 'express' // Load express
import serveIndex from 'serve-index'
import config from 'config'
import logger from '../log/logger' // Load logger

let router = express.Router();// Load router

router.use('/logs', serveIndex(config.logPathConfig.appLog, { 'icons': true }));
router.use('/logs', express.static(config.logPathConfig.appLog));
router.use('/access', serveIndex(config.logPathConfig.accessLog, { 'icons': true }));
router.use('/access', express.static(config.logPathConfig.accessLog));
router.use('/info', serveIndex(config.logPathConfig.infoLog, { 'icons': true }));
router.use('/info', express.static(config.logPathConfig.infoLog));

logger.info('web.routes loaded');

export default router
