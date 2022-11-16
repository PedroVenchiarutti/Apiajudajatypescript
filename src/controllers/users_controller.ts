// import Users from "@/models/users"
// import { Request, Response } from "express"

// module.exports = function (server: any) {
//   // GET - index
//   server.get("/users", (req: Request, res: Response) => {
//     Users.query()
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // GET BY ID - show
//   server.get("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .findById(id)
//       .then((users: any) => {
//         res.status(200).json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // POST - create
//   server.post("/users", (req: Request, res: Response) => {
//     Users.query()
//       .insert(req.body)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // PUT - update
//   server.put("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .updateAndFetchById(id, req.body)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // DELETE - destroy
//   server.delete("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .deleteById(id)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })
// }
import { NextFunction } from "express"
import Users from "@/models/users"
import { Request, Response } from "express"
import { BcryptService } from "@/services/bcrypt"
import { BadRequestError } from "@/helpers/api_errors"

export class UsersController {
  // GET - All
  async get(req: Request, res: Response): Promise<void> {
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

    res.status(200).json(filter)
  }

  // GET BY ID - show
  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const getById = await Users.query().findById(id)

    // Retorna um bad request caso o id nao exista no banco de dados
    if (!getById) {
      throw new BadRequestError("Usuário não encontrado")
    }

    res.status(200).json({
      id: getById.id,
      username: getById.username,
      email: getById.email,
      created_at: getById.created_at,
      updated_at: getById.updated_at,
    })
  }

  // GET BY FOREIGN KEY - show Trazendo o Dados do client que esta vinculado com o user por chave estrangeira
  async getByForeignKey(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const getByForeignKey = await Users.query()
      .findById(id)
      .withGraphFetched("users_informations")

    // Retorna um bad request caso o id nao exista no banco de dados
    if (!getByForeignKey) {
      throw new BadRequestError("Usuário não encontrado")
    }

    res.status(200).json({
      id: getByForeignKey.id,
      username: getByForeignKey.username,
      email: getByForeignKey.email,
      created_at: getByForeignKey.created_at,
      updated_at: getByForeignKey.updated_at,
      users_informations: getByForeignKey.users_informations,
    })
  }

  // POST - create
  async create(req: Request, res: Response): Promise<void> {
    const crpyt = new BcryptService()

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

    const hash = await crpyt.hash(password)

    const user = await Users.query().insert({
      username,
      email,
      password: hash,
    })

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

    res.status(201).json(client)
  }
}
