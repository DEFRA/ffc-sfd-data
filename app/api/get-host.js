import { apimConfig } from '../config'

const getHost = (headers) => {
  return headers.email ? apimConfig.hostInternal : apimConfig.hostExternal
}

export default {
  getHost
}
