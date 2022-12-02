export default interface IRefreshTokenRepository {
  execute(refresh_token: string): Promise<{ token: string; refresh: string }>
}
