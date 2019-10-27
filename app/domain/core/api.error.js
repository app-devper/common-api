export default class ApiError extends Error {
  constructor (message, response) {
    super();
    this.message = message;
    this.name = 'ApiError';
    this.response = response
  }
}
