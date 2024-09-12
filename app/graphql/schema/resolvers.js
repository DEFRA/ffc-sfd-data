import {
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
} from './queries/index.js'

import {
  createCustomerQueryTicket,
  updateCustomerQueryTicket,
  deleteFileMetadataByBlobReference
} from './mutations/index.js'

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

export default { resolvers }
