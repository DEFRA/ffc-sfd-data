const {
  applicationsBySbi,
  notification,
  notificationsBySbi,
  organisation,
  permissions,
  personOrganisations,
  person,
  payments,
  preferences,
  allCustomerQueryTickets,
  customerQueryTicketsBySbi,
  customerQueriesByTicketId,
  customerQueryResponse
} = require('./queries')

const {
  createCustomerQueryTicket,
  updateCustomerQueryTicket
} = require('./mutations')

const resolvers = {
  Query: {
    applicationsBySbi,
    notification,
    notificationsBySbi,
    organisation,
    payments,
    permissions,
    personOrganisations,
    person,
    preferences,
    allCustomerQueryTickets,
    customerQueryTicketsBySbi,
    customerQueriesByTicketId,
    customerQueryResponse
  },
  Mutation: {
    createCustomerQueryTicket,
    updateCustomerQueryTicket
  }
}

module.exports = { resolvers }
