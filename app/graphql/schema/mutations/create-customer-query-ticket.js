const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    internalUser: false,
    name: args.name,
    crn: args.crn,
    sbi: args.sbi,
    heading: args.heading,
    body: args.body,
    responses: []
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    ...response.resource,
    timestamp: convertCosmosTimestamp(response.resource._ts),
    status: {
      code: response.statusCode,
      success: response.statusCode >= 200 && response.statusCode < 300,
      message: response.statusCode >= 200 && response.statusCode < 300 ? 'Customer query ticket created successfully' : response.messages[0].message
    }
  }
}

module.exports = {
  createCustomerQueryTicket
}
