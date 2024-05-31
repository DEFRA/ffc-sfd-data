const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

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
  return {
    id: response.resources[0]?.id,
    crn: response.resources[0]?.crn,
    sbi: response.resources[0]?.sbi,
    heading: response.resources[0]?.heading,
    body: response.resources[0]?.body
  }
}

module.exports = {
  customerQuery
}
