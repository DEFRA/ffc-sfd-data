const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const allCustomerQueryTickets = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const responseQuerySpec = {
      query: 'SELECT * FROM customerQueryResponse cq ORDER BY cq._ts ASC'
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(responseQuerySpec)
      .fetchAll()

    const groupedResponses = response.resources.reduce((acc, x) => {
      if (!acc[x.ticketId]) {
        acc[x.ticketId] = {
          ticketId: x.ticketId,
          customerQueryResponses: []
        }
      }

      acc[x.ticketId].customerQueryResponses.push({
        code: 200,
        success: true,
        message: 'Query to Cosmos DB has been successful.',
        id: x.id,
        ticketId: x.ticketId,
        timestamp: convertCosmosTimestamp(x._ts),
        internalUser: x.internalUser,
        name: x.name,
        heading: x.heading,
        body: x.body
      })
      return acc
    }, {})

    const originalQueries = await Promise.all(Object.keys(groupedResponses).map(async (ticketId) => {
      const originalQuerySpec = {
        query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId',
        parameters: [{ name: '@ticketId', value: ticketId }]
      }

      const originalQueryResponse = await queriesDatabase
        .container(cosmosConfig.queriesContainer)
        .items.query(originalQuerySpec)
        .fetchAll()

      const originalQuery = originalQueryResponse.resources[0]

      return {
        ...groupedResponses[ticketId],
        code: 200,
        success: true,
        message: 'Query to Cosmos DB has been successful.',
        timestamp: convertCosmosTimestamp(originalQuery?._ts),
        internalUser: originalQuery?.internalUser,
        name: originalQuery?.name,
        crn: originalQuery?.crn,
        sbi: originalQuery?.sbi,
        id: originalQuery?.id,
        heading: originalQuery?.heading,
        body: originalQuery?.body
      }
    }))

    return {
      originalCustomerQueryTickets: originalQueries
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  allCustomerQueryTickets
}
