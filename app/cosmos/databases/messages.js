const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

const messagesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.messagesDatabase
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.messagesContainer
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

module.exports = { messagesDatabase }
