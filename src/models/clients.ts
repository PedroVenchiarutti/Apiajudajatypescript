const { Model } = require("objection")
import knexfile from "@/../knexfile"

Model.knex(knexfile)

class Client extends Model {
  static get tableName() {
    return "users_informations"
  }

  // to make relation with other tables
  //static get relationMappings() {}
}

export default Client
