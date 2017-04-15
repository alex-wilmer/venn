
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable(`links`, table => {
      table.increments(`id`).primary()
      table.string(`url`)
      table.string(`description`)
      table.timestamps()
    }),

    knex.schema.createTable(`tags`, table => {
      table.increments(`id`).primary()
      table.string(`name`)
      table.timestamps()
    }),

    knex.schema.createTable(`edges`, table => {
      table.increments(`id`).primary()
      table.string(`link_id`)
      table.string(`tag_id`)
      table.timestamps()
    }),
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable(`links`),
    knex.schema.dropTable(`tags`),
    knex.schema.dropTable(`edges`),
  ])
