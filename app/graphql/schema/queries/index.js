const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')
const { organisation } = require('./organisation')
const { permissions } = require('./permissions')
const { notification } = require('./notification')
const { notificationsBySbi } = require('./notifications-by-sbi')

module.exports = {
  personOrganisations,
  person,
  organisation,
  permissions,
  notification,
  notificationsBySbi
}
