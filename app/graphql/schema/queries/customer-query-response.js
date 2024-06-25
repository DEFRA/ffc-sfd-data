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
      throw new Error(`No customer query data found for id ${args.id}`)
    }

    const resource = response.resources[0]
    const ukTimestamp = convertCosmosTimestamp(resource._ts)
    const success = response.statusCode >= 200 && response.statusCode < 300
    const message = success ? 'Query to Cosmos DB has been successful' : response.messages[0].message

    return {
      code: response.statusCode,
      success,
      message,
      ticketId: response.resources[0]?.ticketId,
      id: response.resources[0]?.id,
      timestamp: ukTimestamp,
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
