import * as express from "express"
import routerPrivate from "@/routes/private"
import routerPublic from "@/routes/public"
// import ClientController from "@/controllers/client_controller"

const router = express.Router()
// const clientController = new ClientController()

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

router.use("/public", routerPublic)
router.use("/private", routerPrivate)

export default router
