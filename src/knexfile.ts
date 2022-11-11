import "dotenv/config"

const knexfile = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./src/knex/migrations",
  },
}

export default knexfile
