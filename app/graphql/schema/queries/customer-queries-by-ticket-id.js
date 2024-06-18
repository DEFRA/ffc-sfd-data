const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueriesByTicketId = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId ORDER BY cq._ts DESC',
    parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    ticketId: args.ticketId,
    _ts: convertCosmosTimestamp(response.resources[0]?._ts),
    crn: response.resources[0]?.crn,
    sbi: response.resources[0]?.sbi,
    heading: response.resources[0]?.heading,
    body: response.resources[0]?.body,
    customerQueryResponses: response.resources.map((x) => ({
      id: x.id,
      ticketId: x.ticketId,
      _ts: convertCosmosTimestamp(x._ts),
      internalUser: x.internalUser,
      responseHeading: x.responseHeading,
      responseBody: x.responseBody
    }))
  }
}

module.exports = {
  customerQueriesByTicketId
}
