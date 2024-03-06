const Joi = require('joi')

const schema = Joi.object().keys({
  clientId: Joi.string().required(),
  clientSecret: Joi.string().required(),
  scope: Joi.string().required(),
  ocpSubscriptionKey: Joi.string().required(),
  authorizationUrl: Joi.string().required(),
  host: Joi.string().required()
})

const config = {
  clientId: process.env.APIM-CLIENT-ID,
  clientSecret: process.env.APIM-CLIENT-SECRET,
  scope: process.env.APIM-SCOPE,
  ocpSubscriptionKey: process.env.APIM-OCP-SUBSCRIPTION-KEY,
  authorizationUrl: process.env.APIM-AUTHORIZATION-URL,
  host: process.env.APIM-HOST
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The API config is invalid. ${error.message}`)
}

module.exports = value
