const {
  personOrganisations,
  person,
  organisation,
  permissions,
  notification,
  notificationsBySbi
} = require('./queries')

const resolvers = {
  Query: {
    personOrganisations,
    person,
    organisation,
    permissions,
    notification,
    notificationsBySbi
  }
}

module.exports = { resolvers }
