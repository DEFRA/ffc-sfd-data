const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

const paymentsDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.paymentsDatabase,
      throughput: 400
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.paymentsContainer,
      partitionKey: { paths: ['/id'] }
    })

    return database
  } catch (err) {
    throw new Error(`Failed to create applications database: ${err.message}`)
  }
}

module.exports = { paymentsDatabase }
