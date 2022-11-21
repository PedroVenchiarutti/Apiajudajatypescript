import request from "supertest"
import server from "@/config/server"

describe("Crud from user", () => {
  it("should be able to create a new user", async () => {
    // Criando um usuario
    const response = await request(server).post("/v1/public/register").send({
      id: 1,
      birthday: "1999-12-31",
      emergencynumber: "11999999999",
      helth_insurance: "Unimed",
      gender: "M",
      name: "Teste",
      lastname: "Teste",
      avatar: "https://avatars.githubusercontent.com/u/67555874?v=4",
      email: "tddteste@teste.com",
      password: "123456",
      confirmPassword: "123456",
      username: "tddteste",
    })

    console.log("Usuario cadastrado com sucesso", response?.body)

    expect(response.status).toBe(201)
  })
})
