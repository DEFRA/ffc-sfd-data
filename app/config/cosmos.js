const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  messagesDatabase: Joi.string().default('ffc-sfd-customer-receiver-messages'),
  messagesContainer: Joi.string().default('messages-container'),
  applicationsDatabase: Joi.string().default(
    'ffc-sfd-customer-receiver-applications'
  ),
  applicationsContainer: Joi.string().default('applications-container'),
  paymentsDatabase: Joi.string().default('ffc-sfd-customer-receiver-payments'),
  paymentsContainer: Joi.string().default('payments-container'),
  preferencesDatabase: Joi.string().default(
    'ffc-sfd-customer-receiver-preferences'
  ),
  preferencesContainer: Joi.string().default('preferences-container'),
  queriesDatabase: Joi.string().default('ffc-sfd-customer-receiver-queries'),
  queriesContainer: Joi.string().default('queries-container'),
  responsesContainer: Joi.string().default('responses-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The cosmos config is invalid. ${error.message}`)
}

module.exports = value
