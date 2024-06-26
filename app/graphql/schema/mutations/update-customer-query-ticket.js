const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')
const { generateTimestamp } = require('../../../utils')

const updateCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.id = @id',
    parameters: [{ name: '@id', value: `${args.id}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

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
    id: upsertResponse.resource.id,
    originalQuery: upsertResponse.resource.originalQuery,
    internalUser: upsertResponse.resource.internalUser,
    timestamp: convertCosmosTimestamp(upsertResponse.resource._ts),
    name: upsertResponse.resource.name,
    crn: upsertResponse.resource.crn,
    sbi: upsertResponse.resource.sbi,
    heading: upsertResponse.resource.heading,
    body: upsertResponse.resource.body,
    responses: upsertResponse.resource.responses
  }
}

module.exports = {
  updateCustomerQueryTicket
}
