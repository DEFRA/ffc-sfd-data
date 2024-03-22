const typeDefs = `#graphql
type Query {
  personOrganisations: personOrganisations
}

type Organisation {
  id: Int
  sbi: String
  name: String
}

type personOrganisations {
  crn: String
  organisations: [Organisation]
}
`

module.exports = { typeDefs }
