/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */

(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {
  var hourNormalizer;

  hourNormalizer = function(time) {
    var fixedTime;
    fixedTime = void 0;
    if (time === '0') {
      fixedTime = '0:00';
    } else if (time.length === 3) {
      fixedTime = time.slice(0, 1) + ':' + time.slice(1);
    } else {
      fixedTime = time.slice(0, 2) + ':' + time.slice(2);
    }
    return fixedTime;
  };

  $(function() {
    var UTCOffset, UTCOffsetMinutes, minutes, now, today;
    today = new Date;
    UTCOffsetMinutes = today.getTimezoneOffset();
    UTCOffset = UTCOffsetMinutes * 60000;
    now = Date.now();
    minutes = 30;
    $.ajax({
      url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=1&callback=?',
      dataType: 'jsonp',
      async: false,
      success: function(data) {
        var dataArray, date, dateTime, day, days, hourlyTemps, hours, i, j, temp, time, unixTime, unixTimeCST, weatherForAustin;
        dataArray = [];
        days = data.data.weather;
        i = 0;
        while (i < days.length) {
          day = days[i];
          date = day.date.split('-').join('/');
          hourlyTemps = day.hourly;
          j = 0;
          while (j < hourlyTemps.length) {
            hours = hourlyTemps[j];
            time = hourNormalizer(hours.time);
            dateTime = date + ' ' + time;
            unixTime = Date.parse(dateTime);
            unixTimeCST = unixTime - UTCOffset;
            temp = parseInt(hours.tempF);
            if (unixTime < now) {
              dataArray.push([unixTimeCST, temp]);
            }
            j++;
          }
          i++;
        }
        weatherForAustin = Highcharts.stockChart('container', {
          rangeSelector: {
            selected: 1
          },
          title: {
            text: 'Weather for Austin HQ'
          },
          legend: {
            enabled: true
          },
          series: [
            {
              name: 'Historical',
              data: dataArray
            }
          ]
        }, function(weatherForAustin) {
          $.ajax({
            url: 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&num_of_days=2&tp=1&callback=?',
            dataType: 'jsonp',
            async: false,
            success: function(data2) {
              var days;
              var i;
              var day;
              var date;
              var hourlyTemps;
              var j;
              var hours;
              var time;
              var dateTime;
              var unixTime;
              var unixTimeCST;
              var temp;
              var dataArray2;
              dataArray2 = [];
              days = data2.data.weather;
              i = 0;
              while (i < days.length) {
                day = days[i];
                date = day.date.split('-').join('/');
                hourlyTemps = day.hourly;
                j = 0;
                while (j < hourlyTemps.length) {
                  hours = hourlyTemps[j];
                  time = hourNormalizer(hours.time);
                  dateTime = date + ' ' + time;
                  unixTime = Date.parse(dateTime);
                  unixTimeCST = unixTime - UTCOffset;
                  temp = parseInt(hours.tempF);
                  if (unixTime > now) {
                    dataArray2.push([unixTimeCST, temp]);
                  }
                  j++;
                }
                i++;
              }
              weatherForAustin.addSeries({
                name: 'Forecast',
                data: dataArray2
              });
            }
          });
        });
      }
    });
    $.ajax({
      url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=1&callback=?',
      dataType: 'jsonp',
      async: false,
      success: function(data3) {
        var dataArray3, date, dateTime, day, days, hourOnly, hourlyTemps, hours, i, intervalList, j, max, temp, time, unixTime, unixTimeCST, weatherForAustin2;
        dataArray3 = [];
        days = data3.data.weather;
        i = 0;
        while (i < days.length) {
          day = days[i];
          date = day.date.split('-').join('/');
          hourlyTemps = day.hourly;
          intervalList = {};
          j = 0;
          while (j < hourlyTemps.length) {
            hours = hourlyTemps[j];
            time = hourNormalizer(hours.time);
            temp = parseInt(hours.tempF);
            hourOnly = void 0;
            if (time.length > 3) {
              hourOnly = time.slice(0, 3);
            } else {
              hourOnly = time[0];
            }
            if (parseInt(hourOnly) % 3 === 0) {
              dateTime = date + ' ' + time;
              unixTime = Date.parse(dateTime);
              unixTimeCST = unixTime - UTCOffset;
              if (intervalList.unixTimeCST) {
                intervalList.unixTimeCST.push(temp);
              } else {
                intervalList.unixTimeCST = [temp];
              }
            }
            max = intervalList.unixTimeCST.reduce(function(a, b) {
              return Math.max(a, b);
            });
            dataArray3.push([unixTimeCST, max]);
            j++;
          }
          i++;
        }
        weatherForAustin2 = Highcharts.stockChart('container2', {
          rangeSelector: {
            selected: 1
          },
          title: {
            text: '3-Hour Highs and Lows'
          },
          legend: {
            enabled: true
          },
          series: [
            {
              name: 'High',
              data: dataArray3
            }
          ]
        }, function(weatherForAustin2) {
          $.ajax({
            url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=1&callback=?',
            dataType: 'jsonp',
            async: false,
            success: function(data4) {
              var days;
              var i;
              var day;
              var date;
              var hourlyTemps;
              var intervalList;
              var j;
              var hours;
              var time;
              var temp;
              var hourOnly;
              var dateTime;
              var unixTime;
              var unixTimeCST;
              var dataArray4, min;
              dataArray4 = [];
              days = data4.data.weather;
              i = 0;
              while (i < days.length) {
                day = days[i];
                date = day.date.split('-').join('/');
                hourlyTemps = day.hourly;
                intervalList = {};
                j = 0;
                while (j < hourlyTemps.length) {
                  hours = hourlyTemps[j];
                  time = hourNormalizer(hours.time);
                  temp = parseInt(hours.tempF);
                  hourOnly = void 0;
                  if (time.length > 3) {
                    hourOnly = time.slice(0, 3);
                  } else {
                    hourOnly = time[0];
                  }
                  if (parseInt(hourOnly) % 3 === 0) {
                    dateTime = date + ' ' + time;
                    unixTime = Date.parse(dateTime);
                    unixTimeCST = unixTime - UTCOffset;
                    if (intervalList.unixTimeCST) {
                      intervalList.unixTimeCST.push(temp);
                    } else {
                      intervalList.unixTimeCST = [temp];
                    }
                  }
                  min = intervalList.unixTimeCST.reduce(function(a, b) {
                    return Math.min(a, b);
                  });
                  dataArray4.push([unixTimeCST, min]);
                  j++;
                }
                i++;
              }
              weatherForAustin2.addSeries({
                name: 'Low',
                data: dataArray4
              });
            }
          });
        });
      }
    });
    setInterval((function() {
      var today;
      var UTCOffsetMinutes;
      var UTCOffset;
      var now;
      today = new Date;
      UTCOffsetMinutes = today.getTimezoneOffset();
      UTCOffset = UTCOffsetMinutes * 60000;
      now = Date.now();
      $.ajax({
        url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=1&callback=?',
        dataType: 'jsonp',
        async: false,
        success: function(data) {
          var dataArray3, date, dateTime, day, days, hourlyTemps, hours, i, j, temp, time, unixTime, unixTimeCST, weatherForAustin;
          dataArray3 = [];
          days = data3.data.weather;
          i = 0;
          while (i < days.length) {
            day = days[i];
            date = day.date.split('-').join('/');
            hourlyTemps = day.hourly;
            j = 0;
            while (j < hourlyTemps.length) {
              hours = hourlyTemps[j];
              time = hourNormalizer(hours.time);
              dateTime = date + ' ' + time;
              unixTime = Date.parse(dateTime);
              unixTimeCST = unixTime - UTCOffset;
              temp = parseInt(hours.tempF);
              if (unixTime < now) {
                dataArray3.push([unixTimeCST, temp]);
              }
              j++;
            }
            i++;
          }
          weatherForAustin = Highcharts.stockChart('container', {
            rangeSelector: {
              selected: 1
            },
            title: {
              text: 'Weather for Austin HQ'
            },
            series: [
              {
                name: 'Austin HQ Historical',
                data: dataArray3
              }
            ]
          }, function(weatherForAustin) {
            $.ajax({
              url: 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&num_of_days=2&tp=1&callback=?',
              dataType: 'jsonp',
              async: false,
              success: function(data2) {
                var days;
                var i;
                var day;
                var date;
                var hourlyTemps;
                var j;
                var hours;
                var time;
                var dateTime;
                var unixTime;
                var unixTimeCST;
                var temp;
                var dataArray2;
                dataArray2 = [];
                days = data2.data.weather;
                i = 0;
                while (i < days.length) {
                  day = days[i];
                  date = day.date.split('-').join('/');
                  hourlyTemps = day.hourly;
                  j = 0;
                  while (j < hourlyTemps.length) {
                    hours = hourlyTemps[j];
                    time = hourNormalizer(hours.time);
                    dateTime = date + ' ' + time;
                    unixTime = Date.parse(dateTime);
                    unixTimeCST = unixTime - UTCOffset;
                    temp = parseInt(hours.tempF);
                    if (unixTime > now) {
                      dataArray2.push([unixTimeCST, temp]);
                    }
                    j++;
                  }
                  i++;
                }
                weatherForAustin2.addSeries({
                  name: 'Austin HQ Forecast',
                  data: dataArray4
                });
              }
            });
          });
        }
      });
      $.ajax({
        url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=3&callback=?',
        dataType: 'jsonp',
        async: false,
        success: function(data3) {
          var dataArray3, date, day, days, i, maxT, unixTime, unixTimeCST, weatherForAustin2;
          dataArray3 = [];
          days = data3.data.weather;
          i = 0;
          while (i < days.length) {
            day = days[i];
            date = day.date.split('-').join('/');
            maxT = day.maxtempF;
            unixTime = Date.parse(date);
            unixTimeCST = unixTime - UTCOffset;
            dataArray3.push([unixTimeCST, parseInt(maxT)]);
            i++;
          }
          weatherForAustin2 = Highcharts.stockChart('container2', {
            rangeSelector: {
              selected: 1
            },
            title: {
              text: '3-Hour Highs and Lows'
            },
            legend: {
              enabled: true
            },
            series: [
              {
                name: 'High',
                data: dataArray3
              }
            ]
          }, function(weatherForAustin2) {
            $.ajax({
              url: 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=ad674fc16aef4b48811103245203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-07-01&tp=3&callback=?',
              dataType: 'jsonp',
              async: false,
              success: function(data4) {
                var days;
                var i;
                var day;
                var date;
                var unixTime;
                var unixTimeCST;
                var dataArray4, minT;
                dataArray4 = [];
                days = data4.data.weather;
                i = 0;
                while (i < days.length) {
                  day = days[i];
                  date = day.date.split('-').join('/');
                  minT = day.mintempF;
                  unixTime = Date.parse(date);
                  unixTimeCST = unixTime - UTCOffset;
                  dataArray4.push([unixTimeCST, parseInt(minT)]);
                  i++;
                }
                weatherForAustin2.addSeries({
                  name: 'Low',
                  data: dataArray4
                });
              }
            });
          });
        }
      });
    }), 60000 * minutes);
  });

}).call(this);
/*
 Highstock JS v8.0.0 (2019-12-10)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(S,K){"object"===typeof module&&module.exports?(K["default"]=K,module.exports=S.document?K(S):K):"function"===typeof define&&define.amd?define("highcharts/highstock",function(){return K(S)}):(S.Highcharts&&S.Highcharts.error(16,!0),S.Highcharts=K(S))})("undefined"!==typeof window?window:this,function(S){function K(d,g,M,F){d.hasOwnProperty(g)||(d[g]=F.apply(null,M))}var y={};K(y,"parts/Globals.js",[],function(){var d="undefined"!==typeof S?S:"undefined"!==typeof window?window:{},g=d.document,
M=d.navigator&&d.navigator.userAgent||"",F=g&&g.createElementNS&&!!g.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,E=/(edge|msie|trident)/i.test(M)&&!d.opera,D=-1!==M.indexOf("Firefox"),x=-1!==M.indexOf("Chrome"),v=D&&4>parseInt(M.split("Firefox/")[1],10);return{product:"Highcharts",version:"8.0.0",deg2rad:2*Math.PI/360,doc:g,hasBidiBug:v,hasTouch:!!d.TouchEvent,isMS:E,isWebKit:-1!==M.indexOf("AppleWebKit"),isFirefox:D,isChrome:x,isSafari:!x&&-1!==M.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(M),
SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:F,win:d,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});K(y,"parts/Utilities.js",[y["parts/Globals.js"]],function(d){function g(a,l){return parseInt(a,l||10)}function M(a){return"string"===typeof a}function F(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a}function E(a,l){return!!a&&"object"===typeof a&&(!l||
!F(a))}function D(a){return E(a)&&"number"===typeof a.nodeType}function x(a){var l=a&&a.constructor;return!(!E(a,!0)||D(a)||!l||!l.name||"Object"===l.name)}function v(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a}function C(a){return"undefined"!==typeof a&&null!==a}function B(a,l,b){var c;M(l)?C(b)?a.setAttribute(l,b):a&&a.getAttribute&&((c=a.getAttribute(l))||"class"!==l||(c=a.getAttribute(l+"Name"))):h(l,function(l,b){a.setAttribute(b,l)});return c}function p(a,l){var b;a||(a=
{});for(b in l)a[b]=l[b];return a}function z(){for(var a=arguments,l=a.length,b=0;b<l;b++){var c=a[b];if("undefined"!==typeof c&&null!==c)return c}}function m(a,l){var b=function(){};b.prototype=new a;p(b.prototype,l);return b}function q(a,l){return parseFloat(a.toPrecision(l||14))}function w(a,l,b,c){a=+a||0;l=+l;var n=d.defaultOptions.lang,f=(a.toString().split(".")[1]||"").split("e")[0].length,e=a.toString().split("e");if(-1===l)l=Math.min(f,20);else if(!v(l))l=2;else if(l&&e[1]&&0>e[1]){var k=
l+ +e[1];0<=k?(e[0]=(+e[0]).toExponential(k).split("e")[0],l=k):(e[0]=e[0].split(".")[0]||0,a=20>l?(e[0]*Math.pow(10,e[1])).toFixed(l):0,e[1]=0)}var u=(Math.abs(e[1]?e[0]:a)+Math.pow(10,-Math.max(l,f)-1)).toFixed(l);f=String(g(u));k=3<f.length?f.length%3:0;b=z(b,n.decimalPoint);c=z(c,n.thousandsSep);a=(0>a?"-":"")+(k?f.substr(0,k)+c:"");a+=f.substr(k).replace(/(\d{3})(?=\d)/g,"$1"+c);l&&(a+=b+u.slice(-l));e[1]&&0!==+a&&(a+="e"+e[1]);return a}function h(a,l,b){for(var c in a)Object.hasOwnProperty.call(a,
c)&&l.call(b||a[c],a[c],c,a)}d.timers=[];var f=d.charts,c=d.doc,b=d.win;d.error=function(a,l,c,f){var n=v(a),t=n?"Highcharts error #"+a+": www.highcharts.com/errors/"+a+"/":a.toString(),e=function(){if(l)throw Error(t);b.console&&console.log(t)};if("undefined"!==typeof f){var k="";n&&(t+="?");d.objectEach(f,function(a,e){k+="\n"+e+": "+a;n&&(t+=encodeURI(e)+"="+encodeURI(a))});t+=k}c?d.fireEvent(c,"displayError",{code:a,message:t,params:f},e):e()};d.Fx=function(a,l,b){this.options=l;this.elem=a;this.prop=
b};d.Fx.prototype={dSetter:function(){var a=this.paths[0],b=this.paths[1],c=[],f=this.now,h=a.length;if(1===f)c=this.toD;else if(h===b.length&&1>f)for(;h--;){var r=parseFloat(a[h]);c[h]=isNaN(r)||"A"===b[h-4]||"A"===b[h-5]?b[h]:f*parseFloat(""+(b[h]-r))+r}else c=b;this.elem.attr("d",c,null,!0)},update:function(){var a=this.elem,b=this.prop,c=this.now,f=this.options.step;if(this[b+"Setter"])this[b+"Setter"]();else a.attr?a.element&&a.attr(b,c,null,!0):a.style[b]=c+this.unit;f&&f.call(a,c,this)},run:function(a,
l,c){var f=this,n=f.options,r=function(a){return r.stopped?!1:f.step(a)},e=b.requestAnimationFrame||function(a){setTimeout(a,13)},k=function(){for(var a=0;a<d.timers.length;a++)d.timers[a]()||d.timers.splice(a--,1);d.timers.length&&e(k)};a!==l||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=a,this.end=l,this.unit=c,this.now=this.start,this.pos=0,r.elem=this.elem,r.prop=this.prop,r()&&1===d.timers.push(r)&&e(k)):(delete n.curAnim[this.prop],n.complete&&0===Object.keys(n.curAnim).length&&
n.complete.call(this.elem))},step:function(a){var b=+new Date,c=this.options,f=this.elem,d=c.complete,r=c.duration,e=c.curAnim;if(f.attr&&!f.element)a=!1;else if(a||b>=r+this.startTime){this.now=this.end;this.pos=1;this.update();var k=e[this.prop]=!0;h(e,function(a){!0!==a&&(k=!1)});k&&d&&d.call(f);a=!1}else this.pos=c.easing((b-this.startTime)/r),this.now=this.start+(this.end-this.start)*this.pos,this.update(),a=!0;return a},initPath:function(a,b,c){function l(a){for(A=a.length;A--;){var e="M"===
a[A]||"L"===a[A];var k=/[a-zA-Z]/.test(a[A+3]);e&&k&&a.splice(A+1,0,a[A+1],a[A+2],a[A+1],a[A+2])}}function f(a,e){for(;a.length<m;){a[0]=e[m-a.length];var k=a.slice(0,h);[].splice.apply(a,[0,0].concat(k));J&&(k=a.slice(a.length-h),[].splice.apply(a,[a.length,0].concat(k)),A--)}a[0]="M"}function n(a,e){for(var k=(m-a.length)/h;0<k&&k--;)G=a.slice().splice(a.length/L-h,h*L),G[0]=e[m-h-k*h],u&&(G[h-6]=G[h-2],G[h-5]=G[h-1]),[].splice.apply(a,[a.length/L,0].concat(G)),J&&k--}b=b||"";var e=a.startX,k=a.endX,
u=-1<b.indexOf("C"),h=u?7:3,G,A;b=b.split(" ");c=c.slice();var J=a.isArea,L=J?2:1;u&&(l(b),l(c));if(e&&k){for(A=0;A<e.length;A++)if(e[A]===k[0]){var d=A;break}else if(e[0]===k[k.length-e.length+A]){d=A;var q=!0;break}else if(e[e.length-1]===k[k.length-e.length+A]){d=e.length-A;break}"undefined"===typeof d&&(b=[])}if(b.length&&v(d)){var m=c.length+d*L*h;q?(f(b,c),n(c,b)):(f(c,b),n(b,c))}return[b,c]},fillSetter:function(){d.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,
d.color(this.start).tweenTo(d.color(this.end),this.pos),null,!0)}};d.merge=function(){var a,b=arguments,c={},f=function(a,e){"object"!==typeof a&&(a={});h(e,function(k,b){!E(k,!0)||x(k)||D(k)?a[b]=e[b]:a[b]=f(a[b]||{},k)});return a};!0===b[0]&&(c=b[1],b=Array.prototype.slice.call(b,2));var d=b.length;for(a=0;a<d;a++)c=f(c,b[a]);return c};d.clearTimeout=function(a){C(a)&&clearTimeout(a)};d.css=function(a,b){d.isMS&&!d.svg&&b&&"undefined"!==typeof b.opacity&&(b.filter="alpha(opacity="+100*b.opacity+
")");p(a.style,b)};d.createElement=function(a,b,f,t,h){a=c.createElement(a);var l=d.css;b&&p(a,b);h&&l(a,{padding:"0",border:"none",margin:"0"});f&&l(a,f);t&&t.appendChild(a);return a};d.datePropsToTimestamps=function(a){h(a,function(b,c){E(b)&&"function"===typeof b.getTime?a[c]=b.getTime():(E(b)||F(b))&&d.datePropsToTimestamps(b)})};d.formatSingle=function(a,b,c){var l=/\.([0-9])/,f=d.defaultOptions.lang,n=c&&c.time||d.time;c=c&&c.numberFormatter||w;/f$/.test(a)?(l=(l=a.match(l))?l[1]:-1,null!==
b&&(b=c(b,l,f.decimalPoint,-1<a.indexOf(",")?f.thousandsSep:""))):b=n.dateFormat(a,b);return b};d.format=function(a,b,c){for(var l="{",f=!1,n,e,k,u,h=[],G;a;){l=a.indexOf(l);if(-1===l)break;n=a.slice(0,l);if(f){n=n.split(":");e=n.shift().split(".");u=e.length;G=b;for(k=0;k<u;k++)G&&(G=G[e[k]]);n.length&&(G=d.formatSingle(n.join(":"),G,c));h.push(G)}else h.push(n);a=a.slice(l+1);l=(f=!f)?"}":"{"}h.push(a);return h.join("")};d.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};
d.normalizeTickInterval=function(a,b,c,f,h){var l=a;c=z(c,1);var e=a/c;b||(b=h?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===f&&(1===c?b=b.filter(function(a){return 0===a%1}):.1>=c&&(b=[1/c])));for(f=0;f<b.length&&!(l=b[f],h&&l*c>=a||!h&&e<=(b[f]+(b[f+1]||b[f]))/2);f++);return l=q(l*c,-Math.round(Math.log(.001)/Math.LN10))};d.stableSort=function(a,b){var c=a.length,l,f;for(f=0;f<c;f++)a[f].safeI=f;a.sort(function(a,e){l=b(a,e);return 0===l?a.safeI-e.safeI:l});for(f=0;f<c;f++)delete a[f].safeI};
d.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};d.getStyle=function(a,c,f){if("width"===c)return c=Math.min(a.offsetWidth,a.scrollWidth),f=a.getBoundingClientRect&&a.getBoundingClientRect().width,f<c&&f>=c-1&&(c=Math.floor(f)),Math.max(0,c-d.getStyle(a,"padding-left")-d.getStyle(a,"padding-right"));if("height"===c)return Math.max(0,Math.min(a.offsetHeight,a.scrollHeight)-
d.getStyle(a,"padding-top")-d.getStyle(a,"padding-bottom"));b.getComputedStyle||d.error(27,!0);if(a=b.getComputedStyle(a,void 0))a=a.getPropertyValue(c),z(f,"opacity"!==c)&&(a=g(a));return a};d.inArray=function(a,b,c){return b.indexOf(a,c)};d.find=Array.prototype.find?function(a,b){return a.find(b)}:function(a,b){var c,l=a.length;for(c=0;c<l;c++)if(b(a[c],c))return a[c]};d.keys=Object.keys;d.stop=function(a,b){for(var c=d.timers.length;c--;)d.timers[c].elem!==a||b&&b!==d.timers[c].prop||(d.timers[c].stopped=
!0)};h({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(a,b){d[b]=function(b){return Array.prototype[a].apply(b,[].slice.call(arguments,1))}});d.addEvent=function(a,b,c,f){void 0===f&&(f={});var l=a.addEventListener||d.addEventListenerPolyfill;var n="function"===typeof a&&a.prototype?a.prototype.protoEvents=a.prototype.protoEvents||{}:a.hcEvents=a.hcEvents||{};d.Point&&a instanceof d.Point&&a.series&&a.series.chart&&(a.series.chart.runTrackerClick=!0);l&&l.call(a,b,c,
!1);n[b]||(n[b]=[]);n[b].push({fn:c,order:"number"===typeof f.order?f.order:Infinity});n[b].sort(function(a,b){return a.order-b.order});return function(){d.removeEvent(a,b,c)}};d.removeEvent=function(a,b,c){function l(e,b){var c=a.removeEventListener||d.removeEventListenerPolyfill;c&&c.call(a,e,b,!1)}function f(e){var c;if(a.nodeName){if(b){var f={};f[b]=!0}else f=e;h(f,function(a,b){if(e[b])for(c=e[b].length;c--;)l(b,e[b][c].fn)})}}var n;["protoEvents","hcEvents"].forEach(function(e,k){var u=(k=
k?a:a.prototype)&&k[e];u&&(b?(n=u[b]||[],c?(u[b]=n.filter(function(a){return c!==a.fn}),l(b,c)):(f(u),u[b]=[])):(f(u),k[e]={}))})};d.fireEvent=function(a,b,f,h){var l;f=f||{};if(c.createEvent&&(a.dispatchEvent||a.fireEvent)){var n=c.createEvent("Events");n.initEvent(b,!0,!0);p(n,f);a.dispatchEvent?a.dispatchEvent(n):a.fireEvent(b,n)}else f.target||p(f,{preventDefault:function(){f.defaultPrevented=!0},target:a,type:b}),function(e,b){void 0===e&&(e=[]);void 0===b&&(b=[]);var c=0,k=0,n=e.length+b.length;
for(l=0;l<n;l++)!1===(e[c]?b[k]?e[c].order<=b[k].order?e[c++]:b[k++]:e[c++]:b[k++]).fn.call(a,f)&&f.preventDefault()}(a.protoEvents&&a.protoEvents[b],a.hcEvents&&a.hcEvents[b]);h&&!f.defaultPrevented&&h.call(a,f)};d.animate=function(a,b,c){var l,f="",n,e;if(!E(c)){var k=arguments;c={duration:k[2],easing:k[3],complete:k[4]}}v(c.duration)||(c.duration=400);c.easing="function"===typeof c.easing?c.easing:Math[c.easing]||Math.easeInOutSine;c.curAnim=d.merge(b);h(b,function(k,h){d.stop(a,h);e=new d.Fx(a,
c,h);n=null;"d"===h?(e.paths=e.initPath(a,a.d,b.d),e.toD=b.d,l=0,n=1):a.attr?l=a.attr(h):(l=parseFloat(d.getStyle(a,h))||0,"opacity"!==h&&(f="px"));n||(n=k);n&&n.match&&n.match("px")&&(n=n.replace(/px/g,""));e.run(l,n,f)})};d.seriesType=function(a,b,c,f,h){var l=d.getOptions(),e=d.seriesTypes;l.plotOptions[a]=d.merge(l.plotOptions[b],c);e[a]=m(e[b]||function(){},f);e[a].prototype.type=a;h&&(e[a].prototype.pointClass=m(d.Point,h));return e[a]};d.uniqueKey=function(){var a=Math.random().toString(36).substring(2,
9),b=0;return function(){return"highcharts-"+a+"-"+b++}}();d.isFunction=function(a){return"function"===typeof a};b.jQuery&&(b.jQuery.fn.highcharts=function(){var a=[].slice.call(arguments);if(this[0])return a[0]?(new (d[M(a[0])?a.shift():"Chart"])(this[0],a[0],a[1]),this):f[B(this[0],"data-highcharts-chart")]});return{animObject:function(a){return E(a)?d.merge(a):{duration:a?500:0}},arrayMax:function(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c},arrayMin:function(a){for(var b=a.length,
c=a[0];b--;)a[b]<c&&(c=a[b]);return c},attr:B,clamp:function(a,b,c){return a>b?a<c?a:c:b},correctFloat:q,defined:C,destroyObjectProperties:function(a,b){h(a,function(c,f){c&&c!==b&&c.destroy&&c.destroy();delete a[f]})},discardElement:function(a){var b=d.garbageBin;b||(b=d.createElement("div"));a&&b.appendChild(a);b.innerHTML=""},erase:function(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}},extend:p,extendClass:m,isArray:F,isClass:x,isDOMElement:D,isNumber:v,isObject:E,isString:M,
numberFormat:w,objectEach:h,offset:function(a){var f=c.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(b.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(b.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}},pad:function(a,b,c){return Array((b||2)+1-String(a).replace("-","").length).join(c||"0")+a},pick:z,pInt:g,relativeLength:function(a,b,c){return/%$/.test(a)?b*parseFloat(a)/100+(c||0):parseFloat(a)},setAnimation:function(a,b){b.renderer.globalAnimation=
z(a,b.options.chart.animation,!0)},splat:function(a){return F(a)?a:[a]},syncTimeout:function(a,b,c){if(0<b)return setTimeout(a,b,c);a.call(0,c);return-1},wrap:function(a,b,c){var f=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments),b=arguments,e=this;e.proceed=function(){f.apply(e,arguments.length?arguments:b)};a.unshift(f);a=c.apply(this,a);e.proceed=null;return a}}}});K(y,"parts/Color.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.isNumber,F=g.pInt,E=d.merge;
d.Color=function(g){if(!(this instanceof d.Color))return new d.Color(g);this.init(g)};d.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(d){return[F(d[1]),F(d[2]),F(d[3]),parseFloat(d[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(d){return[F(d[1]),F(d[2]),F(d[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(g){var x,v;if((this.input=g=this.names[g&&
g.toLowerCase?g.toLowerCase():""]||g)&&g.stops)this.stops=g.stops.map(function(g){return new d.Color(g[1])});else{if(g&&g.charAt&&"#"===g.charAt()){var C=g.length;g=parseInt(g.substr(1),16);7===C?x=[(g&16711680)>>16,(g&65280)>>8,g&255,1]:4===C&&(x=[(g&3840)>>4|(g&3840)>>8,(g&240)>>4|g&240,(g&15)<<4|g&15,1])}if(!x)for(v=this.parsers.length;v--&&!x;){var D=this.parsers[v];(C=D.regex.exec(g))&&(x=D.parse(C))}}this.rgba=x||[]},get:function(d){var g=this.input,v=this.rgba;if(this.stops){var C=E(g);C.stops=
[].concat(C.stops);this.stops.forEach(function(g,p){C.stops[p]=[C.stops[p][0],g.get(d)]})}else C=v&&M(v[0])?"rgb"===d||!d&&1===v[3]?"rgb("+v[0]+","+v[1]+","+v[2]+")":"a"===d?v[3]:"rgba("+v.join(",")+")":g;return C},brighten:function(d){var g,v=this.rgba;if(this.stops)this.stops.forEach(function(g){g.brighten(d)});else if(M(d)&&0!==d)for(g=0;3>g;g++)v[g]+=F(255*d),0>v[g]&&(v[g]=0),255<v[g]&&(v[g]=255);return this},setOpacity:function(d){this.rgba[3]=d;return this},tweenTo:function(d,g){var v=this.rgba,
x=d.rgba;x.length&&v&&v.length?(d=1!==x[3]||1!==v[3],g=(d?"rgba(":"rgb(")+Math.round(x[0]+(v[0]-x[0])*(1-g))+","+Math.round(x[1]+(v[1]-x[1])*(1-g))+","+Math.round(x[2]+(v[2]-x[2])*(1-g))+(d?","+(x[3]+(v[3]-x[3])*(1-g)):"")+")"):g=d.input||"none";return g}};d.color=function(g){return new d.Color(g)}});K(y,"parts/SvgRenderer.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.animObject,F=g.attr,E=g.defined,D=g.destroyObjectProperties,x=g.erase,v=g.extend,C=g.isArray,B=g.isNumber,
p=g.isObject,z=g.isString,m=g.objectEach,q=g.pick,w=g.pInt,h=g.splat,f=d.addEvent,c=d.animate,b=d.charts,a=d.color,l=d.css,n=d.createElement,t=d.deg2rad,I=d.doc,r=d.hasTouch,e=d.isFirefox,k=d.isMS,u=d.isWebKit,H=d.merge,G=d.noop,A=d.removeEvent,J=d.stop,L=d.svg,Q=d.SVG_NS,V=d.symbolSizes,U=d.win;var P=d.SVGElement=function(){return this};v(P.prototype,{opacity:1,SVG_NS:Q,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
init:function(a,e){this.element="span"===e?n(e):I.createElementNS(this.SVG_NS,e);this.renderer=a;d.fireEvent(this,"afterInit")},animate:function(a,e,b){var k=M(q(e,this.renderer.globalAnimation,!0));q(I.hidden,I.msHidden,I.webkitHidden,!1)&&(k.duration=0);0!==k.duration?(b&&(k.complete=b),c(this,a,k)):(this.attr(a,void 0,b),m(a,function(a,e){k.step&&k.step.call(this,a,{prop:e,pos:1})},this));return this},complexColor:function(a,e,b){var c=this.renderer,k,A,f,l,u,J,N,O,h,n,t,L=[],r;d.fireEvent(this.renderer,
"complexColor",{args:arguments},function(){a.radialGradient?A="radialGradient":a.linearGradient&&(A="linearGradient");A&&(f=a[A],u=c.gradients,N=a.stops,n=b.radialReference,C(f)&&(a[A]=f={x1:f[0],y1:f[1],x2:f[2],y2:f[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===A&&n&&!E(f.gradientUnits)&&(l=f,f=H(f,c.getRadialAttr(n,l),{gradientUnits:"userSpaceOnUse"})),m(f,function(a,e){"id"!==e&&L.push(e,a)}),m(N,function(a){L.push(a)}),L=L.join(","),u[L]?t=u[L].attr("id"):(f.id=t=d.uniqueKey(),u[L]=J=
c.createElement(A).attr(f).add(c.defs),J.radAttr=l,J.stops=[],N.forEach(function(a){0===a[1].indexOf("rgba")?(k=d.color(a[1]),O=k.get("rgb"),h=k.get("a")):(O=a[1],h=1);a=c.createElement("stop").attr({offset:a[0],"stop-color":O,"stop-opacity":h}).add(J);J.stops.push(a)})),r="url("+c.url+"#"+t+")",b.setAttribute(e,r),b.gradient=L,a.toString=function(){return r})})},applyTextOutline:function(a){var e=this.element,b;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(e.style.fill)));
a=a.split(" ");var c=a[a.length-1];if((b=a[0])&&"none"!==b&&d.svg){this.fakeTS=!0;a=[].slice.call(e.getElementsByTagName("tspan"));this.ySetter=this.xSetter;b=b.replace(/(^[\d\.]+)(.*?)$/g,function(a,e,b){return 2*e+b});this.removeTextOutline(a);var k=e.firstChild;a.forEach(function(a,f){0===f&&(a.setAttribute("x",e.getAttribute("x")),f=e.getAttribute("y"),a.setAttribute("y",f||0),null===f&&e.setAttribute("y",0));a=a.cloneNode(1);F(a,{"class":"highcharts-text-outline",fill:c,stroke:c,"stroke-width":b,
"stroke-linejoin":"round"});e.insertBefore(a,k)})}},removeTextOutline:function(a){for(var e=a.length,b;e--;)b=a[e],"highcharts-text-outline"===b.getAttribute("class")&&x(a,this.element.removeChild(b))},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(a,e,b,c){var k=this.element,f,A=this,l,u,N=this.symbolCustomAttribs;if("string"===typeof a&&"undefined"!==typeof e){var O=a;a={};a[O]=e}"string"===typeof a?A=(this[a+"Getter"]||this._defaultGetter).call(this,
a,k):(m(a,function(e,b){l=!1;c||J(this,b);this.symbolName&&-1!==d.inArray(b,N)&&(f||(this.symbolAttr(a),f=!0),l=!0);!this.rotation||"x"!==b&&"y"!==b||(this.doTransform=!0);l||(u=this[b+"Setter"]||this._defaultSetter,u.call(this,e,b,k),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b)&&this.updateShadows(b,e,u))},this),this.afterSetters());b&&b.call(this);return A},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,
e,b){for(var c=this.shadows,k=c.length;k--;)b.call(c[k],"height"===a?Math.max(e-(c[k].cutHeight||0),0):"d"===a?this.d:e,a,c[k])},addClass:function(a,e){var b=e?"":this.attr("class")||"";a=(a||"").split(/ /g).reduce(function(a,e){-1===b.indexOf(e)&&a.push(e);return a},b?[b]:[]).join(" ");a!==b&&this.attr("class",a);return this},hasClass:function(a){return-1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(z(a)?new RegExp(" ?"+
a+" ?"):a,""))},symbolAttr:function(a){var e=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(b){e[b]=q(a[b],e[b])});e.attr({d:e.renderer.symbols[e.symbolName](e.x,e.y,e.width,e.height,e)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,e){e=e||a.strokeWidth||0;var b=Math.round(e)%2/2;a.x=Math.floor(a.x||this.x||0)+b;a.y=Math.floor(a.y||this.y||0)+b;a.width=Math.floor((a.width||this.width||
0)-2*b);a.height=Math.floor((a.height||this.height||0)-2*b);E(a.strokeWidth)&&(a.strokeWidth=e);return a},css:function(a){var e=this.styles,b={},c=this.element,k="",f=!e,A=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);e&&m(a,function(a,c){a!==e[c]&&(b[c]=a,f=!0)});if(f){e&&(a=v(e,b));if(a)if(null===a.width||"auto"===a.width)delete this.textWidth;else if("text"===c.nodeName.toLowerCase()&&a.width)var u=this.textWidth=w(a.width);this.styles=a;u&&!L&&this.renderer.forExport&&delete a.width;
if(c.namespaceURI===this.SVG_NS){var J=function(a,e){return"-"+e.toLowerCase()};m(a,function(a,e){-1===A.indexOf(e)&&(k+=e.replace(/([A-Z])/g,J)+":"+a+";")});k&&F(c,"style",k)}else l(c,a);this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},getStyle:function(a){return U.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||
0;var a=this.getStyle("stroke-width"),e=0;if(a.indexOf("px")===a.length-2)e=w(a);else if(""!==a){var b=I.createElementNS(Q,"rect");F(b,{width:a,"stroke-width":0});this.element.parentNode.appendChild(b);e=b.getBBox().width;b.parentNode.removeChild(b)}return e},on:function(a,e){var b=this,c=b.element;r&&"click"===a?(c.ontouchstart=function(a){b.touchEventFired=Date.now();a.preventDefault();e.call(c,a)},c.onclick=function(a){(-1===U.navigator.userAgent.indexOf("Android")||1100<Date.now()-(b.touchEventFired||
0))&&e.call(c,a)}):c["on"+a]=e;return this},setRadialReference:function(a){var e=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;e&&e.radAttr&&e.animate(this.renderer.getRadialAttr(a,e.radAttr));return this},translate:function(a,e){return this.attr({translateX:a,translateY:e})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,e=this.translateY||0,b=this.scaleX,c=this.scaleY,k=this.inverted,f=this.rotation,
A=this.matrix,l=this.element;k&&(a+=this.width,e+=this.height);a=["translate("+a+","+e+")"];E(A)&&a.push("matrix("+A.join(",")+")");k?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+q(this.rotationOriginX,l.getAttribute("x"),0)+" "+q(this.rotationOriginY,l.getAttribute("y")||0)+")");(E(b)||E(c))&&a.push("scale("+q(b,1)+" "+q(c,1)+")");a.length&&l.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,e,b){var c,
k={};var f=this.renderer;var A=f.alignedObjects;var l,u;if(a){if(this.alignOptions=a,this.alignByTranslate=e,!b||z(b))this.alignTo=c=b||"renderer",x(A,this),A.push(this),b=null}else a=this.alignOptions,e=this.alignByTranslate,c=this.alignTo;b=q(b,f[c],f);c=a.align;f=a.verticalAlign;A=(b.x||0)+(a.x||0);var J=(b.y||0)+(a.y||0);"right"===c?l=1:"center"===c&&(l=2);l&&(A+=(b.width-(a.width||0))/l);k[e?"translateX":"x"]=Math.round(A);"bottom"===f?u=1:"middle"===f&&(u=2);u&&(J+=(b.height-(a.height||0))/
u);k[e?"translateY":"y"]=Math.round(J);this[this.placed?"animate":"attr"](k);this.placed=!0;this.alignAttr=k;return this},getBBox:function(a,e){var b,c=this.renderer,k=this.element,f=this.styles,A=this.textStr,l,u=c.cache,J=c.cacheKeys,h=k.namespaceURI===this.SVG_NS;e=q(e,this.rotation,0);var N=c.styledMode?k&&P.prototype.getStyle.call(k,"font-size"):f&&f.fontSize;if(E(A)){var n=A.toString();-1===n.indexOf("<")&&(n=n.replace(/[0-9]/g,"0"));n+=["",e,N,this.textWidth,f&&f.textOverflow].join()}n&&!a&&
(b=u[n]);if(!b){if(h||c.forExport){try{(l=this.fakeTS&&function(a){[].forEach.call(k.querySelectorAll(".highcharts-text-outline"),function(e){e.style.display=a})})&&l("none"),b=k.getBBox?v({},k.getBBox()):{width:k.offsetWidth,height:k.offsetHeight},l&&l("")}catch(ea){""}if(!b||0>b.width)b={width:0,height:0}}else b=this.htmlGetBBox();c.isSVG&&(a=b.width,c=b.height,h&&(b.height=c={"11px,17":14,"13px,20":16}[f&&f.fontSize+","+Math.round(c)]||c),e&&(f=e*t,b.width=Math.abs(c*Math.sin(f))+Math.abs(a*Math.cos(f)),
b.height=Math.abs(c*Math.cos(f))+Math.abs(a*Math.sin(f))));if(n&&0<b.height){for(;250<J.length;)delete u[J.shift()];u[n]||J.push(n);u[n]=b}}return b},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(a){a?this.attr({y:-9999}):this.attr({visibility:"hidden"});return this},fadeOut:function(a){var e=this;e.animate({opacity:0},{duration:a||150,complete:function(){e.attr({y:-9999})}})},add:function(a){var e=this.renderer,b=this.element;a&&(this.parentGroup=a);this.parentInverted=
a&&a.inverted;"undefined"!==typeof this.textStr&&e.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)var c=this.zIndexSetter();c||(a?a.element:e.box).appendChild(b);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var e=a.parentNode;e&&e.removeChild(a)},destroy:function(){var a=this,e=a.element||{},b=a.renderer,c=b.isSVG&&"SPAN"===e.nodeName&&a.parentGroup,k=e.ownerSVGElement,f=a.clipPath;e.onclick=e.onmouseout=e.onmouseover=e.onmousemove=e.point=null;J(a);f&&k&&([].forEach.call(k.querySelectorAll("[clip-path],[CLIP-PATH]"),
function(a){-1<a.getAttribute("clip-path").indexOf(f.element.id)&&a.removeAttribute("clip-path")}),a.clipPath=f.destroy());if(a.stops){for(k=0;k<a.stops.length;k++)a.stops[k]=a.stops[k].destroy();a.stops=null}a.safeRemoveChild(e);for(b.styledMode||a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)e=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=e;a.alignTo&&x(b.alignedObjects,a);m(a,function(e,b){a[b]&&a[b].parentGroup===a&&a[b].destroy&&a[b].destroy();delete a[b]})},shadow:function(a,
e,b){var c=[],k,f=this.element;if(!a)this.destroyShadows();else if(!this.shadows){var A=q(a.width,3);var l=(a.opacity||.15)/A;var u=this.parentInverted?"(-1,-1)":"("+q(a.offsetX,1)+", "+q(a.offsetY,1)+")";for(k=1;k<=A;k++){var J=f.cloneNode(0);var h=2*A+1-2*k;F(J,{stroke:a.color||"#000000","stroke-opacity":l*k,"stroke-width":h,transform:"translate"+u,fill:"none"});J.setAttribute("class",(J.getAttribute("class")||"")+" highcharts-shadow");b&&(F(J,"height",Math.max(F(J,"height")-h,0)),J.cutHeight=h);
e?e.element.appendChild(J):f.parentNode&&f.parentNode.insertBefore(J,f);c.push(J)}this.shadows=c}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=q(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},
dSetter:function(a,e,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[e]!==a&&(b.setAttribute(e,a),this[e]=a)},dashstyleSetter:function(a){var e,b=this["stroke-width"];"inherit"===b&&(b=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=a.length;e--;)a[e]=w(a[e])*
b;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){var e={left:"start",center:"middle",right:"end"};e[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",e[a]))},opacitySetter:function(a,e,b){this[e]=a;b.setAttribute(e,a)},titleSetter:function(a){var e=this.element.getElementsByTagName("title")[0];e||(e=I.createElementNS(this.SVG_NS,"title"),this.element.appendChild(e));e.firstChild&&e.removeChild(e.firstChild);e.appendChild(I.createTextNode(String(q(a,
"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this))},setTextPath:function(a,e){var b=this.element,c={textAnchor:"text-anchor"},k=!1,f=this.textPathWrapper,A=!f;e=H(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},e);var l=e.attributes;if(a&&e&&e.enabled){f&&null===f.element.parentNode?(A=!0,f=f.destroy()):f&&this.removeTextOutline.call(f.parentGroup,
[].slice.call(b.getElementsByTagName("tspan")));this.options&&this.options.padding&&(l.dx=-this.options.padding);f||(this.textPathWrapper=f=this.renderer.createElement("textPath"),k=!0);var u=f.element;(e=a.element.getAttribute("id"))||a.element.setAttribute("id",e=d.uniqueKey());if(A)for(a=b.getElementsByTagName("tspan");a.length;)a[0].setAttribute("y",0),B(l.dx)&&a[0].setAttribute("x",-l.dx),u.appendChild(a[0]);k&&f.add({element:this.text?this.text.element:b});u.setAttributeNS("http://www.w3.org/1999/xlink",
"href",this.renderer.url+"#"+e);E(l.dy)&&(u.parentNode.setAttribute("dy",l.dy),delete l.dy);E(l.dx)&&(u.parentNode.setAttribute("dx",l.dx),delete l.dx);m(l,function(a,e){u.setAttribute(c[e]||e,a)});b.removeAttribute("transform");this.removeTextOutline.call(f,[].slice.call(b.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=G}else f&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(b,
a),this.updateTransform(),this.options.rotation&&this.applyTextOutline(this.options.style.textOutline));return this},destroyTextPath:function(a,e){var b=a.getElementsByTagName("text")[0];if(b){if(b.removeAttribute("dx"),b.removeAttribute("dy"),e.element.setAttribute("id",""),b.getElementsByTagName("textPath").length){for(a=this.textPathWrapper.element.childNodes;a.length;)b.appendChild(a[0]);b.removeChild(this.textPathWrapper.element)}}else if(a.getAttribute("dx")||a.getAttribute("dy"))a.removeAttribute("dx"),
a.removeAttribute("dy");this.textPathWrapper=this.textPathWrapper.destroy()},fillSetter:function(a,e,b){"string"===typeof a?b.setAttribute(e,a):a&&this.complexColor(a,e,b)},visibilitySetter:function(a,e,b){"inherit"===a?b.removeAttribute(e):this[e]!==a&&b.setAttribute(e,a);this[e]=a},zIndexSetter:function(a,e){var b=this.renderer,c=this.parentGroup,k=(c||b).element||b.box,f=this.element,A=!1;b=k===b.box;var l=this.added;var u;E(a)?(f.setAttribute("data-z-index",a),a=+a,this[e]===a&&(l=!1)):E(this[e])&&
f.removeAttribute("data-z-index");this[e]=a;if(l){(a=this.zIndex)&&c&&(c.handleZ=!0);e=k.childNodes;for(u=e.length-1;0<=u&&!A;u--){c=e[u];l=c.getAttribute("data-z-index");var J=!E(l);if(c!==f)if(0>a&&J&&!b&&!u)k.insertBefore(f,e[u]),A=!0;else if(w(l)<=a||J&&(!E(a)||0<=a))k.insertBefore(f,e[u+1]||null),A=!0}A||(k.insertBefore(f,e[b?3:0]||null),A=!0)}return A},_defaultSetter:function(a,e,b){b.setAttribute(e,a)}});P.prototype.yGetter=P.prototype.xGetter;P.prototype.translateXSetter=P.prototype.translateYSetter=
P.prototype.rotationSetter=P.prototype.verticalAlignSetter=P.prototype.rotationOriginXSetter=P.prototype.rotationOriginYSetter=P.prototype.scaleXSetter=P.prototype.scaleYSetter=P.prototype.matrixSetter=function(a,e){this[e]=a;this.doTransform=!0};P.prototype["stroke-widthSetter"]=P.prototype.strokeSetter=function(a,e,b){this[e]=a;this.stroke&&this["stroke-width"]?(P.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
e&&0===a&&this.hasStroke?(b.removeAttribute("stroke"),this.hasStroke=!1):this.renderer.styledMode&&this["stroke-width"]&&(b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0)};g=d.SVGRenderer=function(){this.init.apply(this,arguments)};v(g.prototype,{Element:P,SVG_NS:Q,init:function(a,b,c,k,A,J,h){var n=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});h||n.css(this.getStyle(k));k=n.element;a.appendChild(k);F(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&
F(k,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=k;this.boxWrapper=n;this.alignedObjects=[];this.url=(e||u)&&I.getElementsByTagName("base").length?U.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(I.createTextNode("Created with Highcharts 8.0.0"));this.defs=this.createElement("defs").add();this.allowHTML=J;this.forExport=A;this.styledMode=h;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=
0;this.setSize(b,c,!1);var t;e&&a.getBoundingClientRect&&(b=function(){l(a,{left:0,top:0});t=a.getBoundingClientRect();l(a,{left:Math.ceil(t.left)-t.left+"px",top:Math.ceil(t.top)-t.top+"px"})},b(),this.unSubPixelFix=f(U,"resize",b))},definition:function(a){function e(a,c){var k;h(a).forEach(function(a){var f=b.createElement(a.tagName),A={};m(a,function(a,e){"tagName"!==e&&"children"!==e&&"textContent"!==e&&(A[e]=a)});f.attr(A);f.add(c||b.defs);a.textContent&&f.element.appendChild(I.createTextNode(a.textContent));
e(a.children||[],f);k=f});return k}var b=this;return e(a)},getStyle:function(a){return this.style=v({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();D(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&
this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var e=new this.Element;e.init(this,a);return e},draw:G,getRadialAttr:function(a,e){return{cx:a[0]-a[2]/2+e.cx*a[2],cy:a[1]-a[2]/2+e.cy*a[2],r:e.r*a[2]}},truncate:function(a,e,b,c,k,f,A){var l=this,u=a.rotation,J,h=c?1:0,n=(b||c).length,t=n,L=[],H=function(a){e.firstChild&&e.removeChild(e.firstChild);a&&e.appendChild(I.createTextNode(a))},d=function(f,u){u=u||f;if("undefined"===typeof L[u])if(e.getSubStringLength)try{L[u]=
k+e.getSubStringLength(0,c?u+1:u)}catch(ha){""}else l.getSpanWidth&&(H(A(b||c,f)),L[u]=k+l.getSpanWidth(a,e));return L[u]},r;a.rotation=0;var G=d(e.textContent.length);if(r=k+G>f){for(;h<=n;)t=Math.ceil((h+n)/2),c&&(J=A(c,t)),G=d(t,J&&J.length-1),h===n?h=n+1:G>f?n=t-1:h=t;0===n?H(""):b&&n===b.length-1||H(J||A(b||c,t))}c&&c.splice(0,t);a.actualWidth=G;a.rotation=u;return r},escapes:{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},buildText:function(a){var e=a.element,b=this,c=b.forExport,
k=q(a.textStr,"").toString(),f=-1!==k.indexOf("<"),A=e.childNodes,u,J=F(e,"x"),h=a.styles,n=a.textWidth,t=h&&h.lineHeight,H=h&&h.textOutline,d=h&&"ellipsis"===h.textOverflow,r=h&&"nowrap"===h.whiteSpace,G=h&&h.fontSize,g,O=A.length;h=n&&!a.added&&this.box;var V=function(a){var c;b.styledMode||(c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:G||b.style.fontSize||12);return t?w(t):b.fontMetrics(c,a.getAttribute("style")?a:e).h},p=function(a,e){m(b.escapes,function(b,c){e&&-1!==e.indexOf(b)||
(a=a.toString().replace(new RegExp(b,"g"),c))});return a},v=function(a,e){var b=a.indexOf("<");a=a.substring(b,a.indexOf(">")-b);b=a.indexOf(e+"=");if(-1!==b&&(b=b+e.length+1,e=a.charAt(b),'"'===e||"'"===e))return a=a.substring(b+1),a.substring(0,a.indexOf(e))},z=/<br.*?>/g;var U=[k,d,r,t,H,G,n].join();if(U!==a.textCache){for(a.textCache=U;O--;)e.removeChild(A[O]);f||H||d||n||-1!==k.indexOf(" ")&&(!r||z.test(k))?(h&&h.appendChild(e),f?(k=b.styledMode?k.replace(/<(b|strong)>/g,'<span class="highcharts-strong">').replace(/<(i|em)>/g,
'<span class="highcharts-emphasized">'):k.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">'),k=k.replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(z)):k=[k],k=k.filter(function(a){return""!==a}),k.forEach(function(k,f){var A=0,h=0;k=k.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");var t=k.split("|||");t.forEach(function(k){if(""!==k||1===t.length){var H={},N=I.createElementNS(b.SVG_NS,
"tspan"),q,m;(q=v(k,"class"))&&F(N,"class",q);if(q=v(k,"style"))q=q.replace(/(;| |^)color([ :])/,"$1fill$2"),F(N,"style",q);(m=v(k,"href"))&&!c&&(F(N,"onclick",'location.href="'+m+'"'),F(N,"class","highcharts-anchor"),b.styledMode||l(N,{cursor:"pointer"}));k=p(k.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==k){N.appendChild(I.createTextNode(k));A?H.dx=0:f&&null!==J&&(H.x=J);F(N,H);e.appendChild(N);!A&&g&&(!L&&c&&l(N,{display:"block"}),F(N,"dy",V(N)));if(n){var w=k.replace(/([^\^])-/g,"$1- ").split(" ");
H=!r&&(1<t.length||f||1<w.length);m=0;var ba=V(N);if(d)u=b.truncate(a,N,k,void 0,0,Math.max(0,n-parseInt(G||12,10)),function(a,e){return a.substring(0,e)+"\u2026"});else if(H)for(;w.length;)w.length&&!r&&0<m&&(N=I.createElementNS(Q,"tspan"),F(N,{dy:ba,x:J}),q&&F(N,"style",q),N.appendChild(I.createTextNode(w.join(" ").replace(/- /g,"-"))),e.appendChild(N)),b.truncate(a,N,null,w,0===m?h:0,n,function(a,e){return w.slice(0,e).join(" ").replace(/- /g,"-")}),h=a.actualWidth,m++}A++}}});g=g||e.childNodes.length}),
d&&u&&a.attr("title",p(a.textStr,["&lt;","&gt;"])),h&&h.removeChild(e),H&&a.applyTextOutline&&a.applyTextOutline(H)):e.appendChild(I.createTextNode(p(k)))}},getContrast:function(e){e=a(e).rgba;e[0]*=1;e[1]*=1.2;e[2]*=.5;return 459<e[0]+e[1]+e[2]?"#000000":"#FFFFFF"},button:function(a,e,b,c,A,l,u,J,h,n){var t=this.label(a,e,b,h,null,null,n,null,"button"),L=0,d=this.styledMode;t.attr(H({padding:8,r:2},A));if(!d){A=H({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",
fontWeight:"normal"}},A);var r=A.style;delete A.style;l=H(A,{fill:"#e6e6e6"},l);var G=l.style;delete l.style;u=H(A,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},u);var N=u.style;delete u.style;J=H(A,{style:{color:"#cccccc"}},J);var Q=J.style;delete J.style}f(t.element,k?"mouseover":"mouseenter",function(){3!==L&&t.setState(1)});f(t.element,k?"mouseout":"mouseleave",function(){3!==L&&t.setState(L)});t.setState=function(a){1!==a&&(t.state=L=a);t.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);d||t.attr([A,l,u,J][a||0]).css([r,G,N,Q][a||0])};d||t.attr(A).css(v({cursor:"default"},r));return t.on("click",function(a){3!==L&&c.call(t,a)})},crispLine:function(a,e){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-e%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+e%2/2);return a},path:function(a){var e=this.styledMode?{}:{fill:"none"};C(a)?e.d=a:p(a)&&v(e,a);return this.createElement("path").attr(e)},circle:function(a,e,b){a=p(a)?a:"undefined"===typeof a?{}:
{x:a,y:e,r:b};e=this.createElement("circle");e.xSetter=e.ySetter=function(a,e,b){b.setAttribute("c"+e,a)};return e.attr(a)},arc:function(a,e,b,c,k,f){p(a)?(c=a,e=c.y,b=c.r,a=c.x):c={innerR:c,start:k,end:f};a=this.symbol("arc",a,e,b,b,c);a.r=b;return a},rect:function(a,e,b,c,k,f){k=p(a)?a.r:k;var A=this.createElement("rect");a=p(a)?a:"undefined"===typeof a?{}:{x:a,y:e,width:Math.max(b,0),height:Math.max(c,0)};this.styledMode||("undefined"!==typeof f&&(a.strokeWidth=f,a=A.crisp(a)),a.fill="none");k&&
(a.r=k);A.rSetter=function(a,e,b){A.r=a;F(b,{rx:a,ry:a})};A.rGetter=function(){return A.r};return A.attr(a)},setSize:function(a,e,b){var c=this.alignedObjects,k=c.length;this.width=a;this.height=e;for(this.boxWrapper.animate({width:a,height:e},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:q(b,!0)?void 0:0});k--;)c[k].align()},g:function(a){var e=this.createElement("g");return a?e.attr({"class":"highcharts-"+a}):e},image:function(a,e,b,c,k,A){var l=
{preserveAspectRatio:"none"},u=function(a,e){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",e):a.setAttribute("hc-svg-href",e)},J=function(e){u(h.element,a);A.call(h,e)};1<arguments.length&&v(l,{x:e,y:b,width:c,height:k});var h=this.createElement("image").attr(l);A?(u(h.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),l=new U.Image,f(l,"load",J),l.src=a,l.complete&&J({})):u(h.element,a);return h},symbol:function(a,e,c,k,f,A){var u=this,
J=/^url\((.*?)\)$/,h=J.test(a),t=!h&&(this.symbols[a]?a:"circle"),L=t&&this.symbols[t],H=E(e)&&L&&L.call(this.symbols,Math.round(e),Math.round(c),k,f,A);if(L){var d=this.path(H);u.styledMode||d.attr("fill","none");v(d,{symbolName:t,x:e,y:c,width:k,height:f});A&&v(d,A)}else if(h){var r=a.match(J)[1];d=this.image(r);d.imgwidth=q(V[r]&&V[r].width,A&&A.width);d.imgheight=q(V[r]&&V[r].height,A&&A.height);var G=function(){d.attr({width:d.width,height:d.height})};["width","height"].forEach(function(a){d[a+
"Setter"]=function(a,e){var b={},c=this["img"+e],k="width"===e?"translateX":"translateY";this[e]=a;E(c)&&(A&&"within"===A.backgroundSize&&this.width&&this.height&&(c=Math.round(c*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(e,c),this.alignByTranslate||(b[k]=((this[e]||0)-c)/2,this.attr(b)))}});E(e)&&d.attr({x:e,y:c});d.isImg=!0;E(d.imgwidth)&&E(d.imgheight)?G():(d.attr({width:0,height:0}),n("img",{onload:function(){var a=b[u.chartIndex];0===
this.width&&(l(this,{position:"absolute",top:"-999em"}),I.body.appendChild(this));V[r]={width:this.width,height:this.height};d.imgwidth=this.width;d.imgheight=this.height;d.element&&G();this.parentNode&&this.parentNode.removeChild(this);u.imgCount--;if(!u.imgCount&&a&&a.onload)a.onload()},src:r}),this.imgCount++)}return d},symbols:{circle:function(a,e,b,c){return this.arc(a+b/2,e+c/2,b/2,c/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,e,b,c){return["M",a,e,"L",a+b,e,a+b,e+c,a,e+
c,"Z"]},triangle:function(a,e,b,c){return["M",a+b/2,e,"L",a+b,e+c,a,e+c,"Z"]},"triangle-down":function(a,e,b,c){return["M",a,e,"L",a+b,e,a+b/2,e+c,"Z"]},diamond:function(a,e,b,c){return["M",a+b/2,e,"L",a+b,e+c/2,a+b/2,e+c,a,e+c/2,"Z"]},arc:function(a,e,b,c,k){var f=k.start,A=k.r||b,u=k.r||c||b,l=k.end-.001;b=k.innerR;c=q(k.open,.001>Math.abs(k.end-k.start-2*Math.PI));var J=Math.cos(f),h=Math.sin(f),n=Math.cos(l);l=Math.sin(l);f=q(k.longArc,.001>k.end-f-Math.PI?0:1);A=["M",a+A*J,e+u*h,"A",A,u,0,f,
q(k.clockwise,1),a+A*n,e+u*l];E(b)&&A.push(c?"M":"L",a+b*n,e+b*l,"A",b,b,0,f,E(k.clockwise)?1-k.clockwise:0,a+b*J,e+b*h);A.push(c?"":"Z");return A},callout:function(a,e,b,c,k){var f=Math.min(k&&k.r||0,b,c),A=f+6,l=k&&k.anchorX;k=k&&k.anchorY;var u=["M",a+f,e,"L",a+b-f,e,"C",a+b,e,a+b,e,a+b,e+f,"L",a+b,e+c-f,"C",a+b,e+c,a+b,e+c,a+b-f,e+c,"L",a+f,e+c,"C",a,e+c,a,e+c,a,e+c-f,"L",a,e+f,"C",a,e,a,e,a+f,e];l&&l>b?k>e+A&&k<e+c-A?u.splice(13,3,"L",a+b,k-6,a+b+6,k,a+b,k+6,a+b,e+c-f):u.splice(13,3,"L",a+b,
c/2,l,k,a+b,c/2,a+b,e+c-f):l&&0>l?k>e+A&&k<e+c-A?u.splice(33,3,"L",a,k+6,a-6,k,a,k-6,a,e+f):u.splice(33,3,"L",a,c/2,l,k,a,c/2,a,e+f):k&&k>c&&l>a+A&&l<a+b-A?u.splice(23,3,"L",l+6,e+c,l,e+c+6,l-6,e+c,a+f,e+c):k&&0>k&&l>a+A&&l<a+b-A&&u.splice(3,3,"L",l-6,e,l,e-6,l+6,e,b-f,e);return u}},clipRect:function(a,e,b,c){var k=d.uniqueKey()+"-",f=this.createElement("clipPath").attr({id:k}).add(this.defs);a=this.rect(a,e,b,c,0).add(f);a.id=k;a.clipPath=f;a.count=0;return a},text:function(a,e,b,c){var k={};if(c&&
(this.allowHTML||!this.forExport))return this.html(a,e,b);k.x=Math.round(e||0);b&&(k.y=Math.round(b));E(a)&&(k.text=a);a=this.createElement("text").attr(k);c||(a.xSetter=function(a,e,b){var c=b.getElementsByTagName("tspan"),k=b.getAttribute(e),f;for(f=0;f<c.length;f++){var A=c[f];A.getAttribute(e)===k&&A.setAttribute(e,a)}b.setAttribute(e,a)});return a},fontMetrics:function(a,e){a=!this.styledMode&&/px/.test(a)||!U.getComputedStyle?a||e&&e.style&&e.style.fontSize||this.style&&this.style.fontSize:
e&&P.prototype.getStyle.call(e,"font-size");a=/px/.test(a)?w(a):12;e=24>a?a+3:Math.round(1.2*a);return{h:e,b:Math.round(.8*e),f:a}},rotCorr:function(a,e,b){var c=a;e&&b&&(c=Math.max(c*Math.cos(e*t),4));return{x:-a/3*Math.sin(e*t),y:c}},label:function(a,e,b,c,k,f,l,u,J){var h=this,n=h.styledMode,t=h.g("button"!==J&&"label"),L=t.text=h.text("",0,0,l).attr({zIndex:1}),d,r,G=0,Q=3,q=0,m,I,w,N,g,V={},p,ba,z=/^url\((.*?)\)$/.test(c),U=n||z,x=function(){return n?d.strokeWidth()%2/2:(p?parseInt(p,10):0)%
2/2};J&&t.addClass("highcharts-"+J);var O=function(){var a=L.element.style,e={};r=("undefined"===typeof m||"undefined"===typeof I||g)&&E(L.textStr)&&L.getBBox();t.width=(m||r.width||0)+2*Q+q;t.height=(I||r.height||0)+2*Q;ba=Q+Math.min(h.fontMetrics(a&&a.fontSize,L).b,r?r.height:Infinity);U&&(d||(t.box=d=h.symbols[c]||z?h.symbol(c):h.rect(),d.addClass(("button"===J?"":"highcharts-label-box")+(J?" highcharts-"+J+"-box":"")),d.add(t),a=x(),e.x=a,e.y=(u?-ba:0)+a),e.width=Math.round(t.width),e.height=
Math.round(t.height),d.attr(v(e,V)),V={})};var ca=function(){var a=q+Q;var e=u?0:ba;E(m)&&r&&("center"===g||"right"===g)&&(a+={center:.5,right:1}[g]*(m-r.width));if(a!==L.x||e!==L.y)L.attr("x",a),L.hasBoxWidthChanged&&(r=L.getBBox(!0),O()),"undefined"!==typeof e&&L.attr("y",e);L.x=a;L.y=e};var C=function(a,e){d?d.attr(a,e):V[a]=e};t.onAdd=function(){L.add(t);t.attr({text:a||0===a?a:"",x:e,y:b});d&&E(k)&&t.attr({anchorX:k,anchorY:f})};t.widthSetter=function(a){m=B(a)?a:null};t.heightSetter=function(a){I=
a};t["text-alignSetter"]=function(a){g=a};t.paddingSetter=function(a){E(a)&&a!==Q&&(Q=t.padding=a,ca())};t.paddingLeftSetter=function(a){E(a)&&a!==q&&(q=a,ca())};t.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==G&&(G=a,r&&t.attr({x:w}))};t.textSetter=function(a){"undefined"!==typeof a&&L.attr({text:a});O();ca()};t["stroke-widthSetter"]=function(a,e){a&&(U=!0);p=this["stroke-width"]=a;C(e,a)};n?t.rSetter=function(a,e){C(e,a)}:t.strokeSetter=t.fillSetter=t.rSetter=function(a,e){"r"!==e&&
("fill"===e&&a&&(U=!0),t[e]=a);C(e,a)};t.anchorXSetter=function(a,e){k=t.anchorX=a;C(e,Math.round(a)-x()-w)};t.anchorYSetter=function(a,e){f=t.anchorY=a;C(e,a-N)};t.xSetter=function(a){t.x=a;G&&(a-=G*((m||r.width)+2*Q),t["forceAnimate:x"]=!0);w=Math.round(a);t.attr("translateX",w)};t.ySetter=function(a){N=t.y=Math.round(a);t.attr("translateY",N)};var T=t.css;l={css:function(a){if(a){var e={};a=H(a);t.textProps.forEach(function(b){"undefined"!==typeof a[b]&&(e[b]=a[b],delete a[b])});L.css(e);"width"in
e&&O();"fontSize"in e&&(O(),ca())}return T.call(t,a)},getBBox:function(){return{width:r.width+2*Q,height:r.height+2*Q,x:r.x-Q,y:r.y-Q}},destroy:function(){A(t.element,"mouseenter");A(t.element,"mouseleave");L&&(L=L.destroy());d&&(d=d.destroy());P.prototype.destroy.call(t);t=h=O=ca=C=null}};n||(l.shadow=function(a){a&&(O(),d&&d.shadow(a));return t});return v(t,l)}});d.Renderer=g});K(y,"parts/Html.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.attr,F=g.defined,E=g.extend,
D=g.pick,x=g.pInt,v=d.createElement,C=d.css,B=d.isFirefox,p=d.isMS,z=d.isWebKit,m=d.SVGElement;g=d.SVGRenderer;var q=d.win;E(m.prototype,{htmlCss:function(d){var h="SPAN"===this.element.tagName&&d&&"width"in d,f=D(h&&d.width,void 0);if(h){delete d.width;this.textWidth=f;var c=!0}d&&"ellipsis"===d.textOverflow&&(d.whiteSpace="nowrap",d.overflow="hidden");this.styles=E(this.styles,d);C(this.element,d);c&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var d=this.element;return{x:d.offsetLeft,
y:d.offsetTop,width:d.offsetWidth,height:d.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var d=this.renderer,h=this.element,f=this.translateX||0,c=this.translateY||0,b=this.x||0,a=this.y||0,l=this.textAlign||"left",n={left:0,center:.5,right:1}[l],t=this.styles,q=t&&t.whiteSpace;C(h,{marginLeft:f,marginTop:c});!d.styledMode&&this.shadows&&this.shadows.forEach(function(a){C(a,{marginLeft:f+1,marginTop:c+1})});this.inverted&&[].forEach.call(h.childNodes,function(a){d.invertChild(a,h)});
if("SPAN"===h.tagName){t=this.rotation;var r=this.textWidth&&x(this.textWidth),e=[t,l,h.innerHTML,this.textWidth,this.textAlign].join(),k;(k=r!==this.oldTextWidth)&&!(k=r>this.oldTextWidth)&&((k=this.textPxLength)||(C(h,{width:"",whiteSpace:q||"nowrap"}),k=h.offsetWidth),k=k>r);k&&(/[ \-]/.test(h.textContent||h.innerText)||"ellipsis"===h.style.textOverflow)?(C(h,{width:r+"px",display:"block",whiteSpace:q||"normal"}),this.oldTextWidth=r,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;e!==this.cTT&&
(q=d.fontMetrics(h.style.fontSize,h).b,!F(t)||t===(this.oldRotation||0)&&l===this.oldAlign||this.setSpanRotation(t,n,q),this.getSpanCorrection(!F(t)&&this.textPxLength||h.offsetWidth,q,n,t,l));C(h,{left:b+(this.xCorr||0)+"px",top:a+(this.yCorr||0)+"px"});this.cTT=e;this.oldRotation=t;this.oldAlign=l}}else this.alignOnAdd=!0},setSpanRotation:function(d,h,f){var c={},b=this.renderer.getTransformKey();c[b]=c.transform="rotate("+d+"deg)";c[b+(B?"Origin":"-origin")]=c.transformOrigin=100*h+"% "+f+"px";
C(this.element,c)},getSpanCorrection:function(d,h,f){this.xCorr=-d*f;this.yCorr=-h}});E(g.prototype,{getTransformKey:function(){return p&&!/Edge/.test(q.navigator.userAgent)?"-ms-transform":z?"-webkit-transform":B?"MozTransform":q.opera?"-o-transform":""},html:function(d,h,f){var c=this.createElement("span"),b=c.element,a=c.renderer,l=a.isSVG,n=function(a,b){["opacity","visibility"].forEach(function(c){a[c+"Setter"]=function(e,k,f){var l=a.div?a.div.style:b;m.prototype[c+"Setter"].call(this,e,k,f);
l&&(l[k]=e)}});a.addedSetters=!0};c.textSetter=function(a){a!==b.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;b.innerHTML=D(a,"");c.doTransform=!0};l&&n(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b="textAlign");c[b]=a;c.doTransform=!0};c.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};c.attr({text:d,x:Math.round(h),y:Math.round(f)}).css({position:"absolute"});a.styledMode||c.css({fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize});b.style.whiteSpace="nowrap";c.css=c.htmlCss;l&&(c.add=function(f){var l=a.box.parentNode,h=[];if(this.parentGroup=f){var e=f.div;if(!e){for(;f;)h.push(f),f=f.parentGroup;h.reverse().forEach(function(a){function b(e,b){a[b]=e;"translateX"===b?f.left=e+"px":f.top=e+"px";a.doTransform=!0}var k=M(a.element,"class");e=a.div=a.div||v("div",k?{className:k}:void 0,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,
pointerEvents:a.styles&&a.styles.pointerEvents},e||l);var f=e.style;E(a,{classSetter:function(a){return function(e){this.element.setAttribute("class",e);a.className=e}}(e),on:function(){h[0].div&&c.on.apply({element:h[0].div},arguments);return a},translateXSetter:b,translateYSetter:b});a.addedSetters||n(a)})}}else e=l;e.appendChild(b);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})});K(y,"parts/Time.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.defined,
F=g.extend,E=g.isObject,D=g.objectEach,x=g.pad,v=g.pick,C=g.splat,B=d.merge,p=d.timeUnits,z=d.win;d.Time=function(d){this.update(d,!1)};d.Time.prototype={defaultOptions:{Date:void 0,getTimezoneOffset:void 0,timezone:void 0,timezoneOffset:0,useUTC:!0},update:function(d){var q=v(d&&d.useUTC,!0),m=this;this.options=d=B(!0,this.options||{},d);this.Date=d.Date||z.Date||Date;this.timezoneOffset=(this.useUTC=q)&&d.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=
!(q&&!d.getTimezoneOffset&&!d.timezone))||this.timezoneOffset?(this.get=function(h,f){var c=f.getTime(),b=c-m.getTimezoneOffset(f);f.setTime(b);h=f["getUTC"+h]();f.setTime(c);return h},this.set=function(h,f,c){if("Milliseconds"===h||"Seconds"===h||"Minutes"===h&&0===f.getTimezoneOffset()%60)f["set"+h](c);else{var b=m.getTimezoneOffset(f);b=f.getTime()-b;f.setTime(b);f["setUTC"+h](c);h=m.getTimezoneOffset(f);b=f.getTime()+h;f.setTime(b)}}):q?(this.get=function(h,f){return f["getUTC"+h]()},this.set=
function(h,f,c){return f["setUTC"+h](c)}):(this.get=function(h,f){return f["get"+h]()},this.set=function(h,f,c){return f["set"+h](c)})},makeTime:function(m,q,g,h,f,c){if(this.useUTC){var b=this.Date.UTC.apply(0,arguments);var a=this.getTimezoneOffset(b);b+=a;var l=this.getTimezoneOffset(b);a!==l?b+=l-a:a-36E5!==this.getTimezoneOffset(b-36E5)||d.isSafari||(b-=36E5)}else b=(new this.Date(m,q,v(g,1),v(h,0),v(f,0),v(c,0))).getTime();return b},timezoneOffsetFunction:function(){var m=this,q=this.options,
g=z.moment;if(!this.useUTC)return function(h){return 6E4*(new Date(h)).getTimezoneOffset()};if(q.timezone){if(g)return function(h){return 6E4*-g.tz(h,q.timezone).utcOffset()};d.error(25)}return this.useUTC&&q.getTimezoneOffset?function(h){return 6E4*q.getTimezoneOffset(h)}:function(){return 6E4*(m.timezoneOffset||0)}},dateFormat:function(m,q,g){if(!M(q)||isNaN(q))return d.defaultOptions.lang.invalidDate||"";m=v(m,"%Y-%m-%d %H:%M:%S");var h=this,f=new this.Date(q),c=this.get("Hours",f),b=this.get("Day",
f),a=this.get("Date",f),l=this.get("Month",f),n=this.get("FullYear",f),t=d.defaultOptions.lang,I=t.weekdays,r=t.shortWeekdays;f=F({a:r?r[b]:I[b].substr(0,3),A:I[b],d:x(a),e:x(a,2," "),w:b,b:t.shortMonths[l],B:t.months[l],m:x(l+1),o:l+1,y:n.toString().substr(2,2),Y:n,H:x(c),k:c,I:x(c%12||12),l:c%12||12,M:x(h.get("Minutes",f)),p:12>c?"AM":"PM",P:12>c?"am":"pm",S:x(f.getSeconds()),L:x(Math.floor(q%1E3),3)},d.dateFormats);D(f,function(a,b){for(;-1!==m.indexOf("%"+b);)m=m.replace("%"+b,"function"===typeof a?
a.call(h,q):a)});return g?m.substr(0,1).toUpperCase()+m.substr(1):m},resolveDTLFormat:function(d){return E(d,!0)?d:(d=C(d),{main:d[0],from:d[1],to:d[2]})},getTimeTicks:function(d,q,g,h){var f=this,c=[],b={};var a=new f.Date(q);var l=d.unitRange,n=d.count||1,t;h=v(h,1);if(M(q)){f.set("Milliseconds",a,l>=p.second?0:n*Math.floor(f.get("Milliseconds",a)/n));l>=p.second&&f.set("Seconds",a,l>=p.minute?0:n*Math.floor(f.get("Seconds",a)/n));l>=p.minute&&f.set("Minutes",a,l>=p.hour?0:n*Math.floor(f.get("Minutes",
a)/n));l>=p.hour&&f.set("Hours",a,l>=p.day?0:n*Math.floor(f.get("Hours",a)/n));l>=p.day&&f.set("Date",a,l>=p.month?1:Math.max(1,n*Math.floor(f.get("Date",a)/n)));if(l>=p.month){f.set("Month",a,l>=p.year?0:n*Math.floor(f.get("Month",a)/n));var m=f.get("FullYear",a)}l>=p.year&&f.set("FullYear",a,m-m%n);l===p.week&&(m=f.get("Day",a),f.set("Date",a,f.get("Date",a)-m+h+(m<h?-7:0)));m=f.get("FullYear",a);h=f.get("Month",a);var r=f.get("Date",a),e=f.get("Hours",a);q=a.getTime();f.variableTimezone&&(t=g-
q>4*p.month||f.getTimezoneOffset(q)!==f.getTimezoneOffset(g));q=a.getTime();for(a=1;q<g;)c.push(q),q=l===p.year?f.makeTime(m+a*n,0):l===p.month?f.makeTime(m,h+a*n):!t||l!==p.day&&l!==p.week?t&&l===p.hour&&1<n?f.makeTime(m,h,r,e+a*n):q+l*n:f.makeTime(m,h,r+a*n*(l===p.day?1:7)),a++;c.push(q);l<=p.hour&&1E4>c.length&&c.forEach(function(a){0===a%18E5&&"000000000"===f.dateFormat("%H%M%S%L",a)&&(b[a]="day")})}c.info=F(d,{higherRanks:b,totalRange:l*n});return c}}});K(y,"parts/Options.js",[y["parts/Globals.js"]],
function(d){var g=d.color,M=d.merge;d.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:d.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",
margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},
itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:d.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:d.isTouchDevice?25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:g("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",
pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};d.setOptions=function(g){d.defaultOptions=M(!0,d.defaultOptions,g);(g.time||g.global)&&d.time.update(M(d.defaultOptions.global,d.defaultOptions.time,g.global,g.time));return d.defaultOptions};d.getOptions=function(){return d.defaultOptions};d.defaultPlotOptions=
d.defaultOptions.plotOptions;d.time=new d.Time(M(d.defaultOptions.global,d.defaultOptions.time));d.dateFormat=function(g,E,D){return d.time.dateFormat(g,E,D)};""});K(y,"parts/Tick.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.clamp,F=g.correctFloat,E=g.defined,D=g.destroyObjectProperties,x=g.extend,v=g.isNumber,C=g.objectEach,B=g.pick,p=d.fireEvent,z=d.merge,m=d.deg2rad;d.Tick=function(d,m,h,f,c){this.axis=d;this.pos=m;this.type=h||"";this.isNewLabel=this.isNew=!0;this.parameters=
c||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;h||f||this.addLabel()};d.Tick.prototype={addLabel:function(){var d=this,m=d.axis,h=m.options,f=m.chart,c=m.categories,b=m.names,a=d.pos,l=B(d.options&&d.options.labels,h.labels),n=m.tickPositions,t=a===n[0],g=a===n[n.length-1];b=this.parameters.category||(c?B(c[a],b[a],a):a);var r=d.label;c=(!l.step||1===l.step)&&1===m.tickInterval;n=n.info;var e,k;if(m.isDatetimeAxis&&n){var u=f.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid&&
n.higherRanks[a]||n.unitName]);var H=u.main}d.isFirst=t;d.isLast=g;d.formatCtx={axis:m,chart:f,isFirst:t,isLast:g,dateTimeLabelFormat:H,tickPositionInfo:n,value:m.isLog?F(m.lin2log(b)):b,pos:a};h=m.labelFormatter.call(d.formatCtx,this.formatCtx);if(k=u&&u.list)d.shortenLabel=function(){for(e=0;e<k.length;e++)if(r.attr({text:m.labelFormatter.call(x(d.formatCtx,{dateTimeLabelFormat:k[e]}))}),r.getBBox().width<m.getSlotWidth(d)-2*B(l.padding,5))return;r.attr({text:""})};c&&m._addedPlotLB&&m.isXAxis&&
d.moveLabel(h,l);E(r)||d.movedLabel?r&&r.textStr!==h&&!c&&(!r.textWidth||l.style&&l.style.width||r.styles.width||r.css({width:null}),r.attr({text:h}),r.textPxLength=r.getBBox().width):(d.label=r=d.createLabel({x:0,y:0},h,l),d.rotation=0)},moveLabel:function(d,m){var h=this,f=h.label,c=!1,b=h.axis,a=b.reversed,l=b.chart.inverted;f&&f.textStr===d?(h.movedLabel=f,c=!0,delete h.label):C(b.ticks,function(a){c||a.isNew||a===h||!a.label||a.label.textStr!==d||(h.movedLabel=a.label,c=!0,a.labelPos=h.movedLabel.xy,
delete a.label)});if(!c&&(h.labelPos||f)){var n=h.labelPos||f.xy;f=l?n.x:a?0:b.width+b.left;b=l?a?b.width+b.left:0:n.y;h.movedLabel=h.createLabel({x:f,y:b},d,m);h.movedLabel&&h.movedLabel.attr({opacity:0})}},createLabel:function(d,m,h){var f=this.axis,c=f.chart;if(d=E(m)&&h.enabled?c.renderer.text(m,d.x,d.y,h.useHTML).add(f.labelGroup):null)c.styledMode||d.css(z(h.style)),d.textPxLength=d.getBBox().width;return d},replaceMovedLabel:function(){var d=this.label,m=this.axis,h=m.reversed,f=this.axis.chart.inverted;
if(d&&!this.isNew){var c=f?d.xy.x:h?m.left:m.width+m.left;h=f?h?m.width+m.top:m.top:d.xy.y;d.animate({x:c,y:h,opacity:0},void 0,d.destroy);delete this.label}m.isDirty=!0;this.label=this.movedLabel;delete this.movedLabel},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(d){var g=this.axis,h=g.options.labels,f=d.x,c=g.chart.chartWidth,b=g.chart.spacing,a=B(g.labelLeft,Math.min(g.pos,b[3]));b=B(g.labelRight,Math.max(g.isRadial?
0:g.pos+g.len,c-b[1]));var l=this.label,n=this.rotation,t={left:0,center:.5,right:1}[g.labelAlign||l.attr("align")],q=l.getBBox().width,r=g.getSlotWidth(this),e=r,k=1,u,H={};if(n||"justify"!==B(h.overflow,"justify"))0>n&&f-t*q<a?u=Math.round(f/Math.cos(n*m)-a):0<n&&f+t*q>b&&(u=Math.round((c-f)/Math.cos(n*m)));else if(c=f+(1-t)*q,f-t*q<a?e=d.x+e*(1-t)-a:c>b&&(e=b-d.x+e*t,k=-1),e=Math.min(r,e),e<r&&"center"===g.labelAlign&&(d.x+=k*(r-e-t*(r-Math.min(q,e)))),q>e||g.autoRotation&&(l.styles||{}).width)u=
e;u&&(this.shortenLabel?this.shortenLabel():(H.width=Math.floor(u),(h.style||{}).textOverflow||(H.textOverflow="ellipsis"),l.css(H)))},getPosition:function(d,m,h,f){var c=this.axis,b=c.chart,a=f&&b.oldChartHeight||b.chartHeight;d={x:d?F(c.translate(m+h,null,null,f)+c.transB):c.left+c.offset+(c.opposite?(f&&b.oldChartWidth||b.chartWidth)-c.right-c.left:0),y:d?a-c.bottom+c.offset-(c.opposite?c.height:0):F(a-c.translate(m+h,null,null,f)-c.transB)};d.y=M(d.y,-1E5,1E5);p(this,"afterGetPosition",{pos:d});
return d},getLabelPosition:function(d,g,h,f,c,b,a,l){var n=this.axis,t=n.transA,q=n.isLinked&&n.linkedParent?n.linkedParent.reversed:n.reversed,r=n.staggerLines,e=n.tickRotCorr||{x:0,y:0},k=c.y,u=f||n.reserveSpaceDefault?0:-n.labelOffset*("center"===n.labelAlign?.5:1),H={};E(k)||(k=0===n.side?h.rotation?-8:-h.getBBox().height:2===n.side?e.y+8:Math.cos(h.rotation*m)*(e.y-h.getBBox(!1,0).height/2));d=d+c.x+u+e.x-(b&&f?b*t*(q?-1:1):0);g=g+k-(b&&!f?b*t*(q?1:-1):0);r&&(h=a/(l||1)%r,n.opposite&&(h=r-h-
1),g+=n.labelOffset/r*h);H.x=d;H.y=Math.round(g);p(this,"afterGetLabelPosition",{pos:H,tickmarkOffset:b,index:a});return H},getMarkPath:function(d,m,h,f,c,b){return b.crispLine(["M",d,m,"L",d+(c?0:-h),m+(c?h:0)],f)},renderGridLine:function(d,m,h){var f=this.axis,c=f.options,b=this.gridLine,a={},l=this.pos,n=this.type,t=B(this.tickmarkOffset,f.tickmarkOffset),g=f.chart.renderer,r=n?n+"Grid":"grid",e=c[r+"LineWidth"],k=c[r+"LineColor"];c=c[r+"LineDashStyle"];b||(f.chart.styledMode||(a.stroke=k,a["stroke-width"]=
e,c&&(a.dashstyle=c)),n||(a.zIndex=1),d&&(m=0),this.gridLine=b=g.path().attr(a).addClass("highcharts-"+(n?n+"-":"")+"grid-line").add(f.gridGroup));if(b&&(h=f.getPlotLinePath({value:l+t,lineWidth:b.strokeWidth()*h,force:"pass",old:d})))b[d||this.isNew?"attr":"animate"]({d:h,opacity:m})},renderMark:function(d,m,h){var f=this.axis,c=f.options,b=f.chart.renderer,a=this.type,l=a?a+"Tick":"tick",n=f.tickSize(l),t=this.mark,g=!t,r=d.x;d=d.y;var e=B(c[l+"Width"],!a&&f.isXAxis?1:0);c=c[l+"Color"];n&&(f.opposite&&
(n[0]=-n[0]),g&&(this.mark=t=b.path().addClass("highcharts-"+(a?a+"-":"")+"tick").add(f.axisGroup),f.chart.styledMode||t.attr({stroke:c,"stroke-width":e})),t[g?"attr":"animate"]({d:this.getMarkPath(r,d,n[0],t.strokeWidth()*h,f.horiz,b),opacity:m}))},renderLabel:function(d,m,h,f){var c=this.axis,b=c.horiz,a=c.options,l=this.label,n=a.labels,t=n.step;c=B(this.tickmarkOffset,c.tickmarkOffset);var g=!0,r=d.x;d=d.y;l&&v(r)&&(l.xy=d=this.getLabelPosition(r,d,l,b,n,c,f,t),this.isFirst&&!this.isLast&&!B(a.showFirstLabel,
1)||this.isLast&&!this.isFirst&&!B(a.showLastLabel,1)?g=!1:!b||n.step||n.rotation||m||0===h||this.handleOverflow(d),t&&f%t&&(g=!1),g&&v(d.y)?(d.opacity=h,l[this.isNewLabel?"attr":"animate"](d),this.isNewLabel=!1):(l.attr("y",-9999),this.isNewLabel=!0))},render:function(m,g,h){var f=this.axis,c=f.horiz,b=this.pos,a=B(this.tickmarkOffset,f.tickmarkOffset);b=this.getPosition(c,b,a,g);a=b.x;var l=b.y;f=c&&a===f.pos+f.len||!c&&l===f.pos?-1:1;h=B(h,1);this.isActive=!0;this.renderGridLine(g,h,f);this.renderMark(b,
h,f);this.renderLabel(b,g,h,m);this.isNew=!1;d.fireEvent(this,"afterRender")},destroy:function(){D(this,this.axis)}}});K(y,"parts/Axis.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.animObject,F=g.arrayMax,E=g.arrayMin,D=g.clamp,x=g.correctFloat,v=g.defined,C=g.destroyObjectProperties,B=g.extend,p=g.isArray,z=g.isNumber,m=g.isString,q=g.objectEach,w=g.pick,h=g.relativeLength,f=g.splat,c=g.syncTimeout,b=d.addEvent,a=d.color,l=d.defaultOptions,n=d.deg2rad,t=d.fireEvent,I=
d.format,r=d.getMagnitude,e=d.merge,k=d.normalizeTickInterval,u=d.removeEvent,H=d.seriesTypes,G=d.Tick;g=function(){this.init.apply(this,arguments)};B(g.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",
fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,
showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",formatter:function(){var a=this.axis.chart.numberFormatter;return a(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],
x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},init:function(a,e){var c=e.isX,k=this;k.chart=a;k.horiz=a.inverted&&!k.isZAxis?!c:c;k.isXAxis=c;k.coll=k.coll||(c?"xAxis":"yAxis");t(this,"init",{userOptions:e});k.opposite=e.opposite;k.side=e.side||(k.horiz?k.opposite?0:2:k.opposite?1:3);k.setOptions(e);var A=this.options,l=A.type;k.labelFormatter=A.labels.formatter||k.defaultLabelFormatter;k.userOptions=e;k.minPixelPadding=0;k.reversed=
A.reversed;k.visible=!1!==A.visible;k.zoomEnabled=!1!==A.zoomEnabled;k.hasNames="category"===l||!0===A.categories;k.categories=A.categories||k.hasNames;k.names||(k.names=[],k.names.keys={});k.plotLinesAndBandsGroups={};k.isLog="logarithmic"===l;k.isDatetimeAxis="datetime"===l;k.positiveValuesOnly=k.isLog&&!k.allowNegativeLog;k.isLinked=v(A.linkedTo);k.ticks={};k.labelEdge=[];k.minorTicks={};k.plotLinesAndBands=[];k.alternateBands={};k.len=0;k.minRange=k.userMinRange=A.minRange||A.maxZoom;k.range=
A.range;k.offset=A.offset||0;k.stacks={};k.oldStacks={};k.stacksTouched=0;k.max=null;k.min=null;k.crosshair=w(A.crosshair,f(a.options.tooltip.crosshairs)[c?0:1],!1);e=k.options.events;-1===a.axes.indexOf(k)&&(c?a.axes.splice(a.xAxis.length,0,k):a.axes.push(k),a[k.coll].push(k));k.series=k.series||[];a.inverted&&!k.isZAxis&&c&&"undefined"===typeof k.reversed&&(k.reversed=!0);q(e,function(a,e){d.isFunction(a)&&b(k,e,a)});k.lin2log=A.linearToLogConverter||k.lin2log;k.isLog&&(k.val2lin=k.log2lin,k.lin2val=
k.lin2log);t(this,"afterInit")},setOptions:function(a){this.options=e(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],e(l[this.coll],a));t(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var a=this.axis,e=this.value,b=a.chart.time,c=a.categories,k=this.dateTimeLabelFormat,f=l.lang,u=f.numericSymbols;f=f.numericSymbolMagnitude||1E3;
var d=u&&u.length,h=a.options.labels.format;a=a.isLog?Math.abs(e):a.tickInterval;var t=this.chart,n=t.numberFormatter;if(h)var r=I(h,this,t);else if(c)r=e;else if(k)r=b.dateFormat(k,e);else if(d&&1E3<=a)for(;d--&&"undefined"===typeof r;)b=Math.pow(f,d+1),a>=b&&0===10*e%b&&null!==u[d]&&0!==e&&(r=n(e/b,-1)+u[d]);"undefined"===typeof r&&(r=1E4<=Math.abs(e)?n(e,-1):n(e,-1,void 0,""));return r},getSeriesExtremes:function(){var a=this,e=a.chart,b;t(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=
!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(c){if(c.visible||!e.options.chart.ignoreHiddenSeries){var k=c.options,f=k.threshold;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=f&&(f=null);if(a.isXAxis){if(k=c.xData,k.length){b=c.getXExtremes(k);var A=b.min;var l=b.max;z(A)||A instanceof Date||(k=k.filter(z),b=c.getXExtremes(k),A=b.min,l=b.max);k.length&&(a.dataMin=Math.min(w(a.dataMin,A),A),a.dataMax=Math.max(w(a.dataMax,
l),l))}}else if(c.getExtremes(),l=c.dataMax,A=c.dataMin,v(A)&&v(l)&&(a.dataMin=Math.min(w(a.dataMin,A),A),a.dataMax=Math.max(w(a.dataMax,l),l)),v(f)&&(a.threshold=f),!k.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});t(this,"afterGetSeriesExtremes")},translate:function(a,e,b,c,k,f){var A=this.linkedParent||this,l=1,u=0,J=c?A.oldTransA:A.transA;c=c?A.oldMin:A.min;var d=A.minPixelPadding;k=(A.isOrdinal||A.isBroken||A.isLog&&k)&&A.lin2val;J||(J=A.transA);b&&(l*=-1,u=A.len);A.reversed&&(l*=
-1,u-=l*(A.sector||A.len));e?(a=(a*l+u-d)/J+c,k&&(a=A.lin2val(a))):(k&&(a=A.val2lin(a)),a=z(c)?l*(a-c)*J+u+l*d+(z(f)?J*f:0):void 0);return a},toPixels:function(a,e){return this.translate(a,!1,!this.horiz,null,!0)+(e?0:this.pos)},toValue:function(a,e){return this.translate(a-(e?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a){var e=this,b=e.chart,c=e.left,k=e.top,f=a.old,A=a.value,l=a.translatedValue,u=a.lineWidth,d=a.force,h,n,r,H,G=f&&b.oldChartHeight||b.chartHeight,m=f&&b.oldChartWidth||
b.chartWidth,g,q=e.transB,I=function(a,e,b){if("pass"!==d&&a<e||a>b)d?a=D(a,e,b):g=!0;return a};a={value:A,lineWidth:u,old:f,force:d,acrossPanes:a.acrossPanes,translatedValue:l};t(this,"getPlotLinePath",a,function(a){l=w(l,e.translate(A,null,null,f));l=D(l,-1E5,1E5);h=r=Math.round(l+q);n=H=Math.round(G-l-q);z(l)?e.horiz?(n=k,H=G-e.bottom,h=r=I(h,c,c+e.width)):(h=c,r=m-e.right,n=H=I(n,k,k+e.height)):(g=!0,d=!1);a.path=g&&!d?null:b.renderer.crispLine(["M",h,n,"L",r,H],u||1)});return a.path},getLinearTickPositions:function(a,
e,b){var c=x(Math.floor(e/a)*a);b=x(Math.ceil(b/a)*a);var k=[],f;x(c+a)===c&&(f=20);if(this.single)return[e];for(e=c;e<=b;){k.push(e);e=x(e+a,f);if(e===l)break;var l=e}return k},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?w(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,e=a.options,b=a.tickPositions,c=a.minorTickInterval,k=[],f=a.pointRangePadding||0,l=a.min-f;f=a.max+f;var u=f-l;if(u&&u/c<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(e,
b,f){b&&k.push.apply(k,a.getLogTickPositions(c,f[b-1],f[b],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())k=k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c),l,f,e.startOfWeek));else for(e=l+(b[0]-l)%c;e<=f&&e!==k[0];e+=c)k.push(e);0!==k.length&&a.trimTicks(k);return k},adjustForMinRange:function(){var a=this.options,e=this.min,b=this.max,c,k,f,l,u;this.isXAxis&&"undefined"===typeof this.minRange&&!this.isLog&&(v(a.min)||v(a.max)?this.minRange=null:(this.series.forEach(function(a){l=
a.xData;for(k=u=a.xIncrement?1:l.length-1;0<k;k--)if(f=l[k]-l[k-1],"undefined"===typeof c||f<c)c=f}),this.minRange=Math.min(5*c,this.dataMax-this.dataMin)));if(b-e<this.minRange){var d=this.dataMax-this.dataMin>=this.minRange;var h=this.minRange;var t=(h-b+e)/2;t=[e-t,w(a.min,e-t)];d&&(t[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin);e=F(t);b=[e+h,w(a.max,e+h)];d&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax);b=E(b);b-e<h&&(t[0]=b-h,t[1]=w(a.min,b-h),e=F(t))}this.min=e;this.max=
b},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(e){var b=e.closestPointRange,c=e.visible||!e.chart.options.chart.ignoreHiddenSeries;!e.noSharedTooltip&&v(b)&&c&&(a=v(a)?Math.min(a,b):b)});return a},nameToX:function(a){var e=p(this.categories),b=e?this.categories:this.names,c=a.options.x;a.series.requireSorting=!1;v(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():e?b.indexOf(a.name):w(b.keys[a.name],-1));if(-1===c){if(!e)var k=b.length}else k=c;"undefined"!==
typeof k&&(this.names[k]=a.name,this.names.keys[a.name]=k);return k},updateNames:function(){var a=this,e=this.names;0<e.length&&(Object.keys(e.keys).forEach(function(a){delete e.keys[a]}),e.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(e){e.xIncrement=null;if(!e.points||e.isDirtyData)a.max=Math.max(a.max,e.xData.length-1),e.processData(),e.generatePoints();e.data.forEach(function(b,c){if(b&&b.options&&"undefined"!==typeof b.name){var k=a.nameToX(b);"undefined"!==typeof k&&
k!==b.x&&(b.x=k,e.xData[c]=k)}})}))},setAxisTranslation:function(a){var e=this,b=e.max-e.min,c=e.axisPointRange||0,k=0,f=0,l=e.linkedParent,u=!!e.categories,A=e.transA,d=e.isXAxis;if(d||u||c){var h=e.getClosest();l?(k=l.minPointOffset,f=l.pointRangePadding):e.series.forEach(function(a){var b=u?1:d?w(a.options.pointRange,h,0):e.axisPointRange||0,l=a.options.pointPlacement;c=Math.max(c,b);if(!e.single||u)a=H.xrange&&a instanceof H.xrange?!d:d,k=Math.max(k,a&&m(l)?0:b/2),f=Math.max(f,a&&"on"===l?0:b)});
l=e.ordinalSlope&&h?e.ordinalSlope/h:1;e.minPointOffset=k*=l;e.pointRangePadding=f*=l;e.pointRange=Math.min(c,e.single&&u?1:b);d&&(e.closestPointRange=h)}a&&(e.oldTransA=A);e.translationSlope=e.transA=A=e.staticScale||e.len/(b+f||1);e.transB=e.horiz?e.left:e.bottom;e.minPixelPadding=A*k;t(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var e=this,b=e.chart,c=e.options,f=e.isLog,l=e.isDatetimeAxis,u=e.isXAxis,A=e.isLinked,h=c.maxPadding,
n=c.minPadding,H=c.tickInterval,G=c.tickPixelInterval,m=e.categories,g=z(e.threshold)?e.threshold:null,q=e.softThreshold;l||m||A||this.getTickAmount();var I=w(e.userMin,c.min);var p=w(e.userMax,c.max);if(A){e.linkedParent=b[e.coll][c.linkedTo];var C=e.linkedParent.getExtremes();e.min=w(C.min,C.dataMin);e.max=w(C.max,C.dataMax);c.type!==e.linkedParent.options.type&&d.error(11,1,b)}else{if(!q&&v(g))if(e.dataMin>=g)C=g,n=0;else if(e.dataMax<=g){var B=g;h=0}e.min=w(I,C,e.dataMin);e.max=w(p,B,e.dataMax)}f&&
(e.positiveValuesOnly&&!a&&0>=Math.min(e.min,w(e.dataMin,e.min))&&d.error(10,1,b),e.min=x(e.log2lin(e.min),16),e.max=x(e.log2lin(e.max),16));e.range&&v(e.max)&&(e.userMin=e.min=I=Math.max(e.dataMin,e.minFromRange()),e.userMax=p=e.max,e.range=null);t(e,"foundExtremes");e.beforePadding&&e.beforePadding();e.adjustForMinRange();!(m||e.axisPointRange||e.usePercentage||A)&&v(e.min)&&v(e.max)&&(b=e.max-e.min)&&(!v(I)&&n&&(e.min-=b*n),!v(p)&&h&&(e.max+=b*h));z(e.userMin)||(z(c.softMin)&&c.softMin<e.min&&
(e.min=I=c.softMin),z(c.floor)&&(e.min=Math.max(e.min,c.floor)));z(e.userMax)||(z(c.softMax)&&c.softMax>e.max&&(e.max=p=c.softMax),z(c.ceiling)&&(e.max=Math.min(e.max,c.ceiling)));q&&v(e.dataMin)&&(g=g||0,!v(I)&&e.min<g&&e.dataMin>=g?e.min=e.options.minRange?Math.min(g,e.max-e.minRange):g:!v(p)&&e.max>g&&e.dataMax<=g&&(e.max=e.options.minRange?Math.max(g,e.min+e.minRange):g));e.tickInterval=e.min===e.max||"undefined"===typeof e.min||"undefined"===typeof e.max?1:A&&!H&&G===e.linkedParent.options.tickPixelInterval?
H=e.linkedParent.tickInterval:w(H,this.tickAmount?(e.max-e.min)/Math.max(this.tickAmount-1,1):void 0,m?1:(e.max-e.min)*G/Math.max(e.len,G));u&&!a&&e.series.forEach(function(a){a.processData(e.min!==e.oldMin||e.max!==e.oldMax)});e.setAxisTranslation(!0);e.beforeSetTickPositions&&e.beforeSetTickPositions();e.postProcessTickInterval&&(e.tickInterval=e.postProcessTickInterval(e.tickInterval));e.pointRange&&!H&&(e.tickInterval=Math.max(e.pointRange,e.tickInterval));a=w(c.minTickInterval,e.isDatetimeAxis&&
e.closestPointRange);!H&&e.tickInterval<a&&(e.tickInterval=a);l||f||H||(e.tickInterval=k(e.tickInterval,null,r(e.tickInterval),w(c.allowDecimals,!(.5<e.tickInterval&&5>e.tickInterval&&1E3<e.max&&9999>e.max)),!!this.tickAmount));this.tickAmount||(e.tickInterval=e.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,e=a.tickPositions;var b=this.getMinorTickInterval();var c=a.tickPositioner,k=a.startOnTick,f=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===
a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&v(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=e&&e.slice();!b&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(b=[this.min,this.max],d.error(19,!1,this.chart)):b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()],b[0]===b[1]&&(b.length=1)),this.tickPositions=b,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=b=c);this.paddedTicks=b.slice(0);this.trimTicks(b,k,f);this.isLinked||(this.single&&2>b.length&&!this.categories&&(this.min-=
.5,this.max+=.5),e||c||this.adjustTickAmount());t(this,"afterSetTickPositions")},trimTicks:function(a,e,b){var c=a[0],k=a[a.length-1],f=this.minPointOffset||0;t(this,"trimTicks");if(!this.isLinked){if(e&&-Infinity!==c)this.min=c;else for(;this.min-f>a[0];)a.shift();if(b)this.max=k;else for(;this.max+f<a[a.length-1];)a.pop();0===a.length&&v(c)&&!this.options.tickPositions&&a.push((k+c)/2)}},alignToOthers:function(){var a={},e,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||
!1===b.startOnTick||!1===b.endOnTick||this.isLog||this.chart[this.coll].forEach(function(b){var c=b.options;c=[b.horiz?c.left:c.top,c.width,c.height,c.pane].join();b.series.length&&(a[c]?e=!0:a[c]=1)});return e},getTickAmount:function(){var a=this.options,e=a.tickAmount,b=a.tickPixelInterval;!v(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(e=2);!e&&this.alignToOthers()&&(e=Math.ceil(this.len/b)+1);4>e&&(this.finalTickAmt=e,e=5);this.tickAmount=e},adjustTickAmount:function(){var a=
this.options,e=this.tickInterval,b=this.tickPositions,c=this.tickAmount,k=this.finalTickAmt,f=b&&b.length,l=w(this.threshold,this.softThreshold?0:null),u;if(this.hasData()){if(f<c){for(u=this.min;b.length<c;)b.length%2||u===l?b.push(x(b[b.length-1]+e)):b.unshift(x(b[0]-e));this.transA*=(f-1)/(c-1);this.min=a.startOnTick?b[0]:Math.min(this.min,b[0]);this.max=a.endOnTick?b[b.length-1]:Math.max(this.max,b[b.length-1])}else f>c&&(this.tickInterval*=2,this.setTickPositions());if(v(k)){for(e=a=b.length;e--;)(3===
k&&1===e%2||2>=k&&0<e&&e<a-1)&&b.splice(e,1);this.finalTickAmt=void 0}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||a.isDirty||a.xAxis&&a.xAxis.isDirty}),e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();(e=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),
this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();t(this,"afterSetScale")},setExtremes:function(a,e,b,c,k){var f=this,l=f.chart;b=w(b,!0);f.series.forEach(function(a){delete a.kdTree});k=B(k,{min:a,max:e});t(f,"setExtremes",k,function(){f.userMin=a;f.userMax=e;f.eventArgs=k;b&&l.redraw(c)})},zoom:function(a,e){var b=this.dataMin,c=this.dataMax,k=this.options,
f=Math.min(b,w(k.min,b)),l=Math.max(c,w(k.max,c));a={newMin:a,newMax:e};t(this,"zoom",a,function(a){var e=a.newMin,k=a.newMax;if(e!==this.min||k!==this.max)this.allowZoomOutside||(v(b)&&(e<f&&(e=f),e>l&&(e=l)),v(c)&&(k<f&&(k=f),k>l&&(k=l))),this.displayBtn="undefined"!==typeof e||"undefined"!==typeof k,this.setExtremes(e,k,!1,void 0,{trigger:"zoom"});a.zoomed=!0});return a.zoomed},setAxisSize:function(){var a=this.chart,e=this.options,b=e.offsets||[0,0,0,0],c=this.horiz,k=this.width=Math.round(h(w(e.width,
a.plotWidth-b[3]+b[1]),a.plotWidth)),f=this.height=Math.round(h(w(e.height,a.plotHeight-b[0]+b[2]),a.plotHeight)),l=this.top=Math.round(h(w(e.top,a.plotTop+b[0]),a.plotHeight,a.plotTop));e=this.left=Math.round(h(w(e.left,a.plotLeft+b[3]),a.plotWidth,a.plotLeft));this.bottom=a.chartHeight-f-l;this.right=a.chartWidth-k-e;this.len=Math.max(c?k:f,0);this.pos=c?e:l},getExtremes:function(){var a=this.isLog;return{min:a?x(this.lin2log(this.min)):this.min,max:a?x(this.lin2log(this.max)):this.max,dataMin:this.dataMin,
dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var e=this.isLog,b=e?this.lin2log(this.min):this.min;e=e?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=b:Infinity===a?a=e:b>a?a=b:e<a&&(a=e);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var e=(w(a,0)-90*this.side+720)%360;a={align:"center"};t(this,"autoLabelAlign",a,function(a){15<e&&165>e?a.align="right":195<e&&345>e&&(a.align="left")});return a.align},tickSize:function(a){var e=
this.options,b=e[a+"Length"],c=w(e[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0);if(c&&b){"inside"===e[a+"Position"]&&(b=-b);var k=[b,c]}a={tickSize:k};t(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,e=this.horiz,b=this.tickInterval,
c=b,k=this.len/(((this.categories?1:0)+this.max-this.min)/b),f,l=a.rotation,u=this.labelMetrics(),d,h=Number.MAX_VALUE,t,r=this.max-this.min,H=function(a){var e=a/(k||1);e=1<e?Math.ceil(e):1;e*b>r&&Infinity!==a&&Infinity!==k&&r&&(e=Math.ceil(r/b));return x(e*b)};e?(t=!a.staggerLines&&!a.step&&(v(l)?[l]:k<w(a.autoRotationLimit,80)&&a.autoRotation))&&t.forEach(function(a){if(a===l||a&&-90<=a&&90>=a){d=H(Math.abs(u.h/Math.sin(n*a)));var e=d+Math.abs(a/360);e<h&&(h=e,f=a,c=d)}}):a.step||(c=H(u.h));this.autoRotation=
t;this.labelRotation=w(f,l);return c},getSlotWidth:function(a){var e=this.chart,b=this.horiz,c=this.options.labels,k=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=e.margin[3];return a&&a.slotWidth||b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/k||!b&&(c.style&&parseInt(c.style.width,10)||f&&f-e.spacing[3]||.33*e.chartWidth)},renderUnsquish:function(){var a=this.chart,e=a.renderer,b=this.tickPositions,c=this.ticks,k=this.options.labels,f=k&&k.style||{},l=this.horiz,
u=this.getSlotWidth(),d=Math.max(1,Math.round(u-2*(k.padding||5))),h={},t=this.labelMetrics(),n=k.style&&k.style.textOverflow,r=0;m(k.rotation)||(h.rotation=k.rotation||0);b.forEach(function(a){a=c[a];a.movedLabel&&a.replaceMovedLabel();a&&a.label&&a.label.textPxLength>r&&(r=a.label.textPxLength)});this.maxLabelLength=r;if(this.autoRotation)r>d&&r>t.h?h.rotation=this.labelRotation:this.labelRotation=0;else if(u){var H=d;if(!n){var G="clip";for(d=b.length;!l&&d--;){var g=b[d];if(g=c[g].label)g.styles&&
"ellipsis"===g.styles.textOverflow?g.css({textOverflow:"clip"}):g.textPxLength>u&&g.css({width:u+"px"}),g.getBBox().height>this.len/b.length-(t.h-t.f)&&(g.specificTextOverflow="ellipsis")}}}h.rotation&&(H=r>.5*a.chartHeight?.33*a.chartHeight:r,n||(G="ellipsis"));if(this.labelAlign=k.align||this.autoLabelAlign(this.labelRotation))h.align=this.labelAlign;b.forEach(function(a){var e=(a=c[a])&&a.label,b=f.width,k={};e&&(e.attr(h),a.shortenLabel?a.shortenLabel():H&&!b&&"nowrap"!==f.whiteSpace&&(H<e.textPxLength||
"SPAN"===e.element.tagName)?(k.width=H,n||(k.textOverflow=e.specificTextOverflow||G),e.css(k)):e.styles&&e.styles.width&&!k.width&&!b&&e.css({width:null}),delete e.specificTextOverflow,a.rotation=h.rotation)},this);this.tickRotCorr=e.rotCorr(t.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&v(this.min)&&v(this.max)},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,k=this.opposite,f=this.options.title,
l,u=this.chart.styledMode;this.axisTitle||((l=f.textAlign)||(l=(c?{low:"left",middle:"center",high:"right"}:{low:k?"right":"left",middle:"center",high:k?"left":"right"})[f.align]),this.axisTitle=b.text(f.text,0,0,f.useHTML).attr({zIndex:7,rotation:f.rotation||0,align:l}).addClass("highcharts-axis-title"),u||this.axisTitle.css(e(f.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);u||f.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](a)},
generateTick:function(a){var e=this.ticks;e[a]?e[a].addLabel():e[a]=new G(this,a)},getOffset:function(){var a=this,e=a.chart,b=e.renderer,c=a.options,k=a.tickPositions,f=a.ticks,l=a.horiz,u=a.side,d=e.inverted&&!a.isZAxis?[1,0,3,2][u]:u,h,n=0,r=0,H=c.title,G=c.labels,g=0,m=e.axisOffset;e=e.clipOffset;var I=[-1,1,1,-1][u],p=c.className,z=a.axisParent;var x=a.hasData();a.showAxis=h=x||w(c.showEmpty,!0);a.staggerLines=a.horiz&&G.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:c.gridZIndex||
1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(p||"")).add(z),a.axisGroup=b.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(p||"")).add(z),a.labelGroup=b.g("axis-labels").attr({zIndex:G.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(p||"")).add(z));x||a.isLinked?(k.forEach(function(e,b){a.generateTick(e,b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===u||2===u||{1:"left",3:"right"}[u]===a.labelAlign,w(G.reserveSpace,"center"===
a.labelAlign?!0:null,a.reserveSpaceDefault)&&k.forEach(function(a){g=Math.max(f[a].getLabelSize(),g)}),a.staggerLines&&(g*=a.staggerLines),a.labelOffset=g*(a.opposite?-1:1)):q(f,function(a,e){a.destroy();delete f[e]});if(H&&H.text&&!1!==H.enabled&&(a.addTitle(h),h&&!1!==H.reserveSpace)){a.titleOffset=n=a.axisTitle.getBBox()[l?"height":"width"];var C=H.offset;r=v(C)?0:w(H.margin,l?5:10)}a.renderLine();a.offset=I*w(c.offset,m[u]?m[u]+(c.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===u?-a.labelMetrics().h:
2===u?a.tickRotCorr.y:0;r=Math.abs(g)+r;g&&(r=r-b+I*(l?w(G.y,a.tickRotCorr.y+8*I):G.x));a.axisTitleMargin=w(C,r);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(f,k));l=this.tickSize("tick");m[u]=Math.max(m[u],a.axisTitleMargin+n+I*a.offset,r,k&&k.length&&l?l[0]+I*a.offset:0);c=c.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);e[d]=Math.max(e[d],c);t(this,"afterGetOffset")},getLinePath:function(a){var e=this.chart,b=this.opposite,c=this.offset,k=this.horiz,f=this.left+(b?
this.width:0)+c;c=e.chartHeight-this.bottom-(b?this.height:0)+c;b&&(a*=-1);return e.renderer.crispLine(["M",k?this.left:f,k?c:this.top,"L",k?e.chartWidth-this.right:f,k?c:e.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,
e=this.left,b=this.top,c=this.len,k=this.options.title,f=a?e:b,l=this.opposite,u=this.offset,d=k.x||0,h=k.y||0,n=this.axisTitle,r=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,n);n=Math.max(n.getBBox(null,0).height-r.h-1,0);c={low:f+(a?0:c),middle:f+c/2,high:f+(a?c:0)}[k.align];e=(a?b+this.height:e)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+[-n,n,r.f,-n][this.side];a={x:a?c+d:e+(l?this.width:0)+u+d,y:a?e+h-(l?this.height:0)+u:c+h};t(this,"afterGetTitlePosition",{titlePosition:a});return a},
renderMinorTick:function(a){var e=this.chart.hasRendered&&z(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new G(this,a,"minor"));e&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,e){var b=this.isLinked,c=this.ticks,k=this.chart.hasRendered&&z(this.oldMin);if(!b||a>=this.min&&a<=this.max)c[a]||(c[a]=new G(this,a)),k&&c[a].isNew&&c[a].render(e,!0,-1),c[a].render(e)},render:function(){var a=this,e=a.chart,b=a.options,k=a.isLog,f=a.isLinked,l=a.tickPositions,u=a.axisTitle,
h=a.ticks,n=a.minorTicks,r=a.alternateBands,H=b.stackLabels,g=b.alternateGridColor,m=a.tickmarkOffset,I=a.axisLine,p=a.showAxis,w=M(e.renderer.globalAnimation),v,x;a.labelEdge.length=0;a.overlap=!1;[h,n,r].forEach(function(a){q(a,function(a){a.isActive=!1})});if(a.hasData()||f)a.minorTickInterval&&!a.categories&&a.getMinorTickPositions().forEach(function(e){a.renderMinorTick(e)}),l.length&&(l.forEach(function(e,b){a.renderTick(e,b)}),m&&(0===a.min||a.single)&&(h[-1]||(h[-1]=new G(a,-1,null,!0)),h[-1].render(-1))),
g&&l.forEach(function(b,c){x="undefined"!==typeof l[c+1]?l[c+1]+m:a.max-m;0===c%2&&b<a.max&&x<=a.max+(e.polar?-m:m)&&(r[b]||(r[b]=new d.PlotLineOrBand(a)),v=b+m,r[b].options={from:k?a.lin2log(v):v,to:k?a.lin2log(x):x,color:g},r[b].render(),r[b].isActive=!0)}),a._addedPlotLB||((b.plotLines||[]).concat(b.plotBands||[]).forEach(function(e){a.addPlotBandOrLine(e)}),a._addedPlotLB=!0);[h,n,r].forEach(function(a){var b,k=[],f=w.duration;q(a,function(a,e){a.isActive||(a.render(e,!1,0),a.isActive=!1,k.push(e))});
c(function(){for(b=k.length;b--;)a[k[b]]&&!a[k[b]].isActive&&(a[k[b]].destroy(),delete a[k[b]])},a!==r&&e.hasRendered&&f?f:0)});I&&(I[I.isPlaced?"animate":"attr"]({d:this.getLinePath(I.strokeWidth())}),I.isPlaced=!0,I[p?"show":"hide"](p));u&&p&&(b=a.getTitlePosition(),z(b.y)?(u[u.isNew?"attr":"animate"](b),u.isNew=!1):(u.attr("y",-9999),u.isNew=!0));H&&H.enabled&&a.renderStackTotals();a.isDirty=!1;t(this,"afterRender")},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));
this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var e=this,b=e.stacks,c=e.plotLinesAndBands,k;t(this,"destroy",{keepEvents:a});a||u(e);q(b,function(a,e){C(a);b[e]=null});[e.ticks,e.minorTicks,e.alternateBands].forEach(function(a){C(a)});if(c)for(a=c.length;a--;)c[a].destroy();"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){e[a]&&(e[a]=e[a].destroy())});
for(k in e.plotLinesAndBandsGroups)e.plotLinesAndBandsGroups[k]=e.plotLinesAndBandsGroups[k].destroy();q(e,function(a,b){-1===e.keepProps.indexOf(b)&&delete e[b]})},drawCrosshair:function(e,b){var c=this.crosshair,k=w(c.snap,!0),f,l=this.cross;t(this,"drawCrosshair",{e:e,point:b});e||(e=this.cross&&this.cross.e);if(this.crosshair&&!1!==(v(b)||!k)){k?v(b)&&(f=w("colorAxis"!==this.coll?b.crosshairPos:null,this.isXAxis?b.plotX:this.len-b.plotY)):f=e&&(this.horiz?e.chartX-this.pos:this.len-e.chartY+this.pos);
if(v(f)){var u={value:b&&(this.isXAxis?b.x:w(b.stackY,b.y)),translatedValue:f};this.chart.polar&&B(u,{isCrosshair:!0,chartX:e&&e.chartX,chartY:e&&e.chartY,point:b});u=this.getPlotLinePath(u)||null}if(!v(u)){this.hideCrosshair();return}k=this.categories&&!this.isRadial;l||(this.cross=l=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(k?"category ":"thin ")+c.className).attr({zIndex:w(c.zIndex,2)}).add(),this.chart.styledMode||(l.attr({stroke:c.color||(k?a("#ccd6eb").setOpacity(.25).get():
"#cccccc"),"stroke-width":w(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&l.attr({dashstyle:c.dashStyle})));l.show().attr({d:u});k&&!c.width&&l.attr({"stroke-width":this.transA});this.cross.e=e}else this.hideCrosshair();t(this,"afterDrawCrosshair",{e:e,point:b})},hideCrosshair:function(){this.cross&&this.cross.hide();t(this,"afterHideCrosshair")}});return d.Axis=g});K(y,"parts/DateTimeAxis.js",[y["parts/Globals.js"]],function(d){var g=d.Axis,M=d.getMagnitude,F=d.normalizeTickInterval,E=
d.timeUnits;g.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};g.prototype.normalizeTimeTickInterval=function(d,g){var v=g||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];g=v[v.length-1];var x=E[g[0]],B=g[1],p;for(p=0;p<v.length&&!(g=v[p],x=E[g[0]],B=g[1],v[p+1]&&d<=(x*B[B.length-1]+E[v[p+1][0]])/
2);p++);x===E.year&&d<5*x&&(B=[1,2,5]);d=F(d/x,B,"year"===g[0]?Math.max(M(d/x),1):1);return{unitRange:x,count:d,unitName:g[0]}}});K(y,"parts/LogarithmicAxis.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.pick;g=d.Axis;var F=d.getMagnitude,E=d.normalizeTickInterval;g.prototype.getLogTickPositions=function(d,g,v,C){var x=this.options,p=this.len,z=[];C||(this._minorAutoInterval=null);if(.5<=d)d=Math.round(d),z=this.getLinearTickPositions(d,g,v);else if(.08<=d){p=Math.floor(g);
var m,q;for(x=.3<d?[1,2,4]:.15<d?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];p<v+1&&!q;p++){var w=x.length;for(m=0;m<w&&!q;m++){var h=this.log2lin(this.lin2log(p)*x[m]);h>g&&(!C||f<=v)&&"undefined"!==typeof f&&z.push(f);f>v&&(q=!0);var f=h}}}else g=this.lin2log(g),v=this.lin2log(v),d=C?this.getMinorTickInterval():x.tickInterval,d=M("auto"===d?null:d,this._minorAutoInterval,x.tickPixelInterval/(C?5:1)*(v-g)/((C?p/this.tickPositions.length:p)||1)),d=E(d,null,F(d)),z=this.getLinearTickPositions(d,g,v).map(this.log2lin),
C||(this._minorAutoInterval=d/5);C||(this.tickInterval=d);return z};g.prototype.log2lin=function(d){return Math.log(d)/Math.LN10};g.prototype.lin2log=function(d){return Math.pow(10,d)}});K(y,"parts/PlotLineOrBand.js",[y["parts/Globals.js"],y["parts/Axis.js"],y["parts/Utilities.js"]],function(d,g,M){var F=M.arrayMax,E=M.arrayMin,D=M.defined,x=M.destroyObjectProperties,v=M.erase,C=M.extend,B=M.objectEach,p=M.pick,z=d.merge;d.PlotLineOrBand=function(d,g){this.axis=d;g&&(this.options=g,this.id=g.id)};
d.PlotLineOrBand.prototype={render:function(){d.fireEvent(this,"render");var g=this,q=g.axis,w=q.horiz,h=g.options,f=h.label,c=g.label,b=h.to,a=h.from,l=h.value,n=D(a)&&D(b),t=D(l),I=g.svgElem,r=!I,e=[],k=h.color,u=p(h.zIndex,0),H=h.events;e={"class":"highcharts-plot-"+(n?"band ":"line ")+(h.className||"")};var G={},A=q.chart.renderer,J=n?"bands":"lines";q.isLog&&(a=q.log2lin(a),b=q.log2lin(b),l=q.log2lin(l));q.chart.styledMode||(t?(e.stroke=k||"#999999",e["stroke-width"]=p(h.width,1),h.dashStyle&&
(e.dashstyle=h.dashStyle)):n&&(e.fill=k||"#e6ebf5",h.borderWidth&&(e.stroke=h.borderColor,e["stroke-width"]=h.borderWidth)));G.zIndex=u;J+="-"+u;(k=q.plotLinesAndBandsGroups[J])||(q.plotLinesAndBandsGroups[J]=k=A.g("plot-"+J).attr(G).add());r&&(g.svgElem=I=A.path().attr(e).add(k));if(t)e=q.getPlotLinePath({value:l,lineWidth:I.strokeWidth(),acrossPanes:h.acrossPanes});else if(n)e=q.getPlotBandPath(a,b,h);else return;(r||!I.d)&&e&&e.length?(I.attr({d:e}),H&&B(H,function(a,e){I.on(e,function(a){H[e].apply(g,
[a])})})):I&&(e?(I.show(!0),I.animate({d:e})):I.d&&(I.hide(),c&&(g.label=c=c.destroy())));f&&(D(f.text)||D(f.formatter))&&e&&e.length&&0<q.width&&0<q.height&&!e.isFlat?(f=z({align:w&&n&&"center",x:w?!n&&4:10,verticalAlign:!w&&n&&"middle",y:w?n?16:10:n?6:-4,rotation:w&&!n&&90},f),this.renderLabel(f,e,n,u)):c&&c.hide();return g},renderLabel:function(d,g,p,h){var f=this.label,c=this.axis.chart.renderer;f||(f={align:d.textAlign||d.align,rotation:d.rotation,"class":"highcharts-plot-"+(p?"band":"line")+
"-label "+(d.className||"")},f.zIndex=h,h=this.getLabelText(d),this.label=f=c.text(h,0,0,d.useHTML).attr(f).add(),this.axis.chart.styledMode||f.css(d.style));c=g.xBounds||[g[1],g[4],p?g[6]:g[1]];g=g.yBounds||[g[2],g[5],p?g[7]:g[2]];p=E(c);h=E(g);f.align(d,!1,{x:p,y:h,width:F(c)-p,height:F(g)-h});f.show(!0)},getLabelText:function(d){return D(d.formatter)?d.formatter.call(this):d.text},destroy:function(){v(this.axis.plotLinesAndBands,this);delete this.axis;x(this)}};C(g.prototype,{getPlotBandPath:function(d,
g){var m=this.getPlotLinePath({value:g,force:!0,acrossPanes:this.options.acrossPanes}),h=this.getPlotLinePath({value:d,force:!0,acrossPanes:this.options.acrossPanes}),f=[],c=this.horiz,b=1;d=d<this.min&&g<this.min||d>this.max&&g>this.max;if(h&&m){if(d){var a=h.toString()===m.toString();b=0}for(d=0;d<h.length;d+=6)c&&m[d+1]===h[d+1]?(m[d+1]+=b,m[d+4]+=b):c||m[d+2]!==h[d+2]||(m[d+2]+=b,m[d+5]+=b),f.push("M",h[d+1],h[d+2],"L",h[d+4],h[d+5],m[d+4],m[d+5],m[d+1],m[d+2],"z"),f.isFlat=a}return f},addPlotBand:function(d){return this.addPlotBandOrLine(d,
"plotBands")},addPlotLine:function(d){return this.addPlotBandOrLine(d,"plotLines")},addPlotBandOrLine:function(g,q){var m=(new d.PlotLineOrBand(this,g)).render(),h=this.userOptions;if(m){if(q){var f=h[q]||[];f.push(g);h[q]=f}this.plotLinesAndBands.push(m)}return m},removePlotBandOrLine:function(d){for(var g=this.plotLinesAndBands,m=this.options,h=this.userOptions,f=g.length;f--;)g[f].id===d&&g[f].destroy();[m.plotLines||[],h.plotLines||[],m.plotBands||[],h.plotBands||[]].forEach(function(c){for(f=
c.length;f--;)c[f].id===d&&v(c,c[f])})},removePlotBand:function(d){this.removePlotBandOrLine(d)},removePlotLine:function(d){this.removePlotBandOrLine(d)}})});K(y,"parts/Tooltip.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var M=g.clamp,F=g.defined,E=g.discardElement,D=g.extend,x=g.isNumber,v=g.isString,C=g.pick,B=g.splat,p=g.syncTimeout;"";var z=d.doc,m=d.format,q=d.merge,w=d.timeUnits;d.Tooltip=function(){this.init.apply(this,arguments)};d.Tooltip.prototype={init:function(d,
f){this.chart=d;this.options=f;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=f.split&&!d.inverted&&!d.polar;this.shared=f.shared||this.split;this.outside=C(f.outside,!(!d.scrollablePixelsX&&!d.scrollablePixelsY))},cleanSplit:function(d){this.chart.series.forEach(function(f){var c=f&&f.tt;c&&(!c.isActive||d?f.tt=c.destroy():c.isActive=!1)})},applyFilter:function(){var d=this.chart;d.renderer.definition({tagName:"filter",id:"drop-shadow-"+d.index,opacity:.5,children:[{tagName:"feGaussianBlur",
"in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode","in":"SourceGraphic"}]}]});d.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+d.index+"{filter:url(#drop-shadow-"+d.index+")}"})},getLabel:function(){var h=this,f=this.chart.renderer,c=this.chart.styledMode,b=this.options,a="tooltip"+(F(b.className)?
" "+b.className:""),l;if(!this.label){this.outside&&(this.container=l=d.doc.createElement("div"),l.className="highcharts-tooltip-container",d.css(l,{position:"absolute",top:"1px",pointerEvents:b.style&&b.style.pointerEvents,zIndex:3}),d.doc.body.appendChild(l),this.renderer=f=new d.Renderer(l,0,0,{},void 0,void 0,f.styledMode));this.split?this.label=f.g(a):(this.label=f.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,a).attr({padding:b.padding,r:b.borderRadius}),c||this.label.attr({fill:b.backgroundColor,
"stroke-width":b.borderWidth}).css(b.style).shadow(b.shadow));c&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index));if(h.outside&&!h.split){var n={x:this.label.xSetter,y:this.label.ySetter};this.label.xSetter=function(a,b){n[b].call(this.label,h.distance);l.style.left=a+"px"};this.label.ySetter=function(a,b){n[b].call(this.label,h.distance);l.style.top=a+"px"}}this.label.attr({zIndex:8}).add()}return this.label},update:function(d){this.destroy();q(!0,this.chart.options.tooltip.userOptions,
d);this.init(this.chart,q(!0,this.options,d))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),E(this.container));d.clearTimeout(this.hideTimer);d.clearTimeout(this.tooltipTimeout)},move:function(h,f,c,b){var a=this,l=a.now,n=!1!==a.options.animation&&!a.isHidden&&(1<Math.abs(h-l.x)||1<Math.abs(f-l.y)),t=a.followPointer||1<a.len;D(l,{x:n?(2*l.x+h)/
3:h,y:n?(l.y+f)/2:f,anchorX:t?void 0:n?(2*l.anchorX+c)/3:c,anchorY:t?void 0:n?(l.anchorY+b)/2:b});a.getLabel().attr(l);n&&(d.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){a&&a.move(h,f,c,b)},32))},hide:function(h){var f=this;d.clearTimeout(this.hideTimer);h=C(h,this.options.hideDelay,500);this.isHidden||(this.hideTimer=p(function(){f.getLabel()[h?"fadeOut":"hide"]();f.isHidden=!0},h))},getAnchor:function(d,f){var c=this.chart,b=c.pointer,a=c.inverted,l=c.plotTop,h=c.plotLeft,
t=0,g=0,r,e;d=B(d);this.followPointer&&f?("undefined"===typeof f.chartX&&(f=b.normalize(f)),d=[f.chartX-c.plotLeft,f.chartY-l]):d[0].tooltipPos?d=d[0].tooltipPos:(d.forEach(function(b){r=b.series.yAxis;e=b.series.xAxis;t+=b.plotX+(!a&&e?e.left-h:0);g+=(b.plotLow?(b.plotLow+b.plotHigh)/2:b.plotY)+(!a&&r?r.top-l:0)}),t/=d.length,g/=d.length,d=[a?c.plotWidth-g:t,this.shared&&!a&&1<d.length&&f?f.chartY-l:a?c.plotHeight-t:g]);return d.map(Math.round)},getPosition:function(d,f,c){var b=this.chart,a=this.distance,
l={},h=b.inverted&&c.h||0,t,g=this.outside,r=g?z.documentElement.clientWidth-2*a:b.chartWidth,e=g?Math.max(z.body.scrollHeight,z.documentElement.scrollHeight,z.body.offsetHeight,z.documentElement.offsetHeight,z.documentElement.clientHeight):b.chartHeight,k=b.pointer.getChartPosition(),u=b.containerScaling,H=function(a){return u?a*u.scaleX:a},G=function(a){return u?a*u.scaleY:a},A=function(l){var u="x"===l;return[l,u?r:e,u?d:f].concat(g?[u?H(d):G(f),u?k.left-a+H(c.plotX+b.plotLeft):k.top-a+G(c.plotY+
b.plotTop),0,u?r:e]:[u?d:f,u?c.plotX+b.plotLeft:c.plotY+b.plotTop,u?b.plotLeft:b.plotTop,u?b.plotLeft+b.plotWidth:b.plotTop+b.plotHeight])},m=A("y"),L=A("x"),q=!this.followPointer&&C(c.ttBelow,!b.inverted===!!c.negative),p=function(e,b,c,k,f,u,d){var t="y"===e?G(a):H(a),n=(c-k)/2,r=k<f-a,A=f+a+k<b,g=f-t-c+n;f=f+t-n;if(q&&A)l[e]=f;else if(!q&&r)l[e]=g;else if(r)l[e]=Math.min(d-k,0>g-h?g:g-h);else if(A)l[e]=Math.max(u,f+h+c>b?f:f+h);else return!1},v=function(e,b,c,k,f){var u;f<a||f>b-a?u=!1:l[e]=f<
c/2?1:f>b-k/2?b-k-2:f-c/2;return u},w=function(a){var e=m;m=L;L=e;t=a},x=function(){!1!==p.apply(0,m)?!1!==v.apply(0,L)||t||(w(!0),x()):t?l.x=l.y=0:(w(!0),x())};(b.inverted||1<this.len)&&w();x();return l},defaultFormatter:function(d){var f=this.points||B(this);var c=[d.tooltipFooterHeaderFormatter(f[0])];c=c.concat(d.bodyFormatter(f));c.push(d.tooltipFooterHeaderFormatter(f[0],!0));return c},refresh:function(h,f){var c=this.chart,b=this.options,a=h,l={},n=[],t=b.formatter||this.defaultFormatter;l=
this.shared;var g=c.styledMode;if(b.enabled){d.clearTimeout(this.hideTimer);this.followPointer=B(a)[0].series.tooltipOptions.followPointer;var r=this.getAnchor(a,f);f=r[0];var e=r[1];!l||a.series&&a.series.noSharedTooltip?l=a.getLabelConfig():(c.pointer.applyInactiveState(a),a.forEach(function(a){a.setState("hover");n.push(a.getLabelConfig())}),l={x:a[0].category,y:a[0].y},l.points=n,a=a[0]);this.len=n.length;c=t.call(l,this);t=a.series;this.distance=C(t.tooltipOptions.distance,16);!1===c?this.hide():
(this.split?this.renderSplit(c,B(h)):(h=this.getLabel(),b.style.width&&!g||h.css({width:this.chart.spacingBox.width}),h.attr({text:c&&c.join?c.join(""):c}),h.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+C(a.colorIndex,t.colorIndex)),g||h.attr({stroke:b.borderColor||a.color||t.color||"#666666"}),this.updatePosition({plotX:f,plotY:e,negative:a.negative,ttBelow:a.ttBelow,h:r[2]||0})),this.isHidden&&this.label&&this.label.attr({opacity:1}).show(),this.isHidden=!1);d.fireEvent(this,
"refresh")}},renderSplit:function(h,f){function c(a,e,b,c,k){void 0===k&&(k=!0);b?(e=B?0:y,a=M(a-c/2,N.left,N.right-c)):(e-=E,a=k?a-c-z:a+z,a=M(a,k?a:N.left,N.right));return{x:a,y:e}}var b=this,a=b.chart,l=b.chart,n=l.chartWidth,t=l.chartHeight,g=l.plotHeight,r=l.plotLeft,e=l.plotTop,k=l.plotWidth,u=l.pointer,H=l.renderer,G=l.scrollablePixelsX;G=void 0===G?0:G;var A=l.scrollablePixelsY,m=void 0===A?0:A;A=l.scrollingContainer;A=void 0===A?{scrollLeft:0,scrollTop:0}:A;var L=A.scrollLeft,q=A.scrollTop,
p=l.styledMode,z=b.distance,w=b.options,x=b.options.positioner,N={left:G?r:0,right:G?r+k-G:n,top:m?e:0,bottom:m?e+g-m:t},ba=b.getLabel(),B=!(!a.xAxis[0]||!a.xAxis[0].opposite),E=e,F=0,y=g-m;v(h)&&(h=[!1,h]);h=h.slice(0,f.length+1).reduce(function(a,k,l){if(!1!==k&&""!==k){l=f[l-1]||{isHeader:!0,plotX:f[0].plotX,plotY:g,series:{}};var u=l.isHeader,d=u?b:l.series,h=d.tt,t=l.isHeader;var n=l.series;var A="highcharts-color-"+C(l.colorIndex,n.colorIndex,"none");h||(h={padding:w.padding,r:w.borderRadius},
p||(h.fill=w.backgroundColor,h["stroke-width"]=w.borderWidth),h=H.label(null,null,null,w[t?"headerShape":"shape"]||"callout",null,null,w.useHTML).addClass(t?"highcharts-tooltip-header ":"highcharts-tooltip-box "+A).attr(h).add(ba));h.isActive=!0;h.attr({text:k});p||h.css(w.style).shadow(w.shadow).attr({stroke:w.borderColor||l.color||n.color||"#333333"});k=d.tt=h;t=k.getBBox();d=t.width+k.strokeWidth();u&&(F=t.height,y+=F,B&&(E-=F));n=l.plotX;n=void 0===n?0:n;A=l.plotY;A=void 0===A?0:A;var G=l.series;
l.isHeader?(n=r+n-L,A=e+(g-m)/2):(h=G.xAxis,G=G.yAxis,n=h.pos+M(n,-z,h.len+z)-L,A=G.pos+M(A,0,G.len)-q);n=M(n,N.left-z,N.right+z);A=M(A,N.top,N.bottom);t=t.height+1;h=x?x.call(b,d,t,l):c(n,A,u,d);a.push({align:x?0:void 0,anchorX:n,anchorY:A,boxWidth:d,point:l,rank:C(h.rank,u?1:0),size:t,target:h.y,tt:k,x:h.x})}return a},[]);!x&&h.some(function(a){return 0>a.x})&&(h=h.map(function(a){var e=c(a.anchorX,a.anchorY,a.point.isHeader,a.boxWidth,!1);return D(a,{target:e.y,x:e.x})}));b.cleanSplit();d.distribute(h,
y,void 0);h.forEach(function(a){var e=a.pos;a.tt.attr({visibility:"undefined"===typeof e?"hidden":"inherit",x:a.x,y:e+E,anchorX:a.anchorX,anchorY:a.anchorY})});h=b.container;a=b.renderer;b.outside&&h&&a&&(l=ba.getBBox(),a.setSize(l.width+l.x,l.height+l.y,!1),u=u.getChartPosition(),h.style.left=u.left+"px",h.style.top=u.top+"px")},updatePosition:function(h){var f=this.chart,c=f.pointer,b=this.getLabel(),a=h.plotX+f.plotLeft,l=h.plotY+f.plotTop;c=c.getChartPosition();h=(this.options.positioner||this.getPosition).call(this,
b.width,b.height,h);if(this.outside){var n=(this.options.borderWidth||0)+2*this.distance;this.renderer.setSize(b.width+n,b.height+n,!1);if(f=f.containerScaling)d.css(this.container,{transform:"scale("+f.scaleX+", "+f.scaleY+")"}),a*=f.scaleX,l*=f.scaleY;a+=c.left-h.x;l+=c.top-h.y}this.move(Math.round(h.x),Math.round(h.y||0),a,l)},getDateFormat:function(d,f,c,b){var a=this.chart.time,l=a.dateFormat("%m-%d %H:%M:%S.%L",f),h={millisecond:15,second:12,minute:9,hour:6,day:3},t="millisecond";for(g in w){if(d===
w.week&&+a.dateFormat("%w",f)===c&&"00:00:00.000"===l.substr(6)){var g="week";break}if(w[g]>d){g=t;break}if(h[g]&&l.substr(h[g])!=="01-01 00:00:00.000".substr(h[g]))break;"week"!==g&&(t=g)}if(g)var r=a.resolveDTLFormat(b[g]).main;return r},getXDateFormat:function(d,f,c){f=f.dateTimeLabelFormats;var b=c&&c.closestPointRange;return(b?this.getDateFormat(b,d.x,c.options.startOfWeek,f):f.day)||f.year},tooltipFooterHeaderFormatter:function(h,f){var c=f?"footer":"header",b=h.series,a=b.tooltipOptions,l=
a.xDateFormat,n=b.xAxis,t=n&&"datetime"===n.options.type&&x(h.key),g=a[c+"Format"];f={isFooter:f,labelConfig:h};d.fireEvent(this,"headerFormatter",f,function(c){t&&!l&&(l=this.getXDateFormat(h,a,n));t&&l&&(h.point&&h.point.tooltipDateKeys||["key"]).forEach(function(a){g=g.replace("{point."+a+"}","{point."+a+":"+l+"}")});b.chart.styledMode&&(g=this.styledModeFormat(g));c.text=m(g,{point:h,series:b},this.chart)});return f.text},bodyFormatter:function(d){return d.map(function(f){var c=f.series.tooltipOptions;
return(c[(f.point.formatPrefix||"point")+"Formatter"]||f.point.tooltipFormatter).call(f.point,c[(f.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(d){return d.replace('style="font-size: 10px"','class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex}"')}}});K(y,"parts/Pointer.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.attr,F=g.defined,E=g.extend,D=g.isNumber,x=g.isObject,v=g.objectEach,
C=g.offset,B=g.pick,p=g.splat,z=d.addEvent,m=d.charts,q=d.color,w=d.css,h=d.find,f=d.fireEvent,c=d.Tooltip;d.Pointer=function(b,a){this.init(b,a)};d.Pointer.prototype={init:function(b,a){this.options=a;this.chart=b;this.runChartClick=a.chart.events&&!!a.chart.events.click;this.pinchDown=[];this.lastValidTouch={};c&&(b.tooltip=new c(b,a.tooltip),this.followTouchMove=B(a.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(b){var a=this.chart,c=a.options.chart,f=c.zoomType||"";a=a.inverted;
/touch/.test(b.type)&&(f=B(c.pinchType,f));this.zoomX=b=/x/.test(f);this.zoomY=f=/y/.test(f);this.zoomHor=b&&!a||f&&a;this.zoomVert=f&&!a||b&&a;this.hasZoom=b||f},getChartPosition:function(){var b=this.chart;b=b.scrollingContainer||b.container;return this.chartPosition||(this.chartPosition=C(b))},normalize:function(b,a){var c=b.touches?b.touches.length?b.touches.item(0):b.changedTouches[0]:b;a||(a=this.getChartPosition());var f=c.pageX-a.left;a=c.pageY-a.top;if(c=this.chart.containerScaling)f/=c.scaleX,
a/=c.scaleY;return E(b,{chartX:Math.round(f),chartY:Math.round(a)})},getCoordinates:function(b){var a={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(c){a[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(b[c.horiz?"chartX":"chartY"])})});return a},findNearestKDPoint:function(b,a,c){var f;b.forEach(function(b){var l=!(b.noSharedTooltip&&a)&&0>b.options.findNearestPointBy.indexOf("y");b=b.searchPoint(c,l);if((l=x(b,!0))&&!(l=!x(f,!0))){l=f.distX-b.distX;var d=f.dist-b.dist,e=(b.series.group&&
b.series.group.zIndex)-(f.series.group&&f.series.group.zIndex);l=0<(0!==l&&a?l:0!==d?d:0!==e?e:f.series.index>b.series.index?-1:1)}l&&(f=b)});return f},getPointFromEvent:function(b){b=b.target;for(var a;b&&!a;)a=b.point,b=b.parentNode;return a},getChartCoordinatesFromPoint:function(b,a){var c=b.series,f=c.xAxis;c=c.yAxis;var d=B(b.clientX,b.plotX),h=b.shapeArgs;if(f&&c)return a?{chartX:f.len+f.pos-d,chartY:c.len+c.pos-b.plotY}:{chartX:d+f.pos,chartY:b.plotY+c.pos};if(h&&h.x&&h.y)return{chartX:h.x,
chartY:h.y}},getHoverData:function(b,a,c,f,d,g){var l,e=[];f=!(!f||!b);var k=a&&!a.stickyTracking?[a]:c.filter(function(a){return a.visible&&!(!d&&a.directTouch)&&B(a.options.enableMouseTracking,!0)&&a.stickyTracking});a=(l=f||!g?b:this.findNearestKDPoint(k,d,g))&&l.series;l&&(d&&!a.noSharedTooltip?(k=c.filter(function(a){return a.visible&&!(!d&&a.directTouch)&&B(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),k.forEach(function(a){var b=h(a.points,function(a){return a.x===l.x&&!a.isNull});
x(b)&&(a.chart.isBoosting&&(b=a.getPoint(b)),e.push(b))})):e.push(l));return{hoverPoint:l,hoverSeries:a,hoverPoints:e}},runPointActions:function(b,a){var c=this.chart,f=c.tooltip&&c.tooltip.options.enabled?c.tooltip:void 0,h=f?f.shared:!1,g=a||c.hoverPoint,r=g&&g.series||c.hoverSeries;r=this.getHoverData(g,r,c.series,(!b||"touchmove"!==b.type)&&(!!a||r&&r.directTouch&&this.isDirectTouch),h,b);g=r.hoverPoint;var e=r.hoverPoints;a=(r=r.hoverSeries)&&r.tooltipOptions.followPointer;h=h&&r&&!r.noSharedTooltip;
if(g&&(g!==c.hoverPoint||f&&f.isHidden)){(c.hoverPoints||[]).forEach(function(a){-1===e.indexOf(a)&&a.setState()});if(c.hoverSeries!==r)r.onMouseOver();this.applyInactiveState(e);(e||[]).forEach(function(a){a.setState("hover")});c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut");if(!g.series)return;g.firePointEvent("mouseOver");c.hoverPoints=e;c.hoverPoint=g;f&&f.refresh(h?e:g,b)}else a&&f&&!f.isHidden&&(g=f.getAnchor([{}],b),f.updatePosition({plotX:g[0],plotY:g[1]}));this.unDocMouseMove||(this.unDocMouseMove=
z(c.container.ownerDocument,"mousemove",function(a){var e=m[d.hoverChartIndex];if(e)e.pointer.onDocumentMouseMove(a)}));c.axes.forEach(function(a){var c=B(a.crosshair.snap,!0),k=c?d.find(e,function(e){return e.series[a.coll]===a}):void 0;k||!c?a.drawCrosshair(b,k):a.hideCrosshair()})},applyInactiveState:function(b){var a=[],c;(b||[]).forEach(function(b){c=b.series;a.push(c);c.linkedParent&&a.push(c.linkedParent);c.linkedSeries&&(a=a.concat(c.linkedSeries));c.navigatorSeries&&a.push(c.navigatorSeries)});
this.chart.series.forEach(function(b){-1===a.indexOf(b)?b.setState("inactive",!0):b.options.inactiveOtherPoints&&b.setAllPointsToState("inactive")})},reset:function(b,a){var c=this.chart,f=c.hoverSeries,d=c.hoverPoint,h=c.hoverPoints,r=c.tooltip,e=r&&r.shared?h:d;b&&e&&p(e).forEach(function(a){a.series.isCartesian&&"undefined"===typeof a.plotX&&(b=!1)});if(b)r&&e&&p(e).length&&(r.refresh(e),r.shared&&h?h.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,
a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):d&&(d.setState(d.state,!0),c.axes.forEach(function(a){a.crosshair&&d.series[a.coll]===a&&a.drawCrosshair(null,d)})));else{if(d)d.onMouseOut();h&&h.forEach(function(a){a.setState()});if(f)f.onMouseOut();r&&r.hide(a);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());c.axes.forEach(function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(b,a){var c=this.chart,f;c.series.forEach(function(d){f=
b||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(f),d.markerGroup&&(d.markerGroup.attr(f),d.markerGroup.clip(a?c.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(f))});c.clipRect.attr(a||c.clipBox)},dragStart:function(b){var a=this.chart;a.mouseIsDown=b.type;a.cancelClick=!1;a.mouseDownX=this.mouseDownX=b.chartX;a.mouseDownY=this.mouseDownY=b.chartY},drag:function(b){var a=this.chart,c=a.options.chart,f=b.chartX,d=b.chartY,h=this.zoomHor,r=this.zoomVert,e=a.plotLeft,
k=a.plotTop,u=a.plotWidth,g=a.plotHeight,G=this.selectionMarker,A=this.mouseDownX,m=this.mouseDownY,L=x(c.panning)?c.panning&&c.panning.enabled:c.panning,p=c.panKey&&b[c.panKey+"Key"];if(!G||!G.touch)if(f<e?f=e:f>e+u&&(f=e+u),d<k?d=k:d>k+g&&(d=k+g),this.hasDragged=Math.sqrt(Math.pow(A-f,2)+Math.pow(m-d,2)),10<this.hasDragged){var v=a.isInsidePlot(A-e,m-k);a.hasCartesianSeries&&(this.zoomX||this.zoomY)&&v&&!p&&!G&&(this.selectionMarker=G=a.renderer.rect(e,k,h?1:u,r?1:g,0).attr({"class":"highcharts-selection-marker",
zIndex:7}).add(),a.styledMode||G.attr({fill:c.selectionMarkerFill||q("#335cad").setOpacity(.25).get()}));G&&h&&(f-=A,G.attr({width:Math.abs(f),x:(0<f?0:f)+A}));G&&r&&(f=d-m,G.attr({height:Math.abs(f),y:(0<f?0:f)+m}));v&&!G&&L&&a.pan(b,c.panning)}},drop:function(b){var a=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var h={originalEvent:b,xAxis:[],yAxis:[]},g=this.selectionMarker,r=g.attr?g.attr("x"):g.x,e=g.attr?g.attr("y"):g.y,k=g.attr?g.attr("width"):g.width,u=g.attr?g.attr("height"):
g.height,H;if(this.hasDragged||d)c.axes.forEach(function(c){if(c.zoomEnabled&&F(c.min)&&(d||a[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,l="touchend"===b.type?c.minPixelPadding:0,t=c.toValue((f?r:e)+l);f=c.toValue((f?r+k:e+u)-l);h[c.coll].push({axis:c,min:Math.min(t,f),max:Math.max(t,f)});H=!0}}),H&&f(c,"selection",h,function(a){c.zoom(E(a,d?{animation:!1}:null))});D(c.index)&&(this.selectionMarker=this.selectionMarker.destroy());d&&this.scaleGroups()}c&&D(c.index)&&(w(c.container,{cursor:c._cursor}),
c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(b){b=this.normalize(b);2!==b.button&&(this.zoomOption(b),b.preventDefault&&b.preventDefault(),this.dragStart(b))},onDocumentMouseUp:function(b){m[d.hoverChartIndex]&&m[d.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(b){var a=this.chart,c=this.chartPosition;b=this.normalize(b,c);!c||this.inClass(b.target,"highcharts-tracker")||a.isInsidePlot(b.chartX-
a.plotLeft,b.chartY-a.plotTop)||this.reset()},onContainerMouseLeave:function(b){var a=m[d.hoverChartIndex];a&&(b.relatedTarget||b.toElement)&&(a.pointer.reset(),a.pointer.chartPosition=void 0)},onContainerMouseMove:function(b){var a=this.chart;F(d.hoverChartIndex)&&m[d.hoverChartIndex]&&m[d.hoverChartIndex].mouseIsDown||(d.hoverChartIndex=a.index);b=this.normalize(b);b.preventDefault||(b.returnValue=!1);"mousedown"===a.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!a.isInsidePlot(b.chartX-
a.plotLeft,b.chartY-a.plotTop)||a.openMenu||this.runPointActions(b)},inClass:function(b,a){for(var c;b;){if(c=y(b,"class")){if(-1!==c.indexOf(a))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}b=b.parentNode}},onTrackerMouseOut:function(b){var a=this.chart.hoverSeries;b=b.relatedTarget||b.toElement;this.isDirectTouch=!1;if(!(!a||!b||a.stickyTracking||this.inClass(b,"highcharts-tooltip")||this.inClass(b,"highcharts-series-"+a.index)&&this.inClass(b,"highcharts-tracker")))a.onMouseOut()},
onContainerClick:function(b){var a=this.chart,c=a.hoverPoint,d=a.plotLeft,h=a.plotTop;b=this.normalize(b);a.cancelClick||(c&&this.inClass(b.target,"highcharts-tracker")?(f(c.series,"click",E(b,{point:c})),a.hoverPoint&&c.firePointEvent("click",b)):(E(b,this.getCoordinates(b)),a.isInsidePlot(b.chartX-d,b.chartY-h)&&f(a,"click",b)))},setDOMEvents:function(){var b=this,a=b.chart.container,c=a.ownerDocument;a.onmousedown=function(a){b.onContainerMouseDown(a)};a.onmousemove=function(a){b.onContainerMouseMove(a)};
a.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=z(a,"mouseleave",b.onContainerMouseLeave);d.unbindDocumentMouseUp||(d.unbindDocumentMouseUp=z(c,"mouseup",b.onDocumentMouseUp));d.hasTouch&&(z(a,"touchstart",function(a){b.onContainerTouchStart(a)}),z(a,"touchmove",function(a){b.onContainerTouchMove(a)}),d.unbindDocumentTouchEnd||(d.unbindDocumentTouchEnd=z(c,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();
d.chartCount||(d.unbindDocumentMouseUp&&(d.unbindDocumentMouseUp=d.unbindDocumentMouseUp()),d.unbindDocumentTouchEnd&&(d.unbindDocumentTouchEnd=d.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);v(b,function(a,c){b[c]=null})}}});K(y,"parts/TouchPointer.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.extend,F=g.pick,E=d.charts,D=d.noop;y(d.Pointer.prototype,{pinchTranslate:function(d,g,C,B,p,z){this.zoomHor&&this.pinchTranslateDirection(!0,d,g,C,B,p,z);this.zoomVert&&
this.pinchTranslateDirection(!1,d,g,C,B,p,z)},pinchTranslateDirection:function(d,g,C,B,p,z,m,q){var v=this.chart,h=d?"x":"y",f=d?"X":"Y",c="chart"+f,b=d?"width":"height",a=v["plot"+(d?"Left":"Top")],l,n,t=q||1,I=v.inverted,r=v.bounds[d?"h":"v"],e=1===g.length,k=g[0][c],u=C[0][c],H=!e&&g[1][c],G=!e&&C[1][c];C=function(){!e&&20<Math.abs(k-H)&&(t=q||Math.abs(u-G)/Math.abs(k-H));n=(a-u)/t+k;l=v["plot"+(d?"Width":"Height")]/t};C();g=n;if(g<r.min){g=r.min;var A=!0}else g+l>r.max&&(g=r.max-l,A=!0);A?(u-=
.8*(u-m[h][0]),e||(G-=.8*(G-m[h][1])),C()):m[h]=[u,G];I||(z[h]=n-a,z[b]=l);z=I?1/t:t;p[b]=l;p[h]=g;B[I?d?"scaleY":"scaleX":"scale"+f]=t;B["translate"+f]=z*a+(u-z*k)},pinch:function(d){var g=this,x=g.chart,B=g.pinchDown,p=d.touches,z=p.length,m=g.lastValidTouch,q=g.hasZoom,w=g.selectionMarker,h={},f=1===z&&(g.inClass(d.target,"highcharts-tracker")&&x.runTrackerClick||g.runChartClick),c={};1<z&&(g.initiated=!0);q&&g.initiated&&!f&&d.preventDefault();[].map.call(p,function(b){return g.normalize(b)});
"touchstart"===d.type?([].forEach.call(p,function(b,a){B[a]={chartX:b.chartX,chartY:b.chartY}}),m.x=[B[0].chartX,B[1]&&B[1].chartX],m.y=[B[0].chartY,B[1]&&B[1].chartY],x.axes.forEach(function(b){if(b.zoomEnabled){var a=x.bounds[b.horiz?"h":"v"],c=b.minPixelPadding,f=b.toPixels(Math.min(F(b.options.min,b.dataMin),b.dataMin)),d=b.toPixels(Math.max(F(b.options.max,b.dataMax),b.dataMax)),h=Math.max(f,d);a.min=Math.min(b.pos,Math.min(f,d)-c);a.max=Math.max(b.pos+b.len,h+c)}}),g.res=!0):g.followTouchMove&&
1===z?this.runPointActions(g.normalize(d)):B.length&&(w||(g.selectionMarker=w=y({destroy:D,touch:!0},x.plotBox)),g.pinchTranslate(B,p,h,w,c,m),g.hasPinched=q,g.scaleGroups(h,c),g.res&&(g.res=!1,this.reset(!1,0)))},touch:function(g,v){var x=this.chart,B;if(x.index!==d.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});d.hoverChartIndex=x.index;if(1===g.touches.length)if(g=this.normalize(g),(B=x.isInsidePlot(g.chartX-x.plotLeft,g.chartY-x.plotTop))&&!x.openMenu){v&&this.runPointActions(g);
if("touchmove"===g.type){v=this.pinchDown;var p=v[0]?4<=Math.sqrt(Math.pow(v[0].chartX-g.chartX,2)+Math.pow(v[0].chartY-g.chartY,2)):!1}F(p,!0)&&this.pinch(g)}else v&&this.reset();else 2===g.touches.length&&this.pinch(g)},onContainerTouchStart:function(d){this.zoomOption(d);this.touch(d,!0)},onContainerTouchMove:function(d){this.touch(d)},onDocumentTouchEnd:function(g){E[d.hoverChartIndex]&&E[d.hoverChartIndex].pointer.drop(g)}})});K(y,"parts/MSPointer.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],
function(d,g){var y=g.extend,F=g.objectEach;g=g.wrap;var E=d.addEvent,D=d.charts,x=d.css,v=d.doc,C=d.noop,B=d.Pointer,p=d.removeEvent,z=d.win;if(!d.hasTouch&&(z.PointerEvent||z.MSPointerEvent)){var m={},q=!!z.PointerEvent,w=function(){var f=[];f.item=function(c){return this[c]};F(m,function(c){f.push({pageX:c.pageX,pageY:c.pageY,target:c.target})});return f},h=function(f,c,b,a){"touch"!==f.pointerType&&f.pointerType!==f.MSPOINTER_TYPE_TOUCH||!D[d.hoverChartIndex]||(a(f),a=D[d.hoverChartIndex].pointer,
a[c]({type:b,target:f.currentTarget,preventDefault:C,touches:w()}))};y(B.prototype,{onContainerPointerDown:function(f){h(f,"onContainerTouchStart","touchstart",function(c){m[c.pointerId]={pageX:c.pageX,pageY:c.pageY,target:c.currentTarget}})},onContainerPointerMove:function(f){h(f,"onContainerTouchMove","touchmove",function(c){m[c.pointerId]={pageX:c.pageX,pageY:c.pageY};m[c.pointerId].target||(m[c.pointerId].target=c.currentTarget)})},onDocumentPointerUp:function(f){h(f,"onDocumentTouchEnd","touchend",
function(c){delete m[c.pointerId]})},batchMSEvents:function(f){f(this.chart.container,q?"pointerdown":"MSPointerDown",this.onContainerPointerDown);f(this.chart.container,q?"pointermove":"MSPointerMove",this.onContainerPointerMove);f(v,q?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});g(B.prototype,"init",function(f,c,b){f.call(this,c,b);this.hasZoom&&x(c.container,{"-ms-touch-action":"none","touch-action":"none"})});g(B.prototype,"setDOMEvents",function(f){f.apply(this);(this.hasZoom||this.followTouchMove)&&
this.batchMSEvents(E)});g(B.prototype,"destroy",function(f){this.batchMSEvents(p);f.call(this)})}});K(y,"parts/Legend.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.defined,F=g.discardElement,E=g.isNumber,D=g.pick,x=g.relativeLength,v=g.setAnimation,C=g.syncTimeout;g=g.wrap;var B=d.addEvent,p=d.css,z=d.fireEvent,m=d.isFirefox,q=d.marginNames,w=d.merge,h=d.stableSort,f=d.win;d.Legend=function(c,b){this.init(c,b)};d.Legend.prototype={init:function(c,b){this.chart=c;this.setOptions(b);
b.enabled&&(this.render(),B(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=B(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(c){var b=D(c.padding,8);this.options=c;this.chart.styledMode||(this.itemStyle=c.itemStyle,this.itemHiddenStyle=w(this.itemStyle,c.itemHiddenStyle));this.itemMarginTop=c.itemMarginTop||0;this.itemMarginBottom=c.itemMarginBottom||
0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=D(c.symbolWidth,16);this.pages=[];this.proximate="proximate"===c.layout&&!this.chart.inverted},update:function(c,b){var a=this.chart;this.setOptions(w(!0,this.options,c));this.destroy();a.isDirtyLegend=a.isDirtyBox=!0;D(b,!0)&&a.redraw();z(this,"afterUpdate")},colorizeItem:function(c,b){c.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var a=this.options,f=c.legendItem,d=c.legendLine,h=c.legendSymbol,
g=this.itemHiddenStyle.color;a=b?a.itemStyle.color:g;var r=b?c.color||g:g,e=c.options&&c.options.marker,k={fill:r};f&&f.css({fill:a,color:a});d&&d.attr({stroke:r});h&&(e&&h.isMarker&&(k=c.pointAttribs(),b||(k.stroke=k.fill=g)),h.attr(k))}z(this,"afterColorizeItem",{item:c,visible:b})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(c){var b=this.options,a=b.symbolPadding;b=!b.rtl;var f=c._legendItemPos,
d=f[0];f=f[1];var h=c.checkbox;if((c=c.legendGroup)&&c.element)c[y(c.translateY)?"animate":"attr"]({translateX:b?d:this.legendWidth-d-2*a-4,translateY:f});h&&(h.x=d,h.y=f)},destroyItem:function(c){var b=c.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(a){c[a]&&(c[a]=c[a].destroy())});b&&F(c.checkbox)},destroy:function(){function c(b){this[b]&&(this[b]=this[b].destroy())}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(c,b)});"clipRect up down pager nav box title group".split(" ").forEach(c,
this);this.display=null},positionCheckboxes:function(){var c=this.group&&this.group.alignAttr,b=this.clipHeight||this.legendHeight,a=this.titleHeight;if(c){var f=c.translateY;this.allItems.forEach(function(d){var l=d.checkbox;if(l){var h=f+a+l.y+(this.scrollOffset||0)+3;p(l,{left:c.translateX+d.checkboxOffset+l.x-20+"px",top:h+"px",display:this.proximate||h>f-6&&h<f+b-6?"":"none"})}},this)}},renderTitle:function(){var c=this.options,b=this.padding,a=c.title,f=0;a.text&&(this.title||(this.title=this.chart.renderer.label(a.text,
b-3,b-4,null,null,null,c.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(a.style),this.title.add(this.group)),a.width||this.title.css({width:this.maxLegendWidth+"px"}),c=this.title.getBBox(),f=c.height,this.offsetWidth=c.width,this.contentGroup.attr({translateY:f}));this.titleHeight=f},setText:function(c){var b=this.options;c.legendItem.attr({text:b.labelFormat?d.format(b.labelFormat,c,this.chart):b.labelFormatter.call(c)})},renderItem:function(c){var b=this.chart,
a=b.renderer,f=this.options,d=this.symbolWidth,h=f.symbolPadding,g=this.itemStyle,r=this.itemHiddenStyle,e="horizontal"===f.layout?D(f.itemDistance,20):0,k=!f.rtl,u=c.legendItem,H=!c.series,G=!H&&c.series.drawLegendSymbol?c.series:c,A=G.options;A=this.createCheckboxForItem&&A&&A.showCheckbox;e=d+h+e+(A?20:0);var m=f.useHTML,L=c.options.className;u||(c.legendGroup=a.g("legend-item").addClass("highcharts-"+G.type+"-series highcharts-color-"+c.colorIndex+(L?" "+L:"")+(H?" highcharts-series-"+c.index:
"")).attr({zIndex:1}).add(this.scrollGroup),c.legendItem=u=a.text("",k?d+h:-h,this.baseline||0,m),b.styledMode||u.css(w(c.visible?g:r)),u.attr({align:k?"left":"right",zIndex:2}).add(c.legendGroup),this.baseline||(this.fontMetrics=a.fontMetrics(b.styledMode?12:g.fontSize,u),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,u.attr("y",this.baseline)),this.symbolHeight=f.symbolHeight||this.fontMetrics.f,G.drawLegendSymbol(this,c),this.setItemEvents&&this.setItemEvents(c,u,m));A&&!c.checkbox&&this.createCheckboxForItem(c);
this.colorizeItem(c,c.visible);!b.styledMode&&g.width||u.css({width:(f.itemWidth||this.widthOption||b.spacingBox.width)-e});this.setText(c);b=u.getBBox();c.itemWidth=c.checkboxOffset=f.itemWidth||c.legendItemWidth||b.width+e;this.maxItemWidth=Math.max(this.maxItemWidth,c.itemWidth);this.totalItemWidth+=c.itemWidth;this.itemHeight=c.itemHeight=Math.round(c.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(c){var b=this.options,a=this.padding,f="horizontal"===b.layout,d=c.itemHeight,
h=this.itemMarginBottom,g=this.itemMarginTop,r=f?D(b.itemDistance,20):0,e=this.maxLegendWidth;b=b.alignColumns&&this.totalItemWidth>e?this.maxItemWidth:c.itemWidth;f&&this.itemX-a+b>e&&(this.itemX=a,this.lastLineHeight&&(this.itemY+=g+this.lastLineHeight+h),this.lastLineHeight=0);this.lastItemY=g+this.itemY+h;this.lastLineHeight=Math.max(d,this.lastLineHeight);c._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=b:(this.itemY+=g+d+h,this.lastLineHeight=d);this.offsetWidth=this.widthOption||Math.max((f?
this.itemX-a-(c.checkbox?0:r):b)+a,this.offsetWidth)},getAllItems:function(){var c=[];this.chart.series.forEach(function(b){var a=b&&b.options;b&&D(a.showInLegend,y(a.linkedTo)?!1:void 0,!0)&&(c=c.concat(b.legendItems||("point"===a.legendType?b.data:b)))});z(this,"afterGetAllItems",{allItems:c});return c},getAlignment:function(){var c=this.options;return this.proximate?c.align.charAt(0)+"tv":c.floating?"":c.align.charAt(0)+c.verticalAlign.charAt(0)+c.layout.charAt(0)},adjustMargins:function(c,b){var a=
this.chart,f=this.options,d=this.getAlignment();d&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(l,h){l.test(d)&&!y(c[h])&&(a[q[h]]=Math.max(a[q[h]],a.legend[(h+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][h]*f[h%2?"x":"y"]+D(f.margin,12)+b[h]+(a.titleOffset[h]||0)))})},proximatePositions:function(){var c=this.chart,b=[],a="left"===this.options.align;this.allItems.forEach(function(f){var l=a;if(f.yAxis&&f.points){f.xAxis.options.reversed&&(l=!l);var h=d.find(l?f.points:
f.points.slice(0).reverse(),function(a){return E(a.plotY)});l=this.itemMarginTop+f.legendItem.getBBox().height+this.itemMarginBottom;var g=f.yAxis.top-c.plotTop;f.visible?(h=h?h.plotY:f.yAxis.height,h+=g-.3*l):h=g+f.yAxis.height;b.push({target:h,size:l,item:f})}},this);d.distribute(b,c.plotHeight);b.forEach(function(a){a.item._legendItemPos[1]=c.plotTop-c.spacing[0]+a.pos})},render:function(){var c=this.chart,b=c.renderer,a=this.group,f,d=this.box,g=this.options,m=this.padding;this.itemX=m;this.itemY=
this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=x(g.width,c.spacingBox.width-m);var r=c.spacingBox.width-2*m-g.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(r/=2);this.maxLegendWidth=this.widthOption||r;a||(this.group=a=b.g("legend").attr({zIndex:7}).add(),this.contentGroup=b.g().attr({zIndex:1}).add(a),this.scrollGroup=b.g().add(this.contentGroup));this.renderTitle();r=this.getAllItems();h(r,function(a,e){return(a.options&&a.options.legendIndex||0)-(e.options&&
e.options.legendIndex||0)});g.reversed&&r.reverse();this.allItems=r;this.display=f=!!r.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;r.forEach(this.renderItem,this);r.forEach(this.layoutItem,this);r=(this.widthOption||this.offsetWidth)+m;var e=this.lastItemY+this.lastLineHeight+this.titleHeight;e=this.handleOverflow(e);e+=m;d||(this.box=d=b.rect().addClass("highcharts-legend-box").attr({r:g.borderRadius}).add(a),d.isNew=!0);c.styledMode||d.attr({stroke:g.borderColor,
"stroke-width":g.borderWidth||0,fill:g.backgroundColor||"none"}).shadow(g.shadow);0<r&&0<e&&(d[d.isNew?"attr":"animate"](d.crisp.call({},{x:0,y:0,width:r,height:e},d.strokeWidth())),d.isNew=!1);d[f?"show":"hide"]();c.styledMode&&"none"===a.getStyle("display")&&(r=e=0);this.legendWidth=r;this.legendHeight=e;f&&(b=c.spacingBox,d=b.y,/(lth|ct|rth)/.test(this.getAlignment())&&0<c.titleOffset[0]?d+=c.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&0<c.titleOffset[2]&&(d-=c.titleOffset[2]),d!==
b.y&&(b=w(b,{y:d})),a.align(w(g,{width:r,height:e,verticalAlign:this.proximate?"top":g.verticalAlign}),!0,b));this.proximate||this.positionItems();z(this,"afterRender")},handleOverflow:function(c){var b=this,a=this.chart,f=a.renderer,d=this.options,h=d.y,g=this.padding;h=a.spacingBox.height+("top"===d.verticalAlign?-h:h)-g;var r=d.maxHeight,e,k=this.clipRect,u=d.navigation,H=D(u.animation,!0),G=u.arrowSize||12,A=this.nav,m=this.pages,L,q=this.allItems,p=function(a){"number"===typeof a?k.attr({height:a}):
k&&(b.clipRect=k.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+g+"px,9999px,"+(g+a)+"px,0)":"auto")},z=function(e){b[e]=f.circle(0,0,1.3*G).translate(G/2,G/2).add(A);a.styledMode||b[e].attr("fill","rgba(0,0,0,0.0001)");return b[e]};"horizontal"!==d.layout||"middle"===d.verticalAlign||d.floating||(h/=2);r&&(h=Math.min(h,r));m.length=0;c>h&&!1!==u.enabled?(this.clipHeight=e=Math.max(h-20-this.titleHeight-g,0),this.currentPage=D(this.currentPage,1),this.fullHeight=
c,q.forEach(function(a,b){var c=a._legendItemPos[1],k=Math.round(a.legendItem.getBBox().height),f=m.length;if(!f||c-m[f-1]>e&&(L||c)!==m[f-1])m.push(L||c),f++;a.pageIx=f-1;L&&(q[b-1].pageIx=f-1);b===q.length-1&&c+k-m[f-1]>e&&c!==L&&(m.push(c),a.pageIx=f);c!==L&&(L=c)}),k||(k=b.clipRect=f.clipRect(0,g,9999,0),b.contentGroup.clip(k)),p(e),A||(this.nav=A=f.g().attr({zIndex:1}).add(this.group),this.up=f.symbol("triangle",0,0,G,G).add(A),z("upTracker").on("click",function(){b.scroll(-1,H)}),this.pager=
f.text("",15,10).addClass("highcharts-legend-navigation"),a.styledMode||this.pager.css(u.style),this.pager.add(A),this.down=f.symbol("triangle-down",0,0,G,G).add(A),z("downTracker").on("click",function(){b.scroll(1,H)})),b.scroll(0),c=h):A&&(p(),this.nav=A.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return c},scroll:function(c,b){var a=this,f=this.chart,h=this.pages,g=h.length,m=this.currentPage+c;c=this.clipHeight;var r=this.options.navigation,e=this.pager,k=this.padding;m>
g&&(m=g);0<m&&("undefined"!==typeof b&&v(b,f),this.nav.attr({translateX:k,translateY:c+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===m?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),e.attr({text:m+"/"+g}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":m===g?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),f.styledMode||(this.up.attr({fill:1===
m?r.inactiveColor:r.activeColor}),this.upTracker.css({cursor:1===m?"default":"pointer"}),this.down.attr({fill:m===g?r.inactiveColor:r.activeColor}),this.downTracker.css({cursor:m===g?"default":"pointer"})),this.scrollOffset=-h[m-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=m,this.positionCheckboxes(),b=d.animObject(D(b,f.renderer.globalAnimation,!0)),C(function(){z(a,"afterScroll",{currentPage:m})},b.duration||0))}};d.LegendSymbolMixin={drawRectangle:function(c,
b){var a=c.symbolHeight,f=c.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(f?(c.symbolWidth-a)/2:0,c.baseline-a+1,f?a:c.symbolWidth,a,D(c.options.symbolRadius,a/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(c){var b=this.options,a=b.marker,f=c.symbolWidth,d=c.symbolHeight,h=d/2,g=this.chart.renderer,r=this.legendGroup;c=c.baseline-Math.round(.3*c.fontMetrics.b);var e={};this.chart.styledMode||(e={"stroke-width":b.lineWidth||0},b.dashStyle&&
(e.dashstyle=b.dashStyle));this.legendLine=g.path(["M",0,c,"L",f,c]).addClass("highcharts-graph").attr(e).add(r);a&&!1!==a.enabled&&f&&(b=Math.min(D(a.radius,h),h),0===this.symbol.indexOf("url")&&(a=w(a,{width:d,height:d}),b=0),this.legendSymbol=a=g.symbol(this.symbol,f/2-b,c-b,2*b,2*b,a).addClass("highcharts-point").add(r),a.isMarker=!0)}};(/Trident\/7\.0/.test(f.navigator&&f.navigator.userAgent)||m)&&g(d.Legend.prototype,"positionItem",function(c,b){var a=this,f=function(){b._legendItemPos&&c.call(a,
b)};f();a.bubbleLegend||setTimeout(f)})});K(y,"parts/Chart.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.animObject,F=g.attr,E=g.defined,D=g.discardElement,x=g.erase,v=g.extend,C=g.isArray,B=g.isNumber,p=g.isObject,z=g.isString,m=g.numberFormat,q=g.objectEach,w=g.pick,h=g.pInt,f=g.relativeLength,c=g.setAnimation,b=g.splat,a=g.syncTimeout,l=d.addEvent,n=d.animate,t=d.doc,I=d.Axis,r=d.createElement,e=d.defaultOptions,k=d.charts,u=d.css,H=d.find,G=d.fireEvent,A=d.Legend,J=
d.marginNames,L=d.merge,Q=d.Pointer,V=d.removeEvent,U=d.seriesTypes,P=d.win,O=d.Chart=function(){this.getArgs.apply(this,arguments)};d.chart=function(a,e,b){return new O(a,e,b)};v(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(z(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(a,b){var c,f=a.series,u=a.plotOptions||{};G(this,"init",{args:arguments},function(){a.series=null;c=L(e,a);q(c.plotOptions,function(a,e){p(a)&&(a.tooltip=u[e]&&
L(u[e].tooltip)||void 0)});c.tooltip.userOptions=a.chart&&a.chart.forExport&&a.tooltip.userOptions||a.tooltip;c.series=a.series=f;this.userOptions=a;var h=c.chart,g=h.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.time=a.time&&Object.keys(a.time).length?new d.Time(a.time):d.time;this.numberFormatter=h.numberFormatter||m;this.styledMode=h.styledMode;this.hasCartesianSeries=h.showAxes;
var r=this;r.index=k.length;k.push(r);d.chartCount++;g&&q(g,function(a,e){d.isFunction(a)&&l(r,e,a)});r.xAxis=[];r.yAxis=[];r.pointCount=r.colorCounter=r.symbolCounter=0;G(r,"afterInit");r.firstRender()})},initSeries:function(a){var e=this.options.chart;e=a.type||e.type||e.defaultSeriesType;var b=U[e];b||d.error(17,!0,this,{missingModuleFor:e});e=new b;e.init(this,a);return e},setSeriesData:function(){this.getSeriesOrderByLinks().forEach(function(a){a.points||a.data||!a.enabledDataSorting||a.setData(a.options.data,
!1)})},getSeriesOrderByLinks:function(){return this.series.concat().sort(function(a,e){return a.linkedSeries.length||e.linkedSeries.length?e.linkedSeries.length-a.linkedSeries.length:0})},orderSeries:function(a){var e=this.series;for(a=a||0;a<e.length;a++)e[a]&&(e[a].index=a,e[a].name=e[a].getName())},isInsidePlot:function(a,e,b){var c=b?e:a;a=b?a:e;return 0<=c&&c<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(a){G(this,"beforeRedraw");var e=this.axes,b=this.series,k=this.pointer,f=this.legend,
d=this.userOptions.legend,u=this.isDirtyLegend,l=this.hasCartesianSeries,h=this.isDirtyBox,g=this.renderer,r=g.isHidden(),A=[];this.setResponsive&&this.setResponsive(!1);c(a,this);r&&this.temporaryDisplay();this.layOutTitles();for(a=b.length;a--;){var H=b[a];if(H.options.stacking){var t=!0;if(H.isDirty){var n=!0;break}}}if(n)for(a=b.length;a--;)H=b[a],H.options.stacking&&(H.isDirty=!0);b.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),u=!0):d&&(d.labelFormatter||
d.labelFormat)&&(u=!0));a.isDirtyData&&G(a,"updatedData")});u&&f&&f.options.enabled&&(f.render(),this.isDirtyLegend=!1);t&&this.getStacks();l&&e.forEach(function(a){a.updateNames();a.setScale()});this.getMargins();l&&(e.forEach(function(a){a.isDirty&&(h=!0)}),e.forEach(function(a){var e=a.min+","+a.max;a.extKey!==e&&(a.extKey=e,A.push(function(){G(a,"afterSetExtremes",v(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(h||t)&&a.redraw()}));h&&this.drawChartBox();G(this,"predraw");b.forEach(function(a){(h||
a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});k&&k.reset(!0);g.draw();G(this,"redraw");G(this,"render");r&&this.temporaryDisplay(!0);A.forEach(function(a){a.call()})},get:function(a){function e(e){return e.id===a||e.options&&e.options.id===a}var b=this.series,c;var k=H(this.axes,e)||H(this.series,e);for(c=0;!k&&c<b.length;c++)k=H(b[c].points||[],e);return k},getAxes:function(){var a=this,e=this.options,c=e.xAxis=b(e.xAxis||{});e=e.yAxis=b(e.yAxis||{});G(this,"getAxes");c.forEach(function(a,
e){a.index=e;a.isX=!0});e.forEach(function(a,e){a.index=e});c.concat(e).forEach(function(e){new I(a,e)});G(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(e){a=a.concat((e[e.hasGroupedData?"points":"data"]||[]).filter(function(a){return w(a.selectedStaging,a.selected)}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,e,b){this.applyDescription("title",a);this.applyDescription("subtitle",
e);this.applyDescription("caption",void 0);this.layOutTitles(b)},applyDescription:function(a,e){var b=this,c="title"===a?{color:"#333333",fontSize:this.options.isStock?"16px":"18px"}:{color:"#666666"};c=this.options[a]=L(!this.styledMode&&{style:c},this.options[a],e);var k=this[a];k&&e&&(this[a]=k=k.destroy());c&&!k&&(k=this.renderer.text(c.text,0,0,c.useHTML).attr({align:c.align,"class":"highcharts-"+a,zIndex:c.zIndex||4}).add(),k.update=function(e){b[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[a]](e)},
this.styledMode||k.css(c.style),this[a]=k)},layOutTitles:function(a){var e=[0,0,0],b=this.renderer,c=this.spacingBox;["title","subtitle","caption"].forEach(function(a){var k=this[a],f=this.options[a],d=f.verticalAlign||"top";a="title"===a?-3:"top"===d?e[0]+2:0;if(k){if(!this.styledMode)var u=f.style.fontSize;u=b.fontMetrics(u,k).b;k.css({width:(f.width||c.width+(f.widthAdjust||0))+"px"});var l=Math.round(k.getBBox(f.useHTML).height);k.align(v({y:"bottom"===d?u:a+u,height:l},f),!1,"spacingBox");f.floating||
("top"===d?e[0]=Math.ceil(e[0]+l):"bottom"===d&&(e[2]=Math.ceil(e[2]+l)))}},this);e[0]&&"top"===(this.options.title.verticalAlign||"top")&&(e[0]+=this.options.title.margin);e[2]&&"bottom"===this.options.caption.verticalAlign&&(e[2]+=this.options.caption.margin);var k=!this.titleOffset||this.titleOffset.join(",")!==e.join(",");this.titleOffset=e;G(this,"afterLayOutTitles");!this.isDirtyBox&&k&&(this.isDirtyBox=this.isDirtyLegend=k,this.hasRendered&&w(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=
this.options.chart,e=a.width;a=a.height;var b=this.renderTo;E(e)||(this.containerWidth=d.getStyle(b,"width"));E(a)||(this.containerHeight=d.getStyle(b,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||600);this.chartHeight=Math.max(0,f(a,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(a){var e=this.renderTo;if(a)for(;e&&e.style;)e.hcOrigStyle&&(d.css(e,e.hcOrigStyle),delete e.hcOrigStyle),e.hcOrigDetached&&(t.body.removeChild(e),e.hcOrigDetached=
!1),e=e.parentNode;else for(;e&&e.style;){t.body.contains(e)||e.parentNode||(e.hcOrigDetached=!0,t.body.appendChild(e));if("none"===d.getStyle(e,"display",!1)||e.hcOricDetached)e.hcOrigStyle={display:e.style.display,height:e.style.height,overflow:e.style.overflow},a={display:"block",overflow:"hidden"},e!==this.renderTo&&(a.height=0),d.css(e,a),e.offsetWidth||e.style.setProperty("display","block","important");e=e.parentNode;if(e===t.body)break}},setClassName:function(a){this.container.className="highcharts-container "+
(a||"")},getContainer:function(){var a=this.options,e=a.chart;var b=this.renderTo;var c=d.uniqueKey(),f,l;b||(this.renderTo=b=e.renderTo);z(b)&&(this.renderTo=b=t.getElementById(b));b||d.error(13,!0,this);var g=h(F(b,"data-highcharts-chart"));B(g)&&k[g]&&k[g].hasRendered&&k[g].destroy();F(b,"data-highcharts-chart",this.index);b.innerHTML="";e.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();g=this.chartWidth;var A=this.chartHeight;u(b,{overflow:"hidden"});this.styledMode||(f=
v({position:"relative",overflow:"hidden",width:g+"px",height:A+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},e.style));this.container=b=r("div",{id:c},f,b);this._cursor=b.style.cursor;this.renderer=new (d[e.renderer]||d.Renderer)(b,g,A,null,e.forExport,a.exporting&&a.exporting.allowHTML,this.styledMode);this.setClassName(e.className);if(this.styledMode)for(l in a.defs)this.renderer.definition(a.defs[l]);else this.renderer.setStyle(e.style);this.renderer.chartIndex=
this.index;G(this,"afterGetContainer")},getMargins:function(a){var e=this.spacing,b=this.margin,c=this.titleOffset;this.resetMargins();c[0]&&!E(b[0])&&(this.plotTop=Math.max(this.plotTop,c[0]+e[0]));c[2]&&!E(b[2])&&(this.marginBottom=Math.max(this.marginBottom,c[2]+e[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(b,e);G(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,e=a.axisOffset=[0,0,0,0],b=a.colorAxis,c=a.margin,k=function(a){a.forEach(function(a){a.visible&&
a.getOffset()})};a.hasCartesianSeries?k(a.axes):b&&b.length&&k(b);J.forEach(function(b,k){E(c[k])||(a[b]+=e[k])});a.setChartSize()},reflow:function(e){var b=this,c=b.options.chart,k=b.renderTo,f=E(c.width)&&E(c.height),u=c.width||d.getStyle(k,"width");c=c.height||d.getStyle(k,"height");k=e?e.target:P;if(!f&&!b.isPrinting&&u&&c&&(k===P||k===t)){if(u!==b.containerWidth||c!==b.containerHeight)d.clearTimeout(b.reflowTimeout),b.reflowTimeout=a(function(){b.container&&b.setSize(void 0,void 0,!1)},e?100:
0);b.containerWidth=u;b.containerHeight=c}},setReflow:function(a){var e=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=l(P,"resize",function(a){e.options&&e.reflow(a)}),l(this,"destroy",this.unbindReflow))},setSize:function(e,b,k){var f=this,d=f.renderer;f.isResizing+=1;c(k,f);f.oldChartHeight=f.chartHeight;f.oldChartWidth=f.chartWidth;"undefined"!==typeof e&&(f.options.chart.width=e);"undefined"!==typeof b&&(f.options.chart.height=
b);f.getChartSize();if(!f.styledMode){var l=d.globalAnimation;(l?n:u)(f.container,{width:f.chartWidth+"px",height:f.chartHeight+"px"},l)}f.setChartSize(!0);d.setSize(f.chartWidth,f.chartHeight,k);f.axes.forEach(function(a){a.isDirty=!0;a.setScale()});f.isDirtyLegend=!0;f.isDirtyBox=!0;f.layOutTitles();f.getMargins();f.redraw(k);f.oldChartHeight=null;G(f,"resize");a(function(){f&&G(f,"endResize",null,function(){--f.isResizing})},y(l).duration||0)},setChartSize:function(a){var e=this.inverted,b=this.renderer,
c=this.chartWidth,k=this.chartHeight,f=this.options.chart,d=this.spacing,u=this.clipOffset,l,h,g,r;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=g=Math.max(0,Math.round(c-l-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(k-h-this.marginBottom));this.plotSizeX=e?r:g;this.plotSizeY=e?g:r;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=b.spacingBox={x:d[3],y:d[0],width:c-d[3]-d[1],height:k-d[0]-d[2]};this.plotBox=b.plotBox={x:l,
y:h,width:g,height:r};c=2*Math.floor(this.plotBorderWidth/2);e=Math.ceil(Math.max(c,u[3])/2);b=Math.ceil(Math.max(c,u[0])/2);this.clipBox={x:e,y:b,width:Math.floor(this.plotSizeX-Math.max(c,u[1])/2-e),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(c,u[2])/2-b))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});G(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){G(this,"resetMargins");var a=this,e=a.options.chart;["margin","spacing"].forEach(function(b){var c=
e[b],k=p(c)?c:[c,c,c,c];["Top","Right","Bottom","Left"].forEach(function(c,f){a[b][f]=w(e[b+c],k[f])})});J.forEach(function(e,b){a[e]=w(a.margin[b],a.spacing[b])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,e=this.renderer,b=this.chartWidth,c=this.chartHeight,k=this.chartBackground,f=this.plotBackground,d=this.plotBorder,u=this.styledMode,l=this.plotBGImage,h=a.backgroundColor,g=a.plotBackgroundColor,r=a.plotBackgroundImage,A,H=this.plotLeft,t=
this.plotTop,n=this.plotWidth,m=this.plotHeight,L=this.plotBox,J=this.clipRect,q=this.clipBox,p="animate";k||(this.chartBackground=k=e.rect().addClass("highcharts-background").add(),p="attr");if(u)var z=A=k.strokeWidth();else{z=a.borderWidth||0;A=z+(a.shadow?8:0);h={fill:h||"none"};if(z||k["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=z;k.attr(h).shadow(a.shadow)}k[p]({x:A/2,y:A/2,width:b-A-z%2,height:c-A-z%2,r:a.borderRadius});p="animate";f||(p="attr",this.plotBackground=f=e.rect().addClass("highcharts-plot-background").add());
f[p](L);u||(f.attr({fill:g||"none"}).shadow(a.plotShadow),r&&(l?(r!==l.attr("href")&&l.attr("href",r),l.animate(L)):this.plotBGImage=e.image(r,H,t,n,m).add()));J?J.animate({width:q.width,height:q.height}):this.clipRect=e.clipRect(q);p="animate";d||(p="attr",this.plotBorder=d=e.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());u||d.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});d[p](d.crisp({x:H,y:t,width:n,height:m},-d.strokeWidth()));this.isDirtyBox=
!1;G(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,e=a.options.chart,b,c=a.options.series,k,f;["inverted","angular","polar"].forEach(function(d){b=U[e.type||e.defaultSeriesType];f=e[d]||b&&b.prototype[d];for(k=c&&c.length;!f&&k--;)(b=U[c[k].type])&&b.prototype[d]&&(f=!0);a[d]=f})},linkSeries:function(){var a=this,e=a.series;e.forEach(function(a){a.linkedSeries.length=0});e.forEach(function(e){var b=e.options.linkedTo;z(b)&&(b=":previous"===b?a.series[e.index-1]:a.get(b))&&b.linkedParent!==
e&&(b.linkedSeries.push(e),e.linkedParent=b,b.enabledDataSorting&&e.setDataSortingOptions(),e.visible=w(e.options.visible,b.options.visible,e.visible))});G(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render()})},renderLabels:function(){var a=this,e=a.options.labels;e.items&&e.items.forEach(function(b){var c=v(e.style,b.style),k=h(c.left)+a.plotLeft,f=h(c.top)+a.plotTop+12;delete c.left;delete c.top;a.renderer.text(b.html,k,f).attr({zIndex:2}).css(c).add()})},
render:function(){var a=this.axes,e=this.colorAxis,b=this.renderer,c=this.options,k=0,f=function(a){a.forEach(function(a){a.visible&&a.render()})};this.setTitle();this.legend=new A(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return k=21,!0});var d=this.plotHeight=Math.max(this.plotHeight-k,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();var u=
1.1<c/this.plotWidth;var l=1.05<d/this.plotHeight;if(u||l)a.forEach(function(a){(a.horiz&&u||!a.horiz&&l)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?f(a):e&&e.length&&f(e);this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.updateContainerScaling();this.hasRendered=!0},addCredits:function(a){var e=this;a=L(!0,this.options.credits,
a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(P.location.href=a.href)}).attr({align:a.position.align,zIndex:8}),e.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){e.credits=e.credits.destroy();e.addCredits(a)})},updateContainerScaling:function(){var a=this.container;if(a.offsetWidth&&a.offsetHeight&&a.getBoundingClientRect){var e=
a.getBoundingClientRect(),b=e.width/a.offsetWidth;a=e.height/a.offsetHeight;1!==b||1!==a?this.containerScaling={scaleX:b,scaleY:a}:delete this.containerScaling}},destroy:function(){var a=this,e=a.axes,b=a.series,c=a.container,f,u=c&&c.parentNode;G(a,"destroy");a.renderer.forExport?x(k,a):k[a.index]=void 0;d.chartCount--;a.renderTo.removeAttribute("data-highcharts-chart");V(a);for(f=e.length;f--;)e[f]=e[f].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(f=b.length;f--;)b[f]=
b[f].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(e){var b=a[e];b&&b.destroy&&(a[e]=b.destroy())});c&&(c.innerHTML="",V(c),u&&D(c));q(a,function(e,b){delete a[b]})},firstRender:function(){var a=this,e=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();(C(e.series)?
e.series:[]).forEach(function(e){a.initSeries(e)});a.linkSeries();a.setSeriesData();G(a,"beforeRender");Q&&(a.pointer=new Q(a,e));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&"undefined"!==typeof this.index&&a.apply(this,[this])},this);G(this,"load");G(this,"render");E(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})});K(y,"parts/ScrollablePlotArea.js",[y["parts/Globals.js"],
y["parts/Utilities.js"]],function(d,g){var y=g.pick,F=d.addEvent;g=d.Chart;"";F(g,"afterSetChartSize",function(g){var D=this.options.chart.scrollablePlotArea,x=D&&D.minWidth;D=D&&D.minHeight;if(!this.renderer.forExport){if(x){if(this.scrollablePixelsX=x=Math.max(0,x-this.chartWidth)){this.plotWidth+=x;this.inverted?(this.clipBox.height+=x,this.plotBox.height+=x):(this.clipBox.width+=x,this.plotBox.width+=x);var v={1:{name:"right",value:x}}}}else D&&(this.scrollablePixelsY=x=Math.max(0,D-this.chartHeight))&&
(this.plotHeight+=x,this.inverted?(this.clipBox.width+=x,this.plotBox.width+=x):(this.clipBox.height+=x,this.plotBox.height+=x),v={2:{name:"bottom",value:x}});v&&!g.skipAxes&&this.axes.forEach(function(g){v[g.side]?g.getPlotLinePath=function(){var x=v[g.side].name,p=this[x];this[x]=p-v[g.side].value;var z=d.Axis.prototype.getPlotLinePath.apply(this,arguments);this[x]=p;return z}:(g.setAxisSize(),g.setAxisTranslation())})}});F(g,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&
this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});g.prototype.setUpScrolling=function(){var g={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(g.overflowX="auto");this.scrollablePixelsY&&(g.overflowY="auto");this.scrollingContainer=d.createElement("div",{className:"highcharts-scrolling"},g,this.renderTo);this.innerContainer=d.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);
this.setUpScrolling=null};g.prototype.moveFixedElements=function(){var d=this.container,g=this.fixedRenderer,x=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),v;this.scrollablePixelsX&&!this.inverted?v=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?
v=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?v=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(v=".highcharts-yaxis");x.push(v,v+"-labels");x.forEach(function(v){[].forEach.call(d.querySelectorAll(v),function(d){(d.namespaceURI===g.SVG_NS?g.box:g.box.parentNode).appendChild(d);d.style.pointerEvents="auto"})})};g.prototype.applyFixed=function(){var g,D=!this.fixedDiv,x=this.options.chart.scrollablePlotArea;D?(this.fixedDiv=d.createElement("div",{className:"highcharts-fixed"},
{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=g=new d.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight),this.scrollableMask=g.path().attr({fill:this.options.chart.backgroundColor||"#fff","fill-opacity":y(x.opacity,.85),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),F(this,"afterShowResetZoom",this.moveFixedElements),
F(this,"afterLayOutTitles",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);g=this.chartWidth+(this.scrollablePixelsX||0);var v=this.chartHeight+(this.scrollablePixelsY||0);d.stop(this.container);this.container.style.width=g+"px";this.container.style.height=v+"px";this.renderer.boxWrapper.attr({width:g,height:v,viewBox:[0,0,g,v].join(" ")});this.chartBackground.attr({width:g,height:v});this.scrollablePixelsY&&(this.scrollingContainer.style.height=this.chartHeight+
"px");D&&(x.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*x.scrollPositionX),x.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*x.scrollPositionY));v=this.axisOffset;D=this.plotTop-v[0]-1;x=this.plotLeft-v[3]-1;g=this.plotTop+this.plotHeight+v[2]+1;v=this.plotLeft+this.plotWidth+v[1]+1;var C=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),B=this.plotTop+this.plotHeight-(this.scrollablePixelsY||0);D=this.scrollablePixelsX?["M",0,D,"L",
this.plotLeft-1,D,"L",this.plotLeft-1,g,"L",0,g,"Z","M",C,D,"L",this.chartWidth,D,"L",this.chartWidth,g,"L",C,g,"Z"]:this.scrollablePixelsY?["M",x,0,"L",x,this.plotTop-1,"L",v,this.plotTop-1,"L",v,0,"Z","M",x,B,"L",x,this.chartHeight,"L",v,this.chartHeight,"L",v,B,"Z"]:["M",0,0];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:D})}});K(y,"parts/Point.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.animObject,F=g.defined,E=g.erase,D=g.extend,x=g.isArray,v=
g.isNumber,C=g.isObject,B=g.syncTimeout,p=g.pick,z,m=d.fireEvent,q=d.format,w=d.uniqueKey,h=d.removeEvent;d.Point=z=function(){};d.Point.prototype={init:function(f,c,b){this.series=f;this.applyOptions(c,b);this.id=F(this.id)?this.id:w();this.resolveColor();f.chart.pointCount++;m(this,"afterInit");return this},resolveColor:function(){var f=this.series;var c=f.chart.options.chart.colorCount;var b=f.chart.styledMode;b||this.options.color||(this.color=f.color);f.options.colorByPoint?(b||(c=f.options.colors||
f.chart.options.colors,this.color=this.color||c[f.colorCounter],c=c.length),b=f.colorCounter,f.colorCounter++,f.colorCounter===c&&(f.colorCounter=0)):b=f.colorIndex;this.colorIndex=p(this.colorIndex,b)},applyOptions:function(f,c){var b=this.series,a=b.options.pointValKey||b.pointValKey;f=z.prototype.optionsToObject.call(this,f);D(this,f);this.options=this.options?D(this.options,f):f;f.group&&delete this.group;f.dataLabels&&delete this.dataLabels;a&&(this.y=this[a]);this.formatPrefix=(this.isNull=
p(this.isValid&&!this.isValid(),null===this.x||!v(this.y)))?"null":"point";this.selected&&(this.state="select");"name"in this&&"undefined"===typeof c&&b.xAxis&&b.xAxis.hasNames&&(this.x=b.xAxis.nameToX(this));"undefined"===typeof this.x&&b&&(this.x="undefined"===typeof c?b.autoIncrement(this):c);return this},setNestedProperty:function(f,c,b){b.split(".").reduce(function(a,b,f,d){a[b]=d.length-1===f?c:C(a[b],!0)?a[b]:{};return a[b]},f);return f},optionsToObject:function(f){var c={},b=this.series,a=
b.options.keys,l=a||b.pointArrayMap||["y"],h=l.length,g=0,m=0;if(v(f)||null===f)c[l[0]]=f;else if(x(f))for(!a&&f.length>h&&(b=typeof f[0],"string"===b?c.name=f[0]:"number"===b&&(c.x=f[0]),g++);m<h;)a&&"undefined"===typeof f[g]||(0<l[m].indexOf(".")?d.Point.prototype.setNestedProperty(c,f[g],l[m]):c[l[m]]=f[g]),g++,m++;else"object"===typeof f&&(c=f,f.dataLabels&&(b._hasPointLabels=!0),f.marker&&(b._hasPointMarkers=!0));return c},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":
"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+("undefined"!==typeof this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var f=this.series,c=f.zones;f=f.zoneAxis||"y";var b=0,a;for(a=c[b];this[f]>=a.value;)a=c[++b];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=a&&a.color&&
!this.options.color?a.color:this.nonZonedColor;return a},hasNewShapeType:function(){return(this.graphic&&(this.graphic.symbolName||this.graphic.element.nodeName))!==this.shapeType},destroy:function(){function f(){d&&(c.setState(),E(d,c),d.length||(a.hoverPoints=null));if(c===a.hoverPoint)c.onMouseOut();if(c.graphic||c.dataLabel||c.dataLabels)h(c),c.destroyElements();for(t in c)c[t]=null}var c=this,b=c.series,a=b.chart;b=b.options.dataSorting;var d=a.hoverPoints,g=y(c.series.chart.renderer.globalAnimation),
t;b&&b.enabled?(this.animateBeforeDestroy(),B(f,g.duration)):f();a.pointCount--;c.legendItem&&a.legend.destroyItem(c)},animateBeforeDestroy:function(){var f=this,c={x:f.startXPos,opacity:0},b,a=f.getGraphicalProps();a.singular.forEach(function(a){b="dataLabel"===a;f[a]=f[a].animate(b?{x:f[a].startXPos,y:f[a].startYPos,opacity:0}:c)});a.plural.forEach(function(a){f[a].forEach(function(a){a.element&&a.animate(D({x:f.startXPos},a.startYPos?{x:a.startXPos,y:a.startYPos}:{}))})})},destroyElements:function(f){var c=
this;f=c.getGraphicalProps(f);f.singular.forEach(function(b){c[b]=c[b].destroy()});f.plural.forEach(function(b){c[b].forEach(function(a){a.element&&a.destroy()});delete c[b]})},getGraphicalProps:function(f){var c=this,b=[],a,d={singular:[],plural:[]};f=f||{graphic:1,dataLabel:1};f.graphic&&b.push("graphic","shadowGroup");f.dataLabel&&b.push("dataLabel","dataLabelUpper","connector");for(a=b.length;a--;){var h=b[a];c[h]&&d.singular.push(h)}["dataLabel","connector"].forEach(function(a){var b=a+"s";f[a]&&
c[b]&&d.plural.push(b)});return d},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(f){var c=this.series,b=c.tooltipOptions,a=p(b.valueDecimals,""),d=b.valuePrefix||"",h=b.valueSuffix||"";c.chart.styledMode&&(f=c.chart.tooltip.styledModeFormat(f));(c.pointArrayMap||["y"]).forEach(function(b){b="{point."+
b;if(d||h)f=f.replace(RegExp(b+"}","g"),d+b+"}"+h);f=f.replace(RegExp(b+"}","g"),b+":,."+a+"f}")});return q(f,{point:this,series:this.series},c.chart)},firePointEvent:function(f,c,b){var a=this,d=this.series.options;(d.point.events[f]||a.options&&a.options.events&&a.options.events[f])&&this.importEvents();"click"===f&&d.allowPointSelect&&(b=function(b){a.select&&a.select(null,b.ctrlKey||b.metaKey||b.shiftKey)});m(this,f,c,b)},visible:!0}});K(y,"parts/Series.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],
function(d,g){var y=g.animObject,F=g.arrayMax,E=g.arrayMin,D=g.clamp,x=g.correctFloat,v=g.defined,C=g.erase,B=g.extend,p=g.isArray,z=g.isNumber,m=g.isString,q=g.objectEach,w=g.pick,h=g.splat,f=g.syncTimeout,c=d.addEvent,b=d.defaultOptions,a=d.defaultPlotOptions,l=d.fireEvent,n=d.merge,t=d.removeEvent,I=d.SVGElement,r=d.win;d.Series=d.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{enabledThreshold:2,lineColor:"#ffffff",lineWidth:0,
radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){var a=this.series.chart.numberFormatter;return null===this.y?"":a(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,
states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{axisTypes:["xAxis","yAxis"],coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,eventsToUnbind:[],isCartesian:!0,parallelArrays:["x","y"],pointClass:d.Point,requireSorting:!0,sorted:!0,init:function(a,b){l(this,"init",{options:b});var e=this,
k=a.series,f;this.eventOptions=this.eventOptions||{};e.chart=a;e.options=b=e.setOptions(b);e.linkedSeries=[];e.bindAxes();B(e,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});var h=b.events;q(h,function(a,b){d.isFunction(a)&&e.eventOptions[b]!==a&&(d.isFunction(e.eventOptions[b])&&t(e,b,e.eventOptions[b]),e.eventOptions[b]=a,c(e,b,a))});if(h&&h.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;e.getColor();e.getSymbol();e.parallelArrays.forEach(function(a){e[a+
"Data"]||(e[a+"Data"]=[])});e.isCartesian&&(a.hasCartesianSeries=!0);k.length&&(f=k[k.length-1]);e._i=w(f&&f._i,-1)+1;a.orderSeries(this.insert(k));b.dataSorting&&b.dataSorting.enabled?e.setDataSortingOptions():e.points||e.data||e.setData(b.data,!1);l(this,"afterInit")},insert:function(a){var e=this.options.index,b;if(z(e)){for(b=a.length;b--;)if(e>=w(a[b].options.index,a[b]._i)){a.splice(b+1,0,this);break}-1===b&&a.unshift(this);b+=1}else a.push(this);return w(b,a.length-1)},bindAxes:function(){var a=
this,b=a.options,c=a.chart,f;l(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(e){c[e].forEach(function(c){f=c.options;if(b[e]===f.index||"undefined"!==typeof b[e]&&b[e]===f.id||"undefined"===typeof b[e]&&0===f.index)a.insert(c.series),a[e]=c,c.isDirty=!0});a[e]||a.optionalAxis===e||d.error(18,!0,c)})})},updateParallelArrays:function(a,b){var e=a.series,c=arguments,k=z(b)?function(c){var k="y"===c&&e.toYData?e.toYData(a):a[c];e[c+"Data"][b]=k}:function(a){Array.prototype[b].apply(e[a+
"Data"],Array.prototype.slice.call(c,2))};e.parallelArrays.forEach(k)},hasData:function(){return this.visible&&"undefined"!==typeof this.dataMax&&"undefined"!==typeof this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,f=a.pointIntervalUnit,d=this.chart.time;b=w(b,a.pointStart,0);this.pointInterval=c=w(this.pointInterval,a.pointInterval,1);f&&(a=new d.Date(b),"day"===f?d.set("Date",a,d.get("Date",a)+c):"month"===f?d.set("Month",
a,d.get("Month",a)+c):"year"===f&&d.set("FullYear",a,d.get("FullYear",a)+c),c=a.getTime()-b);this.xIncrement=b+c;return b},setDataSortingOptions:function(){var a=this.options;B(this,{requireSorting:!1,sorted:!1,enabledDataSorting:!0,allowDG:!1});v(a.pointRange)||(a.pointRange=1)},setOptions:function(a){var e=this.chart,c=e.options,f=c.plotOptions,d=e.userOptions||{};a=n(a);e=e.styledMode;var h={plotOptions:f,userOptions:a};l(this,"setOptions",h);var g=h.plotOptions[this.type],r=d.plotOptions||{};
this.userOptions=h.userOptions;d=n(g,f.series,d.plotOptions&&d.plotOptions[this.type],a);this.tooltipOptions=n(b.tooltip,b.plotOptions.series&&b.plotOptions.series.tooltip,b.plotOptions[this.type].tooltip,c.tooltip.userOptions,f.series&&f.series.tooltip,f[this.type].tooltip,a.tooltip);this.stickyTracking=w(a.stickyTracking,r[this.type]&&r[this.type].stickyTracking,r.series&&r.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:d.stickyTracking);null===g.marker&&delete d.marker;
this.zoneAxis=d.zoneAxis;c=this.zones=(d.zones||[]).slice();!d.negativeColor&&!d.negativeFillColor||d.zones||(f={value:d[this.zoneAxis+"Threshold"]||d.threshold||0,className:"highcharts-negative"},e||(f.color=d.negativeColor,f.fillColor=d.negativeFillColor),c.push(f));c.length&&v(c[c.length-1].value)&&c.push(e?{}:{color:this.color,fillColor:this.fillColor});l(this,"afterSetOptions",{options:d});return d},getName:function(){return w(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,
b,c){var e=this.chart,f=this.userOptions,k=a+"Index",d=a+"Counter",u=c?c.length:w(e.options.chart[a+"Count"],e[a+"Count"]);if(!b){var h=w(f[k],f["_"+k]);v(h)||(e.series.length||(e[d]=0),f["_"+k]=h=e[d]%u,e[d]+=1);c&&(b=c[h])}"undefined"!==typeof h&&(this[k]=h);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||a[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",
this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,b){var e=a.id,c=a.x,f=this.points,k,h=this.options.dataSorting;if(e)var l=this.chart.get(e);else if(this.linkedParent||this.enabledDataSorting){var g=h&&h.matchByName?"name":"index";l=d.find(f,function(e){return!e.touched&&e[g]===a[g]});if(!l)return}if(l){var r=l&&l.index;"undefined"!==typeof r&&(k=!0)}"undefined"===typeof r&&z(c)&&(r=this.xData.indexOf(c,b));-1!==r&&"undefined"!==typeof r&&this.cropped&&(r=r>=this.cropStart?
r-this.cropStart:r);!k&&f[r]&&f[r].touched&&(r=void 0);return r},drawLegendSymbol:d.LegendSymbolMixin.drawLineMarker,updateData:function(a,b){var e=this.options,c=e.dataSorting,f=this.points,k=[],d,h,l,g=this.requireSorting,r=a.length===f.length,t=!0;this.xIncrement=null;a.forEach(function(a,b){var h=v(a)&&this.pointClass.prototype.optionsToObject.call({series:this},a)||{};var u=h.x;if(h.id||z(u)){if(u=this.findPointIndex(h,l),-1===u||"undefined"===typeof u?k.push(a):f[u]&&a!==e.data[u]?(f[u].update(a,
!1,null,!1),f[u].touched=!0,g&&(l=u+1)):f[u]&&(f[u].touched=!0),!r||b!==u||c&&c.enabled||this.hasDerivedData)d=!0}else k.push(a)},this);if(d)for(a=f.length;a--;)(h=f[a])&&!h.touched&&h.remove&&h.remove(!1,b);else!r||c&&c.enabled?t=!1:(a.forEach(function(a,e){f[e].update&&a!==f[e].y&&f[e].update(a,!1,null,!1)}),k.length=0);f.forEach(function(a){a&&(a.touched=!1)});if(!t)return!1;k.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);null===this.xIncrement&&this.xData&&this.xData.length&&(this.xIncrement=
F(this.xData),this.autoIncrement());return!0},setData:function(a,b,c,f){var e=this,k=e.points,h=k&&k.length||0,l,u=e.options,g=e.chart,r=u.dataSorting,t=null,H=e.xAxis;t=u.turboThreshold;var n=this.xData,q=this.yData,v=(l=e.pointArrayMap)&&l.length,I=u.keys,x=0,C=1,B;a=a||[];l=a.length;b=w(b,!0);r&&r.enabled&&(a=this.sortData(a));!1!==f&&l&&h&&!e.cropped&&!e.hasGroupedData&&e.visible&&!e.isSeriesBoosting&&(B=this.updateData(a,c));if(!B){e.xIncrement=null;e.colorCounter=0;this.parallelArrays.forEach(function(a){e[a+
"Data"].length=0});if(t&&l>t)if(t=e.getFirstValidPoint(a),z(t))for(c=0;c<l;c++)n[c]=this.autoIncrement(),q[c]=a[c];else if(p(t))if(v)for(c=0;c<l;c++)f=a[c],n[c]=f[0],q[c]=f.slice(1,v+1);else for(I&&(x=I.indexOf("x"),C=I.indexOf("y"),x=0<=x?x:0,C=0<=C?C:1),c=0;c<l;c++)f=a[c],n[c]=f[x],q[c]=f[C];else d.error(12,!1,g);else for(c=0;c<l;c++)"undefined"!==typeof a[c]&&(f={series:e},e.pointClass.prototype.applyOptions.apply(f,[a[c]]),e.updateParallelArrays(f,c));q&&m(q[0])&&d.error(14,!0,g);e.data=[];e.options.data=
e.userOptions.data=a;for(c=h;c--;)k[c]&&k[c].destroy&&k[c].destroy();H&&(H.minRange=H.userMinRange);e.isDirty=g.isDirtyBox=!0;e.isDirtyData=!!k;c=!1}"point"===u.legendType&&(this.processData(),this.generatePoints());b&&g.redraw(c)},sortData:function(a){var e=this,b=e.options.dataSorting.sortKey||"y",c=function(a,e){return v(e)&&a.pointClass.prototype.optionsToObject.call({series:a},e)||{}};a.forEach(function(b,f){a[f]=c(e,b);a[f].index=f},this);a.concat().sort(function(a,e){return z(e[b])?e[b]-a[b]:
-1}).forEach(function(a,e){a.x=e},this);e.linkedSeries&&e.linkedSeries.forEach(function(e){var b=e.options,f=b.data;b.dataSorting&&b.dataSorting.enabled||!f||(f.forEach(function(b,k){f[k]=c(e,b);a[k]&&(f[k].x=a[k].x,f[k].index=k)}),e.setData(f,!1))});return a},processData:function(a){var e=this.xData,b=this.yData,c=e.length;var f=0;var h=this.xAxis,l=this.options;var g=l.cropThreshold;var r=this.getExtremesFromAll||l.getExtremesFromAll,t=this.isCartesian;l=h&&h.val2lin;var n=h&&h.isLog,m=this.requireSorting;
if(t&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(h){a=h.getExtremes();var q=a.min;var p=a.max}if(t&&this.sorted&&!r&&(!g||c>g||this.forceCrop))if(e[c-1]<q||e[0]>p)e=[],b=[];else if(this.yData&&(e[0]<q||e[c-1]>p)){f=this.cropData(this.xData,this.yData,q,p);e=f.xData;b=f.yData;f=f.start;var z=!0}for(g=e.length||1;--g;)if(c=n?l(e[g])-l(e[g-1]):e[g]-e[g-1],0<c&&("undefined"===typeof w||c<w))var w=c;else 0>c&&m&&(d.error(15,!1,this.chart),m=!1);this.cropped=z;this.cropStart=f;this.processedXData=
e;this.processedYData=b;this.closestPointRange=this.basePointRange=w},cropData:function(a,b,c,f,d){var e=a.length,k=0,h=e,l;d=w(d,this.cropShoulder);for(l=0;l<e;l++)if(a[l]>=c){k=Math.max(0,l-d);break}for(c=l;c<e;c++)if(a[c]>f){h=c+d;break}return{xData:a.slice(k,h),yData:b.slice(k,h),start:k,end:h}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,f,d=this.processedXData,g=this.processedYData,r=this.pointClass,t=d.length,n=this.cropStart||0,m=this.hasGroupedData;a=a.keys;var q=[],
p;c||m||(c=[],c.length=b.length,c=this.data=c);a&&m&&(this.options.keys=!1);for(p=0;p<t;p++){var z=n+p;if(m){var w=(new r).init(this,[d[p]].concat(h(g[p])));w.dataGroup=this.groupMap[p];w.dataGroup.options&&(w.options=w.dataGroup.options,B(w,w.dataGroup.options),delete w.dataLabels)}else(w=c[z])||"undefined"===typeof b[z]||(c[z]=w=(new r).init(this,b[z],d[p]));w&&(w.index=z,q[p]=w)}this.options.keys=a;if(c&&(t!==(f=c.length)||m))for(p=0;p<f;p++)p!==n||m||(p+=t),c[p]&&(c[p].destroyElements(),c[p].plotX=
void 0);this.data=c;this.points=q;l(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:E(a),max:F(a)}},getExtremes:function(a){var e=this.xAxis,b=this.yAxis,c=this.processedXData||this.xData,f=[],d=0,h=0;var g=0;var r=this.requireSorting?this.cropShoulder:0,t=b?b.positiveValuesOnly:!1,n;a=a||this.stackedYData||this.processedYData||[];b=a.length;e&&(g=e.getExtremes(),h=g.min,g=g.max);for(n=0;n<b;n++){var m=c[n];var q=a[n];var w=(z(q)||p(q))&&(q.length||0<q||!t);m=this.getExtremesFromAll||
this.options.getExtremesFromAll||this.cropped||!e||(c[n+r]||m)>=h&&(c[n-r]||m)<=g;if(w&&m)if(w=q.length)for(;w--;)z(q[w])&&(f[d++]=q[w]);else f[d++]=q}this.dataMin=E(f);this.dataMax=F(f);l(this,"afterGetExtremes")},getFirstValidPoint:function(a){for(var e=null,b=a.length,c=0;null===e&&c<b;)e=a[c],c++;return e},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,f=c.categories,d=this.enabledDataSorting,h=this.yAxis,g=this.points,
r=g.length,t=!!this.modifyValue,n,m=this.pointPlacementToXValue(),q=z(m),I=a.threshold,C=a.startFromThreshold?I:0,B,E=this.zoneAxis||"y",F=Number.MAX_VALUE;for(n=0;n<r;n++){var y=g[n],M=y.x;var R=y.y;var X=y.low,K=b&&h.stacks[(this.negStacks&&R<(C?0:I)?"-":"")+this.stackKey];h.positiveValuesOnly&&null!==R&&0>=R&&(y.isNull=!0);y.plotX=B=x(D(c.translate(M,0,0,0,1,m,"flags"===this.type),-1E5,1E5));if(b&&this.visible&&K&&K[M]){var aa=this.getStackIndicator(aa,M,this.index);if(!y.isNull){var W=K[M];var Y=
W.points[aa.key]}}p(Y)&&(X=Y[0],R=Y[1],X===C&&aa.key===K[M].base&&(X=w(z(I)&&I,h.min)),h.positiveValuesOnly&&0>=X&&(X=null),y.total=y.stackTotal=W.total,y.percentage=W.total&&y.y/W.total*100,y.stackY=R,this.irregularWidths||W.setOffset(this.pointXOffset||0,this.barW||0));y.yBottom=v(X)?D(h.translate(X,0,1,0,1),-1E5,1E5):null;t&&(R=this.modifyValue(R,y));y.plotY=R="number"===typeof R&&Infinity!==R?D(h.translate(R,0,1,0,1),-1E5,1E5):void 0;y.isInside="undefined"!==typeof R&&0<=R&&R<=h.len&&0<=B&&B<=
c.len;y.clientX=q?x(c.translate(M,0,0,0,1,m)):B;y.negative=y[E]<(a[E+"Threshold"]||I||0);y.category=f&&"undefined"!==typeof f[y.x]?f[y.x]:y.x;if(!y.isNull&&!1!==y.visible){"undefined"!==typeof S&&(F=Math.min(F,Math.abs(B-S)));var S=B}y.zone=this.zones.length&&y.getZone();!y.graphic&&this.group&&d&&(y.isNew=!0)}this.closestPointRangePx=F;l(this,"afterTranslate")},getValidPoints:function(a,b,c){var e=this.chart;return(a||this.points||[]).filter(function(a){return b&&!e.isInsidePlot(a.plotX,a.plotY,
e.inverted)?!1:!1!==a.visible&&(c||!a.isNull)})},getClipBox:function(a,b){var e=this.options,c=this.chart,f=c.inverted,k=this.xAxis,d=k&&this.yAxis;a&&!1===e.clip&&d?a=f?{y:-c.chartWidth+d.len+d.pos,height:c.chartWidth,width:c.chartHeight,x:-c.chartHeight+k.len+k.pos}:{y:-d.pos,height:c.chartHeight,width:c.chartWidth,x:-k.pos}:(a=this.clipBox||c.clipBox,b&&(a.width=c.plotSizeX,a.x=0));return b?{width:a.width,x:a.x}:a},setClip:function(a){var e=this.chart,b=this.options,c=e.renderer,f=e.inverted,d=
this.clipBox,h=this.getClipBox(a),l=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,h.height,b.xAxis,b.yAxis].join(),g=e[l],r=e[l+"m"];g||(a&&(h.width=0,f&&(h.x=e.plotSizeX+(!1!==b.clip?0:e.plotTop)),e[l+"m"]=r=c.clipRect(f?e.plotSizeX+99:-99,f?-e.plotLeft:-e.plotTop,99,f?e.chartWidth:e.chartHeight)),e[l]=g=c.clipRect(h),g.count={length:0});a&&!g.count[this.index]&&(g.count[this.index]=!0,g.count.length+=1);if(!1!==b.clip||a)this.group.clip(a||d?g:e.clipRect),this.markerGroup.clip(r),
this.sharedClipKey=l;a||(g.count[this.index]&&(delete g.count[this.index],--g.count.length),0===g.count.length&&l&&e[l]&&(d||(e[l]=e[l].destroy()),e[l+"m"]&&(e[l+"m"]=e[l+"m"].destroy())))},animate:function(a){var e=this.chart,b=y(this.options.animation);if(a)this.setClip(b);else{var c=this.sharedClipKey;a=e[c];var f=this.getClipBox(b,!0);a&&a.animate(f,b);e[c+"m"]&&e[c+"m"].animate({width:f.width+99,x:f.x-(e.inverted?0:99)},b);this.animate=null}},afterAnimate:function(){this.setClip();l(this,"afterAnimate");
this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,f,d=this.options.marker,h=this[this.specialGroup]||this.markerGroup,l=this.xAxis,g=w(d.enabled,!l||l.isRadial?!0:null,this.closestPointRangePx>=d.enabledThreshold*d.radius);if(!1!==d.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++){var r=a[c];var t=(f=r.graphic)?"animate":"attr";var n=r.marker||{};var m=!!r.marker;if((g&&"undefined"===typeof n.enabled||n.enabled)&&!r.isNull&&!1!==r.visible){var q=w(n.symbol,this.symbol);
var p=this.markerAttribs(r,r.selected&&"select");this.enabledDataSorting&&(r.startXPos=l.reversed?-p.width:l.width);var z=!1!==r.isInside;f?f[z?"show":"hide"](z).animate(p):z&&(0<p.width||r.hasImage)&&(r.graphic=f=b.renderer.symbol(q,p.x,p.y,p.width,p.height,m?n:d).add(h),this.enabledDataSorting&&b.hasRendered&&(f.attr({x:r.startXPos}),t="animate"));f&&"animate"===t&&f[z?"show":"hide"](z).animate(p);if(f&&!b.styledMode)f[t](this.pointAttribs(r,r.selected&&"select"));f&&f.addClass(r.getClassName(),
!0)}else f&&(r.graphic=f.destroy())}},markerAttribs:function(a,b){var e=this.options.marker,c=a.marker||{},f=c.symbol||e.symbol,k=w(c.radius,e.radius);b&&(e=e.states[b],b=c.states&&c.states[b],k=w(b&&b.radius,e&&e.radius,k+(e&&e.radiusPlus||0)));a.hasImage=f&&0===f.indexOf("url");a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,b){var e=this.options.marker,c=a&&a.options,f=c&&c.marker||{},k=this.color,d=c&&c.color,h=a&&a.color;c=
w(f.lineWidth,e.lineWidth);var l=a&&a.zone&&a.zone.color;a=1;k=d||l||h||k;d=f.fillColor||e.fillColor||k;k=f.lineColor||e.lineColor||k;b=b||"normal";e=e.states[b];b=f.states&&f.states[b]||{};c=w(b.lineWidth,e.lineWidth,c+w(b.lineWidthPlus,e.lineWidthPlus,0));d=b.fillColor||e.fillColor||d;k=b.lineColor||e.lineColor||k;a=w(b.opacity,e.opacity,a);return{stroke:k,"stroke-width":c,fill:d,opacity:a}},destroy:function(a){var e=this,b=e.chart,c=/AppleWebKit\/533/.test(r.navigator.userAgent),f,h,g=e.data||
[],t,n;l(e,"destroy");this.removeEvents(a);(e.axisTypes||[]).forEach(function(a){(n=e[a])&&n.series&&(C(n.series,e),n.isDirty=n.forceRedraw=!0)});e.legendItem&&e.chart.legend.destroyItem(e);for(h=g.length;h--;)(t=g[h])&&t.destroy&&t.destroy();e.points=null;d.clearTimeout(e.animationTimeout);q(e,function(a,e){a instanceof I&&!a.survive&&(f=c&&"group"===e?"hide":"destroy",a[f]())});b.hoverSeries===e&&(b.hoverSeries=null);C(b.series,e);b.orderSeries();q(e,function(b,c){a&&"hcEvents"===c||delete e[c]})},
getGraphPath:function(a,b,c){var e=this,f=e.options,k=f.step,d,h=[],l=[],g;a=a||e.points;(d=a.reversed)&&a.reverse();(k={right:1,center:2}[k]||k&&3)&&d&&(k=4-k);a=this.getValidPoints(a,!1,!(f.connectNulls&&!b&&!c));a.forEach(function(d,u){var r=d.plotX,t=d.plotY,n=a[u-1];(d.leftCliff||n&&n.rightCliff)&&!c&&(g=!0);d.isNull&&!v(b)&&0<u?g=!f.connectNulls:d.isNull&&!b?g=!0:(0===u||g?u=["M",d.plotX,d.plotY]:e.getPointSpline?u=e.getPointSpline(a,d,u):k?(u=1===k?["L",n.plotX,t]:2===k?["L",(n.plotX+r)/2,
n.plotY,"L",(n.plotX+r)/2,t]:["L",r,n.plotY],u.push("L",r,t)):u=["L",r,t],l.push(d.x),k&&(l.push(d.x),2===k&&l.push(d.x)),h.push.apply(h,u),g=!1)});h.xMap=l;return e.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),f=this.chart.styledMode,d=[["graph","highcharts-graph"]];f||d[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);d=a.getZonesGraphs(d);d.forEach(function(e,k){var d=e[0],h=a[d],l=h?"animate":"attr";h?(h.endX=a.preventGraphAnimation?
null:c.xMap,h.animate({d:c})):c.length&&(a[d]=h=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group));h&&!f&&(d={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?d.dashstyle=e[3]:"square"!==b.linecap&&(d["stroke-linecap"]=d["stroke-linejoin"]="round"),h[l](d).shadow(2>k&&b.shadow));h&&(h.startX=c.xMap,h.isArea=c.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(e,b){b=["zone-graph-"+b,"highcharts-graph highcharts-zone-graph-"+b+" "+(e.className||
"")];this.chart.styledMode||b.push(e.color||this.color,e.dashStyle||this.options.dashStyle);a.push(b)},this);return a},applyZones:function(){var a=this,b=this.chart,c=b.renderer,f=this.zones,d,h,l=this.clips||[],g,r=this.graph,t=this.area,n=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],q=b.inverted,p,z,v,I=!1;if(f.length&&(r||t)&&m&&"undefined"!==typeof m.min){var x=m.reversed;var C=m.horiz;r&&!this.showLine&&r.hide();t&&t.hide();var B=m.getExtremes();f.forEach(function(e,
f){d=x?C?b.plotWidth:0:C?0:m.toPixels(B.min)||0;d=D(w(h,d),0,n);h=D(Math.round(m.toPixels(w(e.value,B.max),!0)||0),0,n);I&&(d=h=m.toPixels(B.max));p=Math.abs(d-h);z=Math.min(d,h);v=Math.max(d,h);m.isXAxis?(g={x:q?v:z,y:0,width:p,height:n},C||(g.x=b.plotHeight-g.x)):(g={x:0,y:q?v:z,width:n,height:p},C&&(g.y=b.plotWidth-g.y));q&&c.isVML&&(g=m.isXAxis?{x:0,y:x?z:v,height:g.width,width:b.chartWidth}:{x:g.y-b.plotLeft-b.spacingBox.x,y:0,width:g.height,height:b.chartHeight});l[f]?l[f].animate(g):l[f]=c.clipRect(g);
r&&a["zone-graph-"+f].clip(l[f]);t&&a["zone-area-"+f].clip(l[f]);I=e.value>B.max;a.resetZones&&0===h&&(h=void 0)});this.clips=l}else a.visible&&(r&&r.show(!0),t&&t.show(!0))},invertGroups:function(a){function e(){["group","markerGroup"].forEach(function(e){b[e]&&(f.renderer.isVML&&b[e].attr({width:b.yAxis.len,height:b.xAxis.len}),b[e].width=b.yAxis.len,b[e].height=b.xAxis.len,b[e].invert(b.isRadialSeries?!1:a))})}var b=this,f=b.chart;b.xAxis&&(b.eventsToUnbind.push(c(f,"resize",e)),e(),b.invertGroups=
e)},plotGroup:function(a,b,c,f,d){var e=this[a],k=!e;k&&(this[a]=e=this.chart.renderer.g().attr({zIndex:f||.1}).add(d));e.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(v(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(e.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);e.attr({visibility:c})[k?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;
a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},removeEvents:function(a){a?this.eventsToUnbind.length&&(this.eventsToUnbind.forEach(function(a){a()}),this.eventsToUnbind.length=0):t(this)},render:function(){var a=this,b=a.chart,c=a.options,d=!!a.animate&&b.renderer.isSVG&&y(c.animation).duration,h=a.visible?"inherit":"hidden",g=c.zIndex,r=a.hasRendered,t=b.seriesGroup,n=b.inverted;l(this,"render");var m=a.plotGroup("group","series",
h,g,t);a.markerGroup=a.plotGroup("markerGroup","markers",h,g,t);d&&a.animate(!0);m.inverted=a.isCartesian||a.invertable?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===c.clip||a.sharedClipKey||r||m.clip(b.clipRect);d&&a.animate();r||(a.animationTimeout=f(function(){a.afterAnimate()},d||0));a.isDirty=!1;a.hasRendered=
!0;l(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,f=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:w(f&&f.left,a.plotLeft),translateY:w(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var e=this.xAxis,c=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?e.len-a.chartY+e.pos:a.chartX-
e.pos,plotY:f?c.len-a.chartX+c.pos:a.chartY-c.pos},b,a)},buildKDTree:function(a){function e(a,c,f){var k;if(k=a&&a.length){var d=b.kdAxisArray[c%f];a.sort(function(a,e){return a[d]-e[d]});k=Math.floor(k/2);return{point:a[k],left:e(a.slice(0,k),c+1,f),right:e(a.slice(k+1),c+1,f)}}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;f(function(){b.kdTree=e(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow||a&&"touchstart"===
a.type?0:1)},searchKDTree:function(a,b,c){function e(a,b,c,l){var g=b.point,r=f.kdAxisArray[c%l],u=g;var t=v(a[k])&&v(g[k])?Math.pow(a[k]-g[k],2):null;var n=v(a[d])&&v(g[d])?Math.pow(a[d]-g[d],2):null;n=(t||0)+(n||0);g.dist=v(n)?Math.sqrt(n):Number.MAX_VALUE;g.distX=v(t)?Math.sqrt(t):Number.MAX_VALUE;r=a[r]-g[r];n=0>r?"left":"right";t=0>r?"right":"left";b[n]&&(n=e(a,b[n],c+1,l),u=n[h]<u[h]?n:g);b[t]&&Math.sqrt(r*r)<u[h]&&(a=e(a,b[t],c+1,l),u=a[h]<u[h]?a:u);return u}var f=this,k=this.kdAxisArray[0],
d=this.kdAxisArray[1],h=b?"distX":"dist";b=-1<f.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return e(a,this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.xAxis,b=this.options.pointPlacement;"between"===b&&(b=a.reversed?-.5:.5);z(b)&&(b*=w(this.options.pointRange||a.pointRange));return b}});""});K(y,"parts/Stacking.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.correctFloat,F=g.defined,E=g.destroyObjectProperties,
D=g.objectEach,x=g.pick;g=d.Axis;var v=d.Chart,C=d.format,B=d.Series;d.StackItem=function(d,g,m,q,w){var h=d.chart.inverted;this.axis=d;this.isNegative=m;this.options=g=g||{};this.x=q;this.total=null;this.points={};this.stack=w;this.rightCliff=this.leftCliff=0;this.alignOptions={align:g.align||(h?m?"left":"right":"center"),verticalAlign:g.verticalAlign||(h?"middle":m?"bottom":"top"),y:g.y,x:g.x};this.textAlign=g.textAlign||(h?m?"right":"left":"center")};d.StackItem.prototype={destroy:function(){E(this,
this.axis)},render:function(d){var g=this.axis.chart,m=this.options,q=m.format;q=q?C(q,this,g):m.formatter.call(this);this.label?this.label.attr({text:q,visibility:"hidden"}):(this.label=g.renderer.label(q,null,null,m.shape,null,null,m.useHTML,!1,"stack-labels"),q={text:q,align:this.textAlign,rotation:m.rotation,padding:x(m.padding,0),visibility:"hidden"},this.label.attr(q),g.styledMode||this.label.css(m.style),this.label.added||this.label.add(d));this.label.labelrank=g.plotHeight},setOffset:function(d,
g,m,q,w){var h=this.axis,f=h.chart;q=h.translate(h.usePercentage?100:q?q:this.total,0,0,0,1);m=h.translate(m?m:0);m=F(q)&&Math.abs(q-m);d=x(w,f.xAxis[0].translate(this.x))+d;h=F(q)&&this.getStackBox(f,this,d,q,g,m,h);g=this.label;d=this.isNegative;w="justify"===x(this.options.overflow,"justify");if(g&&h){m=g.getBBox();var c=f.inverted?d?m.width:0:m.width/2,b=f.inverted?m.height/2:d?-4:m.height+4;this.alignOptions.x=x(this.options.x,0);g.align(this.alignOptions,null,h);q=g.alignAttr;g.show();q.y-=
b;w&&(q.x-=c,B.prototype.justifyDataLabel.call(this.axis,g,this.alignOptions,q,m,h),q.x+=c);q.x=g.alignAttr.x;g.attr({x:q.x,y:q.y});x(!w&&this.options.crop,!0)&&((f=f.isInsidePlot(g.x+(f.inverted?0:-m.width/2),g.y)&&f.isInsidePlot(g.x+(f.inverted?d?-m.width:m.width:m.width/2),g.y+m.height))||g.hide())}},getStackBox:function(d,g,m,q,w,h,f){var c=g.axis.reversed,b=d.inverted;d=f.height+f.pos-(b?d.plotLeft:d.plotTop);g=g.isNegative&&!c||!g.isNegative&&c;return{x:b?g?q:q-h:m,y:b?d-m-w:g?d-q-h:d-q,width:b?
h:w,height:b?w:h}}};v.prototype.getStacks=function(){var d=this,g=d.inverted;d.yAxis.forEach(function(d){d.stacks&&d.hasVisibleSeries&&(d.oldStacks=d.stacks)});d.series.forEach(function(m){var q=m.xAxis&&m.xAxis.options||{};!m.options.stacking||!0!==m.visible&&!1!==d.options.chart.ignoreHiddenSeries||(m.stackKey=[m.type,x(m.options.stack,""),g?q.top:q.left,g?q.height:q.width].join())})};g.prototype.buildStacks=function(){var g=this.series,v=x(this.options.reversedStacks,!0),m=g.length,q;if(!this.isXAxis){this.usePercentage=
!1;for(q=m;q--;){var w=g[v?q:m-q-1];w.setStackedPoints()}for(q=0;q<m;q++)g[q].modifyStacks();d.fireEvent(this,"afterBuildStacks")}};g.prototype.renderStackTotals=function(){var d=this.chart,g=d.renderer,m=this.stacks,q=this.stackTotalGroup;q||(this.stackTotalGroup=q=g.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());q.translate(d.plotLeft,d.plotTop);D(m,function(d){D(d,function(d){d.render(q)})})};g.prototype.resetStacks=function(){var d=this,g=d.stacks;d.isXAxis||D(g,function(g){D(g,
function(m,p){m.touched<d.stacksTouched?(m.destroy(),delete g[p]):(m.total=null,m.cumulative=null)})})};g.prototype.cleanStacks=function(){if(!this.isXAxis){if(this.oldStacks)var d=this.stacks=this.oldStacks;D(d,function(d){D(d,function(d){d.cumulative=d.total})})}};B.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var g=this.processedXData,v=this.processedYData,m=[],q=v.length,w=this.options,h=w.threshold,f=x(w.startFromThreshold&&
h,0),c=w.stack;w=w.stacking;var b=this.stackKey,a="-"+b,l=this.negStacks,n=this.yAxis,t=n.stacks,I=n.oldStacks,r,e;n.stacksTouched+=1;for(e=0;e<q;e++){var k=g[e];var u=v[e];var H=this.getStackIndicator(H,k,this.index);var G=H.key;var A=(r=l&&u<(f?0:h))?a:b;t[A]||(t[A]={});t[A][k]||(I[A]&&I[A][k]?(t[A][k]=I[A][k],t[A][k].total=null):t[A][k]=new d.StackItem(n,n.options.stackLabels,r,k,c));A=t[A][k];null!==u?(A.points[G]=A.points[this.index]=[x(A.cumulative,f)],F(A.cumulative)||(A.base=G),A.touched=
n.stacksTouched,0<H.index&&!1===this.singleStacks&&(A.points[G][0]=A.points[this.index+","+k+",0"][0])):A.points[G]=A.points[this.index]=null;"percent"===w?(r=r?b:a,l&&t[r]&&t[r][k]?(r=t[r][k],A.total=r.total=Math.max(r.total,A.total)+Math.abs(u)||0):A.total=y(A.total+(Math.abs(u)||0))):A.total=y(A.total+(u||0));A.cumulative=x(A.cumulative,f)+(u||0);null!==u&&(A.points[G].push(A.cumulative),m[e]=A.cumulative)}"percent"===w&&(n.usePercentage=!0);this.stackedYData=m;n.oldStacks={}}};B.prototype.modifyStacks=
function(){var d=this,g=d.stackKey,m=d.yAxis.stacks,q=d.processedXData,w,h=d.options.stacking;d[h+"Stacker"]&&[g,"-"+g].forEach(function(f){for(var c=q.length,b,a;c--;)if(b=q[c],w=d.getStackIndicator(w,b,d.index,f),a=(b=m[f]&&m[f][b])&&b.points[w.key])d[h+"Stacker"](a,b,c)})};B.prototype.percentStacker=function(d,g,m){g=g.total?100/g.total:0;d[0]=y(d[0]*g);d[1]=y(d[1]*g);this.stackedYData[m]=d[1]};B.prototype.getStackIndicator=function(d,g,m,q){!F(d)||d.x!==g||q&&d.key!==q?d={x:g,index:0,key:q}:d.index++;
d.key=[m,g,d.index].join();return d}});K(y,"parts/Dynamics.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.defined,F=g.erase,E=g.extend,D=g.isArray,x=g.isNumber,v=g.isObject,C=g.isString,B=g.objectEach,p=g.pick,z=g.relativeLength,m=g.setAnimation,q=g.splat,w=d.addEvent,h=d.animate,f=d.Axis;g=d.Chart;var c=d.createElement,b=d.css,a=d.fireEvent,l=d.merge,n=d.Point,t=d.Series,I=d.seriesTypes;d.cleanRecursively=function(a,e){var b={};B(a,function(c,f){if(v(a[f],!0)&&!a.nodeType&&
e[f])c=d.cleanRecursively(a[f],e[f]),Object.keys(c).length&&(b[f]=c);else if(v(a[f])||a[f]!==e[f])b[f]=a[f]});return b};E(g.prototype,{addSeries:function(b,e,c){var f,d=this;b&&(e=p(e,!0),a(d,"addSeries",{options:b},function(){f=d.initSeries(b);d.isDirtyLegend=!0;d.linkSeries();f.enabledDataSorting&&f.setData(b.data,!1);a(d,"afterAddSeries",{series:f});e&&d.redraw(c)}));return f},addAxis:function(a,e,b,c){return this.createAxis(e?"xAxis":"yAxis",{axis:a,redraw:b,animation:c})},addColorAxis:function(a,
e,b){return this.createAxis("colorAxis",{axis:a,redraw:e,animation:b})},createAxis:function(a,e){var b=this.options,c="colorAxis"===a,h=e.redraw,g=e.animation;e=l(e.axis,{index:this[a].length,isX:"xAxis"===a});var r=c?new d.ColorAxis(this,e):new f(this,e);b[a]=q(b[a]||{});b[a].push(e);c&&(this.isDirtyLegend=!0,this.axes.forEach(function(a){a.series=[]}),this.series.forEach(function(a){a.bindAxes();a.isDirtyData=!0}));p(h,!0)&&this.redraw(g);return r},showLoading:function(a){var e=this,f=e.options,
d=e.loadingDiv,g=f.loading,l=function(){d&&b(d,{left:e.plotLeft+"px",top:e.plotTop+"px",width:e.plotWidth+"px",height:e.plotHeight+"px"})};d||(e.loadingDiv=d=c("div",{className:"highcharts-loading highcharts-loading-hidden"},null,e.container),e.loadingSpan=c("span",{className:"highcharts-loading-inner"},null,d),w(e,"redraw",l));d.className="highcharts-loading";e.loadingSpan.innerHTML=p(a,f.lang.loading,"");e.styledMode||(b(d,E(g.style,{zIndex:10})),b(e.loadingSpan,g.labelStyle),e.loadingShown||(b(d,
{opacity:0,display:""}),h(d,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));e.loadingShown=!0;l()},hideLoading:function(){var a=this.options,e=this.loadingDiv;e&&(e.className="highcharts-loading highcharts-loading-hidden",this.styledMode||h(e,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){b(e,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),collectionsWithUpdate:["xAxis","yAxis","zAxis","series"],update:function(b,e,c,f){var k=this,h={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},g,u,r,t=b.isResponsiveOptions,n=[];a(k,"update",
{options:b});t||k.setResponsive(!1,!0);b=d.cleanRecursively(b,k.options);l(!0,k.userOptions,b);if(g=b.chart){l(!0,k.options.chart,g);"className"in g&&k.setClassName(g.className);"reflow"in g&&k.setReflow(g.reflow);if("inverted"in g||"polar"in g||"type"in g){k.propFromSeries();var m=!0}"alignTicks"in g&&(m=!0);B(g,function(a,e){-1!==k.propsRequireUpdateSeries.indexOf("chart."+e)&&(u=!0);-1!==k.propsRequireDirtyBox.indexOf(e)&&(k.isDirtyBox=!0);t||-1===k.propsRequireReflow.indexOf(e)||(r=!0)});!k.styledMode&&
"style"in g&&k.renderer.setStyle(g.style)}!k.styledMode&&b.colors&&(this.options.colors=b.colors);b.plotOptions&&l(!0,this.options.plotOptions,b.plotOptions);b.time&&this.time===d.time&&(this.time=new d.Time(b.time));B(b,function(a,e){if(k[e]&&"function"===typeof k[e].update)k[e].update(a,!1);else if("function"===typeof k[h[e]])k[h[e]](a);"chart"!==e&&-1!==k.propsRequireUpdateSeries.indexOf(e)&&(u=!0)});this.collectionsWithUpdate.forEach(function(a){if(b[a]){if("series"===a){var e=[];k[a].forEach(function(a,
b){a.options.isInternal||e.push(p(a.options.index,b))})}q(b[a]).forEach(function(b,f){(f=y(b.id)&&k.get(b.id)||k[a][e?e[f]:f])&&f.coll===a&&(f.update(b,!1),c&&(f.touched=!0));!f&&c&&k.collectionsWithInit[a]&&(k.collectionsWithInit[a][0].apply(k,[b].concat(k.collectionsWithInit[a][1]||[]).concat([!1])).touched=!0)});c&&k[a].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:n.push(a)})}});n.forEach(function(a){a.remove&&a.remove(!1)});m&&k.axes.forEach(function(a){a.update({},!1)});
u&&k.getSeriesOrderByLinks().forEach(function(a){a.chart&&a.update({},!1)},this);b.loading&&l(!0,k.options.loading,b.loading);m=g&&g.width;g=g&&g.height;C(g)&&(g=z(g,m||k.chartWidth));r||x(m)&&m!==k.chartWidth||x(g)&&g!==k.chartHeight?k.setSize(m,g,f):p(e,!0)&&k.redraw(f);a(k,"afterUpdate",{options:b,redraw:e,animation:f})},setSubtitle:function(a,e){this.applyDescription("subtitle",a);this.layOutTitles(e)},setCaption:function(a,e){this.applyDescription("caption",a);this.layOutTitles(e)}});g.prototype.collectionsWithInit=
{xAxis:[g.prototype.addAxis,[!0]],yAxis:[g.prototype.addAxis,[!1]],series:[g.prototype.addSeries]};E(n.prototype,{update:function(a,e,b,c){function f(){d.applyOptions(a);null===d.y&&g&&(d.graphic=g.destroy());v(a,!0)&&(g&&g.element&&a&&a.marker&&"undefined"!==typeof a.marker.symbol&&(d.graphic=g.destroy()),a&&a.dataLabels&&d.dataLabel&&(d.dataLabel=d.dataLabel.destroy()),d.connector&&(d.connector=d.connector.destroy()));h=d.index;k.updateParallelArrays(d,h);u.data[h]=v(u.data[h],!0)||v(a,!0)?d.options:
p(a,u.data[h]);k.isDirty=k.isDirtyData=!0;!k.fixedBox&&k.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===u.legendType&&(l.isDirtyLegend=!0);e&&l.redraw(b)}var d=this,k=d.series,g=d.graphic,h,l=k.chart,u=k.options;e=p(e,!0);!1===c?f():d.firePointEvent("update",{options:a},f)},remove:function(a,e){this.series.removePoint(this.series.data.indexOf(this),a,e)}});E(t.prototype,{addPoint:function(b,e,c,f,d){var k=this.options,g=this.data,h=this.chart,l=this.xAxis;l=l&&l.hasNames&&l.names;var u=k.data,r=
this.xData,t;e=p(e,!0);var n={series:this};this.pointClass.prototype.applyOptions.apply(n,[b]);var m=n.x;var q=r.length;if(this.requireSorting&&m<r[q-1])for(t=!0;q&&r[q-1]>m;)q--;this.updateParallelArrays(n,"splice",q,0,0);this.updateParallelArrays(n,q);l&&n.name&&(l[m]=n.name);u.splice(q,0,b);t&&(this.data.splice(q,0,null),this.processData());"point"===k.legendType&&this.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),this.updateParallelArrays(n,"shift"),u.shift()));!1!==d&&a(this,
"addPoint",{point:n});this.isDirtyData=this.isDirty=!0;e&&h.redraw(f)},removePoint:function(a,e,b){var c=this,f=c.data,d=f[a],k=c.points,g=c.chart,h=function(){k&&k.length===f.length&&k.splice(a,1);f.splice(a,1);c.options.data.splice(a,1);c.updateParallelArrays(d||{series:c},"splice",a,1);d&&d.destroy();c.isDirty=!0;c.isDirtyData=!0;e&&g.redraw()};m(b,g);e=p(e,!0);d?d.firePointEvent("remove",null,h):h()},remove:function(b,e,c,f){function d(){k.destroy(f);k.remove=null;g.isDirtyLegend=g.isDirtyBox=
!0;g.linkSeries();p(b,!0)&&g.redraw(e)}var k=this,g=k.chart;!1!==c?a(k,"remove",null,d):d()},update:function(b,e){b=d.cleanRecursively(b,this.userOptions);a(this,"update",{options:b});var c=this,f=c.chart,g=c.userOptions,h=c.initialType||c.type,r=b.type||g.type||f.options.chart.type,t=!(this.hasDerivedData||b.dataGrouping||r&&r!==this.type||"undefined"!==typeof b.pointStart||b.pointInterval||b.pointIntervalUnit||b.keys),n=I[h].prototype,m,q=["group","markerGroup","dataLabelsGroup","transformGroup"],
w=["eventOptions","navigatorSeries","baseSeries"],v=c.finishedAnimating&&{animation:!1},z={};t&&(w.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY","maxY","minX","maxX"),!1!==b.visible&&w.push("area","graph"),c.parallelArrays.forEach(function(a){w.push(a+"Data")}),b.data&&(b.dataSorting&&E(c.options.dataSorting,b.dataSorting),this.setData(b.data,!1)));b=l(g,v,{index:"undefined"===typeof g.index?c.index:
g.index,pointStart:p(g.pointStart,c.xData[0])},!t&&{data:c.options.data},b);t&&b.data&&(b.data=c.options.data);w=q.concat(w);w.forEach(function(a){w[a]=c[a];delete c[a]});c.remove(!1,null,!1,!0);for(m in n)c[m]=void 0;I[r||h]?E(c,I[r||h].prototype):d.error(17,!0,f,{missingModuleFor:r||h});w.forEach(function(a){c[a]=w[a]});c.init(f,b);if(t&&this.points){var x=c.options;!1===x.visible?(z.graphic=1,z.dataLabel=1):c._hasPointLabels||(r=x.marker,n=x.dataLabels,r&&(!1===r.enabled||"symbol"in r)&&(z.graphic=
1),n&&!1===n.enabled&&(z.dataLabel=1));this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(z).length&&a.destroyElements(z),!1===x.showInLegend&&a.legendItem&&f.legend.destroyItem(a))},this)}b.zIndex!==g.zIndex&&q.forEach(function(a){c[a]&&c[a].attr({zIndex:b.zIndex})});c.initialType=h;f.linkSeries();a(this,"afterUpdate");p(e,!0)&&f.redraw(t?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});E(f.prototype,{update:function(a,
e){var b=this.chart,c=a&&a.events||{};a=l(this.userOptions,a);b.options[this.coll].indexOf&&(b.options[this.coll][b.options[this.coll].indexOf(this.userOptions)]=a);B(b.options[this.coll].events,function(a,e){"undefined"===typeof c[e]&&(c[e]=void 0)});this.destroy(!0);this.init(b,E(a,{events:c}));b.isDirtyBox=!0;p(e,!0)&&b.redraw()},remove:function(a){for(var e=this.chart,b=this.coll,c=this.series,f=c.length;f--;)c[f]&&c[f].remove(!1);F(e.axes,this);F(e[b],this);D(e.options[b])?e.options[b].splice(this.options.index,
1):delete e.options[b];e[b].forEach(function(a,e){a.options.index=a.userOptions.index=e});this.destroy();e.isDirtyBox=!0;p(a,!0)&&e.redraw()},setTitle:function(a,e){this.update({title:a},e)},setCategories:function(a,e){this.update({categories:a},e)}})});K(y,"parts/AreaSeries.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.objectEach,F=g.pick,E=d.color,D=d.Series;g=d.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(d){var g=
[],x=[],B=this.xAxis,p=this.yAxis,z=p.stacks[this.stackKey],m={},q=this.index,w=p.series,h=w.length,f=F(p.options.reversedStacks,!0)?1:-1,c;d=d||this.points;if(this.options.stacking){for(c=0;c<d.length;c++)d[c].leftNull=d[c].rightNull=void 0,m[d[c].x]=d[c];y(z,function(a,b){null!==a.total&&x.push(b)});x.sort(function(a,b){return a-b});var b=w.map(function(a){return a.visible});x.forEach(function(a,d){var l=0,t,w;if(m[a]&&!m[a].isNull)g.push(m[a]),[-1,1].forEach(function(g){var e=1===g?"rightNull":
"leftNull",k=0,l=z[x[d+g]];if(l)for(c=q;0<=c&&c<h;)t=l.points[c],t||(c===q?m[a][e]=!0:b[c]&&(w=z[a].points[c])&&(k-=w[1]-w[0])),c+=f;m[a][1===g?"rightCliff":"leftCliff"]=k});else{for(c=q;0<=c&&c<h;){if(t=z[a].points[c]){l=t[1];break}c+=f}l=p.translate(l,0,1,0,1);g.push({isNull:!0,plotX:B.translate(a,0,0,0,1),x:a,plotY:l,yBottom:l})}})}return g},getGraphPath:function(d){var g=D.prototype.getGraphPath,x=this.options,B=x.stacking,p=this.yAxis,z,m=[],q=[],w=this.index,h=p.stacks[this.stackKey],f=x.threshold,
c=Math.round(p.getThreshold(x.threshold));x=F(x.connectNulls,"percent"===B);var b=function(a,b,g){var e=d[a];a=B&&h[e.x].points[w];var k=e[g+"Null"]||0;g=e[g+"Cliff"]||0;e=!0;if(g||k){var u=(k?a[0]:a[1])+g;var t=a[0]+g;e=!!k}else!B&&d[b]&&d[b].isNull&&(u=t=f);"undefined"!==typeof u&&(q.push({plotX:l,plotY:null===u?c:p.getThreshold(u),isNull:e,isCliff:!0}),m.push({plotX:l,plotY:null===t?c:p.getThreshold(t),doCurve:!1}))};d=d||this.points;B&&(d=this.getStackPoints(d));for(z=0;z<d.length;z++){B||(d[z].leftCliff=
d[z].rightCliff=d[z].leftNull=d[z].rightNull=void 0);var a=d[z].isNull;var l=F(d[z].rectPlotX,d[z].plotX);var n=F(d[z].yBottom,c);if(!a||x)x||b(z,z-1,"left"),a&&!B&&x||(q.push(d[z]),m.push({x:z,plotX:l,plotY:n})),x||b(z,z+1,"right")}z=g.call(this,q,!0,!0);m.reversed=!0;a=g.call(this,m,!0,!0);a.length&&(a[0]="L");a=z.concat(a);g=g.call(this,q,!1,x);a.xMap=z.xMap;this.areaPath=a;return g},drawGraph:function(){this.areaPath=[];D.prototype.drawGraph.apply(this);var d=this,g=this.areaPath,C=this.options,
B=[["area","highcharts-area",this.color,C.fillColor]];this.zones.forEach(function(g,v){B.push(["zone-area-"+v,"highcharts-area highcharts-zone-area-"+v+" "+g.className,g.color||d.color,g.fillColor||C.fillColor])});B.forEach(function(p){var v=p[0],m=d[v],q=m?"animate":"attr",w={};m?(m.endX=d.preventGraphAnimation?null:g.xMap,m.animate({d:g})):(w.zIndex=0,m=d[v]=d.chart.renderer.path(g).addClass(p[1]).add(d.group),m.isArea=!0);d.chart.styledMode||(w.fill=F(p[3],E(p[2]).setOpacity(F(C.fillOpacity,.75)).get()));
m[q](w);m.startX=g.xMap;m.shiftUnit=C.step?2:1})},drawLegendSymbol:d.LegendSymbolMixin.drawRectangle});""});K(y,"parts/SplineSeries.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.pick;d=d.seriesType;d("spline","line",{},{getPointSpline:function(d,g,D){var x=g.plotX,v=g.plotY,C=d[D-1];D=d[D+1];if(C&&!C.isNull&&!1!==C.doCurve&&!g.isCliff&&D&&!D.isNull&&!1!==D.doCurve&&!g.isCliff){d=C.plotY;var B=D.plotX;D=D.plotY;var p=0;var z=(1.5*x+C.plotX)/2.5;var m=(1.5*v+d)/2.5;B=(1.5*
x+B)/2.5;var q=(1.5*v+D)/2.5;B!==z&&(p=(q-m)*(B-x)/(B-z)+v-q);m+=p;q+=p;m>d&&m>v?(m=Math.max(d,v),q=2*v-m):m<d&&m<v&&(m=Math.min(d,v),q=2*v-m);q>D&&q>v?(q=Math.max(D,v),m=2*v-q):q<D&&q<v&&(q=Math.min(D,v),m=2*v-q);g.rightContX=B;g.rightContY=q}g=["C",y(C.rightContX,C.plotX),y(C.rightContY,C.plotY),y(z,x),y(m,v),x,v];C.rightContX=C.rightContY=null;return g}});""});K(y,"parts/AreaSplineSeries.js",[y["parts/Globals.js"]],function(d){var g=d.seriesTypes.area.prototype,y=d.seriesType;y("areaspline","spline",
d.defaultPlotOptions.area,{getStackPoints:g.getStackPoints,getGraphPath:g.getGraphPath,drawGraph:g.drawGraph,drawLegendSymbol:d.LegendSymbolMixin.drawRectangle});""});K(y,"parts/ColumnSeries.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.animObject,F=g.clamp,E=g.defined,D=g.extend,x=g.isNumber,v=g.pick,C=d.color,B=d.merge,p=d.Series;g=d.seriesType;var z=d.svg;g("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,
pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){p.prototype.init.apply(this,arguments);var d=this,g=d.chart;g.hasRendered&&g.series.forEach(function(g){g.type===d.type&&(g.isDirty=!0)})},
getColumnMetrics:function(){var d=this,g=d.options,w=d.xAxis,h=d.yAxis,f=w.options.reversedStacks;f=w.reversed&&!f||!w.reversed&&f;var c,b={},a=0;!1===g.grouping?a=1:d.chart.series.forEach(function(f){var g=f.yAxis,e=f.options;if(f.type===d.type&&(f.visible||!d.chart.options.chart.ignoreHiddenSeries)&&h.len===g.len&&h.pos===g.pos){if(e.stacking){c=f.stackKey;"undefined"===typeof b[c]&&(b[c]=a++);var k=b[c]}else!1!==e.grouping&&(k=a++);f.columnIndex=k}});var l=Math.min(Math.abs(w.transA)*(w.ordinalSlope||
g.pointRange||w.closestPointRange||w.tickInterval||1),w.len),n=l*g.groupPadding,t=(l-2*n)/(a||1);g=Math.min(g.maxPointWidth||w.len,v(g.pointWidth,t*(1-2*g.pointPadding)));d.columnMetrics={width:g,offset:(t-g)/2+(n+((d.columnIndex||0)+(f?1:0))*t-l/2)*(f?-1:1)};return d.columnMetrics},crispCol:function(d,g,w,h){var f=this.chart,c=this.borderWidth,b=-(c%2?.5:0);c=c%2?.5:1;f.inverted&&f.renderer.isVML&&(c+=1);this.options.crisp&&(w=Math.round(d+w)+b,d=Math.round(d)+b,w-=d);h=Math.round(g+h)+c;b=.5>=Math.abs(g)&&
.5<h;g=Math.round(g)+c;h-=g;b&&h&&(--g,h+=1);return{x:d,y:g,width:w,height:h}},translate:function(){var d=this,g=d.chart,w=d.options,h=d.dense=2>d.closestPointRange*d.xAxis.transA;h=d.borderWidth=v(w.borderWidth,h?0:1);var f=d.yAxis,c=w.threshold,b=d.translatedThreshold=f.getThreshold(c),a=v(w.minPointLength,5),l=d.getColumnMetrics(),n=l.width,t=d.barW=Math.max(n,1+2*h),z=d.pointXOffset=l.offset,r=d.dataMin,e=d.dataMax;g.inverted&&(b-=.5);w.pointPadding&&(t=Math.ceil(t));p.prototype.translate.apply(d);
d.points.forEach(function(k){var h=v(k.yBottom,b),l=999+Math.abs(h),m=n;l=F(k.plotY,-l,f.len+l);var A=k.plotX+z,q=t,w=Math.min(l,h),p=Math.max(l,h)-w;if(a&&Math.abs(p)<a){p=a;var I=!f.reversed&&!k.negative||f.reversed&&k.negative;k.y===c&&d.dataMax<=c&&f.min<c&&r!==e&&(I=!I);w=Math.abs(w-b)>a?h-a:b-(I?a:0)}E(k.options.pointWidth)&&(m=q=Math.ceil(k.options.pointWidth),A-=Math.round((m-n)/2));k.barX=A;k.pointWidth=m;k.tooltipPos=g.inverted?[f.len+f.pos-g.plotLeft-l,d.xAxis.len-A-q/2,p]:[A+q/2,l+f.pos-
g.plotTop,p];k.shapeType=d.pointClass.prototype.shapeType||"rect";k.shapeArgs=d.crispCol.apply(d,k.isNull?[A,b,q,0]:[A,w,q,p])})},getSymbol:d.noop,drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(d,g){var m=this.options,h=this.pointAttrToOptions||{};var f=h.stroke||"borderColor";var c=h["stroke-width"]||"borderWidth",b=d&&d.color||this.color,a=d&&d[f]||m[f]||this.color||b,l=d&&d[c]||
m[c]||this[c]||0;h=d&&d.options.dashStyle||m.dashStyle;var n=v(d&&d.opacity,m.opacity,1);if(d&&this.zones.length){var t=d.getZone();b=d.options.color||t&&(t.color||d.nonZonedColor)||this.color;t&&(a=t.borderColor||a,h=t.dashStyle||h,l=t.borderWidth||l)}g&&d&&(d=B(m.states[g],d.options.states&&d.options.states[g]||{}),g=d.brightness,b=d.color||"undefined"!==typeof g&&C(b).brighten(d.brightness).get()||b,a=d[f]||a,l=d[c]||l,h=d.dashStyle||h,n=v(d.opacity,n));f={fill:b,stroke:a,"stroke-width":l,opacity:n};
h&&(f.dashstyle=h);return f},drawPoints:function(){var d=this,g=this.chart,p=d.options,h=g.renderer,f=p.animationLimit||250,c;d.points.forEach(function(b){var a=b.graphic,l=!!a,n=a&&g.pointCount<f?"animate":"attr";if(x(b.plotY)&&null!==b.y){c=b.shapeArgs;a&&b.hasNewShapeType()&&(a=a.destroy());d.enabledDataSorting&&(b.startXPos=d.xAxis.reversed?-(c?c.width:0):d.xAxis.width);a||(b.graphic=a=h[b.shapeType](c).add(b.group||d.group))&&d.enabledDataSorting&&g.hasRendered&&g.pointCount<f&&(a.attr({x:b.startXPos}),
l=!0,n="animate");if(a&&l)a[n](B(c));if(p.borderRadius)a[n]({r:p.borderRadius});g.styledMode||a[n](d.pointAttribs(b,b.selected&&"select")).shadow(!1!==b.allowShadow&&p.shadow,null,p.stacking&&!p.borderRadius);a.addClass(b.getClassName(),!0)}else a&&(b.graphic=a.destroy())})},animate:function(d){var g=this,m=this.yAxis,h=g.options,f=this.chart.inverted,c={},b=f?"translateX":"translateY";if(z)if(d)c.scaleY=.001,d=F(m.toPixels(h.threshold),m.pos,m.pos+m.len),f?c.translateX=d-m.len:c.translateY=d,g.clipBox&&
g.setClip(),g.group.attr(c);else{var a=g.group.attr(b);g.group.animate({scaleY:1},D(y(g.options.animation),{step:function(f,d){c[b]=a+d.pos*(m.pos-a);g.group.attr(c)}}));g.animate=null}},remove:function(){var d=this,g=d.chart;g.hasRendered&&g.series.forEach(function(g){g.type===d.type&&(g.isDirty=!0)});p.prototype.remove.apply(d,arguments)}});""});K(y,"parts/BarSeries.js",[y["parts/Globals.js"]],function(d){d=d.seriesType;d("bar","column",null,{inverted:!0});""});K(y,"parts/ScatterSeries.js",[y["parts/Globals.js"]],
function(d){var g=d.Series,y=d.seriesType;y("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
g.prototype.drawGraph.call(this)},applyJitter:function(){var d=this,g=this.options.jitter,y=this.points.length;g&&this.points.forEach(function(x,v){["x","y"].forEach(function(C,B){var p="plot"+C.toUpperCase();if(g[C]&&!x.isNull){var z=d[C+"Axis"];var m=g[C]*z.transA;if(z&&!z.isLog){var q=Math.max(0,x[p]-m);z=Math.min(z.len,x[p]+m);B=1E4*Math.sin(v+B*y);x[p]=q+(z-q)*(B-Math.floor(B));"x"===C&&(x.clientX=x.plotX)}}})})}});d.addEvent(g,"afterTranslate",function(){this.applyJitter&&this.applyJitter()});
""});K(y,"mixins/centered-series.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.isNumber,F=g.pick,E=g.relativeLength,D=d.deg2rad;d.CenteredSeriesMixin={getCenter:function(){var d=this.options,g=this.chart,C=2*(d.slicedOffset||0),B=g.plotWidth-2*C;g=g.plotHeight-2*C;var p=d.center;p=[F(p[0],"50%"),F(p[1],"50%"),d.size||"100%",d.innerSize||0];var z=Math.min(B,g),m;for(m=0;4>m;++m){var q=p[m];d=2>m||2===m&&/%$/.test(q);p[m]=E(q,[B,g,z,p[2]][m])+(d?C:0)}p[3]>p[2]&&(p[3]=p[2]);
return p},getStartAndEndRadians:function(d,g){d=y(d)?d:0;g=y(g)&&g>d&&360>g-d?g:d+360;return{start:D*(d+-90),end:D*(g+-90)}}}});K(y,"parts/PieSeries.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.clamp,F=g.defined,E=g.isNumber,D=g.pick,x=g.relativeLength,v=g.setAnimation,C=d.addEvent;g=d.CenteredSeriesMixin;var B=g.getStartAndEndRadians,p=d.merge,z=d.noop,m=d.Point,q=d.Series,w=d.seriesType,h=d.fireEvent;w("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,
connectorPadding:5,connectorShape:"fixedOffset",crookDistance:"70%",distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,lineWidth:void 0,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:d.seriesTypes.column.prototype.pointAttribs,animate:function(f){var c=this,b=c.points,a=c.startAngleRad;f||(b.forEach(function(b){var f=b.graphic,d=b.shapeArgs;f&&d&&(f.attr({r:D(b.startR,c.center&&c.center[3]/2),start:a,end:a}),f.animate({r:d.r,start:d.start,end:d.end},c.options.animation))}),c.animate=null)},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var f,c=0,b=this.points,a=b.length,d=this.options.ignoreHiddenPoint;
for(f=0;f<a;f++){var g=b[f];c+=d&&!g.visible?0:g.isNull?0:g.y}this.total=c;for(f=0;f<a;f++)g=b[f],g.percentage=0<c&&(g.visible||!d)?g.y/c*100:0,g.total=c},generatePoints:function(){q.prototype.generatePoints.call(this);this.updateTotals()},getX:function(f,c,b){var a=this.center,d=this.radii?this.radii[b.index]:a[2]/2;f=Math.asin(y((f-a[1])/(d+b.labelDistance),-1,1));return a[0]+(c?-1:1)*Math.cos(f)*(d+b.labelDistance)+(0<b.labelDistance?(c?-1:1)*this.options.dataLabels.padding:0)},translate:function(f){this.generatePoints();
var c=0,b=this.options,a=b.slicedOffset,d=a+(b.borderWidth||0),g=B(b.startAngle,b.endAngle),t=this.startAngleRad=g.start;g=(this.endAngleRad=g.end)-t;var m=this.points,r=b.dataLabels.distance;b=b.ignoreHiddenPoint;var e,k=m.length;f||(this.center=f=this.getCenter());for(e=0;e<k;e++){var u=m[e];var q=t+c*g;if(!b||u.visible)c+=u.percentage/100;var p=t+c*g;u.shapeType="arc";u.shapeArgs={x:f[0],y:f[1],r:f[2]/2,innerR:f[3]/2,start:Math.round(1E3*q)/1E3,end:Math.round(1E3*p)/1E3};u.labelDistance=D(u.options.dataLabels&&
u.options.dataLabels.distance,r);u.labelDistance=x(u.labelDistance,u.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,u.labelDistance);p=(p+q)/2;p>1.5*Math.PI?p-=2*Math.PI:p<-Math.PI/2&&(p+=2*Math.PI);u.slicedTranslation={translateX:Math.round(Math.cos(p)*a),translateY:Math.round(Math.sin(p)*a)};var A=Math.cos(p)*f[2]/2;var w=Math.sin(p)*f[2]/2;u.tooltipPos=[f[0]+.7*A,f[1]+.7*w];u.half=p<-Math.PI/2||p>Math.PI/2?1:0;u.angle=p;q=Math.min(d,u.labelDistance/5);u.labelPosition={natural:{x:f[0]+
A+Math.cos(p)*u.labelDistance,y:f[1]+w+Math.sin(p)*u.labelDistance},"final":{},alignment:0>u.labelDistance?"center":u.half?"right":"left",connectorPosition:{breakAt:{x:f[0]+A+Math.cos(p)*q,y:f[1]+w+Math.sin(p)*q},touchingSliceAt:{x:f[0]+A,y:f[1]+w}}}}h(this,"afterTranslate")},drawEmpty:function(){var f=this.options;if(0===this.total){var c=this.center[0];var b=this.center[1];this.graph||(this.graph=this.chart.renderer.circle(c,b,0).addClass("highcharts-graph").add(this.group));this.graph.animate({"stroke-width":f.borderWidth,
cx:c,cy:b,r:this.center[2]/2,fill:f.fillColor||"none",stroke:f.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())},redrawPoints:function(){var f=this,c=f.chart,b=c.renderer,a,d,g,h,m=f.options.shadow;this.drawEmpty();!m||f.shadowGroup||c.styledMode||(f.shadowGroup=b.g("shadow").attr({zIndex:-1}).add(f.group));f.points.forEach(function(l){var e={};d=l.graphic;if(!l.isNull&&d){h=l.shapeArgs;a=l.getTranslate();if(!c.styledMode){var k=l.shadowGroup;m&&!k&&(k=l.shadowGroup=b.g("shadow").add(f.shadowGroup));
k&&k.attr(a);g=f.pointAttribs(l,l.selected&&"select")}l.delayedRendering?(d.setRadialReference(f.center).attr(h).attr(a),c.styledMode||d.attr(g).attr({"stroke-linejoin":"round"}).shadow(m,k),l.delayedRendering=!1):(d.setRadialReference(f.center),c.styledMode||p(!0,e,g),p(!0,e,h,a),d.animate(e));d.attr({visibility:l.visible?"inherit":"hidden"});d.addClass(l.getClassName())}else d&&(l.graphic=d.destroy())})},drawPoints:function(){var f=this.chart.renderer;this.points.forEach(function(c){c.graphic||
(c.graphic=f[c.shapeType](c.shapeArgs).add(c.series.group),c.delayedRendering=!0)})},searchPoint:z,sortByAngle:function(f,c){f.sort(function(b,a){return"undefined"!==typeof b.angle&&(a.angle-b.angle)*c})},drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,getCenter:g.getCenter,getSymbol:z,drawGraph:null},{init:function(){m.prototype.init.apply(this,arguments);var f=this;f.name=D(f.name,"Slice");var c=function(b){f.slice("select"===b.type)};C(f,"select",c);C(f,"unselect",c);return f},isValid:function(){return E(this.y)&&
0<=this.y},setVisible:function(f,c){var b=this,a=b.series,d=a.chart,g=a.options.ignoreHiddenPoint;c=D(c,g);f!==b.visible&&(b.visible=b.options.visible=f="undefined"===typeof f?!b.visible:f,a.options.data[a.data.indexOf(b)]=b.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(a){if(b[a])b[a][f?"show":"hide"](!0)}),b.legendItem&&d.legend.colorizeItem(b,f),f||"hover"!==b.state||b.setState(""),g&&(a.isDirty=!0),c&&d.redraw())},slice:function(f,c,b){var a=this.series;v(b,a.chart);
D(c,!0);this.sliced=this.options.sliced=F(f)?f:!this.sliced;a.options.data[a.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(f){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+f,c.r+f,{innerR:c.r-1,start:c.start,end:c.end})},connectorShapes:{fixedOffset:function(f,
c,b){var a=c.breakAt;c=c.touchingSliceAt;return["M",f.x,f.y].concat(b.softConnector?["C",f.x+("left"===f.alignment?-5:5),f.y,2*a.x-c.x,2*a.y-c.y,a.x,a.y]:["L",a.x,a.y]).concat(["L",c.x,c.y])},straight:function(f,c){c=c.touchingSliceAt;return["M",f.x,f.y,"L",c.x,c.y]},crookedLine:function(f,c,b){c=c.touchingSliceAt;var a=this.series,d=a.center[0],g=a.chart.plotWidth,h=a.chart.plotLeft;a=f.alignment;var m=this.shapeArgs.r;b=x(b.crookDistance,1);b="left"===a?d+m+(g+h-d-m)*(1-b):h+(d-m)*b;d=["L",b,f.y];
if("left"===a?b>f.x||b<c.x:b<f.x||b>c.x)d=[];return["M",f.x,f.y].concat(d).concat(["L",c.x,c.y])}},getConnectorPath:function(){var f=this.labelPosition,c=this.series.options.dataLabels,b=c.connectorShape,a=this.connectorShapes;a[b]&&(b=a[b]);return b.call(this,{x:f.final.x,y:f.final.y,alignment:f.alignment},f.connectorPosition,c)}});""});K(y,"parts/DataLabels.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.animObject,F=g.arrayMax,E=g.clamp,D=g.defined,x=g.extend,v=g.isArray,
C=g.objectEach,B=g.pick,p=g.relativeLength,z=g.splat,m=d.format,q=d.merge;g=d.noop;var w=d.Series,h=d.seriesTypes,f=d.stableSort;d.distribute=function(c,b,a){function g(a,e){return a.target-e.target}var h,t=!0,m=c,r=[];var e=0;var k=m.reducedLen||b;for(h=c.length;h--;)e+=c[h].size;if(e>k){f(c,function(a,e){return(e.rank||0)-(a.rank||0)});for(e=h=0;e<=k;)e+=c[h].size,h++;r=c.splice(h-1,c.length)}f(c,g);for(c=c.map(function(a){return{size:a.size,targets:[a.target],align:B(a.align,.5)}});t;){for(h=c.length;h--;)t=
c[h],e=(Math.min.apply(0,t.targets)+Math.max.apply(0,t.targets))/2,t.pos=E(e-t.size*t.align,0,b-t.size);h=c.length;for(t=!1;h--;)0<h&&c[h-1].pos+c[h-1].size>c[h].pos&&(c[h-1].size+=c[h].size,c[h-1].targets=c[h-1].targets.concat(c[h].targets),c[h-1].align=.5,c[h-1].pos+c[h-1].size>b&&(c[h-1].pos=b-c[h-1].size),c.splice(h,1),t=!0)}m.push.apply(m,r);h=0;c.some(function(e){var c=0;if(e.targets.some(function(){m[h].pos=e.pos+c;if(Math.abs(m[h].pos-m[h].target)>a)return m.slice(0,h+1).forEach(function(a){delete a.pos}),
m.reducedLen=(m.reducedLen||b)-.1*b,m.reducedLen>.1*b&&d.distribute(m,b,a),!0;c+=m[h].size;h++}))return!0});f(m,g)};w.prototype.drawDataLabels=function(){function c(a,e){var b=e.filter;return b?(e=b.operator,a=a[b.property],b=b.value,">"===e&&a>b||"<"===e&&a<b||">="===e&&a>=b||"<="===e&&a<=b||"=="===e&&a==b||"==="===e&&a===b?!0:!1):!0}function b(a,e){var b=[],c;if(v(a)&&!v(e))b=a.map(function(a){return q(a,e)});else if(v(e)&&!v(a))b=e.map(function(e){return q(a,e)});else if(v(a)||v(e))for(c=Math.max(a.length,
e.length);c--;)b[c]=q(a[c],e[c]);else b=q(a,e);return b}var a=this,f=a.chart,g=a.options,h=g.dataLabels,p=a.points,r,e=a.hasRendered||0,k=y(g.animation).duration,u=Math.min(k,200),H=!f.renderer.forExport&&B(h.defer,0<u),w=f.renderer;h=b(b(f.options.plotOptions&&f.options.plotOptions.series&&f.options.plotOptions.series.dataLabels,f.options.plotOptions&&f.options.plotOptions[a.type]&&f.options.plotOptions[a.type].dataLabels),h);d.fireEvent(this,"drawDataLabels");if(v(h)||h.enabled||a._hasPointLabels){var A=
a.plotGroup("dataLabelsGroup","data-labels",H&&!e?"hidden":"inherit",h.zIndex||6);H&&(A.attr({opacity:+e}),e||setTimeout(function(){var e=a.dataLabelsGroup;e&&(a.visible&&A.show(!0),e[g.animation?"animate":"attr"]({opacity:1},{duration:u}))},k-u));p.forEach(function(e){r=z(b(h,e.dlOptions||e.options&&e.options.dataLabels));r.forEach(function(b,d){var k=b.enabled&&(!e.isNull||e.dataLabelOnNull)&&c(e,b),h=e.dataLabels?e.dataLabels[d]:e.dataLabel,l=e.connectors?e.connectors[d]:e.connector,u=B(b.distance,
e.labelDistance),t=!h;if(k){var r=e.getLabelConfig();var n=B(b[e.formatPrefix+"Format"],b.format);r=D(n)?m(n,r,f):(b[e.formatPrefix+"Formatter"]||b.formatter).call(r,b);n=b.style;var q=b.rotation;f.styledMode||(n.color=B(b.color,n.color,a.color,"#000000"),"contrast"===n.color?(e.contrastColor=w.getContrast(e.color||a.color),n.color=!D(u)&&b.inside||0>u||g.stacking?e.contrastColor:"#000000"):delete e.contrastColor,g.cursor&&(n.cursor=g.cursor));var p={r:b.borderRadius||0,rotation:q,padding:b.padding,
zIndex:1};f.styledMode||(p.fill=b.backgroundColor,p.stroke=b.borderColor,p["stroke-width"]=b.borderWidth);C(p,function(a,e){"undefined"===typeof a&&delete p[e]})}!h||k&&D(r)?k&&D(r)&&(h?p.text=r:(e.dataLabels=e.dataLabels||[],h=e.dataLabels[d]=q?w.text(r,0,-9999).addClass("highcharts-data-label"):w.label(r,0,-9999,b.shape,null,null,b.useHTML,null,"data-label"),d||(e.dataLabel=h),h.addClass(" highcharts-data-label-color-"+e.colorIndex+" "+(b.className||"")+(b.useHTML?" highcharts-tracker":""))),h.options=
b,h.attr(p),f.styledMode||h.css(n).shadow(b.shadow),h.added||h.add(A),b.textPath&&!b.useHTML&&(h.setTextPath(e.getDataLabelPath&&e.getDataLabelPath(h)||e.graphic,b.textPath),e.dataLabelPath&&!b.textPath.enabled&&(e.dataLabelPath=e.dataLabelPath.destroy())),a.alignDataLabel(e,h,b,null,t)):(e.dataLabel=e.dataLabel&&e.dataLabel.destroy(),e.dataLabels&&(1===e.dataLabels.length?delete e.dataLabels:delete e.dataLabels[d]),d||delete e.dataLabel,l&&(e.connector=e.connector.destroy(),e.connectors&&(1===e.connectors.length?
delete e.connectors:delete e.connectors[d])))})})}d.fireEvent(this,"afterDrawDataLabels")};w.prototype.alignDataLabel=function(c,b,a,f,d){var g=this,h=this.chart,l=this.isCartesian&&h.inverted,e=this.enabledDataSorting,k=B(c.dlBox&&c.dlBox.centerX,c.plotX,-9999),u=B(c.plotY,-9999),n=b.getBBox(),m=a.rotation,A=a.align,q=h.isInsidePlot(k,Math.round(u),l),p="justify"===B(a.overflow,e?"none":"justify"),w=this.visible&&(c.series.forceDL||e&&!p||q||f&&h.isInsidePlot(k,l?f.x+1:f.y+f.height-1,l));var v=function(a){e&&
g.xAxis&&!p&&g.setDataLabelStartPos(c,b,d,q,a)};if(w){var z=h.renderer.fontMetrics(h.styledMode?void 0:a.style.fontSize,b).b;f=x({x:l?this.yAxis.len-u:k,y:Math.round(l?this.xAxis.len-k:u),width:0,height:0},f);x(a,{width:n.width,height:n.height});m?(p=!1,k=h.renderer.rotCorr(z,m),k={x:f.x+a.x+f.width/2+k.x,y:f.y+a.y+{top:0,middle:.5,bottom:1}[a.verticalAlign]*f.height},v(k),b[d?"attr":"animate"](k).attr({align:A}),v=(m+720)%360,v=180<v&&360>v,"left"===A?k.y-=v?n.height:0:"center"===A?(k.x-=n.width/
2,k.y-=n.height/2):"right"===A&&(k.x-=n.width,k.y-=v?0:n.height),b.placed=!0,b.alignAttr=k):(v(f),b.align(a,null,f),k=b.alignAttr);p&&0<=f.height?this.justifyDataLabel(b,a,k,n,f,d):B(a.crop,!0)&&(w=h.isInsidePlot(k.x,k.y)&&h.isInsidePlot(k.x+n.width,k.y+n.height));if(a.shape&&!m)b[d?"attr":"animate"]({anchorX:l?h.plotWidth-c.plotY:c.plotX,anchorY:l?h.plotHeight-c.plotX:c.plotY})}d&&e&&(b.placed=!1);w||e&&!p||(b.hide(!0),b.placed=!1)};w.prototype.setDataLabelStartPos=function(c,b,a,f,d){var g=this.chart,
h=g.inverted,l=this.xAxis,e=l.reversed,k=h?b.height/2:b.width/2;c=(c=c.pointWidth)?c/2:0;l=h?d.x:e?-k-c:l.width-k+c;d=h?e?this.yAxis.height-k+c:-k-c:d.y;b.startXPos=l;b.startYPos=d;f?"hidden"===b.visibility&&(b.show(),b.attr({opacity:0}).animate({opacity:1})):b.attr({opacity:1}).animate({opacity:0},void 0,b.hide);g.hasRendered&&(a&&b.attr({x:b.startXPos,y:b.startYPos}),b.placed=!0)};w.prototype.justifyDataLabel=function(c,b,a,f,d,g){var h=this.chart,l=b.align,e=b.verticalAlign,k=c.box?0:c.padding||
0;var u=a.x+k;if(0>u){"right"===l?(b.align="left",b.inside=!0):b.x=-u;var t=!0}u=a.x+f.width-k;u>h.plotWidth&&("left"===l?(b.align="right",b.inside=!0):b.x=h.plotWidth-u,t=!0);u=a.y+k;0>u&&("bottom"===e?(b.verticalAlign="top",b.inside=!0):b.y=-u,t=!0);u=a.y+f.height-k;u>h.plotHeight&&("top"===e?(b.verticalAlign="bottom",b.inside=!0):b.y=h.plotHeight-u,t=!0);t&&(c.placed=!g,c.align(b,null,d));return t};h.pie&&(h.pie.prototype.dataLabelPositioners={radialDistributionY:function(c){return c.top+c.distributeBox.pos},
radialDistributionX:function(c,b,a,f){return c.getX(a<b.top+2||a>b.bottom-2?f:a,b.half,b)},justify:function(c,b,a){return a[0]+(c.half?-1:1)*(b+c.labelDistance)},alignToPlotEdges:function(c,b,a,f){c=c.getBBox().width;return b?c+f:a-c-f},alignToConnectors:function(c,b,a,f){var d=0,g;c.forEach(function(a){g=a.dataLabel.getBBox().width;g>d&&(d=g)});return b?d+f:a-d-f}},h.pie.prototype.drawDataLabels=function(){var c=this,b=c.data,a,f=c.chart,g=c.options.dataLabels,h=g.connectorPadding,m,r=f.plotWidth,
e=f.plotHeight,k=f.plotLeft,u=Math.round(f.chartWidth/3),p,v=c.center,A=v[2]/2,z=v[1],x,C,y,E,P=[[],[]],O,N,M,K,T=[0,0,0,0],Z=c.dataLabelPositioners,da;c.visible&&(g.enabled||c._hasPointLabels)&&(b.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),w.prototype.drawDataLabels.apply(c),b.forEach(function(a){a.dataLabel&&(a.visible?(P[a.half].push(a),a.dataLabel._pos=null,!D(g.style.width)&&
!D(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>u&&(a.dataLabel.css({width:.7*u}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),P.forEach(function(b,l){var u=b.length,t=[],n;if(u){c.sortByAngle(b,l-.5);if(0<c.maxLabelDistance){var m=Math.max(0,z-A-c.maxLabelDistance);var q=Math.min(z+A+c.maxLabelDistance,f.plotHeight);b.forEach(function(a){0<a.labelDistance&&
a.dataLabel&&(a.top=Math.max(0,z-A-a.labelDistance),a.bottom=Math.min(z+A+a.labelDistance,f.plotHeight),n=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+n/2,size:n,rank:a.y},t.push(a.distributeBox))});m=q+n-m;d.distribute(t,m,m/5)}for(K=0;K<u;K++){a=b[K];y=a.labelPosition;x=a.dataLabel;M=!1===a.visible?"hidden":"inherit";N=m=y.natural.y;t&&D(a.distributeBox)&&("undefined"===typeof a.distributeBox.pos?M="hidden":(E=a.distributeBox.size,N=Z.radialDistributionY(a)));
delete a.positionIndex;if(g.justify)O=Z.justify(a,A,v);else switch(g.alignTo){case "connectors":O=Z.alignToConnectors(b,l,r,k);break;case "plotEdges":O=Z.alignToPlotEdges(x,l,r,k);break;default:O=Z.radialDistributionX(c,a,N,m)}x._attr={visibility:M,align:y.alignment};x._pos={x:O+g.x+({left:h,right:-h}[y.alignment]||0),y:N+g.y-10};y.final.x=O;y.final.y=N;B(g.crop,!0)&&(C=x.getBBox().width,m=null,O-C<h&&1===l?(m=Math.round(C-O+h),T[3]=Math.max(m,T[3])):O+C>r-h&&0===l&&(m=Math.round(O+C-r+h),T[1]=Math.max(m,
T[1])),0>N-E/2?T[0]=Math.max(Math.round(-N+E/2),T[0]):N+E/2>e&&(T[2]=Math.max(Math.round(N+E/2-e),T[2])),x.sideOverflow=m)}}}),0===F(T)||this.verifyDataLabelOverflow(T))&&(this.placeDataLabels(),this.points.forEach(function(a){da=q(g,a.options.dataLabels);if(m=B(da.connectorWidth,1)){var e;p=a.connector;if((x=a.dataLabel)&&x._pos&&a.visible&&0<a.labelDistance){M=x._attr.visibility;if(e=!p)a.connector=p=f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?
" "+a.className:"")).add(c.dataLabelsGroup),f.styledMode||p.attr({"stroke-width":m,stroke:da.connectorColor||a.color||"#666666"});p[e?"attr":"animate"]({d:a.getConnectorPath()});p.attr("visibility",M)}else p&&(a.connector=p.destroy())}}))},h.pie.prototype.placeDataLabels=function(){this.points.forEach(function(c){var b=c.dataLabel,a;b&&c.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=Math.max(b.getBBox().width-b.sideOverflow,0),b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||
{}).textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}));delete c.distributeBox},this)},h.pie.prototype.alignDataLabel=g,h.pie.prototype.verifyDataLabelOverflow=function(c){var b=this.center,a=this.options,f=a.center,d=a.minSize||80,g=null!==a.size;if(!g){if(null!==f[0])var h=Math.max(b[2]-Math.max(c[1],c[3]),d);else h=Math.max(b[2]-c[1]-c[3],d),b[0]+=(c[3]-c[1])/2;null!==f[1]?h=E(h,d,b[2]-Math.max(c[0],c[2])):(h=E(h,d,b[2]-c[0]-
c[2]),b[1]+=(c[0]-c[2])/2);h<b[2]?(b[2]=h,b[3]=Math.min(p(a.innerSize||0,h),h),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):g=!0}return g});h.column&&(h.column.prototype.alignDataLabel=function(c,b,a,f,d){var g=this.chart.inverted,h=c.series,l=c.dlBox||c.shapeArgs,e=B(c.below,c.plotY>B(this.translatedThreshold,h.yAxis.len)),k=B(a.inside,!!this.options.stacking);l&&(f=q(l),0>f.y&&(f.height+=f.y,f.y=0),l=f.y+f.height-h.yAxis.len,0<l&&(f.height-=l),g&&(f={x:h.yAxis.len-f.y-f.height,
y:h.xAxis.len-f.x-f.width,width:f.height,height:f.width}),k||(g?(f.x+=e?0:f.width,f.width=0):(f.y+=e?f.height:0,f.height=0)));a.align=B(a.align,!g||k?"center":e?"right":"left");a.verticalAlign=B(a.verticalAlign,g||k?"middle":e?"top":"bottom");w.prototype.alignDataLabel.call(this,c,b,a,f,d);f&&(0>=f.height&&f.y===this.chart.plotHeight||0>=f.width&&0===f.x)&&(b.hide(!0),b.placed=!1);a.inside&&c.contrastColor&&b.css({color:c.contrastColor})})});K(y,"modules/overlapping-datalabels.src.js",[y["parts/Globals.js"],
y["parts/Utilities.js"]],function(d,g){var y=g.isArray,F=g.objectEach,E=g.pick;g=d.Chart;var D=d.addEvent,x=d.fireEvent;D(g,"render",function(){var d=[];(this.labelCollectors||[]).forEach(function(g){d=d.concat(g())});(this.yAxis||[]).forEach(function(g){g.options.stackLabels&&!g.options.stackLabels.allowOverlap&&F(g.stacks,function(g){F(g,function(g){d.push(g.label)})})});(this.series||[]).forEach(function(g){var v=g.options.dataLabels;g.visible&&(!1!==v.enabled||g._hasPointLabels)&&g.points.forEach(function(g){g.visible&&
(y(g.dataLabels)?g.dataLabels:g.dataLabel?[g.dataLabel]:[]).forEach(function(p){var m=p.options;p.labelrank=E(m.labelrank,g.labelrank,g.shapeArgs&&g.shapeArgs.height);m.allowOverlap||d.push(p)})})});this.hideOverlappingLabels(d)});g.prototype.hideOverlappingLabels=function(d){var g=this,v=d.length,p=g.renderer,z,m,q,w=!1;var h=function(b){var a=b.box?0:b.padding||0;var c=0;if(b&&(!b.alignAttr||b.placed)){var f=b.alignAttr||{x:b.attr("x"),y:b.attr("y")};var d=b.parentGroup;b.width||(c=b.getBBox(),
b.width=c.width,b.height=c.height,c=p.fontMetrics(null,b.element).h);return{x:f.x+(d.translateX||0)+a,y:f.y+(d.translateY||0)+a-c,width:b.width-2*a,height:b.height-2*a}}};for(m=0;m<v;m++)if(z=d[m])z.oldOpacity=z.opacity,z.newOpacity=1,z.absoluteBox=h(z);d.sort(function(b,a){return(a.labelrank||0)-(b.labelrank||0)});for(m=0;m<v;m++){var f=(h=d[m])&&h.absoluteBox;for(z=m+1;z<v;++z){var c=(q=d[z])&&q.absoluteBox;!f||!c||h===q||0===h.newOpacity||0===q.newOpacity||c.x>f.x+f.width||c.x+c.width<f.x||c.y>
f.y+f.height||c.y+c.height<f.y||((h.labelrank<q.labelrank?h:q).newOpacity=0)}}d.forEach(function(b){var a;if(b){var c=b.newOpacity;b.oldOpacity!==c&&(b.alignAttr&&b.placed?(c?b.show(!0):a=function(){b.hide(!0);b.placed=!1},w=!0,b.alignAttr.opacity=c,b[b.isOld?"animate":"attr"](b.alignAttr,null,a),x(g,"afterHideOverlappingLabel")):b.attr({opacity:c}));b.isOld=!0}});w&&x(g,"afterHideAllOverlappingLabels")}});K(y,"parts/Interaction.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=
g.defined,F=g.extend,E=g.isArray,D=g.isObject,x=g.objectEach,v=g.pick,C=d.addEvent;g=d.Chart;var B=d.createElement,p=d.css,z=d.defaultOptions,m=d.defaultPlotOptions,q=d.fireEvent,w=d.hasTouch,h=d.Legend,f=d.merge,c=d.Point,b=d.Series,a=d.seriesTypes,l=d.svg;var n=d.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,e=function(a){var e=c.getPointFromEvent(a);"undefined"!==typeof e&&(c.isDirectTouch=!0,e.onMouseOver(a))},f;a.points.forEach(function(a){f=E(a.dataLabels)?a.dataLabels:
a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);f.forEach(function(e){e.div?e.div.point=a:e.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(f){if(a[f]){a[f].addClass("highcharts-tracker").on("mouseover",e).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(w)a[f].on("touchstart",e);!b.styledMode&&a.options.cursor&&a[f].css(p).css({cursor:a.options.cursor})}}),a._hasTracking=!0);q(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,
c=b.trackByArea,e=[].concat(c?a.areaPath:a.graphPath),f=e.length,d=a.chart,g=d.pointer,h=d.renderer,m=d.options.tooltip.snap,n=a.tracker,p,v=function(){if(d.hoverSeries!==a)a.onMouseOver()},z="rgba(192,192,192,"+(l?.0001:.002)+")";if(f&&!c)for(p=f+1;p--;)"M"===e[p]&&e.splice(p+1,0,e[p+1]-m,e[p+2],"L"),(p&&"M"===e[p]||p===f)&&e.splice(p,0,"L",e[p-2]+m,e[p-1]);n?n.attr({d:e}):a.graph&&(a.tracker=h.path(e).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":
"highcharts-tracker-line").add(a.group),d.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:z,fill:c?z:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*m)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",v).on("mouseout",function(a){g.onTrackerMouseOut(a)});b.cursor&&!d.styledMode&&a.css({cursor:b.cursor});if(w)a.on("touchstart",v)}));q(this,"afterDrawTracker")}};a.column&&(a.column.prototype.drawTracker=n.drawTrackerPoint);a.pie&&(a.pie.prototype.drawTracker=
n.drawTrackerPoint);a.scatter&&(a.scatter.prototype.drawTracker=n.drawTrackerPoint);F(h.prototype,{setItemEvents:function(a,b,d){var e=this,k=e.chart.renderer.boxWrapper,g=a instanceof c,h="highcharts-legend-"+(g?"point":"series")+"-active",l=e.chart.styledMode;(d?b:a.legendGroup).on("mouseover",function(){a.visible&&e.allItems.forEach(function(e){a!==e&&e.setState("inactive",!g)});a.setState("hover");a.visible&&k.addClass(h);l||b.css(e.options.itemHoverStyle)}).on("mouseout",function(){e.chart.styledMode||
b.css(f(a.visible?e.itemStyle:e.itemHiddenStyle));e.allItems.forEach(function(e){a!==e&&e.setState("",!g)});k.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible();e.allItems.forEach(function(e){a!==e&&e.setState(a.visible?"inactive":"",!g)})};k.removeClass(h);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):q(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=B("input",{type:"checkbox",className:"highcharts-legend-checkbox",
checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){q(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});F(g.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=z.lang,e=b.options.chart.resetZoomButton,f=e.theme,d=f.states,g="chart"===e.relativeTo||"spaceBox"===e.relativeTo?null:"plotBox";q(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,
null,null,a,f,d&&d.hover).attr({align:e.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,!1,g)});q(this,"afterShowResetZoom")},zoomOut:function(){q(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b=this,c,e=b.pointer,f=!1,d=b.inverted?e.mouseDownX:e.mouseDownY;!a||a.resetSelection?(b.axes.forEach(function(a){c=a.zoom()}),e.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var k=a.axis,g=b.inverted?k.left:k.top,h=b.inverted?
g+k.width:g+k.height,l=k.isXAxis,u=!1;if(!l&&d>=g&&d<=h||l||!y(d))u=!0;e[l?"zoomX":"zoomY"]&&u&&(c=k.zoom(a.min,a.max),k.displayBtn&&(f=!0))});var g=b.resetZoomButton;f&&!g?b.showResetZoom():!f&&D(g)&&(b.resetZoomButton=g.destroy());c&&b.redraw(v(b.options.chart.animation,a&&a.animation,100>b.pointCount))},pan:function(a,b){var c=this,e=c.hoverPoints,f=c.options.chart,d;b="object"===typeof b?b:{enabled:b,type:"x"};f&&f.panning&&(f.panning=b);var g=b.type;q(this,"pan",{originalEvent:a},function(){e&&
e.forEach(function(a){a.setState()});var b=[1];"xy"===g?b=[1,0]:"y"===g&&(b=[0]);b.forEach(function(e){var b=c[e?"xAxis":"yAxis"][0],f=b.options,g=b.horiz,k=a[g?"chartX":"chartY"];g=g?"mouseDownX":"mouseDownY";var h=c[g],l=(b.pointRange||0)/2,u=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,r=b.getExtremes(),m=b.toValue(h-k,!0)+l*u;u=b.toValue(h+b.len-k,!0)-l*u;var t=u<m;h=t?u:m;m=t?m:u;u=Math.min(r.dataMin,l?r.min:b.toValue(b.toPixels(r.min)-b.minPixelPadding));l=Math.max(r.dataMax,l?r.max:
b.toValue(b.toPixels(r.max)+b.minPixelPadding));if(!f.ordinal){e&&(f=u-h,0<f&&(m+=f,h=u),f=m-l,0<f&&(m=l,h-=f));if(b.series.length&&h!==r.min&&m!==r.max&&e||b.panningState&&h>=b.panningState.startMin&&m<=b.panningState.startMax)b.setExtremes(h,m,!1,!1,{trigger:"pan"}),d=!0;c[g]=k}});d&&c.redraw(!1);p(c.container,{cursor:"move"})})}});F(c.prototype,{select:function(a,b){var c=this,e=c.series,f=e.chart;this.selectedStaging=a=v(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=
c.options.selected=a;e.options.data[e.data.indexOf(c)]=c.options;c.setState(a&&"select");b||f.getSelectedPoints().forEach(function(a){var e=a.series;a.selected&&a!==c&&(a.selected=a.options.selected=!1,e.options.data[e.data.indexOf(a)]=a.options,a.setState(f.hoverPoints&&e.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})});delete this.selectedStaging},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);
c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=this,b=f(a.series.options.point,a.options).events;a.events=b;x(b,function(b,e){d.isFunction(b)&&C(a,e,b)});this.hasImportedEvents=!0}},setState:function(a,b){var c=this.series,e=this.state,f=c.options.states[a||
"normal"]||{},d=m[c.type].marker&&c.options.marker,g=d&&!1===d.enabled,h=d&&d.states&&d.states[a||"normal"]||{},l=!1===h.enabled,n=c.stateMarkerGraphic,t=this.marker||{},p=c.chart,w=c.halo,z,x=d&&c.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===f.enabled||a&&(l||g&&!1===h.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){this.state=a;x&&(z=c.markerAttribs(this,a));if(this.graphic){e&&this.graphic.removeClass("highcharts-point-"+e);a&&this.graphic.addClass("highcharts-point-"+
a);if(!p.styledMode){var B=c.pointAttribs(this,a);var y=v(p.options.chart.animation,f.animation);c.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:B.opacity},y)}),this.connector&&this.connector.animate({opacity:B.opacity},y));this.graphic.animate(B,y)}z&&this.graphic.animate(z,v(p.options.chart.animation,h.animation,d.animation));n&&n.hide()}else{if(a&&h){e=t.symbol||c.symbol;n&&n.currentSymbol!==e&&(n=n.destroy());if(z)if(n)n[b?"animate":"attr"]({x:z.x,
y:z.y});else e&&(c.stateMarkerGraphic=n=p.renderer.symbol(e,z.x,z.y,z.width,z.height).add(c.markerGroup),n.currentSymbol=e);!p.styledMode&&n&&n.attr(c.pointAttribs(this,a))}n&&(n[a&&this.isInside?"show":"hide"](),n.element.point=this)}a=f.halo;f=(n=this.graphic||n)&&n.visibility||"inherit";a&&a.size&&n&&"hidden"!==f&&!this.isCluster?(w||(c.halo=w=p.renderer.path().add(n.parentGroup)),w.show()[b?"animate":"attr"]({d:this.haloPath(a.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+v(this.colorIndex,
c.colorIndex)+(this.className?" "+this.className:""),visibility:f,zIndex:-1}),w.point=this,p.styledMode||w.attr(F({fill:this.color||c.color,"fill-opacity":a.opacity},a.attributes))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)},null,w.hide);q(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});F(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();
this.options.events.mouseOver&&q(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,e=b.hoverPoint;b.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&q(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})},setState:function(a,b){var c=this,e=c.options,f=c.graph,d=e.inactiveOtherPoints,g=e.states,h=e.lineWidth,l=e.opacity,m=v(g[a||
"normal"]&&g[a||"normal"].animation,c.chart.options.chart.animation);e=0;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(e){e&&(c.state&&e.removeClass("highcharts-series-"+c.state),a&&e.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(g[a]&&!1===g[a].enabled)return;a&&(h=g[a].lineWidth||h+(g[a].lineWidthPlus||0),l=v(g[a].opacity,l));if(f&&!f.dashstyle)for(g={"stroke-width":h},f.animate(g,m);c["zone-graph-"+e];)c["zone-graph-"+e].attr(g),e+=
1;d||[c.group,c.markerGroup,c.dataLabelsGroup,c.labelBySeries].forEach(function(a){a&&a.animate({opacity:l},m)})}b&&d&&c.points&&c.setAllPointsToState(a)},setAllPointsToState:function(a){this.points.forEach(function(b){b.setState&&b.setState(a)})},setVisible:function(a,b){var c=this,e=c.chart,f=c.legendItem,d=e.options.chart.ignoreHiddenSeries,g=c.visible;var h=(c.visible=a=c.options.visible=c.userOptions.visible="undefined"===typeof a?!g:a)?"show":"hide";["group","dataLabelsGroup","markerGroup",
"tracker","tt"].forEach(function(a){if(c[a])c[a][h]()});if(e.hoverSeries===c||(e.hoverPoint&&e.hoverPoint.series)===c)c.onMouseOut();f&&e.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&e.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(e){e.setVisible(a,!1)});d&&(e.isDirtyBox=!0);q(c,h);!1!==b&&e.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=
"undefined"===typeof a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);q(this,a?"select":"unselect")},drawTracker:n.drawTrackerGraph})});K(y,"parts/Responsive.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.isArray,F=g.isObject,E=g.objectEach,D=g.pick,x=g.splat;g=d.Chart;g.prototype.setResponsive=function(g,x){var v=this.options.responsive,p=[],z=this.currentResponsive;!x&&v&&v.rules&&v.rules.forEach(function(g){"undefined"===typeof g._id&&(g._id=d.uniqueKey());
this.matchResponsiveRule(g,p)},this);x=d.merge.apply(0,p.map(function(g){return d.find(v.rules,function(d){return d._id===g}).chartOptions}));x.isResponsiveOptions=!0;p=p.toString()||void 0;p!==(z&&z.ruleIds)&&(z&&this.update(z.undoOptions,g,!0),p?(z=this.currentOptions(x),z.isResponsiveOptions=!0,this.currentResponsive={ruleIds:p,mergedOptions:x,undoOptions:z},this.update(x,g,!0)):this.currentResponsive=void 0)};g.prototype.matchResponsiveRule=function(d,g){var v=d.condition;(v.callback||function(){return this.chartWidth<=
D(v.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=D(v.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=D(v.minWidth,0)&&this.chartHeight>=D(v.minHeight,0)}).call(this)&&g.push(d._id)};g.prototype.currentOptions=function(d){function g(d,m,p,w){var h;E(d,function(f,c){if(!w&&-1<v.collectionsWithUpdate.indexOf(c))for(f=x(f),p[c]=[],h=0;h<f.length;h++)m[c][h]&&(p[c][h]={},g(f[h],m[c][h],p[c][h],w+1));else F(f)?(p[c]=y(f)?[]:{},g(f,m[c]||{},p[c],w+1)):p[c]="undefined"===typeof m[c]?null:m[c]})}var v=this,
p={};g(d,this.options,p,0);return p}});K(y,"masters/highcharts.src.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.extend;y(d,{animObject:g.animObject,arrayMax:g.arrayMax,arrayMin:g.arrayMin,attr:g.attr,correctFloat:g.correctFloat,defined:g.defined,destroyObjectProperties:g.destroyObjectProperties,discardElement:g.discardElement,erase:g.erase,extend:g.extend,extendClass:g.extendClass,isArray:g.isArray,isClass:g.isClass,isDOMElement:g.isDOMElement,isNumber:g.isNumber,isObject:g.isObject,
isString:g.isString,numberFormat:g.numberFormat,objectEach:g.objectEach,offset:g.offset,pad:g.pad,pick:g.pick,pInt:g.pInt,relativeLength:g.relativeLength,setAnimation:g.setAnimation,splat:g.splat,syncTimeout:g.syncTimeout,wrap:g.wrap});return d});K(y,"parts/Scrollbar.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){function y(d,f,c){this.init(d,f,c)}var F=g.correctFloat,E=g.defined,D=g.destroyObjectProperties,x=g.pick,v=d.addEvent;g=d.Axis;var C=d.defaultOptions,B=d.fireEvent,p=d.hasTouch,
z=d.merge,m=d.removeEvent,q,w={height:d.isTouchDevice?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:void 0,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};C.scrollbar=z(!0,w,C.scrollbar);d.swapXY=q=function(d,f){var c=d.length;
if(f)for(f=0;f<c;f+=3){var b=d[f+1];d[f+1]=d[f+2];d[f+2]=b}return d};y.prototype={init:function(d,f,c){this.scrollbarButtons=[];this.renderer=d;this.userOptions=f;this.options=z(w,f);this.chart=c;this.size=x(this.options.size,this.options.height);f.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var d=this.renderer,f=this.options,c=this.size,b=this.chart.styledMode,a;this.group=a=d.g("scrollbar").attr({zIndex:f.zIndex,translateY:-99999}).add();this.track=d.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:f.trackBorderRadius||0,height:c,width:c}).add(a);b||this.track.attr({fill:f.trackBackgroundColor,stroke:f.trackBorderColor,"stroke-width":f.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=d.g().add(a);this.scrollbar=d.rect().addClass("highcharts-scrollbar-thumb").attr({height:c,width:c,r:f.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=d.path(q(["M",-3,c/4,"L",-3,2*c/3,"M",0,c/4,"L",0,2*c/3,
"M",3,c/4,"L",3,2*c/3],f.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);b||(this.scrollbar.attr({fill:f.barBackgroundColor,stroke:f.barBorderColor,"stroke-width":f.barBorderWidth}),this.scrollbarRifles.attr({stroke:f.rifleColor,"stroke-width":1}));this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(d,
f,c,b){var a=this.options.vertical,g=0,h=this.rendered?"animate":"attr";this.x=d;this.y=f+this.trackBorderWidth;this.width=c;this.xOffset=this.height=b;this.yOffset=g;a?(this.width=this.yOffset=c=g=this.size,this.xOffset=f=0,this.barWidth=b-2*c,this.x=d+=this.options.margin):(this.height=this.xOffset=b=f=this.size,this.barWidth=c-2*b,this.y+=this.options.margin);this.group[h]({translateX:d,translateY:this.y});this.track[h]({width:c,height:b});this.scrollbarButtons[1][h]({translateX:a?0:c-f,translateY:a?
b-g:0})},drawScrollbarButton:function(d){var f=this.renderer,c=this.scrollbarButtons,b=this.options,a=this.size;var g=f.g().add(this.group);c.push(g);g=f.rect().addClass("highcharts-scrollbar-button").add(g);this.chart.styledMode||g.attr({stroke:b.buttonBorderColor,"stroke-width":b.buttonBorderWidth,fill:b.buttonBackgroundColor});g.attr(g.crisp({x:-.5,y:-.5,width:a+1,height:a+1,r:b.buttonBorderRadius},g.strokeWidth()));g=f.path(q(["M",a/2+(d?-1:1),a/2-3,"L",a/2+(d?-1:1),a/2+3,"L",a/2+(d?2:-2),a/2],
b.vertical)).addClass("highcharts-scrollbar-arrow").add(c[d]);this.chart.styledMode||g.attr({fill:b.buttonArrowColor})},setRange:function(d,f){var c=this.options,b=c.vertical,a=c.minWidth,g=this.barWidth,h,m=!this.rendered||this.hasDragged||this.chart.navigator&&this.chart.navigator.hasDragged?"attr":"animate";if(E(g)){d=Math.max(d,0);var p=Math.ceil(g*d);this.calculatedWidth=h=F(g*Math.min(f,1)-p);h<a&&(p=(g-a+h)*d,h=a);a=Math.floor(p+this.xOffset+this.yOffset);g=h/2-.5;this.from=d;this.to=f;b?(this.scrollbarGroup[m]({translateY:a}),
this.scrollbar[m]({height:h}),this.scrollbarRifles[m]({translateY:g}),this.scrollbarTop=a,this.scrollbarLeft=0):(this.scrollbarGroup[m]({translateX:a}),this.scrollbar[m]({width:h}),this.scrollbarRifles[m]({translateX:g}),this.scrollbarLeft=a,this.scrollbarTop=0);12>=h?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0);!1===c.showFull&&(0>=d&&1<=f?this.group.hide():this.group.show());this.rendered=!0}},initEvents:function(){var d=this;d.mouseMoveHandler=function(f){var c=d.chart.pointer.normalize(f),
b=d.options.vertical?"chartY":"chartX",a=d.initPositions;!d.grabbedCenter||f.touches&&0===f.touches[0][b]||(c=d.cursorToScrollbarPosition(c)[b],b=d[b],b=c-b,d.hasDragged=!0,d.updatePosition(a[0]+b,a[1]+b),d.hasDragged&&B(d,"changed",{from:d.from,to:d.to,trigger:"scrollbar",DOMType:f.type,DOMEvent:f}))};d.mouseUpHandler=function(f){d.hasDragged&&B(d,"changed",{from:d.from,to:d.to,trigger:"scrollbar",DOMType:f.type,DOMEvent:f});d.grabbedCenter=d.hasDragged=d.chartX=d.chartY=null};d.mouseDownHandler=
function(f){f=d.chart.pointer.normalize(f);f=d.cursorToScrollbarPosition(f);d.chartX=f.chartX;d.chartY=f.chartY;d.initPositions=[d.from,d.to];d.grabbedCenter=!0};d.buttonToMinClick=function(f){var c=F(d.to-d.from)*d.options.step;d.updatePosition(F(d.from-c),F(d.to-c));B(d,"changed",{from:d.from,to:d.to,trigger:"scrollbar",DOMEvent:f})};d.buttonToMaxClick=function(f){var c=(d.to-d.from)*d.options.step;d.updatePosition(d.from+c,d.to+c);B(d,"changed",{from:d.from,to:d.to,trigger:"scrollbar",DOMEvent:f})};
d.trackClick=function(f){var c=d.chart.pointer.normalize(f),b=d.to-d.from,a=d.y+d.scrollbarTop,g=d.x+d.scrollbarLeft;d.options.vertical&&c.chartY>a||!d.options.vertical&&c.chartX>g?d.updatePosition(d.from+b,d.to+b):d.updatePosition(d.from-b,d.to-b);B(d,"changed",{from:d.from,to:d.to,trigger:"scrollbar",DOMEvent:f})}},cursorToScrollbarPosition:function(d){var f=this.options;f=f.minWidth>this.calculatedWidth?f.minWidth:0;return{chartX:(d.chartX-this.x-this.xOffset)/(this.barWidth-f),chartY:(d.chartY-
this.y-this.yOffset)/(this.barWidth-f)}},updatePosition:function(d,f){1<f&&(d=F(1-F(f-d)),f=1);0>d&&(f=F(f-d),d=0);this.from=d;this.to=f},update:function(d){this.destroy();this.init(this.chart.renderer,z(!0,this.options,d),this.chart)},addEvents:function(){var d=this.options.inverted?[1,0]:[0,1],f=this.scrollbarButtons,c=this.scrollbarGroup.element,b=this.mouseDownHandler,a=this.mouseMoveHandler,g=this.mouseUpHandler;d=[[f[d[0]].element,"click",this.buttonToMinClick],[f[d[1]].element,"click",this.buttonToMaxClick],
[this.track.element,"click",this.trackClick],[c,"mousedown",b],[c.ownerDocument,"mousemove",a],[c.ownerDocument,"mouseup",g]];p&&d.push([c,"touchstart",b],[c.ownerDocument,"touchmove",a],[c.ownerDocument,"touchend",g]);d.forEach(function(a){v.apply(null,a)});this._events=d},removeEvents:function(){this._events.forEach(function(d){m.apply(null,d)});this._events.length=0},destroy:function(){var d=this.chart.scroller;this.removeEvents();["track","scrollbarRifles","scrollbar","scrollbarGroup","group"].forEach(function(d){this[d]&&
this[d].destroy&&(this[d]=this[d].destroy())},this);d&&this===d.scrollbar&&(d.scrollbar=null,D(d.scrollbarButtons))}};d.Scrollbar||(v(g,"afterInit",function(){var g=this;g.options&&g.options.scrollbar&&g.options.scrollbar.enabled&&(g.options.scrollbar.vertical=!g.horiz,g.options.startOnTick=g.options.endOnTick=!1,g.scrollbar=new y(g.chart.renderer,g.options.scrollbar,g.chart),v(g.scrollbar,"changed",function(f){var c=Math.min(x(g.options.min,g.min),g.min,g.dataMin),b=Math.max(x(g.options.max,g.max),
g.max,g.dataMax)-c;if(g.horiz&&!g.reversed||!g.horiz&&g.reversed){var a=c+b*this.to;c+=b*this.from}else a=c+b*(1-this.from),c+=b*(1-this.to);x(this.options.liveRedraw,d.svg&&!d.isTouchDevice&&!this.chart.isBoosting)||"mouseup"===f.DOMType||!E(f.DOMType)?g.setExtremes(c,a,!0,"mousemove"!==f.DOMType,f):this.setRange(this.from,this.to)}))}),v(g,"afterRender",function(){var d=Math.min(x(this.options.min,this.min),this.min,x(this.dataMin,this.min)),f=Math.max(x(this.options.max,this.max),this.max,x(this.dataMax,
this.max)),c=this.scrollbar,b=this.axisTitleMargin+(this.titleOffset||0),a=this.chart.scrollbarsOffsets,g=this.options.margin||0;c&&(this.horiz?(this.opposite||(a[1]+=b),c.position(this.left,this.top+this.height+2+a[1]-(this.opposite?g:0),this.width,this.height),this.opposite||(a[1]+=g),b=1):(this.opposite&&(a[0]+=b),c.position(this.left+this.width+2+a[0]-(this.opposite?0:g),this.top,this.width,this.height),this.opposite&&(a[0]+=g),b=0),a[b]+=c.size+c.options.margin,isNaN(d)||isNaN(f)||!E(this.min)||
!E(this.max)||this.min===this.max?c.setRange(0,1):(a=(this.min-d)/(f-d),d=(this.max-d)/(f-d),this.horiz&&!this.reversed||!this.horiz&&this.reversed?c.setRange(a,d):c.setRange(1-d,1-a)))}),v(g,"afterGetOffset",function(){var d=this.horiz?2:1,f=this.scrollbar;f&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[d]+=f.size+f.options.margin)}),d.Scrollbar=y)});K(y,"parts/Navigator.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){function y(a){this.init(a)}var F=g.clamp,E=g.correctFloat,
D=g.defined,x=g.destroyObjectProperties,v=g.erase,C=g.extend,B=g.isArray,p=g.isNumber,z=g.pick,m=g.splat,q=d.addEvent,w=d.Axis;g=d.Chart;var h=d.color,f=d.defaultOptions,c=d.hasTouch,b=d.isTouchDevice,a=d.merge,l=d.removeEvent,n=d.Scrollbar,t=d.Series,I=function(a){for(var e=[],b=1;b<arguments.length;b++)e[b-1]=arguments[b];e=[].filter.call(e,p);if(e.length)return Math[a].apply(0,e)};var r="undefined"===typeof d.seriesTypes.areaspline?"line":"areaspline";C(f,{navigator:{height:40,margin:25,maskInside:!0,
handles:{width:7,height:15,symbols:["navigator-handle","navigator-handle"],enabled:!0,lineWidth:1,backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:h("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:r,fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",
[1,2,3,4]],["week",[1,2,3]],["month",[1,3,6]],["year",null]]},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},threshold:null},xAxis:{overscroll:0,className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,
endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});d.Renderer.prototype.symbols["navigator-handle"]=function(a,b,c,d,f){a=f.width/2;b=Math.round(a/3)+.5;f=f.height;return["M",-a-1,.5,"L",a,.5,"L",a,f+.5,"L",-a-1,f+.5,"L",-a-1,.5,"M",-b,4,"L",-b,f-3,"M",b-1,4,"L",b-1,f-3]};w.prototype.toFixedRange=function(a,b,c,d){var e=this.chart&&this.chart.fixedRange,f=(this.pointRange||0)/2;a=z(c,this.translate(a,!0,!this.horiz));b=z(d,this.translate(b,
!0,!this.horiz));var g=e&&(b-a)/e;D(c)||(a=E(a+f));D(d)||(b=E(b-f));.7<g&&1.3>g&&(d?a=b-e:b=a+e);p(a)&&p(b)||(a=b=void 0);return{min:a,max:b}};y.prototype={drawHandle:function(a,b,c,d){var e=this.navigatorOptions.handles.height;this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2),translateY:Math.round(this.top+parseInt(a,10)+.5-e)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-e/2-1)})},drawOutline:function(a,b,c,d){var e=this.navigatorOptions.maskInside,
f=this.outline.strokeWidth(),g=f/2;f=f%2/2;var k=this.outlineHeight,h=this.scrollbarHeight,l=this.size,u=this.left-h,m=this.top;c?(u-=g,c=m+b+f,b=m+a+f,a=["M",u+k,m-h-f,"L",u+k,c,"L",u,c,"L",u,b,"L",u+k,b,"L",u+k,m+l+h].concat(e?["M",u+k,c-g,"L",u+k,b+g]:[])):(a+=u+h-f,b+=u+h-f,m+=g,a=["M",u,m,"L",a,m,"L",a,m+k,"L",b,m+k,"L",b,m,"L",u+l+2*h,m].concat(e?["M",a-g,m,"L",b+g,m]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var e=this.left,f=this.top,g=this.height;if(c){var k=[e,e,e];var h=
[f,f+a,f+b];var l=[g,g,g];var u=[a,b-a,this.size-b]}else k=[e,e+a,e+b],h=[f,f,f],l=[a,b-a,this.size-b],u=[g,g,g];this.shades.forEach(function(a,b){a[d]({x:k[b],y:h[b],width:l[b],height:u[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,d=a.chart,f=d.renderer,g,h={cursor:d.inverted?"ns-resize":"ew-resize"};a.navigatorGroup=g=f.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();[!c,c,!c].forEach(function(e,c){a.shades[c]=f.rect().addClass("highcharts-navigator-mask"+
(1===c?"-inside":"-outside")).add(g);d.styledMode||a.shades[c].attr({fill:e?b.maskFill:"rgba(0,0,0,0)"}).css(1===c&&h)});a.outline=f.path().addClass("highcharts-navigator-outline").add(g);d.styledMode||a.outline.attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor});b.handles.enabled&&[0,1].forEach(function(e){b.handles.inverted=d.inverted;a.handles[e]=f.symbol(b.handles.symbols[e],-b.handles.width/2-1,0,b.handles.width,b.handles.height,b.handles);a.handles[e].attr({zIndex:7-e}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+
["left","right"][e]).add(g);if(!d.styledMode){var c=b.handles;a.handles[e].attr({fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.lineWidth}).css(h)}})},update:function(b){(this.series||[]).forEach(function(a){a.baseSeries&&delete a.baseSeries.navigatorSeries});this.destroy();a(!0,this.chart.options.navigator,this.options,b);this.init(this.chart)},render:function(a,b,c,d){var e=this.chart,f=this.scrollbarHeight,g,k=this.xAxis,h=k.pointRange||0;var l=k.fake?e.xAxis[0]:k;var u=this.navigatorEnabled,
m,n=this.rendered;var r=e.inverted;var t=e.xAxis[0].minRange,q=e.xAxis[0].options.maxRange;if(!this.hasDragged||D(c)){a=E(a-h/2);b=E(b+h/2);if(!p(a)||!p(b))if(n)c=0,d=z(k.width,l.width);else return;this.left=z(k.left,e.plotLeft+f+(r?e.plotWidth:0));this.size=m=g=z(k.len,(r?e.plotHeight:e.plotWidth)-2*f);e=r?f:g+2*f;c=z(c,k.toPixels(a,!0));d=z(d,k.toPixels(b,!0));p(c)&&Infinity!==Math.abs(c)||(c=0,d=e);a=k.toValue(c,!0);b=k.toValue(d,!0);var w=Math.abs(E(b-a));w<t?this.grabbedLeft?c=k.toPixels(b-t-
h,!0):this.grabbedRight&&(d=k.toPixels(a+t+h,!0)):D(q)&&E(w-h)>q&&(this.grabbedLeft?c=k.toPixels(b-q-h,!0):this.grabbedRight&&(d=k.toPixels(a+q+h,!0)));this.zoomedMax=F(Math.max(c,d),0,m);this.zoomedMin=F(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(c,d),0,m);this.range=this.zoomedMax-this.zoomedMin;m=Math.round(this.zoomedMax);c=Math.round(this.zoomedMin);u&&(this.navigatorGroup.attr({visibility:"visible"}),n=n&&!this.hasDragged?"animate":"attr",this.drawMasks(c,m,r,n),this.drawOutline(c,
m,r,n),this.navigatorOptions.handles.enabled&&(this.drawHandle(c,0,r,n),this.drawHandle(m,1,r,n)));this.scrollbar&&(r?(r=this.top-f,l=this.left-f+(u||!l.opposite?0:(l.titleOffset||0)+l.axisTitleMargin),f=g+2*f):(r=this.top+(u?this.height:-f),l=this.left-f),this.scrollbar.position(l,r,e,f),this.scrollbar.setRange(this.zoomedMin/(g||1),this.zoomedMax/(g||1)));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,d=b.container,f=[],g,h;a.mouseMoveHandler=g=function(b){a.onMouseMove(b)};a.mouseUpHandler=
h=function(b){a.onMouseUp(b)};f=a.getPartsEvents("mousedown");f.push(q(b.renderTo,"mousemove",g),q(d.ownerDocument,"mouseup",h));c&&(f.push(q(b.renderTo,"touchmove",g),q(d.ownerDocument,"touchend",h)),f.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=f;a.series&&a.series[0]&&f.push(q(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,e=[];["shades","handles"].forEach(function(c){b[c].forEach(function(d,f){e.push(q(d.element,
a,function(a){b[c+"Mousedown"](a,f)}))})});return e},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var e=this.chart,c=this.xAxis,d=this.zoomedMin,f=this.left,g=this.size,k=this.range,h=a.chartX;e.inverted&&(h=a.chartY,f=this.top);if(1===b)this.grabbedCenter=h,this.fixedWidth=k,this.dragOffset=h-d;else{a=h-f-k/2;if(0===b)a=Math.max(0,a);else if(2===b&&a+k>=g)if(a=g-k,this.reversedExtremes){a-=k;var l=this.getUnionExtremes().dataMin}else var m=this.getUnionExtremes().dataMax;a!==d&&
(this.fixedWidth=k,b=c.toFixedRange(a,a+k,l,m),D(b.min)&&e.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"}))}},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var e=a.xAxis[0],c=this.reversedExtremes;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=c?e.min:e.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=c?e.max:e.min);a.fixedRange=null},onMouseMove:function(a){var e=
this,c=e.chart,f=e.left,g=e.navigatorSize,h=e.range,l=e.dragOffset,m=c.inverted;a.touches&&0===a.touches[0].pageX||(a=c.pointer.normalize(a),c=a.chartX,m&&(f=e.top,c=a.chartY),e.grabbedLeft?(e.hasDragged=!0,e.render(0,0,c-f,e.otherHandlePos)):e.grabbedRight?(e.hasDragged=!0,e.render(0,0,e.otherHandlePos,c-f)):e.grabbedCenter&&(e.hasDragged=!0,c<l?c=l:c>g+l-h&&(c=g+l-h),e.render(0,0,c-l,c-l+h)),e.hasDragged&&e.scrollbar&&z(e.scrollbar.options.liveRedraw,d.svg&&!b&&!this.chart.isBoosting)&&(a.DOMType=
a.type,setTimeout(function(){e.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,e=this.xAxis,c=this.scrollbar,d=a.DOMEvent||a;if(this.hasDragged&&(!c||!c.hasDragged)||"scrollbar"===a.trigger){c=this.getUnionExtremes();if(this.zoomedMin===this.otherHandlePos)var f=this.fixedExtreme;else if(this.zoomedMax===this.otherHandlePos)var g=this.fixedExtreme;this.zoomedMax===this.size&&(g=this.reversedExtremes?c.dataMin:c.dataMax);0===this.zoomedMin&&(f=this.reversedExtremes?c.dataMax:c.dataMin);
e=e.toFixedRange(this.zoomedMin,this.zoomedMax,f,g);D(e.min)&&b.xAxis[0].setExtremes(Math.min(e.min,e.max),Math.max(e.min,e.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:d})}"mousemove"!==a.DOMType&&"touchmove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(this.eventsToUnbind.forEach(function(a){a()}),
this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&a.forEach(function(a){l(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&l(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(b){var e=b.options,c=e.navigator,d=c.enabled,f=e.scrollbar,g=f.enabled;e=d?c.height:0;var h=g?f.height:0;this.handles=[];this.shades=[];this.chart=
b;this.setBaseSeries();this.height=e;this.scrollbarHeight=h;this.scrollbarEnabled=g;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=f;this.outlineHeight=e+h;this.opposite=z(c.opposite,!(d||!b.inverted));var l=this;d=l.baseSeries;f=b.xAxis.length;g=b.yAxis.length;var m=d&&d[0]&&d[0].xAxis||b.xAxis[0]||{options:{}};b.isDirtyBox=!0;l.navigatorEnabled?(l.xAxis=new w(b,a({breaks:m.options.breaks,ordinal:m.options.ordinal},c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,
type:"datetime",index:f,isInternal:!0,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},b.inverted?{offsets:[h,0,-h,0],width:e}:{offsets:[0,-h,0,h],height:e})),l.yAxis=new w(b,a(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:g,isInternal:!0,zoomEnabled:!1},b.inverted?{width:e}:{height:e})),d||c.series.data?l.updateNavigatorSeries(!1):0===b.series.length&&(l.unbindRedraw=q(b,"beforeRedraw",function(){0<b.series.length&&!l.series&&(l.setBaseSeries(),
l.unbindRedraw())})),l.reversedExtremes=b.inverted&&!l.xAxis.reversed||!b.inverted&&l.xAxis.reversed,l.renderElements(),l.addMouseEvents()):l.xAxis={translate:function(a,e){var c=b.xAxis[0],d=c.getExtremes(),f=c.len-2*h,g=I("min",c.options.min,d.dataMin);c=I("max",c.options.max,d.dataMax)-g;return e?a*c/f+g:f*(a-g)/c},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:w.prototype.toFixedRange,fake:!0};b.options.scrollbar.enabled&&(b.scrollbar=
l.scrollbar=new n(b.renderer,a(b.options.scrollbar,{margin:l.navigatorEnabled?0:10,vertical:b.inverted}),b),q(l.scrollbar,"changed",function(a){var e=l.size,c=e*this.to;e*=this.from;l.hasDragged=l.scrollbar.hasDragged;l.render(0,0,e,c);(b.options.scrollbar.liveRedraw||"mousemove"!==a.DOMType&&"touchmove"!==a.DOMType)&&setTimeout(function(){l.onMouseUp(a)})}));l.addBaseSeriesEvents();l.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],e=this.xAxis,c=e.options,d=b.options,f;a&&
null===b.dataMin||(f={dataMin:z(c&&c.min,I("min",d.min,b.dataMin,e.dataMin,e.min)),dataMax:z(c&&c.max,I("max",d.max,b.dataMax,e.dataMax,e.max))});return f},setBaseSeries:function(a,b){var e=this.chart,c=this.baseSeries=[];a=a||e.options&&e.options.navigator.baseSeries||(e.series.length?d.find(e.series,function(a){return!a.options.isInternal}).index:0);(e.series||[]).forEach(function(b,e){b.options.isInternal||!b.options.showInNavigator&&(e!==a&&b.options.id!==a||!1===b.options.showInNavigator)||c.push(b)});
this.xAxis&&!this.xAxis.fake&&this.updateNavigatorSeries(!0,b)},updateNavigatorSeries:function(b,c){var e=this,d=e.chart,g=e.baseSeries,k,h,n=e.navigatorOptions.series,r,t={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,states:{inactive:{opacity:1}}},p=e.series=(e.series||[]).filter(function(a){var b=a.baseSeries;return 0>g.indexOf(b)?(b&&(l(b,"updatedData",e.updatedDataHandler),delete b.navigatorSeries),
a.chart&&a.destroy(),!1):!0});g&&g.length&&g.forEach(function(b){var l=b.navigatorSeries,m=C({color:b.color,visible:b.visible},B(n)?f.navigator.series:n);l&&!1===e.navigatorOptions.adaptToUpdatedData||(t.name="Navigator "+g.length,k=b.options||{},r=k.navigatorOptions||{},h=a(k,t,m,r),h.pointRange=z(m.pointRange,r.pointRange,f.plotOptions[h.type||"line"].pointRange),m=r.data||m.data,e.hasNavigatorData=e.hasNavigatorData||!!m,h.data=m||k.data&&k.data.slice(0),l&&l.options?l.update(h,c):(b.navigatorSeries=
d.initSeries(h),b.navigatorSeries.baseSeries=b,p.push(b.navigatorSeries)))});if(n.data&&(!g||!g.length)||B(n))e.hasNavigatorData=!1,n=m(n),n.forEach(function(b,c){t.name="Navigator "+(p.length+1);h=a(f.navigator.series,{color:d.series[c]&&!d.series[c].options.isInternal&&d.series[c].color||d.options.colors[c]||d.options.colors[0]},t,b);h.data=b.data;h.data&&(e.hasNavigatorData=!0,p.push(d.initSeries(h)))});b&&this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];
b[0]&&b[0].xAxis&&q(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);b.forEach(function(b){q(b,"show",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!0,!1)});q(b,"hide",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!1,!1)});!1!==this.navigatorOptions.adaptToUpdatedData&&b.xAxis&&q(b,"updatedData",this.updatedDataHandler);q(b,"remove",function(){this.navigatorSeries&&(v(a.series,this.navigatorSeries),D(this.navigatorSeries.options)&&this.navigatorSeries.remove(!1),
delete this.navigatorSeries)})},this)},getBaseSeriesMin:function(a){return this.baseSeries.reduce(function(a,b){return Math.min(a,b.xData?b.xData[0]:a)},a)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;"undefined"!==typeof a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,d=b.dataMax;b=b.max-b.min;var f=a.stickToMin,g=a.stickToMax,
h=z(this.options.overscroll,0),l=a.series&&a.series[0],m=!!this.setExtremes;if(!this.eventArgs||"rangeSelectorButton"!==this.eventArgs.trigger){if(f){var n=c;var r=n+b}g&&(r=d+h,f||(n=Math.max(r-b,a.getBaseSeriesMin(l&&l.xData?l.xData[0]:-Number.MAX_VALUE))));m&&(f||g)&&p(n)&&(this.min=this.userMin=n,this.max=this.userMax=r)}a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries,c=a.getBaseSeriesMin(this.xData[0]);a.stickToMax=a.reversedExtremes?
0===Math.round(a.zoomedMin):Math.round(a.zoomedMax)>=Math.round(a.size);a.stickToMin=p(this.xAxis.min)&&this.xAxis.min<=c&&(!this.chart.fixedRange||!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){this.eventsToUnbind||(this.eventsToUnbind=[]);this.eventsToUnbind.push(q(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);
b&&a.render(b.min,b.max)}),q(this.chart,"getMargins",function(){var a=this.navigator,b=a.opposite?"plotTop":"marginBottom";this.inverted&&(b=a.opposite?"marginRight":"plotLeft");this[b]=(this[b]||0)+(a.navigatorEnabled||!this.inverted?a.outlineHeight:0)+a.navigatorOptions.margin}))},destroy:function(){this.removeEvents();this.xAxis&&(v(this.chart.xAxis,this.xAxis),v(this.chart.axes,this.xAxis));this.yAxis&&(v(this.chart.yAxis,this.yAxis),v(this.chart.axes,this.yAxis));(this.series||[]).forEach(function(a){a.destroy&&
a.destroy()});"series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);[this.handles].forEach(function(a){x(a)},this)}};d.Navigator||(d.Navigator=y,q(w,"zoom",function(a){var e=this.chart.options,c=e.chart.zoomType,d=e.chart.pinchType,f=e.navigator;e=e.rangeSelector;this.isXAxis&&(f&&f.enabled||e&&e.enabled)&&("y"===c?a.zoomed=!1:(!b&&"xy"===c||
b&&"xy"===d)&&this.options.range&&(c=this.previousZoom,D(a.newMin)?this.previousZoom=[this.min,this.max]:c&&(a.newMin=c[0],a.newMax=c[1],delete this.previousZoom)));"undefined"!==typeof a.zoomed&&a.preventDefault()}),q(g,"beforeShowResetZoom",function(){var a=this.options,c=a.navigator,d=a.rangeSelector;if((c&&c.enabled||d&&d.enabled)&&(!b&&"x"===a.chart.zoomType||b&&"x"===a.chart.pinchType))return!1}),q(g,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=
this.navigator=new y(this)}),q(g,"afterSetChartSize",function(){var a=this.legend,b=this.navigator;if(b){var c=a&&a.options;var d=b.xAxis;var f=b.yAxis;var g=b.scrollbarHeight;this.inverted?(b.left=b.opposite?this.chartWidth-g-b.height:this.spacing[3]+g,b.top=this.plotTop+g):(b.left=this.plotLeft+g,b.top=b.navigatorOptions.top||this.chartHeight-b.height-g-this.spacing[2]-(this.rangeSelector&&this.extraBottomMargin?this.rangeSelector.getHeight():0)-(c&&"bottom"===c.verticalAlign&&c.enabled&&!c.floating?
a.legendHeight+z(c.margin,10):0)-(this.titleOffset?this.titleOffset[2]:0));d&&f&&(this.inverted?d.options.left=f.options.left=b.left:d.options.top=f.options.top=b.top,d.setAxisSize(),f.setAxisSize())}}),q(g,"update",function(b){var e=b.options.navigator||{},c=b.options.scrollbar||{};this.navigator||this.scroller||!e.enabled&&!c.enabled||(a(!0,this.options.navigator,e),a(!0,this.options.scrollbar,c),delete b.options.navigator,delete b.options.scrollbar)}),q(g,"afterUpdate",function(a){this.navigator||
this.scroller||!this.options.navigator.enabled&&!this.options.scrollbar.enabled||(this.scroller=this.navigator=new y(this),z(a.redraw,!0)&&this.redraw(a.animation))}),q(g,"afterAddSeries",function(){this.navigator&&this.navigator.setBaseSeries(null,!1)}),q(t,"afterUpdate",function(){this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries(null,!1)}),g.prototype.callbacks.push(function(a){var b=a.navigator;b&&a.xAxis[0]&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))}))});
K(y,"parts/OrdinalAxis.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.defined,F=g.extend,E=g.pick;g=d.addEvent;var D=d.Axis,x=d.Chart,v=d.css,C=d.noop,B=d.timeUnits;g(d.Series,"updatedData",function(){var d=this.xAxis;d&&d.options.ordinal&&delete d.ordinalIndex});D.prototype.getTimeTicks=function(d,g,m,q,w,h,f){var c=0,b,a,l={},n=[],t=-Number.MAX_VALUE,p=this.options.tickPixelInterval,r=this.chart.time,e=[];if(!this.options.ordinal&&!this.options.breaks||!w||3>w.length||
"undefined"===typeof g)return r.getTimeTicks.apply(r,arguments);var k=w.length;for(b=0;b<k;b++){var u=b&&w[b-1]>m;w[b]<g&&(c=b);if(b===k-1||w[b+1]-w[b]>5*h||u){if(w[b]>t){for(a=r.getTimeTicks(d,w[c],w[b],q);a.length&&a[0]<=t;)a.shift();a.length&&(t=a[a.length-1]);e.push(n.length);n=n.concat(a)}c=b+1}if(u)break}a=a.info;if(f&&a.unitRange<=B.hour){b=n.length-1;for(c=1;c<b;c++)if(r.dateFormat("%d",n[c])!==r.dateFormat("%d",n[c-1])){l[n[c]]="day";var v=!0}v&&(l[n[0]]="day");a.higherRanks=l}a.segmentStarts=
e;n.info=a;if(f&&y(p)){c=e=n.length;v=[];var z;for(r=[];c--;)b=this.translate(n[c]),z&&(r[c]=z-b),v[c]=z=b;r.sort();r=r[Math.floor(r.length/2)];r<.6*p&&(r=null);c=n[e-1]>m?e-1:e;for(z=void 0;c--;)b=v[c],e=Math.abs(z-b),z&&e<.8*p&&(null===r||e<.8*r)?(l[n[c]]&&!l[n[c+1]]?(e=c+1,z=b):e=c,n.splice(e,1)):z=b}return n};F(D.prototype,{beforeSetTickPositions:function(){var d=[],g,m=!1,q=this.getExtremes(),w=q.min,h=q.max,f,c=this.isXAxis&&!!this.options.breaks;q=this.options.ordinal;var b=Number.MAX_VALUE,
a=this.chart.options.chart.ignoreHiddenSeries,l;if(q||c){this.series.forEach(function(f,h){g=[];if(!(a&&!1===f.visible||!1===f.takeOrdinalPosition&&!c)&&(d=d.concat(f.processedXData),n=d.length,d.sort(function(a,b){return a-b}),b=Math.min(b,E(f.closestPointRange,b)),n)){for(h=0;h<n-1;)d[h]!==d[h+1]&&g.push(d[h+1]),h++;g[0]!==d[0]&&g.unshift(d[0]);d=g}f.isSeriesBoosting&&(l=!0)});l&&(d.length=0);var n=d.length;if(2<n){var t=d[1]-d[0];for(f=n-1;f--&&!m;)d[f+1]-d[f]!==t&&(m=!0);!this.options.keepOrdinalPadding&&
(d[0]-w>t||h-d[d.length-1]>t)&&(m=!0)}else this.options.overscroll&&(2===n?b=d[1]-d[0]:1===n?(b=this.options.overscroll,d=[d[0],d[0]+b]):b=this.overscrollPointsRange);m?(this.options.overscroll&&(this.overscrollPointsRange=b,d=d.concat(this.getOverscrollPositions())),this.ordinalPositions=d,t=this.ordinal2lin(Math.max(w,d[0]),!0),f=Math.max(this.ordinal2lin(Math.min(h,d[d.length-1]),!0),1),this.ordinalSlope=h=(h-w)/(f-t),this.ordinalOffset=w-t*h):(this.overscrollPointsRange=E(this.closestPointRange,
this.overscrollPointsRange),this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0)}this.isOrdinal=q&&m;this.groupIntervalFactor=null},val2lin:function(d,g){var m=this.ordinalPositions;if(m){var q=m.length,p;for(p=q;p--;)if(m[p]===d){var h=p;break}for(p=q-1;p--;)if(d>m[p]||0===p){d=(d-m[p])/(m[p+1]-m[p]);h=p+d;break}g=g?h:this.ordinalSlope*(h||0)+this.ordinalOffset}else g=d;return g},lin2val:function(d,g){var m=this.ordinalPositions;if(m){var q=this.ordinalSlope,p=this.ordinalOffset,h=
m.length-1;if(g)if(0>d)d=m[0];else if(d>h)d=m[h];else{h=Math.floor(d);var f=d-h}else for(;h--;)if(g=q*h+p,d>=g){q=q*(h+1)+p;f=(d-g)/(q-g);break}return"undefined"!==typeof f&&"undefined"!==typeof m[h]?m[h]+(f?f*(m[h+1]-m[h]):0):d}return d},getExtendedPositions:function(){var d=this,g=d.chart,m=d.series[0].currentDataGrouping,q=d.ordinalIndex,w=m?m.count+m.unitName:"raw",h=d.options.overscroll,f=d.getExtremes(),c;q||(q=d.ordinalIndex={});if(!q[w]){var b={series:[],chart:g,getExtremes:function(){return{min:f.dataMin,
max:f.dataMax+h}},options:{ordinal:!0},val2lin:D.prototype.val2lin,ordinal2lin:D.prototype.ordinal2lin};d.series.forEach(function(a){c={xAxis:b,xData:a.xData.slice(),chart:g,destroyGroupedData:C};c.xData=c.xData.concat(d.getOverscrollPositions());c.options={dataGrouping:m?{enabled:!0,forced:!0,approximation:"open",units:[[m.unitName,[m.count]]]}:{enabled:!1}};a.processData.apply(c);b.series.push(c)});d.beforeSetTickPositions.apply(b);q[w]=b.ordinalPositions}return q[w]},getOverscrollPositions:function(){var d=
this.options.overscroll,g=this.overscrollPointsRange,m=[],q=this.dataMax;if(y(g))for(m.push(q);q<=this.dataMax+d;)q+=g,m.push(q);return m},getGroupIntervalFactor:function(d,g,m){m=m.processedXData;var q=m.length,p=[];var h=this.groupIntervalFactor;if(!h){for(h=0;h<q-1;h++)p[h]=m[h+1]-m[h];p.sort(function(d,c){return d-c});p=p[Math.floor(q/2)];d=Math.max(d,m[0]);g=Math.min(g,m[q-1]);this.groupIntervalFactor=h=q*p/(g-d)}return h},postProcessTickInterval:function(d){var g=this.ordinalSlope;return g?
this.options.breaks?this.closestPointRange||d:d/(g/this.closestPointRange):d}});D.prototype.ordinal2lin=D.prototype.val2lin;g(x,"pan",function(d){var g=this.xAxis[0],m=g.options.overscroll,q=d.originalEvent.chartX,p=this.options.chart&&this.options.chart.panning,h=!1;if(p&&"y"!==p.type&&g.options.ordinal&&g.series.length){var f=this.mouseDownX,c=g.getExtremes(),b=c.dataMax,a=c.min,l=c.max,n=this.hoverPoints,t=g.closestPointRange||g.overscrollPointsRange;f=(f-q)/(g.translationSlope*(g.ordinalSlope||
t));var x={ordinalPositions:g.getExtendedPositions()};t=g.lin2val;var r=g.val2lin;if(!x.ordinalPositions)h=!0;else if(1<Math.abs(f)){n&&n.forEach(function(a){a.setState()});if(0>f){n=x;var e=g.ordinalPositions?g:x}else n=g.ordinalPositions?g:x,e=x;x=e.ordinalPositions;b>x[x.length-1]&&x.push(b);this.fixedRange=l-a;f=g.toFixedRange(null,null,t.apply(n,[r.apply(n,[a,!0])+f,!0]),t.apply(e,[r.apply(e,[l,!0])+f,!0]));f.min>=Math.min(c.dataMin,a)&&f.max<=Math.max(b,l)+m&&g.setExtremes(f.min,f.max,!0,!1,
{trigger:"pan"});this.mouseDownX=q;v(this.container,{cursor:"move"})}}else h=!0;h||p&&/y/.test(p.type)?m&&(g.max=g.dataMax+m):d.preventDefault()});g(D,"foundExtremes",function(){this.isXAxis&&y(this.options.overscroll)&&this.max===this.dataMax&&(!this.chart.mouseIsDown||this.isInternal)&&(!this.eventArgs||this.eventArgs&&"navigator"!==this.eventArgs.trigger)&&(this.max+=this.options.overscroll,!this.isInternal&&y(this.userMin)&&(this.min+=this.options.overscroll))});g(D,"afterSetScale",function(){this.horiz&&
!this.isDirty&&(this.isDirty=this.isOrdinal&&this.chart.navigator&&!this.chart.navigator.adaptToUpdatedData)})});K(y,"modules/broken-axis.src.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.extend,F=g.isArray,E=g.pick;g=d.addEvent;var D=d.find,x=d.fireEvent,v=d.Axis,C=d.Series,B=function(d,g){return D(g,function(g){return g.from<d&&d<g.to})};y(v.prototype,{isInBreak:function(d,g){var m=d.repeat||Infinity,q=d.from,p=d.to-d.from;g=g>=q?(g-q)%m:m-(q-g)%m;return d.inclusive?
g<=p:g<p&&0!==g},isInAnyBreak:function(d,g){var m=this.options.breaks,q=m&&m.length,p;if(q){for(;q--;)if(this.isInBreak(m[q],d)){var h=!0;p||(p=E(m[q].showPoints,!this.isXAxis))}var f=h&&g?h&&!p:h}return f}});g(v,"afterInit",function(){"function"===typeof this.setBreaks&&this.setBreaks(this.options.breaks,!1)});g(v,"afterSetTickPositions",function(){if(this.isBroken){var d=this.tickPositions,g=this.tickPositions.info,m=[],q;for(q=0;q<d.length;q++)this.isInAnyBreak(d[q])||m.push(d[q]);this.tickPositions=
m;this.tickPositions.info=g}});g(v,"afterSetOptions",function(){this.isBroken&&(this.options.ordinal=!1)});v.prototype.setBreaks=function(d,g){function m(d){var c=d,b;for(b=0;b<p.breakArray.length;b++){var a=p.breakArray[b];if(a.to<=d)c-=a.len;else if(a.from>=d)break;else if(p.isInBreak(a,d)){c-=d-a.from;break}}return c}function q(d){var c;for(c=0;c<p.breakArray.length;c++){var b=p.breakArray[c];if(b.from>=d)break;else b.to<d?d+=b.len:p.isInBreak(b,d)&&(d+=b.len)}return d}var p=this,h=F(d)&&!!d.length;
p.isDirty=p.isBroken!==h;p.isBroken=h;p.options.breaks=p.userOptions.breaks=d;p.forceRedraw=!0;p.series.forEach(function(d){d.isDirty=!0});h||p.val2lin!==m||(delete p.val2lin,delete p.lin2val);h&&(p.userOptions.ordinal=!1,p.val2lin=m,p.lin2val=q,p.setExtremes=function(d,c,b,a,g){if(this.isBroken){for(var f,h=this.options.breaks;f=B(d,h);)d=f.to;for(;f=B(c,h);)c=f.from;c<d&&(c=d)}v.prototype.setExtremes.call(this,d,c,b,a,g)},p.setAxisTranslation=function(d){v.prototype.setAxisTranslation.call(this,
d);this.unitLength=null;if(this.isBroken){d=p.options.breaks;var c=[],b=[],a=0,f,g=p.userMin||p.min,h=p.userMax||p.max,m=E(p.pointRangePadding,0),r;d.forEach(function(a){f=a.repeat||Infinity;p.isInBreak(a,g)&&(g+=a.to%f-g%f);p.isInBreak(a,h)&&(h-=h%f-a.from%f)});d.forEach(function(a){k=a.from;for(f=a.repeat||Infinity;k-f>g;)k-=f;for(;k<g;)k+=f;for(r=k;r<h;r+=f)c.push({value:r,move:"in"}),c.push({value:r+(a.to-a.from),move:"out",size:a.breakSize})});c.sort(function(a,b){return a.value===b.value?("in"===
a.move?0:1)-("in"===b.move?0:1):a.value-b.value});var e=0;var k=g;c.forEach(function(c){e+="in"===c.move?1:-1;1===e&&"in"===c.move&&(k=c.value);0===e&&(b.push({from:k,to:c.value,len:c.value-k-(c.size||0)}),a+=c.value-k-(c.size||0))});p.breakArray=b;p.unitLength=h-g-a+m;x(p,"afterBreaks");p.staticScale?p.transA=p.staticScale:p.unitLength&&(p.transA*=(h-p.min+m)/p.unitLength);m&&(p.minPixelPadding=p.transA*p.minPointOffset);p.min=g;p.max=h}});E(g,!0)&&this.chart.redraw()};g(C,"afterGeneratePoints",
function(){var d=this.options.connectNulls,g=this.points,m=this.xAxis,q=this.yAxis;if(this.isDirty)for(var v=g.length;v--;){var h=g[v],f=!(null===h.y&&!1===d)&&(m&&m.isInAnyBreak(h.x,!0)||q&&q.isInAnyBreak(h.y,!0));h.visible=f?!1:!1!==h.options.visible}});g(C,"afterRender",function(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,E(this.pointArrayMap,["y"]))});d.Series.prototype.drawBreaks=function(d,g){var m=this,p=m.points,v,h,f,c;d&&g.forEach(function(b){v=d.breakArray||[];h=d.isXAxis?
d.min:E(m.options.threshold,d.min);p.forEach(function(a){c=E(a["stack"+b.toUpperCase()],a[b]);v.forEach(function(b){f=!1;if(h<b.from&&c>b.to||h>b.from&&c<b.from)f="pointBreak";else if(h<b.from&&c>b.from&&c<b.to||h>b.from&&c>b.to&&c<b.from)f="pointInBreak";f&&x(d,f,{point:a,brk:b})})})})};d.Series.prototype.gappedPath=function(){var g=this.currentDataGrouping,v=g&&g.gapSize;g=this.options.gapSize;var m=this.points.slice(),q=m.length-1,w=this.yAxis,h;if(g&&0<q)for("value"!==this.options.gapUnit&&(g*=
this.basePointRange),v&&v>g&&v>=this.basePointRange&&(g=v),h=void 0;q--;)h&&!1!==h.visible||(h=m[q+1]),v=m[q],!1!==h.visible&&!1!==v.visible&&(h.x-v.x>g&&(h=(v.x+h.x)/2,m.splice(q+1,0,{isNull:!0,x:h}),this.options.stacking&&(h=w.stacks[this.stackKey][h]=new d.StackItem(w,w.options.stackLabels,!1,h,this.stack),h.total=0)),h=v);return this.getGraphPath(m)}});K(y,"masters/modules/broken-axis.src.js",[],function(){});K(y,"parts/DataGrouping.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,
g){var y=g.arrayMax,F=g.arrayMin,E=g.correctFloat,D=g.defined,x=g.extend,v=g.isNumber,C=g.pick;g=d.addEvent;var B=d.Axis,p=d.defaultPlotOptions,z=d.format,m=d.merge,q=d.Point,w=d.Series,h=d.Tooltip,f=d.approximations={sum:function(a){var b=a.length;if(!b&&a.hasNulls)var e=null;else if(b)for(e=0;b--;)e+=a[b];return e},average:function(a){var b=a.length;a=f.sum(a);v(a)&&b&&(a=E(a/b));return a},averages:function(){var a=[];[].forEach.call(arguments,function(b){a.push(f.average(b))});return"undefined"===
typeof a[0]?void 0:a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?y(a):a.hasNulls?null:void 0},low:function(a){return a.length?F(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,d){a=f.open(a);b=f.high(b);c=f.low(c);d=f.close(d);if(v(a)||v(b)||v(c)||v(d))return[a,b,c,d]},range:function(a,b){a=f.low(a);b=f.high(b);if(v(a)||v(b))return[a,b];if(null===a&&null===b)return null}},c=function(a,
b,c,d){var e=this,g=e.data,h=e.options&&e.options.data,k=[],l=[],n=[],r=a.length,u=!!b,t=[],p=e.pointArrayMap,q=p&&p.length,w=["x"].concat(p||["y"]),x=0,z=0,y;d="function"===typeof d?d:f[d]?f[d]:f[e.getDGApproximation&&e.getDGApproximation()||"average"];q?p.forEach(function(){t.push([])}):t.push([]);var H=q||1;for(y=0;y<=r&&!(a[y]>=c[0]);y++);for(y;y<=r;y++){for(;"undefined"!==typeof c[x+1]&&a[y]>=c[x+1]||y===r;){var B=c[x];e.dataGroupInfo={start:e.cropStart+z,length:t[0].length};var C=d.apply(e,
t);e.pointClass&&!D(e.dataGroupInfo.options)&&(e.dataGroupInfo.options=m(e.pointClass.prototype.optionsToObject.call({series:e},e.options.data[e.cropStart+z])),w.forEach(function(a){delete e.dataGroupInfo.options[a]}));"undefined"!==typeof C&&(k.push(B),l.push(C),n.push(e.dataGroupInfo));z=y;for(B=0;B<H;B++)t[B].length=0,t[B].hasNulls=!1;x+=1;if(y===r)break}if(y===r)break;if(p)for(B=e.cropStart+y,C=g&&g[B]||e.pointClass.prototype.applyOptions.apply({series:e},[h[B]]),B=0;B<q;B++){var E=C[p[B]];v(E)?
t[B].push(E):null===E&&(t[B].hasNulls=!0)}else B=u?b[y]:null,v(B)?t[0].push(B):null===B&&(t[0].hasNulls=!0)}return{groupedXData:k,groupedYData:l,groupMap:n}},b={approximations:f,groupData:c},a=w.prototype,l=a.processData,n=a.generatePoints,t={groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M",
"%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},I={line:{},spline:{},area:{},areaspline:{},arearange:{},column:{groupPixelWidth:10},columnrange:{groupPixelWidth:10},candlestick:{groupPixelWidth:10},ohlc:{groupPixelWidth:5}},r=d.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,
30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]];a.getDGApproximation=function(){return d.seriesTypes.arearange&&this instanceof d.seriesTypes.arearange?"range":d.seriesTypes.ohlc&&this instanceof d.seriesTypes.ohlc?"ohlc":d.seriesTypes.column&&this instanceof d.seriesTypes.column?"sum":"average"};a.groupData=c;a.processData=function(){var b=this.chart,c=this.options.dataGrouping,d=!1!==this.allowDG&&c&&C(c.enabled,b.options.isStock),f=this.visible||!b.options.chart.ignoreHiddenSeries,
g,h=this.currentDataGrouping,m=!1;this.forceCrop=d;this.groupPixelWidth=null;this.hasProcessed=!0;d&&!this.requireSorting&&(this.requireSorting=m=!0);d=!1===l.apply(this,arguments)||!d;m&&(this.requireSorting=!1);if(!d){this.destroyGroupedData();d=c.groupAll?this.xData:this.processedXData;var n=c.groupAll?this.yData:this.processedYData,t=b.plotSizeX;b=this.xAxis;var p=b.options.ordinal,q=this.groupPixelWidth=b.getGroupPixelWidth&&b.getGroupPixelWidth();if(q){this.isDirty=g=!0;this.points=null;m=b.getExtremes();
var v=m.min;m=m.max;p=p&&b.getGroupIntervalFactor(v,m,this)||1;q=q*(m-v)/t*p;t=b.getTimeTicks(b.normalizeTimeTickInterval(q,c.units||r),Math.min(v,d[0]),Math.max(m,d[d.length-1]),b.options.startOfWeek,d,this.closestPointRange);n=a.groupData.apply(this,[d,n,t,c.approximation]);d=n.groupedXData;p=n.groupedYData;var w=0;if(c.smoothed&&d.length){var x=d.length-1;for(d[x]=Math.min(d[x],m);x--&&0<x;)d[x]+=q/2;d[0]=Math.max(d[0],v)}for(x=1;x<t.length;x++)t.info.segmentStarts&&-1!==t.info.segmentStarts.indexOf(x)||
(w=Math.max(t[x]-t[x-1],w));v=t.info;v.gapSize=w;this.closestPointRange=t.info.totalRange;this.groupMap=n.groupMap;if(D(d[0])&&d[0]<b.min&&f){if(!D(b.options.min)&&b.min<=b.dataMin||b.min===b.dataMin)b.min=Math.min(d[0],b.min);b.dataMin=Math.min(d[0],b.dataMin)}c.groupAll&&(c=this.cropData(d,p,b.min,b.max,1),d=c.xData,p=c.yData);this.processedXData=d;this.processedYData=p}else this.groupMap=null;this.hasGroupedData=g;this.currentDataGrouping=v;this.preventGraphAnimation=(h&&h.totalRange)!==(v&&v.totalRange)}};
a.destroyGroupedData=function(){this.groupedData&&(this.groupedData.forEach(function(a,b){a&&(this.groupedData[b]=a.destroy?a.destroy():null)},this),this.groupedData.length=0)};a.generatePoints=function(){n.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};g(q,"update",function(){if(this.dataGroup)return d.error(24,!1,this.series.chart),!1});g(h,"headerFormatter",function(a){var b=this.chart,c=b.time,e=a.labelConfig,d=e.series,f=d.tooltipOptions,g=d.options.dataGrouping,
h=f.xDateFormat,l=d.xAxis,m=f[(a.isFooter?"footer":"header")+"Format"];if(l&&"datetime"===l.options.type&&g&&v(e.key)){var n=d.currentDataGrouping;g=g.dateTimeLabelFormats||t.dateTimeLabelFormats;if(n)if(f=g[n.unitName],1===n.count)h=f[0];else{h=f[1];var r=f[2]}else!h&&g&&(h=this.getXDateFormat(e,f,l));h=c.dateFormat(h,e.key);r&&(h+=c.dateFormat(r,e.key+n.totalRange-1));d.chart.styledMode&&(m=this.styledModeFormat(m));a.text=z(m,{point:x(e.point,{key:h}),series:d},b);a.preventDefault()}});g(w,"destroy",
a.destroyGroupedData);g(w,"afterSetOptions",function(a){a=a.options;var b=this.type,c=this.chart.options.plotOptions,e=p[b].dataGrouping,d=this.useCommonDataGrouping&&t;if(I[b]||d)e||(e=m(t,I[b])),a.dataGrouping=m(d,e,c.series&&c.series.dataGrouping,c[b].dataGrouping,this.userOptions.dataGrouping)});g(B,"afterSetScale",function(){this.series.forEach(function(a){a.hasProcessed=!1})});B.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,d=0,f=!1,g;for(c=b;c--;)(g=a[c].options.dataGrouping)&&
(d=Math.max(d,C(g.groupPixelWidth,t.groupPixelWidth)));for(c=b;c--;)(g=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/d||b&&g.forced)&&(f=!0);return f?d:0};B.prototype.setDataGrouping=function(a,b){var c;b=C(b,!0);a||(a={forced:!1,units:null});if(this instanceof B)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);else this.chart.options.series.forEach(function(b){b.dataGrouping=a},!1);this.ordinalSlope=
null;b&&this.chart.redraw()};d.dataGrouping=b;"";return b});K(y,"parts/OHLCSeries.js",[y["parts/Globals.js"]],function(d){var g=d.Point,y=d.seriesType,F=d.seriesTypes;y("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'},threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low",
"close"],toYData:function(d){return[d.open,d.high,d.low,d.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},init:function(){F.column.prototype.init.apply(this,arguments);this.options.stacking=!1},pointAttribs:function(d,g){g=F.column.prototype.pointAttribs.call(this,d,g);var x=this.options;delete g.fill;!d.options.color&&x.upColor&&d.open<d.close&&(g.stroke=x.upColor);return g},translate:function(){var d=this,g=d.yAxis,x=!!d.modifyValue,v=["plotOpen","plotHigh",
"plotLow","plotClose","yBottom"];F.column.prototype.translate.apply(d);d.points.forEach(function(y){[y.open,y.high,y.low,y.close,y.low].forEach(function(B,p){null!==B&&(x&&(B=d.modifyValue(B)),y[v[p]]=g.toPixels(B,!0))});y.tooltipPos[1]=y.plotHigh+g.pos-d.chart.plotTop})},drawPoints:function(){var d=this,g=d.chart;d.points.forEach(function(x){var v=x.graphic,y=!v;if("undefined"!==typeof x.plotY){v||(x.graphic=v=g.renderer.path().add(d.group));g.styledMode||v.attr(d.pointAttribs(x,x.selected&&"select"));
var B=v.strokeWidth()%2/2;var p=Math.round(x.plotX)-B;var z=Math.round(x.shapeArgs.width/2);var m=["M",p,Math.round(x.yBottom),"L",p,Math.round(x.plotHigh)];if(null!==x.open){var q=Math.round(x.plotOpen)+B;m.push("M",p,q,"L",p-z,q)}null!==x.close&&(q=Math.round(x.plotClose)+B,m.push("M",p,q,"L",p+z,q));v[y?"attr":"animate"]({d:m}).addClass(x.getClassName(),!0)}})},animate:null},{getClassName:function(){return g.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}});
""});K(y,"parts/CandlestickSeries.js",[y["parts/Globals.js"]],function(d){var g=d.defaultPlotOptions,y=d.merge,F=d.seriesType,E=d.seriesTypes;F("candlestick","ohlc",y(g.column,{states:{hover:{lineWidth:2}},tooltip:g.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(d,g){var v=E.column.prototype.pointAttribs.call(this,d,g),x=this.options,y=d.open<d.close,p=x.lineColor||this.color;v["stroke-width"]=x.lineWidth;v.fill=d.options.color||
(y?x.upColor||this.color:this.color);v.stroke=d.options.lineColor||(y?x.upLineColor||p:p);g&&(d=x.states[g],v.fill=d.color||v.fill,v.stroke=d.lineColor||v.stroke,v["stroke-width"]=d.lineWidth||v["stroke-width"]);return v},drawPoints:function(){var d=this,g=d.chart,v=d.yAxis.reversed;d.points.forEach(function(x){var y=x.graphic,p=!y;if("undefined"!==typeof x.plotY){y||(x.graphic=y=g.renderer.path().add(d.group));d.chart.styledMode||y.attr(d.pointAttribs(x,x.selected&&"select")).shadow(d.options.shadow);
var z=y.strokeWidth()%2/2;var m=Math.round(x.plotX)-z;var q=x.plotOpen;var w=x.plotClose;var h=Math.min(q,w);q=Math.max(q,w);var f=Math.round(x.shapeArgs.width/2);w=v?q!==x.yBottom:Math.round(h)!==Math.round(x.plotHigh);var c=v?Math.round(h)!==Math.round(x.plotHigh):q!==x.yBottom;h=Math.round(h)+z;q=Math.round(q)+z;z=[];z.push("M",m-f,q,"L",m-f,h,"L",m+f,h,"L",m+f,q,"Z","M",m,h,"L",m,w?Math.round(v?x.yBottom:x.plotHigh):h,"M",m,q,"L",m,c?Math.round(v?x.plotHigh:x.yBottom):q);y[p?"attr":"animate"]({d:z}).addClass(x.getClassName(),
!0)}})}});""});K(y,"mixins/on-series.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.defined,F=d.seriesTypes,E=d.stableSort;return{getPlotBox:function(){return d.Series.prototype.getPlotBox.call(this.options.onSeries&&this.chart.get(this.options.onSeries)||this)},translate:function(){F.column.prototype.translate.apply(this);var d=this,g=d.options,v=d.chart,C=d.points,B=C.length-1,p,z=g.onSeries;z=z&&v.get(z);g=g.onKey||"y";var m=z&&z.options.step,q=z&&z.points,w=q&&q.length,
h=v.inverted,f=d.xAxis,c=d.yAxis,b=0,a;if(z&&z.visible&&w){b=(z.pointXOffset||0)+(z.barW||0)/2;v=z.currentDataGrouping;var l=q[w-1].x+(v?v.totalRange:0);E(C,function(a,b){return a.x-b.x});for(g="plot"+g[0].toUpperCase()+g.substr(1);w--&&C[B];){var n=q[w];v=C[B];v.y=n.y;if(n.x<=v.x&&"undefined"!==typeof n[g]){if(v.x<=l&&(v.plotY=n[g],n.x<v.x&&!m&&(a=q[w+1])&&"undefined"!==typeof a[g])){var t=(v.x-n.x)/(a.x-n.x);v.plotY+=t*(a[g]-n[g]);v.y+=t*(a.y-n.y)}B--;w++;if(0>B)break}}}C.forEach(function(a,g){a.plotX+=
b;if("undefined"===typeof a.plotY||h)0<=a.plotX&&a.plotX<=f.len?h?(a.plotY=f.translate(a.x,0,1,0,1),a.plotX=y(a.y)?c.translate(a.y,0,0,0,1):0):a.plotY=(f.opposite?0:d.yAxis.len)+f.offset:a.shapeArgs={};if((p=C[g-1])&&p.plotX===a.plotX){"undefined"===typeof p.stackIndex&&(p.stackIndex=0);var e=p.stackIndex+1}a.stackIndex=e});this.onSeries=z}}});K(y,"parts/FlagsSeries.js",[y["parts/Globals.js"],y["parts/Utilities.js"],y["mixins/on-series.js"]],function(d,g,y){function F(d){h[d+"pin"]=function(c,b,a,
f,g){var l=g&&g.anchorX;g=g&&g.anchorY;"circle"===d&&f>a&&(c-=Math.round((f-a)/2),a=f);var m=h[d](c,b,a,f);l&&g&&(m.push("M","circle"===d?c+a/2:m[1]+m[4]/2,b>g?b:b+f,"L",l,g),m=m.concat(h.circle(l-1,g-1,2,2)));return m}}var E=g.defined,D=g.isNumber,x=g.objectEach,v=g.wrap,C=d.addEvent,B=d.merge;g=d.noop;var p=d.Renderer,z=d.Series,m=d.seriesType,q=d.TrackerMixin,w=d.VMLRenderer,h=d.SVGRenderer.prototype.symbols;m("flags","column",{pointRange:0,allowOverlapX:!1,shape:"flag",stackDistance:12,textAlign:"center",
tooltip:{pointFormat:"{point.text}<br/>"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:z.prototype.init,pointAttribs:function(d,c){var b=this.options,a=d&&d.color||this.color,f=b.lineColor,g=d&&d.lineWidth;d=d&&d.fillColor||b.fillColor;c&&(d=b.states[c].fillColor,f=b.states[c].lineColor,
g=b.states[c].lineWidth);return{fill:d||a,stroke:f||a,"stroke-width":g||b.lineWidth||0}},translate:y.translate,getPlotBox:y.getPlotBox,drawPoints:function(){var f=this.points,c=this.chart,b=c.renderer,a=c.inverted,g=this.options,h=g.y,m,p=this.yAxis,r={},e=[];for(m=f.length;m--;){var k=f[m];var u=(a?k.plotY:k.plotX)>this.xAxis.len;var q=k.plotX;var w=k.stackIndex;var A=k.options.shape||g.shape;var z=k.plotY;"undefined"!==typeof z&&(z=k.plotY+h-("undefined"!==typeof w&&w*g.stackDistance));k.anchorX=
w?void 0:k.plotX;var y=w?void 0:k.plotY;var C="flag"!==A;w=k.graphic;"undefined"!==typeof z&&0<=q&&!u?(w||(w=k.graphic=b.label("",null,null,A,null,null,g.useHTML),c.styledMode||w.attr(this.pointAttribs(k)).css(B(g.style,k.style)),w.attr({align:C?"center":"left",width:g.width,height:g.height,"text-align":g.textAlign}).addClass("highcharts-point").add(this.markerGroup),k.graphic.div&&(k.graphic.div.point=k),c.styledMode||w.shadow(g.shadow),w.isNew=!0),0<q&&(q-=w.strokeWidth()%2),A={y:z,anchorY:y},g.allowOverlapX&&
(A.x=q,A.anchorX=k.anchorX),w.attr({text:k.options.title||g.title||"A"})[w.isNew?"attr":"animate"](A),g.allowOverlapX||(r[k.plotX]?r[k.plotX].size=Math.max(r[k.plotX].size,w.width):r[k.plotX]={align:C?.5:0,size:w.width,target:q,anchorX:q}),k.tooltipPos=[q,z+p.pos-c.plotTop]):w&&(k.graphic=w.destroy())}g.allowOverlapX||(x(r,function(a){a.plotX=a.anchorX;e.push(a)}),d.distribute(e,a?p.len:this.xAxis.len,100),f.forEach(function(a){var b=a.graphic&&r[a.plotX];b&&(a.graphic[a.graphic.isNew?"attr":"animate"]({x:b.pos+
b.align*b.size,anchorX:a.anchorX}),E(b.pos)?a.graphic.isNew=!1:(a.graphic.attr({x:-9999,anchorX:-9999}),a.graphic.isNew=!0))}));g.useHTML&&v(this.markerGroup,"on",function(a){return d.SVGElement.prototype.on.apply(a.apply(this,[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var d=this.points;q.drawTrackerPoint.apply(this);d.forEach(function(c){var b=c.graphic;b&&C(b.element,"mouseover",function(){0<c.stackIndex&&!c.raised&&(c._y=b.y,b.attr({y:c._y-8}),c.raised=!0);
d.forEach(function(a){a!==c&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:function(d){d?this.setClip():this.animate=null},setClip:function(){z.prototype.setClip.apply(this,arguments);!1!==this.options.clip&&this.sharedClipKey&&this.markerGroup.clip(this.chart[this.sharedClipKey])},buildKDTree:g,invertGroups:g},{isValid:function(){return D(this.y)||"undefined"===typeof this.y}});h.flag=function(d,c,b,a,g){var f=g&&g.anchorX||d;g=g&&g.anchorY||c;return h.circle(f-1,g-1,
2,2).concat(["M",f,g,"L",d,c+a,d,c,d+b,c,d+b,c+a,d,c+a,"Z"])};F("circle");F("square");p===w&&["circlepin","flag","squarepin"].forEach(function(d){w.prototype.symbols[d]=h[d]});""});K(y,"parts/RangeSelector.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){function y(a){this.init(a)}var F=g.defined,E=g.destroyObjectProperties,D=g.discardElement,x=g.extend,v=g.isNumber,C=g.objectEach,B=g.pick,p=g.pInt,z=g.splat,m=d.addEvent,q=d.Axis;g=d.Chart;var w=d.css,h=d.createElement,f=d.defaultOptions,
c=d.fireEvent,b=d.merge;x(f,{rangeSelector:{verticalAlign:"top",buttonTheme:{width:28,height:18,padding:2,zIndex:7},floating:!1,x:0,y:0,height:void 0,inputPosition:{align:"right",x:0,y:0},buttonPosition:{align:"left",x:0,y:0},labelStyle:{color:"#666666"}}});f.lang=b(f.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});y.prototype={clickButton:function(a,b){var c=this.chart,d=this.buttonOptions[a],f=c.xAxis[0],g=c.scroller&&c.scroller.getUnionExtremes()||f||{},e=g.dataMin,
h=g.dataMax,l=f&&Math.round(Math.min(f.max,B(h,f.max))),p=d.type;g=d._range;var w,A=d.dataGrouping;if(null!==e&&null!==h){c.fixedRange=g;A&&(this.forcedDataGrouping=!0,q.prototype.setDataGrouping.call(f||{chart:this.chart},A,!1),this.frozenStates=d.preserveDataGrouping);if("month"===p||"year"===p)if(f){p={range:d,max:l,chart:c,dataMin:e,dataMax:h};var x=f.minFromRange.call(p);v(p.newMax)&&(l=p.newMax)}else g=d;else if(g)x=Math.max(l-g,e),l=Math.min(x+g,h);else if("ytd"===p)if(f)"undefined"===typeof h&&
(e=Number.MAX_VALUE,h=Number.MIN_VALUE,c.series.forEach(function(a){a=a.xData;e=Math.min(a[0],e);h=Math.max(a[a.length-1],h)}),b=!1),l=this.getYTDExtremes(h,e,c.time.useUTC),x=w=l.min,l=l.max;else{this.deferredYTDClick=a;return}else"all"===p&&f&&(x=e,l=h);x+=d._offsetMin;l+=d._offsetMax;this.setSelected(a);if(f)f.setExtremes(x,l,B(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:d});else{var y=z(c.options.xAxis)[0];var C=y.range;y.range=g;var D=y.min;y.min=w;m(c,"load",function(){y.range=
C;y.min=D})}}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,d=a.options.rangeSelector,f=d.buttons||[].concat(b.defaultButtons),g=d.selected,h=function(){var a=b.minInput,d=b.maxInput;a&&a.blur&&c(a,"blur");d&&d.blur&&c(d,"blur")};b.chart=a;b.options=d;b.buttons=
[];b.buttonOptions=f;this.unMouseDown=m(a.container,"mousedown",h);this.unResize=m(a,"resize",h);f.forEach(b.computeButtonRange);"undefined"!==typeof g&&f[g]&&this.clickButton(g,!1);m(a,"load",function(){a.xAxis&&a.xAxis[0]&&m(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&!b.frozenStates&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this,b=this.chart,c=b.xAxis[0],d=
Math.round(c.max-c.min),f=!c.hasVisibleSeries,g=b.scroller&&b.scroller.getUnionExtremes()||c,e=g.dataMin,h=g.dataMax;b=a.getYTDExtremes(h,e,b.time.useUTC);var m=b.min,p=b.max,q=a.selected,w=v(q),x=a.options.allButtonsEnabled,z=a.buttons;a.buttonOptions.forEach(function(b,g){var k=b._range,l=b.type,n=b.count||1,r=z[g],t=0,u=b._offsetMax-b._offsetMin;b=g===q;var v=k>h-e,A=k<c.minRange,y=!1,B=!1;k=k===d;("month"===l||"year"===l)&&d+36E5>=864E5*{month:28,year:365}[l]*n-u&&d-36E5<=864E5*{month:31,year:366}[l]*
n+u?k=!0:"ytd"===l?(k=p-m+u===d,y=!b):"all"===l&&(k=c.max-c.min>=h-e,B=!b&&w&&k);l=!x&&(v||A||B||f);n=b&&k||k&&!w&&!y||b&&a.frozenStates;l?t=3:n&&(w=!0,t=2);r.state!==t&&(r.setState(t),0===t&&q===g&&a.setSelected(null))})},computeButtonRange:function(a){var b=a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c;a._offsetMin=B(a.offsetMin,0);a._offsetMax=B(a.offsetMax,
0);a._range+=a._offsetMax-a._offsetMin},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,d=this.chart.time,f=this[a+"Input"];F(b)&&(f.previousValue=f.HCTime,f.HCTime=b);f.value=d.dateFormat(c.inputEditDateFormat||"%Y-%m-%d",f.HCTime);this[a+"DateBox"].attr({text:d.dateFormat(c.inputDateFormat||"%b %e, %Y",f.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];w(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-
2+"px",border:"2px solid silver"})},hideInput:function(a){w(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function c(){var a=y.value,b=(e.inputDateParser||Date.parse)(a),c=m.xAxis[0],d=m.scroller&&m.scroller.xAxis?m.scroller.xAxis:c,f=d.dataMin;d=d.dataMax;b!==y.previousValue&&(y.previousValue=b,v(b)||(b=a.split("-"),b=Date.UTC(p(b[0]),p(b[1])-1,p(b[2]))),v(b)&&(m.time.useUTC||(b+=6E4*(new Date).getTimezoneOffset()),u?b>g.maxInput.HCTime?b=void 0:
b<f&&(b=f):b<g.minInput.HCTime?b=void 0:b>d&&(b=d),"undefined"!==typeof b&&c.setExtremes(u?b:c.min,u?c.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var g=this,m=g.chart,q=m.renderer.style||{},r=m.renderer,e=m.options.rangeSelector,k=g.div,u="min"===a,y,z,A=this.inputGroup;this[a+"Label"]=z=r.label(f.lang[u?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(A);A.offset+=z.width+5;this[a+"DateBox"]=r=r.label("",A.offset).addClass("highcharts-range-input").attr({padding:2,
width:e.inputBoxWidth||90,height:e.inputBoxHeight||17,"text-align":"center"}).on("click",function(){g.showInput(a);g[a+"Input"].focus()});m.styledMode||r.attr({stroke:e.inputBoxBorderColor||"#cccccc","stroke-width":1});r.add(A);A.offset+=r.width+(u?10:0);this[a+"Input"]=y=h("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:m.plotTop+"px"},k);m.styledMode||(z.css(b(q,e.labelStyle)),r.css(b({color:"#333333"},q,e.inputStyle)),w(y,x({position:"absolute",border:0,width:"1px",height:"1px",
padding:0,textAlign:"center",fontSize:q.fontSize,fontFamily:q.fontFamily,top:"-9999em"},e.inputStyle)));y.onfocus=function(){g.showInput(a)};y.onblur=function(){y===d.doc.activeElement&&c();g.hideInput(a);y.blur()};y.onchange=c;y.onkeypress=function(a){13===a.keyCode&&c()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector;a="top"===b.verticalAlign?a.plotTop-a.axisOffset[0]:0;return{buttonTop:a+b.buttonPosition.y,inputTop:a+b.inputPosition.y-10}},getYTDExtremes:function(a,b,c){var d=
this.chart.time,f=new d.Date(a),g=d.get("FullYear",f);c=c?d.Date.UTC(g,0,1):+new d.Date(g,0,1);b=Math.max(b||0,c);f=f.getTime();return{max:Math.min(a||f,f),min:b}},render:function(a,b){var c=this,d=c.chart,g=d.renderer,l=d.container,e=d.options,k=e.exporting&&!1!==e.exporting.enabled&&e.navigation&&e.navigation.buttonOptions,m=f.lang,p=c.div,q=e.rangeSelector,v=B(e.chart.style&&e.chart.style.zIndex,0)+1;e=q.floating;var w=c.buttons;p=c.inputGroup;var x=q.buttonTheme,y=q.buttonPosition,z=q.inputPosition,
C=q.inputEnabled,D=x&&x.states,E=d.plotLeft,F=c.buttonGroup;var K=c.rendered;var M=c.options.verticalAlign,T=d.legend,Z=T&&T.options,S=y.y,R=z.y,X=K||!1,fa=X?"animate":"attr",aa=0,W=0,Y;if(!1!==q.enabled){K||(c.group=K=g.g("range-selector-group").attr({zIndex:7}).add(),c.buttonGroup=F=g.g("range-selector-buttons").add(K),c.zoomText=g.text(m.rangeSelectorZoom,0,15).add(F),d.styledMode||(c.zoomText.css(q.labelStyle),x["stroke-width"]=B(x["stroke-width"],0)),c.buttonOptions.forEach(function(a,b){w[b]=
g.button(a.text,0,0,function(d){var e=a.events&&a.events.click,f;e&&(f=e.call(a,d));!1!==f&&c.clickButton(b);c.isActive=!0},x,D&&D.hover,D&&D.select,D&&D.disabled).attr({"text-align":"center"}).add(F)}),!1!==C&&(c.div=p=h("div",null,{position:"relative",height:0,zIndex:v}),l.parentNode.insertBefore(p,l),c.inputGroup=p=g.g("input-group").add(K),p.offset=0,c.drawInput("min"),c.drawInput("max")));c.zoomText[fa]({x:B(E+y.x,E)});var ea=B(E+y.x,E)+c.zoomText.getBBox().width+5;c.buttonOptions.forEach(function(a,
b){w[b][fa]({x:ea});ea+=w[b].width+B(q.buttonSpacing,5)});E=d.plotLeft-d.spacing[3];c.updateButtonStates();k&&this.titleCollision(d)&&"top"===M&&"right"===y.align&&y.y+F.getBBox().height-12<(k.y||0)+k.height&&(aa=-40);"left"===y.align?Y=y.x-d.spacing[3]:"right"===y.align&&(Y=y.x+aa-d.spacing[1]);F.align({y:y.y,width:F.getBBox().width,align:y.align,x:Y},!0,d.spacingBox);c.group.placed=X;c.buttonGroup.placed=X;!1!==C&&(aa=k&&this.titleCollision(d)&&"top"===M&&"right"===z.align&&z.y-p.getBBox().height-
12<(k.y||0)+k.height+d.spacing[0]?-40:0,"left"===z.align?Y=E:"right"===z.align&&(Y=-Math.max(d.axisOffset[1],-aa)),p.align({y:z.y,width:p.getBBox().width,align:z.align,x:z.x+Y-2},!0,d.spacingBox),l=p.alignAttr.translateX+p.alignOptions.x-aa+p.getBBox().x+2,k=p.alignOptions.width,m=F.alignAttr.translateX+F.getBBox().x,Y=F.getBBox().width+20,(z.align===y.align||m+Y>l&&l+k>m&&S<R+p.getBBox().height)&&p.attr({translateX:p.alignAttr.translateX+(d.axisOffset[1]>=-aa?0:-aa),translateY:p.alignAttr.translateY+
F.getBBox().height+10}),c.setInputValue("min",a),c.setInputValue("max",b),c.inputGroup.placed=X);c.group.align({verticalAlign:M},!0,d.spacingBox);a=c.group.getBBox().height+20;b=c.group.alignAttr.translateY;"bottom"===M&&(T=Z&&"bottom"===Z.verticalAlign&&Z.enabled&&!Z.floating?T.legendHeight+B(Z.margin,10):0,a=a+T-20,W=b-a-(e?0:q.y)-(d.titleOffset?d.titleOffset[2]:0)-10);if("top"===M)e&&(W=0),d.titleOffset&&d.titleOffset[0]&&(W=d.titleOffset[0]),W+=d.margin[0]-d.spacing[0]||0;else if("middle"===M)if(R===
S)W=0>R?b+void 0:b;else if(R||S)W=0>R||0>S?W-Math.min(R,S):b-a+NaN;c.group.translate(q.x,q.y+Math.floor(W));!1!==C&&(c.minInput.style.marginTop=c.group.translateY+"px",c.maxInput.style.marginTop=c.group.translateY+"px");c.rendered=!0}},getHeight:function(){var a=this.options,b=this.group,c=a.y,d=a.buttonPosition.y,f=a.inputPosition.y;if(a.height)return a.height;a=b?b.getBBox(!0).height+13+c:0;b=Math.min(f,d);if(0>f&&0>d||0<f&&0<d)a+=Math.abs(b);return a},titleCollision:function(a){return!(a.options.title.text||
a.options.subtitle.text)},update:function(a){var c=this.chart;b(!0,c.options.rangeSelector,a);this.destroy();this.init(c);c.rangeSelector.render()},destroy:function(){var a=this,b=a.minInput,c=a.maxInput;a.unMouseDown();a.unResize();E(a.buttons);b&&(b.onfocus=b.onblur=b.onchange=null);c&&(c.onfocus=c.onblur=c.onchange=null);C(a,function(b,c){b&&"chart"!==c&&(b.destroy?b.destroy():b.nodeType&&D(this[c]));b!==y.prototype[c]&&(a[c]=null)},this)}};q.prototype.minFromRange=function(){var a=this.range,
b={month:"Month",year:"FullYear"}[a.type],c=this.max,d=this.chart.time,f=function(a,c){var e=new d.Date(a),f=d.get(b,e);d.set(b,e,f+c);f===d.get(b,e)&&d.set("Date",e,0);return e.getTime()-a};if(v(a)){var g=c-a;var e=a}else g=c+f(c,-a.count),this.chart&&(this.chart.fixedRange=c-g);var h=B(this.dataMin,Number.MIN_VALUE);v(g)||(g=h);g<=h&&(g=h,"undefined"===typeof e&&(e=f(g,a.count)),this.newMax=Math.min(g+e,this.dataMax));v(c)||(g=void 0);return g};d.RangeSelector||(m(g,"afterGetContainer",function(){this.options.rangeSelector.enabled&&
(this.rangeSelector=new y(this))}),m(g,"beforeRender",function(){var a=this.axes,b=this.rangeSelector;b&&(v(b.deferredYTDClick)&&(b.clickButton(b.deferredYTDClick),delete b.deferredYTDClick),a.forEach(function(a){a.updateNames();a.setScale()}),this.getAxisMargins(),b.render(),a=b.options.verticalAlign,b.options.floating||("bottom"===a?this.extraBottomMargin=!0:"middle"!==a&&(this.extraTopMargin=!0)))}),m(g,"update",function(a){var b=a.options.rangeSelector;a=this.rangeSelector;var c=this.extraBottomMargin,
d=this.extraTopMargin;b&&b.enabled&&!F(a)&&(this.options.rangeSelector.enabled=!0,this.rangeSelector=new y(this));this.extraTopMargin=this.extraBottomMargin=!1;a&&(a.render(),b=b&&b.verticalAlign||a.options&&a.options.verticalAlign,a.options.floating||("bottom"===b?this.extraBottomMargin=!0:"middle"!==b&&(this.extraTopMargin=!0)),this.extraBottomMargin!==c||this.extraTopMargin!==d)&&(this.isDirtyBox=!0)}),m(g,"render",function(){var a=this.rangeSelector;a&&!a.options.floating&&(a.render(),a=a.options.verticalAlign,
"bottom"===a?this.extraBottomMargin=!0:"middle"!==a&&(this.extraTopMargin=!0))}),m(g,"getMargins",function(){var a=this.rangeSelector;a&&(a=a.getHeight(),this.extraTopMargin&&(this.plotTop+=a),this.extraBottomMargin&&(this.marginBottom+=a))}),g.prototype.callbacks.push(function(a){function b(){c=a.xAxis[0].getExtremes();v(c.min)&&d.render(c.min,c.max)}var c,d=a.rangeSelector;if(d){var f=m(a.xAxis[0],"afterSetExtremes",function(a){d.render(a.min,a.max)});var g=m(a,"redraw",b);b()}m(a,"destroy",function(){d&&
(g(),f())})}),d.RangeSelector=y)});K(y,"parts/StockChart.js",[y["parts/Globals.js"],y["parts/Utilities.js"]],function(d,g){var y=g.arrayMax,F=g.arrayMin,E=g.clamp,D=g.defined,x=g.extend,v=g.isNumber,C=g.isString,B=g.pick,p=g.splat;g=d.addEvent;var z=d.Axis,m=d.Chart,q=d.format,w=d.merge,h=d.Point,f=d.Renderer,c=d.Series,b=d.SVGRenderer,a=d.VMLRenderer,l=c.prototype,n=l.init,t=l.processData,I=h.prototype.tooltipFormatter;d.StockChart=d.stockChart=function(a,b,c){var e=C(a)||a.nodeName,f=arguments[e?
1:0],g=f,h=f.series,k=d.getOptions(),l,r=f.chart&&f.chart.panning,n=B(f.navigator&&f.navigator.enabled,k.navigator.enabled,!0),q=r&&/y/.test(r.type),t={startOnTick:!1,endOnTick:!1};f.xAxis=p(f.xAxis||{}).map(function(a,b){return w({minPadding:0,maxPadding:0,overscroll:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},k.xAxis,k.xAxis&&k.xAxis[b],a,{type:"datetime",categories:null},n?t:null)});f.yAxis=p(f.yAxis||{}).map(function(a,b){l=B(a.opposite,!0);return w({labels:{y:-2},
opposite:l,showLastLabel:!(!a.categories&&"category"!==a.type),title:{text:null}},k.yAxis,k.yAxis&&k.yAxis[b],a,q?t:null)});f.series=null;f=w({chart:{panning:{enabled:!0,type:"x"},pinchType:"x"},navigator:{enabled:n},scrollbar:{enabled:B(k.scrollbar.enabled,!0)},rangeSelector:{enabled:B(k.rangeSelector.enabled,!0)},title:{text:null},tooltip:{split:B(k.tooltip.split,!0),crosshairs:!0},legend:{enabled:!1}},f,{isStock:!0});f.series=g.series=h;return e?new m(a,f,c):new m(f,b)};g(c,"setOptions",function(a){function b(a){return d.seriesTypes[a]&&
c instanceof d.seriesTypes[a]}var c=this,f;this.chart.options.isStock&&(b("column")||b("columnrange")?f={borderWidth:0,shadow:!1}:!b("line")||b("scatter")||b("sma")||(f={marker:{enabled:!1,radius:2}}),f&&(a.plotOptions[this.type]=w(a.plotOptions[this.type],f)))});g(z,"autoLabelAlign",function(a){var b=this.chart,c=this.options;b=b._labelPanes=b._labelPanes||{};var d=this.options.labels;this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled&&(15===d.x&&(d.x=0),"undefined"===
typeof d.align&&(d.align="right"),b[c]=this,a.align="right",a.preventDefault()))});g(z,"destroy",function(){var a=this.chart,b=this.options&&this.options.top+","+this.options.height;b&&a._labelPanes&&a._labelPanes[b]===this&&delete a._labelPanes[b]});g(z,"getPlotLinePath",function(a){function b(a){var b="xAxis"===a?"yAxis":"xAxis";a=c.options[b];return v(a)?[g[b][a]]:C(a)?[g.get(a)]:f.map(function(a){return a[b]})}var c=this,f=this.isLinked&&!this.series?this.linkedParent.series:this.series,g=c.chart,
h=g.renderer,l=c.left,m=c.top,r,n,p,q,t=[],w=[],x=a.translatedValue,y=a.value,z=a.force;if(g.options.isStock&&!1!==a.acrossPanes&&"xAxis"===c.coll||"yAxis"===c.coll){a.preventDefault();w=b(c.coll);var F=c.isXAxis?g.yAxis:g.xAxis;F.forEach(function(a){if(D(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis";b=D(a.options[b])?g[b][a.options[b]]:g[b][0];c===b&&w.push(a)}});var I=w.length?[]:[c.isXAxis?g.yAxis[0]:g.xAxis[0]];w.forEach(function(a){-1!==I.indexOf(a)||
d.find(I,function(b){return b.pos===a.pos&&b.len===a.len})||I.push(a)});var K=B(x,c.translate(y,null,null,a.old));v(K)&&(c.horiz?I.forEach(function(a){var b;n=a.pos;q=n+a.len;r=p=Math.round(K+c.transB);"pass"!==z&&(r<l||r>l+c.width)&&(z?r=p=E(r,l,l+c.width):b=!0);b||t.push("M",r,n,"L",p,q)}):I.forEach(function(a){var b;r=a.pos;p=r+a.len;n=q=Math.round(m+c.height-K);"pass"!==z&&(n<m||n>m+c.height)&&(z?n=q=E(n,m,m+c.height):b=!0);b||t.push("M",r,n,"L",p,q)}));a.path=0<t.length?h.crispPolyLine(t,a.lineWidth||
1):null}});b.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};f===a&&(a.prototype.crispPolyLine=b.prototype.crispPolyLine);g(z,"afterHideCrosshair",function(){this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});g(z,"afterDrawCrosshair",function(a){var b,c;if(D(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){var d=this.chart,f=this.options.crosshair.label,
g=this.horiz,h=this.opposite,l=this.left,m=this.top,r=this.crossLabel,n=f.format,p="",t="inside"===this.options.tickPosition,v=!1!==this.crosshair.snap,w=0,y=a.e||this.cross&&this.cross.e,z=a.point;var C=this.lin2log;if(this.isLog){a=C(this.min);var E=C(this.max)}else a=this.min,E=this.max;C=g?"center":h?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";r||(r=this.crossLabel=d.renderer.label(null,null,null,f.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&
" highcharts-color-"+this.series[0].colorIndex)).attr({align:f.align||C,padding:B(f.padding,8),r:B(f.borderRadius,3),zIndex:2}).add(this.labelGroup),d.styledMode||r.attr({fill:f.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:f.borderColor||"","stroke-width":f.borderWidth||0}).css(x({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},f.style)));g?(C=v?z.plotX+l:y.chartX,m+=h?0:this.height):(C=h?this.width+l:0,m=v?z.plotY+m:y.chartY);n||f.formatter||(this.isDatetimeAxis&&
(p="%b %d, %Y"),n="{value"+(p?":"+p:"")+"}");p=v?z[this.isXAxis?"x":"y"]:this.toValue(g?y.chartX:y.chartY);r.attr({text:n?q(n,{value:p},d):f.formatter.call(this,p),x:C,y:m,visibility:p<a||p>E?"hidden":"visible"});f=r.getBBox();if(g){if(t&&!h||!t&&h)m=r.y-f.height}else m=r.y-f.height/2;g?(b=l-f.x,c=l+this.width-f.x):(b="left"===this.labelAlign?l:0,c="right"===this.labelAlign?l+this.width:d.chartWidth);r.translateX<b&&(w=b-r.translateX);r.translateX+f.width>=c&&(w=-(r.translateX+f.width-c));r.attr({x:C+
w,y:m,anchorX:g?C:this.opposite?0:d.chartWidth,anchorY:g?this.opposite?d.chartHeight:0:m+f.height/2})}});l.init=function(){n.apply(this,arguments);this.setCompare(this.options.compare)};l.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;return"undefined"!==typeof b&&"undefined"!==typeof d?(b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b):0}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=
!0)};l.processData=function(a){var b,c=-1,d=!0===this.options.compareStart?0:1;t.apply(this,arguments);if(this.xAxis&&this.processedYData){var f=this.processedXData;var g=this.processedYData;var h=g.length;this.pointArrayMap&&(c=this.pointArrayMap.indexOf(this.options.pointValKey||this.pointValKey||"y"));for(b=0;b<h-d;b++){var l=g[b]&&-1<c?g[b][c]:g[b];if(v(l)&&f[b+d]>=this.xAxis.min&&0!==l){this.compareValue=l;break}}}};g(c,"afterGetExtremes",function(){if(this.modifyValue){var a=[this.modifyValue(this.dataMin),
this.modifyValue(this.dataMax)];this.dataMin=F(a);this.dataMax=y(a)}});z.prototype.setCompare=function(a,b){this.isXAxis||(this.series.forEach(function(b){b.setCompare(a)}),B(b,!0)&&this.chart.redraw())};h.prototype.tooltipFormatter=function(a){var b=this.series.chart.numberFormatter;a=a.replace("{point.change}",(0<this.change?"+":"")+b(this.change,B(this.series.tooltipOptions.changeDecimals,2)));return I.apply(this,[a])};g(c,"render",function(){var a=this.chart;if(!(a.is3d&&a.is3d()||a.polar)&&this.xAxis&&
!this.xAxis.isRadial){var b=this.yAxis.len;if(this.xAxis.axisLine){var c=a.plotTop+a.plotHeight-this.yAxis.pos-this.yAxis.len,d=Math.floor(this.xAxis.axisLine.strokeWidth()/2);0<=c&&(b-=Math.max(d-c,0))}!this.clipBox&&this.animate?(this.clipBox=w(a.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=b):a[this.sharedClipKey]&&(a[this.sharedClipKey].animate({width:this.xAxis.len,height:b}),a[this.sharedClipKey+"m"]&&a[this.sharedClipKey+"m"].animate({width:this.xAxis.len}))}});g(m,"update",
function(a){a=a.options;"scrollbar"in a&&this.navigator&&(w(!0,this.options.scrollbar,a.scrollbar),this.navigator.update({},!1),delete a.scrollbar)});g(z,"afterSetScale",function(){var a=this,b=a.chart.options.chart&&a.chart.options.chart.panning;if(b&&("y"===b.type||"xy"===b.type)&&!a.isXAxis&&!D(a.panningState)){var c=Number.MAX_VALUE,f=Number.MIN_VALUE;a.series.forEach(function(b){c=Math.min(d.arrayMin(b.yData),c)-(a.min&&a.dataMin?a.dataMin-a.min:0);f=Math.max(d.arrayMax(b.yData),f)+(a.max&&a.dataMax?
a.max-a.dataMax:0)});a.panningState={startMin:c,startMax:f}}})});K(y,"masters/modules/stock.src.js",[],function(){});K(y,"masters/highstock.src.js",[y["masters/highcharts.src.js"]],function(d){d.product="Highstock";return d});y["masters/highstock.src.js"]._modules=y;return y["masters/highstock.src.js"]});
//# sourceMappingURL=highstock.js.map
;
/*
 Highcharts JS v8.0.0 (2019-12-10)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(t){"object"===typeof module&&module.exports?(t["default"]=t,module.exports=t):"function"===typeof define&&define.amd?define("highcharts/highcharts-more",["highcharts"],function(A){t(A);t.Highcharts=A;return t}):t("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(t){function A(b,a,r,g){b.hasOwnProperty(a)||(b[a]=g.apply(null,r))}t=t?t._modules:{};A(t,"parts-more/Pane.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){function r(a,e){this.init(a,e)}var g=a.extend,
m=a.splat,k=b.CenteredSeriesMixin,w=b.merge;b.Chart.prototype.collectionsWithUpdate.push("pane");g(r.prototype,{coll:"pane",init:function(a,e){this.chart=e;this.background=[];e.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=w(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,e=this.options.background,l=this.chart.renderer;this.group||(this.group=l.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(e)for(e=
m(e),a=Math.max(e.length,this.background.length||0),l=0;l<a;l++)e[l]&&this.axis?this.renderBackground(w(this.defaultBackgroundOptions,e[l]),l):this.background[l]&&(this.background[l]=this.background[l].destroy(),this.background.splice(l,1))},renderBackground:function(a,e){var l="animate",b={"class":"highcharts-pane "+(a.className||"")};this.chart.styledMode||g(b,{fill:a.backgroundColor,stroke:a.borderColor,"stroke-width":a.borderWidth});this.background[e]||(this.background[e]=this.chart.renderer.path().add(this.group),
l="attr");this.background[e][l]({d:this.axis.getPlotBandPath(a.from,a.to,a)}).attr(b)},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=k.getCenter.call(this)},update:function(a,e){w(!0,
this.options,a);w(!0,this.chart.options.pane,a);this.setOptions(this.options);this.render();this.chart.axes.forEach(function(a){a.pane===this&&(a.pane=null,a.update({},e))},this)}});b.Pane=r});A(t,"parts-more/RadialAxis.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.correctFloat,g=a.defined,m=a.extend,k=a.pick,w=a.pInt,z=a.relativeLength;a=a.wrap;var e=b.addEvent,l=b.Axis,u=b.merge,h=b.noop,d=b.Tick,B=l.prototype,x=d.prototype;var n={getOffset:h,redraw:function(){this.isDirty=
!1},render:function(){this.isDirty=!1},createLabelCollector:function(){return!1},setScale:h,setCategories:h,setTitle:h};var p={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultCircularOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null,style:{textOverflow:"none"}},maxPadding:0,minPadding:0,
showLastLabel:!1,tickLength:0},defaultRadialOptions:{gridLineInterpolation:"circle",gridLineWidth:1,labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(c){c=this.options=u(this.defaultOptions,this.defaultPolarOptions,c);c.plotBands||(c.plotBands=[]);b.fireEvent(this,"afterSetOptions")},getOffset:function(){B.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(c,f){c=this.center;var q=this.chart,p=k(f,c[2]/2-this.offset);
this.isCircular||"undefined"!==typeof f?(f=this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],p,p,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),f.xBounds=[this.left+c[0]],f.yBounds=[this.top+c[1]-p]):(f=this.postTranslate(this.angleRad,p),f=["M",c[0]+q.plotLeft,c[1]+q.plotTop,"L",f.x,f.y]);return f},setAxisTranslation:function(){B.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/
2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){this.autoConnect=this.isCircular&&"undefined"===typeof k(this.userMax,this.options.max)&&r(this.endAngleRad-this.startAngleRad)===r(2*Math.PI);!this.isCircular&&this.chart.inverted&&this.max++;this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0)},setAxisSize:function(){B.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),
this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*k(this.sector,1)/2)},getPosition:function(c,f){c=this.translate(c);return this.postTranslate(this.isCircular?c:this.angleRad,k(this.isCircular?f:0>c?0:c,this.center[2]/2)-this.offset)},postTranslate:function(c,f){var q=this.chart,p=this.center;c=this.startAngleRad+c;return{x:q.plotLeft+p[0]+Math.cos(c)*f,y:q.plotTop+p[1]+Math.sin(c)*f}},getPlotBandPath:function(c,f,q){var p=this.center,
d=this.startAngleRad,h=p[2]/2,v=[k(q.outerRadius,"100%"),q.innerRadius,k(q.thickness,10)],a=Math.min(this.offset,0),n=/%$/;var e=this.isCircular;if("polygon"===this.options.gridLineInterpolation)v=this.getPlotLinePath({value:c}).concat(this.getPlotLinePath({value:f,reverse:!0}));else{c=Math.max(c,this.min);f=Math.min(f,this.max);e||(v[0]=this.translate(c),v[1]=this.translate(f));v=v.map(function(f){n.test(f)&&(f=w(f,10)*h/100);return f});if("circle"!==q.shape&&e)c=d+this.translate(c),f=d+this.translate(f);
else{c=-Math.PI/2;f=1.5*Math.PI;var g=!0}v[0]-=a;v[2]-=a;v=this.chart.renderer.symbols.arc(this.left+p[0],this.top+p[1],v[0],v[0],{start:Math.min(c,f),end:Math.max(c,f),innerR:k(v[1],v[0]-v[2]),open:g});e&&(e=(f+c)/2,a=this.left+p[0]+p[2]/2*Math.cos(e),v.xBounds=e>-Math.PI/2&&e<Math.PI/2?[a,this.chart.plotWidth]:[0,a],v.yBounds=[this.top+p[1]+p[2]/2*Math.sin(e)],v.yBounds[0]+=e>-Math.PI&&0>e||e>Math.PI?-10:10)}return v},getCrosshairPosition:function(c,f,q){var p=c.value;if(this.isCircular){if(g(p))c.point&&
(d=c.point.shapeArgs||{},d.start&&(p=this.translate(c.point.rectPlotY,!0)));else{var d=c.chartX||0;var a=c.chartY||0;p=this.translate(Math.atan2(a-q,d-f)-this.startAngleRad,!0)}c=this.getPosition(p);d=c.x;a=c.y}else g(p)||(d=c.chartX,a=c.chartY),g(d)&&g(a)&&(p=this.translate(Math.min(Math.sqrt(Math.pow(d-f,2)+Math.pow(a-q,2)),this.len),!0));return[p,d||0,a||0]},getPlotLinePath:function(c){var f=this,q=f.center,p=f.chart,d=p.inverted,a=c.value,e=c.reverse,h=f.getPosition(a),n=f.pane.options.background?
f.pane.options.background[0]||f.pane.options.background:{},g=n.innerRadius||"0%",l=n.outerRadius||"100%";n=q[0]+p.plotLeft;q=q[1]+p.plotTop;var b=h.x;h=h.y;var u,m;c.isCrosshair&&(h=this.getCrosshairPosition(c,n,q),a=h[0],b=h[1],h=h[2]);if(f.isCircular){e="string"===typeof g?z(g,1):g/Math.sqrt(Math.pow(b-n,2)+Math.pow(h-q,2));c="string"===typeof l?z(l,1):l/Math.sqrt(Math.pow(b-n,2)+Math.pow(h-q,2));var r=["M",n+e*(b-n),q-e*(q-h),"L",b-(1-c)*(b-n),h+(1-c)*(q-h)]}else a=f.translate(a),!c.isCrosshair&&
(0>a||a>f.height)&&d&&(a=0),"circle"===f.options.gridLineInterpolation?r=f.getLinePath(0,a):(p[d?"yAxis":"xAxis"].forEach(function(c){c.pane===f.pane&&(u=c)}),r=[],n=u.tickPositions,u.autoConnect&&(n=n.concat([n[0]])),e&&(n=[].concat(n).reverse()),n.forEach(function(f,c){m=u.getPosition(f,a);r.push(c?"L":"M",m.x,m.y)}));return r},getTitlePosition:function(){var c=this.center,f=this.chart,q=this.options.title;return{x:f.plotLeft+c[0]+(q.x||0),y:f.plotTop+c[1]-{high:.5,middle:.25,low:0}[q.align]*c[2]+
(q.y||0)}},createLabelCollector:function(){var c=this;return function(){if(c.isRadial&&c.tickPositions&&!0!==c.options.labels.allowOverlap)return c.tickPositions.map(function(f){return c.ticks[f]&&c.ticks[f].label}).filter(function(f){return!!f})}}};e(l,"init",function(c){var f=this.chart,q=f.inverted,d=f.angular,a=f.polar,h=this.isXAxis,e=this.coll,g=d&&h,l,b=f.options;c=c.userOptions.pane||0;c=this.pane=f.pane&&f.pane[c];if("colorAxis"===e)this.isRadial=!1;else{if(d){if(m(this,g?n:p),l=!h)this.defaultPolarOptions=
this.defaultRadialGaugeOptions}else a&&(m(this,p),this.defaultPolarOptions=(l=this.horiz)?this.defaultCircularOptions:u("xAxis"===e?this.defaultOptions:this.defaultYAxisOptions,this.defaultRadialOptions),q&&"yAxis"===e&&(this.defaultPolarOptions.stackLabels=this.defaultYAxisOptions.stackLabels));d||a?(this.isRadial=!0,b.chart.zoomType=null,this.labelCollector||(this.labelCollector=this.createLabelCollector()),this.labelCollector&&f.labelCollectors.push(this.labelCollector)):this.isRadial=!1;c&&l&&
(c.axis=this);this.isCircular=l}});e(l,"afterInit",function(){var c=this.chart,f=this.options,q=this.pane,p=q&&q.options;c.angular&&this.isXAxis||!q||!c.angular&&!c.polar||(this.angleRad=(f.angle||0)*Math.PI/180,this.startAngleRad=(p.startAngle-90)*Math.PI/180,this.endAngleRad=(k(p.endAngle,p.startAngle+360)-90)*Math.PI/180,this.offset=f.offset||0)});e(l,"autoLabelAlign",function(c){this.isRadial&&(c.align=void 0,c.preventDefault())});e(l,"destroy",function(){if(this.chart&&this.chart.labelCollectors){var c=
this.chart.labelCollectors.indexOf(this.labelCollector);0<=c&&this.chart.labelCollectors.splice(c,1)}});e(d,"afterGetPosition",function(c){this.axis.getPosition&&m(c.pos,this.axis.getPosition(this.pos))});e(d,"afterGetLabelPosition",function(c){var f=this.axis,q=this.label,p=q.getBBox(),d=f.options.labels,a=d.y,h=20,n=d.align,e=(f.translate(this.pos)+f.startAngleRad+Math.PI/2)/Math.PI*180%360,l=Math.round(e),g="end",b=0>l?l+360:l,u=b,m=0,r=0,B=null===d.y?.3*-p.height:0;if(f.isRadial){var x=f.getPosition(this.pos,
f.center[2]/2+z(k(d.distance,-25),f.center[2]/2,-f.center[2]/2));"auto"===d.rotation?q.attr({rotation:e}):null===a&&(a=f.chart.renderer.fontMetrics(q.styles&&q.styles.fontSize).b-p.height/2);null===n&&(f.isCircular?(p.width>f.len*f.tickInterval/(f.max-f.min)&&(h=0),n=e>h&&e<180-h?"left":e>180+h&&e<360-h?"right":"center"):n="center",q.attr({align:n}));if("auto"===n&&2===f.tickPositions.length&&f.isCircular){90<b&&180>b?b=180-b:270<b&&360>=b&&(b=540-b);180<u&&360>=u&&(u=360-u);if(f.pane.options.startAngle===
l||f.pane.options.startAngle===l+360||f.pane.options.startAngle===l-360)g="start";n=-90<=l&&90>=l||-360<=l&&-270>=l||270<=l&&360>=l?"start"===g?"right":"left":"start"===g?"left":"right";70<u&&110>u&&(n="center");15>b||180<=b&&195>b?m=.3*p.height:15<=b&&35>=b?m="start"===g?0:.75*p.height:195<=b&&215>=b?m="start"===g?.75*p.height:0:35<b&&90>=b?m="start"===g?.25*-p.height:p.height:215<b&&270>=b&&(m="start"===g?p.height:.25*-p.height);15>u?r="start"===g?.15*-p.height:.15*p.height:165<u&&180>=u&&(r="start"===
g?.15*p.height:.15*-p.height);q.attr({align:n});q.translate(r,m+B)}c.pos.x=x.x+d.x;c.pos.y=x.y+a}});a(x,"getMarkPath",function(c,f,q,p,d,a,h){var n=this.axis;n.isRadial?(c=n.getPosition(this.pos,n.center[2]/2+p),f=["M",f,q,"L",c.x,c.y]):f=c.call(this,f,q,p,d,a,h);return f})});A(t,"parts-more/AreaRangeSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.defined,g=a.extend,m=a.isArray,k=a.isNumber,w=a.pick;a=b.seriesType;var z=b.seriesTypes,e=b.Series.prototype,l=b.Point.prototype;
a("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],pointValKey:"low",deferTranslatePolar:!0,toYData:function(a){return[a.low,a.high]},highToXY:function(a){var h=this.chart,d=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=
d.x-h.plotLeft;a.plotHigh=d.y-h.plotTop;a.plotLowX=a.plotX},translate:function(){var a=this,h=a.yAxis,d=!!a.modifyValue;z.area.prototype.translate.apply(a);a.points.forEach(function(e){var b=e.high,n=e.plotY;e.isNull?e.plotY=null:(e.plotLow=n,e.plotHigh=h.translate(d?a.modifyValue(b,e):b,0,1,0,1),d&&(e.yBottom=e.plotHigh))});this.chart.polar&&this.points.forEach(function(d){a.highToXY(d);d.tooltipPos=[(d.plotHighX+d.plotLowX)/2,(d.plotHigh+d.plotLow)/2]})},getGraphPath:function(a){var e=[],d=[],b,
l=z.area.prototype.getGraphPath;var n=this.options;var p=this.chart.polar&&!1!==n.connectEnds,c=n.connectNulls,f=n.step;a=a||this.points;for(b=a.length;b--;){var q=a[b];q.isNull||p||c||a[b+1]&&!a[b+1].isNull||d.push({plotX:q.plotX,plotY:q.plotY,doCurve:!1});var F={polarPlotY:q.polarPlotY,rectPlotX:q.rectPlotX,yBottom:q.yBottom,plotX:w(q.plotHighX,q.plotX),plotY:q.plotHigh,isNull:q.isNull};d.push(F);e.push(F);q.isNull||p||c||a[b-1]&&!a[b-1].isNull||d.push({plotX:q.plotX,plotY:q.plotY,doCurve:!1})}a=
l.call(this,a);f&&(!0===f&&(f="left"),n.step={left:"right",center:"center",right:"left"}[f]);e=l.call(this,e);d=l.call(this,d);n.step=f;n=[].concat(a,e);this.chart.polar||"M"!==d[0]||(d[0]="L");this.graphPath=n;this.areaPath=a.concat(d);n.isArea=!0;n.xMap=a.xMap;this.areaPath.xMap=a.xMap;return n},drawDataLabels:function(){var a=this.points,h=a.length,d,b=[],l=this.options.dataLabels,n,p=this.chart.inverted;if(m(l))if(1<l.length){var c=l[0];var f=l[1]}else c=l[0],f={enabled:!1};else c=g({},l),c.x=
l.xHigh,c.y=l.yHigh,f=g({},l),f.x=l.xLow,f.y=l.yLow;if(c.enabled||this._hasPointLabels){for(d=h;d--;)if(n=a[d]){var q=c.inside?n.plotHigh<n.plotLow:n.plotHigh>n.plotLow;n.y=n.high;n._plotY=n.plotY;n.plotY=n.plotHigh;b[d]=n.dataLabel;n.dataLabel=n.dataLabelUpper;n.below=q;p?c.align||(c.align=q?"right":"left"):c.verticalAlign||(c.verticalAlign=q?"top":"bottom")}this.options.dataLabels=c;e.drawDataLabels&&e.drawDataLabels.apply(this,arguments);for(d=h;d--;)if(n=a[d])n.dataLabelUpper=n.dataLabel,n.dataLabel=
b[d],delete n.dataLabels,n.y=n.low,n.plotY=n._plotY}if(f.enabled||this._hasPointLabels){for(d=h;d--;)if(n=a[d])q=f.inside?n.plotHigh<n.plotLow:n.plotHigh>n.plotLow,n.below=!q,p?f.align||(f.align=q?"left":"right"):f.verticalAlign||(f.verticalAlign=q?"bottom":"top");this.options.dataLabels=f;e.drawDataLabels&&e.drawDataLabels.apply(this,arguments)}if(c.enabled)for(d=h;d--;)if(n=a[d])n.dataLabels=[n.dataLabelUpper,n.dataLabel].filter(function(f){return!!f});this.options.dataLabels=l},alignDataLabel:function(){z.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var a=this.points.length,h;e.drawPoints.apply(this,arguments);for(h=0;h<a;){var d=this.points[h];d.origProps={plotY:d.plotY,plotX:d.plotX,isInside:d.isInside,negative:d.negative,zone:d.zone,y:d.y};d.lowerGraphic=d.graphic;d.graphic=d.upperGraphic;d.plotY=d.plotHigh;r(d.plotHighX)&&(d.plotX=d.plotHighX);d.y=d.high;d.negative=d.high<(this.options.threshold||0);d.zone=this.zones.length&&d.getZone();this.chart.polar||(d.isInside=d.isTopInside="undefined"!==typeof d.plotY&&
0<=d.plotY&&d.plotY<=this.yAxis.len&&0<=d.plotX&&d.plotX<=this.xAxis.len);h++}e.drawPoints.apply(this,arguments);for(h=0;h<a;)d=this.points[h],d.upperGraphic=d.graphic,d.graphic=d.lowerGraphic,g(d,d.origProps),delete d.origProps,h++},setStackedPoints:b.noop},{setState:function(){var a=this.state,e=this.series,d=e.chart.polar;r(this.plotHigh)||(this.plotHigh=e.yAxis.toPixels(this.high,!0));r(this.plotLow)||(this.plotLow=this.plotY=e.yAxis.toPixels(this.low,!0));e.stateMarkerGraphic&&(e.lowerStateMarkerGraphic=
e.stateMarkerGraphic,e.stateMarkerGraphic=e.upperStateMarkerGraphic);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;d&&(this.plotX=this.plotHighX);l.setState.apply(this,arguments);this.state=a;this.plotY=this.plotLow;this.graphic=this.lowerGraphic;d&&(this.plotX=this.plotLowX);e.stateMarkerGraphic&&(e.upperStateMarkerGraphic=e.stateMarkerGraphic,e.stateMarkerGraphic=e.lowerStateMarkerGraphic,e.lowerStateMarkerGraphic=void 0);l.setState.apply(this,arguments)},haloPath:function(){var a=this.series.chart.polar,
e=[];this.plotY=this.plotLow;a&&(this.plotX=this.plotLowX);this.isInside&&(e=l.haloPath.apply(this,arguments));this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);this.isTopInside&&(e=e.concat(l.haloPath.apply(this,arguments)));return e},destroyElements:function(){["lowerGraphic","upperGraphic"].forEach(function(a){this[a]&&(this[a]=this[a].destroy())},this);this.graphic=null;return l.destroyElements.apply(this,arguments)},isValid:function(){return k(this.low)&&k(this.high)}});""});A(t,"parts-more/AreaSplineRangeSeries.js",
[t["parts/Globals.js"]],function(b){var a=b.seriesType;a("areasplinerange","arearange",null,{getPointSpline:b.seriesTypes.spline.prototype.getPointSpline});""});A(t,"parts-more/ColumnRangeSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.clamp,g=a.pick;a=b.defaultPlotOptions;var m=b.merge,k=b.noop,w=b.seriesType,z=b.seriesTypes.column.prototype;w("columnrange","arearange",m(a.column,a.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var a=
this,l=a.yAxis,b=a.xAxis,h=b.startAngleRad,d,m=a.chart,k=a.xAxis.isRadial,n=Math.max(m.chartWidth,m.chartHeight)+999,p;z.translate.apply(a);a.points.forEach(function(c){var f=c.shapeArgs,q=a.options.minPointLength;c.plotHigh=p=r(l.translate(c.high,0,1,0,1),-n,n);c.plotLow=r(c.plotY,-n,n);var e=p;var C=g(c.rectPlotY,c.plotY)-p;Math.abs(C)<q?(q-=C,C+=q,e-=q/2):0>C&&(C*=-1,e-=C);k?(d=c.barX+h,c.shapeType="path",c.shapeArgs={d:a.polarArc(e+C,e,d,d+c.pointWidth)}):(f.height=C,f.y=e,c.tooltipPos=m.inverted?
[l.len+l.pos-m.plotLeft-e-C/2,b.len+b.pos-m.plotTop-f.x-f.width/2,C]:[b.left-m.plotLeft+f.x+f.width/2,l.pos-m.plotTop+e+C/2,C])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:k,getSymbol:k,crispCol:function(){return z.crispCol.apply(this,arguments)},drawPoints:function(){return z.drawPoints.apply(this,arguments)},drawTracker:function(){return z.drawTracker.apply(this,arguments)},getColumnMetrics:function(){return z.getColumnMetrics.apply(this,arguments)},pointAttribs:function(){return z.pointAttribs.apply(this,
arguments)},animate:function(){return z.animate.apply(this,arguments)},polarArc:function(){return z.polarArc.apply(this,arguments)},translate3dPoints:function(){return z.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return z.translate3dShapes.apply(this,arguments)}},{setState:z.pointClass.prototype.setState});""});A(t,"parts-more/ColumnPyramidSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.clamp,g=a.pick;a=b.seriesType;var m=b.seriesTypes.column.prototype;
a("columnpyramid","column",{},{translate:function(){var a=this,b=a.chart,z=a.options,e=a.dense=2>a.closestPointRange*a.xAxis.transA;e=a.borderWidth=g(z.borderWidth,e?0:1);var l=a.yAxis,u=z.threshold,h=a.translatedThreshold=l.getThreshold(u),d=g(z.minPointLength,5),B=a.getColumnMetrics(),x=B.width,n=a.barW=Math.max(x,1+2*e),p=a.pointXOffset=B.offset;b.inverted&&(h-=.5);z.pointPadding&&(n=Math.ceil(n));m.translate.apply(a);a.points.forEach(function(c){var f=g(c.yBottom,h),q=999+Math.abs(f),e=r(c.plotY,
-q,l.len+q);q=c.plotX+p;var C=n/2,E=Math.min(e,f);f=Math.max(e,f)-E;c.barX=q;c.pointWidth=x;c.tooltipPos=b.inverted?[l.len+l.pos-b.plotLeft-e,a.xAxis.len-q-C,f]:[q+C,e+l.pos-b.plotTop,f];e=u+(c.total||c.y);"percent"===z.stacking&&(e=u+(0>c.y)?-100:100);e=l.toPixels(e,!0);var v=b.plotHeight-e-(b.plotHeight-h);var m=C*(E-e)/v;var k=C*(E+f-e)/v;v=q-m+C;m=q+m+C;var w=q+k+C;k=q-k+C;var B=E-d;var y=E+f;0>c.y&&(B=E,y=E+f+d);b.inverted&&(w=b.plotWidth-E,v=e-(b.plotWidth-h),m=C*(e-w)/v,k=C*(e-(w-f))/v,v=q+
C+m,m=v-2*m,w=q-k+C,k=q+k+C,B=E,y=E+f-d,0>c.y&&(y=E+f+d));c.shapeType="path";c.shapeArgs={x:v,y:B,width:m-v,height:f,d:["M",v,B,"L",m,B,w,y,k,y,"Z"]}})}});""});A(t,"parts-more/GaugeSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.clamp,g=a.isNumber,m=a.pick,k=a.pInt,w=b.merge,z=b.Series;a=b.seriesType;var e=b.TrackerMixin;a("gauge","line",{dataLabels:{borderColor:"#cccccc",borderRadius:3,borderWidth:1,crop:!1,defer:!1,enabled:!0,verticalAlign:"top",y:15,zIndex:2},dial:{},
pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:b.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var a=this.yAxis,e=this.options,h=a.center;this.generatePoints();this.points.forEach(function(d){var b=w(e.dial,d.dial),l=k(m(b.radius,"80%"))*h[2]/200,n=k(m(b.baseLength,"70%"))*l/100,p=k(m(b.rearLength,"10%"))*l/100,c=b.baseWidth||3,f=b.topWidth||1,q=e.overshoot,F=a.startAngleRad+a.translate(d.y,null,
null,null,!0);if(g(q)||!1===e.wrap)q=g(q)?q/180*Math.PI:0,F=r(F,a.startAngleRad-q,a.endAngleRad+q);F=180*F/Math.PI;d.shapeType="path";d.shapeArgs={d:b.path||["M",-p,-c/2,"L",n,-c/2,l,-f/2,l,f/2,n,c/2,-p,c/2,"z"],translateX:h[0],translateY:h[1],rotation:F};d.plotX=h[0];d.plotY=h[1]})},drawPoints:function(){var a=this,e=a.chart,h=a.yAxis.center,d=a.pivot,b=a.options,g=b.pivot,n=e.renderer;a.points.forEach(function(p){var c=p.graphic,f=p.shapeArgs,q=f.d,d=w(b.dial,p.dial);c?(c.animate(f),f.d=q):p.graphic=
n[p.shapeType](f).attr({rotation:f.rotation,zIndex:1}).addClass("highcharts-dial").add(a.group);if(!e.styledMode)p.graphic[c?"animate":"attr"]({stroke:d.borderColor||"none","stroke-width":d.borderWidth||0,fill:d.backgroundColor||"#000000"})});d?d.animate({translateX:h[0],translateY:h[1]}):(a.pivot=n.circle(0,0,m(g.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(h[0],h[1]).add(a.group),e.styledMode||a.pivot.attr({"stroke-width":g.borderWidth||0,stroke:g.borderColor||"#cccccc",fill:g.backgroundColor||
"#000000"}))},animate:function(a){var e=this;a||(e.points.forEach(function(a){var d=a.graphic;d&&(d.attr({rotation:180*e.yAxis.startAngleRad/Math.PI}),d.animate({rotation:a.shapeArgs.rotation},e.options.animation))}),e.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);z.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(a,e){z.prototype.setData.call(this,a,!1);this.processData();
this.generatePoints();m(e,!0)&&this.chart.redraw()},hasData:function(){return!!this.points.length},drawTracker:e&&e.drawTrackerPoint},{setState:function(a){this.state=a}});""});A(t,"parts-more/BoxPlotSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.pick;a=b.noop;var g=b.seriesType,m=b.seriesTypes;g("boxplot","column",{threshold:null,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},
whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttribs:function(){return{}},drawDataLabels:a,translate:function(){var a=this.yAxis,b=this.pointArrayMap;m.column.prototype.translate.apply(this);this.points.forEach(function(g){b.forEach(function(e){null!==g[e]&&(g[e+"Plot"]=a.translate(g[e],0,1,0,1))})})},drawPoints:function(){var a=
this,b=a.options,g=a.chart,e=g.renderer,l,m,h,d,B,x,n=0,p,c,f,q,F=!1!==a.doQuartiles,C,E=a.options.whiskerLength;a.points.forEach(function(v){var G=v.graphic,k=G?"animate":"attr",w=v.shapeArgs,u={},y={},D={},J={},t=v.color||a.color;"undefined"!==typeof v.plotY&&(p=w.width,c=Math.floor(w.x),f=c+p,q=Math.round(p/2),l=Math.floor(F?v.q1Plot:v.lowPlot),m=Math.floor(F?v.q3Plot:v.lowPlot),h=Math.floor(v.highPlot),d=Math.floor(v.lowPlot),G||(v.graphic=G=e.g("point").add(a.group),v.stem=e.path().addClass("highcharts-boxplot-stem").add(G),
E&&(v.whiskers=e.path().addClass("highcharts-boxplot-whisker").add(G)),F&&(v.box=e.path(void 0).addClass("highcharts-boxplot-box").add(G)),v.medianShape=e.path(void 0).addClass("highcharts-boxplot-median").add(G)),g.styledMode||(y.stroke=v.stemColor||b.stemColor||t,y["stroke-width"]=r(v.stemWidth,b.stemWidth,b.lineWidth),y.dashstyle=v.stemDashStyle||b.stemDashStyle,v.stem.attr(y),E&&(D.stroke=v.whiskerColor||b.whiskerColor||t,D["stroke-width"]=r(v.whiskerWidth,b.whiskerWidth,b.lineWidth),v.whiskers.attr(D)),
F&&(u.fill=v.fillColor||b.fillColor||t,u.stroke=b.lineColor||t,u["stroke-width"]=b.lineWidth||0,v.box.attr(u)),J.stroke=v.medianColor||b.medianColor||t,J["stroke-width"]=r(v.medianWidth,b.medianWidth,b.lineWidth),v.medianShape.attr(J)),x=v.stem.strokeWidth()%2/2,n=c+q+x,v.stem[k]({d:["M",n,m,"L",n,h,"M",n,l,"L",n,d]}),F&&(x=v.box.strokeWidth()%2/2,l=Math.floor(l)+x,m=Math.floor(m)+x,c+=x,f+=x,v.box[k]({d:["M",c,m,"L",c,l,"L",f,l,"L",f,m,"L",c,m,"z"]})),E&&(x=v.whiskers.strokeWidth()%2/2,h+=x,d+=x,
C=/%$/.test(E)?q*parseFloat(E)/100:E/2,v.whiskers[k]({d:["M",n-C,h,"L",n+C,h,"M",n-C,d,"L",n+C,d]})),B=Math.round(v.medianPlot),x=v.medianShape.strokeWidth()%2/2,B+=x,v.medianShape[k]({d:["M",c,B,"L",f,B]}))})},setStackedPoints:a});""});A(t,"parts-more/ErrorBarSeries.js",[t["parts/Globals.js"]],function(b){var a=b.noop,r=b.seriesType,g=b.seriesTypes;r("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:g.arearange?function(){var a=this.pointValKey;g.arearange.prototype.drawDataLabels.call(this);this.data.forEach(function(b){b.y=b[a]})}:a,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||g.column.prototype.getColumnMetrics.call(this)}});""});A(t,"parts-more/WaterfallSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],
function(b,a){var r=a.arrayMax,g=a.arrayMin,m=a.correctFloat,k=a.isNumber,w=a.objectEach,t=a.pick;a=b.addEvent;var e=b.Axis,l=b.Chart,u=b.Point,h=b.Series,d=b.StackItem,B=b.seriesType,x=b.seriesTypes;a(e,"afterInit",function(){this.isXAxis||(this.waterfallStacks={changed:!1})});a(e,"afterBuildStacks",function(){this.waterfallStacks.changed=!1;delete this.waterfallStacks.alreadyChanged});a(l,"beforeRedraw",function(){for(var a=this.axes,p=this.series,c=p.length;c--;)p[c].options.stacking&&(a.forEach(function(f){f.isXAxis||
(f.waterfallStacks.changed=!0)}),c=0)});a(e,"afterRender",function(){var a=this.options.stackLabels;a&&a.enabled&&this.waterfallStacks&&this.renderWaterfallStackTotals()});e.prototype.renderWaterfallStackTotals=function(){var a=this.waterfallStacks,p=this.stackTotalGroup,c=new d(this,this.options.stackLabels,!1,0,void 0);this.dummyStackItem=c;w(a,function(f){w(f,function(f){c.total=f.stackTotal;f.label&&(c.label=f.label);d.prototype.render.call(c,p);f.label=c.label;delete c.label})});c.total=null};
B("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"Dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",showLine:!0,generatePoints:function(){var a;x.column.prototype.generatePoints.apply(this);var p=0;for(a=this.points.length;p<a;p++){var c=this.points[p];var f=this.processedYData[p];if(c.isIntermediateSum||c.isSum)c.y=m(f)}},translate:function(){var a=this.options,p=this.yAxis,c,f=t(a.minPointLength,5),q=f/2,e=a.threshold,d=a.stacking,
b=p.waterfallStacks[this.stackKey];x.column.prototype.translate.apply(this);var h=c=e;var g=this.points;var l=0;for(a=g.length;l<a;l++){var m=g[l];var r=this.processedYData[l];var y=m.shapeArgs;var k=[0,r];var u=m.y;if(d){if(b){k=b[l];if("overlap"===d){var w=k.stackState[k.stateIndex--];w=0<=u?w:w-u;Object.hasOwnProperty.call(k,"absolutePos")&&delete k.absolutePos;Object.hasOwnProperty.call(k,"absoluteNeg")&&delete k.absoluteNeg}else 0<=u?(w=k.threshold+k.posTotal,k.posTotal-=u):(w=k.threshold+k.negTotal,
k.negTotal-=u,w-=u),!k.posTotal&&Object.hasOwnProperty.call(k,"absolutePos")&&(k.posTotal=k.absolutePos,delete k.absolutePos),!k.negTotal&&Object.hasOwnProperty.call(k,"absoluteNeg")&&(k.negTotal=k.absoluteNeg,delete k.absoluteNeg);m.isSum||(k.connectorThreshold=k.threshold+k.stackTotal);p.reversed?(r=0<=u?w-u:w+u,u=w):(r=w,u=w-u);m.below=r<=t(e,0);y.y=p.translate(r,0,1,0,1);y.height=Math.abs(y.y-p.translate(u,0,1,0,1))}if(u=p.dummyStackItem)u.x=l,u.label=b[l].label,u.setOffset(this.pointXOffset||
0,this.barW||0,this.stackedYNeg[l],this.stackedYPos[l])}else w=Math.max(h,h+u)+k[0],y.y=p.translate(w,0,1,0,1),m.isSum?(y.y=p.translate(k[1],0,1,0,1),y.height=Math.min(p.translate(k[0],0,1,0,1),p.len)-y.y):m.isIntermediateSum?(0<=u?(r=k[1]+c,u=c):(r=c,u=k[1]+c),p.reversed&&(r^=u,u^=r,r^=u),y.y=p.translate(r,0,1,0,1),y.height=Math.abs(y.y-Math.min(p.translate(u,0,1,0,1),p.len)),c+=k[1]):(y.height=0<r?p.translate(h,0,1,0,1)-y.y:p.translate(h,0,1,0,1)-p.translate(h-r,0,1,0,1),h+=r,m.below=h<t(e,0)),
0>y.height&&(y.y+=y.height,y.height*=-1);m.plotY=y.y=Math.round(y.y)-this.borderWidth%2/2;y.height=Math.max(Math.round(y.height),.001);m.yBottom=y.y+y.height;y.height<=f&&!m.isNull?(y.height=f,y.y-=q,m.plotY=y.y,m.minPointLengthOffset=0>m.y?-q:q):(m.isNull&&(y.width=0),m.minPointLengthOffset=0);y=m.plotY+(m.negative?y.height:0);this.chart.inverted?m.tooltipPos[0]=p.len-y:m.tooltipPos[1]=y}},processData:function(a){var p=this.options,c=this.yData,f=p.data,q=c.length,e=p.threshold||0,d,b,n,g,l;for(l=
b=d=n=g=0;l<q;l++){var r=c[l];var k=f&&f[l]?f[l]:{};"sum"===r||k.isSum?c[l]=m(b):"intermediateSum"===r||k.isIntermediateSum?(c[l]=m(d),d=0):(b+=r,d+=r);n=Math.min(b,n);g=Math.max(b,g)}h.prototype.processData.call(this,a);p.stacking||(this.dataMin=n+e,this.dataMax=g)},toYData:function(a){return a.isSum?"sum":a.isIntermediateSum?"intermediateSum":a.y},updateParallelArrays:function(a,p){h.prototype.updateParallelArrays.call(this,a,p);if("sum"===this.yData[0]||"intermediateSum"===this.yData[0])this.yData[0]=
null},pointAttribs:function(a,p){var c=this.options.upColor;c&&!a.options.color&&(a.color=0<a.y?c:null);a=x.column.prototype.pointAttribs.call(this,a,p);delete a.dashstyle;return a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,p=this.yAxis,c=a.length,f=Math.round(this.graph.strokeWidth())%2/2,q=Math.round(this.borderWidth)%2/2,e=this.xAxis.reversed,d=this.yAxis.reversed,b=this.options.stacking,h=[],l;for(l=1;l<c;l++){var g=a[l].shapeArgs;var m=a[l-1];var r=a[l-
1].shapeArgs;var k=p.waterfallStacks[this.stackKey];var u=0<m.y?-r.height:0;if(k){k=k[l-1];b?(k=k.connectorThreshold,u=Math.round(p.translate(k,0,1,0,1)+(d?u:0))-f):u=r.y+m.minPointLengthOffset+q-f;var w=["M",r.x+(e?0:r.width),u,"L",g.x+(e?g.width:0),u]}if(!b&&w&&0>m.y&&!d||0<m.y&&d)w[2]+=r.height,w[5]+=r.height;h=h.concat(w)}return h},drawGraph:function(){h.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){function a(f,a,c,q){if(A)for(c;c<A;c++)x.stackState[c]+=
q;else x.stackState[0]=f,A=x.stackState.length;x.stackState.push(x.stackState[A-1]+a)}var p=this.options,c=this.yAxis.waterfallStacks,f=p.threshold,q=f||0,e=q,d=this.stackKey,b=this.xData,h=b.length,l,g,m;this.yAxis.usePercentage=!1;var r=g=m=q;if(this.visible||!this.chart.options.chart.ignoreHiddenSeries){var k=c.changed;(l=c.alreadyChanged)&&0>l.indexOf(d)&&(k=!0);c[d]||(c[d]={});l=c[d];for(var u=0;u<h;u++){var w=b[u];if(!l[w]||k)l[w]={negTotal:0,posTotal:0,stackTotal:0,threshold:0,stateIndex:0,
stackState:[],label:k&&l[w]?l[w].label:void 0};var x=l[w];var B=this.yData[u];0<=B?x.posTotal+=B:x.negTotal+=B;var t=p.data[u];w=x.absolutePos=x.posTotal;var z=x.absoluteNeg=x.negTotal;x.stackTotal=w+z;var A=x.stackState.length;t&&t.isIntermediateSum?(a(m,g,0,m),m=g,g=f,q^=e,e^=q,q^=e):t&&t.isSum?(a(f,r,A),q=f):(a(q,B,0,r),t&&(r+=B,g+=B));x.stateIndex++;x.threshold=q;q+=x.stackTotal}c.changed=!1;c.alreadyChanged||(c.alreadyChanged=[]);c.alreadyChanged.push(d)}},getExtremes:function(){var a=this.options.stacking;
if(a){var e=this.yAxis;e=e.waterfallStacks;var c=this.stackedYNeg=[];var f=this.stackedYPos=[];"overlap"===a?w(e[this.stackKey],function(a){c.push(g(a.stackState));f.push(r(a.stackState))}):w(e[this.stackKey],function(a){c.push(a.negTotal+a.threshold);f.push(a.posTotal+a.threshold)});this.dataMin=g(c);this.dataMax=r(f)}}},{getClassName:function(){var a=u.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return k(this.y)||
this.isSum||this.isIntermediateSum}});""});A(t,"parts-more/PolygonSeries.js",[t["parts/Globals.js"]],function(b){var a=b.Series,r=b.seriesType,g=b.seriesTypes;r("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var b=a.prototype.getGraphPath.call(this),g=b.length+1;g--;)(g===b.length||"M"===b[g])&&0<g&&b.splice(g,0,"z");return this.areaPath=b},drawGraph:function(){this.options.fillColor=
this.color;g.area.prototype.drawGraph.call(this)},drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,drawTracker:a.prototype.drawTracker,setStackedPoints:b.noop});""});A(t,"parts-more/BubbleLegend.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.arrayMax,g=a.arrayMin,m=a.isNumber,k=a.objectEach,w=a.pick;a=a.wrap;var t=b.Series,e=b.Legend,l=b.Chart,u=b.addEvent,h=b.color,d=b.merge,B=b.noop,x=b.stableSort,n=b.setOptions;n({legend:{bubbleLegend:{borderColor:void 0,borderWidth:2,
className:void 0,color:void 0,connectorClassName:void 0,connectorColor:void 0,connectorDistance:60,connectorWidth:1,enabled:!1,labels:{className:void 0,allowOverlap:!1,format:"",formatter:void 0,align:"right",style:{fontSize:10,color:void 0},x:0,y:0},maxSize:60,minSize:10,legendIndex:0,ranges:{value:void 0,borderColor:void 0,color:void 0,connectorColor:void 0},sizeBy:"area",sizeByAbsoluteValue:!1,zIndex:1,zThreshold:0}}});b.BubbleLegend=function(a,c){this.init(a,c)};b.BubbleLegend.prototype={init:function(a,
c){this.options=a;this.visible=!0;this.chart=c.chart;this.legend=c},setState:B,addToLegend:function(a){a.splice(this.options.legendIndex,0,this)},drawLegendSymbol:function(a){var c=this.chart,f=this.options,q=w(a.options.itemDistance,20),e=f.ranges;var d=f.connectorDistance;this.fontMetrics=c.renderer.fontMetrics(f.labels.style.fontSize.toString()+"px");e&&e.length&&m(e[0].value)?(x(e,function(f,a){return a.value-f.value}),this.ranges=e,this.setOptions(),this.render(),c=this.getMaxLabelSize(),e=this.ranges[0].radius,
a=2*e,d=d-e+c.width,d=0<d?d:0,this.maxLabel=c,this.movementX="left"===f.labels.align?d:0,this.legendItemWidth=a+d+q,this.legendItemHeight=a+this.fontMetrics.h/2):a.options.bubbleLegend.autoRanges=!0},setOptions:function(){var a=this.ranges,c=this.options,f=this.chart.series[c.seriesIndex],e=this.legend.baseline,b={"z-index":c.zIndex,"stroke-width":c.borderWidth},l={"z-index":c.zIndex,"stroke-width":c.connectorWidth},g=this.getLabelStyles(),n=f.options.marker.fillOpacity,m=this.chart.styledMode;a.forEach(function(q,
p){m||(b.stroke=w(q.borderColor,c.borderColor,f.color),b.fill=w(q.color,c.color,1!==n?h(f.color).setOpacity(n).get("rgba"):f.color),l.stroke=w(q.connectorColor,c.connectorColor,f.color));a[p].radius=this.getRangeRadius(q.value);a[p]=d(a[p],{center:a[0].radius-a[p].radius+e});m||d(!0,a[p],{bubbleStyle:d(!1,b),connectorStyle:d(!1,l),labelStyle:g})},this)},getLabelStyles:function(){var a=this.options,c={},f="left"===a.labels.align,e=this.legend.options.rtl;k(a.labels.style,function(f,a){"color"!==a&&
"fontSize"!==a&&"z-index"!==a&&(c[a]=f)});return d(!1,c,{"font-size":a.labels.style.fontSize,fill:w(a.labels.style.color,"#000000"),"z-index":a.zIndex,align:e||f?"right":"left"})},getRangeRadius:function(a){var c=this.options;return this.chart.series[this.options.seriesIndex].getRadius.call(this,c.ranges[c.ranges.length-1].value,c.ranges[0].value,c.minSize,c.maxSize,a)},render:function(){var a=this.chart.renderer,c=this.options.zThreshold;this.symbols||(this.symbols={connectors:[],bubbleItems:[],
labels:[]});this.legendSymbol=a.g("bubble-legend");this.legendItem=a.g("bubble-legend-item");this.legendSymbol.translateX=0;this.legendSymbol.translateY=0;this.ranges.forEach(function(f){f.value>=c&&this.renderRange(f)},this);this.legendSymbol.add(this.legendItem);this.legendItem.add(this.legendGroup);this.hideOverlappingLabels()},renderRange:function(a){var c=this.options,f=c.labels,e=this.chart.renderer,d=this.symbols,p=d.labels,b=a.center,h=Math.abs(a.radius),l=c.connectorDistance,n=f.align,g=
f.style.fontSize;l=this.legend.options.rtl||"left"===n?-l:l;f=c.connectorWidth;var m=this.ranges[0].radius,r=b-h-c.borderWidth/2+f/2;g=g/2-(this.fontMetrics.h-g)/2;var k=e.styledMode;"center"===n&&(l=0,c.connectorDistance=0,a.labelStyle.align="center");n=r+c.labels.y;var u=m+l+c.labels.x;d.bubbleItems.push(e.circle(m,b+((r%1?1:.5)-(f%2?0:.5)),h).attr(k?{}:a.bubbleStyle).addClass((k?"highcharts-color-"+this.options.seriesIndex+" ":"")+"highcharts-bubble-legend-symbol "+(c.className||"")).add(this.legendSymbol));
d.connectors.push(e.path(e.crispLine(["M",m,r,"L",m+l,r],c.connectorWidth)).attr(k?{}:a.connectorStyle).addClass((k?"highcharts-color-"+this.options.seriesIndex+" ":"")+"highcharts-bubble-legend-connectors "+(c.connectorClassName||"")).add(this.legendSymbol));a=e.text(this.formatLabel(a),u,n+g).attr(k?{}:a.labelStyle).addClass("highcharts-bubble-legend-labels "+(c.labels.className||"")).add(this.legendSymbol);p.push(a);a.placed=!0;a.alignAttr={x:u,y:n+g}},getMaxLabelSize:function(){var a,c;this.symbols.labels.forEach(function(f){c=
f.getBBox(!0);a=a?c.width>a.width?c:a:c});return a||{}},formatLabel:function(a){var c=this.options,f=c.labels.formatter;c=c.labels.format;var e=this.chart.numberFormatter;return c?b.format(c,a):f?f.call(a):e(a.value,1)},hideOverlappingLabels:function(){var a=this.chart,c=this.symbols;!this.options.labels.allowOverlap&&c&&(a.hideOverlappingLabels(c.labels),c.labels.forEach(function(f,a){f.newOpacity?f.newOpacity!==f.oldOpacity&&c.connectors[a].show():c.connectors[a].hide()}))},getRanges:function(){var a=
this.legend.bubbleLegend,c=a.options.ranges,f,e=Number.MAX_VALUE,b=-Number.MAX_VALUE;a.chart.series.forEach(function(a){a.isBubble&&!a.ignoreSeries&&(f=a.zData.filter(m),f.length&&(e=w(a.options.zMin,Math.min(e,Math.max(g(f),!1===a.options.displayNegative?a.options.zThreshold:-Number.MAX_VALUE))),b=w(a.options.zMax,Math.max(b,r(f)))))});var h=e===b?[{value:b}]:[{value:e},{value:(e+b)/2},{value:b,autoRanges:!0}];c.length&&c[0].radius&&h.reverse();h.forEach(function(a,f){c&&c[f]&&(h[f]=d(!1,c[f],a))});
return h},predictBubbleSizes:function(){var a=this.chart,c=this.fontMetrics,f=a.legend.options,e="horizontal"===f.layout,d=e?a.legend.lastLineHeight:0,b=a.plotSizeX,h=a.plotSizeY,l=a.series[this.options.seriesIndex];a=Math.ceil(l.minPxSize);var n=Math.ceil(l.maxPxSize);l=l.options.maxSize;var g=Math.min(h,b);if(f.floating||!/%$/.test(l))c=n;else if(l=parseFloat(l),c=(g+d-c.h/2)*l/100/(l/100+1),e&&h-c>=b||!e&&b-c>=h)c=n;return[a,Math.ceil(c)]},updateRanges:function(a,c){var f=this.legend.options.bubbleLegend;
f.minSize=a;f.maxSize=c;f.ranges=this.getRanges()},correctSizes:function(){var a=this.legend,c=this.chart.series[this.options.seriesIndex];1<Math.abs(Math.ceil(c.maxPxSize)-this.options.maxSize)&&(this.updateRanges(this.options.minSize,c.maxPxSize),a.render())}};u(b.Legend,"afterGetAllItems",function(a){var c=this.bubbleLegend,f=this.options,e=f.bubbleLegend,d=this.chart.getVisibleBubbleSeriesIndex();c&&c.ranges&&c.ranges.length&&(e.ranges.length&&(e.autoRanges=!!e.ranges[0].autoRanges),this.destroyItem(c));
0<=d&&f.enabled&&e.enabled&&(e.seriesIndex=d,this.bubbleLegend=new b.BubbleLegend(e,this),this.bubbleLegend.addToLegend(a.allItems))});l.prototype.getVisibleBubbleSeriesIndex=function(){for(var a=this.series,c=0;c<a.length;){if(a[c]&&a[c].isBubble&&a[c].visible&&a[c].zData.length)return c;c++}return-1};e.prototype.getLinesHeights=function(){var a=this.allItems,c=[],f=a.length,e,d=0;for(e=0;e<f;e++)if(a[e].legendItemHeight&&(a[e].itemHeight=a[e].legendItemHeight),a[e]===a[f-1]||a[e+1]&&a[e]._legendItemPos[1]!==
a[e+1]._legendItemPos[1]){c.push({height:0});var b=c[c.length-1];for(d;d<=e;d++)a[d].itemHeight>b.height&&(b.height=a[d].itemHeight);b.step=e}return c};e.prototype.retranslateItems=function(a){var c,f,e,d=this.options.rtl,b=0;this.allItems.forEach(function(q,h){c=q.legendGroup.translateX;f=q._legendItemPos[1];if((e=q.movementX)||d&&q.ranges)e=d?c-q.options.maxSize/2:c+e,q.legendGroup.attr({translateX:e});h>a[b].step&&b++;q.legendGroup.attr({translateY:Math.round(f+a[b].height/2)});q._legendItemPos[1]=
f+a[b].height/2})};u(t,"legendItemClick",function(){var a=this.chart,c=this.visible,f=this.chart.legend;f&&f.bubbleLegend&&(this.visible=!c,this.ignoreSeries=c,a=0<=a.getVisibleBubbleSeriesIndex(),f.bubbleLegend.visible!==a&&(f.update({bubbleLegend:{enabled:a}}),f.bubbleLegend.visible=a),this.visible=c)});a(l.prototype,"drawChartBox",function(a,c,f){var e=this.legend,d=0<=this.getVisibleBubbleSeriesIndex();if(e&&e.options.enabled&&e.bubbleLegend&&e.options.bubbleLegend.autoRanges&&d){var b=e.bubbleLegend.options;
d=e.bubbleLegend.predictBubbleSizes();e.bubbleLegend.updateRanges(d[0],d[1]);b.placed||(e.group.placed=!1,e.allItems.forEach(function(a){a.legendGroup.translateY=null}));e.render();this.getMargins();this.axes.forEach(function(a){a.visible&&a.render();b.placed||(a.setScale(),a.updateNames(),k(a.ticks,function(a){a.isNew=!0;a.isNewLabel=!0}))});b.placed=!0;this.getMargins();a.call(this,c,f);e.bubbleLegend.correctSizes();e.retranslateItems(e.getLinesHeights())}else a.call(this,c,f),e&&e.options.enabled&&
e.bubbleLegend&&(e.render(),e.retranslateItems(e.getLinesHeights()))})});A(t,"parts-more/BubbleSeries.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.arrayMax,g=a.arrayMin,m=a.clamp,k=a.extend,w=a.isNumber,t=a.pick,e=a.pInt;a=b.Axis;var l=b.color,u=b.noop,h=b.Point,d=b.Series,B=b.seriesType,x=b.seriesTypes;B("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,
radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,isBubble:!0,pointAttribs:function(a,e){var c=this.options.marker.fillOpacity;a=d.prototype.pointAttribs.call(this,
a,e);1!==c&&(a.fill=l(a.fill).setOpacity(c).get("rgba"));return a},getRadii:function(a,e,c){var f=this.zData,d=this.yData,b=c.minPxSize,h=c.maxPxSize,l=[];var g=0;for(c=f.length;g<c;g++){var p=f[g];l.push(this.getRadius(a,e,b,h,p,d[g]))}this.radii=l},getRadius:function(a,e,c,f,d,b){var q=this.options,h="width"!==q.sizeBy,l=q.zThreshold,g=e-a,p=.5;if(null===b||null===d)return null;if(w(d)){q.sizeByAbsoluteValue&&(d=Math.abs(d-l),g=Math.max(e-l,Math.abs(a-l)),a=0);if(d<a)return c/2-1;0<g&&(p=(d-a)/
g)}h&&0<=p&&(p=Math.sqrt(p));return Math.ceil(c+p*(f-c))/2},animate:function(a){!a&&this.points.length<this.options.animationLimit&&(this.points.forEach(function(a){var e=a.graphic;if(e&&e.width){var f={x:e.x,y:e.y,width:e.width,height:e.height};e.attr({x:a.plotX,y:a.plotY,width:1,height:1});e.animate(f,this.options.animation)}},this),this.animate=null)},hasData:function(){return!!this.processedXData.length},translate:function(){var a,e=this.data,c=this.radii;x.scatter.prototype.translate.call(this);
for(a=e.length;a--;){var f=e[a];var d=c?c[a]:0;w(d)&&d>=this.minPxSize/2?(f.marker=k(f.marker,{radius:d,width:2*d,height:2*d}),f.dlBox={x:f.plotX-d,y:f.plotY-d,width:2*d,height:2*d}):f.shapeArgs=f.plotY=f.dlBox=void 0}},alignDataLabel:x.column.prototype.alignDataLabel,buildKDTree:u,applyZones:u},{haloPath:function(a){return h.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});a.prototype.beforePadding=function(){var a=this,d=this.len,c=this.chart,f=0,b=d,h=
this.isXAxis,l=h?"xData":"yData",k=this.min,v={},u=Math.min(c.plotWidth,c.plotHeight),x=Number.MAX_VALUE,B=-Number.MAX_VALUE,z=this.max-k,y=d/z,D=[];this.series.forEach(function(f){var d=f.options;!f.bubblePadding||!f.visible&&c.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,D.push(f),h&&(["minSize","maxSize"].forEach(function(a){var f=d[a],c=/%$/.test(f);f=e(f);v[a]=c?u*f/100:f}),f.minPxSize=v.minSize,f.maxPxSize=Math.max(v.maxSize,v.minSize),f=f.zData.filter(w),f.length&&(x=t(d.zMin,m(g(f),
!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE,x)),B=t(d.zMax,Math.max(B,r(f))))))});D.forEach(function(e){var c=e[l],d=c.length;h&&e.getRadii(x,B,e);if(0<z)for(;d--;)if(w(c[d])&&a.dataMin<=c[d]&&c[d]<=a.max){var q=e.radii?e.radii[d]:0;f=Math.min((c[d]-k)*y-q,f);b=Math.max((c[d]-k)*y+q,b)}});D.length&&0<z&&!this.isLog&&(b-=d,y*=(d+Math.max(0,f)-Math.min(b,d))/d,[["min","userMin",f],["max","userMax",b]].forEach(function(f){"undefined"===typeof t(a.options[f[0]],a[f[1]])&&(a[f[0]]+=f[2]/y)}))};
""});A(t,"modules/networkgraph/integrations.js",[t["parts/Globals.js"]],function(b){b.networkgraphIntegrations={verlet:{attractiveForceFunction:function(a,b){return(b-a)/a},repulsiveForceFunction:function(a,b){return(b-a)/a*(b>a?1:0)},barycenter:function(){var a=this.options.gravitationalConstant,b=this.barycenter.xFactor,g=this.barycenter.yFactor;b=(b-(this.box.left+this.box.width)/2)*a;g=(g-(this.box.top+this.box.height)/2)*a;this.nodes.forEach(function(a){a.fixedPosition||(a.plotX-=b/a.mass/a.degree,
a.plotY-=g/a.mass/a.degree)})},repulsive:function(a,b,g){b=b*this.diffTemperature/a.mass/a.degree;a.fixedPosition||(a.plotX+=g.x*b,a.plotY+=g.y*b)},attractive:function(a,b,g){var m=a.getMass(),k=-g.x*b*this.diffTemperature;b=-g.y*b*this.diffTemperature;a.fromNode.fixedPosition||(a.fromNode.plotX-=k*m.fromNode/a.fromNode.degree,a.fromNode.plotY-=b*m.fromNode/a.fromNode.degree);a.toNode.fixedPosition||(a.toNode.plotX+=k*m.toNode/a.toNode.degree,a.toNode.plotY+=b*m.toNode/a.toNode.degree)},integrate:function(a,
b){var g=-a.options.friction,m=a.options.maxSpeed,k=(b.plotX+b.dispX-b.prevX)*g;g*=b.plotY+b.dispY-b.prevY;var r=Math.abs,t=r(k)/(k||1);r=r(g)/(g||1);k=t*Math.min(m,Math.abs(k));g=r*Math.min(m,Math.abs(g));b.prevX=b.plotX+b.dispX;b.prevY=b.plotY+b.dispY;b.plotX+=k;b.plotY+=g;b.temperature=a.vectorLength({x:k,y:g})},getK:function(a){return Math.pow(a.box.width*a.box.height/a.nodes.length,.5)}},euler:{attractiveForceFunction:function(a,b){return a*a/b},repulsiveForceFunction:function(a,b){return b*
b/a},barycenter:function(){var a=this.options.gravitationalConstant,b=this.barycenter.xFactor,g=this.barycenter.yFactor;this.nodes.forEach(function(m){if(!m.fixedPosition){var k=m.getDegree();k*=1+k/2;m.dispX+=(b-m.plotX)*a*k/m.degree;m.dispY+=(g-m.plotY)*a*k/m.degree}})},repulsive:function(a,b,g,m){a.dispX+=g.x/m*b/a.degree;a.dispY+=g.y/m*b/a.degree},attractive:function(a,b,g,m){var k=a.getMass(),r=g.x/m*b;b*=g.y/m;a.fromNode.fixedPosition||(a.fromNode.dispX-=r*k.fromNode/a.fromNode.degree,a.fromNode.dispY-=
b*k.fromNode/a.fromNode.degree);a.toNode.fixedPosition||(a.toNode.dispX+=r*k.toNode/a.toNode.degree,a.toNode.dispY+=b*k.toNode/a.toNode.degree)},integrate:function(a,b){b.dispX+=b.dispX*a.options.friction;b.dispY+=b.dispY*a.options.friction;var g=b.temperature=a.vectorLength({x:b.dispX,y:b.dispY});0!==g&&(b.plotX+=b.dispX/g*Math.min(Math.abs(b.dispX),a.temperature),b.plotY+=b.dispY/g*Math.min(Math.abs(b.dispY),a.temperature))},getK:function(a){return Math.pow(a.box.width*a.box.height/a.nodes.length,
.3)}}}});A(t,"modules/networkgraph/QuadTree.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){a=a.extend;var r=b.QuadTreeNode=function(a){this.box=a;this.boxSize=Math.min(a.width,a.height);this.nodes=[];this.body=this.isInternal=!1;this.isEmpty=!0};a(r.prototype,{insert:function(a,b){this.isInternal?this.nodes[this.getBoxPosition(a)].insert(a,b-1):(this.isEmpty=!1,this.body?b?(this.isInternal=!0,this.divideBox(),!0!==this.body&&(this.nodes[this.getBoxPosition(this.body)].insert(this.body,
b-1),this.body=!0),this.nodes[this.getBoxPosition(a)].insert(a,b-1)):(b=new r({top:a.plotX,left:a.plotY,width:.1,height:.1}),b.body=a,b.isInternal=!1,this.nodes.push(b)):(this.isInternal=!1,this.body=a))},updateMassAndCenter:function(){var a=0,b=0,k=0;this.isInternal?(this.nodes.forEach(function(g){g.isEmpty||(a+=g.mass,b+=g.plotX*g.mass,k+=g.plotY*g.mass)}),b/=a,k/=a):this.body&&(a=this.body.mass,b=this.body.plotX,k=this.body.plotY);this.mass=a;this.plotX=b;this.plotY=k},divideBox:function(){var a=
this.box.width/2,b=this.box.height/2;this.nodes[0]=new r({left:this.box.left,top:this.box.top,width:a,height:b});this.nodes[1]=new r({left:this.box.left+a,top:this.box.top,width:a,height:b});this.nodes[2]=new r({left:this.box.left+a,top:this.box.top+b,width:a,height:b});this.nodes[3]=new r({left:this.box.left,top:this.box.top+b,width:a,height:b})},getBoxPosition:function(a){var b=a.plotY<this.box.top+this.box.height/2;return a.plotX<this.box.left+this.box.width/2?b?0:3:b?1:2}});b=b.QuadTree=function(a,
b,k,w){this.box={left:a,top:b,width:k,height:w};this.maxDepth=25;this.root=new r(this.box,"0");this.root.isInternal=!0;this.root.isRoot=!0;this.root.divideBox()};a(b.prototype,{insertNodes:function(a){a.forEach(function(a){this.root.insert(a,this.maxDepth)},this)},visitNodeRecursive:function(a,b,k){var g;a||(a=this.root);a===this.root&&b&&(g=b(a));!1!==g&&(a.nodes.forEach(function(a){if(a.isInternal){b&&(g=b(a));if(!1===g)return;this.visitNodeRecursive(a,b,k)}else a.body&&b&&b(a.body);k&&k(a)},this),
a===this.root&&k&&k(a))},calculateMassAndCenter:function(){this.visitNodeRecursive(null,null,function(a){a.updateMassAndCenter()})}})});A(t,"modules/networkgraph/layouts.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.clamp,g=a.defined,m=a.extend,k=a.pick,w=a.setAnimation;a=b.addEvent;var t=b.Chart;b.layouts={"reingold-fruchterman":function(){}};m(b.layouts["reingold-fruchterman"].prototype,{init:function(a){this.options=a;this.nodes=[];this.links=[];this.series=[];this.box=
{x:0,y:0,width:0,height:0};this.setInitialRendering(!0);this.integration=b.networkgraphIntegrations[a.integration];this.attractiveForce=k(a.attractiveForce,this.integration.attractiveForceFunction);this.repulsiveForce=k(a.repulsiveForce,this.integration.repulsiveForceFunction);this.approximation=a.approximation},start:function(){var a=this.series,b=this.options;this.currentStep=0;this.forces=a[0]&&a[0].forces||[];this.initialRendering&&(this.initPositions(),a.forEach(function(a){a.render()}));this.setK();
this.resetSimulation(b);b.enableSimulation&&this.step()},step:function(){var a=this,l=this.series,g=this.options;a.currentStep++;"barnes-hut"===a.approximation&&(a.createQuadTree(),a.quadTree.calculateMassAndCenter());a.forces.forEach(function(b){a[b+"Forces"](a.temperature)});a.applyLimits(a.temperature);a.temperature=a.coolDown(a.startTemperature,a.diffTemperature,a.currentStep);a.prevSystemTemperature=a.systemTemperature;a.systemTemperature=a.getSystemTemperature();g.enableSimulation&&(l.forEach(function(a){a.chart&&
a.render()}),a.maxIterations--&&isFinite(a.temperature)&&!a.isStable()?(a.simulation&&b.win.cancelAnimationFrame(a.simulation),a.simulation=b.win.requestAnimationFrame(function(){a.step()})):a.simulation=!1)},stop:function(){this.simulation&&b.win.cancelAnimationFrame(this.simulation)},setArea:function(a,b,g,h){this.box={left:a,top:b,width:g,height:h}},setK:function(){this.k=this.options.linkLength||this.integration.getK(this)},addElementsToCollection:function(a,b){a.forEach(function(a){-1===b.indexOf(a)&&
b.push(a)})},removeElementFromCollection:function(a,b){a=b.indexOf(a);-1!==a&&b.splice(a,1)},clear:function(){this.nodes.length=0;this.links.length=0;this.series.length=0;this.resetSimulation()},resetSimulation:function(){this.forcedStop=!1;this.systemTemperature=0;this.setMaxIterations();this.setTemperature();this.setDiffTemperature()},setMaxIterations:function(a){this.maxIterations=k(a,this.options.maxIterations)},setTemperature:function(){this.temperature=this.startTemperature=Math.sqrt(this.nodes.length)},
setDiffTemperature:function(){this.diffTemperature=this.startTemperature/(this.options.maxIterations+1)},setInitialRendering:function(a){this.initialRendering=a},createQuadTree:function(){this.quadTree=new b.QuadTree(this.box.left,this.box.top,this.box.width,this.box.height);this.quadTree.insertNodes(this.nodes)},initPositions:function(){var a=this.options.initialPositions;b.isFunction(a)?(a.call(this),this.nodes.forEach(function(a){g(a.prevX)||(a.prevX=a.plotX);g(a.prevY)||(a.prevY=a.plotY);a.dispX=
0;a.dispY=0})):"circle"===a?this.setCircularPositions():this.setRandomPositions()},setCircularPositions:function(){function a(b){b.linksFrom.forEach(function(b){x[b.toNode.id]||(x[b.toNode.id]=!0,m.push(b.toNode),a(b.toNode))})}var b=this.box,g=this.nodes,h=2*Math.PI/(g.length+1),d=g.filter(function(a){return 0===a.linksTo.length}),m=[],x={},n=this.options.initialPositionRadius;d.forEach(function(b){m.push(b);a(b)});m.length?g.forEach(function(a){-1===m.indexOf(a)&&m.push(a)}):m=g;m.forEach(function(a,
c){a.plotX=a.prevX=k(a.plotX,b.width/2+n*Math.cos(c*h));a.plotY=a.prevY=k(a.plotY,b.height/2+n*Math.sin(c*h));a.dispX=0;a.dispY=0})},setRandomPositions:function(){function a(a){a=a*a/Math.PI;return a-=Math.floor(a)}var b=this.box,g=this.nodes,h=g.length+1;g.forEach(function(d,e){d.plotX=d.prevX=k(d.plotX,b.width*a(e));d.plotY=d.prevY=k(d.plotY,b.height*a(h+e));d.dispX=0;d.dispY=0})},force:function(a){this.integration[a].apply(this,Array.prototype.slice.call(arguments,1))},barycenterForces:function(){this.getBarycenter();
this.force("barycenter")},getBarycenter:function(){var a=0,b=0,g=0;this.nodes.forEach(function(e){b+=e.plotX*e.mass;g+=e.plotY*e.mass;a+=e.mass});return this.barycenter={x:b,y:g,xFactor:b/a,yFactor:g/a}},barnesHutApproximation:function(a,b){var e=this.getDistXY(a,b),h=this.vectorLength(e);if(a!==b&&0!==h)if(b.isInternal)if(b.boxSize/h<this.options.theta&&0!==h){var d=this.repulsiveForce(h,this.k);this.force("repulsive",a,d*b.mass,e,h);var g=!1}else g=!0;else d=this.repulsiveForce(h,this.k),this.force("repulsive",
a,d*b.mass,e,h);return g},repulsiveForces:function(){var a=this;"barnes-hut"===a.approximation?a.nodes.forEach(function(b){a.quadTree.visitNodeRecursive(null,function(e){return a.barnesHutApproximation(b,e)})}):a.nodes.forEach(function(b){a.nodes.forEach(function(e){if(b!==e&&!b.fixedPosition){var h=a.getDistXY(b,e);var d=a.vectorLength(h);if(0!==d){var g=a.repulsiveForce(d,a.k);a.force("repulsive",b,g*e.mass,h,d)}}})})},attractiveForces:function(){var a=this,b,g,h;a.links.forEach(function(d){d.fromNode&&
d.toNode&&(b=a.getDistXY(d.fromNode,d.toNode),g=a.vectorLength(b),0!==g&&(h=a.attractiveForce(g,a.k),a.force("attractive",d,h,b,g)))})},applyLimits:function(){var a=this;a.nodes.forEach(function(b){b.fixedPosition||(a.integration.integrate(a,b),a.applyLimitBox(b,a.box),b.dispX=0,b.dispY=0)})},applyLimitBox:function(a,b){var e=a.radius;a.plotX=r(a.plotX,b.left+e,b.width-e);a.plotY=r(a.plotY,b.top+e,b.height-e)},coolDown:function(a,b,g){return a-b*g},isStable:function(){return.00001>Math.abs(this.systemTemperature-
this.prevSystemTemperature)||0>=this.temperature},getSystemTemperature:function(){return this.nodes.reduce(function(a,b){return a+b.temperature},0)},vectorLength:function(a){return Math.sqrt(a.x*a.x+a.y*a.y)},getDistR:function(a,b){a=this.getDistXY(a,b);return this.vectorLength(a)},getDistXY:function(a,b){var e=a.plotX-b.plotX;a=a.plotY-b.plotY;return{x:e,y:a,absX:Math.abs(e),absY:Math.abs(a)}}});a(t,"predraw",function(){this.graphLayoutsLookup&&this.graphLayoutsLookup.forEach(function(a){a.stop()})});
a(t,"render",function(){function a(a){a.maxIterations--&&isFinite(a.temperature)&&!a.isStable()&&!a.options.enableSimulation&&(a.beforeStep&&a.beforeStep(),a.step(),g=!1,b=!0)}var b=!1;if(this.graphLayoutsLookup){w(!1,this);for(this.graphLayoutsLookup.forEach(function(a){a.start()});!g;){var g=!0;this.graphLayoutsLookup.forEach(a)}b&&this.series.forEach(function(a){a&&a.layout&&a.render()})}})});A(t,"modules/networkgraph/draggable-nodes.js",[t["parts/Globals.js"]],function(b){var a=b.Chart,r=b.addEvent;
b.dragNodesMixin={onMouseDown:function(a,b){b=this.chart.pointer.normalize(b);a.fixedPosition={chartX:b.chartX,chartY:b.chartY,plotX:a.plotX,plotY:a.plotY};a.inDragMode=!0},onMouseMove:function(a,b){if(a.fixedPosition&&a.inDragMode){var g=this.chart,m=g.pointer.normalize(b);b=a.fixedPosition.chartX-m.chartX;m=a.fixedPosition.chartY-m.chartY;if(5<Math.abs(b)||5<Math.abs(m))b=a.fixedPosition.plotX-b,m=a.fixedPosition.plotY-m,g.isInsidePlot(b,m)&&(a.plotX=b,a.plotY=m,a.hasDragged=!0,this.redrawHalo(a),
this.layout.simulation?this.layout.resetSimulation():(this.layout.setInitialRendering(!1),this.layout.enableSimulation?this.layout.start():this.layout.setMaxIterations(1),this.chart.redraw(),this.layout.setInitialRendering(!0)))}},onMouseUp:function(a,b){a.fixedPosition&&a.hasDragged&&(this.layout.enableSimulation?this.layout.start():this.chart.redraw(),a.inDragMode=a.hasDragged=!1,this.options.fixedDraggable||delete a.fixedPosition)},redrawHalo:function(a){a&&this.halo&&this.halo.attr({d:a.haloPath(this.options.states.hover.halo.size)})}};
r(a,"load",function(){var a=this,b,k,t;a.container&&(b=r(a.container,"mousedown",function(b){var e=a.hoverPoint;e&&e.series&&e.series.hasDraggableNodes&&e.series.options.draggable&&(e.series.onMouseDown(e,b),k=r(a.container,"mousemove",function(a){return e&&e.series&&e.series.onMouseMove(e,a)}),t=r(a.container.ownerDocument,"mouseup",function(a){k();t();return e&&e.series&&e.series.onMouseUp(e,a)}))}));r(a,"destroy",function(){b()})})});A(t,"parts-more/PackedBubbleSeries.js",[t["parts/Globals.js"],
t["parts/Utilities.js"]],function(b,a){var r=a.clamp,g=a.defined,m=a.extend,k=a.extendClass,t=a.isArray,z=a.isNumber,e=a.pick;a=b.seriesType;var l=b.Series,u=b.Point,h=b.addEvent,d=b.fireEvent,B=b.Chart,x=b.Color,n=b.layouts["reingold-fruchterman"],p=b.seriesTypes.bubble.prototype.pointClass,c=b.dragNodesMixin;b.networkgraphIntegrations.packedbubble={repulsiveForceFunction:function(a,b,c,d){return Math.min(a,(c.marker.radius+d.marker.radius)/2)},barycenter:function(){var a=this,b=a.options.gravitationalConstant,
c=a.box,d=a.nodes,e,h;d.forEach(function(f){a.options.splitSeries&&!f.isParentNode?(e=f.series.parentNode.plotX,h=f.series.parentNode.plotY):(e=c.width/2,h=c.height/2);f.fixedPosition||(f.plotX-=(f.plotX-e)*b/(f.mass*Math.sqrt(d.length)),f.plotY-=(f.plotY-h)*b/(f.mass*Math.sqrt(d.length)))})},repulsive:function(a,b,c,d){var f=b*this.diffTemperature/a.mass/a.degree;b=c.x*f;c=c.y*f;a.fixedPosition||(a.plotX+=b,a.plotY+=c);d.fixedPosition||(d.plotX-=b,d.plotY-=c)},integrate:b.networkgraphIntegrations.verlet.integrate,
getK:b.noop};b.layouts.packedbubble=k(n,{beforeStep:function(){this.options.marker&&this.series.forEach(function(a){a&&a.calculateParentRadius()})},setCircularPositions:function(){var a=this,b=a.box,c=a.nodes,d=2*Math.PI/(c.length+1),h,g,n=a.options.initialPositionRadius;c.forEach(function(f,c){a.options.splitSeries&&!f.isParentNode?(h=f.series.parentNode.plotX,g=f.series.parentNode.plotY):(h=b.width/2,g=b.height/2);f.plotX=f.prevX=e(f.plotX,h+n*Math.cos(f.index||c*d));f.plotY=f.prevY=e(f.plotY,g+
n*Math.sin(f.index||c*d));f.dispX=0;f.dispY=0})},repulsiveForces:function(){var a=this,b,c,d,e=a.options.bubblePadding;a.nodes.forEach(function(f){f.degree=f.mass;f.neighbours=0;a.nodes.forEach(function(q){b=0;f===q||f.fixedPosition||!a.options.seriesInteraction&&f.series!==q.series||(d=a.getDistXY(f,q),c=a.vectorLength(d)-(f.marker.radius+q.marker.radius+e),0>c&&(f.degree+=.01,f.neighbours++,b=a.repulsiveForce(-c/Math.sqrt(f.neighbours),a.k,f,q)),a.force("repulsive",f,b*q.mass,d,q,c))})})},applyLimitBox:function(a){if(this.options.splitSeries&&
!a.isParentNode&&this.options.parentNodeLimit){var f=this.getDistXY(a,a.series.parentNode);var b=a.series.parentNodeRadius-a.marker.radius-this.vectorLength(f);0>b&&b>-2*a.marker.radius&&(a.plotX-=.01*f.x,a.plotY-=.01*f.y)}n.prototype.applyLimitBox.apply(this,arguments)},isStable:function(){return.00001>Math.abs(this.systemTemperature-this.prevSystemTemperature)||0>=this.temperature||0<this.systemTemperature&&.02>this.systemTemperature/this.nodes.length&&this.enableSimulation}});a("packedbubble",
"bubble",{minSize:"10%",maxSize:"50%",sizeBy:"area",zoneAxis:"y",tooltip:{pointFormat:"Value: {point.value}"},draggable:!0,useSimulation:!0,dataLabels:{formatter:function(){return this.point.value},parentNodeFormatter:function(){return this.name},parentNodeTextPath:{enabled:!0},padding:0},layoutAlgorithm:{initialPositions:"circle",initialPositionRadius:20,bubblePadding:5,parentNodeLimit:!1,seriesInteraction:!0,dragBetweenSeries:!1,parentNodeOptions:{maxIterations:400,gravitationalConstant:.03,maxSpeed:50,
initialPositionRadius:100,seriesInteraction:!0,marker:{fillColor:null,fillOpacity:1,lineWidth:1,lineColor:null,symbol:"circle"}},enableSimulation:!0,type:"packedbubble",integration:"packedbubble",maxIterations:1E3,splitSeries:!1,maxSpeed:5,gravitationalConstant:.01,friction:-.981}},{hasDraggableNodes:!0,forces:["barycenter","repulsive"],pointArrayMap:["value"],pointValKey:"value",isCartesian:!1,requireSorting:!1,directTouch:!0,axisTypes:[],noSharedTooltip:!0,searchPoint:b.noop,accumulateAllPoints:function(a){var f=
a.chart,b=[],c,d;for(c=0;c<f.series.length;c++)if(a=f.series[c],a.visible||!f.options.chart.ignoreHiddenSeries)for(d=0;d<a.yData.length;d++)b.push([null,null,a.yData[d],a.index,d,{id:d,marker:{radius:0}}]);return b},init:function(){l.prototype.init.apply(this,arguments);h(this,"updatedData",function(){this.chart.series.forEach(function(a){a.type===this.type&&(a.isDirty=!0)},this)});return this},render:function(){var a=[];l.prototype.render.apply(this,arguments);this.options.dataLabels.allowOverlap||
(this.data.forEach(function(f){t(f.dataLabels)&&f.dataLabels.forEach(function(f){a.push(f)})}),this.chart.hideOverlappingLabels(a))},setVisible:function(){var a=this;l.prototype.setVisible.apply(a,arguments);a.parentNodeLayout&&a.graph?a.visible?(a.graph.show(),a.parentNode.dataLabel&&a.parentNode.dataLabel.show()):(a.graph.hide(),a.parentNodeLayout.removeElementFromCollection(a.parentNode,a.parentNodeLayout.nodes),a.parentNode.dataLabel&&a.parentNode.dataLabel.hide()):a.layout&&(a.visible?a.layout.addElementsToCollection(a.points,
a.layout.nodes):a.points.forEach(function(b){a.layout.removeElementFromCollection(b,a.layout.nodes)}))},drawDataLabels:function(){var a=this.options.dataLabels.textPath,b=this.points;l.prototype.drawDataLabels.apply(this,arguments);this.parentNode&&(this.parentNode.formatPrefix="parentNode",this.points=[this.parentNode],this.options.dataLabels.textPath=this.options.dataLabels.parentNodeTextPath,l.prototype.drawDataLabels.apply(this,arguments),this.points=b,this.options.dataLabels.textPath=a)},seriesBox:function(){var a=
this.chart,b=Math.max,c=Math.min,d,e=[a.plotLeft,a.plotLeft+a.plotWidth,a.plotTop,a.plotTop+a.plotHeight];this.data.forEach(function(a){g(a.plotX)&&g(a.plotY)&&a.marker.radius&&(d=a.marker.radius,e[0]=c(e[0],a.plotX-d),e[1]=b(e[1],a.plotX+d),e[2]=c(e[2],a.plotY-d),e[3]=b(e[3],a.plotY+d))});return z(e.width/e.height)?e:null},calculateParentRadius:function(){var a=this.seriesBox();this.parentNodeRadius=r(Math.sqrt(2*this.parentNodeMass/Math.PI)+20,20,a?Math.max(Math.sqrt(Math.pow(a.width,2)+Math.pow(a.height,
2))/2+20,20):Math.sqrt(2*this.parentNodeMass/Math.PI)+20);this.parentNode&&(this.parentNode.marker.radius=this.parentNode.radius=this.parentNodeRadius)},drawGraph:function(){if(this.layout&&this.layout.options.splitSeries){var a=this.chart,c=this.layout.options.parentNodeOptions.marker;c={fill:c.fillColor||x(this.color).brighten(.4).get(),opacity:c.fillOpacity,stroke:c.lineColor||this.color,"stroke-width":c.lineWidth};var d=this.visible?"inherit":"hidden";this.parentNodesGroup||(this.parentNodesGroup=
this.plotGroup("parentNodesGroup","parentNode",d,.1,a.seriesGroup),this.group.attr({zIndex:2}));this.calculateParentRadius();d=b.merge({x:this.parentNode.plotX-this.parentNodeRadius,y:this.parentNode.plotY-this.parentNodeRadius,width:2*this.parentNodeRadius,height:2*this.parentNodeRadius},c);this.parentNode.graphic||(this.graph=this.parentNode.graphic=a.renderer.symbol(c.symbol).add(this.parentNodesGroup));this.parentNode.graphic.attr(d)}},createParentNodes:function(){var a=this,b=a.chart,c=a.parentNodeLayout,
d,e=a.parentNode;a.parentNodeMass=0;a.points.forEach(function(b){a.parentNodeMass+=Math.PI*Math.pow(b.marker.radius,2)});a.calculateParentRadius();c.nodes.forEach(function(b){b.seriesIndex===a.index&&(d=!0)});c.setArea(0,0,b.plotWidth,b.plotHeight);d||(e||(e=(new p).init(this,{mass:a.parentNodeRadius/2,marker:{radius:a.parentNodeRadius},dataLabels:{inside:!1},dataLabelOnNull:!0,degree:a.parentNodeRadius,isParentNode:!0,seriesIndex:a.index})),a.parentNode&&(e.plotX=a.parentNode.plotX,e.plotY=a.parentNode.plotY),
a.parentNode=e,c.addElementsToCollection([a],c.series),c.addElementsToCollection([e],c.nodes))},addSeriesLayout:function(){var a=this.options.layoutAlgorithm,c=this.chart.graphLayoutsStorage,d=this.chart.graphLayoutsLookup,e=b.merge(a,a.parentNodeOptions,{enableSimulation:this.layout.options.enableSimulation});var h=c[a.type+"-series"];h||(c[a.type+"-series"]=h=new b.layouts[a.type],h.init(e),d.splice(h.index,0,h));this.parentNodeLayout=h;this.createParentNodes()},addLayout:function(){var a=this.options.layoutAlgorithm,
c=this.chart.graphLayoutsStorage,d=this.chart.graphLayoutsLookup,e=this.chart.options.chart;c||(this.chart.graphLayoutsStorage=c={},this.chart.graphLayoutsLookup=d=[]);var h=c[a.type];h||(a.enableSimulation=g(e.forExport)?!e.forExport:a.enableSimulation,c[a.type]=h=new b.layouts[a.type],h.init(a),d.splice(h.index,0,h));this.layout=h;this.points.forEach(function(a){a.mass=2;a.degree=1;a.collisionNmb=1});h.setArea(0,0,this.chart.plotWidth,this.chart.plotHeight);h.addElementsToCollection([this],h.series);
h.addElementsToCollection(this.points,h.nodes)},deferLayout:function(){var a=this.options.layoutAlgorithm;this.visible&&(this.addLayout(),a.splitSeries&&this.addSeriesLayout())},translate:function(){var a=this.chart,b=this.data,c=this.index,e,h=this.options.useSimulation;this.processedXData=this.xData;this.generatePoints();g(a.allDataPoints)||(a.allDataPoints=this.accumulateAllPoints(this),this.getPointRadius());if(h)var n=a.allDataPoints;else n=this.placeBubbles(a.allDataPoints),this.options.draggable=
!1;for(e=0;e<n.length;e++)if(n[e][3]===c){var p=b[n[e][4]];var l=n[e][2];h||(p.plotX=n[e][0]-a.plotLeft+a.diffX,p.plotY=n[e][1]-a.plotTop+a.diffY);p.marker=m(p.marker,{radius:l,width:2*l,height:2*l});p.radius=l}h&&this.deferLayout();d(this,"afterTranslate")},checkOverlap:function(a,b){var f=a[0]-b[0],c=a[1]-b[1];return-.001>Math.sqrt(f*f+c*c)-Math.abs(a[2]+b[2])},positionBubble:function(a,b,c){var f=Math.sqrt,d=Math.asin,e=Math.acos,h=Math.pow,g=Math.abs;f=f(h(a[0]-b[0],2)+h(a[1]-b[1],2));e=e((h(f,
2)+h(c[2]+b[2],2)-h(c[2]+a[2],2))/(2*(c[2]+b[2])*f));d=d(g(a[0]-b[0])/f);a=(0>a[1]-b[1]?0:Math.PI)+e+d*(0>(a[0]-b[0])*(a[1]-b[1])?1:-1);return[b[0]+(b[2]+c[2])*Math.sin(a),b[1]-(b[2]+c[2])*Math.cos(a),c[2],c[3],c[4]]},placeBubbles:function(a){var b=this.checkOverlap,c=this.positionBubble,d=[],f=1,e=0,h=0;var g=[];var n;a=a.sort(function(a,b){return b[2]-a[2]});if(a.length){d.push([[0,0,a[0][2],a[0][3],a[0][4]]]);if(1<a.length)for(d.push([[0,0-a[1][2]-a[0][2],a[1][2],a[1][3],a[1][4]]]),n=2;n<a.length;n++)a[n][2]=
a[n][2]||1,g=c(d[f][e],d[f-1][h],a[n]),b(g,d[f][0])?(d.push([]),h=0,d[f+1].push(c(d[f][e],d[f][0],a[n])),f++,e=0):1<f&&d[f-1][h+1]&&b(g,d[f-1][h+1])?(h++,d[f].push(c(d[f][e],d[f-1][h],a[n])),e++):(e++,d[f].push(g));this.chart.stages=d;this.chart.rawPositions=[].concat.apply([],d);this.resizeRadius();g=this.chart.rawPositions}return g},resizeRadius:function(){var a=this.chart,b=a.rawPositions,c=Math.min,d=Math.max,e=a.plotLeft,h=a.plotTop,g=a.plotHeight,n=a.plotWidth,p,l,k;var m=p=Number.POSITIVE_INFINITY;
var x=l=Number.NEGATIVE_INFINITY;for(k=0;k<b.length;k++){var r=b[k][2];m=c(m,b[k][0]-r);x=d(x,b[k][0]+r);p=c(p,b[k][1]-r);l=d(l,b[k][1]+r)}k=[x-m,l-p];c=c.apply([],[(n-e)/k[0],(g-h)/k[1]]);if(1e-10<Math.abs(c-1)){for(k=0;k<b.length;k++)b[k][2]*=c;this.placeBubbles(b)}else a.diffY=g/2+h-p-(l-p)/2,a.diffX=n/2+e-m-(x-m)/2},calculateZExtremes:function(){var a=this.options.zMin,b=this.options.zMax,c=Infinity,d=-Infinity;if(a&&b)return[a,b];this.chart.series.forEach(function(a){a.yData.forEach(function(a){g(a)&&
(a>d&&(d=a),a<c&&(c=a))})});a=e(a,c);b=e(b,d);return[a,b]},getPointRadius:function(){var a=this,b=a.chart,c=a.options,d=c.useSimulation,e=Math.min(b.plotWidth,b.plotHeight),h={},g=[],n=b.allDataPoints,p,l,k,m;["minSize","maxSize"].forEach(function(a){var b=parseInt(c[a],10),d=/%$/.test(c[a]);h[a]=d?e*b/100:b*Math.sqrt(n.length)});b.minRadius=p=h.minSize/Math.sqrt(n.length);b.maxRadius=l=h.maxSize/Math.sqrt(n.length);var x=d?a.calculateZExtremes():[p,l];(n||[]).forEach(function(b,c){k=d?r(b[2],x[0],
x[1]):b[2];m=a.getRadius(x[0],x[1],p,l,k);0===m&&(m=null);n[c][2]=m;g.push(m)});a.radii=g},redrawHalo:c.redrawHalo,onMouseDown:c.onMouseDown,onMouseMove:c.onMouseMove,onMouseUp:function(a){if(a.fixedPosition&&!a.removed){var d,f,e=this.layout,h=this.parentNodeLayout;h&&e.options.dragBetweenSeries&&h.nodes.forEach(function(c){a&&a.marker&&c!==a.series.parentNode&&(d=e.getDistXY(a,c),f=e.vectorLength(d)-c.marker.radius-a.marker.radius,0>f&&(c.series.addPoint(b.merge(a.options,{plotX:a.plotX,plotY:a.plotY}),
!1),e.removeElementFromCollection(a,e.nodes),a.remove()))});c.onMouseUp.apply(this,arguments)}},destroy:function(){this.chart.graphLayoutsLookup&&this.chart.graphLayoutsLookup.forEach(function(a){a.removeElementFromCollection(this,a.series)},this);this.parentNode&&(this.parentNodeLayout.removeElementFromCollection(this.parentNode,this.parentNodeLayout.nodes),this.parentNode.dataLabel&&(this.parentNode.dataLabel=this.parentNode.dataLabel.destroy()));b.Series.prototype.destroy.apply(this,arguments)},
alignDataLabel:b.Series.prototype.alignDataLabel},{destroy:function(){this.series.layout&&this.series.layout.removeElementFromCollection(this,this.series.layout.nodes);return u.prototype.destroy.apply(this,arguments)}});h(B,"beforeRedraw",function(){this.allDataPoints&&delete this.allDataPoints});""});A(t,"parts-more/Polar.js",[t["parts/Globals.js"],t["parts/Utilities.js"]],function(b,a){var r=a.defined,g=a.pick,m=a.splat,k=a.wrap,t=b.Series,z=b.seriesTypes,e=t.prototype,l=b.Pointer.prototype;e.searchPointByAngle=
function(a){var b=this.chart,e=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-e[0]-b.plotLeft,a.chartY-e[1]-b.plotTop)})};e.getConnectors=function(a,b,e,g){var d=g?1:0;var h=0<=b&&b<=a.length-1?b:0>b?a.length-1+b:0;b=0>h-1?a.length-(1+d):h-1;d=h+1>a.length-1?d:h+1;var c=a[b];d=a[d];var f=c.plotX;c=c.plotY;var l=d.plotX;var k=d.plotY;d=a[h].plotX;h=a[h].plotY;f=(1.5*d+f)/2.5;c=(1.5*h+c)/2.5;l=(1.5*d+l)/2.5;var m=(1.5*h+k)/2.5;k=Math.sqrt(Math.pow(f-d,
2)+Math.pow(c-h,2));var x=Math.sqrt(Math.pow(l-d,2)+Math.pow(m-h,2));f=Math.atan2(c-h,f-d);m=Math.PI/2+(f+Math.atan2(m-h,l-d))/2;Math.abs(f-m)>Math.PI/2&&(m-=Math.PI);f=d+Math.cos(m)*k;c=h+Math.sin(m)*k;l=d+Math.cos(Math.PI+m)*x;m=h+Math.sin(Math.PI+m)*x;d={rightContX:l,rightContY:m,leftContX:f,leftContY:c,plotX:d,plotY:h};e&&(d.prevPointCont=this.getConnectors(a,b,!1,g));return d};e.toXY=function(a){var b=this.chart,e=this.xAxis;var h=this.yAxis;var g=a.plotX,l=a.plotY,c=a.series,f=b.inverted,k=
a.y;f&&c&&!c.isRadialBar&&(a.plotY=l="number"===typeof k?h.translate(k)||0:0);a.rectPlotX=g;a.rectPlotY=l;h=f?e.postTranslate(l,g):e.postTranslate(g,h.len-l);a.plotX=a.polarPlotX=h.x-b.plotLeft;a.plotY=a.polarPlotY=h.y-b.plotTop;this.kdByAngle?(b=(g/Math.PI*180+e.pane.options.startAngle)%360,0>b&&(b+=360),a.clientX=b):a.clientX=a.plotX};z.spline&&(k(z.spline.prototype,"getPointSpline",function(a,b,e,g){this.chart.polar?g?(a=this.getConnectors(b,g,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,
a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",e.plotX,e.plotY]:a=a.call(this,b,e,g);return a}),z.areasplinerange&&(z.areasplinerange.prototype.getPointSpline=z.spline.prototype.getPointSpline));b.addEvent(t,"afterTranslate",function(){var a=this.chart;if(a.polar&&this.xAxis){(this.kdByAngle=a.tooltip&&a.tooltip.shared)?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy";if(!this.preventPostTranslate)for(var d=this.points,e=d.length;e--;)this.toXY(d[e]),
!a.hasParallelCoordinates&&!this.yAxis.reversed&&d[e].y<this.yAxis.min&&(d[e].isNull=!0);this.hasClipCircleSetter||(this.hasClipCircleSetter=!!this.eventsToUnbind.push(b.addEvent(this,"afterRender",function(){if(a.polar){var d=this.yAxis.center;this.clipCircle?this.clipCircle.animate({x:d[0],y:d[1],r:d[2]/2}):this.clipCircle=a.renderer.clipCircle(d[0],d[1],d[2]/2);this.group.clip(this.clipCircle);this.setClip=b.noop}})))}},{order:2});k(e,"getGraphPath",function(a,b){var d=this,e;if(this.chart.polar){b=
b||this.points;for(e=0;e<b.length;e++)if(!b[e].isNull){var h=e;break}if(!1!==this.options.connectEnds&&"undefined"!==typeof h){this.connectEnds=!0;b.splice(b.length,0,b[h]);var g=!0}b.forEach(function(a){"undefined"===typeof a.polarPlotY&&d.toXY(a)})}e=a.apply(this,[].slice.call(arguments,1));g&&b.pop();return e});var u=function(a,d){var e=this.chart,h=this.options.animation,l=this.group,k=this.markerGroup,c=this.xAxis.center,f=e.plotLeft,m=e.plotTop;e.polar?this.isRadialBar?d||(this.startAngleRad=
g(this.translatedThreshold,this.xAxis.startAngleRad),b.seriesTypes.pie.prototype.animate.call(this,d)):e.renderer.isSVG&&(h=b.animObject(h),d?(a={translateX:c[0]+f,translateY:c[1]+m,scaleX:.001,scaleY:.001},l.attr(a),k&&k.attr(a)):(a={translateX:f,translateY:m,scaleX:1,scaleY:1},l.animate(a,h),k&&k.animate(a,h),this.animate=null)):a.call(this,d)};k(e,"animate",u);z.column&&(t=z.column.prototype,t.polarArc=function(a,b,e,l){var d=this.xAxis.center,h=this.yAxis.len;return this.chart.renderer.symbols.arc(d[0],
d[1],h-b,null,{start:e,end:l,innerR:h-g(a,h)})},k(t,"animate",u),k(t,"translate",function(e){var d=this.options,h=d.stacking,g=this.chart,l=this.xAxis,k=this.yAxis,c=k.reversed,f=l.center,m=l.startAngleRad,t=l.endAngleRad-m;this.preventPostTranslate=!0;e.call(this);if(l.isRadial){e=this.points;var u=e.length;var w=k.translate(k.min);var v=k.translate(k.max);d=d.threshold||0;if(g.inverted&&b.isNumber(d)){var z=k.translate(d);r(z)&&(0>z?z=0:z>t&&(z=t),this.translatedThreshold=z+m)}for(;u--;){d=e[u];
var A=d.barX;var I=d.x;var H=d.y;if(g.inverted){d.shapeType="arc";d.plotY=k.translate(H);if(h){if(H=k.stacks[(0>H?"-":"")+this.stackKey],this.visible&&H&&H[I]&&!d.isNull){var y=H[I].points[this.getStackIndicator(void 0,I,this.index).key];var D=k.translate(y[0]);y=k.translate(y[1]);r(D)&&(D=a.clamp(D,0,t))}}else D=z,y=d.plotY;D>y&&(y=[D,D=y][0]);if(!c)if(D<w)D=w;else if(y>v)y=v;else{if(y<w||D>v)D=y=0}else if(y>w)y=w;else if(D<v)D=v;else if(D>w||y<v)D=y=t;k.min>k.max&&(D=y=c?t:0);D+=m;y+=m;I=Math.max(A,
0);A=Math.max(A+d.pointWidth,0);d.shapeArgs={x:f[0],y:f[1],r:A,innerR:I,start:D,end:y};d.opacity=D===y?0:void 0;d.plotY=(r(this.translatedThreshold)&&(D<this.translatedThreshold?D:y))-m}else d.shapeType="path",D=A+m,d.shapeArgs={d:this.polarArc(d.yBottom,d.plotY,D,D+d.pointWidth)};this.toXY(d);g.inverted?(A=l.postTranslate(d.rectPlotY,d.barX+d.pointWidth/2),d.tooltipPos=[A.x-g.plotLeft,A.y-g.plotTop]):d.tooltipPos=[d.plotX,d.plotY];d.ttBelow=d.plotY>f[1]}}}),t.findAlignments=function(a,b){null===
b.align&&(b.align=20<a&&160>a?"left":200<a&&340>a?"right":"center");null===b.verticalAlign&&(b.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle");return b},k(t,"alignDataLabel",function(a,b,l,k,m,p){var c=this.chart,d=g(k.inside,!!this.options.stacking);c.polar?(a=b.rectPlotX/Math.PI*180,c.inverted?(this.forceDL=c.isInsidePlot(b.plotX,Math.round(b.plotY),!1),d&&b.shapeArgs?(m=b.shapeArgs,m=this.xAxis.postTranslate((m.start+m.end)/2-this.xAxis.startAngleRad,b.barX+b.pointWidth/2),m={x:m.x-
c.plotLeft,y:m.y-c.plotTop}):b.tooltipPos&&(m={x:b.tooltipPos[0],y:b.tooltipPos[1]}),k.align=g(k.align,"center"),k.verticalAlign=g(k.verticalAlign,"middle")):k=this.findAlignments(a,k),e.alignDataLabel.call(this,b,l,k,m,p),this.isRadialBar&&b.shapeArgs&&b.shapeArgs.start===b.shapeArgs.end&&l.hide(!0)):a.call(this,b,l,k,m,p)}));k(l,"getCoordinates",function(a,b){var d=this.chart,e={xAxis:[],yAxis:[]};d.polar?d.axes.forEach(function(a){var h=a.isXAxis,c=a.center;if("colorAxis"!==a.coll){var f=b.chartX-
c[0]-d.plotLeft;c=b.chartY-c[1]-d.plotTop;e[h?"xAxis":"yAxis"].push({axis:a,value:a.translate(h?Math.PI-Math.atan2(f,c):Math.sqrt(Math.pow(f,2)+Math.pow(c,2)),!0)})}}):e=a.call(this,b);return e});b.SVGRenderer.prototype.clipCircle=function(a,d,e){var h=b.uniqueKey(),g=this.createElement("clipPath").attr({id:h}).add(this.defs);a=this.circle(a,d,e).add(g);a.id=h;a.clipPath=g;return a};b.addEvent(b.Chart,"getAxes",function(){this.pane||(this.pane=[]);m(this.options.pane).forEach(function(a){new b.Pane(a,
this)},this)});b.addEvent(b.Chart,"afterDrawChartBox",function(){this.pane.forEach(function(a){a.render()})});b.addEvent(b.Series,"afterInit",function(){var a=this.chart;a.inverted&&a.polar&&(this.isRadialSeries=!0,this instanceof z.column&&(this.isRadialBar=!0))});k(b.Chart.prototype,"get",function(a,d){return b.find(this.pane,function(a){return a.options.id===d})||a.call(this,d)})});A(t,"masters/highcharts-more.src.js",[],function(){})});
//# sourceMappingURL=highcharts-more.js.map
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







;
