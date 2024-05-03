const cosmos = require('../../../cosmos')
const { cosmosConfig } = require('../../../config')

const payments = async (_root, args, context) => {
  const { paymentsDatabase } = await cosmos()
  const querySpec =
    {
      query: 'SELECT * FROM applications a WHERE a.sbi = @sbi',
      parameters: [
        { name: '@sbi', value: `${args.sbi}` }
      ]
    }
  const response = await paymentsDatabase.container(cosmosConfig.paymentsContainer).items.query(querySpec).fetchAll()
  return {
    sbi: args.sbi,
    applications: response.resources.map(x => ({
      id: x.id,
      content: x.content
    }))
  }
}

module.exports = {
  payments
}
