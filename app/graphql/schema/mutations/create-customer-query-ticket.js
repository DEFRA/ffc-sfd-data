const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')
const { v4: uuidv4 } = require('uuid')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const newTicketId = uuidv4()

  const item = {
    ticketId: newTicketId,
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
    crn: response.resource.crn,
    sbi: response.resource.sbi,
    heading: response.resource.heading,
    body: response.resource.body
  }
}

module.exports = {
  createCustomerQueryTicket
}
