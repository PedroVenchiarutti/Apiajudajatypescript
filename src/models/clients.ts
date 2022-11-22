import { Model } from "objection"
import knex from "@/database/connection"
import IllAllergy from "@/models/ill_allergy"

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
  static get relationMappings() {
    return {
      ill_allergy: {
        relation: Model.HasOneRelation,
        modelClass: IllAllergy,
        join: {
          from: "ill_allergy.info_id",
          to: "users_informations.idinfo",
        },
      },
    }
  }
}

export default Client
