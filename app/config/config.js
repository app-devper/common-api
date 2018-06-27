/**
 * Load app configurations
 */

let config = require('./env/' + (process.env.NODE_ENV || 'local.js'));

config.activateTime = 12;//12 hours
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

export default config;
