import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} from 'graphql'

import * as station from '../station'

let Link = new GraphQLObjectType({
  name: `Link`,
  fields: () => ({
    id: { type: GraphQLID },
    url: { type:  GraphQLString },
    description: { type: GraphQLString },
    tags: {
      type: new GraphQLList(Tag),
      resolve: station.joinOne(`link`, `tag`),
    },
  }),
})

let Tag = new GraphQLObjectType({
  name: `Tag`,
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    links: {
      type: new GraphQLList(Link),
      resolve: station.joinOne(`tag`, `link`),
    },
  }),
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `Query`,
    fields: () => ({
      links: {
        type: new GraphQLList(Link),
        resolve: () => station.get(`links`),
      },
      tags: {
        type: new GraphQLList(Tag),
        resolve: () => station.get(`tags`),
      },
    }),
  }),
})
