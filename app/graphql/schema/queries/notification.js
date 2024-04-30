const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const notification = async (_root, args, context) => {
  const { messagesDatabase } = await cosmos()
  const querySpec =
    {
      query: 'SELECT * FROM notifications n WHERE n.id = @id',
      parameters: [
        { name: '@id', value: `${args.notificationId}` }
      ]
    }
  const response = await messagesDatabase.container(cosmosConfig.messagesContainer).items.query(querySpec).fetchAll()
  return response.resources[0]
}

module.exports = {
  notification
}
