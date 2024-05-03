const { applicationsBySbi } = require('./applications-by-sbi')
const { notification } = require('./notification')
const { notificationsBySbi } = require('./notifications-by-sbi')
const { organisation } = require('./organisation')
const { permissions } = require('./permissions')
const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')

module.exports = {
  applicationsBySbi,
  notification,
  notificationsBySbi,
  organisation,
  permissions,
  personOrganisations,
  person
}
