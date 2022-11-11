import { Model } from "objection"
import knex from "@/database/connection"

Model.knex(knex)

class User extends Model {
  static get tableName() {
    return "users"
  }

  // to make relation with other tables
  //static get relationMappings() {}
}

export default User
