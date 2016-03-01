module.exports = function (str, re) {
  return (str.match(re) || [])[1] || null
}
