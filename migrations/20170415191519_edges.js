exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable(`edges`, table => {
      table.increments(`id`).primary()
      table.string(`link_id`)
      table.string(`tag_id`)
      table.timestamps()
    }),
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable(`edges`),
  ])
