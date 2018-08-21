export const db = 'mongodb+srv://common:f9mWPxwVEGGkYnca@common-syu9e.mongodb.net'

export const app = {
  name: 'Common',
  port: 8089,
  apiEndpoint: 'https://common-api-app.herokuapp.com/'
};

export const logPathConfig = {
  isLocal: true,
  appLog: '/tmp/AppLog/',
  accessLog: '/tmp/Access_Log/',
  infoLog: '/tmp/Info_Log/',
  serviceLog: '/tmp/Service_Log/',
  otherLog: '/tmp/Other_Log/'
};

export const activateTime = 12;
export const email = 'support@common.com';

export const timeout = 86400000;

export const userLockTime = 900;
export const userLoginAttempt = 3;
