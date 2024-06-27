const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { generateTimestamp } = require('../../../utils')

const updateCustomerQueryTicket = async (_root, args, context) => {
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
      throw new Error('Must provide an id (id cannot be null)')
    }

    if (!response.resources || response.resources.length === 0) {
      throw new Error(`No customer query data found for id: ${args.id} (ticket does not exist)`)
    }

    const item = response.resources[0]

    if (!item.responses) {
      item.responses = []
    }

    item.responses.unshift({
      timestamp: generateTimestamp(),
      internalUser: args.internalUser,
      name: args.name,
      heading: args.heading,
      body: args.body
    })

    const upsertResponse = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.upsert(item)

    return {
      status: {
        code: upsertResponse.statusCode,
        success: upsertResponse.statusCode >= 200 && upsertResponse.statusCode < 300,
        message: upsertResponse.statusCode >= 200 && upsertResponse.statusCode < 300 ? 'Customer query ticket updated successfully' : upsertResponse.messages[0].message
      },
      customerQueryTicket: {
        id: upsertResponse.resource.id,
        originalQuery: upsertResponse.resource.originalQuery,
        internalUser: upsertResponse.resource.internalUser,
        timestamp: upsertResponse.resource.timestamp,
        name: upsertResponse.resource.name,
        crn: upsertResponse.resource.crn,
        sbi: upsertResponse.resource.sbi,
        heading: upsertResponse.resource.heading,
        body: upsertResponse.resource.body,
        responses: upsertResponse.resource.responses
      }
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  updateCustomerQueryTicket
}
