const typeDefs = `#graphql
type Query {
  personOrganisations: PersonOrganisations
}

type Query {
  person: Person
}

type Query {
  organisation(organisationId: Int!): Organisation
}

type Query {
  permissions(organisationId: Int!, personId: Int!): Permissions
}

type Query {
  notification(id: String!): Notification
}

type Query {
  notificationsBySbi(sbi: String!): NotificationsBySbi
}

type Query {
  applicationsBySbi(sbi: String!): ApplicationsBySbi
}

type Query {
  payments(sbi: String!): Payments
}

type Query {
  preferences(sbi: String!): Preferences
}

type Query {
  customerQuery(id: String!): CustomerQuery
}

type Query {
  allCustomerQueries: AllCustomerQueries
}

type Permissions {
  role: String
  privileges: [String]
}

type Organisation {
  id: Int
  sbi: String
  vendor: String
  trader: String
  name: String
  landline: String
  mobile: String
  email: String
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
  address1: String
  address2: String
  address3: String
  address4: String
  address5: String
  city: String
  county: String
  postcode: String
  country: String
  fullAddress: String
}

type Person {
  id: Int
  crn: String
  title: String
  firstName: String
  lastName: String
  fullName: String
  landline: String
  mobile: String
  email: String
  address: Address
  doNotContact: Boolean
  locked: Boolean
}

type Notification {
  id: String
  scheme: String
  tags: [String]
  crn: String
  sbi: String
  heading: String
  body: String
  requestedDate: String
}

type NotificationsBySbi {
  sbi: String!
  notifications: [Notification]
}

type Application {
  id: Int
  content: String
}

type ApplicationsBySbi {
  sbi: String!
  applications: [Application]
}

type Payments {
  sbi: String!
  payments: [Payment]
}

type Payment {
  id: Int
  content: String
}

type Preferences {
  sbi: String!
  preferences: [Preference]
}

type Preference {
  id: Int
  content: String
}

type CustomerQuery {
  id: String
  content: String
}

type AllCustomerQueries {
  customerQueries: [CustomerQuery]
}
`

module.exports = { typeDefs }
