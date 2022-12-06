const { NlpManager } = require("node-nlp")
import { dateFormat, timeFormat } from "@/helpers/date"
import firebaseApp from "@/database/firebaseConnection"
import { io } from "@/config/server"
import e from "express"

interface IMessageClient {
  message: string
  room: string
  user: string
  username: string
  initial: boolean
}

type IMessageBot = {
  data: any
}

export default class ChatBoxRepository {
  messageBot_rsp = firebaseApp.firestore().collection("message_bot_resp")
  messageBot = firebaseApp.firestore().collection("message_bot")
  manager = new NlpManager({ languages: ["pt"], forcptER: true })
  dayReplace = dateFormat(new Date()).replace(/\//g, "_")

  constructor() {
    //...
    this.messageBot = firebaseApp.firestore().collection("message_bot")
    this.messageBot_rsp = firebaseApp.firestore().collection("message_bot_resp")
    this.manager = new NlpManager({ languages: ["pt"], forcptER: true })
    this.dayReplace = dateFormat(new Date()).replace(/\//g, "_")
  }

  async initRepos() {
    // Adiciona os enunciados e intenções para a NLP
    // Criando uma colecancao de dados no Banco de dados Firebase
    console.log("Iniciando o bot no repositorio")

    // Iniciando o bot e adicionando as mensagens e Treinando o bot
    const snapshot = await this.messageBot_rsp.get()
    const data = snapshot.docs.map((doc: IMessageBot) => {
      const msg = doc.data().text
      const intent = doc.data().intent
      this.manager.addDocument("pt", msg, intent)
      return doc.data()
    })

    return data
  }
  // Pegando resposta do banco de dados
  async getSpecifyMessage() {
    const snapshot = await this.messageBot.get()
    const data = snapshot.docs.map((doc: IMessageBot) => {
      const msg = doc.data().text
      const intent = doc.data().intent
      this.manager.addAnswer("pt", intent, msg)
      return doc.data()
    })
    return data
  }

  // Startando o bot com a message do usuario
  async startBot(data: IMessageClient) {
    await this.initRepos()
    await this.getSpecifyMessage()
    if (data.message === " ") return
    if (data.initial) return

    await this.manager.train()
    this.manager.save()

    const notFoundMessage = "Desculpe, não entendi o que você quis dizer."

    const response = await this.manager.process(
      "pt",
      data.message.toLowerCase()
    )

    // se o bot nao encontrar a mensagem ele retorna a mensagem de not
    // if (response.answer == null) {
    //   await firebaseApp
    //     .database()
    //     .ref(data.room)
    //     .child(this.dayReplace)
    //     .push({
    //       message: notFoundMessage,
    //       room: data.room,
    //       user: "bot",
    //       username: "bot",
    //       createdAt: timeFormat(new Date()),
    //       date: dateFormat(new Date()),
    //     })
    //   io.emit("message_bot", {
    //     user: "bot",
    //     message: notFoundMessage,
    //     createdAt: timeFormat(new Date()),
    //     date: dateFormat(new Date()),
    //   })
    // } else {
    //   await firebaseApp
    //     .database()
    //     .ref(data.room)
    //     .child(this.dayReplace)
    //     .push({
    //       message: response.answer,
    //       room: data.room,
    //       user: "bot",
    //       username: "bot",
    //       createdAt: timeFormat(new Date()),
    //       date: dateFormat(new Date()),
    //     })

    //   io.emit("message_bot", {
    //     user: "bot",
    //     message: response.answer,
    //     time: timeFormat(new Date()),
    //   })
    //   return
    // }

    console.log(response)

    return response
  }

  // Adicionando a message do usuario no banco de dados caso for usar no front descomenta essa linha e configurar o socket.io
  // async addMessage(collection: any, data: IMessageClient) {
  //   const newMessage = await firebaseApp
  //     .database()
  //     .ref(data.room)
  //     .child(this.dayReplace)
  //     .push({
  //       message: data.message,
  //       room: data.room,
  //       user: data.user,
  //       username: data.username,
  //       createdAt: timeFormat(new Date()),
  //       date: dateFormat(new Date()),
  //     })

  //   if (newMessage) {
  //     this.startBot(data)
  //   }

  //   io.on("connection", (socket) => {
  //     console.log(socket)
  //     this.initRepos()
  //     this.getSpecifyMessage()

  //     socket.on("message", (data) => {
  //       const msgClient = {
  //         message: data.message,
  //         room: data.room,
  //         user: data.user,
  //         username: data.username,
  //         time: timeFormat(new Date()),
  //         date: dateFormat(new Date()),
  //       }
  //       socket.emit("message_new", msgClient)

  //       if (data.message === "sair") {
  //         socket.emit("message_new", {
  //           user: "bot",
  //           message: "Até mais, espero ter ajudado",
  //           time: timeFormat(new Date()),
  //         })
  //         socket.disconnect()
  //         return
  //       }
  //       this.addMessage(data.room, data)
  //     })
  //   })
  // }
}
