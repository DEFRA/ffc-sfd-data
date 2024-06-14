const { GraphQLScalarType, Kind } = require('graphql')

const timestamp = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Custom scalar type for timestamps',
  serialize (value) {
    if (value instanceof Date) {
      return value.getTime()
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object')
  },
  parseValue (value) {
    if (typeof value === 'number') {
      return new Date(value)
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`')
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  }
})

module.exports = { timestamp }
