interface IAuth {
  secret: string | undefined
  expiresIn: string | undefined
  secretRefreshToken: string | undefined
  expiresInRefreshToken: string | undefined
  expiresRefreshTokenDays: number | undefined
}

const auth: IAuth = {
  secret: process.env.APP_SECRET,
  expiresIn: "2s",
  secretRefreshToken: process.env.APP_SECRET_REFRESH_TOKEN,
  expiresInRefreshToken: "12d",
  expiresRefreshTokenDays: 30,
}

export default auth
