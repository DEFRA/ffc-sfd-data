const { applicationsDatabase } = require('./applications-database')
const { messagesDatabase } = require('./messages-database')
const { paymentsDatabase } = require('./payments-database')
const { preferencesDatabase } = require('./preferences-database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  cosmos.paymentsDatabase = await paymentsDatabase()
  cosmos.applicationsDatabase = await applicationsDatabase()
  cosmos.preferencesDatabase = await preferencesDatabase()
  return cosmos
}

module.exports = cosmos
