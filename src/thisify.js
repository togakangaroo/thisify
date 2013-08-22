(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.thisify = factory();
    }
}(this, function () {
'use strict'

var  slice = Array.prototype.slice
    ;
return thisify;

function thisify(obj, op) {
  op || (op = {})
  var  key, val
      ,checkForThisUsage = op.noThisCheck ? noop : checkForThisUsageWithToString
      ;
  if(typeof obj !== 'object')
    return obj;

  for (key in obj) {
    val = obj[key];
    if (typeof val !== 'function') 
      continue;

    checkForThisUsage(val, key, obj);

    !function (key, val) {
      return obj[key] = function thisifyFn() {
        var args;
        args = slice.call(arguments);
        args.unshift(obj);
        return val.apply( (void 0), args);
      };
    }(key, val);
  }
  return obj;
};

function noop() {}
function checkForThisUsageWithToString(fn, propName, obj) {
  if(!/\Wthis/.test(fn.toString()))
    return;
  console.log("Testing", propName, "of object", obj);
  console.log(fn.toString())
  throw "Detected possible usage of `this`. Thisify shifts usage of `this` to the first parameter, you should use that. To disable this check pass the `noThisCheck` option to thisify."
}
}));

