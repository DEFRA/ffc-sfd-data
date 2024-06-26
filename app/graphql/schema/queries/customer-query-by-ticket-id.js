const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueryByTicketId = async (_root, args, context) => {
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

    return {
      code: 200,
      success: true,
      message: 'Query to Cosmos DB has been successful',
      ticketId: 'abc',
      crn: 'abc',
      sbi: 'abc',
      responses: [{ name: 'abc', heading: 'abc', body: 'abc', timestamp: 'abc' }]
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  customerQueryByTicketId
}
