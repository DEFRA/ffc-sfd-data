import cosmos from '../../../cosmos'
import { cosmosConfig } from '../../../config'

const deleteFileMetadataByBlobReference = async (_root, args, context) => {
  const { filesDatabase } = await cosmos()

  const querySpec = {
    query: 'SELECT * FROM c WHERE c.blobReference = @blobReference',
    parameters: [
      { name: '@blobReference', value: args.blobReference }
    ]
  }

  const { resources } = await filesDatabase
    .container(cosmosConfig.filesContainer)
    .items.query(querySpec)
    .fetchAll()

  if (resources.length === 0) {
    return {
      code: 404,
      success: false,
      message: 'Metadata not found'
    }
  }

  const fileMetadata = resources[0]

  const response = await filesDatabase
    .container(cosmosConfig.filesContainer)
    .item(fileMetadata.id, fileMetadata.partitionKey)
    .delete()

  return {
    code: response.statusCode,
    success: response.statusCode >= 200 && response.statusCode < 300,
    message: response.statusCode >= 200 && response.statusCode < 300 ? 'Metadata deleted successfully' : response.message
  }
}

export default {
  deleteFileMetadataByBlobReference
}
