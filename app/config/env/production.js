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
    appLog: '/tmp/AppLog/',
    accessLog: '/tmp/Access_Log/',
    infoLog: '/tmp/Info_Log/',
    serviceLog: '/tmp/Service_Log/',
    otherLog: '/tmp/Other_Log/',
  },
};
