const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { customerQueriesByTicketId } = require('../queries')

const updateCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    ticketId: args.ticketId,
    internalUser: args.internalUser,
    name: args.name,
    heading: args.heading,
    body: args.body
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.upsert(item)

  const success = response.statusCode >= 200 && response.statusCode < 300
  const message = success ? 'Customer query ticket updated successfully with new response' : response.messages[0].message
  const customerQueryResponse = await customerQueriesByTicketId(null, { ticketId: args.ticketId }, context)

  return {
    code: response.statusCode,
    success,
    message,
    ticketId: args.ticketId,
    _ts: customerQueryResponse._ts,
    crn: customerQueryResponse.crn,
    sbi: customerQueryResponse.sbi,
    customerQueryResponses: customerQueryResponse.customerQueryResponses
  }
}

module.exports = {
  updateCustomerQueryTicket
}
