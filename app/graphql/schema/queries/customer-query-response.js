const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const customerQueryResponse = async (_root, args, context) => {
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
    crn: response.resources[0]?.crn,
    sbi: response.resources[0]?.sbi,
    responseHeading: response.resources[0]?.responseHeading,
    responseBody: response.resources[0]?.responseBody
  }
}

module.exports = {
  customerQueryResponse
}
