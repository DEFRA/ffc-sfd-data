import hapiApollo from '@as-integrations/hapi'
import { server } from './server.js'
import { apolloServer } from './graphql/apollo-server.js'
import { initCosmos } from './cosmos/init.js'

const init = async () => {
  await apolloServer.start()

  await server.register({
    plugin: hapiApollo,
    options: {
      apolloServer,
      path: '/graphql',
      context: ({ request }) => {
        return { headers: request.headers }
      }
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
  await initCosmos()
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
