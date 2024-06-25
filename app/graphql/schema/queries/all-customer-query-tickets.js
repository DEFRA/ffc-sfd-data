const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const allCustomerQueryTickets = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.originalQuery = true ORDER BY cq._ts ASC'
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    return {
      originalCustomerQueryTickets: response.resources.map((x) => ({
        code: 200,
        success: true,
        message: 'Query to Cosmos DB has been successful',
        originalQuery: x.originalQuery,
        ticketId: x.ticketId,
        timestamp: convertCosmosTimestamp(x._ts),
        internalUser: x.internalUser,
        name: x.name,
        crn: x.crn,
        sbi: x.sbi,
        id: x.id,
        heading: x.heading,
        body: x.body
      }))
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  allCustomerQueryTickets
}
