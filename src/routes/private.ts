import * as express from "express"
import { UsersController } from "@/controllers/users_controller"
import { BadRequestError } from "@/helpers/api_errors"

const routerPrivate = express.Router()
const usersController = new UsersController()

// Rotas de usuarios
routerPrivate.get("/users", usersController.get)
routerPrivate.get("/users/:id", usersController.getById)
routerPrivate.put("/update/users/:id")
routerPrivate.patch("/update/users/password/:id")

routerPrivate.delete("/delete/users/:id", usersController.delete)

// ROTAS DE  CLIENTES
routerPrivate.get("/client/:id", usersController.getByForeignKey)
routerPrivate.put("/client/update/:id")

// ROTAS DE CADASTRO DE ALERGIA
routerPrivate.put("/client/allergy/update/:id")
routerPrivate.delete("/client/allergy/delete/:id")

export default routerPrivate
