const { timestamp } = require('./custom-scalar-types')

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
    allCustomerQueries
  },
  Timestamp: timestamp
}

module.exports = { resolvers }
