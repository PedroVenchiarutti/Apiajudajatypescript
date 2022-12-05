import * as express from "express"
import UserController from "@/controllers/user_controller"
import ClientController from "@/controllers/client_controller"
import bodyValidation from "@/middlewares/validation"
import { newPassword } from "@/schemas/users_validations"

const routerPrivate = express.Router()
const userController = new UserController()
const clientController = new ClientController()

// Rotas de usuarios
routerPrivate.get(
  "/users",
  userController.get
  /*
    #swagger.tags = ['Users']
    #swagger.path = '/private/users'
    #swagger.description = 'Endpoint para listar todos os usuários'
    #swagger.security = [{
        "Bearer": []
    }], 
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }

  */
)

routerPrivate.get(
  "/users/:id",
  userController.getById
  /*
    #swagger.tags = ['Users']
    #swagger.path = '/private/users/{id}'
    #swagger.description = 'Endpoint para listar um usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
    }
    #swagger.security = [{
        "Bearer": []
    }],
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }

  */
)

routerPrivate.patch(
  "/update/users/password/:id",
  bodyValidation(newPassword),
  userController.updatePassword
  /*
    #swagger.tags = ['Users']
    #swagger.path = '/private/update/users/password/{id}'
    #swagger.description = 'Endpoint para atualizar a senha do usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
    }
    #swagger.parameters['password'] = {
        in: 'body',
        description: 'Sua senha atual',
        required: true,
        type: 'object',
        schema: {
            $password: 'password',
            $newPassword: 'newPassword',
            $confirmPassword: 'confirmPassword'
        }

    }

    #swagger.security = [{
        "Bearer": []
    }],
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }



  */
)

routerPrivate.delete(
  "/delete/users/:id",
  userController.delete
  /*
    #swagger.tags = ['Users']
    #swagger.path = '/private/delete/users/{id}'
    #swagger.description = 'Endpoint para deletar um usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
    }
    #swagger.security = [{
        "Bearer": []
    }],
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }

  */
)

// ROTAS DE  CLIENTES
routerPrivate.put(
  "/client/update/:id",
  clientController.update
  /*
    #swagger.tags = ['Clients']
    #swagger.path = '/private/client/update/{id}'
    #swagger.description = 'Endpoint para atualizar um cliente'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do cliente',
        required: true,
        type: 'string'
    }
    #swagger.parameters['client'] = {
        in: 'body',
        description: 'Dados do cliente',
        required: true,
        type: 'object',
        schema: {
            $emergencynumber: 'numero de emergencia',
            $helth_insurance: 'plano de saude',
        }
    }
    #swagger.security = [{
        "Bearer": []
    }],
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }
  */
)
routerPrivate.get(
  "/client/:id",
  clientController.getAlergy

  /*
    #swagger.tags = ['Clients']
    #swagger.path = '/private/client/{id}'
    #swagger.description = 'Endpoint para listar as alergias de um cliente'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do cliente',
        required: true,
        type: 'string'
    }
    #swagger.security = [{
        "Bearer": []
    }],
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token de autenticação',
        required: true,
        type: 'string'
    }
  */
)

// ROTAS DE CADASTRO DE ALERGIA
routerPrivate.put("/client/allergy/update/:id")
routerPrivate.delete("/client/allergy/delete/:id")

export default routerPrivate
