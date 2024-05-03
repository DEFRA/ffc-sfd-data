const { messagesDatabase } = require('./messages-database')
const { applicationsDatabase } = require('./applications-database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  cosmos.applicationsDatabase = await applicationsDatabase()
  return cosmos
}

module.exports = cosmos
