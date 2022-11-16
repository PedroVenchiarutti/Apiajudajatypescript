import { Model } from "objection"
import knex from "@/database/connection"

Model.knex(knex)

interface Client extends Model {
  idinfo: number
  user_id: number
  name: string
  birthday: Date
  emergencynumber: string
  helth_insurance: string
  gender: string
  lastname: string
  avatar: string
  created_at: Date
  update_at: Date
}

class Client extends Model {
  static get tableName() {
    return "users_informations"
  }

  // to make relation with other tables
  // static get relationMappings() {}
}

export default Client
