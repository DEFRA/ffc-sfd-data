const Wreck = require('@hapi/wreck')
const { apimConfig } = require('../config')
const { getApimToken } = require('./get-apim-token')
const { get: getCachedResponse, set: setCachedResponse } = require('../cache')
const retry = require('./retry')

const get = async (path, crn, token) => {
  const cachedResponse = await getCachedResponse(`${path}-${crn}`)
  return cachedResponse ?? retry(() => getFromApim(path, crn, token))
}

const getFromApim = async (path, crn, token) => {
  const apimToken = await getApimToken()
  const { payload } = await Wreck.get(`${apimConfig.host}${path}`, {
    headers: {
      crn,
      'X-Forwarded-Authorization': token,
      Authorization: apimToken,
      'Ocp-Apim-Subscription-Key': apimConfig.ocpSubscriptionKey
    },
    json: true
  })

  await setCachedResponse(`${path}-${crn}`, payload)

  return payload
}

module.exports = { get }
