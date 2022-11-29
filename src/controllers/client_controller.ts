import { BadRequestError } from "@/helpers/api_errors"
import Client from "@/models/clients"
import illAllergy from "@/models/ill_allergy"
import User from "@/models/users"
import { Request, Response } from "express"

class ClientController {
  // Pegandos os clientes com as alergias cadastradas
  async getAlergy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const client = await User.query()
      .where("id", id)
      .first()
      .withGraphFetched("users_informations")
      .withGraphFetched("users_informations.ill_allergy")

    if (!client) {
      throw new BadRequestError("Cliente não encontrado!")
    }

    return res.status(200).json({
      id: client.id,
      username: client.username,
      email: client.email,
      users_informations: {
        id: client.users_informations.id,
        emergencynumber: client.users_informations.emergencynumber,
        helth_insurance: client.users_informations.helth_insurance,
        gender: client.users_informations.gender,
        name: client.users_informations.name,
        lastname: client.users_informations.lastname,
        avatar: client.users_informations.avatar,
        ill_allergy: {
          id: client.users_informations.ill_allergy.id,
          info_id: client.users_informations.ill_allergy.info_id,
          allergies: client.users_informations.ill_allergy.allergies,
        },
      },
    })
  }

  // Atualizando os dados do cliente
  async update(req: Request, res: Response): Promise<Response> {
    const { emergencynumber, helth_insurance } = req.body
    const { id } = req.params

    // if (!emergencynumber || !helth_insurance) {
    //   throw new BadRequestError("Campos inválidos")
    // }

    const data = {
      emergencynumber,
      helth_insurance,
    }

    const client = await Client.query()
      .update(data)
      .where("user_id", id)
      .returning("*")

    return res.status(201).json(client)
  }

  // Adicionando alergia ao cliente
  async addAllergy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { allergie, client_id } = req.body

    const client = await illAllergy.query().where("info_id", id).first()

    if (!client) {
      throw new BadRequestError("Cliente não encontrado!")
    }

    // Validando se o campo esta vazio ou não
    if (
      client.allergies === null ||
      client.allergies === undefined ||
      typeof client.allergies === "object"
    ) {
      const insertNewAllergy = await illAllergy
        .query()
        .update({
          allergies: {
            all: allergie,
          },
        })
        .where("info_id", id)
        .returning("*")
        .first()
      const { info_id, allergies }: any = insertNewAllergy

      return res.status(201).json({
        message: "Alergia adicionada com sucesso!",
        info_id,
        allergies,
      })
    }

    // Se nao estiver vazio acresenta a nova alergia
    const newData = client?.allergies.all.concat(allergie)
    const insertNewAllergy = await illAllergy
      .query()
      .update({
        allergies: {
          all: newData,
        },
      })
      .where("info_id", id)
      .returning("*")
      .first()

    const { info_id, allergies }: any = insertNewAllergy

    return res.status(201).json({
      message: "Alergia adicionada com sucesso!",
      info_id,
      allergies,
    })
  }
}

export default ClientController
