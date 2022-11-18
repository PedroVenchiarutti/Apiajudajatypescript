import swaggerAutogen from "swagger-autogen"

const outputFile = "./swagger_output.json"

const endpointsFiles = [
  "./src/routes/index.ts",
  "./src/routes/private.ts",
  "./src/routes/public.ts",
  "./src/controllers/users_controller.ts",
]

const options = {
  openapi: "3.0.0",
}

const doc = {
  info: {
    title: "AjudaJA API",
    version: "1.0.0",
    description: "API do projeto AjudaJA",
    contact: {
      name: "Pedro Lucas",
      email: "pedro.lucas.clear@gmail.com",
    },
  },
  host: "localhost:3333/v1",
  schemes: ["http"],
  consumes: ["application/json"],
  securytiDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc)
