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
