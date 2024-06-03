const { CosmosClient } = require('@azure/cosmos')
const { cosmosConfig } = require('../config')

// if (cosmosConfig.key) {
//   module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
// }

if (cosmosConfig.key) {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
} else {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint })
}
