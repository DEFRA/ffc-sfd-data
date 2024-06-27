const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueryTicketsBySbi = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.sbi = @sbi ORDER BY cq._ts DESC',
      parameters: [{ name: '@sbi', value: `${args.sbi}` }]
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    if (!args.sbi) {
      throw new Error('SBI must be provided')
    }

    if (!response.resources.length) {
      throw new Error(`No customer query data found for SBI ${args.sbi}`)
    }

    return {
      status: {
        code: 200,
        success: true,
        message: 'Customer query ticket(s) retrieved successfully from Cosmos DB'
      },
      customerQueryTickets: response.resources.map((x) => ({
        id: x.id,
        timestamp: convertCosmosTimestamp(x._ts),
        internalUser: x.internalUser,
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
  customerQueryTicketsBySbi
}
