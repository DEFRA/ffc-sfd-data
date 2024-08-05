const { applicationsDatabase } = require('./databases/applications')
const { messagesDatabase } = require('./databases/messages')
const { paymentsDatabase } = require('./databases/payments')
const { preferencesDatabase } = require('./databases/preferences')
const { queriesDatabase } = require('./databases/queries')
const { filesDatabase } = require('./databases/files')

const cosmosClient = async () => {
  try {
    const cosmos = {}
    cosmos.messagesDatabase = await messagesDatabase()
    cosmos.paymentsDatabase = await paymentsDatabase()
    cosmos.applicationsDatabase = await applicationsDatabase()
    cosmos.preferencesDatabase = await preferencesDatabase()
    cosmos.queriesDatabase = await queriesDatabase()
    cosmos.filesDatabase = await filesDatabase()
    return cosmos
  } catch (err) {
    throw new Error(`Failed to create cosmos client: ${err.message}`)
  }
}

module.exports = cosmosClient
