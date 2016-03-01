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
    var section = $('section.fees')
    section.hasClass('split') ?
      parse(section.find('> div > section > h3')) :
      parse(section.find('> h2'))

    function parse (values) {
      var results = []

      values.each(function () {
        var heading = $(this)
        var text = heading.text().trim()

        results.push({
          percentage: match(text, percentage),
          fee: match(text, fee),
          description: ucfirst(
            heading.next('p')
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
