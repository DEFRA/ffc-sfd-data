import { apimConfig } from '../config/index.js'

const getApimHeaders = (headers, apimToken) => {
  const apimHeaders = {
    'Ocp-Apim-Subscription-Key': apimConfig.ocpSubscriptionKey,
    Authorization: apimToken
  }

  if (headers.crn) {
    apimHeaders.crn = headers.crn
  }

  if (headers.email) {
    apimHeaders.email = headers.email
  }

  if (headers.authorization) {
    apimHeaders['X-Forwarded-Authorization'] = headers.authorization
  }

  return apimHeaders
}

export { getApimHeaders }
