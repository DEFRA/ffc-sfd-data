import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'

const applicationsBySbi = async (_root, args, context) => {
  const { applicationsDatabase } = await cosmos()
  const querySpec = {
    query: 'SELECT * FROM applications a WHERE a.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }
  const response = await applicationsDatabase
    .container(cosmosConfig.applicationsContainer)
    .items.query(querySpec)
    .fetchAll()
  return {
    sbi: args.sbi,
    applications: response.resources.map((x) => ({
      id: x.id,
      content: x.content
    }))
  }
}

export { applicationsBySbi }
