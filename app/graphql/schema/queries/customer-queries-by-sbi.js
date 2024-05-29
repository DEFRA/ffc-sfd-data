const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const customerQueriesBySbi = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueries n WHERE n.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    sbi: args.sbi,
    customerQueries: response.resources.map((x) => ({
      id: x.id,
      crn: x.crn,
      sbi: x.sbi,
      heading: x.heading,
      body: x.body
    }))
  }
}

module.exports = {
  customerQueriesBySbi
}
