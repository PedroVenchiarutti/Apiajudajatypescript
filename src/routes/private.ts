import * as express from "express"
import UserController from "@/controllers/user_controller"
import ClientController from "@/controllers/client_controller"

const routerPrivate = express.Router()
const userController = new UserController()
const clientController = new ClientController()

// Rotas de usuarios
routerPrivate.get("/users", userController.get)
routerPrivate.get("/users/:id", userController.getById)
routerPrivate.put("/update/users/:id")
routerPrivate.patch("/update/users/password/:id")

routerPrivate.delete("/delete/users/:id", userController.delete)

// ROTAS DE  CLIENTES
// routerPrivate.get("/client/:id", userController.getByForeignKey)
routerPrivate.put("/client/update/:id", clientController.update)
routerPrivate.get("/client/:id", clientController.getAlergy)

// ROTAS DE CADASTRO DE ALERGIA
routerPrivate.put("/client/allergy/update/:id")
routerPrivate.delete("/client/allergy/delete/:id")

export default routerPrivate
