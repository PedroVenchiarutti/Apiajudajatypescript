import { ApiError } from "@/helpers/api_errors"
import { Request, NextFunction, Response } from "express"
// Para o middleware funcionar com funcao async e necessario instalar um lib express-async-errors

export const errorMiddlewares = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"
  return res.status(statusCode).json({ message })
}
