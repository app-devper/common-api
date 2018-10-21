'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMerchantsByCriteria = exports.getMerchantByCriteria = exports.getMerchant = exports.removeMerchant = exports.getMerchantById = exports.updateMerchant = exports.addMerchant = undefined;

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

var _merchant = require('./merchant.model');

var _merchant2 = _interopRequireDefault(_merchant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addMerchant = exports.addMerchant = function addMerchant(req, data, callback) {
  try {
    _logger2.default.info('mongoose addMerchant');
    var usersData = new _merchant2.default(data);
    usersData.save(function (err, result) {
      if (err) {
        _logger2.default.error('addMerchant Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('addMerchant Success');
        callback(null, result);
      }
    });
  } catch (err) {
    _logger2.default.error('addMerchant.mongoose Unhandled Exception: ', err);
    callback(err);
  }
}; // Load logger
var updateMerchant = exports.updateMerchant = function updateMerchant(req, _id, data, callback) {
  try {
    _logger2.default.info('mongoose updateMerchant');
    _merchant2.default.findByIdAndUpdate({ _id: _id }, {
      $set: data
    }).exec(function (err, result) {
      if (err) {
        _logger2.default.error('updateMerchant Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('updateMerchant Success');
        callback(null, result);
      }
    });
  } catch (err) {
    _logger2.default.error('updateMerchant.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

var getMerchantById = exports.getMerchantById = function getMerchantById(req, _id, callback) {
  try {
    _logger2.default.info('mongoose getMerchantById');
    _merchant2.default.findById(_id, '-__v').exec(function (err, result) {
      if (err) {
        _logger2.default.error('getMerchantById Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('getMerchantById Success');
        callback(null, result);
      }
    });
  } catch (err) {
    _logger2.default.error('getMerchantById.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

var removeMerchant = exports.removeMerchant = function removeMerchant(req, _id, callback) {
  try {
    _logger2.default.info('mongoose removeMerchant');
    _merchant2.default.remove({ _id: _id }).exec(function (err, result) {
      if (err) {
        _logger2.default.error('removeMerchant Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('removeMerchant Success');
        callback(null, result);
      }
    });
  } catch (err) {
    _logger2.default.error('removeMerchant.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

var getMerchant = exports.getMerchant = function getMerchant(req, callback) {
  try {
    _logger2.default.info('mongoose getMerchant');
    _merchant2.default.find({}, '-__v').exec(function (err, results) {
      if (err) {
        _logger2.default.error('getMerchant Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('getMerchant Success');
        callback(null, results);
      }
    });
  } catch (err) {
    _logger2.default.error('getMerchant.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

var getMerchantByCriteria = exports.getMerchantByCriteria = function getMerchantByCriteria(req, criteria, callback) {
  try {
    _logger2.default.info('mongoose getMerchantByCriteria');
    _merchant2.default.findOne(criteria, '-__v').exec(function (err, result) {
      if (err) {
        _logger2.default.error('getMerchantByCriteria Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('getMerchantByCriteria Success');
        callback(null, result);
      }
    });
  } catch (err) {
    _logger2.default.error('getMerchantByCriteria.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};

var getMerchantsByCriteria = exports.getMerchantsByCriteria = function getMerchantsByCriteria(req, criteria, callback) {
  try {
    _logger2.default.info('mongoose getMerchantsByCriteria');
    _merchant2.default.find(criteria, '-__v').exec(function (err, results) {
      if (err) {
        _logger2.default.error('getMerchantsByCriteria Failed! >> ' + err);
        callback(err);
      } else {
        _logger2.default.info('getMerchantsByCriteria Success');
        callback(null, results);
      }
    });
  } catch (err) {
    _logger2.default.error('getMerchantsByCriteria.mongoose Unhandled Exception: ', err);
    callback(err);
  }
};
//# sourceMappingURL=merchant.mongoose.js.map