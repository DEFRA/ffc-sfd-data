const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const updateCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId',
    parameters: [{ name: '@ticketId', value: `${args.ticketId}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  const item = response.resources[0]

  item.responses.unshift({
    internalUser: args.internalUser,
    name: args.name,
    heading: args.heading,
    body: args.body,
    timestamp: new Date().toISOString()
  })

  const upsertResponse = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.upsert(item)

  return {
    code: upsertResponse.statusCode,
    success: true,
    message: '',
    ticketId: upsertResponse.resource.ticketId,
    timestamp: upsertResponse.resource.timestamp,
    crn: upsertResponse.resource.crn,
    sbi: upsertResponse.resource.sbi,
    responses: upsertResponse.resource.responses
  }
}

module.exports = {
  updateCustomerQueryTicket
}
