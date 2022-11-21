import User from "@/models/users"
import { NotFoundError } from "@/helpers/api_errors"
import { TokenService } from "@/services/token"
import { BcryptService } from "@/services/bcrypt"
import auth from "@/services/auth"

interface ILogin {
  email: string
  password: string
}

export class LoginRepository extends BcryptService {
  constructor() {
    super()
    this.login = this.login.bind(this)
  }

  async login({ email, password }: ILogin) {
    const token = new TokenService()

    // deixando todos email minusculo para evitar problemas
    email.toLowerCase()

    //Verificar se o email existe
    const user = await User.query().findOne({ email })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    //Verificar se a senha esta correta
    const passwordCheck = await this.compare(password, user.password)

    if (!passwordCheck) {
      throw new NotFoundError("Senha incorreta")
    }

    // Gerar o token
    const accessToken = token.generateToken(user.id)

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tokens: {
          token: accessToken,
          refreshToken: "refresh",
        },
      },
    }
  }
}
