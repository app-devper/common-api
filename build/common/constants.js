'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resCode = undefined;

var _messageProperties = require('../common/message.properties.js');

var resCode = exports.resCode = {
  CM2000000: _messageProperties.resMessage.general.success,
  CM2000001: _messageProperties.resMessage.general.fail,

  CM5000000: _messageProperties.resMessage.general.error,

  CM4090000: _messageProperties.resMessage.general.invalidData,
  CM4040000: _messageProperties.resMessage.general.serviceFound,
  CM4090001: _messageProperties.resMessage.general.dataFound,

  CM4010001: _messageProperties.resMessage.authentication.unAuthorized,
  CM4030002: _messageProperties.resMessage.authentication.forbidden,
  CM4010003: _messageProperties.resMessage.authentication.tokenExpired,
  CM4010004: _messageProperties.resMessage.authentication.duplicateLogin,
  CM4090005: _messageProperties.resMessage.authentication.tooManyInvalidPass,
  CM4090006: _messageProperties.resMessage.authentication.incorrectUserPass,
  CM4010007: _messageProperties.resMessage.authentication.tokenInvalid,

  CM4010101: _messageProperties.resMessage.user.duplicate,

  CM5000036: _messageProperties.resMessage.db.connectionFail
};
//# sourceMappingURL=constants.js.map