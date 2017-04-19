import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import config from '../knexfile'

let env = `development`
let knex = require(`knex`)(config[env])

knex.migrate.latest([config])

let PORT = 5555

let app = express()

app.use(`/graphql`, graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`))
