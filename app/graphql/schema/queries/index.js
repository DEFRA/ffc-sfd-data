const { personOrganisations } = require('./person-organisations')
const { person } = require('./person')
const { organisation } = require('./organisation')
const { permissions } = require('./permissions')
const { notification } = require('./notification')

module.exports = {
  personOrganisations,
  person,
  organisation,
  permissions,
  notification
}
