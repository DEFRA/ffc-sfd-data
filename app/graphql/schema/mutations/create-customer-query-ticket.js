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
    name: args.name,
    crn: args.crn,
    sbi: args.sbi,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  const success = response.statusCode >= 200 && response.statusCode < 300
  const message = success ? 'Customer query ticket created successfully' : response.messages[0].message

  return {
    code: response.statusCode,
    success,
    message,
    ...response.resource,
    timestamp: convertCosmosTimestamp(response.resource._ts)
  }
}

module.exports = {
  createCustomerQueryTicket
}
