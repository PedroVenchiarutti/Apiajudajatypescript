import { TokenService } from "@/services/token"
import RefreshToken from "@/models/refresh_token"
import { NotFoundError } from "@/helpers/api_errors"
import dayjs from "dayjs"
import IRefreshTokenRepository from "@/entities/refreshToken_repository"

type IToken = {
  id: number
}

class RefreshTokenRepository
  extends TokenService
  implements IRefreshTokenRepository
{
  constructor() {
    super()
    this.execute = this.execute.bind(this)
  }

  async execute(refresh_token: string) {
    // pegando o id de dentro do refresh token
    const { id } = this.verifyRefreshToken(refresh_token) as IToken

    // Consultando o banco de dados para ver se o refresh token existe
    const refreshTokenExists = await RefreshToken.query().where({
      user_id: id,
      token: refresh_token,
    })

    // se o refresh token nao existir no banco de dados
    if (refreshTokenExists.length === 0) {
      throw new NotFoundError("Refresh Token não encontrado")
    }

    // convertendo a data de expiração do token para o formato dayjs
    const refreshTokenExpiresDay = dayjs().add(30, "day").toDate()

    // // Deletando o refresh token antigo
    await RefreshToken.query().delete().where({ user_id: id })

    // // Gerando um novo refresh_token
    const refresh = this.generateRefreshToken(id, "30d")

    // Gerar um token
    const token = this.generateToken(id)

    // Salvando o novo token no banco de dados
    await RefreshToken.query().insert({
      user_id: id,
      token: refresh,
      exprires_in: refreshTokenExpiresDay,
    })

    return {
      token,
      refresh,
    }
  }
}

export default RefreshTokenRepository
