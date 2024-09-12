import { get } from '../../../api/index.js'
import { getFullAddress } from './get-full-address.js'

const organisation = async (_root, args, context) => {
  const response = await get(
    `/organisation/${args.organisationId}`,
    context.headers
  )

  return {
    id: response._data.id,
    sbi: response._data.sbi,
    vendor: response._data.vendor,
    trader: response._data.trader,
    name: response._data.name,
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
    locked: response._data.locked,
    type: response._data.businessType.type,
    legalStatus: response._data.legalStatus.type
  }
}

export default {
  organisation
}
