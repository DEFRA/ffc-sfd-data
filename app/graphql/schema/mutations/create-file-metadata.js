const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const createFileMetadata = async (_root, args, context) => {
  const { filesDatabase } = await cosmos()

  const response = await filesDatabase
    .container(cosmosConfig.filesContainer)
    .items.create({ metadata: args.metadata })

  return {
    id: response.resource.id,
    status: {
      code: response.statusCode,
      success: response.statusCode >= 200 && response.statusCode < 300,
      message: response.statusCode >= 200 && response.statusCode < 300 ? 'Metadata created successfully' : response.messages[0].message
    },
    metadata: {
      ...response.resource.metadata
    }
  }
}

module.exports = {
  createFileMetadata
}
