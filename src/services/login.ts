import { LoginRepository } from "@/repository/login_repository"
import { Request, Response } from "express"

export class LoginService {
  async login(req: Request, res: Response): Promise<Response> {
    const login = new LoginRepository()
    const response = await login.login(req.body)
    return res.status(200).json(response)
  }
}
