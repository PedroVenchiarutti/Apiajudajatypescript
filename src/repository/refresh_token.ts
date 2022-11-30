import { TokenService } from "@/services/token"

class RefreshTokenRepository extends TokenService {
  constructor() {
    super()
    this.execute = this.execute.bind(this)
  }

  async execute(refresh_token: string) {
    //...

    const { id }: any = this.verifyRefreshToken(refresh_token)

    console.log(id)

    // pegando o id de dentro do refresh token
    // const { id: user_id } = this.verifyToken(refresh_token)
  }
}

export default RefreshTokenRepository
