const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

const queriesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.queriesDatabase,
      throughput: 400
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.queriesContainer,
      partitionKey: { paths: ['/id'] }
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

module.exports = { queriesDatabase }
