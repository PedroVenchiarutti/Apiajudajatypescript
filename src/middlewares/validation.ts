import { BadRequestError } from "@/helpers/api_errors"
import { Request, Response, NextFunction } from "express"

const bodyValidation =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body)
      next()
    } catch (err: any) {
      next(new BadRequestError(err.errors[0].message))
    }
  }

export default bodyValidation
