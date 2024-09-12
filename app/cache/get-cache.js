import { server } from '../server.js'

const getCache = () => {
  return server.app.cache
}

export default { getCache }
