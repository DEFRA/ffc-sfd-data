const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const allCustomerQueryTickets = async (_root, args, context) => {
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
      ticketId: x.id,
      crn: x.crn,
      sbi: x.sbi,
      heading: x.heading,
      body: x.body
    }))
  }
}

module.exports = {
  allCustomerQueryTickets
}
