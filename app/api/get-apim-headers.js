const { apimConfig } = require('../config')

const getApimHeaders = (headers, apimToken) => {
  const apimHeaders = {
    'X-Forwarded-Authorization': headers.authorization,
    'Ocp-Apim-Subscription-Key': apimConfig.ocpSubscriptionKey,
    Authorization: apimToken
  }

  if (headers.crn) {
    apimHeaders.crn = headers.crn
  }

  if (headers.email) {
    apimHeaders.email = headers.email
  }

  return apimHeaders
}

module.exports = {
  getApimHeaders
}
