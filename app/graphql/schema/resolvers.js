const { personOrganisations, person, organisation, permissions, notification } = require('./queries')

const resolvers = {
  Query: {
    personOrganisations,
    person,
    organisation,
    permissions,
    notification
  }
}

module.exports = { resolvers }
