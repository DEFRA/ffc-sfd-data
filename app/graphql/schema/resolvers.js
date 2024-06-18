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
  customerQuery,
  customerQueriesByTicketId,
  allCustomerQueryTickets
} = require('./queries')

const {
  createCustomerQuery,
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
    customerQuery,
    customerQueriesByTicketId,
    allCustomerQueryTickets
  },
  Mutation: {
    createCustomerQuery,
    createCustomerQueryTicket
  }
}

module.exports = { resolvers }
