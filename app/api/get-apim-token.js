import Wreck from '@hapi/wreck'
import FormData from 'form-data'
import { apimConfig } from '../config/index.js'
import { get, set } from '../cache/index.js'
import { APIM_TOKEN } from '../constants/cache-keys.js'

const getApimToken = async () => {
  const cachedToken = await get(APIM_TOKEN)

  if (cachedToken) {
    return cachedToken
  }

  const response = await getApimTokenFromApim()
  const token = `${response.payload.token_type} ${response.payload.access_token}`
  await set(APIM_TOKEN, token)

  return token
}

const getApimTokenFromApim = async () => {
  const data = new FormData()
  data.append('client_id', apimConfig.clientId)
  data.append('client_secret', apimConfig.clientSecret)
  data.append('scope', apimConfig.scope)
  data.append('grant_type', 'client_credentials')

  return Wreck.post(apimConfig.authorizationUrl, {
    headers: data.getHeaders(),
    payload: data,
    json: true
  })
}

export { getApimToken }
