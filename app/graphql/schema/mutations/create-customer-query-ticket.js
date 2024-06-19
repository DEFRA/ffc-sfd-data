const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')
const { v4: uuidv4 } = require('uuid')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const newTicketId = uuidv4()

  const item = {
    ticketId: newTicketId,
    internalUser: false,
    crn: args.crn,
    sbi: args.sbi,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    ticketId: response.resource.ticketId,
    _ts: convertCosmosTimestamp(response.resource._ts),
    internalUser: response.resource.internalUser,
    crn: response.resource.crn,
    sbi: response.resource.sbi,
    id: response.resource.id,
    heading: response.resource.heading,
    body: response.resource.body
  }
}

module.exports = {
  createCustomerQueryTicket
}
