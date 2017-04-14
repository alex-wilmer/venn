import * as db from '../fakeData'

export let get = type => (_, { id }) => id ? db[type].filter(x => x.id === id) : db[type]

export let create = type => (_, args) => {
  let item = {
    id: +new Date(),
    ...args,
  }

  db[type] = [...db[type], item]

  return item
}

export let joinOne = (parentType, childType) => ({ id }) => {
  let edges = db.edges.filter(x => x[`${parentType}_id`] === id)
  return db[`${childType}s`].filter(x => edges.find(y => y[`${childType}_id`] === x.id))
}
