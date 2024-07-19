const { DefaultAzureCredential } = require('@azure/identity')
const { CosmosClient } = require('@azure/cosmos')
const { cosmosConfig } = require('../config')

if (cosmosConfig.isDev || cosmosConfig.isTest) {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
}

if (cosmosConfig.isProd) {
  const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
}
