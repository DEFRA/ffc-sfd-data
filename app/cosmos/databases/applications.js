const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

const applicationsDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.applicationsDatabase,
      throughput: 400
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.applicationsContainer,
      partitionKey: { paths: ['/id'] }
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

module.exports = { applicationsDatabase }
