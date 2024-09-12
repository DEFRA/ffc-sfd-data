import { DefaultAzureCredential } from '@azure/identity'
import { CosmosClient } from '@azure/cosmos'
import { cosmosConfig } from '../config'

if (cosmosConfig.isDev || cosmosConfig.isTest) {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
}

if (cosmosConfig.isProd) {
  const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
}
