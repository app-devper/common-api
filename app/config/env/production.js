module.exports = {
  //db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'aid1-cnx1-app01.awareidc.com:24816') + '/Common',
  db: 'mongodb+srv://common:f9mWPxwVEGGkYnca@cluster0-iuolm.mongodb.net',

  app: {
    name: 'Common',
    port: 8089,
    api_endpoint: 'http://localhost:8089/api',
  },

  logPathConfig: {
    isLocal: true,
    appLog: '/AppLog/',
    accessLog: '/Access_Log/',
    infoLog: '/Info_Log/',
    serviceLog: '/Service_Log/',
    otherLog: '/Other_Log/',
  },
};
