import request from "supertest"
import server from "@/config/server"

describe("Authentication", () => {
  // A rota de login deve ser acessada com o metodo POST
  // A rota deve retorna um token de autenticacao
  it("should receive JWT token when authenticated with valid credentials", async () => {
    const response = await request(server).post("/v1/public/login").send({
      email: "teste@teste.com",
      password: "1234567",
    })

    // Testando o login e se retorna o token
    expect(response.status).toBe(200)
  })
})

// jest

// Nao utilizar teste no banco de producao e sim no banco de teste

// dentro do describe eu crio um it que e uma unidade de teste pode ter varios it dentro de um describe
// expect e uma funcao que espera um valor e compara com o valor esperado

// toBe e uma funcao que compara se o valor esperado e igual ao valor recebido

// metodo send serve para enviar dados para o servidor
