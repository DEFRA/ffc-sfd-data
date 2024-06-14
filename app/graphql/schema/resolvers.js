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
  CustomerQuery: {
    timestamp: (parent, args, context, info) => {
      return new Date().toISOString()
    }
  }
}

module.exports = { resolvers }
