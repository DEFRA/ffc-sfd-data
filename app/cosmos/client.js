const { DefaultAzureCredential } = require('@azure/identity')
const { CosmosClient } = require('@azure/cosmos')
const { cosmosConfig } = require('../config')

if (process.env.NODE_ENV === 'development') {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
}

if (process.env.NODE_ENV === 'production') {
  const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
}
