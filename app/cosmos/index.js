const { messagesDatabase } = require('./databases/messages')
const { queriesDatabase } = require('./databases/queries')
const { filesDatabase } = require('./databases/files')

const cosmosClient = async () => {
  try {
    const cosmos = {}
    // applications, payments, and preferences databases are not not currently used due to
    // the lack of current RU's for cosmos in SND4. They can be renabled when required using the same pattern.
    cosmos.messagesDatabase = await messagesDatabase()
    cosmos.queriesDatabase = await queriesDatabase()
    cosmos.filesDatabase = await filesDatabase()
    return cosmos
  } catch (err) {
    throw new Error(`Failed to create cosmos client: ${err.message}`)
  }
}

module.exports = cosmosClient
