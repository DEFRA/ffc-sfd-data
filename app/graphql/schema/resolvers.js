const { get } = require('../../api')

const resolvers = {
  Query: {
    personOrganisations: async (_root, _args, context) => {
      const response = await get('/organisation/person/3337243/summary?search=', context.crn, context.token)
      return {
        crn: context.crn,
        organisations: response._data?.map(x => ({
          id: x.id,
          sbi: x.sbi,
          name: x.name
        })) ?? []
      }
    },
    person: async (_root, _args, context) => {
      const response = await get('/organisation/person/3337243/summary', context.crn, context.token)
      return {
        id: response._data.id,
        crn: response._data.crn,
        title: response._data.title,
        firstName: response._data.firstName,
        lastName: response._data.lastName,
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
    },
    organisation: async (_root, args, context) => {
      const response = await get(`/organisation/${args.organisationId}/summary`, context.crn, context.token)
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
        type: response._data.type,
        legalStatus: response._data.legalStatus
      }
    },
    permissions: async (_root, args, context) => {
      const response = await get(`/SitiAgriApi/authorisation/organisation/${args.organisationId}/authorisation`, context.crn, context.token)
      return {
        role: response._data.personRoles.filter(x => x.personId === args.personId)[0]?.role ?? 'Unknown',
        privileges: response._data.personPrivileges.filter(x => x.personId === args.personId).map(x => (x.privilegeNames[0])) ?? []
      }
    }
  }
}

const getFullAddress = (address) => {
  return Object.values(address).filter(x => x).join(', ')
}

module.exports = { resolvers }
