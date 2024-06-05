const fs = require('fs')
const path = require('path')

const initCosmos = async () => {
  // cosmos emulator is very slow to start up, if getting eccon refused suggest increase time to wait for cosmos to start
  try {
    const databasesDir = path.join(__dirname, './databases')
    const files = fs.readdirSync(databasesDir)

    const createDatabases = files.map(async file => {
      const databaseName = `${file.split('.')[0]}Database`
      const db = require(`./databases/${file}`)
      return db[databaseName]()
    })

    await Promise.allSettled(createDatabases)
  } catch (err) {
    throw new Error(`Failed to create databases: ${err.message}`)
  }
}

module.exports = { initCosmos }
