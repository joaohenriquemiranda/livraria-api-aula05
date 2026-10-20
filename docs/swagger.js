
const swaggerUi = require('swagger-ui-express');
const openapi = require('./openapi.json');

function configurarSwagger(app) {
  // Disponibiliza a especificação OpenAPI em JSON
  app.get('/docs/api.json', (req, res) => {
    res.json(openapi);
  });

  // Disponibiliza a interface interativa do Swagger
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true
    }
  }));
}

module.exports = configurarSwagger;
