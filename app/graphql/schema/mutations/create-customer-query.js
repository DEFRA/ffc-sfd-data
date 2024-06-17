const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { v4: uuidv4 } = require('uuid')

const createCustomerQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const newTicketId = args.ticketId || uuidv4()

  const newCustomerQuery = {
    id: args.id,
    ticketId: newTicketId,
    _ts: new Date().toISOString(),
    internalUser: args.internalUser,
    heading: args.heading,
    body: args.body
  }

  await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(newCustomerQuery)

  return newCustomerQuery
}

module.exports = {
  createCustomerQuery
}
