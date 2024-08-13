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
  customerQueryTicketById,
  filesMetadata
} = require('./queries')

const {
  createCustomerQueryTicket,
  updateCustomerQueryTicket,
  createFileMetadata
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
    customerQueryTicketById,
    filesMetadata
  },
  Mutation: {
    createCustomerQueryTicket,
    updateCustomerQueryTicket,
    createFileMetadata
  }
}

module.exports = { resolvers }
