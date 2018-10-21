'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMerchantById = exports.getMerchant = exports.removeMerchant = exports.updateMerchant = exports.addMerchant = undefined;

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _appUtils = require('../../utils/app-utils');

var appUtils = _interopRequireWildcard(_appUtils);

var _merchant = require('./merchant.mongoose');

var merchantMongoose = _interopRequireWildcard(_merchant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addMerchant = exports.addMerchant = function addMerchant(req, callback) {
  try {
    var reqBody = req.body;
    reqBody.updatedDate = new Date();
    reqBody.createdDate = new Date();
    reqBody.createdBy = req.get('dc-user-id');
    reqBody.updatedBy = req.get('dc-user-id');
    merchantMongoose.addMerchant(req, reqBody, function (err, result) {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message));
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Add merchant success', result));
      }
    });
  } catch (err) {
    _logger2.default.error('service addMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var updateMerchant = exports.updateMerchant = function updateMerchant(req, callback) {
  var reqBody = req.body;
  reqBody.updatedDate = new Date();
  reqBody.updatedBy = req.get('dc-user-id');
  try {
    merchantMongoose.updateMerchant(req, req.params.merchantId, reqBody, function (err, result) {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message));
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Update merchant success', result));
      }
    });
  } catch (err) {
    _logger2.default.error('service updateMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var removeMerchant = exports.removeMerchant = function removeMerchant(req, callback) {
  try {
    merchantMongoose.removeMerchant(req, req.params.merchantId, function (err, result) {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message));
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Remove merchant success', result));
      }
    });
  } catch (err) {
    _logger2.default.error('service removeMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var getMerchant = exports.getMerchant = function getMerchant(req, callback) {
  try {
    merchantMongoose.getMerchant(req, function (err, result) {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message));
      } else {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get merchant success', result));
      }
    });
  } catch (err) {
    _logger2.default.error('service getMerchant Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};

var getMerchantById = exports.getMerchantById = function getMerchantById(req, callback) {
  try {
    merchantMongoose.getMerchantById(req, req.params.merchantId, function (err, result) {
      if (err) {
        callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err.message));
      } else {
        if (result) {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM2000000', 'Get merchant success', result));
        } else {
          callback(appUtils.genResponse(req.get('dc-language'), 'CM4090100', 'Merchant not found'));
        }
      }
    });
  } catch (err) {
    _logger2.default.error('service getMerchantById Unhandled Exception: ' + err);
    callback(appUtils.genResponse(req.get('dc-language'), 'CM5000000', err));
  }
};
//# sourceMappingURL=merchant.service.js.map