import jwt from "jsonwebtoken"
import ITokenService from "@/entities/token_service"

interface IToken {
  id?: number
  email: string
  iat: number
  exp: number
}

export class TokenService implements ITokenService {
  generateToken(id: number | string, expiresIn = "30m"): string {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET as string, {
      expiresIn,
    })

    return token
  }

  generateRefreshToken(id: number, expiresIn: string): string {
    //...
    const refresh = jwt.sign(
      { id },
      process.env.APP_SECRET_REFRESH_TOKEN as string,
      {
        expiresIn,
      }
    )

    return refresh
  }

  verifyToken(token: string): string | object {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

    return decoded
  }

  verifyRefreshToken(refres_token: string): string | object {
    const decoded = jwt.verify(
      refres_token,
      process.env.APP_SECRET_REFRESH_TOKEN as string
    )

    return decoded
  }

  recoveryPasswordToken(email: string, expiresIn: string): string {
    const token = jwt.sign(
      { email },
      process.env.TOKEN_SECRET_RECOVERY as string,
      {
        expiresIn,
      }
    )

    return token
  }

  verifyRecoveryPasswordToken(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET_RECOVERY as string
    )

    return decoded as IToken
  }
}
