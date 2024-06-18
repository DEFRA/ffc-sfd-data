const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const createCustomerQueryResponse = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    ticketId: args.ticketId,
    internalUser: args.internalUser,
    responseHeading: args.responseHeading,
    responseBody: args.responseBody
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    ticketId: response.resource.ticketId,
    id: response.resource.id,
    _ts: convertCosmosTimestamp(response.resource._ts),
    internalUser: response.resource.internalUser,
    responseHeading: response.resource.responseHeading,
    responseBody: response.resource.responseBody
  }
}

module.exports = {
  createCustomerQueryResponse
}
