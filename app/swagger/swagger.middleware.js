const SwaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../assets/swagger.json');

module.exports = [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument)];
