const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const createCustomerQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    ticketId: args.ticketId,
    internalUser: args.internalUser,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    id: response.resource.id,
    ticketId: response.resource.ticketId,
    _ts: convertCosmosTimestamp(response.resource._ts),
    internalUser: response.resource.internalUser,
    heading: response.resource.heading,
    body: response.resource.body
  }
}

module.exports = {
  createCustomerQuery
}
