"use strict";

if (typeof (JSIL) === "undefined")
  throw new Error("JSIL.Core is required");
  
var $jsilcore = JSIL.DeclareAssembly("JSIL.Core");

JSIL.DeclareNamespace("System.ComponentModel");
JSIL.DeclareNamespace("System.Linq");
JSIL.DeclareNamespace("System.Reflection");

JSIL.ImplementExternals(
  "System.Boolean", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (value === false) || (value === true);
    });
  }
);
JSIL.MakeNumericType(Boolean, "System.Boolean", true);

JSIL.ImplementExternals(
  "System.Char", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "string") && (value.length == 1);
    });
  }
);
JSIL.MakeNumericType(String, "System.Char", true);

JSIL.ImplementExternals(
  "System.Byte", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number") && (value >= 0) && (value <= 255);
    });
  }
);
JSIL.MakeNumericType(Number, "System.Byte", true);

$jsilcore.$ParseInt = function (text) {
  return Math.abs(parseInt(text, 10));
};
$jsilcore.$TryParseInt = function (text, result) {
  result.value = parseInt(text, 10);
  return !isNaN(result.value);
};

JSIL.ImplementExternals(
  "System.UInt16", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number") && (value >= 0);
    });

    $.Method({Static:true , Public:true }, "Parse", 
      (new JSIL.MethodSignature($.UInt16, [$.String], [])), 
      $jsilcore.$ParseInt
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      (new JSIL.MethodSignature($.Boolean, [$.String, $jsilcore.TypeRef("JSIL.Reference", [$.UInt16])], [])), 
      $jsilcore.$TryParseInt
    );
  }
);
JSIL.MakeNumericType(Number, "System.UInt16", true);

JSIL.ImplementExternals(
  "System.Int16", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number");
    });

    $.Method({Static:true , Public:true }, "Parse", 
      (new JSIL.MethodSignature($.Int16, [$.String], [])), 
      $jsilcore.$ParseInt
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      (new JSIL.MethodSignature($.Boolean, [$.String, $jsilcore.TypeRef("JSIL.Reference", [$.Int16])], [])), 
      $jsilcore.$TryParseInt
    );
  }
);
JSIL.MakeNumericType(Number, "System.Int16", true);

JSIL.ImplementExternals(
  "System.UInt32", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number") && (value >= 0);
    });

    $.Method({Static:true , Public:true }, "Parse", 
      (new JSIL.MethodSignature($.UInt32, [$.String], [])), 
      $jsilcore.$ParseInt
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      (new JSIL.MethodSignature($.Boolean, [$.String, $jsilcore.TypeRef("JSIL.Reference", [$.UInt32])], [])), 
      $jsilcore.$TryParseInt
    );
  }
);
JSIL.MakeNumericType(Number, "System.UInt32", true);

JSIL.ImplementExternals(
  "System.Int32", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number");
    });

    $.Method({Static:true , Public:true }, "Parse", 
      (new JSIL.MethodSignature($.Int32, [$.String], [])), 
      $jsilcore.$ParseInt
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      (new JSIL.MethodSignature($.Boolean, [$.String, $jsilcore.TypeRef("JSIL.Reference", [$.Int32])], [])), 
      $jsilcore.$TryParseInt
    );
  }
);
JSIL.MakeNumericType(Number, "System.Int32", true);

JSIL.ImplementExternals(
  "System.Int64", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number");
    });

    $.Method({Static:true , Public:true }, "Parse", 
      (new JSIL.MethodSignature($.Int64, [$.String], [])), 
      $jsilcore.$ParseInt
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      (new JSIL.MethodSignature($.Boolean, [$.String, $jsilcore.TypeRef("JSIL.Reference", [$.Int64])], [])), 
      $jsilcore.$TryParseInt
    );
  }
);
JSIL.MakeNumericType(Number, "System.Int64", true);

JSIL.ImplementExternals(
  "System.Single", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number");
    });
    $.RawMethod(true, "IsNaN", isNaN);
  }
);
JSIL.MakeNumericType(Number, "System.Single", false);

JSIL.ImplementExternals(
  "System.Double", function ($) {
    $.RawMethod(true, "CheckType", function (value) {
      return (typeof (value) === "number");
    });
    $.RawMethod(true, "IsNaN", isNaN);
  }
);
JSIL.MakeNumericType(Number, "System.Double", false);

JSIL.ImplementExternals(
  "System.String", function ($) {
    var fromCharArray = function (chars, startIndex, length) {
      var arr = chars.slice(startIndex, length);
      return arr.join("");
    };

    $.Method({Static: false, Public: true }, ".ctor",
      new JSIL.MethodSignature(null, [System.Array.Of($jsilcore.TypeRef("System.Char")), "System.Int32", "System.Int32"], [], $jsilcore),
      fromCharArray
    );

    $.Method({Static: false, Public: true }, ".ctor",
      new JSIL.MethodSignature(null, [System.Array.Of($jsilcore.TypeRef("System.Char"))], [], $jsilcore),
      function (chars) {
        return fromCharArray.call(this, chars, 0, chars.length);
      }
    );

    $.Method({Static: false, Public: true }, ".ctor",
      new JSIL.MethodSignature(null, ["System.Char", "System.Int32"], [], $jsilcore),
      function (ch, length) {
        var arr = new Array(length);
        for (var i = 0; i < length; i++)
          arr[i] = ch;
        return arr.join("");
      }
    );

    $.RawMethod(true, "CheckType",
      function (value) {
        return (typeof (value) === "string") || (
          (typeof (value.text) === "string") && (value.__proto__ === prototype)
        );
      }
    );

    var compareInternal = function (lhs, rhs, comparison) {
      switch (comparison.valueOf()) {
        case 1: // System.StringComparison.CurrentCultureIgnoreCase:
        case 3: // System.StringComparison.InvariantCultureIgnoreCase:
        case 5: // System.StringComparison.OrdinalIgnoreCase:
          lhs = lhs.toLowerCase();
          rhs = rhs.toLowerCase();
          break;
      }

      if (lhs < rhs)
        return -1;
      else if (lhs > rhs)
        return 1;
      else
        return 0;
    };

    $.Method({Static:true , Public:true }, "Compare", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [$jsilcore.TypeRef("System.String"), $jsilcore.TypeRef("System.String")], []),
      function (lhs, rhs) {
        return compareInternal(lhs, rhs, System.StringComparison.Ordinal);
      }
    );

    $.Method({Static:true , Public:true }, "Compare", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [
          $jsilcore.TypeRef("System.String"), $jsilcore.TypeRef("System.String"), 
          $jsilcore.TypeRef("System.Boolean")
        ], []),
      function (lhs, rhs, ignoreCase) {
        return compareInternal(
          lhs, rhs, ignoreCase ? 
            System.StringComparison.OrdinalIgnoreCase : 
            System.StringComparison.Ordinal
        );
      }
    );

    $.Method({Static:true , Public:true }, "Compare", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [
          $jsilcore.TypeRef("System.String"), $jsilcore.TypeRef("System.String"), 
          $jsilcore.TypeRef("System.StringComparison")
        ], []),
      compareInternal
    );

    var concatInternal = function (firstValue) {
      if (JSIL.IsArray(firstValue) && arguments.length == 1) {
        return JSIL.ConcatString.apply(null, firstValue);
      } else {
        return JSIL.ConcatString(Array.prototype.slice.call(arguments));
      }
    };

    $.Method({Static:true , Public:true }, "Concat", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.String"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["T"]),
      concatInternal
    );

    $.Method({Static:true , Public:true }, "Concat", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.String"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", [$jsilcore.TypeRef("System.String")])], []),
      concatInternal
    );

    $.Method({Static: true , Public: true }, "EndsWith",
      new JSIL.MethodSignature("System.Boolean", ["System.String", "System.String"], [], $jsilcore),
      function (str, text) {
        return str.lastIndexOf(text) === str.length - text.length;
      }
    );

    $.Method({Static:true , Public:true }, "Format", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.String"), [$jsilcore.TypeRef("System.Array") /* AnyType[] */ ], []),
      function (format) {
        format = String(format);

        var regex = new RegExp("{([0-9]*)(?::([^}]*))?}", "g");
        var match = null;

        var values = Array.prototype.slice.call(arguments, 1);

        if ((values.length == 1) && JSIL.IsArray(values[0]))
          values = values[0];

        var matcher = function (match, index, valueFormat, offset, str) {
          index = parseInt(index);

          var value = values[index];

          if (valueFormat) {

            switch (valueFormat[0]) {
              case 'f':
              case 'F':
              case 'n':
              case 'N':
                var digits = parseInt(valueFormat.substr(1));
                return parseFloat(value).toFixed(digits);

              default:
                throw new Error("Unsupported format string: " + valueFormat);
            }
          } else {

            if (typeof (value) === "boolean") {
              if (value)
                return "True";
              else
                return "False";
            } else {
              return String(value);
            }
          }
        };

        return format.replace(regex, matcher);
      }
    );

    $.Method({Static:false, Public:true }, "IndexOfAny", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [System.Array.Of($jsilcore.System.Char), $jsilcore.TypeRef("System.Int32")], []),
      function (str, chars) {
        var result = null;
        for (var i = 0; i < chars.length; i++) {
          var index = str.indexOf(chars[i]);
          if ((result === null) || (index < result))
            result = index;
        }

        if (result === null)
          return -1;
        else
          return result;
      }
    );

    $.Method({Static:true , Public:true }, "IsNullOrEmpty", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [$jsilcore.TypeRef("System.String")], []),
      function (str) {
        if (str === null)
          return true;
        else if (typeof (str) === "undefined")
          return true;
        else if (str.length === 0)
          return true;

        return false;
      }
    );

    $.Method({Static:false, Public:true }, "LastIndexOfAny", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [System.Array.Of($jsilcore.System.Char), $jsilcore.TypeRef("System.Int32")], []),
      function (str, chars) {
        var result = null;
        for (var i = 0; i < chars.length; i++) {
          var index = str.lastIndexOf(chars[i]);
          if ((result === null) || (index > result))
            result = index;
        }

        if (result === null)
          return -1;
        else
          return result;
      }
    );

    $.Method({Static: true , Public: true }, "Replace",
      new JSIL.MethodSignature("System.String", ["System.String", "System.String", "System.String"], [], $jsilcore),
      function (str, oldText, newText) {
        return str.split(oldText).join(newText);
      }
    );

    $.Method({Static: true , Public: true }, "StartsWith",
      new JSIL.MethodSignature("System.Boolean", ["System.String", "System.String"], [], $jsilcore),
      function (str, text) {
        return str.indexOf(text) === 0;
      }
    );
  }
);

JSIL.MakeClass("System.Object", "System.String", true, [], function ($) {
  $.__IsNativeType__ = true;

  $.Constant({Static: true , Public: true }, "Empty", "");
});

JSIL.MakeClass("System.Object", "System.ComponentModel.MemberDescriptor", true);
JSIL.MakeClass("System.ComponentModel.MemberDescriptor", "System.ComponentModel.PropertyDescriptor", true);
JSIL.MakeClass("System.Object", "System.ComponentModel.TypeConverter", true);
JSIL.MakeClass("System.ComponentModel.TypeConverter", "System.ComponentModel.ExpandableObjectConverter", true);

$jsilcore.$GetInvocationList = function (delegate) {
    if (delegate === null) {
      return [ ];
    } else if (typeof (delegate.GetInvocationList) === "function") {
      return delegate.GetInvocationList();
    } else if (typeof (delegate) === "function") {
      return [ delegate ];
    } else {
      throw new Error("Unsupported target for GetInvocationList");
    }
};
$jsilcore.$Combine = function (lhs, rhs) {
  if (rhs === null) {
    return lhs;
  } else if (lhs === null) {
    return rhs;
  }

  var newList = Array.prototype.slice.call($jsilcore.$GetInvocationList(lhs));
  newList.push.apply(newList, $jsilcore.$GetInvocationList(rhs));
  var result = JSIL.MulticastDelegate.New(newList);
  return result;
};
$jsilcore.$Remove = function (lhs, rhs) {
  if (rhs === null)
    return lhs;
  if (lhs === null)
    return null;

  var newList = Array.prototype.slice.call($jsilcore.$GetInvocationList(lhs));
  var rhsList = $jsilcore.$GetInvocationList(rhs);

  for (var i = 0; i < rhsList.length; i++) {
    var needle = rhsList[i];

    __inner:
    for (var j = 0; j < newList.length; j++) {
      var haystack = newList[j];
      if ((haystack.__method__ === needle.__method__) &&
          (haystack.__object__ === needle.__object__)
      ) {
        newList.splice(j, 1);
        break __inner;
      }
    }
  }

  if (newList.length == 0)
    return null;
  else if (newList.length == 1)
    return newList[0];
  else
    return JSIL.MulticastDelegate.New(newList);
};

JSIL.ImplementExternals("System.Delegate", function ($) {
  var tDelegate = $jsilcore.TypeRef("System.Delegate");

  $.RawMethod(false, "Invoke", function () {
    return this.__method__.apply(this.__object__, arguments);
  });

  $.Method({Static:false, Public:true }, "GetInvocationList", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [tDelegate]), [], [])), 
    function GetInvocationList () {
      return [ this ];
    }
  );

  $.Method({Static:true , Public:true }, "Combine", 
    (new JSIL.MethodSignature(tDelegate, [tDelegate, tDelegate], [])), 
    $jsilcore.$Combine
  );

  $.Method({Static:true , Public:true }, "Remove", 
    (new JSIL.MethodSignature(tDelegate, [tDelegate, tDelegate], [])), 
    $jsilcore.$Remove
  );
});

JSIL.ImplementExternals("System.MulticastDelegate", function ($) {
  $.RawMethod(false, "Invoke", function () {
    return this.apply(null, arguments);
  });

  $.Method({Static:false, Public:true }, "GetInvocationList", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [$jsilcore.TypeRef("System.Delegate")]), [], [])), 
    function GetInvocationList () {
      return this.delegates;
    }
  );
});

JSIL.MakeClass("System.Object", "System.Delegate", true, []);
JSIL.MakeClass("System.Object", "System.MulticastDelegate", true, []);

JSIL.MulticastDelegate.New = function (delegates) {
  var invoker = function () {
    var result;
    for (var i = 0, l = this.length; i < l; i++) {
      var d = this[i];
      result = d.apply(null, arguments);
    }
    return result;
  };

  var result = invoker.bind(delegates);
  result.delegates = delegates;
  result.__proto__ = System.MulticastDelegate.prototype;
  Object.seal(result);
  return result;
};

JSIL.MakeDelegate("System.Action", true, []);
JSIL.MakeDelegate("System.Action`1", true, ["T"]);
JSIL.MakeDelegate("System.Action`2", true, ["T1", "T2"]);
JSIL.MakeDelegate("System.Action`3", true, ["T1", "T2", "T3"]);

JSIL.MakeDelegate("System.Func`1", true, ["TResult"]);
JSIL.MakeDelegate("System.Func`2", true, ["T", "TResult"]);
JSIL.MakeDelegate("System.Func`3", true, ["T1", "T2", "TResult"]);
JSIL.MakeDelegate("System.Func`4", true, ["T1", "T2", "T3", "TResult"]);

JSIL.ImplementExternals(
  "System.Exception", function ($) {
    $.Field({Static: false, Public: false}, "_Message", $.String, null);

    $.Method({Static: false, Public: true }, ".ctor",
      new JSIL.MethodSignature(null, [$.String]),
      function (message) {
        if (typeof (message) !== "undefined")
          this._Message = String(message);
      }
    );

    $.Method({Static: false, Public: true }, "get_Message",
      new JSIL.MethodSignature($.String, []),
      function () {
        if ((typeof (this._Message) === "undefined") || (this._Message === null))
          return System.String.Format("Exception of type '{0}' was thrown.", JSIL.GetTypeName(this));
        else
          return this._Message;
      }
    );

    $.Method({Static: false, Public: true }, "toString",
      new JSIL.MethodSignature($.String, []),
      function () {
        var message = this.Message;
        return System.String.Format("{0}: {1}", JSIL.GetTypeName(this), message);
      }
    );
  }
);

JSIL.ImplementExternals(
  "System.SystemException", function ($) {
    $.Method({Static:false, Public:true }, ".ctor", 
      new JSIL.MethodSignature(null, [], []),
      function () {
        System.Exception.prototype._ctor.call(this);
      }
    );

    $.Method({Static:false, Public:true }, ".ctor", 
      new JSIL.MethodSignature(null, [$.String], []),
      function (message) {
        System.Exception.prototype._ctor.call(this, message);
      }
    );
  }
);

JSIL.MakeClass(Error, "System.Exception", true, [], function ($) {
  $.Property({Public: true , Static: false}, "Message");
});

JSIL.MakeClass("System.Exception", "System.InvalidCastException", true);
JSIL.MakeClass("System.Exception", "System.InvalidOperationException", true);

JSIL.ImplementExternals("System.Console", function ($) {
  $.RawMethod(true, "WriteLine", function () {
    var text = "";
    if (arguments.length > 0)
      text = System.String.Format.apply(null, arguments);

    JSIL.Host.logWriteLine(text);
  });

  $.RawMethod(true, "Write", function () {
    var text = "";
    if (arguments.length > 0)
      text = System.String.Format.apply(null, arguments);

    JSIL.Host.logWrite(text);
  });
});

JSIL.ImplementExternals(
  "System.Diagnostics.Debug", function ($) {
    $.Method({Static:true , Public:true }, "WriteLine", 
      (new JSIL.MethodSignature(null, [$.String], [])), 
      function WriteLine (message) {
      JSIL.Host.logWriteLine(text);
      }
    );
  }
);

JSIL.MakeStaticClass("System.Console", true, [], function ($) {
});

JSIL.SplitString = function (str, separators) {
  if (separators.length > 1)
    throw new Error("Split cannot handle more than one separator");

  return str.split(separators[0]);
};

JSIL.ConcatString = function (/* ...values */) {
  var result = String(arguments[0]);

  for (var i = 1, l = arguments.length; i < l; i++) {
    var arg = arguments[i];
    if (typeof (arg) === "string")
      result += arg;
    else
      result += String(arg);
  }

  return result;
};

JSIL.MakeClass("System.Object", "JSIL.ArrayEnumerator", true, ["T"], function ($) {
  $.Method({Public: true , Static: false}, ".ctor", 
    new JSIL.MethodSignature(null, [$jsilcore.TypeRef("System.Array", ["!!0"]), $.Int32]),
    function (array, startPosition) {
      this._array = array;
      this._length = array.length;
      this._index = startPosition;
    }
  );

  $.Method({Public: true , Static: false}, "Reset", 
    new JSIL.MethodSignature(null, []),
    function () {
      if (this._array === null)
        throw new Error("Enumerator is disposed or not initialized");

      this._index = -1;
    }
  );
  $.Method({Public: true , Static: false}, "MoveNext", 
    new JSIL.MethodSignature(System.Boolean, []),
    function () {
      if (this._index >= this._length)
        return false;

      this._index += 1;
      return (this._index < this._length);
    }
  );
  $.Method({Public: true , Static: false}, "Dispose", 
    new JSIL.MethodSignature(null, []),
    function () {
      this._array = null;
      this._index = 0;
      this._length = -1;
    }
  );
  $.Method({Public: true , Static: false}, "get_Current", 
    new JSIL.MethodSignature(System.Object, []),
    function () {
      return this._array[this._index];
    }
  );

  $.Property({Public: true , Static: false}, "Current");

  $.ImplementInterfaces(
    System.IDisposable, System.Collections.IEnumerator,
    $jsilcore.TypeRef("System.Collections.Generic.IEnumerator`1", [new JSIL.GenericParameter("T", "JSIL.ArrayEnumerator")])
  );
});

JSIL.ImplementExternals(
  "System.Threading.Thread", function ($) {
    $.Method({Static:true , Public:true }, ".cctor2", 
      (new JSIL.MethodSignature(null, [], [])), 
      function () {
        // This type already has a cctor, so we add a second one.
        System.Threading.Thread._currentThread = new System.Threading.Thread();
      }
    );

    $.Method({Static:true , Public:true }, "get_CurrentThread", 
      (new JSIL.MethodSignature($jsilcore.TypeRef("System.Threading.Thread"), [], [])), 
      function get_CurrentThread () {
        return System.Threading.Thread._currentThread;
      }
    );

    $.Method({Static:false, Public:true }, "get_ManagedThreadId", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_ManagedThreadId () {
        return 0;
      }
    );
  }
);

JSIL.MakeClass("System.Object", "System.Threading.Thread", true, [], function ($) {
  $.Field({Public: false, Static: true}, "_currentThread", $.Type, function ($) { return null; });

  $.ExternalMethod(
    {Public: true , Static: true }, "get_CurrentThread",
    new JSIL.MethodSignature($.Type, [])
  );
  $.ExternalMethod(
    {Public: true , Static: true }, "get_ManagedThreadId",
    new JSIL.MethodSignature(System.Int32, [])
  );

  $.Property({Public: true , Static: true }, "CurrentThread");
  $.Property({Public: true , Static: true }, "ManagedThreadId");
});

$jsilcore.$ListExternals = function ($) {
  var mscorlib = JSIL.GetCorlib();

  var indexOfImpl = function (value) {
    for (var i = 0; i < this._size; i++) {
      var item = this._items[i];

      if (JSIL.ObjectEquals(item, value))
        return i;
    }

    return -1;
  };

  var findIndexImpl = function (predicate) {
    for (var i = 0; i < this._size; i++) {
      var item = this._items[i];
      if (predicate(item))
        return i;
    }

    return -1;
  };

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [], []),
    function () {
      this._items = new Array();
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Int32")], []),
    function (size) {
      this._items = new Array(size);
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Collections.Generic.IEnumerable`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (values) {
      this._items = JSIL.EnumerableToArray(values);
      this._size = this._items.length;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, "Add", 
    new JSIL.MethodSignature(null, [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")], []),
    function (item) {
      if (this._size >= this._items.length) {
        this._items.push(item);
      } else {
        this._items[this._size] = item;
      }
      this._size += 1;
    }
  );

  $.Method({Static:false, Public:true }, "AddRange", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Collections.Generic.IEnumerable`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (items) {
      var e = JSIL.GetEnumerator(items);
      try {
        while (e.MoveNext())
          this.Add(e.Current);
      } finally {
        e.IDisposable_Dispose();
      }
    }
  );

  var tCollection = [null];

  $.Method({Static:false, Public:true }, "AsReadOnly", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Collections.ObjectModel.ReadOnlyCollection`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]), [], []),
    function () {
      // FIXME
      if (tCollection[0] === null) {
        tCollection[0] = System.Collections.ObjectModel.ReadOnlyCollection$b1.Of(this.T);
      }

      return new (tCollection[0])(this);
    }
  );

  $.Method({Static:false, Public:true }, "Clear", 
    new JSIL.MethodSignature(null, [], []),
    function () {
      this._size = 0;
    }
  );

  $.Method({Static:false, Public:true }, "Contains", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Boolean"), [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")], []),
    function (value) {
      return indexOfImpl.call(this, value) >= 0;
    }
  );

  $.Method({Static:false, Public:true }, "Exists", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Boolean"), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (predicate) {
      return findIndexImpl.call(this, predicate) >= 0;
    }
  );

  $.Method({Static:false, Public:true }, "Find", 
    new JSIL.MethodSignature(new JSIL.GenericParameter("T", "System.Collections.Generic.List`1"), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (predicate) {
      var index = this.FindIndex$0(predicate);
      if (index >= 0)
        return this._items[index];
      else
        return JSIL.DefaultValue(this.T);
    }
  );

  $.Method({Static:false, Public:true }, "FindAll", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Collections.Generic.List`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (predicate) {
      var thisType = this.GetType();

      // Manually initialize the result since we don't want to hassle with overloaded ctors
      var result = JSIL.CreateInstanceOfType(thisType, null);
      result._items = [];

      for (var i = 0; i < this._size; i++) {
        var item = this._items[i];

        if (predicate(item))
          result._items.push(item);
      }

      result._size = result._items.length;
      return result;
    }
  );

  $.Method({Static:false, Public:true }, "FindIndex", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    findIndexImpl
  );

  $.Method({Static:false, Public:true }, "get_Capacity", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [], []),
    function () {
      return this._items.length;
    }
  );

  $.Method({Static:false, Public:true }, "get_Count", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [], []),
    function () {
      return this._size;
    }
  );

  $.Method({Static:false, Public:true }, "get_Item", 
    new JSIL.MethodSignature(new JSIL.GenericParameter("T", "System.Collections.Generic.List`1"), [mscorlib.TypeRef("System.Int32")], []),
    function (index) {
      if (index < 0)
        throw new System.ArgumentOutOfRangeException("index");
      else if (index >= this._size)
        throw new System.ArgumentOutOfRangeException("index");

      return this._items[index];
    }
  );

  $.Method({Static:false, Public:true }, "GetEnumerator", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Collections.Generic.List`1/Enumerator", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]), [], []),
    function () {
      // Detect whether we are a List<T> or an ArrayList.
      if (this.$thisEnumeratorType === null) {
        var elementType = this.T;
        if (typeof (elementType) === "undefined")
          elementType = System.Object;

        this.$thisEnumeratorType = System.Collections.Generic.List$b1_Enumerator.Of(elementType)
      }

      return new (this.$thisEnumeratorType)(this);
    }
  );

  $.Method({Static:false, Public:true }, "IndexOf", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")], []),
    indexOfImpl
  );

  $.Method({Static:false, Public:true }, "Remove", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Boolean"), [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")], []),
    function (item) {
      var index = this._items.indexOf(item);
      if (index === -1)
        return false;

      this.RemoveAt(index);
    }
  );

  $.Method({Static:false, Public:true }, "RemoveAll", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (predicate) {
      for (var i = 0; i < this._size; i++) {
        var item = this._items[i];

        if (predicate(item)) {
          this._items.splice(i, 1);
          i -= 1;
          this._size -= 1;
        }
      }
    }
  );

  $.Method({Static:false, Public:true }, "RemoveAt", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Int32")], []),
    function (index) {
      this._items.splice(index, 1);
      this._size -= 1;
    }
  );

  $.Method({Static:false, Public:true }, "Sort", 
    new JSIL.MethodSignature(null, [], []),
    function () {
      this._items.sort();
    }
  );

  $.Method({Static:false, Public:true }, "Sort", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Comparison`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (comparison) {
      this._items.sort(comparison);
    }
  );

  $.Method({Static:false, Public:true }, "ToArray", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]), [], []),
    function () {
      return Array.prototype.slice.call(this._items, 0, this._size);
    }
  );

  $.Method({Static:false, Public:true }, "ToArray", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]), [], []),
    function () {
      return Array.prototype.slice.call(this._items, 0, this._size);
    }
  );

  $.Method({Static:false, Public:true }, "TrueForAll", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Boolean"), [mscorlib.TypeRef("System.Predicate`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")])], []),
    function (predicate) {
      for (var i = 0; i < this._size; i++) {
        var item = this._items[i];

        if (!predicate(item))
          return false;
      }

      return true;
    }
  );
};

JSIL.ImplementExternals("System.Collections.Generic.List`1", $jsilcore.$ListExternals);

$jsilcore.$ArrayListExternals = function ($) {
  $jsilcore.$ListExternals($);

  var mscorlib = JSIL.GetCorlib();
  var toArrayImpl = function () {
    return Array.prototype.slice.call(this._items, 0, this._size);
  };

  $.Method({Static:false, Public:true }, "ToArray", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Array", [mscorlib.TypeRef("System.Object")]), [], []),
    toArrayImpl
  );

  $.Method({Static:false, Public:true }, "ToArray", 
    new JSIL.MethodSignature(mscorlib.TypeRef("System.Array"), [mscorlib.TypeRef("System.Type")], []),
    toArrayImpl
  );
};

// Lazy way of sharing method implementations between ArrayList, Collection<T> and List<T>.
JSIL.ImplementExternals("System.Collections.ArrayList", $jsilcore.$ArrayListExternals);

$jsilcore.$CollectionExternals = function ($) {
  $jsilcore.$ListExternals($);

  var mscorlib = JSIL.GetCorlib();

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [], []),
    function () {
      this._items = new Array();
      this._size = 0;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Collections.Generic.IList`1", [new JSIL.GenericParameter("T", "System.Collections.ObjectModel.Collection`1")])], []),
    function (list) {
      this._items = JSIL.EnumerableToArray(list);
      this._size = this._items.length;
    }
  );
};

JSIL.ImplementExternals("System.Collections.ObjectModel.Collection`1", $jsilcore.$CollectionExternals);

$jsilcore.$ReadOnlyCollectionExternals = function ($) {
  $jsilcore.$ListExternals($);

  var mscorlib = JSIL.GetCorlib();

  $.Method({Static:false, Public:true }, ".ctor", 
    new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Collections.Generic.IList`1", [new JSIL.GenericParameter("T", "System.Collections.ObjectModel.ReadOnlyCollection`1")])], []),
    function (list) {
      this._list = list;

      Object.defineProperty(this, "_items", {
        get: function () {
          return list._items;
        }
      });

      Object.defineProperty(this, "_size", {
        get: function () {
          return list._size;
        }
      });
    }
  );

  $.SetValue("Add", null);
  $.SetValue("Clear", null);
  $.SetValue("Remove", null);
  $.SetValue("RemoveAt", null);
  $.SetValue("RemoveAll", null);
  $.SetValue("Sort", null);
};

JSIL.ImplementExternals("System.Collections.ObjectModel.ReadOnlyCollection`1", $jsilcore.$ReadOnlyCollectionExternals);

JSIL.ImplementExternals("System.Collections.Generic.Stack`1", function ($) {
  var system = JSIL.GetAssembly("System", true);

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [], [])), 
    function _ctor () {
      this._items = new Array();
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function _ctor (capacity) {
      this._items = new Array(capacity);
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, "Clear", 
    (new JSIL.MethodSignature(null, [], [])), 
    function Clear () {
      this._size = 0;
    }
  );

  $.Method({Static:false, Public:true }, "get_Count", 
    (new JSIL.MethodSignature($.Int32, [], [])), 
    function get_Count () {
      return this._size;
    }
  );

  $.Method({Static:false, Public:true }, "GetEnumerator", 
    (new JSIL.MethodSignature(system.TypeRef("System.Collections.Generic.Stack`1/Enumerator", [new JSIL.GenericParameter("T", "System.Collections.Generic.Stack`1")]), [], [])), 
    function GetEnumerator () {
      if (this.$thisEnumeratorType === null) {
        var elementType = this.T;
        this.$thisEnumeratorType = System.Collections.Generic.List$b1_Enumerator.Of(elementType)
      }

      return new (this.$thisEnumeratorType)(this);
    }
  );

  $.Method({Static:false, Public:true }, "Peek", 
    (new JSIL.MethodSignature(new JSIL.GenericParameter("T", "System.Collections.Generic.Stack`1"), [], [])), 
    function Peek () {
      if (this._size <= 0)
        throw new System.InvalidOperationException("Stack is empty");

      return this._items[this._size - 1];
    }
  );

  $.Method({Static:false, Public:true }, "Pop", 
    (new JSIL.MethodSignature(new JSIL.GenericParameter("T", "System.Collections.Generic.Stack`1"), [], [])), 
    function Pop () {
      var result = this._items.pop();
      this._size -= 1;

      return result;
    }
  );

  $.Method({Static:false, Public:true }, "Push", 
    (new JSIL.MethodSignature(null, [new JSIL.GenericParameter("T", "System.Collections.Generic.Stack`1")], [])), 
    function Push (item) {
      this._items.push(item)
      this._size += 1;
    }
  );

});

JSIL.ImplementExternals("System.Collections.Generic.Queue`1", function ($) {
  var system = JSIL.GetAssembly("System", true);

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [], [])), 
    function _ctor () {
      this._items = new Array();
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function _ctor (capacity) {
      this._items = new Array(capacity);
      this._size = 0;
      this.$thisEnumeratorType = null;
    }
  );

  $.Method({Static:false, Public:true }, "Clear", 
    (new JSIL.MethodSignature(null, [], [])), 
    function Clear () {
      this._size = 0;
    }
  );

  $.Method({Static:false, Public:true }, "Dequeue", 
    (new JSIL.MethodSignature(new JSIL.GenericParameter("T", "System.Collections.Generic.Queue`1"), [], [])), 
    function Dequeue () {
      var result = this._items.shift();
      this._size -= 1;
      return result;
    }
  );

  $.Method({Static:false, Public:true }, "Enqueue", 
    (new JSIL.MethodSignature(null, [new JSIL.GenericParameter("T", "System.Collections.Generic.Queue`1")], [])), 
    function Enqueue (item) {
      this._items.push(item);
      this._size += 1;
    }
  );

  $.Method({Static:false, Public:true }, "get_Count", 
    (new JSIL.MethodSignature($.Int32, [], [])), 
    function get_Count () {
      return this._size;
    }
  );

  $.Method({Static:false, Public:true }, "GetEnumerator", 
    (new JSIL.MethodSignature(system.TypeRef("System.Collections.Generic.Queue`1/Enumerator", [new JSIL.GenericParameter("T", "System.Collections.Generic.Queue`1")]), [], [])), 
    function GetEnumerator () {
      if (this.$thisEnumeratorType === null) {
        var elementType = this.T;
        this.$thisEnumeratorType = System.Collections.Generic.List$b1_Enumerator.Of(elementType)
      }

      return new (this.$thisEnumeratorType)(this);
    }
  );

});

JSIL.MakeClass("System.Object", "JSIL.EnumerableArray", true, [], function ($) {
  $.Method({Public: true , Static: false}, ".ctor", 
    new JSIL.MethodSignature(null, [System.Array]),
    function (array) {
      this.array = array;
    }
  );

  var tEnumerator = [null];

  $.Method({Public: true , Static: false}, "GetEnumerator", 
    new JSIL.MethodSignature(System.Collections.IEnumerator$b1, []),
    function () {
      if (tEnumerator[0] === null) {
        tEnumerator[0] = JSIL.ArrayEnumerator.Of(System.Object);
      }

      return new (tEnumerator[0])(this.array, -1);
    }
  );

  $.ImplementInterfaces(
    System.Collections.IEnumerable, System.Collections.Generic.IEnumerable$b1
  );
});

JSIL.MakeClass("System.Object", "System.Collections.Generic.List`1", true, ["T"], function ($) {
  $.ExternalMembers(true, 
    "_ctor", "Add", "AddRange", "Remove", "RemoveAt", "Clear", 
    "get_Item", "get_Count", "get_Capacity", "GetEnumerator"
  );

  $.Property({Public: true , Static: false}, "Count");

  $.ImplementInterfaces(
    $jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1")]),
    "System.Collections.IEnumerable"
  );
});

JSIL.MakeClass("System.Object", "System.Collections.Generic.Stack`1", true, ["T"], function ($) {
	$.ExternalMembers(true, 
		"_ctor$0", "_ctor$1", "_ctor$2", "Clear", "Contains", "CopyTo", "get_Count", "GetEnumerator", "ICollection_CopyTo", "ICollection_get_IsSynchronized", "ICollection_get_SyncRoot", "IEnumerable$b1_GetEnumerator", "IEnumerable_GetEnumerator", "Peek", "Pop", "Push", "ToArray", "TrimExcess"
	);

	$.Property({Public: true , Static: false}, "Count");

	$.ImplementInterfaces(
		$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.Stack`1")]), 
    "System.Collections.IEnumerable"
	);
});

// TODO: This type is actually a struct in the CLR
JSIL.MakeClass($jsilcore.TypeRef("JSIL.ArrayEnumerator", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1/Enumerator")]), "System.Collections.Generic.List`1/Enumerator", true, ["T"], function ($) {
  $.Field({Public: false, Static: false}, "_array", Array, function ($) { return null; });
  $.Field({Public: false, Static: false}, "_length", Number, function ($) { return 0; });
  $.Field({Public: false, Static: false}, "_index", Number, function ($) { return -1; });

  $.Method({Public: true, Static: false}, ".ctor", 
    new JSIL.MethodSignature(null, ["System.Collections.Generic.List`1"]),
    function (list) {
      if (typeof (list) != "undefined") {
        this._array = list._items;
        this._length = list.Count;
      }
    }
  );

  $.ImplementInterfaces(
    $jsilcore.TypeRef("System.Collections.Generic.IEnumerator`1", [new JSIL.GenericParameter("T", "System.Collections.Generic.List`1/Enumerator")])
  );
});

JSIL.ImplementExternals(
  "System.Threading.Interlocked", function ($) {
    $.Method({Public: true , Static: true }, "CompareExchange", 
      new JSIL.MethodSignature("!!0", [JSIL.Reference.Of("!!0"), "!!0", "!!0"], ["T"]),
      function (T, targetRef, value, comparand) {
        var currentValue = targetRef.value;

        if (currentValue === comparand)
          targetRef.value = value;

        return currentValue;
      }
    );
  }
);

JSIL.ImplementExternals("System.Threading.Monitor", function ($) {
  var enterImpl = function (obj) {
    var current = (obj.__LockCount__ || 0);
    if (current >= 1)
      JSIL.Host.warning("Warning: lock recursion ", obj);

    obj.__LockCount__ = current + 1;

    return true;
  };

  $.Method({Static:true , Public:true }, "Enter", 
    (new JSIL.MethodSignature(null, [$.Object], [])), 
    function Enter (obj) {
      enterImpl(obj);
    }
  );

  $.Method({Static:true , Public:true }, "Enter", 
    (new JSIL.MethodSignature(null, [$.Object, $jsilcore.TypeRef("JSIL.Reference", [$.Boolean])], [])), 
    function Enter (obj, /* ref */ lockTaken) {
      lockTaken.value = enterImpl(obj);
    }
  );

  $.Method({Static:true , Public:true }, "Exit", 
    (new JSIL.MethodSignature(null, [$.Object], [])), 
    function Exit (obj) {
      var current = (obj.__LockCount__ || 0);
      if (current <= 0)
        JSIL.Host.warning("Warning: unlocking an object that is not locked ", obj);

      obj.__LockCount__ = current - 1;
    }
  );

});

JSIL.MakeStaticClass("System.Threading.Interlocked", true, [], function ($) {
  $.ExternalMethod({Public: true , Static: true }, "CompareExchange", 
    new JSIL.MethodSignature("!!0", [JSIL.Reference.Of("!!0"), "!!0", "!!0"], ["T"])
  );
});
JSIL.MakeStaticClass("System.Threading.Monitor", true, []);

JSIL.ImplementExternals("System.Random", function ($) {
  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [], [])), 
    function _ctor () {
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function _ctor (Seed) {
      JSIL.Host.warning("Cannot seed the JS random number generator.");
    }
  );

  $.Method({Static:false, Public:true }, "Next", 
    (new JSIL.MethodSignature($.Int32, [], [])), 
    function Next () {
      return Math.floor(Math.random() * Int32.MaxValue);
    }
  );

  $.Method({Static:false, Public:true }, "Next", 
    (new JSIL.MethodSignature($.Int32, [$.Int32, $.Int32], [])), 
    function Next (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    }
  );

  $.Method({Static:false, Public:true }, "Next", 
    (new JSIL.MethodSignature($.Int32, [$.Int32], [])), 
    function Next (maxValue) {
      return Math.floor(Math.random() * maxValue);
    }
  );

  $.Method({Static:false, Public:true }, "NextDouble", 
    (new JSIL.MethodSignature($.Double, [], [])), 
    Math.random
  );
});

JSIL.MakeClass("System.Object", "System.Random", true, [], function ($) {
});

JSIL.$MathSign = function (value) {
  if (value > 0)
    return 1;
  else if (value < 0)
    return -1;
  else
    return 0;
};

JSIL.ImplementExternals("System.Math", function ($) {
  $.RawMethod(true, "Max", Math.max);
  $.RawMethod(true, "Min", Math.min);

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.SByte], [])), 
    JSIL.$MathSign
  );

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.Int16], [])), 
    JSIL.$MathSign
  );

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.Int32], [])), 
    JSIL.$MathSign
  );

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.Int64], [])), 
    JSIL.$MathSign
  );

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.Single], [])), 
    JSIL.$MathSign
  );

  $.Method({Static:true , Public:true }, "Sign", 
    (new JSIL.MethodSignature($.Int32, [$.Double], [])), 
    JSIL.$MathSign
  );
});

JSIL.MakeStaticClass("System.Math", true, function ($) {
});

JSIL.MakeStruct("System.ValueType", "System.Decimal", true, [], function ($) {
  var mscorlib = JSIL.GetCorlib();

  var ctorImpl = function (value) {
    this.value = Number(value);
  };

  var decimalToNumber = function (decimal) {
    if (JSIL.CheckType(decimal, $.Type))
      return decimal.value;
    else
      return decimal;
  };

  var numberToDecimal = function (value) {
    var result = JSIL.CreateInstanceOfType($.Type, null);
    result.value = Number(value);
    return result;
  };

  $.Method({Static: false, Public: true }, "toString",
    new JSIL.MethodSignature("System.String", []),
    function (format) {
      return this.value.toString();
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Int32")], [])),
    ctorImpl
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.UInt32")], [])),
    ctorImpl
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.Int64")], [])),
    ctorImpl
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [mscorlib.TypeRef("System.UInt64")], [])),
    ctorImpl
  );

  $.Method({Static:true , Public:true }, "op_Addition", 
    (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])),
    function (lhs, rhs) {
      return numberToDecimal(decimalToNumber(lhs) + decimalToNumber(rhs));
    }
  );

  $.Method({Static:true , Public:true }, "op_Division", 
    (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])),
    function (lhs, rhs) {
      return numberToDecimal(decimalToNumber(lhs) / decimalToNumber(rhs));
    }
  );

  $.Method({Static:true , Public:true }, "op_Multiply", 
    (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])),
    function (lhs, rhs) {
      return numberToDecimal(decimalToNumber(lhs) * decimalToNumber(rhs));
    }
  );

  $.Method({Static:true , Public:true }, "op_Subtraction", 
    (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])),
    function (lhs, rhs) {
      return numberToDecimal(decimalToNumber(lhs) - decimalToNumber(rhs));
    }
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature($.Type, [mscorlib.TypeRef("System.Single")], [])),
    numberToDecimal
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature($.Type, [mscorlib.TypeRef("System.Double")], [])),
    numberToDecimal
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Byte"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.SByte"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Int16"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.UInt16"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Int32"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.UInt32"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Int64"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.UInt64"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Single"), [$.Type], [])),
    decimalToNumber
  );

  $.Method({Static:true , Public:true }, "op_Explicit", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Double"), [$.Type], [])),
    decimalToNumber
  );

  $.Field({Static: false, Public: false }, "value", mscorlib.TypeRef("System.Double"), function () {
    return 0;
  });
});

System.Environment.GetResourceFromDefault = function (key) {
  return key;
};
System.Environment.nativeGetTickCount = function () {
  var t = new Date();
  return t.getTime();
};

JSIL.ImplementExternals("System.Text.Encoding", function ($) {
  $.Method({Static:true , Public:true }, ".cctor2", 
    (new JSIL.MethodSignature(null, [], [])),
    function () {
      // This type already has a cctor so we add a second one.
      System.Text.Encoding.asciiEncoding = JSIL.CreateInstanceOfType(
        System.Text.ASCIIEncoding.__Type__, null
      );
    }
  );

  $.Method({Static:true , Public:true }, "get_ASCII", 
    (new JSIL.MethodSignature($.Type, [], [])),
    function () {
      return System.Text.Encoding.asciiEncoding;
    }
  );
});

JSIL.MakeClass("System.Object", "System.Text.Encoding", true, [], function ($) {
});

JSIL.MakeClass("System.Text.Encoding", "System.Text.ASCIIEncoding", true, [], function ($) {
});

JSIL.ImplementExternals(
  "System.TimeSpan", function ($) {
    $.Method({Static:true , Public:true }, "FromMilliseconds", 
      (new JSIL.MethodSignature($.Type, [$.Double], [])), 
      function FromMilliseconds (value) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = Math.floor(value * 10000);
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "FromMinutes", 
      (new JSIL.MethodSignature($.Type, [$.Double], [])), 
      function FromMinutes (value) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = Math.floor(value * 60 * 10000000);
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "FromSeconds", 
      (new JSIL.MethodSignature($.Type, [$.Double], [])), 
      function FromSeconds (value) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = Math.floor(value * 10000000);
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "FromTicks", 
      (new JSIL.MethodSignature($.Type, [$.Int64], [])), 
      function FromTicks (value) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = Math.floor(value);
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "op_Addition", 
      (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])), 
      function op_Addition (t1, t2) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = t1._ticks + t2._ticks;
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "op_Equality", 
      (new JSIL.MethodSignature($.Boolean, [$.Type, $.Type], [])), 
      function op_Equality (t1, t2) {
        return t1._ticks === t2._ticks;
      }
    );

    $.Method({Static:true , Public:true }, "op_GreaterThan", 
      (new JSIL.MethodSignature($.Boolean, [$.Type, $.Type], [])), 
      function op_GreaterThan (t1, t2) {
        return t1._ticks > t2._ticks;
      }
    );

    $.Method({Static:true , Public:true }, "op_Inequality", 
      (new JSIL.MethodSignature($.Boolean, [$.Type, $.Type], [])), 
      function op_Inequality (t1, t2) {
        return t1._ticks !== t2._ticks;
      }
    );

    $.Method({Static:true , Public:true }, "op_LessThan", 
      (new JSIL.MethodSignature($.Boolean, [$.Type, $.Type], [])), 
      function op_LessThan (t1, t2) {
        return t1._ticks < t2._ticks;
      }
    );

    $.Method({Static:true , Public:true }, "op_Subtraction", 
      (new JSIL.MethodSignature($.Type, [$.Type, $.Type], [])), 
      function op_Subtraction (t1, t2) {
        var result = Object.create(System.TimeSpan.prototype);
        result._ticks = t1._ticks - t2._ticks;
        return result;
      }
    );

    $.Method({Static:false, Public:true }, ".ctor", 
      (new JSIL.MethodSignature(null, [$.Int64], [])), 
      function _ctor (ticks) {
        this._ticks = ticks;
      }
    );

    $.Method({Static:false, Public:true }, ".ctor", 
      (new JSIL.MethodSignature(null, [
            $.Int32, $.Int32, 
            $.Int32
          ], [])), 
      function _ctor (hours, minutes, seconds) {
        this._ticks = 10000 * (1000 * (seconds + 60 * (minutes + 60 * hours)));
      }
    );

    $.Method({Static:false, Public:true }, ".ctor", 
      (new JSIL.MethodSignature(null, [
            $.Int32, $.Int32, 
            $.Int32, $.Int32
          ], [])), 
      function _ctor (days, hours, minutes, seconds) {
        this._ticks = 10000 * (1000 * (seconds + 60 * (minutes + 60 * (hours + 24 * days))));
      }
    );

    $.Method({Static:false, Public:true }, ".ctor", 
      (new JSIL.MethodSignature(null, [
            $.Int32, $.Int32, 
            $.Int32, $.Int32, 
            $.Int32
          ], [])), 
      function _ctor (days, hours, minutes, seconds, milliseconds) {
        this._ticks = 10000 * (milliseconds + 1000 * (seconds + 60 * (minutes + 60 * (hours + 24 * days))));
      }
    );

    $.Method({Static:false, Public:true }, "get_Days", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_Days () {
        return Math.floor((this._ticks / 10000000) / (60 * 60 * 24));
      }
    );

    $.Method({Static:false, Public:true }, "get_Hours", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_Hours () {
        return Math.floor((this._ticks / 10000000) / (60 * 60)) % 24;
      }
    );

    $.Method({Static:false, Public:true }, "get_Milliseconds", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_Milliseconds () {
        return Math.floor(this._ticks / 10000) % 1000;
      }
    );

    $.Method({Static:false, Public:true }, "get_Minutes", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_Minutes () {
        return Math.floor((this._ticks / 10000000) / 60) % 60;
      }
    );

    $.Method({Static:false, Public:true }, "get_Seconds", 
      (new JSIL.MethodSignature($.Int32, [], [])), 
      function get_Seconds () {
        return Math.floor(this._ticks / 10000000) % 60;
      }
    );

    $.Method({Static:false, Public:true }, "get_Ticks", 
      (new JSIL.MethodSignature($.Int64, [], [])), 
      function get_Ticks () {
        return this._ticks;
      }
    );

    $.Method({Static:false, Public:true }, "get_TotalMilliseconds", 
      (new JSIL.MethodSignature($.Double, [], [])), 
      function get_TotalMilliseconds () {
        return this._ticks / 10000;
      }
    );

    $.Method({Static:false, Public:true }, "get_TotalMinutes", 
      (new JSIL.MethodSignature($.Double, [], [])), 
      function get_TotalMinutes () {
        return this._ticks / 600000000;
      }
    );

    $.Method({Static:false, Public:true }, "get_TotalSeconds", 
      (new JSIL.MethodSignature($.Double, [], [])), 
      function get_TotalSeconds () {
        return this._ticks / 10000000;
      }
    );
  }
);

JSIL.MakeStruct("System.ValueType", "System.TimeSpan", true, [], function ($) {
  $.Field({Static:false, Public:false}, "_ticks", $.Int64, function ($) {
    return 0;
  });

  $.Property({Public: true , Static: false}, "Ticks");

  $.Property({Public: true , Static: false}, "Milliseconds");

  $.Property({Public: true , Static: false}, "TotalMilliseconds");

  $.Property({Public: true , Static: false}, "Seconds");

  $.Property({Public: true , Static: false}, "Minutes");

  $.Property({Public: true , Static: false}, "Hours");

  $.Property({Public: true , Static: false}, "Days");

  $.Property({Public: true , Static: false}, "TotalSeconds");

  $.Property({Public: true , Static: false}, "TotalMinutes");
});

JSIL.ImplementExternals("System.Collections.Generic.Dictionary`2", function ($) {
  $.RawMethod(false, "$getHash", function (key) {
    if ((typeof (key) !== "undefined") && (key !== null) && (typeof (key.GetHashCode) === "function") && (key.GetHashCode.__IsPlaceholder__ !== true)) {
      return key.GetHashCode();
    } else if ((typeof (key) === "string") || (typeof (key) === "number")) {
      return String(key);
    } else {
      return "nohash";
    }
  });

  $.RawMethod(false, "$areEqual", function (lhs, rhs) {
    if (lhs === rhs)
      return true;

    if ((typeof (lhs) !== "undefined") && (lhs !== null) && (typeof (lhs.Equals) === "function") && (lhs.Equals.__IsPlaceholder__ !== true)) {
      if (lhs.Equals(rhs))
        return true;
    }

    if ((typeof (rhs) !== "undefined") && (rhs !== null) && (typeof (rhs.Equals) === "function") && (rhs.Equals.__IsPlaceholder__ !== true)) {
      if (rhs.Equals(lhs))
        return true;
    }

    return lhs == rhs;
  });

  $.RawMethod(false, "$searchBucket", function (key) {
    var hashCode = this.$getHash(key);
    var bucket = this._dict[hashCode];
    if (!JSIL.IsArray(bucket))
      return null;

    for (var i = 0; i < bucket.length; i++) {
      var bucketEntry = bucket[i];

      if (this.$areEqual(bucketEntry[0], key))
        return bucketEntry;
    }

    return null;
  });

  $.RawMethod(false, "$addToBucket", function (key, value) {
    var hashCode = this.$getHash(key);
    var bucket = this._dict[hashCode];
    if (!JSIL.IsArray(bucket))
      this._dict[hashCode] = bucket = [];

    bucket.push([key, value]);
    this._count += 1;
    return value;
  });

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [], [])), 
    function _ctor () {
      this._dict = {};
      this._count = 0;
      this.tKeysEnumerator = null;
      this.tValuesEnumerator = null;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function _ctor (capacity) {
      this._dict = {};
      this._count = 0;
      this.tKeysEnumerator = null;
      this.tValuesEnumerator = null;
    }
  );

  $.Method({Static:false, Public:true }, "Add", 
    (new JSIL.MethodSignature(null, [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2"), new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2")], [])), 
    function Add (key, value) {
      var bucketEntry = this.$searchBucket(key);

      if (bucketEntry !== null)
        throw new System.ArgumentException("Key already exists");

      return this.$addToBucket(key, value);
    }
  );

  $.Method({Static:false, Public:true }, "Clear", 
    (new JSIL.MethodSignature(null, [], [])), 
    function Clear () {
      this._dict = {}
      this._count = 0;
    }
  );

  $.Method({Static:false, Public:true }, "ContainsKey", 
    (new JSIL.MethodSignature($.Boolean, [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2")], [])), 
    function ContainsKey (key) {
    return this.$searchBucket(key) !== null;
    }
  );

  $.Method({Static:false, Public:true }, "get_Count", 
    (new JSIL.MethodSignature($.Int32, [], [])), 
    function get_Count () {
      return this._count;
    }
  );

  $.Method({Static:false, Public:true }, "get_Item", 
    (new JSIL.MethodSignature(new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2"), [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2")], [])), 
    function get_Item (key) {
      var bucketEntry = this.$searchBucket(key);
      if (bucketEntry !== null)
        return bucketEntry[1];
      else
        throw new System.Exception("Key not found");
    }
  );

  $.Method({Static:false, Public:true }, "get_Keys", 
    (new JSIL.MethodSignature($asms[5].TypeRef("System.Collections.Generic.Dictionary`2/KeyCollection", [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2"), new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2")]), [], [])), 
    function get_Keys () {
      if (this.tKeysEnumerator === null) {
        this.tKeysEnumerator = JSIL.ArrayEnumerator.Of(this.TKey);
      }

      return new JSIL.AbstractEnumerable(
        (function getKeysProxy () {
          var keys = [];

          for (var k in this._dict) {
            if (!this._dict.hasOwnProperty(k))
              continue;
            var bucket = this._dict[k];

            for (var i = 0; i < bucket.length; i++)
              keys.push(bucket[i][0]);
          }

          return new (this.tKeysEnumerator)(keys, -1);
        }).bind(this)
      );
    }
  );

  $.Method({Static:false, Public:true }, "get_Values", 
    (new JSIL.MethodSignature($asms[5].TypeRef("System.Collections.Generic.Dictionary`2/ValueCollection", [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2"), new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2")]), [], [])), 
    function get_Values () {
      if (this.tValuesEnumerator === null) {
        this.tValuesEnumerator = JSIL.ArrayEnumerator.Of(this.TValue);
      }

      return new JSIL.AbstractEnumerable(
        (function getValuesProxy () {
          var values = [];

          for (var k in this._dict) {
            if (!this._dict.hasOwnProperty(k))
              continue;
            var bucket = this._dict[k];

            for (var i = 0; i < bucket.length; i++)
              values.push(bucket[i][1]);
          }

          return new (this.tValuesEnumerator)(values, -1);
        }).bind(this)
      );
    }
  );

  $.Method({Static:false, Public:true }, "set_Item", 
    (new JSIL.MethodSignature(null, [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2"), new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2")], [])), 
    function set_Item (key, value) {
      var bucketEntry = this.$searchBucket(key);
      if (bucketEntry !== null)
        return bucketEntry[1] = value;
      else
        return this.$addToBucket(key, value);
    }
  );

  $.Method({Static:false, Public:true }, "TryGetValue", 
    (new JSIL.MethodSignature($.Boolean, [new JSIL.GenericParameter("TKey", "System.Collections.Generic.Dictionary`2"), $jsilcore.TypeRef("JSIL.Reference", [new JSIL.GenericParameter("TValue", "System.Collections.Generic.Dictionary`2")])], [])), 
    function TryGetValue (key, /* ref */ value) {
      var bucketEntry = this.$searchBucket(key);
      if (bucketEntry !== null) {
        value.value = bucketEntry[1];
        return true;
      } else {
        value.value = JSIL.DefaultValue(this.TValue);
      }

      return false;
    }
  );

});

JSIL.MakeClass("System.Object", "System.Collections.Generic.Dictionary`2", true, ["TKey", "TValue"], function ($) {
});

$jsilcore.$tArrayEnumerator = [null];

JSIL.GetEnumerator = function (enumerable) {
  if ((typeof (enumerable) === "undefined") || (enumerable === null))
    throw new Error("Enumerable is null or undefined");

  if (JSIL.IsArray(enumerable)) {
    if ($jsilcore.$tArrayEnumerator[0] === null)
      $jsilcore.$tArrayEnumerator[0] = JSIL.ArrayEnumerator.Of(System.Object);

    return new ($jsilcore.$tArrayEnumerator[0]) (enumerable, -1);
  } else if (typeof (enumerable.IEnumerable$b1_GetEnumerator) === "function")
    return enumerable.IEnumerable$b1_GetEnumerator();
  else if (typeof (enumerable.IEnumerable_GetEnumerator) === "function")
    return enumerable.IEnumerable_GetEnumerator();    
  else if (typeof (enumerable.GetEnumerator) === "function")
    return enumerable.GetEnumerator();    
  else
    throw new Error("Value is not enumerable");
};

JSIL.EnumerableToArray = function (enumerable) {
  var e = JSIL.GetEnumerator(enumerable);
  var result = [];

  try {
    while (e.MoveNext())
      result.push(e.Current);
  } finally {
    e.IDisposable_Dispose();
  }

  return result;
};

JSIL.MakeClass("System.Object", "JSIL.AbstractEnumerator", true, [], function ($) {
  $.Method({Static: false, Public: true }, ".ctor",
    new JSIL.MethodSignature(null, [JSIL.AnyType, JSIL.AnyType, JSIL.AnyType]),
    function (getNextItem, reset, dispose) {
      this._getNextItem = getNextItem;
      this._reset = reset;
      this._dispose = dispose;
      this._first = true;
      this._needDispose = false;
      this._current = new JSIL.Variable(null);
    }
  );

  $.Method({Static: false, Public: true }, "Reset",
    new JSIL.MethodSignature(null, []),
    function () {
      if (this._needDispose)
        this._dispose();

      this._first = false;
      this._needDispose = true;
      this._reset();
    }
  );

  $.Method({Static: false, Public: true }, "MoveNext",
    new JSIL.MethodSignature("System.Boolean", []),
    function () {
      if (this._first) {
        this._reset();
        this._needDispose = true;
        this._first = false;
      }

      return this._getNextItem(this._current);
    }
  );

  $.Method({Static: false, Public: true }, "Dispose",
    new JSIL.MethodSignature(null, []),
    function () {
      if (this._needDispose)
        this._dispose();

      this._needDispose = false;
    }
  );


  $.Method({Static: false, Public: true }, "get_Current",
    new JSIL.MethodSignature(JSIL.AnyType, []),
    function () {
      return this._current.value;
    }
  );

  $.Property({Static: false, Public: true }, "Current");

  $.ImplementInterfaces(
    System.IDisposable, System.Collections.IEnumerator, System.Collections.Generic.IEnumerator$b1
  );
});

JSIL.MakeClass("System.Object", "JSIL.AbstractEnumerable", true, [], function ($) {
  $.Method({Static: false, Public: true }, ".ctor",
    new JSIL.MethodSignature(null, [JSIL.AnyType, JSIL.AnyType, JSIL.AnyType]),
    function (getNextItem, reset, dispose) {
      if (arguments.length === 1) {
        this._getEnumerator = getNextItem;
      } else {
        this._getEnumerator = null;
        this._getNextItem = getNextItem;
        this._reset = reset;
        this._dispose = dispose;
      }
    }
  );

  $.Method({Static: false, Public: true }, "GetEnumerator",
    new JSIL.MethodSignature("System.Collections.IEnumerator", []),
    function () {
      if (this._getEnumerator !== null)
        return this._getEnumerator();
      else
        return new JSIL.AbstractEnumerator(this._getNextItem, this._reset, this._dispose);
    }
  );

  $.ImplementInterfaces(
    System.Collections.IEnumerable, System.Collections.Generic.IEnumerable$b1
  );
});

JSIL.ImplementExternals(
  "System.Linq.Enumerable", function ($) {
    $.Method({Static:true , Public:true }, "Any", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"]),
      function (T, enumerable) {
        var enumerator = JSIL.GetEnumerator(enumerable);

        try {
          if (enumerator.MoveNext())
            return true;
        } finally {
          enumerator.IDisposable_Dispose();
        }

        return false;
      }
    );

    $.Method({Static:true , Public:true }, "Any", 
      new JSIL.MethodSignature(
        $jsilcore.TypeRef("System.Boolean"), 
        [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"]), $jsilcore.TypeRef("System.Func`2", ["!!0", $jsilcore.TypeRef("System.Boolean")])], 
        ["TSource"]
      ),
      function (T, enumerable, predicate) {
        var enumerator = JSIL.GetEnumerator(enumerable);
        
        try {
          while (enumerator.MoveNext()) {
            if (predicate(enumerator.Current))
              return true;
          }
        } finally {
          enumerator.IDisposable_Dispose();
        }

        return false;
      }
    );

    $.Method({Static:true , Public:true }, "Count", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"]),
      function (T, enumerable) {
        var e = JSIL.GetEnumerator(enumerable);
        var result = 0;
        try {
          while (e.MoveNext())
            result += 1;
        } finally {
          e.IDisposable_Dispose();
        }
        return result;
      }
    );

    $.Method({Static:true , Public:true }, "First", 
      new JSIL.MethodSignature("!!0", [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"]),
      function (T, enumerable) {
        var enumerator = JSIL.GetEnumerator(enumerable);
        try {
          if (enumerator.MoveNext())
            return enumerator.Current;
        } finally {
          enumerator.IDisposable_Dispose();
        }

        throw new System.Exception("Enumerable contains no items");
      }
    );

    $.Method({Static:true , Public:true }, "Select", 
      new JSIL.MethodSignature(
        $jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!1"]), 
        [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"]), $jsilcore.TypeRef("System.Func`2", ["!!0", "!!1"])], 
        ["TSource", "TResult"]
      ),
      function (TSource, TResult, enumerable, selector) {
        var state = {};

        return new JSIL.AbstractEnumerable(
          function getNext (result) {
            var ok = state.enumerator.MoveNext();
            if (ok)
              result.value = selector(state.enumerator.Current);

            return ok;
          },
          function reset () {
            state.enumerator = JSIL.GetEnumerator(enumerable);
          },
          function dispose () {
            state.enumerator.IDisposable_Dispose();
          }
        );
      }
    );
    
    $.Method({Static:true , Public:true }, "ToArray", 
      new JSIL.MethodSignature(System.Array.Of("!!0"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"]),
      function (T, enumerable) {
        return JSIL.EnumerableToArray(enumerable);
      }
    );

  }
);

JSIL.MakeStaticClass("System.Linq.Enumerable", true, [], function ($) {
  $.ExternalMethod({Static:true , Public:true }, "Any", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"])
  );

  $.ExternalMethod({Static:true , Public:true }, "Any", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"]), $jsilcore.TypeRef("System.Func`2", ["!!0", $jsilcore.TypeRef("System.Boolean")])], ["TSource"])
  );

  $.ExternalMethod({Static:true , Public:true }, "Count", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Int32"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"])
  );

  $.ExternalMethod({Static:true , Public:true }, "First", 
    new JSIL.MethodSignature("!!0", [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"])
  );

  $.ExternalMethod({Static:true , Public:true }, "Select", 
    new JSIL.MethodSignature($jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!1"]), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"]), $jsilcore.TypeRef("System.Func`2", ["!!0", "!!1"])], ["TSource", "TResult"])
  );

  $.ExternalMethod({Static:true , Public:true }, "ToArray", 
    new JSIL.MethodSignature(System.Array.Of("!!0"), [$jsilcore.TypeRef("System.Collections.Generic.IEnumerable`1", ["!!0"])], ["TSource"])
  );
});

JSIL.ImplementExternals("System.Nullable", function ($) {
  var mscorlib = JSIL.GetCorlib();

  $.Method({Static:true , Public:true }, "GetUnderlyingType", 
    (new JSIL.MethodSignature(mscorlib.TypeRef("System.Type"), [mscorlib.TypeRef("System.Type")], [])), 
    function GetUnderlyingType (nullableType) {
      if (nullableType.__FullName__.indexOf("System.Nullable`1") !== 0) {
        return null;
      } else {
        return nullableType.__PublicInterface__.T;
      }
    }
  );
});

JSIL.MakeStaticClass("System.Nullable", true, [], function ($) {
});

JSIL.MakeStruct("System.ValueType", "System.Nullable`1", true, ["T"], function ($) {
});

JSIL.MakeEnum("System.Reflection.BindingFlags", true, $jsilcore.BindingFlags, true);

JSIL.ImplementExternals("System.Xml.Serialization.XmlSerializer", function ($) {
});

JSIL.ImplementExternals("System.IO.Path", function ($) {
  $.Method({Static:true , Public:true }, "Combine", 
    (new JSIL.MethodSignature($.String, [$.String, $.String], [])), 
    function Combine (path1, path2) {
      return path1 + "\\" + path2;
    }
  );

  $.Method({Static:true , Public:true }, "Combine", 
    (new JSIL.MethodSignature($.String, [
          $.String, $.String, 
          $.String
        ], [])), 
    function Combine (path1, path2, path3) {
      return path1 + "\\" + path2 + "\\" + path3;
    }
  );

  $.Method({Static:true , Public:true }, "Combine", 
    (new JSIL.MethodSignature($.String, [
          $.String, $.String, 
          $.String, $.String
        ], [])), 
    function Combine (path1, path2, path3, path4) {
      return path1 + "\\" + path2 + "\\" + path3 + "\\" + path4;
    }
  );

});

JSIL.MakeEnum(
  "System.StringComparison", true, {
    CurrentCulture: 0, 
    CurrentCultureIgnoreCase: 1, 
    InvariantCulture: 2, 
    InvariantCultureIgnoreCase: 3, 
    Ordinal: 4, 
    OrdinalIgnoreCase: 5
  }, false
);

JSIL.ImplementExternals("System.Text.StringBuilder", function ($) {

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [], [])), 
    function _ctor () {
      this._str = "";
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function _ctor (capacity) {
      this._str = "";
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.String], [])), 
    function _ctor (value) {
      this._str = value;
    }
  );

  $.Method({Static:false, Public:true }, ".ctor", 
    (new JSIL.MethodSignature(null, [$.String, $.Int32], [])), 
    function _ctor (value, capacity) {
      this._str = value;
    }
  );

  var appendString = function (self, str, startIndex, length, copies) {
    if ((startIndex !== 0) || (length !== str.length)) {
      for (var i = 0; i < copies; i++) {
        this._str += str.substr(startIndex, length);
      }

    } else {
      for (var i = 0; i < copies; i++) {
        this._str += str;
      }

    }
  };

  var appendNumber = function (self, num) {
    self._str += String(num);
  };

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Char, $.Int32], [])), 
    function Append (value, repeatCount) {
      appendString(this, value, 0, value.length, repeatCount);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [
          $jsilcore.TypeRef("System.Array", [$.Char]), $.Int32, 
          $.Int32
        ], [])), 
    function Append (value, startIndex, charCount) {
      for (var i = 0; i < charCount; i++)
        this._str += value[startIndex + i];
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.String], [])), 
    function Append (value) {
      appendString(this, value, 0, value.length, 1);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [
          $.String, $.Int32, 
          $.Int32
        ], [])), 
    function Append (value, startIndex, count) {
      appendString(this, value, startIndex, count, 1);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Boolean], [])), 
    function Append (value) {
      this._str += (value ? "True" : "False");
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.SByte], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Byte], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Char], [])), 
    function Append (value) {
      appendString(this, value, 0, value.length, 1);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Int16], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Int32], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Int64], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Single], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.Double], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.UInt16], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.UInt32], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$.UInt64], [])), 
    function Append (value) {
      appendNumber(this, value);
    }
  );

  $.Method({Static:false, Public:true }, "Append", 
    (new JSIL.MethodSignature($.Type, [$jsilcore.TypeRef("System.Array", [$.Char])], [])), 
    function Append (value) {
      for (var i = 0; i < value.length; i++)
        this._str += value[i];
    }
  );

  $.Method({Static:false, Public:true }, "Clear", 
    (new JSIL.MethodSignature($.Type, [], [])), 
    function Clear () {
      this._str = "";
    }
  );

  $.Method({Static:false, Public:true }, "get_Length", 
    (new JSIL.MethodSignature($.Int32, [], [])), 
    function get_Length () {
      return this._str.length;
    }
  );

  var replace = function (self, oldText, newText, startIndex, count) {
    var prefix = self._str.substr(0, startIndex);
    var suffix = self._str.substr(startIndex + count);
    var region = self._str.substr(startIndex, count);
    var result = prefix + region.split(oldText).join(newText) + suffix;
    self._str = result;
    return self;
  };

  $.Method({Static:false, Public:true }, "Replace", 
    (new JSIL.MethodSignature($.Type, [$.String, $.String], [])), 
    function Replace (oldValue, newValue) {
      return replace(this, oldValue, newValue, 0, this._str.length);
    }
  );

  $.Method({Static:false, Public:true }, "Replace", 
    (new JSIL.MethodSignature($.Type, [
          $.String, $.String, 
          $.Int32, $.Int32
        ], [])), 
    function Replace (oldValue, newValue, startIndex, count) {
      return replace(this, oldValue, newValue, startIndex, count);
    }
  );

  $.Method({Static:false, Public:true }, "Replace", 
    (new JSIL.MethodSignature($.Type, [$.Char, $.Char], [])), 
    function Replace (oldChar, newChar) {
      return replace(this, oldChar, newChar, 0, this._str.length);
    }
  );

  $.Method({Static:false, Public:true }, "Replace", 
    (new JSIL.MethodSignature($.Type, [
          $.Char, $.Char, 
          $.Int32, $.Int32
        ], [])), 
    function Replace (oldChar, newChar, startIndex, count) {
      return replace(this, oldChar, newChar, 0, this._str.length);
    }
  );

  $.Method({Static:false, Public:true }, "set_Length", 
    (new JSIL.MethodSignature(null, [$.Int32], [])), 
    function set_Length (value) {
      var delta = value - this._str.length;

      if (delta < 0) {
        this._str = this._str.substr(0, value);
      } else if (delta > 0) {
        var ch = new Array(delta);
        for (var i = 0; i < delta; i++)
          ch[i] = '\0';

        this._str += String.fromCharCode.apply(String, ch);
      }
    }
  );

  $.Method({Static:false, Public:true }, "toString", 
    (new JSIL.MethodSignature($.String, [], [])), 
    function toString () {
      return this._str;
    }
  );
});

JSIL.ImplementExternals(
  "System.Diagnostics.StackTrace", true, {
    _ctor$0: function () {
      this.CaptureStackTrace(0, false, null, null);
    },
    CaptureStackTrace: function (framesToSkip, needFileInfo, thread, exception) {
      this.frames = [];
    },
    GetFrame: function (index) {
      // FIXME
      return new System.Diagnostics.StackFrame();
    }
  }
);

JSIL.ImplementExternals(
  "System.Diagnostics.StackFrame", true, {
    GetMethod: function () {
      // FIXME
      return new System.Reflection.MethodBase();
    }
  }
);

JSIL.ImplementExternals(
  "System.Enum", function ($) {    
    $.RawMethod(true, "CheckType",
      function (value) {
        if (typeof (value) === "object") {
          if ((value !== null) && (typeof (value.GetType) === "function"))
            return value.GetType().IsEnum;
        }

        return false;
      }
    );

    var internalTryParse = function (TEnum, text, ignoreCase, result) {      
      var num = Number(text);

      if (isNaN(num)) {
        if (ignoreCase) {
          var names = TEnum.__Names__;
          for (var i = 0; i < names.length; i++) {
            var isMatch = (names[i].toLowerCase() == text.toLowerCase());

            if (isMatch) {
              result.value = TEnum[names[i]];
              break;
            }
          }
        } else {
          result.value = TEnum[text];
        }

        return (typeof (result.value) !== "undefined");
      } else {
        var name = TEnum.__ValueToName__[num];

        if (typeof (name) === "undefined")
          return false;
        else {
          result.value = TEnum[name];
          return true;
        }
      }
    };

    var internalParse = function (enm, text, ignoreCase) {
      var result = new JSIL.Variable();
      if (internalTryParse(enm, text, ignoreCase, result))
        return result.value;

      throw new System.Exception("Failed to parse enum");
    };

    $.Method({Static:true , Public:true }, "Parse", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Object"), [$jsilcore.TypeRef("System.Type"), $jsilcore.TypeRef("System.String")], []),
      function (enm, text) {
        return internalParse(enm, text, false);
      }
    );

    $.Method({Static:true , Public:true }, "Parse", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Object"), [
          $jsilcore.TypeRef("System.Type"), $jsilcore.TypeRef("System.String"), 
          $jsilcore.TypeRef("System.Boolean")
        ], []),
      internalParse
    );    

    $.Method({Static:true , Public:true }, "TryParse", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [$jsilcore.TypeRef("System.String"), "JSIL.Reference" /* !!0& */ ], ["TEnum"]),
      function (TEnum, text, result) {
        return internalTryParse(TEnum, text, result);
      }
    );

    $.Method({Static:true , Public:true }, "TryParse", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Boolean"), [
          $jsilcore.TypeRef("System.String"), $jsilcore.TypeRef("System.Boolean"), 
          "JSIL.Reference" /* !!0& */ 
        ], ["TEnum"]),
      internalTryParse
    );

    $.Method({Static:true , Public:true }, "GetNames", 
      new JSIL.MethodSignature(System.Array.Of($jsilcore.System.String), [$jsilcore.TypeRef("System.Type")], []),
      function (enm) {
        return enm.__Names__;
      }
    );

    $.Method({Static:true , Public:true }, "GetValues", 
      new JSIL.MethodSignature($jsilcore.TypeRef("System.Array"), [$jsilcore.TypeRef("System.Type")], []),
      function (enm) {
        var names = enm.__Names__;
        var result = new Array(names.length);

        for (var i = 0; i < result.length; i++)
          result[i] = enm[names[i]];

        return result;
      }
    );
  }
);

JSIL.ImplementExternals(
  "System.Activator", false, {
    CreateInstance$2: function (type, constructorArguments) {
      return JSIL.CreateInstanceOfType(type, constructorArguments);
    }
  }
);

JSIL.ImplementExternals(
  "System.Diagnostics.Stopwatch", false, {
    StartNew: function () {
      var result = new System.Diagnostics.Stopwatch();
      result.Start();
      return result;
    }
  }
);

JSIL.ImplementExternals(
  "System.Diagnostics.Stopwatch", true, {
    _ctor: function () {
      this.Reset();
    },
    get_IsRunning: function () {
      return this.isRunning;
    },
    get_Elapsed: function () {
      return System.TimeSpan.FromMilliseconds(this.get_ElapsedMilliseconds());
    },
    get_ElapsedMilliseconds: function () {
      var result = this.elapsed;
      if (this.isRunning)
        result += Date.now() - this.startedWhen;

      return result;
    },
    get_ElapsedTicks: function () {
      return this.get_ElapsedMilliseconds() * 10000;
    },
    Start: function () {
      if (!this.isRunning) {
        this.startedWhen = Date.now();
        this.isRunning = true;
      }
    },
    Stop: function () {
      if (this.isRunning) {
        this.isRunning = false;

        var now = Date.now();
        var elapsed = now - this.startedWhen;

        this.elapsed += elapsed;
        if (this.elapsed < 0)
          this.elapsed = 0;
      }
    },
    Reset: function () {
      this.elapsed = 0;
      this.isRunning = false;
      this.startedWhen = 0;
    },
    Restart: function () {
      this.elapsed = 0;
      this.isRunning = true;
      this.startedWhen = Date.now();
    },
  }
);
