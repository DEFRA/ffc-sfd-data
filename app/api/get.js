import Wreck from '@hapi/wreck'
import { getApimToken } from './get-apim-token.js'
import { get as getCachedResponse, set as setCachedResponse } from '../cache/index.js'
import retry from './retry.js'
import { getCacheKey } from './get-cache-key.js'
import { getHost } from './get-host.js'
import { getApimHeaders } from './get-apim-headers.js'

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

export { get }
