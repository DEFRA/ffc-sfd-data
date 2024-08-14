const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

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

module.exports = {
  filesMetadataBySbi
}
