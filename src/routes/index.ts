import express from "express"
import routerPrivate from "@/routes/private"
import routerPublic from "@/routes/public"
import Token_Validation from "@/middlewares/token_validation"
import ChatBoxService from "@/services/chatbox_service"

const router = express.Router()
const tokenValidation = new Token_Validation()

router.post("/testbot", async (req, res) => {
  const chatBoxService = await new ChatBoxService().startBot(req.body)

  const { answer } = chatBoxService

  res.status(200).json({ message: answer })
})

// Rotas publicas
router.use("/public", routerPublic)

// Rotas privadas
router.use("/private", tokenValidation.validate, routerPrivate)

export default router
