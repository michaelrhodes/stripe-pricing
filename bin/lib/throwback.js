var slice = Array.prototype.slice

// Accepts a non-standard callback function
// that doesn’t handle the error object.
module.exports = function (fn) {

  // Returns a standard node-style callback that
  // throws if an error is passed through.
  return function (err) {
    if (err) throw err

    // Call the non-standard callback with
    // whatever arguments were passed through,
    // but omit the error, because it’s lame.
    fn.apply(fn, slice.call(arguments, 1))
  }
}
