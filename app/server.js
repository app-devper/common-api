import express from 'express' // Load express
import mongoose from 'mongoose' // Load mongoose
import bodyParser from 'body-parser' // Load bodyParser
import cors from 'cors' // Load cors
import config from 'config' // Load config (environment)
import cookieParser from 'cookie-parser';

import logger from './logger/logger' // Load logger
import router from './app.router' // Load app router

logger.info('Starting: ' + config.app.name + '....');
logger.info('Connecting to MongoDB Instance: ' + config.db);

const db = mongoose.connection;
const port = process.env.PORT || config.app.port;

mongoose.connect(config.db, config.options);

db.on('connecting', () => {
  logger.info('connecting to MongoDB...')
});

db.on('error', (error) => {
  logger.error('Could not connect to MongoDB!');
  logger.error(error.message);
  mongoose.disconnect()
});

db.on('connected', () => {
  logger.info('MongoDB connected!')
});

db.once('open', () => {
  logger.info('MongoDB connection opened!')
});

db.on('reconnected', () => {
  logger.info('MongoDB reconnected!')
});

db.on('disconnected', () => {
  logger.info('MongoDB disconnected!')
});

// Create the app
// ============================================================================================
const app = express(db);

app.enable('trust proxy');

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Enable CORS on Express server instance
app.use(cors());

// Configure app routes
app.use('/api', router);

// Start the app by listening on <port>
// ===========================================================================================
app.listen(port);

// Logging initialization
logger.info(config.app.name + ' listening on port: ' + port);

export default app
