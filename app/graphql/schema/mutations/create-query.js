const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const createQuery = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()
  const item = {
    crn: args.crn,
    sbi: args.sbi,
    heading: args.heading,
    body: args.body
  }
  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    code: response.statusCode,
    success: response.statusCode >= 200 && response.statusCode < 300,
    message: response.statusCode >= 200 && response.statusCode < 300 ? 'Query created successfully' : response.messages[0].message,
    customerQuery: response.resource
  }
}

module.exports = {
  createQuery
}
