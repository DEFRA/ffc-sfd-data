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
    code: response.statusCode,
    success: response.statusCode >= 200 && response.statusCode < 300,
    message: response.statusCode >= 200 && response.statusCode < 300 ? 'Query ticket created successfully' : response.messages[0].message,
    customerQueryTicket: response.resource
  }
}

module.exports = {
  createCustomerQueryTicket
}
