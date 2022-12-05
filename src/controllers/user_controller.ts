import Users from "@/models/users"
import illAllergy from "@/models/ill_allergy"
import { Request, Response } from "express"
import { BcryptService } from "@/services/bcrypt"
import { BadRequestError } from "@/helpers/api_errors"
import { IUsers_controller } from "@/entities/users_controller"

import Client from "@/models/clients"

// Readonly - Não permite que o objeto seja alterado essa tecnica se chama mapped types
// Partial - Permite que o objeto seja alterado
// Tambem e possivel criar um tipo de objeto com mapped types
interface IUserData {
  password: string
  user_id: number
}

type StringFy<T> = {
  // para cada Propriedade do objeto T, transforma em string
  [P in keyof T]: string
}

export default class UserController
  extends BcryptService
  implements IUsers_controller
{
  constructor() {
    super()
    // Definição do escopo do this para a classe e para os metodos, aqui ele defini que o this é a classe
    this.create = this.create.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
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

    // // Verifica se o email ja existe no banco de dados
    const emailExists = await Users.query().where("email", email).first()

    if (emailExists) {
      throw new BadRequestError("Email já cadastrado")
    }

    // // Criando o usuario
    const user = await Users.query().insert({
      username,
      email,
      password: hash,
    })

    // // Insere os dados do client no banco de dados e vincula com o user caso o user seja criado
    const client = await Users.relatedQuery("users_informations")
      .for(user.id)
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
      .catch(async () => {
        // Caso ocorra algum erro ao criar o client, o usuario criado é deletado
        await Users.query().deleteById(user.id)
        throw new BadRequestError("Erro ao criar o usuário ")
      })

    // console.log(client.idinfo)

    // Criando um id na tabela de alergias
    const alergies = await illAllergy
      .query()
      .insert({
        info_id: client.id,
        allergies: {},
      })
      .returning("*")
      .catch((err) => console.log(err))

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      users_informations: client,
      ill_allergy: alergies,
    })
  }

  // PUT - update - Atualiza a senha do usuario
  async updatePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const { password, newPassword } = req.body

    const hash = await this.hash(newPassword)

    // Mapped type
    const verifyPassword = (await Users.query()
      .findById(id)
      .select("password")) as unknown as StringFy<IUserData>

    // Comparando a senha atual com a senha do banco de dados
    const verify = await this.compare(password, verifyPassword.password)

    if (!verify) {
      throw new BadRequestError("Senha atual incorreta!")
    }

    // Atualizando a senha
    await Users.query()
      .findById(id)
      .patch({
        password: hash,
      })
      .returning("*")

    return res.status(200).json({
      message: "Senha atualizada com sucesso",
    })
  }

  // DELETE - destroy - Deleta o usuario e o client
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    // Existe jeito melhor de fazer !

    // Nao pode apagar a a tabela users_informations, pois ela esta vinculada com a tabela de alergias
    const allergie = await Client.relatedQuery("ill_allergy")
      .for(id)
      .delete()
      .returning("*")

    const client = (await Client.query()
      .deleteById(id)
      .returning("*")) as unknown as StringFy<IUserData>

    const user = await Users.query().deleteById(client.user_id).returning("*")

    if (!allergie || !client || !user) {
      throw new BadRequestError("Erro ao deletar o usuário")
    }

    return res.status(200).json({ message: "Usuario deletado com sucesso!" })
  }

  // const emailExists = await Users.query().where("email", email).first()

  // if (!emailExists || email === " ") {
  //   throw new BadRequestError("Email não cadastrado")
  // }

  // Gera um token para o usuario trocar a senha
}
