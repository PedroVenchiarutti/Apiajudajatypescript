import Mail from "@/services/nodemailer"
import { TokenService } from "@/services/token"
import Users from "@/models/users"
import { Request, Response } from "express"
import { BadRequestError } from "@/helpers/api_errors"
import { BcryptService } from "./bcrypt"

type SendMailResponse = {
  envelope: string
  from: string
  to: string[]
}

export default class RecoveryPassword extends BcryptService {
  constructor() {
    super()
    this.recoveryGenerate = this.recoveryGenerate.bind(this)
    this.recoveryPassword = this.recoveryPassword.bind(this)
  }

  // Gerar um token para recuperação de senha
  async recoveryGenerate(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const tokenService = new TokenService()

    if (!email) {
      throw new BadRequestError("Email não informado")
    }

    // Verifica se o email existe no banco de dados
    const emailExists = await Users.query().where("email", email).first()

    if (!emailExists) {
      throw new BadRequestError("Email não cadastrado")
    }

    // Gerar um token para e um tempo de expiração
    const token = tokenService.recoveryPasswordToken(email, "5m")
    console.log(token)

    const instanceEmail = new Mail(
      email,
      "Recuperação de senha",
      `Para recuperar sua senha utilize esse codigo ${token}, ele expira em 3 minutos`
    )

    const result = (await instanceEmail.sendMail()) as SendMailResponse

    return res.status(200).json({
      message: "Email enviado com sucesso",
      response: result.envelope,
      token,
    })
  }

  // Recuperar a senha
  async recoveryPassword(req: Request, res: Response): Promise<Response> {
    const { token } = req.params
    const { password } = req.body

    const tokenService = new TokenService()

    if (!token) {
      throw new BadRequestError("Token não informado")
    }

    // Verifica se o token é valido
    const tokenIsValid = tokenService.verifyRecoveryPasswordToken(token)

    const hash = await this.hash(password)

    // Atualiza a senha do usuario
    await Users.query()
      .where("email", tokenIsValid.email)
      .patch({ password: hash })

    return res.status(200).json({
      message: "Senha atualizada com sucesso",
    })
  }
}
