import User from "@/models/users"
import { NotFoundError } from "@/helpers/api_errors"
import { TokenService } from "@/services/token"
import { BcryptService } from "@/services/bcrypt"
import * as dayjs from "dayjs"
import RefreshToken from "@/models/refresh_token"

interface ILogin {
  email: string
  password: string
}

export class LoginRepository extends BcryptService {
  token: TokenService
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.token = new TokenService()
  }

  async login({ email, password }: ILogin) {
    // const token = new TokenService()

    // deixando todos email minusculo para evitar problemas
    email.toLowerCase()

    //Verificar se o email existe
    const user = await User.query().findOne({ email })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    //Verificar se a senha esta correta
    const passwordCheck = await this.compare(password, user.password)

    // se a senha estiver errada retorna um erro
    if (!passwordCheck) {
      throw new NotFoundError("Senha incorreta")
    }

    // Gerar o token
    const accessToken = this.token.generateToken(user.id)

    // Gerar o refresh token
    const refreshToken = this.token.generateRefreshToken(user.id, "4h")

    // Gerando uma data de expiração do refresh token
    const expiresRefreshToken = dayjs.default().add(4, "hour").toDate()

    // Salvar o refresh token no banco de dados
    const insertRefreshToken = await RefreshToken.query().insert({
      user_id: user.id,
      token: refreshToken,
      exprires_in: expiresRefreshToken,
    })

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tokens: {
          token: accessToken,
          refreshToken: refreshToken,
        },
      },
    }
  }
}
