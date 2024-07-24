const badUserInput = 'BAD_USER_INPUT'
const errorFormattingRules = [
  {
    conditions: {
      code: badUserInput,
      field: 'createCustomerQueryTicket.name',
      arg: 'minLength',
      value: 5
    },
    modifications: {
      message: 'The name must be at least 5 characters in length.'
    }
  },
  {
    conditions: {
      code: badUserInput,
      field: 'createCustomerQueryTicket.name',
      arg: 'maxLength',
      value: 10
    },
    modifications: {
      message: 'The name cannot be more than 10 characters in length.',
      code: 'FULL CONTROL ACHIEVED',
      stacktrace: []
    }
  }
]

const formatError = (error) => {
  errorFormattingRules.forEach(rule => {
    const { conditions, modifications } = rule
    const contextItem = error.extensions?.context?.find(item => item.arg === conditions.arg)

    if (
      error.extensions?.code === conditions.code &&
      error.extensions?.field === conditions.field &&
      contextItem && contextItem.value === conditions.value
    ) {
      if (modifications.message) error.message = modifications.message
      if (modifications.code) error.extensions.code = modifications.code
      if (modifications.stacktrace) error.extensions.stacktrace = modifications.stacktrace
    }
  })

  return error
}

module.exports = { formatError }
