var test = require('tape')
var pricing = require('./index')
var coerced = require('./coerced')

test('keys are ISO 3166-1 alpha-2 country codes', function (assert) {
  Object.keys(pricing).forEach(function (key) {
    assert.ok(/^[A-Z]{2}$/.test(key))
  })
  assert.end()
})

test('values are arrays', function (assert) {
  Object.keys(pricing).forEach(function (key) {
    assert.ok(Array.isArray(pricing[key]))
  })
  assert.end()
})

test('pricing objects look legit', function (assert) {
  Object.keys(pricing).forEach(function (key) {
    pricing[key].forEach(function (price) {
      assert.equal(Object.keys(price).length, 3)
      assert.equal(typeof price.percentage, 'string')
      assert.equal(typeof price.description, 'string')
      assert.ok(price.fee === null || typeof price.fee === 'string')
    })
  })
  assert.end()
})

test('coerced values look legit', function (assert) {
  Object.keys(pricing).forEach(function (key) {
    pricing[key].forEach(function (price) {
      assert.equal(Object.keys(price).length, 3)
      assert.equal(typeof price.percentage, 'number')
      assert.equal(typeof price.fee, 'number')
      assert.equal(typeof price.description, 'string')
    })
  })
  assert.end()
})
