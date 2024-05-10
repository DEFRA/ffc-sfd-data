const hapiApollo = require('@as-integrations/hapi').default
const { server } = require('./server.js')
const { apolloServer } = require('./graphql/apollo-server')
const { initCosmos } = require('./cosmos/init')

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
