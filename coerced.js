var centesimal = require('to-centesimal')
var round = require('round-precision')
var pricing = require('./index')

function decimal (str) {
  return round(parseFloat(str) / 100, 5)
}

module.exports = (function () {
  var coerced = {}
  var options
  for (var country in pricing) {
    if (!pricing.hasOwnProperty(country)) {
      continue
    }

    coerced[country] = pricing[country]
      .map(function (option) {
        option.percentage = decimal(option.percentage)
        option.fee = centesimal(option.fee || 0)
        return option
      })
  }
  return coerced
})()
