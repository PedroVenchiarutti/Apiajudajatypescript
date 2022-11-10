exports.seed = function (knex) {
  return knex("users").insert([
    {
      email: "menobaxariatestando@comedia.com",
      password: "testando",
    },
    {
      email: "test@gmail.com",
      password: "testando",
    },
  ])
}
