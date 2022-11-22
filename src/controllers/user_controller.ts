import Users from "@/models/users"
import { Request, Response } from "express"
import { BcryptService } from "@/services/bcrypt"
import { BadRequestError } from "@/helpers/api_errors"
import { IUsers_controller } from "@/entities/users_controller"

export default class UserController
  extends BcryptService
  implements IUsers_controller
{
  constructor() {
    super()
    this.create = this.create.bind(this)
  }

  // GET - All
  async get(req: Request, res: Response): Promise<Response> {
    const getAll = await Users.query().select("*")

    const filter = getAll.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }
    })

    return res.status(200).json(filter)
  }

  // GET BY ID - show
  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const getById = await Users.query().findById(id)

    // Retorna um bad request caso o id nao exista no banco de dados
    if (!getById) {
      throw new BadRequestError("Usuário não encontrado")
    }

    return res.status(200).json({
      id: getById.id,
      username: getById.username,
      email: getById.email,
      created_at: getById.created_at,
      updated_at: getById.updated_at,
    })
  }

  // GET BY FOREIGN KEY - show Trazendo o Dados do client que esta vinculado com o user por chave estrangeira
  async getByForeignKey(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const getByForeignKey = await Users.query()
      .findById(id)
      .withGraphFetched("users_informations")

    // Retorna um bad request caso o id nao exista no banco de dados
    if (!getByForeignKey) {
      throw new BadRequestError("Usuário não encontrado")
    }

    return res.status(200).json({
      id: getByForeignKey.id,
      username: getByForeignKey.username,
      email: getByForeignKey.email,
      created_at: getByForeignKey.created_at,
      updated_at: getByForeignKey.updated_at,
      users_informations: getByForeignKey.users_informations,
    })
  }

  // POST - create
  async create(req: Request, res: Response): Promise<Response> {
    const {
      birthday,
      emergencynumber,
      helth_insurance,
      gender,
      name,
      lastname,
      avatar,
      email,
      password,
      username,
    } = req.body

    const hash = await this.hash(password)

    // Verifica se o email ja existe no banco de dados
    const emailExists = await Users.query().where("email", email).first()

    if (emailExists) {
      throw new BadRequestError("Email já cadastrado")
    }

    // Criando o usuario
    const user = await Users.query().insert({
      username,
      email,
      password: hash,
    })

    // Pegando o id do usuario criado
    const user_id = user.id

    // Insere os dados do client no banco de dados e vincula com o user caso o user seja criado
    const client = await Users.relatedQuery("users_informations")
      .for(user_id)
      .insert({
        name,
        lastname,
        birthday,
        helth_insurance,
        emergencynumber,
        gender,
        avatar,
      })
      .returning("*")
      .catch(async (err) => {
        // Caso ocorra algum erro ao criar o client, o usuario criado é deletado
        await Users.query().deleteById(user_id)
        console.log(err)
        throw new BadRequestError("Erro ao criar o usuário ")
      })

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      users_informations: client,
    })
  }

  // PUT - update
  async update(req: Request, res: Response): Promise<Response> {
    const bcrypt = new BcryptService()

    const { id } = req.params

    const { password } = req.body

    const hash = await bcrypt.hash(password)

    const user = await Users.query().updateAndFetchById(id, {
      password: hash,
    })

    return res.status(200).json(user)
  }

  // DELETE - destroy - Deleta o usuario e o client
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    console.log(id)

    // consultar o users_informations pelo id do user
    const client = await Users.relatedQuery("users_informations")
      .for(id)
      .delete()

    // deletar o user
    const user = await Users.query().deleteById(id)

    console.log(client)

    // const user = await console.log(user)

    return res.status(200).json({ message: "Usuario deletado com sucesso!" })
  }
}
