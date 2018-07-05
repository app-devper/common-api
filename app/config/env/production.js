export const db = 'mongodb+srv://common:f9mWPxwVEGGkYnca@cluster0-iuolm.mongodb.net';

export const app = {
  name: 'Common',
  port: 8089,
  api_endpoint: 'https://common-api-app.herokuapp.com/',
};

export const logPathConfig = {
  isLocal: true,
  appLog: '/tmp/AppLog/',
  accessLog: '/tmp/Access_Log/',
  infoLog: '/tmp/Info_Log/',
  serviceLog: '/tmp/Service_Log/',
  otherLog: '/tmp/Other_Log/',
};

export const activateTime = 12;//12 hours
export const email = 'support@common.com';

export const timeout = 90000; //2 min

export const userLockTime = 900; //second
export const userLoginAttempt = 3;
