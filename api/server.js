import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

let PORT = 5555

let app = express()

app.use(`/graphql`, graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`))
