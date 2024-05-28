const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  messagesDatabase: Joi.string().default('ffc-sfd-customer-receiver-messages'),
  messagesContainer: Joi.string().default('messages-container'),
  applicationsDatabase: Joi.string().default('ffc-sfd-customer-receiver-applications'),
  applicationsContainer: Joi.string().default('applications-container'),
  paymentsDatabase: Joi.string().default('ffc-sfd-customer-receiver-payments'),
  paymentsContainer: Joi.string().default('payments-container'),
  preferencesDatabase: Joi.string().default('ffc-sfd-customer-receiver-preferences'),
  preferencesContainer: Joi.string().default('preferences-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  messagesDatabase: process.env.COSMOS_MESSAGES_DATABASE,
  messagesContainer: process.env.COSMOS_MESSAGES_CONTAINER,
  applicationsDatabase: process.env.COSMOS_APPLICATIONS_DATABASE,
  applicationsContainer: process.env.COSMOS_APPLICATIONS_CONTAINER,
  paymentsDatabase: process.env.COSMOS_PAYMENTS_DATABASE,
  paymentsContainer: process.env.COSMOS_PAYMENTS_CONTAINER,
  preferencesDatabase: process.env.COSMOS_PREFERENCES_DATABASE,
  preferencesContainer: process.env.COSMOS_PREFERENCES_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The cosmos config is invalid. ${error.message}`)
}

module.exports = value
