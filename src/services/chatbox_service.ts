import { io } from "@/config/server"
import firebaseApp from "@/database/firebaseConnection"
import { dateFormat } from "@/helpers/date"
import ChatBoxRepository from "@/repository/chatbox_repository"
import { Request, Response } from "express"
// tive que importa com require porque nao existe modulos para typescript
const { NlpManager } = require("node-nlp")

export default class ChatBoxService extends ChatBoxRepository {
  constructor() {
    super()
  }

  async initBot() {
    console.log("Iniciando o bot no service")
  }

  // Salvando a sala do cliente no banco de dados
  async getMessageClient(req: Request, res: Response) {
    const section = req.params.id
    console.log("service get", section)

    const date = dateFormat(new Date()).replace(/\//g, "_")

    const dataNew: string[] = []

    const msgClient = firebaseApp.database().ref(section).child(date)

    const snapshot = await msgClient.on("value", (snapshot) => {
      snapshot?.forEach((childSnapshot) => {
        const data = childSnapshot.val()
        dataNew.push(data)
      })
      return res.status(200).json(dataNew)
    })
  }
}
