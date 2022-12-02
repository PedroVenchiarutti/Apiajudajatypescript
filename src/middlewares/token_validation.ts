import { TokenService } from "@/services/token"
import { NotFoundError, UnauthorizedError } from "@/helpers/api_errors"
import { NextFunction, Request, Response } from "express"

export default class Token_Validation extends TokenService {
  constructor() {
    super()
    this.validate = this.validate.bind(this)
  }

  public async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // Pegando o token do header
    const authHeader = req.headers.authorization

    // Verificando se o token existe
    if (!authHeader) {
      throw new UnauthorizedError("Token não encontrado")
    }

    // Verificando se o token esta valido ou não
    const verifyToken = this.verifyToken(authHeader)

    // Verificando se o token é valido
    return next()
  }
}
