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
  allCustomerQueries
} = require('./queries')

const { timestamp } = require('./custom-scalar-types')

const resolvers = {
  Timestamp: timestamp,
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
    allCustomerQueries
  }
}

module.exports = { resolvers }
