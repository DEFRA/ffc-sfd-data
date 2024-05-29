const {
  applicationsBySbi,
  notification,
  notificationsBySbi,
  // customerQuery,
  // allCustomerQueries,
  organisation,
  permissions,
  personOrganisations,
  person,
  payments,
  preferences
} = require('./queries')

const resolvers = {
  Query: {
    applicationsBySbi,
    notification,
    notificationsBySbi,
    // customerQuery,
    // allCustomerQueries,
    organisation,
    payments,
    permissions,
    personOrganisations,
    person,
    preferences
  }
}

module.exports = { resolvers }
