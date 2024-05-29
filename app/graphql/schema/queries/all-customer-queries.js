const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const allCustomerQueries = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueries'
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    customerQueries: response.resources.map((x) => ({
      id: x.id,
      content: x.content
    }))
  }
}

module.exports = {
  allCustomerQueries
}