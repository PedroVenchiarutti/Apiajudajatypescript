import jwt from "jsonwebtoken"

export class TokenService {
  generateToken(id: number | string, expiresIn = "30m"): string {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET as string, {
      expiresIn,
    })

    return token
  }

  generateRefreshToken(id: string, expiresIn: string): string {
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
}
