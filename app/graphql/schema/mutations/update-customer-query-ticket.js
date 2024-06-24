const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { customerQueryByTicketId } = require('../queries')

const updateCustomerQueryTicket = async (_root, args, context) => {
  try {
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

    if (!args.ticketId) {
      throw new Error('ticketId must be provided')
    }

    const success = response.statusCode >= 200 && response.statusCode < 300
    const message = success ? 'Customer query ticket updated successfully with new response' : response.messages[0].message
    const customerQueryResponse = await customerQueryByTicketId(null, { ticketId: args.ticketId }, context)

    if (!customerQueryResponse.customerQueryResponses.ticketId) {
      throw new Error(`No customer query found for ticketId: ${args.ticketId}`)
    }

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
  } catch (error) {
    throw new Error(`Mutation failed: ${error.message}`)
  }
}

module.exports = {
  updateCustomerQueryTicket
}
