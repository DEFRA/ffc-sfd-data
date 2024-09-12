import { messagesDatabase } from './databases/messages.js'
import { queriesDatabase } from './databases/queries.js'
import { filesDatabase } from './databases/files.js'

const cosmosClient = async () => {
  try {
    const cosmos = {}
    cosmos.messagesDatabase = await messagesDatabase()
    cosmos.queriesDatabase = await queriesDatabase()
    cosmos.filesDatabase = await filesDatabase()
    return cosmos
  } catch (err) {
    throw new Error(`Failed to create cosmos client: ${err.message}`)
  }
}

export default cosmosClient
