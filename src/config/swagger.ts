import swaggerAutogen from "swagger-autogen"
import endpointsFiles from "@/routes/index"
import outputFile from "./swagger_output.json"

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
  host: "ajuda-ja-api.vercel.app/api",
  schemes: ["https"],
  consumes: ["application/json"],
  securytiDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
}

swaggerAutogen()(outputFile, endpointsFiles, doc)
