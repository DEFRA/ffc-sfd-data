const { applicationsDatabase } = require('./databases/applications')
const { messagesDatabase } = require('./databases/messages')
const { paymentsDatabase } = require('./databases/payments')
const { preferencesDatabase } = require('./databases/preferences')

const cosmos = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  cosmos.paymentsDatabase = await paymentsDatabase()
  cosmos.applicationsDatabase = await applicationsDatabase()
  cosmos.preferencesDatabase = await preferencesDatabase()
  return cosmos
}

module.exports = cosmos
