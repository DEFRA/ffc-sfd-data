const generateTimestamp = () => {
  const date = new Date()

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

  return date.toLocaleDateString('en-GB', options)
}

module.exports = { generateTimestamp }
