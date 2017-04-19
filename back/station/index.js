let config = require(`../knexfile`)
let env = `development`
let knex = require(`knex`)(config[env])

export let get = type => (_, { id }) =>
  id ? knex(`${type}s`).where({ id }).select() : knex(`${type}s`).select()

export let create = (parentType, childType) => async (_, args) => {
  let [scalarArgs, objectArgs] = Object.entries(args).reduce((acc, [k, v]) => {
    if (typeof v === `object`) {
      acc[1] = { ...acc[1], [k]: v }
    } else {
      acc[0] = { ...acc[0], [k]: v }
    }

    return acc
  }, [])

  let [ parentId ] = await knex(`${parentType}s`).insert(scalarArgs).returning(`id`)

  let item = {
    id: parentId,
    ...scalarArgs,
  }

  if (objectArgs[`${childType}s`]) {
    item[`${childType}s`] = await Promise.all(objectArgs[`${childType}s`].map(async childArgs => {
      let [ childId ] = await knex(`${childType}s`).insert(childArgs).returning(`id`)

      let childItem = {
        id: childId,
        ...childArgs,
      }

      let edge = {
        [`${parentType}_id`]: parentId,
        [`${childType}_id`]: childId,
      }

      await knex(`edges`).insert(edge)

      return childItem
    }))
  }

  return item
}

export let joinOne = (parentType, childType) => async ({ id }) => {
  let edges = await knex(`edges`).select().where({ [`${parentType}_id`]: id })
  return await knex(`${childType}s`).select().whereIn(`id`, edges.map(x => x[`${childType}_id`]))
}
