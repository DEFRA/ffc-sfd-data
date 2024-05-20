const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const notification = async (_root, args, context) => {
  const { messagesDatabase } = await cosmos()
  const querySpec =
    {
      query: 'SELECT * FROM notifications n WHERE n.id = @id',
      parameters: [
        { name: '@id', value: `${args.id}` }
      ]
    }
  const response = await messagesDatabase.container(cosmosConfig.messagesContainer).items.query(querySpec).fetchAll()

  return {
    id: response.resources[0]?.id,
    scheme: response.resources[0]?.scheme,
    tags: response.resources[0]?.tags,
    crn: response.resources[0]?.crn,
    sbi: response.resources[0]?.sbi,
    heading: response.resources[0]?.heading,
    body: response.resources[0]?.body,
    requestedDate: response.resources[0]?.requestedDate
  }
}

module.exports = {
  notification
}
