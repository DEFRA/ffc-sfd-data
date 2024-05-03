const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

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
    console.log(err)
  }
}

module.exports = { applicationsDatabase }
