const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const updateCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    ticketId: args.ticketId,
    internalUser: args.internalUser,
    name: args.name,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.upsert(item)

  const success = response.statusCode >= 200 && response.statusCode < 300
  const message = success ? 'Customer query ticket updated successfully' : response.messages[0].message

  return {
    code: response.statusCode,
    success,
    message,
    ticketId: args.ticketId,
    _ts: convertCosmosTimestamp(response.resource._ts),
    crn: args.crn,
    sbi: args.sbi,
    customerQueryResponses: response.resources.map((x) => ({
      code: 200,
      success: true,
      message: 'Query to Cosmos DB has been successful',
      id: x.id,
      ticketId: x.ticketId,
      _ts: convertCosmosTimestamp(x._ts),
      internalUser: x.internalUser,
      name: x.name,
      heading: x.heading,
      body: x.body
    }))
  }
}

module.exports = {
  updateCustomerQueryTicket
}
