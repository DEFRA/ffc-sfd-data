import { cacheConfig } from '../config.js'
import { getCache } from './get-cache.js'

const set = async (key, value) => {
  const cache = getCache()
  await cache.set(key, value, cacheConfig.ttl)
}

export default { set }
