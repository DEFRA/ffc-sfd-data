import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const initCosmos = async () => {
  try {
    const databasesDir = path.join(__dirname, './databases')
    const files = fs.readdirSync(databasesDir)

    const createDatabases = files.map(async file => {
      const databaseName = `${file.split('.')[0]}Database`
      const db = await import(`./databases/${file}`)
      return db[databaseName]()
    })

    const result = await Promise.allSettled(createDatabases)

    result.forEach(res => {
      if (res.status === 'rejected') {
        throw new Error(res.reason.message)
      }
    })
  } catch (err) {
    throw new Error(`Failed to create databases: ${err.message}`)
  }
}

export { initCosmos }
