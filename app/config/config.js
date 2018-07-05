/**
 * Load app configurations
 */
import * as production from './env/production';
import * as local from './env/local';

let enviroment = {
  production,
  default: local
};

const config = enviroment[process.env.NODE_ENV] || enviroment.default;

export default config;
