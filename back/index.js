require(`babel-register`)({
  plugins: [
    `transform-es2015-modules-commonjs`,
    `transform-async-to-generator`,
    `transform-object-rest-spread`,
  ],
})

let config = require(`../knexfile.js`)
let env = `development`
let knex = require(`knex`)(config[env])

module.exports = knex

knex.migrate.latest([config]) 

require(`./api/server`)
