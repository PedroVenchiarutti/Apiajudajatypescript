import "express-async-errors"
import express from "express"
import cors from "cors"
import swaggerDocument from "./swagger_output.json"
import swaggerUi from "swagger-ui-express"
import routes from "@/routes"
import { errorMiddleware } from "@/middlewares/error"
import dotenv from "dotenv"
import { Server } from "socket.io"

const app = express()
const server = require("http").createServer(app)

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

// Initial settings
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//EndPoints
app.use("/v1", routes)
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middlewware de erro sempre usar por ultimo de tudo
app.use(errorMiddleware)
export { server, io }
