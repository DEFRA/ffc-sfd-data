const { messagesDatabase } = require('./messages-database')

const cosmosClient = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  return cosmos
}

module.exports = cosmosClient
