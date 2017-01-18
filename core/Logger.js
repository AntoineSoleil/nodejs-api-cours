'use strict'

const log4js = require('log4js')
const path = require('path')

let logger = false

// If production, write logs into file
if (process.env.NODE_ENV === 'production') {
  log4js.configure(path.join(__dirname, '..', '..', 'config', 'log4js.json'))
  logger = log4js.getLogger('log')
} else {
  logger = log4js.getLogger()
}

module.exports = logger
