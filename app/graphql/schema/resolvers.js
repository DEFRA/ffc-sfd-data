const { createQuery } = require('./mutations')
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
  Mutation: {
    createQuery
  }

}

module.exports = { resolvers }
