import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'

import * as station from '../station'

let Link = new GraphQLObjectType({
  name: `Link`,
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    url: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    tags: {
      type: new GraphQLList(Tag),
      resolve: station.joinOne(`link`, `tag`),
    },
  }),
})

let Tag = new GraphQLObjectType({
  name: `Tag`,
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
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
        id: {
          type: GraphQLID,
        },
      },
      resolve: station.get(`link`),
    },
    tags: {
      type: new GraphQLList(Tag),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: station.get(`tag`),
    },
  }),
})

let TagInput = new GraphQLInputObjectType({
  name: `TagInput`,
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
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
        tags: {
          type: new GraphQLList(TagInput),
        },
      },
      resolve: station.create(`link`, `tag`),
    },
    createTag: {
      type: Tag,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: station.create(`tag`),
    },
  }),
})

let Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema
