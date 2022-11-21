import { BadRequestError } from "@/helpers/api_errors"
import Client from "@/models/clients"
import User from "@/models/users"
import { Request, Response } from "express"

class ClientController {
  async update(req: Request, res: Response) {
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
}

export default ClientController
