var url = require('url')
var eb = require('create-errback')
var get = require('get-object-path')
var load = require('./load')

var entry = 'https://stripe.com'

module.exports = function (done) {
  load(entry, eb(done, process))

  function process ($) {
    done(null, $('.countryList ul a')
      .map(function () {
        var href = url.parse($(this).attr('href'), true)
        return href.hash ? null : href.pathname
          .substr(1)
          .replace(/^[a-z]+-([a-z]{2})$/, '$1')
      })
      .filter(function () {
        return !!this
      })
      .get()
    )
  }
}
