const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const customerQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQuery n WHERE n.id = @id',
    parameters: [{ name: '@id', value: `${args.id}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    id: response.resources[0]?.id,
    content: response.resources[0]?.content
  }
}

module.exports = {
  customerQuery
}
