import cosmosClient from '../client.js'
import { cosmosConfig } from '../../config'

const preferencesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.preferencesDatabase
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.preferencesContainer
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

export default { preferencesDatabase }
