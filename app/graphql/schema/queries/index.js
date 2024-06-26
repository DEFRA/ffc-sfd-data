const { applicationsBySbi } = require('./applications-by-sbi')
const { notification } = require('./notification')
const { notificationsBySbi } = require('./notifications-by-sbi')
const { organisation } = require('./organisation')
const { payments } = require('./payments')
const { permissions } = require('./permissions')
const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')
const { preferences } = require('./preferences')
const { allCustomerQueryTickets } = require('./all-customer-query-tickets')
const { customerQueryTicketsBySbi } = require('./customer-queries-by-sbi')
const { customerQueryByTicketId } = require('./customer-query-by-ticket-id')

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
  allCustomerQueryTickets,
  customerQueryTicketsBySbi,
  customerQueryByTicketId
}
