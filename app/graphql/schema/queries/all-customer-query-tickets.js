import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'

const allCustomerQueryTickets = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq ORDER BY cq.timestamp ASC'
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    return {
      customerQueryTickets: response.resources.map((x) => ({
        id: x.id,
        timestamp: x.timestamp,
        internalUser: x.internalUser,
        name: x.name,
        crn: x.crn,
        sbi: x.sbi,
        heading: x.heading,
        body: x.body,
        responses: x.responses
      }))
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

export { allCustomerQueryTickets }
