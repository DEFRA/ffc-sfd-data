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
  customerQueryResponse,
  customerQueriesByTicketId,
  customerQueryTicketsBySbi,
  allCustomerQueryTickets
} = require('./queries')

const {
  createCustomerQueryResponse,
  createCustomerQueryTicket
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
    customerQueryResponse,
    customerQueriesByTicketId,
    customerQueryTicketsBySbi,
    allCustomerQueryTickets
  },
  Mutation: {
    createCustomerQueryResponse,
    createCustomerQueryTicket
  }
}

module.exports = { resolvers }
