/**
 * Throttle decorator. Automatically binds method to instance.
 *
 * Use like:
 *
 *   @throttle(250)
 *   myFunction () {
 *     // Probably does something.
 *   }
 */

throttle = function (func, wait) {
  var throttling = false;
  var result;

  return function () {
    var args = Array.prototype.slice.call(arguments);

    if (!throttling) {
      throttling = true;
      result = func.apply(this, arguments);
      setTimeout(function () {
        throttling = false;
      }, wait);
    }
    return result;
  };
};

export default function throttle(delay, options = {}) {
  return function throttleDecorator (target, name, descriptor) {
    if (typeof descriptor === 'undefined') {
      throw new Error('@throttle decorator can only be applied to class methods')
    }

    let method = descriptor.value
    if (typeof method !== 'function') {
      throw new Error('@throttle decorator can only be applied to class methods')
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false

    return {
      configurable: true,
      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(name)) {
          return method
        }

        let throttledMethod = throttle(method.bind(this), delay, options)

        definingProperty = true

        Object.defineProperty(this, name, {
          value: throttledMethod,
          configurable: true,
          writable: true
        })

        definingProperty = false

        return throttledMethod
      }
    }
  }
}
