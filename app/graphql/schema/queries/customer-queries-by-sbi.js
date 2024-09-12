import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'

const customerQueryTicketsBySbi = async (_root, args, context) => {
  const { queriesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM customerQueryResponse cq WHERE cq.sbi = @sbi ORDER BY cq._ts DESC',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
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
}

export { customerQueryTicketsBySbi }
