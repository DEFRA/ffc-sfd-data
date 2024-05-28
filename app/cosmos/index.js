const { applicationsDatabase } = require('./databases/applications')
const { messagesDatabase } = require('./databases/messages')
const { paymentsDatabase } = require('./databases/payments')
const { preferencesDatabase } = require('./databases/preferences')
const { queriesDatabase } = require('./databases/queries')

const cosmos = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  cosmos.paymentsDatabase = await paymentsDatabase()
  cosmos.applicationsDatabase = await applicationsDatabase()
  cosmos.preferencesDatabase = await preferencesDatabase()
  cosmos.queriesDatabase = await queriesDatabase()
  return cosmos
}

module.exports = cosmos
