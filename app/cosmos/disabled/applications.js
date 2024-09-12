import cosmosClient from '../client.js'
import { cosmosConfig } from '../../config/index.js'

const applicationsDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.applicationsDatabase
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.applicationsContainer

    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

export default { applicationsDatabase }
