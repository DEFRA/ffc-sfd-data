const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { v4: uuidv4 } = require('uuid')

const createCustomerQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const newTicketId = args.ticketId || uuidv4()

  const item = {
    id: args.id,
    ticketId: newTicketId,
    _ts: new Date().toISOString(),
    internalUser: args.internalUser,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    code: response.statusCode,
    success: response.statusCode >= 200 && response.statusCode < 300,
    message: response.statusCode >= 200 && response.statusCode < 300 ? 'Query created successfully' : response.messages[0].message,
    customerQuery: response.resource
  }
}

module.exports = {
  createCustomerQuery
}
