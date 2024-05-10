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
    console.log(err)
  }
}

module.exports = { paymentsDatabase }
