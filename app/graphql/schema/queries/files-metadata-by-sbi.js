import cosmos from '../../../cosmos'
import { cosmosConfig } from '../../../config'

const filesMetadataBySbi = async (_root, args, context) => {
  const { filesDatabase } = await cosmos()
  const querySpec = {
    query: 'SELECT * FROM files f WHERE f.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }
  const response = await filesDatabase
    .container(cosmosConfig.filesContainer)
    .items.query(querySpec)
    .fetchAll()
  return {
    metadata: response.resources
  }
}

export default {
  filesMetadataBySbi
}
