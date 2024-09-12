import cosmos from '../../../cosmos'
import { cosmosConfig } from '../../../config'

const preferences = async (_root, args, context) => {
  const { preferencesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM preferences p WHERE p.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }

  const response = await preferencesDatabase
    .container(cosmosConfig.preferencesContainer)
    .items.query(querySpec)
    .fetchAll()

  return {
    sbi: args.sbi,
    preferences: response.resources.map((x) => ({
      id: x.id,
      content: x.content
    }))
  }
}

export default {
  preferences
}
