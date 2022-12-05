import express from "express"
import routerPrivate from "@/routes/private"
import routerPublic from "@/routes/public"
import Token_Validation from "@/middlewares/token_validation"

const router = express.Router()
const tokenValidation = new Token_Validation()

// Rotas publicas
router.use("/public", routerPublic)

// Rotas privadas
router.use("/private", tokenValidation.validate, routerPrivate)

export default router
