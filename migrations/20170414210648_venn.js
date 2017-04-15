
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable(`links`, table => {
      table.increments(`id`).primary()
      table.string(`url`)
      table.string(`description`)
      table.timestamps()
    }),
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable(`users`),
  ])
