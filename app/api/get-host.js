import { apimConfig } from '../config/index.js'

const getHost = (headers) => {
  return headers.email ? apimConfig.hostInternal : apimConfig.hostExternal
}

export { getHost }
