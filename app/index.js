import { server } from './server.js'
import { apolloServer } from './graphql/apollo-server.js'
import { initCosmos } from './cosmos/init.js'

const init = async () => {
  await apolloServer.start()

  await server.route({
    method: 'POST',
    path: '/graphql',
    handler: async (request, h) => {
      const response = await apolloServer.executeOperation({
        query: request.payload.query,
        variables: request.payload.variables
      }, {
        request,
        response: h.response
      })

      return h.response(response)
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)

  await initCosmos()
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
