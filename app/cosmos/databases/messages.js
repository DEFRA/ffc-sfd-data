const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

const messagesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.messagesDatabase,
      throughput: 400
    })
    await database.containers.createIfNotExists({
      id: cosmosConfig.messagesContainer,
      partitionKey: { paths: ['/id'] }
    })

    return database
  } catch (err) {
    console.log(err)
  }
}

module.exports = { messagesDatabase }
