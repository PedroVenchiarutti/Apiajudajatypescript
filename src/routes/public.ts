import * as express from "express"
import { UserController } from "@/controllers/user_controller"
import { userSchema } from "@/schemas/users_validations"
import bodyValidation from "@/middlewares/validation"
import { LoginService } from "@/services/login"
const routerPublic = express.Router()

const usersController = new UserController()

routerPublic.post("/login", new LoginService().login)

// Rota para cadastro de usuario
routerPublic.post(
  "/register",
  bodyValidation(userSchema),
  usersController.create
)

// Gerar o token para o password quando esqueceu
routerPublic.post("/recovery")

// Rotas para adicionar o a alergia no banco de dados
routerPublic.post("/client/allergy/add")

// pegandos os dados do clients publicos so se tiver cadastrado alguma alergia
routerPublic.get("/client/:id")

// Crashando a aplicacao resolver
routerPublic.post("/webchat/:id")

export default routerPublic
