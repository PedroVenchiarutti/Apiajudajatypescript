import * as express from "express"
import UserController from "@/controllers/user_controller"
import ClientController from "@/controllers/client_controller"
import { userSchema } from "@/schemas/users_validations"
import bodyValidation from "@/middlewares/validation"
import { LoginService } from "@/services/login"
import RefreshTokenService from "@/services/refresh_token"
import RecoveryPassword from "@/services/recovery_password"
import { recoverPassword } from "@/schemas/users_validations"

const routerPublic = express.Router()

const usersController = new UserController()
const clientsController = new ClientController()
const loginService = new LoginService()
const refreshTokenService = new RefreshTokenService()
const recoveryPassword = new RecoveryPassword()

// Cadastro de msg IA
// Cadastrando a msg para o bot
routerPublic.post("/private/msgIA")
// Cadastrando a resposta do bot
routerPublic.post("/private/respIA")
// Pegando a msg do bot pela collection e uuid
routerPublic.post("/private/getCollection")
// Deletando a msg do bot pela collection e uuid
routerPublic.post("/private/delete/msg")

routerPublic.post("/login", loginService.newlogin)

// Rota para cadastro de usuario
routerPublic.post(
  "/register",
  bodyValidation(userSchema),
  usersController.create
)

// Rota para gerar o token de recuperação de senha
routerPublic.post("/recovery/generate", recoveryPassword.recoveryGenerate)

// Rota para recuperar a senha
routerPublic.post(
  "/recovery/password/:token",
  bodyValidation(recoverPassword),
  recoveryPassword.recoveryPassword
)

// Refresh Token
routerPublic.post("/refresh_token", refreshTokenService.add)

// Rotas para adicionar o a alergia no banco de dados
routerPublic.post("/client/allergy/add/:id", clientsController.addAllergy)

// pegandos os dados do clients publicos so se tiver cadastrado alguma alergia
routerPublic.get("/client/:id")

// Crashando a aplicacao resolver
routerPublic.post("/webchat/:id")

export default routerPublic
