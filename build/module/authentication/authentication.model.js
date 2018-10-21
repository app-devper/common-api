'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthenticationSchema = new _mongoose.Schema({
  token: String,
  channel: String,
  username: String,
  valid: Boolean,
  loginTime: { type: Date, default: Date.now },
  accessTime: { type: Date, default: Date.now },
  deviceId: String,
  deviceType: String,
  deviceToken: String,
  userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'users' }
}, { collection: 'authentications' });

// Build the authentication Model:
/**
 * Module dependencies.
 */
exports.default = _mongoose2.default.model('authentications', AuthenticationSchema);
//# sourceMappingURL=authentication.model.js.map