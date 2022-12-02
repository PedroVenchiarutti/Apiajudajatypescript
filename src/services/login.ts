import { LoginRepository } from "@/repository/login_repository"
import { Request, Response } from "express"

export class LoginService extends LoginRepository {
  constructor() {
    super()
    this.newlogin = this.newlogin.bind(this)
  }

  async newlogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const response = await this.login({ email, password })
    return res.status(200).json(response)
  }
}
