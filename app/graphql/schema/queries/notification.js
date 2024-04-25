const cosmos = require('../../cosmos')
const { cosmosConfig } = require('../../../config')

const notifications = async (_root, args, context) => {
  const { messagesDatabase } = await cosmos()
  const response = await messagesDatabase.container(cosmosConfig.messagesContainer).items.readAll().fetchAll()
  // update to return one notifcation only
  return {
    id: '',
    content: {}
  }
}

module.exports = {
  notifications
}
