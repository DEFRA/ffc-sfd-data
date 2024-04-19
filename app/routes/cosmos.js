const cosmosClient = require('../cosmos')

module.exports = {
  method: 'GET',
  path: '/cosmos',
  handler: async (request, h) => {
    try {
      const { messagesDatabase } = await cosmosClient()
      const response = await messagesDatabase.container('messages-container').items.readAll().fetchAll()
      return h.response({ data: response.resources }).code(200)
    } catch (err) {
      console.log(err)
    }
  }
}
