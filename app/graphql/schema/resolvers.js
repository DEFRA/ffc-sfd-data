const { personOrganisations, person, organisation, permissions } = require('./queries')

const resolvers = {
  Query: {
    personOrganisations,
    person,
    organisation,
    permissions
  }
}

module.exports = { resolvers }
