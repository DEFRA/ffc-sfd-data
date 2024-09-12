import cosmosClient from '../client.js'
import { cosmosConfig } from '../../config/index.js'

const paymentsDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.paymentsDatabase
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.paymentsContainer
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

export default { paymentsDatabase }
