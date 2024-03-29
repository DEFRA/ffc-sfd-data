const { get } = require('../../../api')
const { getFullAddress } = require('./get-full-address')

const person = async (_root, _args, context) => {
  const response = await get('/person/3337243/summary', context)
  return {
    id: response._data.id,
    crn: response._data.customerReferenceNumber,
    title: response._data.title,
    firstName: response._data.firstName,
    lastName: response._data.lastName,
    fullName: `${response._data.title} ${response._data.firstName} ${response._data.lastName}`,
    landline: response._data.landline,
    mobile: response._data.mobile,
    email: response._data.email,
    address: {
      address1: response._data.address.address1,
      address2: response._data.address.address2,
      address3: response._data.address.address3,
      address4: response._data.address.address4,
      address5: response._data.address.address5,
      city: response._data.address.city,
      county: response._data.address.county,
      postcode: response._data.address.postcode,
      country: response._data.address.country,
      fullAddress: getFullAddress(response._data.address)
    },
    doNotContact: response._data.doNotContact,
    locked: response._data.locked
  }
}

module.exports = {
  person
}
