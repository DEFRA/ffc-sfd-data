const { apimConfig } = require('../config')

const getHost = (headers) => {
  return headers.email ? apimConfig.hostInternal : apimConfig.hostExternal
}

module.exports = {
  getHost
}
