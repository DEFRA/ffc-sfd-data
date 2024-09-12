import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'
import { generateTimestamp } from '../../../utils/index.js'

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

export default {
  createCustomerQueryTicket
}
