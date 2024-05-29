const { applicationsBySbi } = require('./applications-by-sbi')
const { notification } = require('./notification')
const { notificationsBySbi } = require('./notifications-by-sbi')
const { organisation } = require('./organisation')
const { payments } = require('./payments')
const { permissions } = require('./permissions')
const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')
const { preferences } = require('./preferences')
const { customerQuery } = require('./customer-query')
const { customerQueryBySbi } = require('./customer-queries-by-sbi')
const { allCustomerQueries } = require('./all-customer-queries')

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
  customerQuery,
  customerQueryBySbi,
  allCustomerQueries
}
