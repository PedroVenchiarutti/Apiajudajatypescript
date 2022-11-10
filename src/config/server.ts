import "express-async-errors"
import * as express from "express"
import * as cors from "cors"
import "dotenv/config"
import routes from "@/routes"
import { Request, NextFunction, Response } from "express"
import { errorMiddlewares } from "@/middlewares/error"
import Client from "@/models/clients"

const server = express()

// Initial settings
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

//EndPoints
server.use("/v1", routes)

server.get("/", (req, res) => {
  Client.query().then((result: Array<string>) => {
    res.json(result)
  })
})

// Middlewware de erro sempre usar por ultimo de tudo
server.use(errorMiddlewares)
export default server
