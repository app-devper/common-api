import * as winston from 'winston'
import fs from 'fs'
import 'winston-daily-rotate-file'
import config from 'config'

let logDir = config.logPathConfig.infoLog; // directory path of log

// check log exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);
let logInfo = winston.createLogger({
  format: winston.format.printf(info => `${info.message}`),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: logDir + 'info_%DATE%.log',
      datePattern: 'YYYYMMDD_HH00',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d'
    })
  ],
  exitOnError: false
});

export default logInfo
