import { Model } from "objection"
import knex from "@/database/connection"

Model.knex(knex)

interface RefreshToken extends Model {
  id: number
  user_id: number
  token: string
  exprires_in: Date
}

class RefreshToken extends Model {
  static get tableName() {
    return "refreshtoken"
  }

  // to make relation with other tables
  //   static get relationMappings() {
  //     return {
  //       ill_allergy: {
  //         relation: Model.HasOneRelation,
  //         modelClass: ,
  //         join: {
  //           from: "",
  //           to: "",
  //         },
  //       },
  //     }
  //   }
}

export default RefreshToken
