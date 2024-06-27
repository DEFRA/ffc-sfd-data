const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueryTicketById = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const responseQuerySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.id = @id',
      parameters: [{ name: '@id', value: `${args.id}` }]
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(responseQuerySpec)
      .fetchAll()

    if (!args.id) {
      throw new Error('id is must be provided')
    }

    if (!response.resources.length) {
      throw new Error(`No customer query data found for id ${args.id}`)
    }

    return {
      status: {
        code: 200,
        success: true,
        message: 'Customer query ticket retrieved successfully from Cosmos DB'
      },
      customerQueryTicket: {
        id: response.resources[0].id,
        internalUser: response.resources[0].internalUser,
        timestamp: convertCosmosTimestamp(response.resources[0]._ts),
        name: response.resources[0].name,
        crn: response.resources[0].crn,
        sbi: response.resources[0].sbi,
        heading: response.resources[0].heading,
        body: response.resources[0].body,
        responses: response.resources[0].responses
      }
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  customerQueryTicketById
}
