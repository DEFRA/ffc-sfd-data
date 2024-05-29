const { get } = require('../../../api')

const personOrganisations = async (_root, _args, context) => {
  const response = await get(
    '/organisation/person/3337243/summary?search=',
    context.headers
  )

  return {
    crn: context.crn,
    organisations:
      response._data?.map((x) => ({
        id: x.id,
        sbi: x.sbi,
        name: x.name
      })) ?? []
  }
}

module.exports = {
  personOrganisations
}
