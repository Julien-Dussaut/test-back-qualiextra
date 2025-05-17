const swaggerJsdoc =  require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Test qualiextra back - Documentation API",
      version: "1.0.0",
      description:
        "Documentation pour l'API réalisée dans le cadre du test demandé par Qualiextra",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Julien Dussaut",
        url: "https://www.julien-dussaut.com",
        email: "dussautj@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    // "./routes/*.js",
    "./swagger/routes.js",
    "./swagger/schemas.js"
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;