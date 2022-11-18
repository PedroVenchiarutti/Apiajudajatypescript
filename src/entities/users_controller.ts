import { Request, Response } from "express"

export interface IUsers_controller {
  getById: (req: Request, res: Response) => Promise<Response>
  create: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  delete: (req: Request, res: Response) => Promise<Response>
  getByForeignKey: (req: Request, res: Response) => Promise<Response>
}
