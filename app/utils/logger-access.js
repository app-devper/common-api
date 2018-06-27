import winston from 'winston';
import fs from 'fs';
import 'winston-daily-rotate-file';
import config from '../config/config';

let logDir = config.logPathConfig.accessLog; // directory path of log

// check log exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);
let log_access = new (winston.Logger)({
  transports: [
    new winston.transports.DailyRotateFile({
      formatter: function (options) {
        return (undefined !== options.message ? options.message : '');
      },
      filename: logDir + 'access_%DATE%.log',
      datePattern: 'YYYYMMDD_HH00',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d',
    })
  ],
  exitOnError: false
});

export default log_access;
