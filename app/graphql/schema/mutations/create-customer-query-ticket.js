const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { generateTimestamp } = require('../../../utils')

const createCustomerQueryTicket = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const item = {
    timestamp: generateTimestamp(),
    internalUser: false,
    name: args.name,
    crn: args.crn,
    sbi: args.sbi,
    heading: args.heading,
    body: args.body,
    responses: []
  }

  const response = await queriesDatabase
    .container(cosmosConfig.queriesContainer)
    .items.create(item)

  return {
    status: {
      code: response.statusCode,
      success: response.statusCode >= 200 && response.statusCode < 300,
      message: response.statusCode >= 200 && response.statusCode < 300 ? 'Customer query ticket created successfully' : response.messages[0].message
    },
    customerQueryTicket: {
      ...response.resource
    }
  }
}

module.exports = {
  createCustomerQueryTicket
}
