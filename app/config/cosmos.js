const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  messagesDatabase: Joi.string().required(),
  messagesContainer: Joi.string().required(),
  applicationsDatabase: Joi.string().required(),
  applicationsContainer: Joi.string().required(),
  paymentsDatabase: Joi.string().required(),
  paymentsContainer: Joi.string().required()
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  messagesDatabase: process.env.COSMOS_MESSAGES_DATABASE,
  messagesContainer: process.env.COSMOS_MESSAGES_CONTAINER,
  applicationsDatabase: process.env.COSMOS_APPLICATIONS_DATABASE,
  applicationsContainer: process.env.COSMOS_APPLICATIONS_CONTAINER,
  paymentsDatabase: process.env.COSMOS_PAYMENTS_DATABASE,
  paymentsContainer: process.env.COSMOS_PAYMENTS_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The cosmos config is invalid. ${error.message}`)
}

module.exports = value
