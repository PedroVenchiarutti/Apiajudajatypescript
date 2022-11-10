import * as express from "express"

const routerPrivate = express.Router()

// Rotas de usuarios
routerPrivate.get("/users")
routerPrivate.get("/users/:idd")
routerPrivate.put("/update/users/:idAll")
routerPrivate.patch("/update/users/password/:id")
routerPrivate.delete("/delete/users/:id")

// ROTAS DE  CLIENTES
routerPrivate.get("/client/:id")
routerPrivate.put("/client/update/:id")

// ROTAS DE CADASTRO DE ALERGIA
routerPrivate.put("/client/allergy/update/:id")
routerPrivate.delete("/client/allergy/delete/:id")

export default routerPrivate
