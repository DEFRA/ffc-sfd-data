const appInsights = require('applicationinsights')

const setup = () => {
  if (process.env.APPINSIGHTS-CONNECTIONSTRING) {
    appInsights.setup(process.env.APPINSIGHTS-CONNECTIONSTRING).start()
    console.log('App Insights running')
    const cloudRoleTag = appInsights.defaultClient.context.keys.cloudRole
    const appName = process.env.APPINSIGHTS-CLOUDROLE
    appInsights.defaultClient.context.tags[cloudRoleTag] = appName
  } else {
    console.log('App Insights not running')
  }
}

module.exports = { setup }
