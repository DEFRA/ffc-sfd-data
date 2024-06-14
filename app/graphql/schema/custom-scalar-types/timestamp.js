const { GraphQLScalarType, Kind } = require('graphql')

const timestamp = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Custom scalar type for timestamps',
  serialize (value) {
    return value instanceof Date ? value.toISOString() : null
  },
  parseValue (value) {
    return typeof value === 'string' ? new Date(value) : null
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  }
})

module.exports = { timestamp }
