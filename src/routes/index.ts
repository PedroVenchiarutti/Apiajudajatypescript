import express from "express"
import routerPrivate from "@/routes/private"
import routerPublic from "@/routes/public"
import Token_Validation from "@/middlewares/token_validation"

const router = express.Router()

const tokenValidation = new Token_Validation()

// Recovery password quando esqueceu
router.post("/recovery/password")

router.post("/public/refresh-token")

// Cadastro de msg IA
// Cadastrando a msg para o bot
router.post("/private/msgIA")
// Cadastrando a resposta do bot
router.post("/private/respIA")
// Pegando a msg do bot pela collection e uuid
router.post("/private/getCollection")
// Deletando a msg do bot pela collection e uuid
router.post("/private/delete/msg")

// Rotas publicas
router.use("/public", routerPublic)

// Rotas privadas
router.use("/private", tokenValidation.validate, routerPrivate)

export default router
