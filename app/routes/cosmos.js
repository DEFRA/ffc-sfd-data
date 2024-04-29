const cosmos = require('../cosmos')
const { cosmosConfig } = require('../config')

module.exports = {
  method: 'GET',
  path: '/cosmos',
  handler: async (request, h) => {
    try {
      const { messagesDatabase } = await cosmos()
      const response = await messagesDatabase.container(cosmosConfig.messagesContainer).items.readAll().fetchAll()
      return h.response({ data: response.resources }).code(200)
    } catch (err) {
      console.log(err)
    }
  }
}

