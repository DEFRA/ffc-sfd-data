const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const filesMetadata = async (_root, args, context) => {
  const { filesDatabase } = await cosmos()
  const querySpec = {
    query: 'SELECT * FROM files f WHERE f.metadata.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }
  const response = await filesDatabase
    .container(cosmosConfig.filesContainer)
    .items.query(querySpec)
    .fetchAll()
  return {
    metadata: response.resources.map(resource => resource.metadata)
  }
}

module.exports = {
  filesMetadata
}
