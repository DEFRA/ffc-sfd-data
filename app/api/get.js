const Wreck = require('@hapi/wreck')
const { apimConfig } = require('../config')
const { getApimToken } = require('./get-apim-token')
const { get: getCachedResponse, set: setCachedResponse } = require('../cache')
const retry = require('./retry')

const get = async (path, context) => {
  const requester = context.crn ? { type: 'crn', value: context.crn } : { type: 'email', value: context.email }
  const cachedResponse = await getCachedResponse(`${path}-${requester.value}`)
  return cachedResponse ?? retry(() => getFromApim(path, requester, context.token))
}

const getFromApim = async (path, requester, token) => {
  const apimToken = await getApimToken()
  const host = requester.type === 'crn' ? apimConfig.hostExternal : apimConfig.hostInternal
  const { payload } = await Wreck.get(`${host}${path}`, {
    headers: {
      [requester.type]: requester.value,
      'X-Forwarded-Authorization': token,
      Authorization: apimToken,
      'Ocp-Apim-Subscription-Key': apimConfig.ocpSubscriptionKey
    },
    json: true
  })

  await setCachedResponse(`${path}-${requester.value}`, payload)

  return payload
}

module.exports = { get }
