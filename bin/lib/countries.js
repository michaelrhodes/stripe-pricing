var url = require('url')
var eb = require('create-errback')
var get = require('get-object-path')
var load = require('./load')

var entry = 'https://stripe.com'

module.exports = function (done) {
  load(entry, eb(done, process))

  function process ($) {
    done(null, $('.countryPicker ul a')
      .map(function () {
        var href = url.parse($(this).attr('href'), true)
        var code = get(href, 'query.country') || href.hash.substr(1)
        return code.length === 2 ? code : null
      })
      .filter(function () {
        return !!this
      })
      .get()
    )
  }
}
