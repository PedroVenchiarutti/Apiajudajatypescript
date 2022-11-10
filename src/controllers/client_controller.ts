import { ApiError, BadRequestError } from "@/helpers/api_errors"
import { Request, Response } from "express"

class ClientController {
  // ...
  async get(req: Request, res: Response) {
    throw new BadRequestError("Error de classe")
  }
  // ...
}

export default ClientController
