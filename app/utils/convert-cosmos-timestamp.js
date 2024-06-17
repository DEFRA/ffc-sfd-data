const convertCosmosTimestamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000)

  const options = {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  const formatter = new Intl.DateTimeFormat('en-GB', options)
  return formatter.format(date)
}

module.exports = {
  convertCosmosTimestamp
}
