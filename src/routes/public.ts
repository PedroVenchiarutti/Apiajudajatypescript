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

routerPublic.post(
  "/login",
  loginService.newlogin
  /*
      #swagger.tags = ['Login & Register']
      #swagger.path = '/public/login'
      #swagger.description = 'Endpoint para realizar o login'
      #swagger.parameters['login'] = {
          in: 'body',
          description: 'Email do usuário e senha',
          required: true,
          type: 'object',
          schema: {
              $email: 'email',
              $password: 'password'
          }
        }
    */
)

// Rota para cadastro de usuario
routerPublic.post(
  "/register",
  bodyValidation(userSchema),
  usersController.create

  /*
            #swagger.tags = ['Login & Register']
      #swagger.path = '/public/register'
      #swagger.description = 'Endpoint para realizar o cadastro de usuário'
      #swagger.parameters['register'] = {
          in: 'body',
          description: 'Dados do usuário',
          required: true,
          type: 'object',
          schema: {
              $username: 'username',
              $email: 'email',
              $password: 'password',
              $confirmPassword: 'confirmPassword',
              $birthday: '06-06-1996',
              $emergencynumber: 'numero de emergencia',
              $helth_insurance: 'plano de saude',
              $gender: 'genero M ou F',
              $name: 'nome',
              $lastname: 'sobrenome',
              $avatar: 'Url da imagem',
          }
        }
    */
)

// Rota para gerar o token de recuperação de senha
routerPublic.post(
  "/recovery/generate",
  recoveryPassword.recoveryGenerate
  /*
      #swagger.tags = ['Recovery']
      #swagger.path = '/public/recovery/generate'
      #swagger.description = 'Endpoint para gerar o token de recuperação de senha'
      #swagger.parameters['email'] = {
          in: 'body',
          description: 'Email do usuário',
          required: true,
          type: 'object',
          schema: {
              $email: 'email'
          }
      }
   */
)

// Rota para recuperar a senha
routerPublic.post(
  "/recovery/password/:token",
  bodyValidation(recoverPassword),
  recoveryPassword.recoveryPassword
  /*
      #swagger.tags = ['Recovery']
      #swagger.path = '/public/recovery/password/{token}'
      #swagger.description = 'Endpoint para recuperar a senha'
      #swagger.parameters['token'] = {
          in: 'path',
          description: 'Token de recuperação de senha',
          required: true,
          type: 'string'
      }
      #swagger.parameters['password'] = {
          in: 'body',
          description: 'Nova senha',
          required: true,
          type: 'object',
          schema: {
              $password: 'password',
              $confirmPassword: 'confirmPassword'
          }
      }

    */
)

// Refresh Token
routerPublic.post(
  "/refresh_token",
  refreshTokenService.add
  /*
      #swagger.tags = ['Refresh Token']
      #swagger.path = '/public/refresh_token'
      #swagger.description = 'Endpoint para gerar um novo token de acesso'
      #swagger.parameters['refresh_token'] = {
          in: 'body',
          description: 'Refresh Token',
          required: true,
          type: 'object',
          schema: {
              $refresh_token: 'refresh_token'
          }

      }
    */
)

// Rotas para adicionar o a alergia no banco de dados
routerPublic.post(
  "/client/allergy/add/:id",
  clientsController.addAllergy
  /*
      #swagger.tags = ['Client']
      #swagger.path = '/public/client/allergy/add/{id}'
      #swagger.description = 'Endpoint para adicionar uma alergia ao cliente'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do cliente',
          required: true,
          type: 'string'
      }
      #swagger.parameters['allergy'] = {
          in: 'body',
          description: 'Alergia',
          required: true,
          type: 'object',
          schema: {
              $allergie: 'allergy'
          }
      }

    */
)

// pegandos os dados do clients publicos so se tiver cadastrado alguma alergia
routerPublic.get("/client/:id")

// Crashando a aplicacao resolver
routerPublic.post("/webchat/:id")

export default routerPublic
