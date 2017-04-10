import e from 'express'
import graphqlHTTP from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'
import * as db from './fakeData'

let PORT = 5555

let Link = new GraphQLObjectType({
  name: `Link`,
  fields: () => ({
    url: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
})

let Tag = new GraphQLObjectType({
  name: `Tag`,
  fields: () => ({
    name: { type: GraphQLString },
  }),
})

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `Query`,
    fields: () => ({
      links: {
        type: new GraphQLList(Link),
        resolve: () => db.links,
      },
      tags: {
        type: new GraphQLList(Tag),
        resolve: () => db.tags,
      },
    }),
  }),
})

let app = e()

app.use(`/graphql`, graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`))
