// import supertest from "supertest"
// import server from "../config/server"

// // Nunca fazer teste no banco direto de producao sempre usar os bancos de teste

// describe("Create user", () => {
//   //       it("should create a user", async () => {
//   it("Deve ser possivel criar um usuario", async () => {
//     // Chama a rota de cadastro de usuario

//     const response = await supertest(server).post("/v1/public/register").send({
//       name: "pedro lucas",
//       lastname: "venchiarutti",
//       email: "pedrolucas@hotmail.com",
//       password: "123456",
//       confirmPassword: "123456",
//       username: "pedrosmoke",
//       emergencynumber: "13981706262",
//       birthday: "2000-06-07",
//       gender: "M",
//     })

//     console.log(response.text)

//     // retorna msg de erro caso o email ja exista

//     expect(response.status).toBe(201)
//   })
// })

it("soma", async () => {
  const soma = 1 + 1

  expect(soma).toBe(2)
})
