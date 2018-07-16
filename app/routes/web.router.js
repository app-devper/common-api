import express from 'express' // Load express
import logger from '../utils/logger' // Load logger
import serveIndex from 'serve-index'
import config from '../config/config'
import path from 'path'
const appDir = path.join(__dirname, '../../dist/index.html')
const webDir = path.join(__dirname, '../../dist')

let router = express.Router() // Load router

router.use('/logs', serveIndex(config.logPathConfig.appLog, {'icons': true}))
router.use('/logs', express.static(config.logPathConfig.appLog))
router.use('/access', serveIndex(config.logPathConfig.accessLog, {'icons': true}))
router.use('/access', express.static(config.logPathConfig.accessLog))
router.use('/info', serveIndex(config.logPathConfig.infoLog, {'icons': true}))
router.use('/info', express.static(config.logPathConfig.infoLog))

router.use('/', express.static(webDir))

router.get('*', function (req, res) {
  res.sendFile(appDir)
})

logger.info('web.routes loaded')

export default router
