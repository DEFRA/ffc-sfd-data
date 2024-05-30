const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const customerQueryResponsesBySbi = async (_root, args, context) => {
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
    customerQueryResponses: response.resources.map((x) => ({
      id: x.id,
      crn: x.crn,
      sbi: x.sbi,
      responseHeading: x.responseHeading,
      responseBody: x.responseBody
    }))
  }
}

module.exports = {
  customerQueryResponsesBySbi
}
