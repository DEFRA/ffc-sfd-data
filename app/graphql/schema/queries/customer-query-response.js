const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueryResponse = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.id = @id',
      parameters: [{ name: '@id', value: `${args.id}` }]
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    if (!args.id) {
      throw new Error('id must be provided')
    }

    if (!response.resources.length) {
      return {
        code: 404,
        success: false,
        message: `No customer query response data found for id ${args.id}`
      }
    }

    const resource = response.resources[0]
    const ukTimestamp = resource ? convertCosmosTimestamp(resource._ts) : null

    return {
      code: 200,
      success: true,
      message: 'Query to Cosmos DB has been successful',
      ticketId: response.resources[0]?.ticketId,
      id: response.resources[0]?.id,
      _ts: ukTimestamp,
      internalUser: response.resources[0]?.internalUser,
      name: response.resources[0]?.name,
      heading: response.resources[0]?.heading,
      body: response.resources[0]?.body
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  customerQueryResponse
}
