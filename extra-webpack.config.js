
const Dotenv = require('dotenv-webpack');

/**
 * Custom webpack config to use the API key from .env file
 */
module.exports = {
  plugins: [new Dotenv()],
};