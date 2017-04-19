import fs from 'fs'
import { printSchema } from 'graphql'
import chalk from 'chalk'
import schema from '../api/schema'

let schemaFile = printSchema(schema)

fs.writeFileSync(
  `schema.graphql`,
  schemaFile
)

console.log(chalk.yellow(`⭐️  -- schema.graphql file generated!`))

process.exit()
