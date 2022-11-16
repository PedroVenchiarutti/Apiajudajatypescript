import { Model } from "objection"
import knex from "@/database/connection"
import Client from "@/models/clients"

Model.knex(knex)

interface User extends Model {
  id: number
  username: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
  users_informations: Client
}

class User extends Model {
  static get tableName() {
    return "users"
  }

  // to make relation with other tables
  // Referenciando a tabela de usuários com a tabela de informações
  // relation = relacionamento
  // modelClass = classe do modelo
  // join = junção
  // from = de
  // to = para
  static get relationMappings() {
    return {
      users_informations: {
        relation: Model.HasOneRelation,
        modelClass: Client,
        join: {
          from: "users_informations.user_id",
          to: "users.id",
        },
      },
    }
  }
}

export default User
