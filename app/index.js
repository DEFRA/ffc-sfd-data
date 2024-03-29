const hapiApollo = require('@as-integrations/hapi').default
const { server } = require('./server.js')
const { apolloServer } = require('./graphql/apollo-server')

const init = async () => {
  await apolloServer.start()

  await server.register({
    plugin: hapiApollo,
    options: {
      apolloServer,
      path: '/graphql',
      context: ({ request }) => {
        return {
          token: request.headers.authorization,
          crn: request.headers.crn,
          email: request.headers.email
        }
      }
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
