const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const createCustomerQueryResponse = async (_root, args, context) => {
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
    .items.create(item)

  const success = response.statusCode >= 200 && response.statusCode < 300
  const message = success ? 'Customer query response created successfully' : response.messages[0].message

  return {
    code: response.statusCode,
    success,
    message,
    ...response.resource,
    _ts: convertCosmosTimestamp(response.resource._ts)
  }
}

module.exports = {
  createCustomerQueryResponse
}
