const getCacheKey = (path, headers) => {
  return headers.email ? `${path}-internal` : `${path}-${headers.crn}`
}

module.exports = {
  getCacheKey
}
