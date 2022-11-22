import { Model } from "objection"
import knex from "@/database/connection"
import Client from "@/models/clients"

Model.knex(knex)

interface illAllergy extends Model {
  id: number
  allergies: any
  info_id: number
}

class illAllergy extends Model {
  static get tableName() {
    return "ill_allergy"
  }

  // to make relation with other tables
  static get relationMappings() {
    return {
      ill_allergy: {
        relation: Model.HasOneRelation,
        modelClass: Client,
        join: {
          from: "users_informations.idinfo",
          to: "ill_allergy.info_id",
        },
      },
    }
  }
}

export default illAllergy
