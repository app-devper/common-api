'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var winston = _interopRequireWildcard(_winston);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

require('winston-daily-rotate-file');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var logDir = _config2.default.logPathConfig.infoLog; // directory path of log

// check log exists
_fs2.default.existsSync(logDir) || _fs2.default.mkdirSync(logDir);
var logInfo = winston.createLogger({
  format: winston.format.printf(function (info) {
    return '' + info.message;
  }),
  transports: [new winston.transports.DailyRotateFile({
    filename: logDir + 'info_%DATE%.log',
    datePattern: 'YYYYMMDD_HH00',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '1d'
  })],
  exitOnError: false
});

exports.default = logInfo;
//# sourceMappingURL=logger-info.js.map