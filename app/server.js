import express from 'express'; // Load express
import mongoose from 'mongoose'; // Load mongoose
import bodyParser from 'body-parser'; // Load bodyParser
import cors from 'cors'; // Load cors
import logger from './utils/logger'; // Load logger
import config from './config/config'; // Load config (environment)

logger.info('Starting: ' + config.app.name + '....');
logger.info('Connecting to MongoDB Instance: ' + config.db);

let db = mongoose.connection;

let options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
};

mongoose.connect(config.db, options);

db.on('connecting', function () {
  logger.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  logger.error('Could not connect to MongoDB!');
  logger.error(error.message);
  mongoose.disconnect();
});

db.on('connected', function () {
  if (db.client.s.url.startsWith('mongodb+srv')) {
    db.db = db.client.db('common');
  }

  logger.info('MongoDB connected!');
});

db.once('open', function () {
  logger.info('MongoDB connection opened!');
});

db.on('reconnected', function () {
  logger.info('MongoDB reconnected!');
});

db.on('disconnected', function () {
  logger.info('MongoDB disconnected!');
});

//	Create the app
// ============================================================================================
let app = express(db);

app.enable('trust proxy');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(bodyParser.json({limit: '50mb'}));

// Enable CORS on Express server instance
app.use(cors());

// Configure app routes
app.use('/', require('./routes/web.router'));
app.use('/api', require('./routes/api.router'));

// Start the app by listening on <port>
// ===========================================================================================
app.listen(config.app.port);

// Logging initialization
logger.info(config.app.name + ' listening on port: ' + config.app.port);
