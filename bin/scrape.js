var stringify = require('json-stringify-pretty-compact')
var series = require('run-series')
var tb = require('./lib/throwback')
var countries = require('./lib/countries')
var pricing = require('./lib/pricing')

countries(tb(function (codes) {
  var map = {}

  var pricings = codes.map(function (code) {
    return function (next) {
      pricing(code, tb(function (details) {
        map[code] = details
        next()
      }))
    }
  })

  series(pricings, tb(function () {
    console.log(
      'module.exports = ' +
        stringify(map, { maxLength: 100 })
          .replace(/"([^"]+)":/g, '$1:')
          .replace(/\{([a-z])/g, '{ $1')
          .replace(/"\}/g, '" }')
          .replace(/"/g, "'")
    )
  }))
}))
