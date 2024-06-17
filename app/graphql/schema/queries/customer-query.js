const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQuery cq WHERE cq.id = @id',
    parameters: [{ name: '@id', value: `${args.id}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  const resource = response.resources[0]
  const ukTimestamp = resource ? convertCosmosTimestamp(resource._ts) : null

  return {
    id: response.resources[0]?.id,
    _ts: ukTimestamp,
    internalUser: response.resources[0]?.internalUser,
    heading: response.resources[0]?.heading,
    body: response.resources[0]?.body
  }
}

module.exports = {
  customerQuery
}
