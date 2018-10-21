'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Schema
 */
var UsersSchema = new _mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  socialId: String,
  socialType: String,
  socialName: String,
  photoUrl: String,
  createdBy: { type: _mongoose.Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: _mongoose.Schema.Types.ObjectId, ref: 'users' },
  updatedDate: { type: Date },
  status: String,
  phone: String,
  role: String,
  email: String,
  gender: String, //MALE, FEMALE
  countLoginFailed: Number,
  timeToUnlock: { type: Date }
});

// Build the users Model:
/**
 * Module dependencies.
 */
exports.default = _mongoose2.default.model('users', UsersSchema);
//# sourceMappingURL=users.model.js.map