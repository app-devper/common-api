import * as winston from 'winston'
import fs from 'fs'
import 'winston-daily-rotate-file'
import config from 'config'

const logDir = config.logPathConfig.accessLog; // directory path of log

// check log exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);
const logAccess = winston.createLogger({
  format: winston.format.printf(info => `${info.message}`),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: logDir + 'access_%DATE%.log',
      datePattern: 'YYYYMMDD_HH00',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d'
    })
  ],
  exitOnError: false
});

export default logAccess
