const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueriesByTicketId = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const responseQuerySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId ORDER BY cq._ts DESC',
      parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(responseQuerySpec)
      .fetchAll()

    if (!args.ticketId) {
      throw new Error('ticketId is must be provided')
    }

    const originalQuerySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId',
      parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
    }

    const originalQueryResponse = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(originalQuerySpec)
      .fetchAll()

    if (!originalQueryResponse.resources.length) {
      return {
        code: 404,
        success: false,
        message: `No customer query data found for ticketId ${args.ticketId}`
      }
    }

    const originalQuery = originalQueryResponse.resources[0]

    return {
      code: 200,
      success: true,
      message: 'Query to Cosmos DB has been successful',
      ticketId: args.ticketId,
      _ts: convertCosmosTimestamp(originalQuery?._ts),
      crn: originalQuery?.crn,
      sbi: originalQuery?.sbi,
      customerQueryResponses: response.resources.map((x) => ({
        code: 200,
        success: true,
        message: 'Query to Cosmos DB has been successful',
        id: x.id,
        ticketId: x.ticketId,
        _ts: convertCosmosTimestamp(x._ts),
        internalUser: x.internalUser,
        name: x.name,
        heading: x.heading,
        body: x.body
      }))
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  customerQueriesByTicketId
}
