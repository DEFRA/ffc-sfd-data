import Joi from 'joi'

const schema = Joi.object().keys({
  clientId: Joi.string().required(),
  clientSecret: Joi.string().required(),
  scope: Joi.string().required(),
  ocpSubscriptionKey: Joi.string().required(),
  authorizationUrl: Joi.string().required(),
  hostExternal: Joi.string().required(),
  hostInternal: Joi.string().required()
})

const config = {
  clientId: process.env.APIM_CLIENT_ID,
  clientSecret: process.env.APIM_CLIENT_SECRET,
  scope: process.env.APIM_SCOPE,
  ocpSubscriptionKey: process.env.APIM_OCP_SUBSCRIPTION_KEY,
  authorizationUrl: process.env.APIM_AUTHORIZATION_URL,
  hostExternal: process.env.APIM_HOST_EXTERNAL,
  hostInternal: process.env.APIM_HOST_INTERNAL
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The API config is invalid. ${error.message}`)
}

export default value
