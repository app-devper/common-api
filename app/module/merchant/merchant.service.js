import logger from "../../utils/logger";
import * as appUtils from "../../utils/app-utils";
import * as merchantMongoose from './merchant.mongoose';

export const addMerchant = (req, callback) => {
  try {
    let reqBody = req.body;
    reqBody.updatedDate = new Date();
    reqBody.createdDate = new Date();
    reqBody.createdBy = req.get('dc-user-id');
    reqBody.updatedBy = req.get('dc-user-id');
    merchantMongoose.addMerchant(req, reqBody, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Add merchant success', result))
      }
    })
  } catch (err) {
    logger.error('service addMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const updateMerchant = (req, callback) => {
  let reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.get('dc-user-id');
  try {
    merchantMongoose.updateMerchant(req, req.params.merchantId, reqBody, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Update merchant success', result))
      }
    })
  } catch (err) {
    logger.error('service updateMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const removeMerchant = (req, callback) => {
  try {
    merchantMongoose.removeMerchant(req, req.params.merchantId, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Remove merchant success', result))
      }
    })
  } catch (err) {
    logger.error('service removeMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getMerchant = (req, callback) => {
  try {
    merchantMongoose.getMerchant(req, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get merchant success', result))
      }
    })
  } catch (err) {
    logger.error('service getMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};

export const getMerchantById = (req, callback) => {
  try {
    merchantMongoose.getMerchantById(req, req.params.merchantId, (err, result) => {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message))
      } else {
        if (result) {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get merchant success', result))
        } else {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4090100', 'Merchant not found'))
        }
      }
    })
  } catch (err) {
    logger.error('service getMerchantById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err))
  }
};
