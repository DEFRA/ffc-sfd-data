import cosmosClient from '../client.js'
import { cosmosConfig } from '../../config'

const filesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.filesDatabase
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.filesContainer
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create files database: ${err.message}`)
  }
}

export default { filesDatabase }
