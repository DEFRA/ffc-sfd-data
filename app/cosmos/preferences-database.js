const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

const preferencesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.preferencesDatabase,
      throughput: 400
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.preferencesContainer,
      partitionKey: { paths: ['/id'] }
    })

    return database
  } catch (err) {
    console.log(err)
  }
}

module.exports = { preferencesDatabase }
