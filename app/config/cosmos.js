const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  managedIdentityClientId: Joi.string().optional(),
  messagesDatabase: Joi.string().default('ffc-sfd-customer-receiver-messages'),
  messagesContainer: Joi.string().default('messages-container'),
  applicationsDatabase: Joi.string().default('ffc-sfd-customer-receiver-applications'),
  applicationsContainer: Joi.string().default('applications-container'),
  paymentsDatabase: Joi.string().default('ffc-sfd-customer-receiver-payments'),
  paymentsContainer: Joi.string().default('payments-container'),
  preferencesDatabase: Joi.string().default('ffc-sfd-customer-receiver-preferences'),
  preferencesContainer: Joi.string().default('preferences-container'),
  queriesDatabase: Joi.string().default('ffc-sfd-customer-receiver-queries'),
  queriesContainer: Joi.string().default('queries-container'),
  filesDatabase: Joi.string().default('ffc-sfd-customer-receiver-files'),
  filesContainer: Joi.string().default('files-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  managedIdentityClientId: process.env.AZURE_CLIENT_ID
}

const { error, value } = schema.validate(config, { abortEarly: false })

value.isDev = (process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST)
value.isTest = process.env.NODE_ENV === TEST
value.isProd = process.env.NODE_ENV === PRODUCTION

if (error) {
  throw new Error(`The cosmos config is invalid. ${error.message}`)
}

module.exports = value
