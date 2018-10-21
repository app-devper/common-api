'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merchant Schema
 */
var MerchantsSchema = new _mongoose.Schema({
  merchantName: String,
  merchantType: String,
  merchantAddress: String,
  status: String,
  latitude: String,
  longitude: String,
  contactNumber: String,
  webSite: String,
  pageFacebook: String,
  createdBy: { type: _mongoose.Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: _mongoose.Schema.Types.ObjectId, ref: 'users' },
  updatedDate: { type: Date }
});

// Build the merchants Model:
/**
 * Module dependencies.
 */
exports.default = _mongoose2.default.model('merchants', MerchantsSchema);
//# sourceMappingURL=merchant.model.js.map