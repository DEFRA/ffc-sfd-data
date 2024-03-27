const getFullAddress = (address) => {
  return Object.values(address).filter(x => x).join(', ')
}

module.exports = {
  getFullAddress
}
