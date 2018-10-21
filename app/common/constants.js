import { resMessage } from '../common/message.properties.js'

export const resCode = {
  CM2000000: resMessage.general.success,
  CM2000001: resMessage.general.fail,

  CM5000000: resMessage.general.error,

  CM4090000: resMessage.general.invalidData,
  CM4040000: resMessage.general.serviceFound,
  CM4090001: resMessage.general.dataFound,

  CM4010001: resMessage.authentication.unAuthorized,
  CM4030002: resMessage.authentication.forbidden,
  CM4010003: resMessage.authentication.tokenExpired,
  CM4010004: resMessage.authentication.duplicateLogin,
  CM4090005: resMessage.authentication.tooManyInvalidPass,
  CM4090006: resMessage.authentication.incorrectUserPass,
  CM4010007: resMessage.authentication.tokenInvalid,

  CM4010101: resMessage.user.duplicate,

  CM5000036: resMessage.db.connectionFail
};
