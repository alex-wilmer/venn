import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
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

let Query = new GraphQLObjectType({
  name: `Query`,
  fields: () => ({
    links: {
      type: new GraphQLList(Link),
      args: {
        id: { type: GraphQLID },
      },
      resolve: station.get(`links`),
    },
    tags: {
      type: new GraphQLList(Tag),
      args: {
        id: { type: GraphQLID },
      },
      resolve: station.get(`tags`),
    },
  }),
})

let Mutation = new GraphQLObjectType({
  name: `Mutation`,
  fields: () => ({
    createLink: {
      type: Link,
      args: {
        url: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: GraphQLString,
        },
      },
      resolve: station.create(`links`),
    },
    createTag: {
      type: Tag,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: station.create(`tags`),
    },
  }),
})

let Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema
