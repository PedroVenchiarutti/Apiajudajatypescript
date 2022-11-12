// import Users from "@/models/users"
// import { Request, Response } from "express"

// module.exports = function (server: any) {
//   // GET - index
//   server.get("/users", (req: Request, res: Response) => {
//     Users.query()
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // GET BY ID - show
//   server.get("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .findById(id)
//       .then((users: any) => {
//         res.status(200).json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // POST - create
//   server.post("/users", (req: Request, res: Response) => {
//     Users.query()
//       .insert(req.body)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // PUT - update
//   server.put("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .updateAndFetchById(id, req.body)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })

//   // DELETE - destroy
//   server.delete("/users/:id", (req: Request, res: Response) => {
//     const { id } = req.params
//     Users.query()
//       .deleteById(id)
//       .then((users: any) => {
//         res.json(users)
//       })
//       .catch((err: any) => console.log(err))
//   })
// }
import { NextFunction } from "express"
import Users from "@/models/users"
import { Request, Response } from "express"

interface User extends Request {
  body: {
    username: string
    email: string
    password: string
    name: string
    lastname: string
    gender: string
    birthday: string
    emergencynumber: string
    helth_insurance: string
    avatar?: string
  }
}

export class UsersController {
  async get(req: User, res: Response): Promise<void> {
    const getAll = await Users.query()
      .withGraphFetched("users_informations")
      .modifyGraph("users_informations", (builder) => {
        builder.where("user_id", 272)
      })

    // console.log(getAll)

    res.status(200).json(getAll)
  }

  async add(req: User, res: Response, next: NextFunction) {
    const {
      birthday,
      emergencynumber,
      helth_insurance,
      gender,
      name,
      lastname,
      avatar,
      email,
      password,
      username,
    } = req.body

    // const inserts = await Users.query().insert({
    //   email,
    //   password,
    //   username,
    // })

    // res.status(201).json(inserts)
  }
}
