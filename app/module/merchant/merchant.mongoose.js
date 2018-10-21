import logger from '../../log/logger' // Load logger
import MerchantsSchema from './merchant.model'

export const addMerchant = (req, data, callback) => {
  try {
    logger.info('mongoose addMerchant')
    let usersData = new MerchantsSchema(data)
    usersData.save((err, result) => {
      if (err) {
        logger.error('addMerchant Failed! >> ' + err)
        callback(err)
      } else {
        logger.info('addMerchant Success')
        callback(null, result)
      }
    })
  } catch (err) {
    logger.error('addMerchant.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const updateMerchant = (req, _id, data, callback) => {
  try {
    logger.info('mongoose updateMerchant')
    MerchantsSchema.findByIdAndUpdate({ _id }, {
      $set: data
    }).exec(function (err, result) {
      if (err) {
        logger.error('updateMerchant Failed! >> ' + err)
        callback(err)
      } else {
        logger.info('updateMerchant Success')
        callback(null, result)
      }
    })
  } catch (err) {
    logger.error('updateMerchant.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const getMerchantById = (req, _id, callback) => {
  try {
    logger.info('mongoose getMerchantById')
    MerchantsSchema.findById(_id, '-__v')
      .exec(function (err, result) {
        if (err) {
          logger.error('getMerchantById Failed! >> ' + err)
          callback(err)
        } else {
          logger.info('getMerchantById Success')
          callback(null, result)
        }
      })
  } catch (err) {
    logger.error('getMerchantById.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const removeMerchant = (req, _id, callback) => {
  try {
    logger.info('mongoose removeMerchant')
    MerchantsSchema.remove({ _id })
      .exec(function (err, result) {
        if (err) {
          logger.error('removeMerchant Failed! >> ' + err)
          callback(err)
        } else {
          logger.info('removeMerchant Success')
          callback(null, result)
        }
      })
  } catch (err) {
    logger.error('removeMerchant.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const getMerchant = (req, callback) => {
  try {
    logger.info('mongoose getMerchant')
    MerchantsSchema.find({}, '-__v')
      .exec(function (err, results) {
        if (err) {
          logger.error('getMerchant Failed! >> ' + err)
          callback(err)
        } else {
          logger.info('getMerchant Success')
          callback(null, results)
        }
      })
  } catch (err) {
    logger.error('getMerchant.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const getMerchantByCriteria = (req, criteria, callback) => {
  try {
    logger.info('mongoose getMerchantByCriteria')
    MerchantsSchema.findOne(criteria, '-__v')
      .exec(function (err, result) {
        if (err) {
          logger.error('getMerchantByCriteria Failed! >> ' + err)
          callback(err)
        } else {
          logger.info('getMerchantByCriteria Success')
          callback(null, result)
        }
      })
  } catch (err) {
    logger.error('getMerchantByCriteria.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}

export const getMerchantsByCriteria = (req, criteria, callback) => {
  try {
    logger.info('mongoose getMerchantsByCriteria')
    MerchantsSchema.find(criteria, '-__v')
      .exec(function (err, results) {
        if (err) {
          logger.error('getMerchantsByCriteria Failed! >> ' + err)
          callback(err)
        } else {
          logger.info('getMerchantsByCriteria Success')
          callback(null, results)
        }
      })
  } catch (err) {
    logger.error('getMerchantsByCriteria.mongoose Unhandled Exception: ', err)
    callback(err)
  }
}
