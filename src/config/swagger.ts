import swaggerAutogen from "swagger-autogen"

const outputFile = "./swagger_output.json"

const endpointsFiles = [
  "./src/routes/index.ts",
  "./src/routes/private.ts",
  "./src/routes/public.ts",
]

const options = {
  autoBody: true,
  autoQuery: true,
  autoHeaders: true,
  autoParams: true,
  autoResponse: true,
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
  componets: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc)
