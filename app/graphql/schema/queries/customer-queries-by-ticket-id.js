const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueriesByTicketId = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const responseQuerySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId ORDER BY cq._ts DESC',
    parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(responseQuerySpec)
    .fetchAll()

  const originalQuerySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId',
    parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
  }

  const originalQueryResponse = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(originalQuerySpec)
    .fetchAll()

  const originalQuery = originalQueryResponse.resources[0]

  return {
    ticketId: args.ticketId,
    _ts: convertCosmosTimestamp(originalQuery?._ts),
    internalUser: originalQuery?.internalUser,
    crn: originalQuery?.crn,
    sbi: originalQuery?.sbi,
    id: originalQuery?.id,
    heading: originalQuery?.heading,
    body: originalQuery?.body,
    customerQueryResponses: response.resources.map((x) => ({
      id: x.id,
      ticketId: x.ticketId,
      _ts: convertCosmosTimestamp(x._ts),
      internalUser: x.internalUser,
      heading: x.heading,
      body: x.body
    }))
  }
}

module.exports = {
  customerQueriesByTicketId
}
