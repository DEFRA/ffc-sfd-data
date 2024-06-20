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
      throw new Error('id is must be provided.')
    }

    if (!response.resources.length) {
      throw new Error(`No customer query response data found for id ${args.id}`)
    }

    const resource = response.resources[0]
    const ukTimestamp = resource ? convertCosmosTimestamp(resource._ts) : null

    return {
      id: response.resources[0]?.id,
      ticketId: response.resources[0]?.ticketId,
      _ts: ukTimestamp,
      internalUser: response.resources[0]?.internalUser,
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
