import { get } from '../../../api/index.js'

const permissions = async (_root, args, context) => {
  const response = await get(`/SitiAgriApi/authorisation/organisation/${args.organisationId}/authorisation`, context.headers)
  return {
    role:
      response.data.personRoles.filter((x) => x.personId === args.personId)[0]
        ?.role ?? 'Unknown',
    privileges:
      response.data.personPrivileges
        .filter((x) => x.personId === args.personId)
        .map((x) => x.privilegeNames[0]) ?? []
  }
}

export { permissions }
