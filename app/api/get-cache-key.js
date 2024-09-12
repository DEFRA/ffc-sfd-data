const getCacheKey = (path, headers) => {
  return headers.email ? `${path}-internal` : `${path}-${headers.crn}`
}

export { getCacheKey }
