export const db = 'mongodb+srv://common:f9mWPxwVEGGkYnca@common-syu9e.mongodb.net'

export const app = {
  name: 'Common',
  port: 8089,
  apiEndpoint: 'http://localhost:8089/api'
};

export const logPathConfig = {
  isLocal: true,
  appLog: '/AppLog/',
  accessLog: '/Access_Log/',
  infoLog: '/Info_Log/',
  serviceLog: '/Service_Log/',
  otherLog: '/Other_Log/'
};

export const activateTime = 12;
export const email = 'support@common.com';

export const timeout = 86400000;

export const userLockTime = 900;
export const userLoginAttempt = 3;
