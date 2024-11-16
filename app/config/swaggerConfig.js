const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Running trainings API",
      version: "1.0.0",
      description: "API documentation for Express.js application",
    },
  },
  apis: ["./app/routes/*.js"],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the user",
            example: "64bf99e9a8f6a9c9d2c12345",
          },
          username: {
            type: "string",
            description: "Unique username for the user",
            example: "john_doe",
          },
          password: {
            type: "string",
            description: "Hashed password of the user",
            example: "$2b$10$abc123...",
          },
        },
        required: ["username", "password"],
      },
      Image: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the image",
            example: "64bf99e9a8f6a9c9d2c12345",
          },
          owner: {
            type: "string",
            description: "ID of the user who uploaded the image",
            example: "64bf99e9a8f6a9c9d2c67890",
          },
          filename: {
            type: "string",
            description: "Name of the uploaded file",
            example: "image123.jpg",
          },
          filepath: {
            type: "string",
            description: "Path to the uploaded image",
            example: "/uploads/image123.jpg",
          },
        },
        required: ["owner", "filename", "filepath"],
      },
      RunRecord: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the run record",
            example: "64bf99e9a8f6a9c9d2c12345",
          },
          userId: {
            type: "string",
            description: "ID of the user who created the run record",
            example: "64bf99e9a8f6a9c9d2c67890",
          },
          distance: {
            type: "number",
            description: "Distance of the run (in kilometers or meters)",
            example: 5.2,
          },
          time: {
            type: "number",
            description: "Duration of the run (in minutes or seconds)",
            example: 45,
          },
          runDate: {
            type: "string",
            format: "date",
            description: "Date of the run",
            example: "2024-11-15",
          },
        },
        required: ["userId", "distance", "time", "runDate"],
      },
    },
  },
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
