const knexfile = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: "./src/knexs/migrations",
  },
}

export default knexfile
