const typeDefs = `#graphql
type Query {
  personOrganisations: PersonOrganisations
}

type Query {
  person: Person
}

type Query {
  organisation(organisationId: organisationId!): Organisation
}

type Query {
  permissions(organisationId: Int!, personId: Int!): Permissions
}

type Permissions {
  roles: [String]
  privileges: [String]
}

type Organisation {
  id: Int
  sbi: String
  vendor: String
  trader: String
  name: String
  landline String
  mobile String
  email String
  address: Address
  locked: Boolean
  type: String
  legalStatus: String
}

type PersonOrganisations {
  crn: String
  organisations: [Organisation]
}

type Address {
  address1 String
  address2 String
  address3 String
  address4 String
  address5 String
  city String
  county String
  postcode String
  country String
}

type Person {
  id Int
  crn String
  title String
  firstName String
  lastName String
  landline String
  mobile String
  email String
  address: Address
  doNotContact Boolean
  locked Boolean
}
`

module.exports = { typeDefs }
