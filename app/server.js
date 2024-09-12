import './insights.js'
import Hapi from '@hapi/hapi'
import { cacheConfig, cosmosConfig } from './config/index.js'

// Disable TLS validation in development to allow connection to cosmosDb emulator
if (cosmosConfig.isDev) process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    name: cacheConfig.cacheName,
    provider: {
      constructor: cacheConfig.catbox,
      options: cacheConfig.catboxOptions
    }
  }]
})

const cache = server.cache({ cache: cacheConfig.cacheName, segment: cacheConfig.segment, expiresIn: cacheConfig.ttl })
server.app.cache = cache

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz')
)

server.route(routes)

export default { server }
