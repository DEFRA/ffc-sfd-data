const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const allCustomerQueryTickets = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq ORDER BY cq._ts ASC'
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    return {
      status: {
        code: 200,
        success: true,
        message: 'Customer query tickets retrieved successfully from Cosmos DB'
      },
      customerQueryTickets: response.resources.map((x) => ({
        id: x.id,
        internalUser: x.internalUser,
        timestamp: convertCosmosTimestamp(x._ts),
        name: x.name,
        crn: x.crn,
        sbi: x.sbi,
        heading: x.heading,
        body: x.body,
        responses: x.responses
      }))
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  allCustomerQueryTickets
}
