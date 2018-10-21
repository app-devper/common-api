import express from 'express'
import * as controller from './merchant.controller' // Load controller
import logger from '../../log/logger' // Load logger

let merchantRouter = express.Router()

logger.info('merchant.routes loaded')

merchantRouter.post('/', (req, res) => {
  logger.info('merchant router add merchant')
  controller.addMerchant(req, res)
})

merchantRouter.get('/', (req, res) => {
  logger.info('merchant router get merchant')
  controller.getMerchant(req, res)
})

merchantRouter.get('/:merchantId', (req, res) => {
  logger.info('merchant router get merchant')
  controller.getMerchantById(req, res)
})

merchantRouter.put('/:merchantId', (req, res) => {
  logger.info('merchant router update merchant')
  controller.updateMerchant(req, res)
})

merchantRouter.delete('/:merchantId', (req, res) => {
  logger.info('merchant router remove merchant')
  controller.removeMerchant(req, res)
})

export default merchantRouter
