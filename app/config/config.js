/**
 * Load app configurations
 */

let config = require('./env/' + (process.env.NODE_ENV || 'local.js'));
config.resMessage = require('../common/message.properties.js').resMessage;
config.authorization = require('../common/authorization.js');

config.activateTime = 12;//12 hours
config.assignTime = 4 * 30 * 86400000;//4 month
config.email = 'support@common.com';

config.timeout = 3000; //2 min

config.userLockTime = 36; //second
config.userLoginAttempt = 3;

config.otherNode = {
  'DatabaseNode': "MongoDB",
  'EmailNode': "SMTP",
  'RequestAPI': "RequestAPI",
  'NotificationNode': "FireBase"
};

module.exports = config;
