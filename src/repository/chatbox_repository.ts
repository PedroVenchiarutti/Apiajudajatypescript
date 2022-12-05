import firebaseApp from "@/database/firebaseConnection"

interface MessageBot {
  text: string
  intent: string
  id?: string
}

export default class ChatBoxRepository {
  constructor() {
    //...
    this.initRepos()
  }

  async initRepos() {
    // Adiciona os enunciados e intenções para a NLP
    // Criando uma colecancao de dados no Banco de dados Firebase
    const messageBot_rsp = firebaseApp
      .firestore()
      .collection("message_bot_resp")
    const messageBot = firebaseApp.firestore().collection("message_bot")

    // Iniciando o bot e adicionando as mensagens e TReinando o bot
    // const snapshot = await messageBot_rsp.get()
    // const data = snapshot.docs.map((doc) => {
    //   let msg = doc.data().text

    //   // let msg = doc.data().text
    //   // let intent = doc.data().intent
    //   // manager.addDocument("pt", msg, intent)
    // }) as MessageBot

    // return data
  }
}
