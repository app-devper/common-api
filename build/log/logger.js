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

var _winston$format = winston.format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    printf = _winston$format.printf;


var logDir = _config2.default.logPathConfig.appLog; // directory path of log

// check log exists
_fs2.default.existsSync(logDir) || _fs2.default.mkdirSync(logDir);

var myFormat = printf(function (info) {
  return info.timestamp + ' ' + info.level.toUpperCase() + ': ' + info.message;
});

var logger = winston.createLogger({
  format: combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), myFormat),
  transports: [new winston.transports.Console(), new winston.transports.DailyRotateFile({
    filename: logDir + 'app_%DATE%.log',
    datePattern: 'YYYYMMDD_HH00',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '1d'
  })],
  exitOnError: false
});

if (!_config2.default.logPathConfig.isLocal) {
  logger.remove(winston.transports.Console);
}

exports.default = logger;
//# sourceMappingURL=logger.js.map