'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthentication = exports.removeAuthentication = exports.updateLogin = exports.findDuplicateLogin = exports.addAuthentication = undefined;

var _authentication = require('./authentication.model');

var _authentication2 = _interopRequireDefault(_authentication);

var _logger = require('../../log/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addAuthentication = exports.addAuthentication = function addAuthentication(req, data) {
  _logger2.default.info('mongoose addAuthentication');
  var authenticationSchema = new _authentication2.default(data);
  return authenticationSchema.save();
};

var findDuplicateLogin = exports.findDuplicateLogin = function findDuplicateLogin(req, _id, channel) {
  _logger2.default.info('mongoose findDuplicateLogin');
  return _authentication2.default.findOne({ userId: _id, valid: true, channel: channel });
};

var updateLogin = exports.updateLogin = function updateLogin(req, _id) {
  _logger2.default.info('mongoose updateLogin');
  return _authentication2.default.findOneAndUpdate({ _id: _id, valid: true }, { $set: { accessTime: Date.now() } }, { new: true });
};

var removeAuthentication = exports.removeAuthentication = function removeAuthentication(req, userId) {
  _logger2.default.info('mongoose removeAuthentication');
  return _authentication2.default.remove({ userId: userId });
};

var getAuthentication = exports.getAuthentication = function getAuthentication(req, accessToken) {
  _logger2.default.info('mongoose getAuthentication');
  return _authentication2.default.findOne({ token: accessToken, valid: true }).populate('userId').lean().exec();
};
//# sourceMappingURL=authentication.mongoose.js.map