import winston from 'winston';
import fs from 'fs';
import moment from 'moment';
import 'winston-daily-rotate-file';
import config from '../config/config';

let logDir = config.logPathConfig.appLog; // directory path of log

// check log exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);

let logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      timestamp: function () {
        return moment().format('DD/MM/YYYY HH:mm:ss');
      },
      formatter: function (options) {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      },
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      timestamp: function () {
        return moment().format('DD/MM/YYYY HH:mm:ss');
      },
      formatter: function (options) {
        return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      },
      filename: logDir + 'app_%DATE%.log',
      datePattern: 'YYYYMMDD_HH00',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d',
    })
  ],
  exitOnError: false
});

if (!config.logPathConfig.isLocal) {
  logger.remove(winston.transports.Console);
}

module.exports = logger;
