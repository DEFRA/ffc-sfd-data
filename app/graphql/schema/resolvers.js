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
  customerQueriesBySbi,
  allCustomerQueries,
  customerQueryResponse,
  customerQueryResponsesBySbi
} = require('./queries')

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
    customerQueriesBySbi,
    allCustomerQueries,
    customerQueryResponse,
    customerQueryResponsesBySbi
  }
}

module.exports = { resolvers }
