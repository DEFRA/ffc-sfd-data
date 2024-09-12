import { getCache } from './get-cache.js'

const get = async (key) => {
  const cache = getCache()
  return cache.get(key)
}

export { get }
