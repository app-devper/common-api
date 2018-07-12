/**
 * Load app configurations
 */
import * as production from './env/production';
import * as local from './env/local';

let environment = {
  production,
  default: local
};

const config = environment[process.env.NODE_ENV] || environment.default;

export default config;
