import { DefaultAzureCredential } from '@azure/identity'
import { CosmosClient } from '@azure/cosmos'
import { cosmosConfig } from '../config/index.js'

// if (cosmosConfig.isDev || cosmosConfig.isTest) {
//   module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
// }

// if (cosmosConfig.isProd) {
//   const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
//   module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
// }

const createCosmosClient = () => {
  if (cosmosConfig.isDev || cosmosConfig.isTest) {
    return new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
  } else if (cosmosConfig.isProd) {
    const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
    return new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
  }
  throw new Error('Invalid environment configuration for CosmosClient')
}

const cosmosClient = createCosmosClient()

export default cosmosClient
