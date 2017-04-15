import * as db from '../fakeData'
let config = require(`../../knexfile.js`)
let env = `development`
let knex = require(`knex`)(config[env])

export let get = type => (_, { id }) =>
  id ? knex(`${type}s`).where({ id }).select() : knex(`${type}s`).select()

export let create = (parentType, childType) => (_, args) => {
  let parentId = +new Date()

  let item = {
    id: parentId,
    ...args,
  }

  if (args[`${childType}s`]) {
    item[`${childType}s`] = []

    args[`${childType}s`].forEach(x => {
      let childId = +new Date()

      let childItem = {
        id: childId,
        ...x,
      }

      db[`${childType}s`] = [
        ...db[`${childType}s`], childItem,
      ]

      db.edges = [
        ...db.edges,
        {
          id: +new Date(),
          [`${parentType}_id`]: parentId,
          [`${childType}_id`]: childId,
        },
      ]

      item[`${childType}s`] = [
        ...item[`${childType}s`],
        childItem,
      ]
    })
  }

  db[`${parentType}s`] = [...db[`${parentType}s`], item]

  return item
}

export let joinOne = (parentType, childType) => ({ id }) => {
  let edges = db.edges.filter(x => x[`${parentType}_id`] === id)
  return db[`${childType}s`].filter(x => edges.find(y => y[`${childType}_id`] === x.id))
}
