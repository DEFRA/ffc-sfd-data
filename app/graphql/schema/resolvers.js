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
  filesMetadataBySbi
} = require('./queries')

const {
  createCustomerQueryTicket,
  updateCustomerQueryTicket,
  deleteFileMetadataByBlobReference
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
    filesMetadataBySbi
  },
  Mutation: {
    createCustomerQueryTicket,
    updateCustomerQueryTicket,
    deleteFileMetadataByBlobReference
  }
}

module.exports = { resolvers }
