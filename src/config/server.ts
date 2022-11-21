import "express-async-errors"
import express from "express"
import cors from "cors"
import swaggerDocument from "./swagger_output.json"
import swaggerUi from "swagger-ui-express"
import routes from "@/routes"
import { errorMiddleware } from "@/middlewares/error"
import dotenv from "dotenv"

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
})

const server = express()

// Initial settings
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

//EndPoints
server.use("/v1", routes)
server.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middlewware de erro sempre usar por ultimo de tudo
server.use(errorMiddleware)
export default server
