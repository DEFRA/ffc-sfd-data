const { updateCustomerQueryTicket } = require('./update-customer-query-ticket')
const { createCustomerQueryTicket } = require('./create-customer-query-ticket')
const { deleteFileMetadataByBlobReference } = require('./delete-file-metadata-by-blob-reference')

module.exports = {
  updateCustomerQueryTicket,
  createCustomerQueryTicket,
  deleteFileMetadataByBlobReference
}
