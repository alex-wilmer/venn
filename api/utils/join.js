import * as db from '../db'

export let join = (parentType, childType) => parent => {
  let edges = db.edges.filter(edge => edge[`${parentType}_id`] === parent.id)

  let children = db[`${childType}s`].filter(child =>
    edges.find(edge => edge[`${childType}_id`] === child.id)
  )

  return { ...parent, [`${childType}s`]: children }
}
