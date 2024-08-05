const cosmosClient = require('../client')
const { cosmosConfig } = require('../../config')

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

module.exports = { applicationsDatabase }
