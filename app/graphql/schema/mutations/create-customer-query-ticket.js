const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { v4: uuidv4 } = require('uuid')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const newTicketId = uuidv4()

  const item = {
    ticketId: newTicketId,
    crn: args.crn,
    sbi: args.sbi
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    ticketId: response.resource.ticketId,
    crn: response.resource.crn,
    sbi: response.resource.sbi
  }
}

module.exports = {
  createCustomerQueryTicket
}
