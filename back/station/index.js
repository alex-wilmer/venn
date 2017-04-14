import * as db from '../fakeData'

export let get = type => db[type]

export let joinOne = (parentType, childType) => ({ id }) => {
  let edges = db.edges.filter(x => x[`${parentType}_id`] === id)
  return db[`${childType}s`].filter(x => edges.find(y => y[`${childType}_id`] === x.id))
}