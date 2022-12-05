import { ApiError } from "@/helpers/api_errors"
import { Request, Response, NextFunction } from "express"
// Para o middleware funcionar com funcao async e necessario instalar um lib express-async-errors

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.message ?? "Internal Server Error"

  // Traduzindo o erro do token
  switch (error.name) {
    case "TokenExpiredError":
      return res.status(401).json({ message: "Token expirado" })

    case "JsonWebTokenError":
      return res.status(401).json({ message: "Token invalido" })
    default:
      break
  }

  return res.status(statusCode).json({ message })
}
