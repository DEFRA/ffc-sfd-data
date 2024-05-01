const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const notificationsBySbi = async (_root, args, context) => {
  const { messagesDatabase } = await cosmos()
  const querySpec =
    {
      query: 'SELECT * FROM notifications n WHERE n.sbi = @sbi',
      parameters: [
        { name: '@sbi', value: `${args.sbi}` }
      ]
    }
  const response = await messagesDatabase.container(cosmosConfig.messagesContainer).items.query(querySpec).fetchAll()
  return {
    sbi: args.sbi,
    notifications: response.resources.map(x => ({
      id: x.id,
      content: x.content
    }))
  }
}

module.exports = {
  notificationsBySbi
}
