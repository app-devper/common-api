import * as winston from 'winston'
import fs from 'fs'
import 'winston-daily-rotate-file'
import config from 'config'

const { combine, timestamp, printf } = winston.format;

const logDir = config.logPathConfig.appLog; // directory path of log

// check log exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);

const myFormat = printf(info => {
  return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: logDir + 'app_%DATE%.log',
      datePattern: 'YYYYMMDD_HH00',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d'
    })
  ],
  exitOnError: false
});

if (config.logPathConfig.isLocal) {
  logger.add(new winston.transports.Console())
}

export default logger
