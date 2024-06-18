const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueriesByTicketId = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueries cq WHERE cq.ticketId = @ticketId ORDER BY cq._ts DESC',
    parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    ticketId: args.ticketId,
    crn: response.resources[0]?.crn,
    sbi: response.resources[0]?.sbi,
    customerQueries: response.resources.map((x) => ({
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
