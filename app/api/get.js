const Wreck = require('@hapi/wreck')
const { getApimToken } = require('./get-apim-token')
const { get: getCachedResponse, set: setCachedResponse } = require('../cache')
const retry = require('./retry')
const { getCacheKey } = require('./get-cache-key')
const { getHost } = require('./get-host')
const { getApimHeaders } = require('./get-apim-headers')

const get = async (path, headers) => {
  const cacheKey = getCacheKey(path, headers)
  const cachedResponse = await getCachedResponse(cacheKey)
  return cachedResponse ?? retry(() => getFromApim(path, headers, cacheKey))
}

const getFromApim = async (path, headers, cacheKey) => {
  const apimToken = await getApimToken()
  const host = getHost(headers)
  const { payload } = await Wreck.get(`${host}${path}`, {
    headers: getApimHeaders(headers, apimToken),
    json: true
  })

  await setCachedResponse(cacheKey, payload)

  return payload
}

module.exports = { get }
