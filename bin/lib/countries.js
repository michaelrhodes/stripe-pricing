var url = require('url')
var eb = require('create-errback')
var get = require('get-object-path')
var load = require('./load')

var entry = 'https://stripe.com'

module.exports = function (done) {
  load(entry, eb(done, process))

  function process ($) {
    done(null, $('.country-selector ul a')
      .map(function () {
        var href = $(this).attr('href')
        var code = get(url.parse(href, true), 'query.country') 
        return code
      })
      .filter(function () {
        return !!this
      })
      .get()
    )
  }
}
