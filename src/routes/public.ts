import * as express from "express"

const routerPublic = express.Router()

routerPublic.post("/login")

routerPublic.post("/register")

// Rotas para adicionar o a alergia no banco de dados
routerPublic.post("/client/allergy/add")

// pegandos os dados do clients publicos so se tiver cadastrado alguma alergia
routerPublic.get("/client/:id")

// Crashando a aplicacao resolver
routerPublic.post("/webchat/:id")

export default routerPublic
