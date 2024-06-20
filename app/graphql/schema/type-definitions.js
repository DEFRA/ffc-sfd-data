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
  customerQueryResponse(id: String!): CustomerQueryResponse
  customerQueriesByTicketId(ticketId: String!): CustomerQueriesByTicketId
  customerQueryTicketsBySbi(sbi: String!): CustomerQueryTicketsBySbi
  allCustomerQueryTickets: AllCustomerQueryTickets
}

type Mutation {
  createCustomerQueryTicket(
    name: String
    crn: String 
    sbi: String
    heading: String
    body: String
  ): CustomerQueriesByTicketId

  createCustomerQueryResponse(
    ticketId: String!
    internalUser: Boolean
    name: String
    heading: String
    body: String
  ): CustomerQueryResponse
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

type CustomerQueryResponse {
  code: Int
  success: Boolean
  message: String
  id: String
  ticketId: String
  _ts: String
  internalUser: Boolean
  name: String
  heading: String
  body: String
}

type CustomerQueriesByTicketId {
  code: Int
  success: Boolean
  message: String
  ticketId: String
  _ts: String
  internalUser: Boolean
  name: String
  crn: String
  sbi: String
  id: String
  heading: String
  body: String
  customerQueryResponses: [CustomerQueryResponse]
}

type CustomerQueryTicketsBySbi {
  customerQueriesByTicketId: [CustomerQueriesByTicketId]
}

type AllCustomerQueryTickets {
  customerQueriesByTicketId: [CustomerQueriesByTicketId]
}
`

module.exports = { typeDefs }
