const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')
const { v4: uuidv4 } = require('uuid')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    ticketId: uuidv4(),
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
    timestamp: convertCosmosTimestamp(response.resource._ts)
  }
}

module.exports = {
  createCustomerQueryTicket
}
