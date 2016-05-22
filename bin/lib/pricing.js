var eb = require('create-errback')
var ucfirst = require('ucfirst')
var load = require('./load')
var match = require('./match')

var entry = 'https://stripe.com/{code}/pricing'
var percentage = /^([0-9\.]+%).*$/
var fee = /^.*\+\s+([^\s%]+)$/

module.exports = function (code, done) {
  var page = entry.replace('{code}', code.toLowerCase())
  load(page, eb(done, process))

  function process ($) {
    var section = $('.Plan--standard')
    parse(section.find('.Plan-cardPricing'))

    function parse (values) {
      var results = []

      values.each(function () {
        var pricing = $(this)

        results.push({
          percentage: pricing
            .find('.Plan-cardRate-percent')
            .text()
            .trim(),

          fee: pricing
            .find('.Plan-cardRate-fixed')
            .text()
            .trim(),

          description: ucfirst(pricing
            .find('.Plan-cardRate-description')
            .text()
            .trim()
            .replace(/\.$/, '')
          )
        })
      })

      done(null, results)
    }
  }
}
