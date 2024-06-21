// const cosmos = require('../../../cosmos')
// const { cosmosConfig } = require('../../../config')
// const { convertCosmosTimestamp } = require('../../../utils')

// const customerQueryTicketsBySbi = async (_root, { sbi }, context) => {
//   try {
//     const { queriesDatabase } = await cosmos()

//     const responseQuerySpec = {
//       query: 'SELECT * FROM customerQueryResponse cq WHERE cq.sbi = @sbi ORDER BY cq._ts DESC',
//       parameters: [{ name: '@sbi', value: sbi }]
//     }

//     const response = await queriesDatabase
//       .container(cosmosConfig.queriesContainer)
//       .items.query(responseQuerySpec)
//       .fetchAll()

//     const groupedResponses = response.resources.reduce((acc, x) => {
//       if (!acc[x.ticketId]) {
//         acc[x.ticketId] = {
//           ticketId: x.ticketId,
//           customerQueryResponses: []
//         }
//       }

//       acc[x.ticketId].customerQueryResponses.push({
//         code: 200,
//         success: true,
//         message: 'Query to Cosmos DB has been successful',
//         id: x.id,
//         ticketId: x.ticketId,
//         _ts: convertCosmosTimestamp(x._ts),
//         internalUser: x.internalUser,
//         name: x.name,
//         heading: x.heading,
//         body: x.body
//       })
//       return acc
//     }, {})

//     const originalQueries = await Promise.all(Object.keys(groupedResponses).map(async (ticketId) => {
//       const originalQuerySpec = {
//         query: 'SELECT * FROM customerQueryResponse cq WHERE cq.ticketId = @ticketId ORDER BY cq._ts ASC',
//         parameters: [{ name: '@ticketId', value: ticketId }]
//       }

//       const originalQueryResponse = await queriesDatabase
//         .container(cosmosConfig.queriesContainer)
//         .items.query(originalQuerySpec)
//         .fetchAll()

//       const originalQuery = originalQueryResponse.resources[0]

//       return {
//         ...groupedResponses[ticketId],
//         code: 200,
//         success: true,
//         message: 'Query to Cosmos DB has been successful',
//         _ts: convertCosmosTimestamp(originalQuery?._ts),
//         internalUser: originalQuery?.internalUser,
//         name: originalQuery?.name,
//         crn: originalQuery?.crn,
//         sbi: originalQuery?.sbi,
//         id: originalQuery?.id,
//         heading: originalQuery?.heading,
//         body: originalQuery?.body
//       }
//     }))

//     return {
//       customerQueriesByTicketId: originalQueries
//     }
//   } catch (error) {
//     throw new Error(`Query failed: ${error.message}`)
//   }
// }

// module.exports = {
//   customerQueryTicketsBySbi
// }

const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')
const { convertCosmosTimestamp } = require('../../../utils')

const customerQueryTicketsBySbi = async (_root, args, context) => {
  try {
    const { queriesDatabase } = await cosmos()

    const querySpec = {
      query: 'SELECT * FROM customerQueryResponse cq WHERE cq.sbi = @sbi ORDER BY cq._ts DESC',
      parameters: [{ name: '@sbi', value: `${args.sbi}` }]
    }

    const response = await queriesDatabase
      .container(cosmosConfig.queriesContainer)
      .items.query(querySpec)
      .fetchAll()

    if (!args.sbi) {
      throw new Error('SBI must be provided')
    }

    if (!response.resources.length) {
      return {
        code: 4040,
        success: false,
        message: `No customer query data found for SBI ${args.sbi}`
      }
    }

    return {
      originalCustomerQueryTickets: response.resources.map((x) => ({
        code: 200,
        success: true,
        message: 'Query to Cosmos DB has been successful',
        ticketId: x.ticketId,
        _ts: convertCosmosTimestamp(x._ts),
        internalUser: x.internalUser,
        name: x.name,
        crn: x.crn,
        sbi: x.sbi,
        id: x.id,
        heading: x.heading,
        body: x.body
      }))
    }
  } catch (error) {
    throw new Error(`Query failed: ${error.message}`)
  }
}

module.exports = {
  customerQueryTicketsBySbi
}