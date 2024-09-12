import cosmos from '../../../cosmos/index.js'
import { cosmosConfig } from '../../../config/index.js'

const payments = async (_root, args, context) => {
  const { paymentsDatabase } = await cosmos()
  const querySpec = {
    query: 'SELECT * FROM payments p WHERE p.sbi = @sbi',
    parameters: [{ name: '@sbi', value: `${args.sbi}` }]
  }
  const response = await paymentsDatabase
    .container(cosmosConfig.paymentsContainer)
    .items.query(querySpec)
    .fetchAll()
  return {
    sbi: args.sbi,
    payments: response.resources.map((x) => ({
      id: x.id,
      content: x.content
    }))
  }
}

export { payments }
