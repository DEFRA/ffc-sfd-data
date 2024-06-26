const typeDefs = `#graphql

type Query {
  personOrganisations: PersonOrganisations
  person: Person
  organisation(organisationId: Int!): Organisation
  permissions(organisationId: Int!, personId: Int!): Permissions
  notification(id: String!): Notification
  notificationsBySbi(sbi: String!): NotificationsBySbi
  applicationsBySbi(sbi: String!): ApplicationsBySbi
  payments(sbi: String!): Payments
  preferences(sbi: String!): Preferences
  allCustomerQueryTickets: AllCustomerQueryTickets
  customerQueryTicketsBySbi(sbi: String!): CustomerQueryTicketsBySbi
  customerQueryTicketById(id: String!): CustomerQueryTicket
}

type Mutation {
  createCustomerQueryTicket(
    name: String
    crn: String
    sbi: String
    heading: String
    body: String
  ): CustomerQueryTicket

  updateCustomerQueryTicket(
    id: String!
    internalUser: Boolean
    name: String
    heading: String
    body: String
  ): CustomerQueryTicket
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

type Responses {
  internalUser: Boolean
  name: String
  heading: String
  body: String
}

type CustomerQueryTicket {
  id: String
  internalUser: Boolean
  timestamp: String
  name: String
  crn: String
  sbi: String
  heading: String
  body: String
  responses: [Responses]
}

type CustomerQueryTicketsBySbi {
  customerQueryTickets: [CustomerQueryTicket]
}

type AllCustomerQueryTickets {
  customerQueryTickets: [CustomerQueryTicket]
}
`

module.exports = { typeDefs }
