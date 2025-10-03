const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Data Pusher API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // This makes JWT required globally for all endpoints
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
