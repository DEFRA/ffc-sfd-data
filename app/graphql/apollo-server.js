const { ApolloServer } = require('@apollo/server')
const { typeDefs } = require('./schema/type-definitions')
const { resolvers } = require('./schema/resolvers')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createApollo4QueryValidationPlugin, constraintDirectiveTypeDefs } = require('graphql-constraint-directive/apollo4')
const { formatError } = require('./schema/errors')

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers
})

const plugins = [
  createApollo4QueryValidationPlugin()
]

const apolloServer = new ApolloServer({
  schema,
  plugins,
  formatError
})

module.exports = { apolloServer }
