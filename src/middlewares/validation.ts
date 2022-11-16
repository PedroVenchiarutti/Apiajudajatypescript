import { BadRequestError } from "@/helpers/api_errors"
import { Request, Response, NextFunction } from "express"

const bodyValidation =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.safeParse(req.body)
      console.log(validation)
      next()
    } catch (err: any) {
      next(new BadRequestError(err))
    }
  }

export default bodyValidation
