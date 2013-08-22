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

var slice = Array.prototype.slice;

return thisify;

function thisify(obj) {
  var key, val;
  if(typeof obj !== 'object')
    return obj;

  for (key in obj) {
    val = obj[key];
    if (typeof val !== 'function') 
      continue;

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

}));

