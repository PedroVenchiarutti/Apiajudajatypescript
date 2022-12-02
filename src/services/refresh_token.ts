import RefreshTokenRepository from "@/repository/refresh_token"
import { Request, Response } from "express"

class RefreshTokenService extends RefreshTokenRepository {
  constructor() {
    super()
    this.add = this.add.bind(this)
  }

  async add(req: Request, res: Response): Promise<Response> {
    //...

    const { refresh_token } = req.body

    const { refresh, token } = await this.execute(refresh_token)

    return res
      .status(200)
      .json({ message: "Refresh Token adicionado", token, refresh })
  }
}

export default RefreshTokenService
