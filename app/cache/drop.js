import { getCache } from './get-cache.js'

const drop = async (key) => {
  const cache = getCache()
  await cache.drop(key)
}

export default { drop }
