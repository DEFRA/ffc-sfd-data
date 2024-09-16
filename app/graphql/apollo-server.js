import { ApolloServer } from '@apollo/server'
import { typeDefs } from './schema/type-definitions.js'
import { resolvers } from './schema/resolvers.js'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

export { apolloServer }
