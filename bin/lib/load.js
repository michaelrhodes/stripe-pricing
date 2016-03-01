var http = require('got')
var dom = require('cheerio').load

var no = new Error('no resource')
var type = 'content-type'
var xml = /xml/i

module.exports = function (url, cb) {
  http.get(url, function (err, body, res) {
    if (err) return cb(err)

    cb(null, dom(body, {
      xmlMode: xml.test(res.headers[type])
    }))
  })
}
