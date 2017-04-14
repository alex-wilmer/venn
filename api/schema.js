import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} from 'graphql'

import * as db from './fakeData'

let Link = new GraphQLObjectType({
  name: `Link`,
  fields: () => ({
    url: { type:  GraphQLString },
    description: { type: GraphQLString },
    id: { type: GraphQLID },
    tags: {
      type: new GraphQLList(Tag),
      resolve: ({ id }) => {
        let edges = db.edges.filter(x => x.link_id === id)
        return db.tags.filter(x => edges.find(y => y.tag_id === x.id))
      },
    },
  }),
})

let Tag = new GraphQLObjectType({
  name: `Tag`,
  fields: () => ({
    name: { type: GraphQLString },
  }),
})

export default new GraphQLSchema({
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
