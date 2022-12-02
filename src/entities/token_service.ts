export default interface ITokenService {
  generateToken(id: number | string, expiresIn?: string): string
  generateRefreshToken(id: number, expiresIn: string): string
  verifyToken(token: string): string | object
  verifyRefreshToken(refres_token: string): string | object
}
