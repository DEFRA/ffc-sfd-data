const { applicationsBySbi } = require('./applications-by-sbi')
const { notification } = require('./notification')
const { notificationsBySbi } = require('./notifications-by-sbi')
const { organisation } = require('./organisation')
const { payments } = require('./payments')
const { permissions } = require('./permissions')
const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')
const { preferences } = require('./preferences')
const { customerQueryResponse } = require('./customer-query-response')
const { customerQueriesByTicketId } = require('./customer-queries-by-ticket-id')
const { allCustomerQueryTickets } = require('./all-customer-query-tickets')

module.exports = {
  applicationsBySbi,
  notification,
  notificationsBySbi,
  organisation,
  payments,
  permissions,
  personOrganisations,
  person,
  preferences,
  customerQueryResponse,
  customerQueriesByTicketId,
  allCustomerQueryTickets
}
