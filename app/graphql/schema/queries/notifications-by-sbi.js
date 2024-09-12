import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'

const notificationsBySbi = async (_root, args, context) => {
  const { messagesDatabase } = await cosmos()
  const querySpec = {
    query: 'SELECT * FROM notifications n WHERE n.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }
  const response = await messagesDatabase
    .container(cosmosConfig.messagesContainer)
    .items.query(querySpec)
    .fetchAll()
  return {
    sbi: args.sbi,
    notifications: response.resources.map((x) => ({
      id: x.id,
      scheme: x.scheme,
      tags: x.tags,
      crn: x.crn,
      sbi: x.sbi,
      heading: x.heading,
      body: x.body,
      requestedDate: x.requestedDate
    }))
  }
}

export default {
  notificationsBySbi
}
