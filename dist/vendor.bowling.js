/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".bowling.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(16);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.2
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER

	exports.glMatrix = __webpack_require__(5);
	exports.mat2 = __webpack_require__(6);
	exports.mat2d = __webpack_require__(7);
	exports.mat3 = __webpack_require__(8);
	exports.mat4 = __webpack_require__(9);
	exports.quat = __webpack_require__(10);
	exports.vec2 = __webpack_require__(13);
	exports.vec3 = __webpack_require__(11);
	exports.vec4 = __webpack_require__(12);

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	/**
	 * @class Common utilities
	 * @name glMatrix
	 */
	var glMatrix = {};

	// Configuration Constants
	glMatrix.EPSILON = 0.000001;
	glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	glMatrix.RANDOM = Math.random;
	glMatrix.ENABLE_SIMD = false;

	// Capability detection
	glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
	glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	glMatrix.setMatrixArrayType = function(type) {
	    glMatrix.ARRAY_TYPE = type;
	}

	var degree = Math.PI / 180;

	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	glMatrix.toRadian = function(a){
	     return a * degree;
	}

	/**
	 * Tests whether or not the arguments have approximately the same value, within an absolute
	 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
	 * than or equal to 1.0, and a relative tolerance is used for larger values)
	 * 
	 * @param {Number} a The first number to test.
	 * @param {Number} b The second number to test.
	 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
	 */
	glMatrix.equals = function(a, b) {
		return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
	}

	module.exports = glMatrix;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 2x2 Matrix
	 * @name mat2
	 */
	var mat2 = {};

	/**
	 * Creates a new identity mat2
	 *
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param {mat2} a matrix to clone
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param {mat2} out the receiving matrix
	 * @returns {mat2} out
	 */
	mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Create a new mat2 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m10 Component in column 1, row 0 position (index 2)
	 * @param {Number} m11 Component in column 1, row 1 position (index 3)
	 * @returns {mat2} out A new 2x2 matrix
	 */
	mat2.fromValues = function(m00, m01, m10, m11) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m10;
	    out[3] = m11;
	    return out;
	};

	/**
	 * Set the components of a mat2 to the given values
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m10 Component in column 1, row 0 position (index 2)
	 * @param {Number} m11 Component in column 1, row 1 position (index 3)
	 * @returns {mat2} out
	 */
	mat2.set = function(out, m00, m01, m10, m11) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m10;
	    out[3] = m11;
	    return out;
	};


	/**
	 * Transpose the values of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;

	    return out;
	};

	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param {mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};

	/**
	 * Multiplies two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};

	/**
	 * Alias for {@link mat2.multiply}
	 * @function
	 */
	mat2.mul = mat2.multiply;

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2} out
	 **/
	mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.rotate(dest, dest, rad);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.scale(dest, dest, vec);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2} out
	 */
	mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2
	 *
	 * @param {mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2.str = function (a) {
	    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param {mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {mat2} L the lower triangular matrix 
	 * @param {mat2} D the diagonal matrix 
	 * @param {mat2} U the upper triangular matrix 
	 * @param {mat2} a the input matrix to factorize
	 */

	mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 

	/**
	 * Adds two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link mat2.subtract}
	 * @function
	 */
	mat2.sub = mat2.subtract;

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat2} a The first matrix.
	 * @param {mat2} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat2} a The first matrix.
	 * @param {mat2} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
	};

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat2} out
	 */
	mat2.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat2} out the receiving vector
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat2} out
	 */
	mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	module.exports = mat2;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 2x3 Matrix
	 * @name mat2d
	 * 
	 * @description 
	 * A mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var mat2d = {};

	/**
	 * Creates a new identity mat2d
	 *
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param {mat2d} a matrix to clone
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param {mat2d} out the receiving matrix
	 * @returns {mat2d} out
	 */
	mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Create a new mat2d with the given values
	 *
	 * @param {Number} a Component A (index 0)
	 * @param {Number} b Component B (index 1)
	 * @param {Number} c Component C (index 2)
	 * @param {Number} d Component D (index 3)
	 * @param {Number} tx Component TX (index 4)
	 * @param {Number} ty Component TY (index 5)
	 * @returns {mat2d} A new mat2d
	 */
	mat2d.fromValues = function(a, b, c, d, tx, ty) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a;
	    out[1] = b;
	    out[2] = c;
	    out[3] = d;
	    out[4] = tx;
	    out[5] = ty;
	    return out;
	};

	/**
	 * Set the components of a mat2d to the given values
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {Number} a Component A (index 0)
	 * @param {Number} b Component B (index 1)
	 * @param {Number} c Component C (index 2)
	 * @param {Number} d Component D (index 3)
	 * @param {Number} tx Component TX (index 4)
	 * @param {Number} ty Component TY (index 5)
	 * @returns {mat2d} out
	 */
	mat2d.set = function(out, a, b, c, d, tx, ty) {
	    out[0] = a;
	    out[1] = b;
	    out[2] = c;
	    out[3] = d;
	    out[4] = tx;
	    out[5] = ty;
	    return out;
	};

	/**
	 * Inverts a mat2d
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];

	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};

	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param {mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};

	/**
	 * Multiplies two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};

	/**
	 * Alias for {@link mat2d.multiply}
	 * @function
	 */
	mat2d.mul = mat2d.multiply;

	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to translate the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.rotate(dest, dest, rad);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.scale(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2d} out
	 */
	mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.translate(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat2d} out
	 */
	mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param {mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2d.str = function (a) {
	    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param {mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 

	/**
	 * Adds two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    return out;
	};

	/**
	 * Alias for {@link mat2d.subtract}
	 * @function
	 */
	mat2d.sub = mat2d.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat2d} out
	 */
	mat2d.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    return out;
	};

	/**
	 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat2d} out the receiving vector
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat2d} out
	 */
	mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    return out;
	};

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat2d} a The first matrix.
	 * @param {mat2d} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2d.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat2d} a The first matrix.
	 * @param {mat2d} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2d.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
	};

	module.exports = mat2d;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 3x3 Matrix
	 * @name mat3
	 */
	var mat3 = {};

	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};

	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Create a new mat3 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m10 Component in column 1, row 0 position (index 3)
	 * @param {Number} m11 Component in column 1, row 1 position (index 4)
	 * @param {Number} m12 Component in column 1, row 2 position (index 5)
	 * @param {Number} m20 Component in column 2, row 0 position (index 6)
	 * @param {Number} m21 Component in column 2, row 1 position (index 7)
	 * @param {Number} m22 Component in column 2, row 2 position (index 8)
	 * @returns {mat3} A new mat3
	 */
	mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m10;
	    out[4] = m11;
	    out[5] = m12;
	    out[6] = m20;
	    out[7] = m21;
	    out[8] = m22;
	    return out;
	};

	/**
	 * Set the components of a mat3 to the given values
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m10 Component in column 1, row 0 position (index 3)
	 * @param {Number} m11 Component in column 1, row 1 position (index 4)
	 * @param {Number} m12 Component in column 1, row 2 position (index 5)
	 * @param {Number} m20 Component in column 2, row 0 position (index 6)
	 * @param {Number} m21 Component in column 2, row 1 position (index 7)
	 * @param {Number} m22 Component in column 2, row 2 position (index 8)
	 * @returns {mat3} out
	 */
	mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m10;
	    out[4] = m11;
	    out[5] = m12;
	    out[6] = m20;
	    out[7] = m21;
	    out[8] = m22;
	    return out;
	};

	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,

	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};

	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	/**
	 * Multiplies two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];

	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};

	/**
	 * Alias for {@link mat3.multiply}
	 * @function
	 */
	mat3.mul = mat3.multiply;

	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];

	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;

	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;

	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};

	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        s = Math.sin(rad),
	        c = Math.cos(rad);

	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;

	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;

	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};

	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];

	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];

	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];

	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.translate(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat3} out
	 */
	mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.rotate(dest, dest, rad);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);

	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;

	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.scale(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat3} out
	 */
	mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;

	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;

	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;

	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};

	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;

	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;

	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;

	    return out;
	};

	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

	    return out;
	};

	/**
	 * Returns a string representation of a mat3
	 *
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat3.str = function (a) {
	    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};

	/**
	 * Adds two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    out[6] = a[6] + b[6];
	    out[7] = a[7] + b[7];
	    out[8] = a[8] + b[8];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    out[6] = a[6] - b[6];
	    out[7] = a[7] - b[7];
	    out[8] = a[8] - b[8];
	    return out;
	};

	/**
	 * Alias for {@link mat3.subtract}
	 * @function
	 */
	mat3.sub = mat3.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat3} out
	 */
	mat3.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    out[6] = a[6] * b;
	    out[7] = a[7] * b;
	    out[8] = a[8] * b;
	    return out;
	};

	/**
	 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat3} out the receiving vector
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat3} out
	 */
	mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    out[6] = a[6] + (b[6] * scale);
	    out[7] = a[7] + (b[7] * scale);
	    out[8] = a[8] + (b[8] * scale);
	    return out;
	};

	/*
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat3} a The first matrix.
	 * @param {mat3} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat3.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
	           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
	           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat3} a The first matrix.
	 * @param {mat3} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat3.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
	            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
	            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
	            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
	};


	module.exports = mat3;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 4x4 Matrix
	 * @name mat4
	 */
	var mat4 = {
	  scalar: {},
	  SIMD: {},
	};

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param {mat4} a matrix to clone
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Create a new mat4 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m03 Component in column 0, row 3 position (index 3)
	 * @param {Number} m10 Component in column 1, row 0 position (index 4)
	 * @param {Number} m11 Component in column 1, row 1 position (index 5)
	 * @param {Number} m12 Component in column 1, row 2 position (index 6)
	 * @param {Number} m13 Component in column 1, row 3 position (index 7)
	 * @param {Number} m20 Component in column 2, row 0 position (index 8)
	 * @param {Number} m21 Component in column 2, row 1 position (index 9)
	 * @param {Number} m22 Component in column 2, row 2 position (index 10)
	 * @param {Number} m23 Component in column 2, row 3 position (index 11)
	 * @param {Number} m30 Component in column 3, row 0 position (index 12)
	 * @param {Number} m31 Component in column 3, row 1 position (index 13)
	 * @param {Number} m32 Component in column 3, row 2 position (index 14)
	 * @param {Number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {mat4} A new mat4
	 */
	mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m03;
	    out[4] = m10;
	    out[5] = m11;
	    out[6] = m12;
	    out[7] = m13;
	    out[8] = m20;
	    out[9] = m21;
	    out[10] = m22;
	    out[11] = m23;
	    out[12] = m30;
	    out[13] = m31;
	    out[14] = m32;
	    out[15] = m33;
	    return out;
	};

	/**
	 * Set the components of a mat4 to the given values
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m03 Component in column 0, row 3 position (index 3)
	 * @param {Number} m10 Component in column 1, row 0 position (index 4)
	 * @param {Number} m11 Component in column 1, row 1 position (index 5)
	 * @param {Number} m12 Component in column 1, row 2 position (index 6)
	 * @param {Number} m13 Component in column 1, row 3 position (index 7)
	 * @param {Number} m20 Component in column 2, row 0 position (index 8)
	 * @param {Number} m21 Component in column 2, row 1 position (index 9)
	 * @param {Number} m22 Component in column 2, row 2 position (index 10)
	 * @param {Number} m23 Component in column 2, row 3 position (index 11)
	 * @param {Number} m30 Component in column 3, row 0 position (index 12)
	 * @param {Number} m31 Component in column 3, row 1 position (index 13)
	 * @param {Number} m32 Component in column 3, row 2 position (index 14)
	 * @param {Number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {mat4} out
	 */
	mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m03;
	    out[4] = m10;
	    out[5] = m11;
	    out[6] = m12;
	    out[7] = m13;
	    out[8] = m20;
	    out[9] = m21;
	    out[10] = m22;
	    out[11] = m23;
	    out[12] = m30;
	    out[13] = m31;
	    out[14] = m32;
	    out[15] = m33;
	    return out;
	};


	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */
	mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];

	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }

	    return out;
	};

	/**
	 * Transpose the values of a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.transpose = function(out, a) {
	    var a0, a1, a2, a3,
	        tmp01, tmp23,
	        out0, out1, out2, out3;

	    a0 = SIMD.Float32x4.load(a, 0);
	    a1 = SIMD.Float32x4.load(a, 4);
	    a2 = SIMD.Float32x4.load(a, 8);
	    a3 = SIMD.Float32x4.load(a, 12);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 0,  out0);
	    SIMD.Float32x4.store(out, 4,  out1);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 8,  out2);
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Transpse a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

	/**
	 * Inverts a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	    return out;
	};

	/**
	 * Inverts a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.invert = function(out, a) {
	  var row0, row1, row2, row3,
	      tmp1,
	      minor0, minor1, minor2, minor3,
	      det,
	      a0 = SIMD.Float32x4.load(a, 0),
	      a1 = SIMD.Float32x4.load(a, 4),
	      a2 = SIMD.Float32x4.load(a, 8),
	      a3 = SIMD.Float32x4.load(a, 12);

	  // Compute matrix adjugate
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  // Compute matrix determinant
	  det   = SIMD.Float32x4.mul(row0, minor0);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
	  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
	  det   = SIMD.Float32x4.sub(
	               SIMD.Float32x4.add(tmp1, tmp1),
	               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
	  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
	  if (!det) {
	      return null;
	  }

	  // Compute matrix inverse
	  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
	  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
	  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
	  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
	  return out;
	}

	/**
	 * Inverts a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

	/**
	 * Calculates the adjugate of a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.adjoint = function(out, a) {
	  var a0, a1, a2, a3;
	  var row0, row1, row2, row3;
	  var tmp1;
	  var minor0, minor1, minor2, minor3;

	  var a0 = SIMD.Float32x4.load(a, 0);
	  var a1 = SIMD.Float32x4.load(a, 4);
	  var a2 = SIMD.Float32x4.load(a, 8);
	  var a3 = SIMD.Float32x4.load(a, 12);

	  // Transpose the source matrix.  Sort of.  Not a true transpose operation
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  SIMD.Float32x4.store(out, 0,  minor0);
	  SIMD.Float32x4.store(out, 4,  minor1);
	  SIMD.Float32x4.store(out, 8,  minor2);
	  SIMD.Float32x4.store(out, 12, minor3);
	  return out;
	};

	/**
	 * Calculates the adjugate of a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param {mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;

	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};

	/**
	 * Multiplies two mat4's explicitly using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand, must be a Float32Array
	 * @param {mat4} b the second operand, must be a Float32Array
	 * @returns {mat4} out
	 */
	mat4.SIMD.multiply = function (out, a, b) {
	    var a0 = SIMD.Float32x4.load(a, 0);
	    var a1 = SIMD.Float32x4.load(a, 4);
	    var a2 = SIMD.Float32x4.load(a, 8);
	    var a3 = SIMD.Float32x4.load(a, 12);

	    var b0 = SIMD.Float32x4.load(b, 0);
	    var out0 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 0, out0);

	    var b1 = SIMD.Float32x4.load(b, 4);
	    var out1 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 4, out1);

	    var b2 = SIMD.Float32x4.load(b, 8);
	    var out2 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 8, out2);

	    var b3 = SIMD.Float32x4.load(b, 12);
	    var out3 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
	                        SIMD.Float32x4.add(
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Multiplies two mat4's explicitly not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.scalar.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

	/**
	 * Multiplies two mat4's using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */
	mat4.mul = mat4.multiply;

	/**
	 * Translate a mat4 by the given vector not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.scalar.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

	/**
	 * Translates a mat4 by the given vector using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.SIMD.translate = function (out, a, v) {
	    var a0 = SIMD.Float32x4.load(a, 0),
	        a1 = SIMD.Float32x4.load(a, 4),
	        a2 = SIMD.Float32x4.load(a, 8),
	        a3 = SIMD.Float32x4.load(a, 12),
	        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

	    if (a !== out) {
	        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
	        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
	        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
	    }

	    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
	    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
	    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

	    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
	    SIMD.Float32x4.store(out, 12, t0);

	    return out;
	};

	/**
	 * Translates a mat4 by the given vector using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.scalar.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3 using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.SIMD.scale = function(out, a, v) {
	    var a0, a1, a2;
	    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

	    a0 = SIMD.Float32x4.load(a, 0);
	    SIMD.Float32x4.store(
	        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

	    a1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(
	        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

	    a2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(
	        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 */
	mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateX = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	      out[0]  = a[0];
	      out[1]  = a[1];
	      out[2]  = a[2];
	      out[3]  = a[3];
	      out[12] = a[12];
	      out[13] = a[13];
	      out[14] = a[14];
	      out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

	/**
	 * Rotates a matrix by the given angle around the Y axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateY = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

	/**
	 * Rotates a matrix by the given angle around the Z axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateZ = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateX(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateY(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns the translation vector component of a transformation
	 *  matrix. If a matrix is built with fromRotationTranslation,
	 *  the returned vector will be the same as the translation vector
	 *  originally supplied.
	 * @param  {vec3} out Vector to receive translation component
	 * @param  {mat4} mat Matrix to be decomposed (input)
	 * @return {vec3} out
	 */
	mat4.getTranslation = function (out, mat) {
	  out[0] = mat[12];
	  out[1] = mat[13];
	  out[2] = mat[14];

	  return out;
	};

	/**
	 * Returns a quaternion representing the rotational component
	 *  of a transformation matrix. If a matrix is built with
	 *  fromRotationTranslation, the returned quaternion will be the
	 *  same as the quaternion originally supplied.
	 * @param {quat} out Quaternion to receive the rotation component
	 * @param {mat4} mat Matrix to be decomposed (input)
	 * @return {quat} out
	 */
	mat4.getRotation = function (out, mat) {
	  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
	  var trace = mat[0] + mat[5] + mat[10];
	  var S = 0;

	  if (trace > 0) { 
	    S = Math.sqrt(trace + 1.0) * 2;
	    out[3] = 0.25 * S;
	    out[0] = (mat[6] - mat[9]) / S;
	    out[1] = (mat[8] - mat[2]) / S; 
	    out[2] = (mat[1] - mat[4]) / S; 
	  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
	    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
	    out[3] = (mat[6] - mat[9]) / S;
	    out[0] = 0.25 * S;
	    out[1] = (mat[1] + mat[4]) / S; 
	    out[2] = (mat[8] + mat[2]) / S; 
	  } else if (mat[5] > mat[10]) { 
	    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
	    out[3] = (mat[8] - mat[2]) / S;
	    out[0] = (mat[1] + mat[4]) / S; 
	    out[1] = 0.25 * S;
	    out[2] = (mat[6] + mat[9]) / S; 
	  } else { 
	    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
	    out[3] = (mat[1] - mat[4]) / S;
	    out[0] = (mat[8] + mat[2]) / S;
	    out[1] = (mat[6] + mat[9]) / S;
	    out[2] = 0.25 * S;
	  }

	  return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];

	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @param {vec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,

	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,

	      sx = s[0],
	      sy = s[1],
	      sz = s[2],

	      ox = o[0],
	      oy = o[1],
	      oz = o[2];

	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;

	  return out;
	};

	/**
	 * Calculates a 4x4 matrix from the given quaternion
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat} q Quaternion to create matrix from
	 *
	 * @returns {mat4} out
	 */
	mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;

	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;

	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;

	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;

	    return out;
	};

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);

	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {vec3} eye Position of the viewer
	 * @param {vec3} center Point the viewer is looking at
	 * @param {vec3} up vec3 pointing up
	 * @returns {mat4} out
	 */
	mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
	        return mat4.identity(out);
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns a string representation of a mat4
	 *
	 * @param {mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat4.str = function (a) {
	    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param {mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};

	/**
	 * Adds two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    out[6] = a[6] + b[6];
	    out[7] = a[7] + b[7];
	    out[8] = a[8] + b[8];
	    out[9] = a[9] + b[9];
	    out[10] = a[10] + b[10];
	    out[11] = a[11] + b[11];
	    out[12] = a[12] + b[12];
	    out[13] = a[13] + b[13];
	    out[14] = a[14] + b[14];
	    out[15] = a[15] + b[15];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    out[6] = a[6] - b[6];
	    out[7] = a[7] - b[7];
	    out[8] = a[8] - b[8];
	    out[9] = a[9] - b[9];
	    out[10] = a[10] - b[10];
	    out[11] = a[11] - b[11];
	    out[12] = a[12] - b[12];
	    out[13] = a[13] - b[13];
	    out[14] = a[14] - b[14];
	    out[15] = a[15] - b[15];
	    return out;
	};

	/**
	 * Alias for {@link mat4.subtract}
	 * @function
	 */
	mat4.sub = mat4.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat4} out
	 */
	mat4.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    out[6] = a[6] * b;
	    out[7] = a[7] * b;
	    out[8] = a[8] * b;
	    out[9] = a[9] * b;
	    out[10] = a[10] * b;
	    out[11] = a[11] * b;
	    out[12] = a[12] * b;
	    out[13] = a[13] * b;
	    out[14] = a[14] * b;
	    out[15] = a[15] * b;
	    return out;
	};

	/**
	 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat4} out the receiving vector
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat4} out
	 */
	mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    out[6] = a[6] + (b[6] * scale);
	    out[7] = a[7] + (b[7] * scale);
	    out[8] = a[8] + (b[8] * scale);
	    out[9] = a[9] + (b[9] * scale);
	    out[10] = a[10] + (b[10] * scale);
	    out[11] = a[11] + (b[11] * scale);
	    out[12] = a[12] + (b[12] * scale);
	    out[13] = a[13] + (b[13] * scale);
	    out[14] = a[14] + (b[14] * scale);
	    out[15] = a[15] + (b[15] * scale);
	    return out;
	};

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat4} a The first matrix.
	 * @param {mat4} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat4.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
	           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
	           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
	           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat4} a The first matrix.
	 * @param {mat4} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat4.equals = function (a, b) {
	    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
	        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
	        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
	        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

	    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
	        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
	        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
	        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
	            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
	            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
	            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
	            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
	            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
	            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
	            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
	            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
	            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
	            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
	};



	module.exports = mat4;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);
	var mat3 = __webpack_require__(8);
	var vec3 = __webpack_require__(11);
	var vec4 = __webpack_require__(12);

	/**
	 * @class Quaternion
	 * @name quat
	 */
	var quat = {};

	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */
	quat.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {vec3} a the initial vector
	 * @param {vec3} b the destination vector
	 * @returns {quat} out
	 */
	quat.rotationTo = (function() {
	    var tmpvec3 = vec3.create();
	    var xUnitVec3 = vec3.fromValues(1,0,0);
	    var yUnitVec3 = vec3.fromValues(0,1,0);

	    return function(out, a, b) {
	        var dot = vec3.dot(a, b);
	        if (dot < -0.999999) {
	            vec3.cross(tmpvec3, xUnitVec3, a);
	            if (vec3.length(tmpvec3) < 0.000001)
	                vec3.cross(tmpvec3, yUnitVec3, a);
	            vec3.normalize(tmpvec3, tmpvec3);
	            quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return quat.normalize(out, out);
	        }
	    };
	})();

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {vec3} view  the vector representing the viewing direction
	 * @param {vec3} right the vector representing the local "right" direction
	 * @param {vec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */
	quat.setAxes = (function() {
	    var matr = mat3.create();

	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];

	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];

	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];

	        return quat.normalize(out, quat.fromMat3(out, matr));
	    };
	})();

	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {quat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.clone = vec4.clone;

	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.fromValues = vec4.fromValues;

	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */
	quat.copy = vec4.copy;

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */
	quat.set = vec4.set;

	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param {quat} out the receiving quaternion
	 * @returns {quat} out
	 */
	quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/
	quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};

	/**
	 * Gets the rotation axis and angle for a given
	 *  quaternion. If a quaternion is created with
	 *  setAxisAngle, this method will return the same
	 *  values as providied in the original parameter list
	 *  OR functionally equivalent values.
	 * Example: The quaternion formed by axis [0, 0, 1] and
	 *  angle -90 is the same as the quaternion formed by
	 *  [0, 0, 1] and 270. This method favors the latter.
	 * @param  {vec3} out_axis  Vector receiving the axis of rotation
	 * @param  {quat} q     Quaternion to be decomposed
	 * @return {Number}     Angle, in radians, of the rotation
	 */
	quat.getAxisAngle = function(out_axis, q) {
	    var rad = Math.acos(q[3]) * 2.0;
	    var s = Math.sin(rad / 2.0);
	    if (s != 0.0) {
	        out_axis[0] = q[0] / s;
	        out_axis[1] = q[1] / s;
	        out_axis[2] = q[2] / s;
	    } else {
	        // If s is zero, return any axis (no rotation - axis does not matter)
	        out_axis[0] = 1;
	        out_axis[1] = 0;
	        out_axis[2] = 0;
	    }
	    return rad;
	};

	/**
	 * Adds two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 * @function
	 */
	quat.add = vec4.add;

	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 */
	quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};

	/**
	 * Alias for {@link quat.multiply}
	 * @function
	 */
	quat.mul = quat.multiply;

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {quat} out the receiving vector
	 * @param {quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {quat} out
	 * @function
	 */
	quat.scale = vec4.scale;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate W component of
	 * @returns {quat} out
	 */
	quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];

	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};

	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	quat.dot = vec4.dot;

	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 * @function
	 */
	quat.lerp = vec4.lerp;

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 */
	quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    var        omega, cosom, sinom, scale0, scale1;

	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {quat} c the third operand
	 * @param {quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {quat} out
	 */
	quat.sqlerp = (function () {
	  var temp1 = quat.create();
	  var temp2 = quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    quat.slerp(temp1, a, d, t);
	    quat.slerp(temp2, b, c, t);
	    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate inverse of
	 * @returns {quat} out
	 */
	quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */
	quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Calculates the length of a quat
	 *
	 * @param {quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	quat.length = vec4.length;

	/**
	 * Alias for {@link quat.length}
	 * @function
	 */
	quat.len = quat.length;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param {quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	quat.squaredLength = vec4.squaredLength;

	/**
	 * Alias for {@link quat.squaredLength}
	 * @function
	 */
	quat.sqrLen = quat.squaredLength;

	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */
	quat.normalize = vec4.normalize;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {mat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */
	quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;

	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	quat.str = function (a) {
	    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {quat} a The first quaternion.
	 * @param {quat} b The second quaternion.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	quat.exactEquals = vec4.exactEquals;

	/**
	 * Returns whether or not the quaternions have approximately the same elements in the same position.
	 *
	 * @param {quat} a The first vector.
	 * @param {quat} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	quat.equals = vec4.equals;

	module.exports = quat;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 3 Dimensional Vector
	 * @name vec3
	 */
	var vec3 = {};

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	vec3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	vec3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */
	vec3.fromValues = function(x, y, z) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */
	vec3.sub = vec3.subtract;

	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.multiply}
	 * @function
	 */
	vec3.mul = vec3.multiply;

	/**
	 * Divides two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.divide}
	 * @function
	 */
	vec3.div = vec3.divide;

	/**
	 * Math.ceil the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to ceil
	 * @returns {vec3} out
	 */
	vec3.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    out[2] = Math.ceil(a[2]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to floor
	 * @returns {vec3} out
	 */
	vec3.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    out[2] = Math.floor(a[2]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};

	/**
	 * Math.round the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to round
	 * @returns {vec3} out
	 */
	vec3.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    return out;
	};

	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */
	vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};

	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */
	vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.distance}
	 * @function
	 */
	vec3.dist = vec3.distance;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @function
	 */
	vec3.sqrDist = vec3.squaredDistance;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param {vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */
	vec3.len = vec3.length;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredLength}
	 * @function
	 */
	vec3.sqrLen = vec3.squaredLength;

	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to negate
	 * @returns {vec3} out
	 */
	vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to invert
	 * @returns {vec3} out
	 */
	vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};

	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to normalize
	 * @returns {vec3} out
	 */
	vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];

	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};

	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec3} out
	 */
	vec3.random = function (out, scale) {
	    scale = scale || 1.0;

	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;

	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};

	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec3} out
	 */
	vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];

		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];

	  	return out;
	};

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec3.forEach = (function() {
	    var vec = vec3.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Get the angle between two 3D vectors
	 * @param {vec3} a The first operand
	 * @param {vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	vec3.angle = function(a, b) {
	   
	    var tempA = vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = vec3.fromValues(b[0], b[1], b[2]);
	 
	    vec3.normalize(tempA, tempA);
	    vec3.normalize(tempB, tempB);
	 
	    var cosine = vec3.dot(tempA, tempB);

	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec3.str = function (a) {
	    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {vec3} a The first vector.
	 * @param {vec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec3.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec3} a The first vector.
	 * @param {vec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec3.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2];
	    var b0 = b[0], b1 = b[1], b2 = b[2];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
	};

	module.exports = vec3;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 4 Dimensional Vector
	 * @name vec4
	 */
	var vec4 = {};

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */
	vec4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {vec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */
	vec4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */
	vec4.fromValues = function(x, y, z, w) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the source vector
	 * @returns {vec4} out
	 */
	vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */
	vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Adds two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.subtract}
	 * @function
	 */
	vec4.sub = vec4.subtract;

	/**
	 * Multiplies two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.multiply}
	 * @function
	 */
	vec4.mul = vec4.multiply;

	/**
	 * Divides two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.divide}
	 * @function
	 */
	vec4.div = vec4.divide;

	/**
	 * Math.ceil the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to ceil
	 * @returns {vec4} out
	 */
	vec4.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    out[2] = Math.ceil(a[2]);
	    out[3] = Math.ceil(a[3]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to floor
	 * @returns {vec4} out
	 */
	vec4.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    out[2] = Math.floor(a[2]);
	    out[3] = Math.floor(a[3]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};

	/**
	 * Math.round the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to round
	 * @returns {vec4} out
	 */
	vec4.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    out[3] = Math.round(a[3]);
	    return out;
	};

	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec4} out
	 */
	vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec4} out
	 */
	vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.distance}
	 * @function
	 */
	vec4.dist = vec4.distance;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredDistance}
	 * @function
	 */
	vec4.sqrDist = vec4.squaredDistance;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param {vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.length}
	 * @function
	 */
	vec4.len = vec4.length;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param {vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredLength}
	 * @function
	 */
	vec4.sqrLen = vec4.squaredLength;

	/**
	 * Negates the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to negate
	 * @returns {vec4} out
	 */
	vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to invert
	 * @returns {vec4} out
	 */
	vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};

	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to normalize
	 * @returns {vec4} out
	 */
	vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec4} out
	 */
	vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec4} out
	 */
	vec4.random = function (out, scale) {
	    scale = scale || 1.0;

	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = glMatrix.RANDOM();
	    out[1] = glMatrix.RANDOM();
	    out[2] = glMatrix.RANDOM();
	    out[3] = glMatrix.RANDOM();
	    vec4.normalize(out, out);
	    vec4.scale(out, out, scale);
	    return out;
	};

	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec4} out
	 */
	vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};

	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec4} out
	 */
	vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec4.forEach = (function() {
	    var vec = vec4.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec4.str = function (a) {
	    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {vec4} a The first vector.
	 * @param {vec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec4.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec4} a The first vector.
	 * @param {vec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec4.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
	};

	module.exports = vec4;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(5);

	/**
	 * @class 2 Dimensional Vector
	 * @name vec2
	 */
	var vec2 = {};

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	vec2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	vec2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	vec2.fromValues = function(x, y) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */
	vec2.sub = vec2.subtract;

	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.multiply}
	 * @function
	 */
	vec2.mul = vec2.multiply;

	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.divide}
	 * @function
	 */
	vec2.div = vec2.divide;

	/**
	 * Math.ceil the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to ceil
	 * @returns {vec2} out
	 */
	vec2.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to floor
	 * @returns {vec2} out
	 */
	vec2.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};

	/**
	 * Math.round the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to round
	 * @returns {vec2} out
	 */
	vec2.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    return out;
	};

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.distance}
	 * @function
	 */
	vec2.dist = vec2.distance;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredDistance}
	 * @function
	 */
	vec2.sqrDist = vec2.squaredDistance;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.length}
	 * @function
	 */
	vec2.len = vec2.length;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @function
	 */
	vec2.sqrLen = vec2.squaredLength;

	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to invert
	 * @returns {vec2} out
	 */
	vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};

	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec2.forEach = (function() {
	    var vec = vec2.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec2.str = function (a) {
	    return 'vec2(' + a[0] + ', ' + a[1] + ')';
	};

	/**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
	 *
	 * @param {vec2} a The first vector.
	 * @param {vec2} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec2.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec2} a The first vector.
	 * @param {vec2} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec2.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1];
	    var b0 = b[0], b1 = b[1];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
	};

	module.exports = vec2;


/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*
	 * Copyright (c) 2015 cannon.js Authors
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use, copy,
	 * modify, merge, publish, distribute, sublicense, and/or sell copies
	 * of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	!function(e){if(true)module.exports=e();else if("function"==typeof define&&false)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CANNON=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	module.exports={
	  "name": "cannon",
	  "version": "0.6.2",
	  "description": "A lightweight 3D physics engine written in JavaScript.",
	  "homepage": "https://github.com/schteppe/cannon.js",
	  "author": "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
	  "keywords": [
	    "cannon.js",
	    "cannon",
	    "physics",
	    "engine",
	    "3d"
	  ],
	  "main": "./build/cannon.js",
	  "engines": {
	    "node": "*"
	  },
	  "repository": {
	    "type": "git",
	    "url": "https://github.com/schteppe/cannon.js.git"
	  },
	  "bugs": {
	    "url": "https://github.com/schteppe/cannon.js/issues"
	  },
	  "licenses": [
	    {
	      "type": "MIT"
	    }
	  ],
	  "devDependencies": {
	    "jshint": "latest",
	    "uglify-js": "latest",
	    "nodeunit": "^0.9.0",
	    "grunt": "~0.4.0",
	    "grunt-contrib-jshint": "~0.1.1",
	    "grunt-contrib-nodeunit": "^0.4.1",
	    "grunt-contrib-concat": "~0.1.3",
	    "grunt-contrib-uglify": "^0.5.1",
	    "grunt-browserify": "^2.1.4",
	    "grunt-contrib-yuidoc": "^0.5.2",
	    "browserify": "*"
	  },
	  "dependencies": {}
	}

	},{}],2:[function(_dereq_,module,exports){
	// Export classes
	module.exports = {
	    version :                       _dereq_('../package.json').version,

	    AABB :                          _dereq_('./collision/AABB'),
	    ArrayCollisionMatrix :          _dereq_('./collision/ArrayCollisionMatrix'),
	    Body :                          _dereq_('./objects/Body'),
	    Box :                           _dereq_('./shapes/Box'),
	    Broadphase :                    _dereq_('./collision/Broadphase'),
	    Constraint :                    _dereq_('./constraints/Constraint'),
	    ContactEquation :               _dereq_('./equations/ContactEquation'),
	    Narrowphase :                   _dereq_('./world/Narrowphase'),
	    ConeTwistConstraint :           _dereq_('./constraints/ConeTwistConstraint'),
	    ContactMaterial :               _dereq_('./material/ContactMaterial'),
	    ConvexPolyhedron :              _dereq_('./shapes/ConvexPolyhedron'),
	    Cylinder :                      _dereq_('./shapes/Cylinder'),
	    DistanceConstraint :            _dereq_('./constraints/DistanceConstraint'),
	    Equation :                      _dereq_('./equations/Equation'),
	    EventTarget :                   _dereq_('./utils/EventTarget'),
	    FrictionEquation :              _dereq_('./equations/FrictionEquation'),
	    GSSolver :                      _dereq_('./solver/GSSolver'),
	    GridBroadphase :                _dereq_('./collision/GridBroadphase'),
	    Heightfield :                   _dereq_('./shapes/Heightfield'),
	    HingeConstraint :               _dereq_('./constraints/HingeConstraint'),
	    LockConstraint :                _dereq_('./constraints/LockConstraint'),
	    Mat3 :                          _dereq_('./math/Mat3'),
	    Material :                      _dereq_('./material/Material'),
	    NaiveBroadphase :               _dereq_('./collision/NaiveBroadphase'),
	    ObjectCollisionMatrix :         _dereq_('./collision/ObjectCollisionMatrix'),
	    Pool :                          _dereq_('./utils/Pool'),
	    Particle :                      _dereq_('./shapes/Particle'),
	    Plane :                         _dereq_('./shapes/Plane'),
	    PointToPointConstraint :        _dereq_('./constraints/PointToPointConstraint'),
	    Quaternion :                    _dereq_('./math/Quaternion'),
	    Ray :                           _dereq_('./collision/Ray'),
	    RaycastVehicle :                _dereq_('./objects/RaycastVehicle'),
	    RaycastResult :                 _dereq_('./collision/RaycastResult'),
	    RigidVehicle :                  _dereq_('./objects/RigidVehicle'),
	    RotationalEquation :            _dereq_('./equations/RotationalEquation'),
	    RotationalMotorEquation :       _dereq_('./equations/RotationalMotorEquation'),
	    SAPBroadphase :                 _dereq_('./collision/SAPBroadphase'),
	    SPHSystem :                     _dereq_('./objects/SPHSystem'),
	    Shape :                         _dereq_('./shapes/Shape'),
	    Solver :                        _dereq_('./solver/Solver'),
	    Sphere :                        _dereq_('./shapes/Sphere'),
	    SplitSolver :                   _dereq_('./solver/SplitSolver'),
	    Spring :                        _dereq_('./objects/Spring'),
	    Trimesh :                       _dereq_('./shapes/Trimesh'),
	    Vec3 :                          _dereq_('./math/Vec3'),
	    Vec3Pool :                      _dereq_('./utils/Vec3Pool'),
	    World :                         _dereq_('./world/World'),
	};

	},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(_dereq_,module,exports){
	var Vec3 = _dereq_('../math/Vec3');
	var Utils = _dereq_('../utils/Utils');

	module.exports = AABB;

	/**
	 * Axis aligned bounding box class.
	 * @class AABB
	 * @constructor
	 * @param {Object} [options]
	 * @param {Vec3}   [options.upperBound]
	 * @param {Vec3}   [options.lowerBound]
	 */
	function AABB(options){
	    options = options || {};

	    /**
	     * The lower bound of the bounding box.
	     * @property lowerBound
	     * @type {Vec3}
	     */
	    this.lowerBound = new Vec3();
	    if(options.lowerBound){
	        this.lowerBound.copy(options.lowerBound);
	    }

	    /**
	     * The upper bound of the bounding box.
	     * @property upperBound
	     * @type {Vec3}
	     */
	    this.upperBound = new Vec3();
	    if(options.upperBound){
	        this.upperBound.copy(options.upperBound);
	    }
	}

	var tmp = new Vec3();

	/**
	 * Set the AABB bounds from a set of points.
	 * @method setFromPoints
	 * @param {Array} points An array of Vec3's.
	 * @param {Vec3} position
	 * @param {Quaternion} quaternion
	 * @param {number} skinSize
	 * @return {AABB} The self object
	 */
	AABB.prototype.setFromPoints = function(points, position, quaternion, skinSize){
	    var l = this.lowerBound,
	        u = this.upperBound,
	        q = quaternion;

	    // Set to the first point
	    l.copy(points[0]);
	    if(q){
	        q.vmult(l, l);
	    }
	    u.copy(l);

	    for(var i = 1; i<points.length; i++){
	        var p = points[i];

	        if(q){
	            q.vmult(p, tmp);
	            p = tmp;
	        }

	        if(p.x > u.x){ u.x = p.x; }
	        if(p.x < l.x){ l.x = p.x; }
	        if(p.y > u.y){ u.y = p.y; }
	        if(p.y < l.y){ l.y = p.y; }
	        if(p.z > u.z){ u.z = p.z; }
	        if(p.z < l.z){ l.z = p.z; }
	    }

	    // Add offset
	    if (position) {
	        position.vadd(l, l);
	        position.vadd(u, u);
	    }

	    if(skinSize){
	        l.x -= skinSize;
	        l.y -= skinSize;
	        l.z -= skinSize;
	        u.x += skinSize;
	        u.y += skinSize;
	        u.z += skinSize;
	    }

	    return this;
	};

	/**
	 * Copy bounds from an AABB to this AABB
	 * @method copy
	 * @param  {AABB} aabb Source to copy from
	 * @return {AABB} The this object, for chainability
	 */
	AABB.prototype.copy = function(aabb){
	    this.lowerBound.copy(aabb.lowerBound);
	    this.upperBound.copy(aabb.upperBound);
	    return this;
	};

	/**
	 * Clone an AABB
	 * @method clone
	 */
	AABB.prototype.clone = function(){
	    return new AABB().copy(this);
	};

	/**
	 * Extend this AABB so that it covers the given AABB too.
	 * @method extend
	 * @param  {AABB} aabb
	 */
	AABB.prototype.extend = function(aabb){
	    // Extend lower bound
	    var l = aabb.lowerBound.x;
	    if(this.lowerBound.x > l){
	        this.lowerBound.x = l;
	    }

	    // Upper
	    var u = aabb.upperBound.x;
	    if(this.upperBound.x < u){
	        this.upperBound.x = u;
	    }

	    // Extend lower bound
	    var l = aabb.lowerBound.y;
	    if(this.lowerBound.y > l){
	        this.lowerBound.y = l;
	    }

	    // Upper
	    var u = aabb.upperBound.y;
	    if(this.upperBound.y < u){
	        this.upperBound.y = u;
	    }

	    // Extend lower bound
	    var l = aabb.lowerBound.z;
	    if(this.lowerBound.z > l){
	        this.lowerBound.z = l;
	    }

	    // Upper
	    var u = aabb.upperBound.z;
	    if(this.upperBound.z < u){
	        this.upperBound.z = u;
	    }
	};

	/**
	 * Returns true if the given AABB overlaps this AABB.
	 * @method overlaps
	 * @param  {AABB} aabb
	 * @return {Boolean}
	 */
	AABB.prototype.overlaps = function(aabb){
	    var l1 = this.lowerBound,
	        u1 = this.upperBound,
	        l2 = aabb.lowerBound,
	        u2 = aabb.upperBound;

	    //      l2        u2
	    //      |---------|
	    // |--------|
	    // l1       u1

	    return ((l2.x <= u1.x && u1.x <= u2.x) || (l1.x <= u2.x && u2.x <= u1.x)) &&
	           ((l2.y <= u1.y && u1.y <= u2.y) || (l1.y <= u2.y && u2.y <= u1.y)) &&
	           ((l2.z <= u1.z && u1.z <= u2.z) || (l1.z <= u2.z && u2.z <= u1.z));
	};

	/**
	 * Returns true if the given AABB is fully contained in this AABB.
	 * @method contains
	 * @param {AABB} aabb
	 * @return {Boolean}
	 */
	AABB.prototype.contains = function(aabb){
	    var l1 = this.lowerBound,
	        u1 = this.upperBound,
	        l2 = aabb.lowerBound,
	        u2 = aabb.upperBound;

	    //      l2        u2
	    //      |---------|
	    // |---------------|
	    // l1              u1

	    return (
	        (l1.x <= l2.x && u1.x >= u2.x) &&
	        (l1.y <= l2.y && u1.y >= u2.y) &&
	        (l1.z <= l2.z && u1.z >= u2.z)
	    );
	};

	/**
	 * @method getCorners
	 * @param {Vec3} a
	 * @param {Vec3} b
	 * @param {Vec3} c
	 * @param {Vec3} d
	 * @param {Vec3} e
	 * @param {Vec3} f
	 * @param {Vec3} g
	 * @param {Vec3} h
	 */
	AABB.prototype.getCorners = function(a, b, c, d, e, f, g, h){
	    var l = this.lowerBound,
	        u = this.upperBound;

	    a.copy(l);
	    b.set( u.x, l.y, l.z );
	    c.set( u.x, u.y, l.z );
	    d.set( l.x, u.y, u.z );
	    e.set( u.x, l.y, l.z );
	    f.set( l.x, u.y, l.z );
	    g.set( l.x, l.y, u.z );
	    h.copy(u);
	};

	var transformIntoFrame_corners = [
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3()
	];

	/**
	 * Get the representation of an AABB in another frame.
	 * @method toLocalFrame
	 * @param  {Transform} frame
	 * @param  {AABB} target
	 * @return {AABB} The "target" AABB object.
	 */
	AABB.prototype.toLocalFrame = function(frame, target){

	    var corners = transformIntoFrame_corners;
	    var a = corners[0];
	    var b = corners[1];
	    var c = corners[2];
	    var d = corners[3];
	    var e = corners[4];
	    var f = corners[5];
	    var g = corners[6];
	    var h = corners[7];

	    // Get corners in current frame
	    this.getCorners(a, b, c, d, e, f, g, h);

	    // Transform them to new local frame
	    for(var i=0; i !== 8; i++){
	        var corner = corners[i];
	        frame.pointToLocal(corner, corner);
	    }

	    return target.setFromPoints(corners);
	};

	/**
	 * Get the representation of an AABB in the global frame.
	 * @method toWorldFrame
	 * @param  {Transform} frame
	 * @param  {AABB} target
	 * @return {AABB} The "target" AABB object.
	 */
	AABB.prototype.toWorldFrame = function(frame, target){

	    var corners = transformIntoFrame_corners;
	    var a = corners[0];
	    var b = corners[1];
	    var c = corners[2];
	    var d = corners[3];
	    var e = corners[4];
	    var f = corners[5];
	    var g = corners[6];
	    var h = corners[7];

	    // Get corners in current frame
	    this.getCorners(a, b, c, d, e, f, g, h);

	    // Transform them to new local frame
	    for(var i=0; i !== 8; i++){
	        var corner = corners[i];
	        frame.pointToWorld(corner, corner);
	    }

	    return target.setFromPoints(corners);
	};

	},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(_dereq_,module,exports){
	module.exports = ArrayCollisionMatrix;

	/**
	 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
	 * @class ArrayCollisionMatrix
	 * @constructor
	 */
	function ArrayCollisionMatrix() {

	    /**
	     * The matrix storage
	     * @property matrix
	     * @type {Array}
	     */
		this.matrix = [];
	}

	/**
	 * Get an element
	 * @method get
	 * @param  {Number} i
	 * @param  {Number} j
	 * @return {Number}
	 */
	ArrayCollisionMatrix.prototype.get = function(i, j) {
		i = i.index;
		j = j.index;
	    if (j > i) {
	        var temp = j;
	        j = i;
	        i = temp;
	    }
		return this.matrix[(i*(i + 1)>>1) + j-1];
	};

	/**
	 * Set an element
	 * @method set
	 * @param {Number} i
	 * @param {Number} j
	 * @param {Number} value
	 */
	ArrayCollisionMatrix.prototype.set = function(i, j, value) {
		i = i.index;
		j = j.index;
	    if (j > i) {
	        var temp = j;
	        j = i;
	        i = temp;
	    }
		this.matrix[(i*(i + 1)>>1) + j-1] = value ? 1 : 0;
	};

	/**
	 * Sets all elements to zero
	 * @method reset
	 */
	ArrayCollisionMatrix.prototype.reset = function() {
		for (var i=0, l=this.matrix.length; i!==l; i++) {
			this.matrix[i]=0;
		}
	};

	/**
	 * Sets the max number of objects
	 * @method setNumObjects
	 * @param {Number} n
	 */
	ArrayCollisionMatrix.prototype.setNumObjects = function(n) {
		this.matrix.length = n*(n-1)>>1;
	};

	},{}],5:[function(_dereq_,module,exports){
	var Body = _dereq_('../objects/Body');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Shape = _dereq_('../shapes/Shape');
	var Plane = _dereq_('../shapes/Plane');

	module.exports = Broadphase;

	/**
	 * Base class for broadphase implementations
	 * @class Broadphase
	 * @constructor
	 * @author schteppe
	 */
	function Broadphase(){
	    /**
	    * The world to search for collisions in.
	    * @property world
	    * @type {World}
	    */
	    this.world = null;

	    /**
	     * If set to true, the broadphase uses bounding boxes for intersection test, else it uses bounding spheres.
	     * @property useBoundingBoxes
	     * @type {Boolean}
	     */
	    this.useBoundingBoxes = false;

	    /**
	     * Set to true if the objects in the world moved.
	     * @property {Boolean} dirty
	     */
	    this.dirty = true;
	}

	/**
	 * Get the collision pairs from the world
	 * @method collisionPairs
	 * @param {World} world The world to search in
	 * @param {Array} p1 Empty array to be filled with body objects
	 * @param {Array} p2 Empty array to be filled with body objects
	 */
	Broadphase.prototype.collisionPairs = function(world,p1,p2){
	    throw new Error("collisionPairs not implemented for this BroadPhase class!");
	};

	/**
	 * Check if a body pair needs to be intersection tested at all.
	 * @method needBroadphaseCollision
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @return {bool}
	 */
	var Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC = Body.STATIC | Body.KINEMATIC;
	Broadphase.prototype.needBroadphaseCollision = function(bodyA,bodyB){

	    // Check collision filter masks
	    if( (bodyA.collisionFilterGroup & bodyB.collisionFilterMask)===0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask)===0){
	        return false;
	    }

	    // Check types
	    if(((bodyA.type & Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC)!==0 || bodyA.sleepState === Body.SLEEPING) &&
	       ((bodyB.type & Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC)!==0 || bodyB.sleepState === Body.SLEEPING)) {
	        // Both bodies are static, kinematic or sleeping. Skip.
	        return false;
	    }

	    return true;
	};

	/**
	 * Check if the bounding volumes of two bodies intersect.
	 * @method intersectionTest
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {array} pairs1
	 * @param {array} pairs2
	  */
	Broadphase.prototype.intersectionTest = function(bodyA, bodyB, pairs1, pairs2){
	    if(this.useBoundingBoxes){
	        this.doBoundingBoxBroadphase(bodyA,bodyB,pairs1,pairs2);
	    } else {
	        this.doBoundingSphereBroadphase(bodyA,bodyB,pairs1,pairs2);
	    }
	};

	/**
	 * Check if the bounding spheres of two bodies are intersecting.
	 * @method doBoundingSphereBroadphase
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Array} pairs1 bodyA is appended to this array if intersection
	 * @param {Array} pairs2 bodyB is appended to this array if intersection
	 */
	var Broadphase_collisionPairs_r = new Vec3(), // Temp objects
	    Broadphase_collisionPairs_normal =  new Vec3(),
	    Broadphase_collisionPairs_quat =  new Quaternion(),
	    Broadphase_collisionPairs_relpos  =  new Vec3();
	Broadphase.prototype.doBoundingSphereBroadphase = function(bodyA,bodyB,pairs1,pairs2){
	    var r = Broadphase_collisionPairs_r;
	    bodyB.position.vsub(bodyA.position,r);
	    var boundingRadiusSum2 = Math.pow(bodyA.boundingRadius + bodyB.boundingRadius, 2);
	    var norm2 = r.norm2();
	    if(norm2 < boundingRadiusSum2){
	        pairs1.push(bodyA);
	        pairs2.push(bodyB);
	    }
	};

	/**
	 * Check if the bounding boxes of two bodies are intersecting.
	 * @method doBoundingBoxBroadphase
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Array} pairs1
	 * @param {Array} pairs2
	 */
	Broadphase.prototype.doBoundingBoxBroadphase = function(bodyA,bodyB,pairs1,pairs2){
	    if(bodyA.aabbNeedsUpdate){
	        bodyA.computeAABB();
	    }
	    if(bodyB.aabbNeedsUpdate){
	        bodyB.computeAABB();
	    }

	    // Check AABB / AABB
	    if(bodyA.aabb.overlaps(bodyB.aabb)){
	        pairs1.push(bodyA);
	        pairs2.push(bodyB);
	    }
	};

	/**
	 * Removes duplicate pairs from the pair arrays.
	 * @method makePairsUnique
	 * @param {Array} pairs1
	 * @param {Array} pairs2
	 */
	var Broadphase_makePairsUnique_temp = { keys:[] },
	    Broadphase_makePairsUnique_p1 = [],
	    Broadphase_makePairsUnique_p2 = [];
	Broadphase.prototype.makePairsUnique = function(pairs1,pairs2){
	    var t = Broadphase_makePairsUnique_temp,
	        p1 = Broadphase_makePairsUnique_p1,
	        p2 = Broadphase_makePairsUnique_p2,
	        N = pairs1.length;

	    for(var i=0; i!==N; i++){
	        p1[i] = pairs1[i];
	        p2[i] = pairs2[i];
	    }

	    pairs1.length = 0;
	    pairs2.length = 0;

	    for(var i=0; i!==N; i++){
	        var id1 = p1[i].id,
	            id2 = p2[i].id;
	        var key = id1 < id2 ? id1+","+id2 :  id2+","+id1;
	        t[key] = i;
	        t.keys.push(key);
	    }

	    for(var i=0; i!==t.keys.length; i++){
	        var key = t.keys.pop(),
	            pairIndex = t[key];
	        pairs1.push(p1[pairIndex]);
	        pairs2.push(p2[pairIndex]);
	        delete t[key];
	    }
	};

	/**
	 * To be implemented by subcasses
	 * @method setWorld
	 * @param {World} world
	 */
	Broadphase.prototype.setWorld = function(world){
	};

	/**
	 * Check if the bounding spheres of two bodies overlap.
	 * @method boundingSphereCheck
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @return {boolean}
	 */
	var bsc_dist = new Vec3();
	Broadphase.boundingSphereCheck = function(bodyA,bodyB){
	    var dist = bsc_dist;
	    bodyA.position.vsub(bodyB.position,dist);
	    return Math.pow(bodyA.shape.boundingSphereRadius + bodyB.shape.boundingSphereRadius,2) > dist.norm2();
	};

	/**
	 * Returns all the bodies within the AABB.
	 * @method aabbQuery
	 * @param  {World} world
	 * @param  {AABB} aabb
	 * @param  {array} result An array to store resulting bodies in.
	 * @return {array}
	 */
	Broadphase.prototype.aabbQuery = function(world, aabb, result){
	    console.warn('.aabbQuery is not implemented in this Broadphase subclass.');
	    return [];
	};
	},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(_dereq_,module,exports){
	module.exports = GridBroadphase;

	var Broadphase = _dereq_('./Broadphase');
	var Vec3 = _dereq_('../math/Vec3');
	var Shape = _dereq_('../shapes/Shape');

	/**
	 * Axis aligned uniform grid broadphase.
	 * @class GridBroadphase
	 * @constructor
	 * @extends Broadphase
	 * @todo Needs support for more than just planes and spheres.
	 * @param {Vec3} aabbMin
	 * @param {Vec3} aabbMax
	 * @param {Number} nx Number of boxes along x
	 * @param {Number} ny Number of boxes along y
	 * @param {Number} nz Number of boxes along z
	 */
	function GridBroadphase(aabbMin,aabbMax,nx,ny,nz){
	    Broadphase.apply(this);
	    this.nx = nx || 10;
	    this.ny = ny || 10;
	    this.nz = nz || 10;
	    this.aabbMin = aabbMin || new Vec3(100,100,100);
	    this.aabbMax = aabbMax || new Vec3(-100,-100,-100);
		var nbins = this.nx * this.ny * this.nz;
		if (nbins <= 0) {
			throw "GridBroadphase: Each dimension's n must be >0";
		}
	    this.bins = [];
		this.binLengths = []; //Rather than continually resizing arrays (thrashing the memory), just record length and allow them to grow
		this.bins.length = nbins;
		this.binLengths.length = nbins;
		for (var i=0;i<nbins;i++) {
			this.bins[i]=[];
			this.binLengths[i]=0;
		}
	}
	GridBroadphase.prototype = new Broadphase();
	GridBroadphase.prototype.constructor = GridBroadphase;

	/**
	 * Get all the collision pairs in the physics world
	 * @method collisionPairs
	 * @param {World} world
	 * @param {Array} pairs1
	 * @param {Array} pairs2
	 */
	var GridBroadphase_collisionPairs_d = new Vec3();
	var GridBroadphase_collisionPairs_binPos = new Vec3();
	GridBroadphase.prototype.collisionPairs = function(world,pairs1,pairs2){
	    var N = world.numObjects(),
	        bodies = world.bodies;

	    var max = this.aabbMax,
	        min = this.aabbMin,
	        nx = this.nx,
	        ny = this.ny,
	        nz = this.nz;

		var xstep = ny*nz;
		var ystep = nz;
		var zstep = 1;

	    var xmax = max.x,
	        ymax = max.y,
	        zmax = max.z,
	        xmin = min.x,
	        ymin = min.y,
	        zmin = min.z;

	    var xmult = nx / (xmax-xmin),
	        ymult = ny / (ymax-ymin),
	        zmult = nz / (zmax-zmin);

	    var binsizeX = (xmax - xmin) / nx,
	        binsizeY = (ymax - ymin) / ny,
	        binsizeZ = (zmax - zmin) / nz;

		var binRadius = Math.sqrt(binsizeX*binsizeX + binsizeY*binsizeY + binsizeZ*binsizeZ) * 0.5;

	    var types = Shape.types;
	    var SPHERE =            types.SPHERE,
	        PLANE =             types.PLANE,
	        BOX =               types.BOX,
	        COMPOUND =          types.COMPOUND,
	        CONVEXPOLYHEDRON =  types.CONVEXPOLYHEDRON;

	    var bins=this.bins,
			binLengths=this.binLengths,
	        Nbins=this.bins.length;

	    // Reset bins
	    for(var i=0; i!==Nbins; i++){
	        binLengths[i] = 0;
	    }

	    var ceil = Math.ceil;
		var min = Math.min;
		var max = Math.max;

		function addBoxToBins(x0,y0,z0,x1,y1,z1,bi) {
			var xoff0 = ((x0 - xmin) * xmult)|0,
				yoff0 = ((y0 - ymin) * ymult)|0,
				zoff0 = ((z0 - zmin) * zmult)|0,
				xoff1 = ceil((x1 - xmin) * xmult),
				yoff1 = ceil((y1 - ymin) * ymult),
				zoff1 = ceil((z1 - zmin) * zmult);

			if (xoff0 < 0) { xoff0 = 0; } else if (xoff0 >= nx) { xoff0 = nx - 1; }
			if (yoff0 < 0) { yoff0 = 0; } else if (yoff0 >= ny) { yoff0 = ny - 1; }
			if (zoff0 < 0) { zoff0 = 0; } else if (zoff0 >= nz) { zoff0 = nz - 1; }
			if (xoff1 < 0) { xoff1 = 0; } else if (xoff1 >= nx) { xoff1 = nx - 1; }
			if (yoff1 < 0) { yoff1 = 0; } else if (yoff1 >= ny) { yoff1 = ny - 1; }
			if (zoff1 < 0) { zoff1 = 0; } else if (zoff1 >= nz) { zoff1 = nz - 1; }

			xoff0 *= xstep;
			yoff0 *= ystep;
			zoff0 *= zstep;
			xoff1 *= xstep;
			yoff1 *= ystep;
			zoff1 *= zstep;

			for (var xoff = xoff0; xoff <= xoff1; xoff += xstep) {
				for (var yoff = yoff0; yoff <= yoff1; yoff += ystep) {
					for (var zoff = zoff0; zoff <= zoff1; zoff += zstep) {
						var idx = xoff+yoff+zoff;
						bins[idx][binLengths[idx]++] = bi;
					}
				}
			}
		}

	    // Put all bodies into the bins
	    for(var i=0; i!==N; i++){
	        var bi = bodies[i];
	        var si = bi.shape;

	        switch(si.type){
	        case SPHERE:
	            // Put in bin
	            // check if overlap with other bins
	            var x = bi.position.x,
	                y = bi.position.y,
	                z = bi.position.z;
	            var r = si.radius;

				addBoxToBins(x-r, y-r, z-r, x+r, y+r, z+r, bi);
	            break;

	        case PLANE:
	            if(si.worldNormalNeedsUpdate){
	                si.computeWorldNormal(bi.quaternion);
	            }
	            var planeNormal = si.worldNormal;

				//Relative position from origin of plane object to the first bin
				//Incremented as we iterate through the bins
				var xreset = xmin + binsizeX*0.5 - bi.position.x,
					yreset = ymin + binsizeY*0.5 - bi.position.y,
					zreset = zmin + binsizeZ*0.5 - bi.position.z;

	            var d = GridBroadphase_collisionPairs_d;
				d.set(xreset, yreset, zreset);

				for (var xi = 0, xoff = 0; xi !== nx; xi++, xoff += xstep, d.y = yreset, d.x += binsizeX) {
					for (var yi = 0, yoff = 0; yi !== ny; yi++, yoff += ystep, d.z = zreset, d.y += binsizeY) {
						for (var zi = 0, zoff = 0; zi !== nz; zi++, zoff += zstep, d.z += binsizeZ) {
							if (d.dot(planeNormal) < binRadius) {
								var idx = xoff + yoff + zoff;
								bins[idx][binLengths[idx]++] = bi;
							}
						}
					}
				}
	            break;

	        default:
				if (bi.aabbNeedsUpdate) {
					bi.computeAABB();
				}

				addBoxToBins(
					bi.aabb.lowerBound.x,
					bi.aabb.lowerBound.y,
					bi.aabb.lowerBound.z,
					bi.aabb.upperBound.x,
					bi.aabb.upperBound.y,
					bi.aabb.upperBound.z,
					bi);
	            break;
	        }
	    }

	    // Check each bin
	    for(var i=0; i!==Nbins; i++){
			var binLength = binLengths[i];
			//Skip bins with no potential collisions
			if (binLength > 1) {
				var bin = bins[i];

				// Do N^2 broadphase inside
				for(var xi=0; xi!==binLength; xi++){
					var bi = bin[xi];
					for(var yi=0; yi!==xi; yi++){
						var bj = bin[yi];
						if(this.needBroadphaseCollision(bi,bj)){
							this.intersectionTest(bi,bj,pairs1,pairs2);
						}
					}
				}
			}
	    }

	//	for (var zi = 0, zoff=0; zi < nz; zi++, zoff+= zstep) {
	//		console.log("layer "+zi);
	//		for (var yi = 0, yoff=0; yi < ny; yi++, yoff += ystep) {
	//			var row = '';
	//			for (var xi = 0, xoff=0; xi < nx; xi++, xoff += xstep) {
	//				var idx = xoff + yoff + zoff;
	//				row += ' ' + binLengths[idx];
	//			}
	//			console.log(row);
	//		}
	//	}

	    this.makePairsUnique(pairs1,pairs2);
	};

	},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(_dereq_,module,exports){
	module.exports = NaiveBroadphase;

	var Broadphase = _dereq_('./Broadphase');
	var AABB = _dereq_('./AABB');

	/**
	 * Naive broadphase implementation, used in lack of better ones.
	 * @class NaiveBroadphase
	 * @constructor
	 * @description The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
	 * @extends Broadphase
	 */
	function NaiveBroadphase(){
	    Broadphase.apply(this);
	}
	NaiveBroadphase.prototype = new Broadphase();
	NaiveBroadphase.prototype.constructor = NaiveBroadphase;

	/**
	 * Get all the collision pairs in the physics world
	 * @method collisionPairs
	 * @param {World} world
	 * @param {Array} pairs1
	 * @param {Array} pairs2
	 */
	NaiveBroadphase.prototype.collisionPairs = function(world,pairs1,pairs2){
	    var bodies = world.bodies,
	        n = bodies.length,
	        i,j,bi,bj;

	    // Naive N^2 ftw!
	    for(i=0; i!==n; i++){
	        for(j=0; j!==i; j++){

	            bi = bodies[i];
	            bj = bodies[j];

	            if(!this.needBroadphaseCollision(bi,bj)){
	                continue;
	            }

	            this.intersectionTest(bi,bj,pairs1,pairs2);
	        }
	    }
	};

	var tmpAABB = new AABB();

	/**
	 * Returns all the bodies within an AABB.
	 * @method aabbQuery
	 * @param  {World} world
	 * @param  {AABB} aabb
	 * @param {array} result An array to store resulting bodies in.
	 * @return {array}
	 */
	NaiveBroadphase.prototype.aabbQuery = function(world, aabb, result){
	    result = result || [];

	    for(var i = 0; i < world.bodies.length; i++){
	        var b = world.bodies[i];

	        if(b.aabbNeedsUpdate){
	            b.computeAABB();
	        }

	        // Ugly hack until Body gets aabb
	        if(b.aabb.overlaps(aabb)){
	            result.push(b);
	        }
	    }

	    return result;
	};
	},{"./AABB":3,"./Broadphase":5}],8:[function(_dereq_,module,exports){
	module.exports = ObjectCollisionMatrix;

	/**
	 * Records what objects are colliding with each other
	 * @class ObjectCollisionMatrix
	 * @constructor
	 */
	function ObjectCollisionMatrix() {

	    /**
	     * The matrix storage
	     * @property matrix
	     * @type {Object}
	     */
		this.matrix = {};
	}

	/**
	 * @method get
	 * @param  {Number} i
	 * @param  {Number} j
	 * @return {Number}
	 */
	ObjectCollisionMatrix.prototype.get = function(i, j) {
		i = i.id;
		j = j.id;
	    if (j > i) {
	        var temp = j;
	        j = i;
	        i = temp;
	    }
		return i+'-'+j in this.matrix;
	};

	/**
	 * @method set
	 * @param  {Number} i
	 * @param  {Number} j
	 * @param {Number} value
	 */
	ObjectCollisionMatrix.prototype.set = function(i, j, value) {
		i = i.id;
		j = j.id;
	    if (j > i) {
	        var temp = j;
	        j = i;
	        i = temp;
		}
		if (value) {
			this.matrix[i+'-'+j] = true;
		}
		else {
			delete this.matrix[i+'-'+j];
		}
	};

	/**
	 * Empty the matrix
	 * @method reset
	 */
	ObjectCollisionMatrix.prototype.reset = function() {
		this.matrix = {};
	};

	/**
	 * Set max number of objects
	 * @method setNumObjects
	 * @param {Number} n
	 */
	ObjectCollisionMatrix.prototype.setNumObjects = function(n) {
	};

	},{}],9:[function(_dereq_,module,exports){
	module.exports = Ray;

	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Transform = _dereq_('../math/Transform');
	var ConvexPolyhedron = _dereq_('../shapes/ConvexPolyhedron');
	var Box = _dereq_('../shapes/Box');
	var RaycastResult = _dereq_('../collision/RaycastResult');
	var Shape = _dereq_('../shapes/Shape');
	var AABB = _dereq_('../collision/AABB');

	/**
	 * A line in 3D space that intersects bodies and return points.
	 * @class Ray
	 * @constructor
	 * @param {Vec3} from
	 * @param {Vec3} to
	 */
	function Ray(from, to){
	    /**
	     * @property {Vec3} from
	     */
	    this.from = from ? from.clone() : new Vec3();

	    /**
	     * @property {Vec3} to
	     */
	    this.to = to ? to.clone() : new Vec3();

	    /**
	     * @private
	     * @property {Vec3} _direction
	     */
	    this._direction = new Vec3();

	    /**
	     * The precision of the ray. Used when checking parallelity etc.
	     * @property {Number} precision
	     */
	    this.precision = 0.0001;

	    /**
	     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
	     * @property {Boolean} checkCollisionResponse
	     */
	    this.checkCollisionResponse = true;

	    /**
	     * If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
	     * @property {Boolean} skipBackfaces
	     */
	    this.skipBackfaces = false;

	    /**
	     * @property {number} collisionFilterMask
	     * @default -1
	     */
	    this.collisionFilterMask = -1;

	    /**
	     * @property {number} collisionFilterGroup
	     * @default -1
	     */
	    this.collisionFilterGroup = -1;

	    /**
	     * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
	     * @property {number} mode
	     */
	    this.mode = Ray.ANY;

	    /**
	     * Current result object.
	     * @property {RaycastResult} result
	     */
	    this.result = new RaycastResult();

	    /**
	     * Will be set to true during intersectWorld() if the ray hit anything.
	     * @property {Boolean} hasHit
	     */
	    this.hasHit = false;

	    /**
	     * Current, user-provided result callback. Will be used if mode is Ray.ALL.
	     * @property {Function} callback
	     */
	    this.callback = function(result){};
	}
	Ray.prototype.constructor = Ray;

	Ray.CLOSEST = 1;
	Ray.ANY = 2;
	Ray.ALL = 4;

	var tmpAABB = new AABB();
	var tmpArray = [];

	/**
	 * Do itersection against all bodies in the given World.
	 * @method intersectWorld
	 * @param  {World} world
	 * @param  {object} options
	 * @return {Boolean} True if the ray hit anything, otherwise false.
	 */
	Ray.prototype.intersectWorld = function (world, options) {
	    this.mode = options.mode || Ray.ANY;
	    this.result = options.result || new RaycastResult();
	    this.skipBackfaces = !!options.skipBackfaces;
	    this.collisionFilterMask = typeof(options.collisionFilterMask) !== 'undefined' ? options.collisionFilterMask : -1;
	    this.collisionFilterGroup = typeof(options.collisionFilterGroup) !== 'undefined' ? options.collisionFilterGroup : -1;
	    if(options.from){
	        this.from.copy(options.from);
	    }
	    if(options.to){
	        this.to.copy(options.to);
	    }
	    this.callback = options.callback || function(){};
	    this.hasHit = false;

	    this.result.reset();
	    this._updateDirection();

	    this.getAABB(tmpAABB);
	    tmpArray.length = 0;
	    world.broadphase.aabbQuery(world, tmpAABB, tmpArray);
	    this.intersectBodies(tmpArray);

	    return this.hasHit;
	};

	var v1 = new Vec3(),
	    v2 = new Vec3();

	/*
	 * As per "Barycentric Technique" as named here http://www.blackpawn.com/texts/pointinpoly/default.html But without the division
	 */
	Ray.pointInTriangle = pointInTriangle;
	function pointInTriangle(p, a, b, c) {
	    c.vsub(a,v0);
	    b.vsub(a,v1);
	    p.vsub(a,v2);

	    var dot00 = v0.dot( v0 );
	    var dot01 = v0.dot( v1 );
	    var dot02 = v0.dot( v2 );
	    var dot11 = v1.dot( v1 );
	    var dot12 = v1.dot( v2 );

	    var u,v;

	    return  ( (u = dot11 * dot02 - dot01 * dot12) >= 0 ) &&
	            ( (v = dot00 * dot12 - dot01 * dot02) >= 0 ) &&
	            ( u + v < ( dot00 * dot11 - dot01 * dot01 ) );
	}

	/**
	 * Shoot a ray at a body, get back information about the hit.
	 * @method intersectBody
	 * @private
	 * @param {Body} body
	 * @param {RaycastResult} [result] Deprecated - set the result property of the Ray instead.
	 */
	var intersectBody_xi = new Vec3();
	var intersectBody_qi = new Quaternion();
	Ray.prototype.intersectBody = function (body, result) {
	    if(result){
	        this.result = result;
	        this._updateDirection();
	    }
	    var checkCollisionResponse = this.checkCollisionResponse;

	    if(checkCollisionResponse && !body.collisionResponse){
	        return;
	    }

	    if((this.collisionFilterGroup & body.collisionFilterMask)===0 || (body.collisionFilterGroup & this.collisionFilterMask)===0){
	        return;
	    }

	    var xi = intersectBody_xi;
	    var qi = intersectBody_qi;

	    for (var i = 0, N = body.shapes.length; i < N; i++) {
	        var shape = body.shapes[i];

	        if(checkCollisionResponse && !shape.collisionResponse){
	            continue; // Skip
	        }

	        body.quaternion.mult(body.shapeOrientations[i], qi);
	        body.quaternion.vmult(body.shapeOffsets[i], xi);
	        xi.vadd(body.position, xi);

	        this.intersectShape(
	            shape,
	            qi,
	            xi,
	            body
	        );

	        if(this.result._shouldStop){
	            break;
	        }
	    }
	};

	/**
	 * @method intersectBodies
	 * @param {Array} bodies An array of Body objects.
	 * @param {RaycastResult} [result] Deprecated
	 */
	Ray.prototype.intersectBodies = function (bodies, result) {
	    if(result){
	        this.result = result;
	        this._updateDirection();
	    }

	    for ( var i = 0, l = bodies.length; !this.result._shouldStop && i < l; i ++ ) {
	        this.intersectBody(bodies[i]);
	    }
	};

	/**
	 * Updates the _direction vector.
	 * @private
	 * @method _updateDirection
	 */
	Ray.prototype._updateDirection = function(){
	    this.to.vsub(this.from, this._direction);
	    this._direction.normalize();
	};

	/**
	 * @method intersectShape
	 * @private
	 * @param {Shape} shape
	 * @param {Quaternion} quat
	 * @param {Vec3} position
	 * @param {Body} body
	 */
	Ray.prototype.intersectShape = function(shape, quat, position, body){
	    var from = this.from;


	    // Checking boundingSphere
	    var distance = distanceFromIntersection(from, this._direction, position);
	    if ( distance > shape.boundingSphereRadius ) {
	        return;
	    }

	    var intersectMethod = this[shape.type];
	    if(intersectMethod){
	        intersectMethod.call(this, shape, quat, position, body);
	    }
	};

	var vector = new Vec3();
	var normal = new Vec3();
	var intersectPoint = new Vec3();

	var a = new Vec3();
	var b = new Vec3();
	var c = new Vec3();
	var d = new Vec3();

	var tmpRaycastResult = new RaycastResult();

	/**
	 * @method intersectBox
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 */
	Ray.prototype.intersectBox = function(shape, quat, position, body){
	    return this.intersectConvex(shape.convexPolyhedronRepresentation, quat, position, body);
	};
	Ray.prototype[Shape.types.BOX] = Ray.prototype.intersectBox;

	/**
	 * @method intersectPlane
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 */
	Ray.prototype.intersectPlane = function(shape, quat, position, body){
	    var from = this.from;
	    var to = this.to;
	    var direction = this._direction;

	    // Get plane normal
	    var worldNormal = new Vec3(0, 0, 1);
	    quat.vmult(worldNormal, worldNormal);

	    var len = new Vec3();
	    from.vsub(position, len);
	    var planeToFrom = len.dot(worldNormal);
	    to.vsub(position, len);
	    var planeToTo = len.dot(worldNormal);

	    if(planeToFrom * planeToTo > 0){
	        // "from" and "to" are on the same side of the plane... bail out
	        return;
	    }

	    if(from.distanceTo(to) < planeToFrom){
	        return;
	    }

	    var n_dot_dir = worldNormal.dot(direction);

	    if (Math.abs(n_dot_dir) < this.precision) {
	        // No intersection
	        return;
	    }

	    var planePointToFrom = new Vec3();
	    var dir_scaled_with_t = new Vec3();
	    var hitPointWorld = new Vec3();

	    from.vsub(position, planePointToFrom);
	    var t = -worldNormal.dot(planePointToFrom) / n_dot_dir;
	    direction.scale(t, dir_scaled_with_t);
	    from.vadd(dir_scaled_with_t, hitPointWorld);

	    this.reportIntersection(worldNormal, hitPointWorld, shape, body, -1);
	};
	Ray.prototype[Shape.types.PLANE] = Ray.prototype.intersectPlane;

	/**
	 * Get the world AABB of the ray.
	 * @method getAABB
	 * @param  {AABB} aabb
	 */
	Ray.prototype.getAABB = function(result){
	    var to = this.to;
	    var from = this.from;
	    result.lowerBound.x = Math.min(to.x, from.x);
	    result.lowerBound.y = Math.min(to.y, from.y);
	    result.lowerBound.z = Math.min(to.z, from.z);
	    result.upperBound.x = Math.max(to.x, from.x);
	    result.upperBound.y = Math.max(to.y, from.y);
	    result.upperBound.z = Math.max(to.z, from.z);
	};

	var intersectConvexOptions = {
	    faceList: [0]
	};

	/**
	 * @method intersectHeightfield
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 */
	Ray.prototype.intersectHeightfield = function(shape, quat, position, body){
	    var data = shape.data,
	        w = shape.elementSize,
	        worldPillarOffset = new Vec3();

	    // Convert the ray to local heightfield coordinates
	    var localRay = new Ray(this.from, this.to);
	    Transform.pointToLocalFrame(position, quat, localRay.from, localRay.from);
	    Transform.pointToLocalFrame(position, quat, localRay.to, localRay.to);

	    // Get the index of the data points to test against
	    var index = [];
	    var iMinX = null;
	    var iMinY = null;
	    var iMaxX = null;
	    var iMaxY = null;

	    var inside = shape.getIndexOfPosition(localRay.from.x, localRay.from.y, index, false);
	    if(inside){
	        iMinX = index[0];
	        iMinY = index[1];
	        iMaxX = index[0];
	        iMaxY = index[1];
	    }
	    inside = shape.getIndexOfPosition(localRay.to.x, localRay.to.y, index, false);
	    if(inside){
	        if (iMinX === null || index[0] < iMinX) { iMinX = index[0]; }
	        if (iMaxX === null || index[0] > iMaxX) { iMaxX = index[0]; }
	        if (iMinY === null || index[1] < iMinY) { iMinY = index[1]; }
	        if (iMaxY === null || index[1] > iMaxY) { iMaxY = index[1]; }
	    }

	    if(iMinX === null){
	        return;
	    }

	    var minMax = [];
	    shape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
	    var min = minMax[0];
	    var max = minMax[1];

	    // // Bail out if the ray can't touch the bounding box
	    // // TODO
	    // var aabb = new AABB();
	    // this.getAABB(aabb);
	    // if(aabb.intersects()){
	    //     return;
	    // }

	    for(var i = iMinX; i <= iMaxX; i++){
	        for(var j = iMinY; j <= iMaxY; j++){

	            if(this.result._shouldStop){
	                return;
	            }

	            // Lower triangle
	            shape.getConvexTrianglePillar(i, j, false);
	            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
	            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, intersectConvexOptions);

	            if(this.result._shouldStop){
	                return;
	            }

	            // Upper triangle
	            shape.getConvexTrianglePillar(i, j, true);
	            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
	            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, intersectConvexOptions);
	        }
	    }
	};
	Ray.prototype[Shape.types.HEIGHTFIELD] = Ray.prototype.intersectHeightfield;

	var Ray_intersectSphere_intersectionPoint = new Vec3();
	var Ray_intersectSphere_normal = new Vec3();

	/**
	 * @method intersectSphere
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 */
	Ray.prototype.intersectSphere = function(shape, quat, position, body){
	    var from = this.from,
	        to = this.to,
	        r = shape.radius;

	    var a = Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2);
	    var b = 2 * ((to.x - from.x) * (from.x - position.x) + (to.y - from.y) * (from.y - position.y) + (to.z - from.z) * (from.z - position.z));
	    var c = Math.pow(from.x - position.x, 2) + Math.pow(from.y - position.y, 2) + Math.pow(from.z - position.z, 2) - Math.pow(r, 2);

	    var delta = Math.pow(b, 2) - 4 * a * c;

	    var intersectionPoint = Ray_intersectSphere_intersectionPoint;
	    var normal = Ray_intersectSphere_normal;

	    if(delta < 0){
	        // No intersection
	        return;

	    } else if(delta === 0){
	        // single intersection point
	        from.lerp(to, delta, intersectionPoint);

	        intersectionPoint.vsub(position, normal);
	        normal.normalize();

	        this.reportIntersection(normal, intersectionPoint, shape, body, -1);

	    } else {
	        var d1 = (- b - Math.sqrt(delta)) / (2 * a);
	        var d2 = (- b + Math.sqrt(delta)) / (2 * a);

	        if(d1 >= 0 && d1 <= 1){
	            from.lerp(to, d1, intersectionPoint);
	            intersectionPoint.vsub(position, normal);
	            normal.normalize();
	            this.reportIntersection(normal, intersectionPoint, shape, body, -1);
	        }

	        if(this.result._shouldStop){
	            return;
	        }

	        if(d2 >= 0 && d2 <= 1){
	            from.lerp(to, d2, intersectionPoint);
	            intersectionPoint.vsub(position, normal);
	            normal.normalize();
	            this.reportIntersection(normal, intersectionPoint, shape, body, -1);
	        }
	    }
	};
	Ray.prototype[Shape.types.SPHERE] = Ray.prototype.intersectSphere;


	var intersectConvex_normal = new Vec3();
	var intersectConvex_minDistNormal = new Vec3();
	var intersectConvex_minDistIntersect = new Vec3();
	var intersectConvex_vector = new Vec3();

	/**
	 * @method intersectConvex
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 * @param {object} [options]
	 * @param {array} [options.faceList]
	 */
	Ray.prototype.intersectConvex = function intersectConvex(
	    shape,
	    quat,
	    position,
	    body,
	    options
	){
	    var minDistNormal = intersectConvex_minDistNormal;
	    var normal = intersectConvex_normal;
	    var vector = intersectConvex_vector;
	    var minDistIntersect = intersectConvex_minDistIntersect;
	    var faceList = (options && options.faceList) || null;

	    // Checking faces
	    var faces = shape.faces,
	        vertices = shape.vertices,
	        normals = shape.faceNormals;
	    var direction = this._direction;

	    var from = this.from;
	    var to = this.to;
	    var fromToDistance = from.distanceTo(to);

	    var minDist = -1;
	    var Nfaces = faceList ? faceList.length : faces.length;
	    var result = this.result;

	    for (var j = 0; !result._shouldStop && j < Nfaces; j++) {
	        var fi = faceList ? faceList[j] : j;

	        var face = faces[fi];
	        var faceNormal = normals[fi];
	        var q = quat;
	        var x = position;

	        // determine if ray intersects the plane of the face
	        // note: this works regardless of the direction of the face normal

	        // Get plane point in world coordinates...
	        vector.copy(vertices[face[0]]);
	        q.vmult(vector,vector);
	        vector.vadd(x,vector);

	        // ...but make it relative to the ray from. We'll fix this later.
	        vector.vsub(from,vector);

	        // Get plane normal
	        q.vmult(faceNormal,normal);

	        // If this dot product is negative, we have something interesting
	        var dot = direction.dot(normal);

	        // Bail out if ray and plane are parallel
	        if ( Math.abs( dot ) < this.precision ){
	            continue;
	        }

	        // calc distance to plane
	        var scalar = normal.dot(vector) / dot;

	        // if negative distance, then plane is behind ray
	        if (scalar < 0){
	            continue;
	        }

	        // if (dot < 0) {

	        // Intersection point is from + direction * scalar
	        direction.mult(scalar,intersectPoint);
	        intersectPoint.vadd(from,intersectPoint);

	        // a is the point we compare points b and c with.
	        a.copy(vertices[face[0]]);
	        q.vmult(a,a);
	        x.vadd(a,a);

	        for(var i = 1; !result._shouldStop && i < face.length - 1; i++){
	            // Transform 3 vertices to world coords
	            b.copy(vertices[face[i]]);
	            c.copy(vertices[face[i+1]]);
	            q.vmult(b,b);
	            q.vmult(c,c);
	            x.vadd(b,b);
	            x.vadd(c,c);

	            var distance = intersectPoint.distanceTo(from);

	            if(!(pointInTriangle(intersectPoint, a, b, c) || pointInTriangle(intersectPoint, b, a, c)) || distance > fromToDistance){
	                continue;
	            }

	            this.reportIntersection(normal, intersectPoint, shape, body, fi);
	        }
	        // }
	    }
	};
	Ray.prototype[Shape.types.CONVEXPOLYHEDRON] = Ray.prototype.intersectConvex;

	var intersectTrimesh_normal = new Vec3();
	var intersectTrimesh_localDirection = new Vec3();
	var intersectTrimesh_localFrom = new Vec3();
	var intersectTrimesh_localTo = new Vec3();
	var intersectTrimesh_worldNormal = new Vec3();
	var intersectTrimesh_worldIntersectPoint = new Vec3();
	var intersectTrimesh_localAABB = new AABB();
	var intersectTrimesh_triangles = [];
	var intersectTrimesh_treeTransform = new Transform();

	/**
	 * @method intersectTrimesh
	 * @private
	 * @param  {Shape} shape
	 * @param  {Quaternion} quat
	 * @param  {Vec3} position
	 * @param  {Body} body
	 * @param {object} [options]
	 * @todo Optimize by transforming the world to local space first.
	 * @todo Use Octree lookup
	 */
	Ray.prototype.intersectTrimesh = function intersectTrimesh(
	    mesh,
	    quat,
	    position,
	    body,
	    options
	){
	    var normal = intersectTrimesh_normal;
	    var triangles = intersectTrimesh_triangles;
	    var treeTransform = intersectTrimesh_treeTransform;
	    var minDistNormal = intersectConvex_minDistNormal;
	    var vector = intersectConvex_vector;
	    var minDistIntersect = intersectConvex_minDistIntersect;
	    var localAABB = intersectTrimesh_localAABB;
	    var localDirection = intersectTrimesh_localDirection;
	    var localFrom = intersectTrimesh_localFrom;
	    var localTo = intersectTrimesh_localTo;
	    var worldIntersectPoint = intersectTrimesh_worldIntersectPoint;
	    var worldNormal = intersectTrimesh_worldNormal;
	    var faceList = (options && options.faceList) || null;

	    // Checking faces
	    var indices = mesh.indices,
	        vertices = mesh.vertices,
	        normals = mesh.faceNormals;

	    var from = this.from;
	    var to = this.to;
	    var direction = this._direction;

	    var minDist = -1;
	    treeTransform.position.copy(position);
	    treeTransform.quaternion.copy(quat);

	    // Transform ray to local space!
	    Transform.vectorToLocalFrame(position, quat, direction, localDirection);
	    //body.vectorToLocalFrame(direction, localDirection);
	    Transform.pointToLocalFrame(position, quat, from, localFrom);
	    //body.pointToLocalFrame(from, localFrom);
	    Transform.pointToLocalFrame(position, quat, to, localTo);
	    //body.pointToLocalFrame(to, localTo);
	    var fromToDistanceSquared = localFrom.distanceSquared(localTo);

	    mesh.tree.rayQuery(this, treeTransform, triangles);

	    for (var i = 0, N = triangles.length; !this.result._shouldStop && i !== N; i++) {
	        var trianglesIndex = triangles[i];

	        mesh.getNormal(trianglesIndex, normal);

	        // determine if ray intersects the plane of the face
	        // note: this works regardless of the direction of the face normal

	        // Get plane point in world coordinates...
	        mesh.getVertex(indices[trianglesIndex * 3], a);

	        // ...but make it relative to the ray from. We'll fix this later.
	        a.vsub(localFrom,vector);

	        // Get plane normal
	        // quat.vmult(normal, normal);

	        // If this dot product is negative, we have something interesting
	        var dot = localDirection.dot(normal);

	        // Bail out if ray and plane are parallel
	        // if (Math.abs( dot ) < this.precision){
	        //     continue;
	        // }

	        // calc distance to plane
	        var scalar = normal.dot(vector) / dot;

	        // if negative distance, then plane is behind ray
	        if (scalar < 0){
	            continue;
	        }

	        // Intersection point is from + direction * scalar
	        localDirection.scale(scalar,intersectPoint);
	        intersectPoint.vadd(localFrom,intersectPoint);

	        // Get triangle vertices
	        mesh.getVertex(indices[trianglesIndex * 3 + 1], b);
	        mesh.getVertex(indices[trianglesIndex * 3 + 2], c);

	        var squaredDistance = intersectPoint.distanceSquared(localFrom);

	        if(!(pointInTriangle(intersectPoint, b, a, c) || pointInTriangle(intersectPoint, a, b, c)) || squaredDistance > fromToDistanceSquared){
	            continue;
	        }

	        // transform intersectpoint and normal to world
	        Transform.vectorToWorldFrame(quat, normal, worldNormal);
	        //body.vectorToWorldFrame(normal, worldNormal);
	        Transform.pointToWorldFrame(position, quat, intersectPoint, worldIntersectPoint);
	        //body.pointToWorldFrame(intersectPoint, worldIntersectPoint);
	        this.reportIntersection(worldNormal, worldIntersectPoint, mesh, body, trianglesIndex);
	    }
	    triangles.length = 0;
	};
	Ray.prototype[Shape.types.TRIMESH] = Ray.prototype.intersectTrimesh;


	/**
	 * @method reportIntersection
	 * @private
	 * @param  {Vec3} normal
	 * @param  {Vec3} hitPointWorld
	 * @param  {Shape} shape
	 * @param  {Body} body
	 * @return {boolean} True if the intersections should continue
	 */
	Ray.prototype.reportIntersection = function(normal, hitPointWorld, shape, body, hitFaceIndex){
	    var from = this.from;
	    var to = this.to;
	    var distance = from.distanceTo(hitPointWorld);
	    var result = this.result;

	    // Skip back faces?
	    if(this.skipBackfaces && normal.dot(this._direction) > 0){
	        return;
	    }

	    result.hitFaceIndex = typeof(hitFaceIndex) !== 'undefined' ? hitFaceIndex : -1;

	    switch(this.mode){
	    case Ray.ALL:
	        this.hasHit = true;
	        result.set(
	            from,
	            to,
	            normal,
	            hitPointWorld,
	            shape,
	            body,
	            distance
	        );
	        result.hasHit = true;
	        this.callback(result);
	        break;

	    case Ray.CLOSEST:

	        // Store if closer than current closest
	        if(distance < result.distance || !result.hasHit){
	            this.hasHit = true;
	            result.hasHit = true;
	            result.set(
	                from,
	                to,
	                normal,
	                hitPointWorld,
	                shape,
	                body,
	                distance
	            );
	        }
	        break;

	    case Ray.ANY:

	        // Report and stop.
	        this.hasHit = true;
	        result.hasHit = true;
	        result.set(
	            from,
	            to,
	            normal,
	            hitPointWorld,
	            shape,
	            body,
	            distance
	        );
	        result._shouldStop = true;
	        break;
	    }
	};

	var v0 = new Vec3(),
	    intersect = new Vec3();
	function distanceFromIntersection(from, direction, position) {

	    // v0 is vector from from to position
	    position.vsub(from,v0);
	    var dot = v0.dot(direction);

	    // intersect = direction*dot + from
	    direction.mult(dot,intersect);
	    intersect.vadd(from,intersect);

	    var distance = position.distanceTo(intersect);

	    return distance;
	}


	},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(_dereq_,module,exports){
	var Vec3 = _dereq_('../math/Vec3');

	module.exports = RaycastResult;

	/**
	 * Storage for Ray casting data.
	 * @class RaycastResult
	 * @constructor
	 */
	function RaycastResult(){

		/**
		 * @property {Vec3} rayFromWorld
		 */
		this.rayFromWorld = new Vec3();

		/**
		 * @property {Vec3} rayToWorld
		 */
		this.rayToWorld = new Vec3();

		/**
		 * @property {Vec3} hitNormalWorld
		 */
		this.hitNormalWorld = new Vec3();

		/**
		 * @property {Vec3} hitPointWorld
		 */
		this.hitPointWorld = new Vec3();

		/**
		 * @property {boolean} hasHit
		 */
		this.hasHit = false;

		/**
		 * The hit shape, or null.
		 * @property {Shape} shape
		 */
		this.shape = null;

		/**
		 * The hit body, or null.
		 * @property {Body} body
		 */
		this.body = null;

		/**
		 * The index of the hit triangle, if the hit shape was a trimesh.
		 * @property {number} hitFaceIndex
		 * @default -1
		 */
		this.hitFaceIndex = -1;

		/**
		 * Distance to the hit. Will be set to -1 if there was no hit.
		 * @property {number} distance
		 * @default -1
		 */
		this.distance = -1;

		/**
		 * If the ray should stop traversing the bodies.
		 * @private
		 * @property {Boolean} _shouldStop
		 * @default false
		 */
		this._shouldStop = false;
	}

	/**
	 * Reset all result data.
	 * @method reset
	 */
	RaycastResult.prototype.reset = function () {
		this.rayFromWorld.setZero();
		this.rayToWorld.setZero();
		this.hitNormalWorld.setZero();
		this.hitPointWorld.setZero();
		this.hasHit = false;
		this.shape = null;
		this.body = null;
		this.hitFaceIndex = -1;
		this.distance = -1;
		this._shouldStop = false;
	};

	/**
	 * @method abort
	 */
	RaycastResult.prototype.abort = function(){
		this._shouldStop = true;
	};

	/**
	 * @method set
	 * @param {Vec3} rayFromWorld
	 * @param {Vec3} rayToWorld
	 * @param {Vec3} hitNormalWorld
	 * @param {Vec3} hitPointWorld
	 * @param {Shape} shape
	 * @param {Body} body
	 * @param {number} distance
	 */
	RaycastResult.prototype.set = function(
		rayFromWorld,
		rayToWorld,
		hitNormalWorld,
		hitPointWorld,
		shape,
		body,
		distance
	){
		this.rayFromWorld.copy(rayFromWorld);
		this.rayToWorld.copy(rayToWorld);
		this.hitNormalWorld.copy(hitNormalWorld);
		this.hitPointWorld.copy(hitPointWorld);
		this.shape = shape;
		this.body = body;
		this.distance = distance;
	};
	},{"../math/Vec3":30}],11:[function(_dereq_,module,exports){
	var Shape = _dereq_('../shapes/Shape');
	var Broadphase = _dereq_('../collision/Broadphase');

	module.exports = SAPBroadphase;

	/**
	 * Sweep and prune broadphase along one axis.
	 *
	 * @class SAPBroadphase
	 * @constructor
	 * @param {World} [world]
	 * @extends Broadphase
	 */
	function SAPBroadphase(world){
	    Broadphase.apply(this);

	    /**
	     * List of bodies currently in the broadphase.
	     * @property axisList
	     * @type {Array}
	     */
	    this.axisList = [];

	    /**
	     * The world to search in.
	     * @property world
	     * @type {World}
	     */
	    this.world = null;

	    /**
	     * Axis to sort the bodies along. Set to 0 for x axis, and 1 for y axis. For best performance, choose an axis that the bodies are spread out more on.
	     * @property axisIndex
	     * @type {Number}
	     */
	    this.axisIndex = 0;

	    var axisList = this.axisList;

	    this._addBodyHandler = function(e){
	        axisList.push(e.body);
	    };

	    this._removeBodyHandler = function(e){
	        var idx = axisList.indexOf(e.body);
	        if(idx !== -1){
	            axisList.splice(idx,1);
	        }
	    };

	    if(world){
	        this.setWorld(world);
	    }
	}
	SAPBroadphase.prototype = new Broadphase();

	/**
	 * Change the world
	 * @method setWorld
	 * @param  {World} world
	 */
	SAPBroadphase.prototype.setWorld = function(world){
	    // Clear the old axis array
	    this.axisList.length = 0;

	    // Add all bodies from the new world
	    for(var i=0; i<world.bodies.length; i++){
	        this.axisList.push(world.bodies[i]);
	    }

	    // Remove old handlers, if any
	    world.removeEventListener("addBody", this._addBodyHandler);
	    world.removeEventListener("removeBody", this._removeBodyHandler);

	    // Add handlers to update the list of bodies.
	    world.addEventListener("addBody", this._addBodyHandler);
	    world.addEventListener("removeBody", this._removeBodyHandler);

	    this.world = world;
	    this.dirty = true;
	};

	/**
	 * @static
	 * @method insertionSortX
	 * @param  {Array} a
	 * @return {Array}
	 */
	SAPBroadphase.insertionSortX = function(a) {
	    for(var i=1,l=a.length;i<l;i++) {
	        var v = a[i];
	        for(var j=i - 1;j>=0;j--) {
	            if(a[j].aabb.lowerBound.x <= v.aabb.lowerBound.x){
	                break;
	            }
	            a[j+1] = a[j];
	        }
	        a[j+1] = v;
	    }
	    return a;
	};

	/**
	 * @static
	 * @method insertionSortY
	 * @param  {Array} a
	 * @return {Array}
	 */
	SAPBroadphase.insertionSortY = function(a) {
	    for(var i=1,l=a.length;i<l;i++) {
	        var v = a[i];
	        for(var j=i - 1;j>=0;j--) {
	            if(a[j].aabb.lowerBound.y <= v.aabb.lowerBound.y){
	                break;
	            }
	            a[j+1] = a[j];
	        }
	        a[j+1] = v;
	    }
	    return a;
	};

	/**
	 * @static
	 * @method insertionSortZ
	 * @param  {Array} a
	 * @return {Array}
	 */
	SAPBroadphase.insertionSortZ = function(a) {
	    for(var i=1,l=a.length;i<l;i++) {
	        var v = a[i];
	        for(var j=i - 1;j>=0;j--) {
	            if(a[j].aabb.lowerBound.z <= v.aabb.lowerBound.z){
	                break;
	            }
	            a[j+1] = a[j];
	        }
	        a[j+1] = v;
	    }
	    return a;
	};

	/**
	 * Collect all collision pairs
	 * @method collisionPairs
	 * @param  {World} world
	 * @param  {Array} p1
	 * @param  {Array} p2
	 */
	SAPBroadphase.prototype.collisionPairs = function(world,p1,p2){
	    var bodies = this.axisList,
	        N = bodies.length,
	        axisIndex = this.axisIndex,
	        i, j;

	    if(this.dirty){
	        this.sortList();
	        this.dirty = false;
	    }

	    // Look through the list
	    for(i=0; i !== N; i++){
	        var bi = bodies[i];

	        for(j=i+1; j < N; j++){
	            var bj = bodies[j];

	            if(!this.needBroadphaseCollision(bi,bj)){
	                continue;
	            }

	            if(!SAPBroadphase.checkBounds(bi,bj,axisIndex)){
	                break;
	            }

	            this.intersectionTest(bi,bj,p1,p2);
	        }
	    }
	};

	SAPBroadphase.prototype.sortList = function(){
	    var axisList = this.axisList;
	    var axisIndex = this.axisIndex;
	    var N = axisList.length;

	    // Update AABBs
	    for(var i = 0; i!==N; i++){
	        var bi = axisList[i];
	        if(bi.aabbNeedsUpdate){
	            bi.computeAABB();
	        }
	    }

	    // Sort the list
	    if(axisIndex === 0){
	        SAPBroadphase.insertionSortX(axisList);
	    } else if(axisIndex === 1){
	        SAPBroadphase.insertionSortY(axisList);
	    } else if(axisIndex === 2){
	        SAPBroadphase.insertionSortZ(axisList);
	    }
	};

	/**
	 * Check if the bounds of two bodies overlap, along the given SAP axis.
	 * @static
	 * @method checkBounds
	 * @param  {Body} bi
	 * @param  {Body} bj
	 * @param  {Number} axisIndex
	 * @return {Boolean}
	 */
	SAPBroadphase.checkBounds = function(bi, bj, axisIndex){
	    var biPos;
	    var bjPos;

	    if(axisIndex === 0){
	        biPos = bi.position.x;
	        bjPos = bj.position.x;
	    } else if(axisIndex === 1){
	        biPos = bi.position.y;
	        bjPos = bj.position.y;
	    } else if(axisIndex === 2){
	        biPos = bi.position.z;
	        bjPos = bj.position.z;
	    }

	    var ri = bi.boundingRadius,
	        rj = bj.boundingRadius,
	        boundA1 = biPos - ri,
	        boundA2 = biPos + ri,
	        boundB1 = bjPos - rj,
	        boundB2 = bjPos + rj;

	    return boundB1 < boundA2;
	};

	/**
	 * Computes the variance of the body positions and estimates the best
	 * axis to use. Will automatically set property .axisIndex.
	 * @method autoDetectAxis
	 */
	SAPBroadphase.prototype.autoDetectAxis = function(){
	    var sumX=0,
	        sumX2=0,
	        sumY=0,
	        sumY2=0,
	        sumZ=0,
	        sumZ2=0,
	        bodies = this.axisList,
	        N = bodies.length,
	        invN=1/N;

	    for(var i=0; i!==N; i++){
	        var b = bodies[i];

	        var centerX = b.position.x;
	        sumX += centerX;
	        sumX2 += centerX*centerX;

	        var centerY = b.position.y;
	        sumY += centerY;
	        sumY2 += centerY*centerY;

	        var centerZ = b.position.z;
	        sumZ += centerZ;
	        sumZ2 += centerZ*centerZ;
	    }

	    var varianceX = sumX2 - sumX*sumX*invN,
	        varianceY = sumY2 - sumY*sumY*invN,
	        varianceZ = sumZ2 - sumZ*sumZ*invN;

	    if(varianceX > varianceY){
	        if(varianceX > varianceZ){
	            this.axisIndex = 0;
	        } else{
	            this.axisIndex = 2;
	        }
	    } else if(varianceY > varianceZ){
	        this.axisIndex = 1;
	    } else{
	        this.axisIndex = 2;
	    }
	};

	/**
	 * Returns all the bodies within an AABB.
	 * @method aabbQuery
	 * @param  {World} world
	 * @param  {AABB} aabb
	 * @param {array} result An array to store resulting bodies in.
	 * @return {array}
	 */
	SAPBroadphase.prototype.aabbQuery = function(world, aabb, result){
	    result = result || [];

	    if(this.dirty){
	        this.sortList();
	        this.dirty = false;
	    }

	    var axisIndex = this.axisIndex, axis = 'x';
	    if(axisIndex === 1){ axis = 'y'; }
	    if(axisIndex === 2){ axis = 'z'; }

	    var axisList = this.axisList;
	    var lower = aabb.lowerBound[axis];
	    var upper = aabb.upperBound[axis];
	    for(var i = 0; i < axisList.length; i++){
	        var b = axisList[i];

	        if(b.aabbNeedsUpdate){
	            b.computeAABB();
	        }

	        if(b.aabb.overlaps(aabb)){
	            result.push(b);
	        }
	    }

	    return result;
	};
	},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(_dereq_,module,exports){
	module.exports = ConeTwistConstraint;

	var Constraint = _dereq_('./Constraint');
	var PointToPointConstraint = _dereq_('./PointToPointConstraint');
	var ConeEquation = _dereq_('../equations/ConeEquation');
	var RotationalEquation = _dereq_('../equations/RotationalEquation');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * @class ConeTwistConstraint
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {object} [options]
	 * @param {Vec3} [options.pivotA]
	 * @param {Vec3} [options.pivotB]
	 * @param {Vec3} [options.axisA]
	 * @param {Vec3} [options.axisB]
	 * @param {Number} [options.maxForce=1e6]
	 * @extends PointToPointConstraint
	 */
	function ConeTwistConstraint(bodyA, bodyB, options){
	    options = options || {};
	    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

	    // Set pivot point in between
	    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
	    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();
	    this.axisA = options.axisA ? options.axisA.clone() : new Vec3();
	    this.axisB = options.axisB ? options.axisB.clone() : new Vec3();

	    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

	    this.collideConnected = !!options.collideConnected;

	    this.angle = typeof(options.angle) !== 'undefined' ? options.angle : 0;

	    /**
	     * @property {ConeEquation} coneEquation
	     */
	    var c = this.coneEquation = new ConeEquation(bodyA,bodyB,options);

	    /**
	     * @property {RotationalEquation} twistEquation
	     */
	    var t = this.twistEquation = new RotationalEquation(bodyA,bodyB,options);
	    this.twistAngle = typeof(options.twistAngle) !== 'undefined' ? options.twistAngle : 0;

	    // Make the cone equation push the bodies toward the cone axis, not outward
	    c.maxForce = 0;
	    c.minForce = -maxForce;

	    // Make the twist equation add torque toward the initial position
	    t.maxForce = 0;
	    t.minForce = -maxForce;

	    this.equations.push(c, t);
	}
	ConeTwistConstraint.prototype = new PointToPointConstraint();
	ConeTwistConstraint.constructor = ConeTwistConstraint;

	var ConeTwistConstraint_update_tmpVec1 = new Vec3();
	var ConeTwistConstraint_update_tmpVec2 = new Vec3();

	ConeTwistConstraint.prototype.update = function(){
	    var bodyA = this.bodyA,
	        bodyB = this.bodyB,
	        cone = this.coneEquation,
	        twist = this.twistEquation;

	    PointToPointConstraint.prototype.update.call(this);

	    // Update the axes to the cone constraint
	    bodyA.vectorToWorldFrame(this.axisA, cone.axisA);
	    bodyB.vectorToWorldFrame(this.axisB, cone.axisB);

	    // Update the world axes in the twist constraint
	    this.axisA.tangents(twist.axisA, twist.axisA);
	    bodyA.vectorToWorldFrame(twist.axisA, twist.axisA);

	    this.axisB.tangents(twist.axisB, twist.axisB);
	    bodyB.vectorToWorldFrame(twist.axisB, twist.axisB);

	    cone.angle = this.angle;
	    twist.maxAngle = this.twistAngle;
	};


	},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(_dereq_,module,exports){
	module.exports = Constraint;

	var Utils = _dereq_('../utils/Utils');

	/**
	 * Constraint base class
	 * @class Constraint
	 * @author schteppe
	 * @constructor
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {object} [options]
	 * @param {boolean} [options.collideConnected=true]
	 * @param {boolean} [options.wakeUpBodies=true]
	 */
	function Constraint(bodyA, bodyB, options){
	    options = Utils.defaults(options,{
	        collideConnected : true,
	        wakeUpBodies : true,
	    });

	    /**
	     * Equations to be solved in this constraint
	     * @property equations
	     * @type {Array}
	     */
	    this.equations = [];

	    /**
	     * @property {Body} bodyA
	     */
	    this.bodyA = bodyA;

	    /**
	     * @property {Body} bodyB
	     */
	    this.bodyB = bodyB;

	    /**
	     * @property {Number} id
	     */
	    this.id = Constraint.idCounter++;

	    /**
	     * Set to true if you want the bodies to collide when they are connected.
	     * @property collideConnected
	     * @type {boolean}
	     */
	    this.collideConnected = options.collideConnected;

	    if(options.wakeUpBodies){
	        if(bodyA){
	            bodyA.wakeUp();
	        }
	        if(bodyB){
	            bodyB.wakeUp();
	        }
	    }
	}

	/**
	 * Update all the equations with data.
	 * @method update
	 */
	Constraint.prototype.update = function(){
	    throw new Error("method update() not implmemented in this Constraint subclass!");
	};

	/**
	 * Enables all equations in the constraint.
	 * @method enable
	 */
	Constraint.prototype.enable = function(){
	    var eqs = this.equations;
	    for(var i=0; i<eqs.length; i++){
	        eqs[i].enabled = true;
	    }
	};

	/**
	 * Disables all equations in the constraint.
	 * @method disable
	 */
	Constraint.prototype.disable = function(){
	    var eqs = this.equations;
	    for(var i=0; i<eqs.length; i++){
	        eqs[i].enabled = false;
	    }
	};

	Constraint.idCounter = 0;

	},{"../utils/Utils":53}],14:[function(_dereq_,module,exports){
	module.exports = DistanceConstraint;

	var Constraint = _dereq_('./Constraint');
	var ContactEquation = _dereq_('../equations/ContactEquation');

	/**
	 * Constrains two bodies to be at a constant distance from each others center of mass.
	 * @class DistanceConstraint
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Number} [distance] The distance to keep. If undefined, it will be set to the current distance between bodyA and bodyB
	 * @param {Number} [maxForce=1e6]
	 * @extends Constraint
	 */
	function DistanceConstraint(bodyA,bodyB,distance,maxForce){
	    Constraint.call(this,bodyA,bodyB);

	    if(typeof(distance)==="undefined") {
	        distance = bodyA.position.distanceTo(bodyB.position);
	    }

	    if(typeof(maxForce)==="undefined") {
	        maxForce = 1e6;
	    }

	    /**
	     * @property {number} distance
	     */
	    this.distance = distance;

	    /**
	     * @property {ContactEquation} distanceEquation
	     */
	    var eq = this.distanceEquation = new ContactEquation(bodyA, bodyB);
	    this.equations.push(eq);

	    // Make it bidirectional
	    eq.minForce = -maxForce;
	    eq.maxForce =  maxForce;
	}
	DistanceConstraint.prototype = new Constraint();

	DistanceConstraint.prototype.update = function(){
	    var bodyA = this.bodyA;
	    var bodyB = this.bodyB;
	    var eq = this.distanceEquation;
	    var halfDist = this.distance * 0.5;
	    var normal = eq.ni;

	    bodyB.position.vsub(bodyA.position, normal);
	    normal.normalize();
	    normal.mult(halfDist, eq.ri);
	    normal.mult(-halfDist, eq.rj);
	};
	},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(_dereq_,module,exports){
	module.exports = HingeConstraint;

	var Constraint = _dereq_('./Constraint');
	var PointToPointConstraint = _dereq_('./PointToPointConstraint');
	var RotationalEquation = _dereq_('../equations/RotationalEquation');
	var RotationalMotorEquation = _dereq_('../equations/RotationalMotorEquation');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * Hinge constraint. Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
	 * @class HingeConstraint
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {object} [options]
	 * @param {Vec3} [options.pivotA] A point defined locally in bodyA. This defines the offset of axisA.
	 * @param {Vec3} [options.axisA] An axis that bodyA can rotate around, defined locally in bodyA.
	 * @param {Vec3} [options.pivotB]
	 * @param {Vec3} [options.axisB]
	 * @param {Number} [options.maxForce=1e6]
	 * @extends PointToPointConstraint
	 */
	function HingeConstraint(bodyA, bodyB, options){
	    options = options || {};
	    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;
	    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
	    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();

	    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

	    /**
	     * Rotation axis, defined locally in bodyA.
	     * @property {Vec3} axisA
	     */
	    var axisA = this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1,0,0);
	    axisA.normalize();

	    /**
	     * Rotation axis, defined locally in bodyB.
	     * @property {Vec3} axisB
	     */
	    var axisB = this.axisB = options.axisB ? options.axisB.clone() : new Vec3(1,0,0);
	    axisB.normalize();

	    /**
	     * @property {RotationalEquation} rotationalEquation1
	     */
	    var r1 = this.rotationalEquation1 = new RotationalEquation(bodyA,bodyB,options);

	    /**
	     * @property {RotationalEquation} rotationalEquation2
	     */
	    var r2 = this.rotationalEquation2 = new RotationalEquation(bodyA,bodyB,options);

	    /**
	     * @property {RotationalMotorEquation} motorEquation
	     */
	    var motor = this.motorEquation = new RotationalMotorEquation(bodyA,bodyB,maxForce);
	    motor.enabled = false; // Not enabled by default

	    // Equations to be fed to the solver
	    this.equations.push(
	        r1, // rotational1
	        r2, // rotational2
	        motor
	    );
	}
	HingeConstraint.prototype = new PointToPointConstraint();
	HingeConstraint.constructor = HingeConstraint;

	/**
	 * @method enableMotor
	 */
	HingeConstraint.prototype.enableMotor = function(){
	    this.motorEquation.enabled = true;
	};

	/**
	 * @method disableMotor
	 */
	HingeConstraint.prototype.disableMotor = function(){
	    this.motorEquation.enabled = false;
	};

	/**
	 * @method setMotorSpeed
	 * @param {number} speed
	 */
	HingeConstraint.prototype.setMotorSpeed = function(speed){
	    this.motorEquation.targetVelocity = speed;
	};

	/**
	 * @method setMotorMaxForce
	 * @param {number} maxForce
	 */
	HingeConstraint.prototype.setMotorMaxForce = function(maxForce){
	    this.motorEquation.maxForce = maxForce;
	    this.motorEquation.minForce = -maxForce;
	};

	var HingeConstraint_update_tmpVec1 = new Vec3();
	var HingeConstraint_update_tmpVec2 = new Vec3();

	HingeConstraint.prototype.update = function(){
	    var bodyA = this.bodyA,
	        bodyB = this.bodyB,
	        motor = this.motorEquation,
	        r1 = this.rotationalEquation1,
	        r2 = this.rotationalEquation2,
	        worldAxisA = HingeConstraint_update_tmpVec1,
	        worldAxisB = HingeConstraint_update_tmpVec2;

	    var axisA = this.axisA;
	    var axisB = this.axisB;

	    PointToPointConstraint.prototype.update.call(this);

	    // Get world axes
	    bodyA.quaternion.vmult(axisA, worldAxisA);
	    bodyB.quaternion.vmult(axisB, worldAxisB);

	    worldAxisA.tangents(r1.axisA, r2.axisA);
	    r1.axisB.copy(worldAxisB);
	    r2.axisB.copy(worldAxisB);

	    if(this.motorEquation.enabled){
	        bodyA.quaternion.vmult(this.axisA, motor.axisA);
	        bodyB.quaternion.vmult(this.axisB, motor.axisB);
	    }
	};


	},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(_dereq_,module,exports){
	module.exports = LockConstraint;

	var Constraint = _dereq_('./Constraint');
	var PointToPointConstraint = _dereq_('./PointToPointConstraint');
	var RotationalEquation = _dereq_('../equations/RotationalEquation');
	var RotationalMotorEquation = _dereq_('../equations/RotationalMotorEquation');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * Lock constraint. Will remove all degrees of freedom between the bodies.
	 * @class LockConstraint
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {object} [options]
	 * @param {Number} [options.maxForce=1e6]
	 * @extends PointToPointConstraint
	 */
	function LockConstraint(bodyA, bodyB, options){
	    options = options || {};
	    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

	    // Set pivot point in between
	    var pivotA = new Vec3();
	    var pivotB = new Vec3();
	    var halfWay = new Vec3();
	    bodyA.position.vadd(bodyB.position, halfWay);
	    halfWay.scale(0.5, halfWay);
	    bodyB.pointToLocalFrame(halfWay, pivotB);
	    bodyA.pointToLocalFrame(halfWay, pivotA);
	    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

	    /**
	     * @property {RotationalEquation} rotationalEquation1
	     */
	    var r1 = this.rotationalEquation1 = new RotationalEquation(bodyA,bodyB,options);

	    /**
	     * @property {RotationalEquation} rotationalEquation2
	     */
	    var r2 = this.rotationalEquation2 = new RotationalEquation(bodyA,bodyB,options);

	    /**
	     * @property {RotationalEquation} rotationalEquation3
	     */
	    var r3 = this.rotationalEquation3 = new RotationalEquation(bodyA,bodyB,options);

	    this.equations.push(r1, r2, r3);
	}
	LockConstraint.prototype = new PointToPointConstraint();
	LockConstraint.constructor = LockConstraint;

	var LockConstraint_update_tmpVec1 = new Vec3();
	var LockConstraint_update_tmpVec2 = new Vec3();

	LockConstraint.prototype.update = function(){
	    var bodyA = this.bodyA,
	        bodyB = this.bodyB,
	        motor = this.motorEquation,
	        r1 = this.rotationalEquation1,
	        r2 = this.rotationalEquation2,
	        r3 = this.rotationalEquation3,
	        worldAxisA = LockConstraint_update_tmpVec1,
	        worldAxisB = LockConstraint_update_tmpVec2;

	    PointToPointConstraint.prototype.update.call(this);

	    bodyA.vectorToWorldFrame(Vec3.UNIT_X, r1.axisA);
	    bodyB.vectorToWorldFrame(Vec3.UNIT_Y, r1.axisB);

	    bodyA.vectorToWorldFrame(Vec3.UNIT_Y, r2.axisA);
	    bodyB.vectorToWorldFrame(Vec3.UNIT_Z, r2.axisB);

	    bodyA.vectorToWorldFrame(Vec3.UNIT_Z, r3.axisA);
	    bodyB.vectorToWorldFrame(Vec3.UNIT_X, r3.axisB);
	};


	},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(_dereq_,module,exports){
	module.exports = PointToPointConstraint;

	var Constraint = _dereq_('./Constraint');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * Connects two bodies at given offset points.
	 * @class PointToPointConstraint
	 * @extends Constraint
	 * @constructor
	 * @param {Body} bodyA
	 * @param {Vec3} pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
	 * @param {Body} bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
	 * @param {Vec3} pivotB See pivotA.
	 * @param {Number} maxForce The maximum force that should be applied to constrain the bodies.
	 *
	 * @example
	 *     var bodyA = new Body({ mass: 1 });
	 *     var bodyB = new Body({ mass: 1 });
	 *     bodyA.position.set(-1, 0, 0);
	 *     bodyB.position.set(1, 0, 0);
	 *     bodyA.addShape(shapeA);
	 *     bodyB.addShape(shapeB);
	 *     world.addBody(bodyA);
	 *     world.addBody(bodyB);
	 *     var localPivotA = new Vec3(1, 0, 0);
	 *     var localPivotB = new Vec3(-1, 0, 0);
	 *     var constraint = new PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB);
	 *     world.addConstraint(constraint);
	 */
	function PointToPointConstraint(bodyA,pivotA,bodyB,pivotB,maxForce){
	    Constraint.call(this,bodyA,bodyB);

	    maxForce = typeof(maxForce) !== 'undefined' ? maxForce : 1e6;

	    /**
	     * Pivot, defined locally in bodyA.
	     * @property {Vec3} pivotA
	     */
	    this.pivotA = pivotA ? pivotA.clone() : new Vec3();

	    /**
	     * Pivot, defined locally in bodyB.
	     * @property {Vec3} pivotB
	     */
	    this.pivotB = pivotB ? pivotB.clone() : new Vec3();

	    /**
	     * @property {ContactEquation} equationX
	     */
	    var x = this.equationX = new ContactEquation(bodyA,bodyB);

	    /**
	     * @property {ContactEquation} equationY
	     */
	    var y = this.equationY = new ContactEquation(bodyA,bodyB);

	    /**
	     * @property {ContactEquation} equationZ
	     */
	    var z = this.equationZ = new ContactEquation(bodyA,bodyB);

	    // Equations to be fed to the solver
	    this.equations.push(x, y, z);

	    // Make the equations bidirectional
	    x.minForce = y.minForce = z.minForce = -maxForce;
	    x.maxForce = y.maxForce = z.maxForce =  maxForce;

	    x.ni.set(1, 0, 0);
	    y.ni.set(0, 1, 0);
	    z.ni.set(0, 0, 1);
	}
	PointToPointConstraint.prototype = new Constraint();

	PointToPointConstraint.prototype.update = function(){
	    var bodyA = this.bodyA;
	    var bodyB = this.bodyB;
	    var x = this.equationX;
	    var y = this.equationY;
	    var z = this.equationZ;

	    // Rotate the pivots to world space
	    bodyA.quaternion.vmult(this.pivotA,x.ri);
	    bodyB.quaternion.vmult(this.pivotB,x.rj);

	    y.ri.copy(x.ri);
	    y.rj.copy(x.rj);
	    z.ri.copy(x.ri);
	    z.rj.copy(x.rj);
	};
	},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(_dereq_,module,exports){
	module.exports = ConeEquation;

	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');
	var Equation = _dereq_('./Equation');

	/**
	 * Cone equation. Works to keep the given body world vectors aligned, or tilted within a given angle from each other.
	 * @class ConeEquation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Vec3} [options.axisA] Local axis in A
	 * @param {Vec3} [options.axisB] Local axis in B
	 * @param {Vec3} [options.angle] The "cone angle" to keep
	 * @param {number} [options.maxForce=1e6]
	 * @extends Equation
	 */
	function ConeEquation(bodyA, bodyB, options){
	    options = options || {};
	    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

	    Equation.call(this,bodyA,bodyB,-maxForce, maxForce);

	    this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
	    this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);

	    /**
	     * The cone angle to keep
	     * @property {number} angle
	     */
	    this.angle = typeof(options.angle) !== 'undefined' ? options.angle : 0;
	}

	ConeEquation.prototype = new Equation();
	ConeEquation.prototype.constructor = ConeEquation;

	var tmpVec1 = new Vec3();
	var tmpVec2 = new Vec3();

	ConeEquation.prototype.computeB = function(h){
	    var a = this.a,
	        b = this.b,

	        ni = this.axisA,
	        nj = this.axisB,

	        nixnj = tmpVec1,
	        njxni = tmpVec2,

	        GA = this.jacobianElementA,
	        GB = this.jacobianElementB;

	    // Caluclate cross products
	    ni.cross(nj, nixnj);
	    nj.cross(ni, njxni);

	    // The angle between two vector is:
	    // cos(theta) = a * b / (length(a) * length(b) = { len(a) = len(b) = 1 } = a * b

	    // g = a * b
	    // gdot = (b x a) * wi + (a x b) * wj
	    // G = [0 bxa 0 axb]
	    // W = [vi wi vj wj]
	    GA.rotational.copy(njxni);
	    GB.rotational.copy(nixnj);

	    var g = Math.cos(this.angle) - ni.dot(nj),
	        GW = this.computeGW(),
	        GiMf = this.computeGiMf();

	    var B = - g * a - GW * b - h * GiMf;

	    return B;
	};


	},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(_dereq_,module,exports){
	module.exports = ContactEquation;

	var Equation = _dereq_('./Equation');
	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');

	/**
	 * Contact/non-penetration constraint equation
	 * @class ContactEquation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @extends Equation
	 */
	function ContactEquation(bodyA, bodyB, maxForce){
	    maxForce = typeof(maxForce) !== 'undefined' ? maxForce : 1e6;
	    Equation.call(this, bodyA, bodyB, 0, maxForce);

	    /**
	     * @property restitution
	     * @type {Number}
	     */
	    this.restitution = 0.0; // "bounciness": u1 = -e*u0

	    /**
	     * World-oriented vector that goes from the center of bi to the contact point.
	     * @property {Vec3} ri
	     */
	    this.ri = new Vec3();

	    /**
	     * World-oriented vector that starts in body j position and goes to the contact point.
	     * @property {Vec3} rj
	     */
	    this.rj = new Vec3();

	    /**
	     * Contact normal, pointing out of body i.
	     * @property {Vec3} ni
	     */
	    this.ni = new Vec3();
	}

	ContactEquation.prototype = new Equation();
	ContactEquation.prototype.constructor = ContactEquation;

	var ContactEquation_computeB_temp1 = new Vec3(); // Temp vectors
	var ContactEquation_computeB_temp2 = new Vec3();
	var ContactEquation_computeB_temp3 = new Vec3();
	ContactEquation.prototype.computeB = function(h){
	    var a = this.a,
	        b = this.b,
	        bi = this.bi,
	        bj = this.bj,
	        ri = this.ri,
	        rj = this.rj,
	        rixn = ContactEquation_computeB_temp1,
	        rjxn = ContactEquation_computeB_temp2,

	        vi = bi.velocity,
	        wi = bi.angularVelocity,
	        fi = bi.force,
	        taui = bi.torque,

	        vj = bj.velocity,
	        wj = bj.angularVelocity,
	        fj = bj.force,
	        tauj = bj.torque,

	        penetrationVec = ContactEquation_computeB_temp3,

	        GA = this.jacobianElementA,
	        GB = this.jacobianElementB,

	        n = this.ni;

	    // Caluclate cross products
	    ri.cross(n,rixn);
	    rj.cross(n,rjxn);

	    // g = xj+rj -(xi+ri)
	    // G = [ -ni  -rixn  ni  rjxn ]
	    n.negate(GA.spatial);
	    rixn.negate(GA.rotational);
	    GB.spatial.copy(n);
	    GB.rotational.copy(rjxn);

	    // Calculate the penetration vector
	    penetrationVec.copy(bj.position);
	    penetrationVec.vadd(rj,penetrationVec);
	    penetrationVec.vsub(bi.position,penetrationVec);
	    penetrationVec.vsub(ri,penetrationVec);

	    var g = n.dot(penetrationVec);

	    // Compute iteration
	    var ePlusOne = this.restitution + 1;
	    var GW = ePlusOne * vj.dot(n) - ePlusOne * vi.dot(n) + wj.dot(rjxn) - wi.dot(rixn);
	    var GiMf = this.computeGiMf();

	    var B = - g * a - GW * b - h*GiMf;

	    return B;
	};

	var ContactEquation_getImpactVelocityAlongNormal_vi = new Vec3();
	var ContactEquation_getImpactVelocityAlongNormal_vj = new Vec3();
	var ContactEquation_getImpactVelocityAlongNormal_xi = new Vec3();
	var ContactEquation_getImpactVelocityAlongNormal_xj = new Vec3();
	var ContactEquation_getImpactVelocityAlongNormal_relVel = new Vec3();

	/**
	 * Get the current relative velocity in the contact point.
	 * @method getImpactVelocityAlongNormal
	 * @return {number}
	 */
	ContactEquation.prototype.getImpactVelocityAlongNormal = function(){
	    var vi = ContactEquation_getImpactVelocityAlongNormal_vi;
	    var vj = ContactEquation_getImpactVelocityAlongNormal_vj;
	    var xi = ContactEquation_getImpactVelocityAlongNormal_xi;
	    var xj = ContactEquation_getImpactVelocityAlongNormal_xj;
	    var relVel = ContactEquation_getImpactVelocityAlongNormal_relVel;

	    this.bi.position.vadd(this.ri, xi);
	    this.bj.position.vadd(this.rj, xj);

	    this.bi.getVelocityAtWorldPoint(xi, vi);
	    this.bj.getVelocityAtWorldPoint(xj, vj);

	    vi.vsub(vj, relVel);

	    return this.ni.dot(relVel);
	};


	},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(_dereq_,module,exports){
	module.exports = Equation;

	var JacobianElement = _dereq_('../math/JacobianElement'),
	    Vec3 = _dereq_('../math/Vec3');

	/**
	 * Equation base class
	 * @class Equation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bi
	 * @param {Body} bj
	 * @param {Number} minForce Minimum (read: negative max) force to be applied by the constraint.
	 * @param {Number} maxForce Maximum (read: positive max) force to be applied by the constraint.
	 */
	function Equation(bi,bj,minForce,maxForce){
	    this.id = Equation.id++;

	    /**
	     * @property {number} minForce
	     */
	    this.minForce = typeof(minForce)==="undefined" ? -1e6 : minForce;

	    /**
	     * @property {number} maxForce
	     */
	    this.maxForce = typeof(maxForce)==="undefined" ? 1e6 : maxForce;

	    /**
	     * @property bi
	     * @type {Body}
	     */
	    this.bi = bi;

	    /**
	     * @property bj
	     * @type {Body}
	     */
	    this.bj = bj;

	    /**
	     * SPOOK parameter
	     * @property {number} a
	     */
	    this.a = 0.0;

	    /**
	     * SPOOK parameter
	     * @property {number} b
	     */
	    this.b = 0.0;

	    /**
	     * SPOOK parameter
	     * @property {number} eps
	     */
	    this.eps = 0.0;

	    /**
	     * @property {JacobianElement} jacobianElementA
	     */
	    this.jacobianElementA = new JacobianElement();

	    /**
	     * @property {JacobianElement} jacobianElementB
	     */
	    this.jacobianElementB = new JacobianElement();

	    /**
	     * @property {boolean} enabled
	     * @default true
	     */
	    this.enabled = true;

	    // Set typical spook params
	    this.setSpookParams(1e7,4,1/60);
	}
	Equation.prototype.constructor = Equation;

	Equation.id = 0;

	/**
	 * Recalculates a,b,eps.
	 * @method setSpookParams
	 */
	Equation.prototype.setSpookParams = function(stiffness,relaxation,timeStep){
	    var d = relaxation,
	        k = stiffness,
	        h = timeStep;
	    this.a = 4.0 / (h * (1 + 4 * d));
	    this.b = (4.0 * d) / (1 + 4 * d);
	    this.eps = 4.0 / (h * h * k * (1 + 4 * d));
	};

	/**
	 * Computes the RHS of the SPOOK equation
	 * @method computeB
	 * @return {Number}
	 */
	Equation.prototype.computeB = function(a,b,h){
	    var GW = this.computeGW(),
	        Gq = this.computeGq(),
	        GiMf = this.computeGiMf();
	    return - Gq * a - GW * b - GiMf*h;
	};

	/**
	 * Computes G*q, where q are the generalized body coordinates
	 * @method computeGq
	 * @return {Number}
	 */
	Equation.prototype.computeGq = function(){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        xi = bi.position,
	        xj = bj.position;
	    return GA.spatial.dot(xi) + GB.spatial.dot(xj);
	};

	var zero = new Vec3();

	/**
	 * Computes G*W, where W are the body velocities
	 * @method computeGW
	 * @return {Number}
	 */
	Equation.prototype.computeGW = function(){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        vi = bi.velocity,
	        vj = bj.velocity,
	        wi = bi.angularVelocity || zero,
	        wj = bj.angularVelocity || zero;
	    return GA.multiplyVectors(vi,wi) + GB.multiplyVectors(vj,wj);
	};


	/**
	 * Computes G*Wlambda, where W are the body velocities
	 * @method computeGWlambda
	 * @return {Number}
	 */
	Equation.prototype.computeGWlambda = function(){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        vi = bi.vlambda,
	        vj = bj.vlambda,
	        wi = bi.wlambda || zero,
	        wj = bj.wlambda || zero;
	    return GA.multiplyVectors(vi,wi) + GB.multiplyVectors(vj,wj);
	};

	/**
	 * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
	 * @method computeGiMf
	 * @return {Number}
	 */
	var iMfi = new Vec3(),
	    iMfj = new Vec3(),
	    invIi_vmult_taui = new Vec3(),
	    invIj_vmult_tauj = new Vec3();
	Equation.prototype.computeGiMf = function(){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        fi = bi.force,
	        ti = bi.torque,
	        fj = bj.force,
	        tj = bj.torque,
	        invMassi = bi.invMassSolve,
	        invMassj = bj.invMassSolve;

	    if(bi.invInertiaWorldSolve){ bi.invInertiaWorldSolve.vmult(ti,invIi_vmult_taui); }
	    else { invIi_vmult_taui.set(0,0,0); }
	    if(bj.invInertiaWorldSolve){ bj.invInertiaWorldSolve.vmult(tj,invIj_vmult_tauj); }
	    else { invIj_vmult_tauj.set(0,0,0); }

	    fi.mult(invMassi,iMfi);
	    fj.mult(invMassj,iMfj);

	    return GA.multiplyVectors(iMfi,invIi_vmult_taui) + GB.multiplyVectors(iMfj,invIj_vmult_tauj);
	};

	/**
	 * Computes G*inv(M)*G'
	 * @method computeGiMGt
	 * @return {Number}
	 */
	var tmp = new Vec3();
	Equation.prototype.computeGiMGt = function(){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        invMassi = bi.invMassSolve,
	        invMassj = bj.invMassSolve,
	        invIi = bi.invInertiaWorldSolve,
	        invIj = bj.invInertiaWorldSolve,
	        result = invMassi + invMassj;

	    if(invIi){
	        invIi.vmult(GA.rotational,tmp);
	        result += tmp.dot(GA.rotational);
	    }

	    if(invIj){
	        invIj.vmult(GB.rotational,tmp);
	        result += tmp.dot(GB.rotational);
	    }

	    return  result;
	};

	var addToWlambda_temp = new Vec3(),
	    addToWlambda_Gi = new Vec3(),
	    addToWlambda_Gj = new Vec3(),
	    addToWlambda_ri = new Vec3(),
	    addToWlambda_rj = new Vec3(),
	    addToWlambda_Mdiag = new Vec3();

	/**
	 * Add constraint velocity to the bodies.
	 * @method addToWlambda
	 * @param {Number} deltalambda
	 */
	Equation.prototype.addToWlambda = function(deltalambda){
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB,
	        bi = this.bi,
	        bj = this.bj,
	        temp = addToWlambda_temp;

	    // Add to linear velocity
	    // v_lambda += inv(M) * delta_lamba * G
	    GA.spatial.mult(bi.invMassSolve * deltalambda,temp);
	    bi.vlambda.vadd(temp, bi.vlambda);

	    GB.spatial.mult(bj.invMassSolve * deltalambda,temp);
	    bj.vlambda.vadd(temp, bj.vlambda);

	    // Add to angular velocity
	    if(bi.invInertiaWorldSolve){
	        bi.invInertiaWorldSolve.vmult(GA.rotational,temp);
	        temp.mult(deltalambda,temp);
	        bi.wlambda.vadd(temp,bi.wlambda);
	    }

	    if(bj.invInertiaWorldSolve){
	        bj.invInertiaWorldSolve.vmult(GB.rotational,temp);
	        temp.mult(deltalambda,temp);
	        bj.wlambda.vadd(temp,bj.wlambda);
	    }
	};

	/**
	 * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
	 * @method computeInvC
	 * @param  {Number} eps
	 * @return {Number}
	 */
	Equation.prototype.computeC = function(){
	    return this.computeGiMGt() + this.eps;
	};

	},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(_dereq_,module,exports){
	module.exports = FrictionEquation;

	var Equation = _dereq_('./Equation');
	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');

	/**
	 * Constrains the slipping in a contact along a tangent
	 * @class FrictionEquation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Number} slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
	 * @extends Equation
	 */
	function FrictionEquation(bodyA, bodyB, slipForce){
	    Equation.call(this,bodyA, bodyB, -slipForce, slipForce);
	    this.ri = new Vec3();
	    this.rj = new Vec3();
	    this.t = new Vec3(); // tangent
	}

	FrictionEquation.prototype = new Equation();
	FrictionEquation.prototype.constructor = FrictionEquation;

	var FrictionEquation_computeB_temp1 = new Vec3();
	var FrictionEquation_computeB_temp2 = new Vec3();
	FrictionEquation.prototype.computeB = function(h){
	    var a = this.a,
	        b = this.b,
	        bi = this.bi,
	        bj = this.bj,
	        ri = this.ri,
	        rj = this.rj,
	        rixt = FrictionEquation_computeB_temp1,
	        rjxt = FrictionEquation_computeB_temp2,
	        t = this.t;

	    // Caluclate cross products
	    ri.cross(t,rixt);
	    rj.cross(t,rjxt);

	    // G = [-t -rixt t rjxt]
	    // And remember, this is a pure velocity constraint, g is always zero!
	    var GA = this.jacobianElementA,
	        GB = this.jacobianElementB;
	    t.negate(GA.spatial);
	    rixt.negate(GA.rotational);
	    GB.spatial.copy(t);
	    GB.rotational.copy(rjxt);

	    var GW = this.computeGW();
	    var GiMf = this.computeGiMf();

	    var B = - GW * b - h * GiMf;

	    return B;
	};

	},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(_dereq_,module,exports){
	module.exports = RotationalEquation;

	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');
	var Equation = _dereq_('./Equation');

	/**
	 * Rotational constraint. Works to keep the local vectors orthogonal to each other in world space.
	 * @class RotationalEquation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Vec3} [options.axisA]
	 * @param {Vec3} [options.axisB]
	 * @param {number} [options.maxForce]
	 * @extends Equation
	 */
	function RotationalEquation(bodyA, bodyB, options){
	    options = options || {};
	    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

	    Equation.call(this,bodyA,bodyB,-maxForce, maxForce);

	    this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
	    this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);

	    this.maxAngle = Math.PI / 2;
	}

	RotationalEquation.prototype = new Equation();
	RotationalEquation.prototype.constructor = RotationalEquation;

	var tmpVec1 = new Vec3();
	var tmpVec2 = new Vec3();

	RotationalEquation.prototype.computeB = function(h){
	    var a = this.a,
	        b = this.b,

	        ni = this.axisA,
	        nj = this.axisB,

	        nixnj = tmpVec1,
	        njxni = tmpVec2,

	        GA = this.jacobianElementA,
	        GB = this.jacobianElementB;

	    // Caluclate cross products
	    ni.cross(nj, nixnj);
	    nj.cross(ni, njxni);

	    // g = ni * nj
	    // gdot = (nj x ni) * wi + (ni x nj) * wj
	    // G = [0 njxni 0 nixnj]
	    // W = [vi wi vj wj]
	    GA.rotational.copy(njxni);
	    GB.rotational.copy(nixnj);

	    var g = Math.cos(this.maxAngle) - ni.dot(nj),
	        GW = this.computeGW(),
	        GiMf = this.computeGiMf();

	    var B = - g * a - GW * b - h * GiMf;

	    return B;
	};


	},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(_dereq_,module,exports){
	module.exports = RotationalMotorEquation;

	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');
	var Equation = _dereq_('./Equation');

	/**
	 * Rotational motor constraint. Tries to keep the relative angular velocity of the bodies to a given value.
	 * @class RotationalMotorEquation
	 * @constructor
	 * @author schteppe
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Number} maxForce
	 * @extends Equation
	 */
	function RotationalMotorEquation(bodyA, bodyB, maxForce){
	    maxForce = typeof(maxForce)!=='undefined' ? maxForce : 1e6;
	    Equation.call(this,bodyA,bodyB,-maxForce,maxForce);

	    /**
	     * World oriented rotational axis
	     * @property {Vec3} axisA
	     */
	    this.axisA = new Vec3();

	    /**
	     * World oriented rotational axis
	     * @property {Vec3} axisB
	     */
	    this.axisB = new Vec3(); // World oriented rotational axis

	    /**
	     * Motor velocity
	     * @property {Number} targetVelocity
	     */
	    this.targetVelocity = 0;
	}

	RotationalMotorEquation.prototype = new Equation();
	RotationalMotorEquation.prototype.constructor = RotationalMotorEquation;

	RotationalMotorEquation.prototype.computeB = function(h){
	    var a = this.a,
	        b = this.b,
	        bi = this.bi,
	        bj = this.bj,

	        axisA = this.axisA,
	        axisB = this.axisB,

	        GA = this.jacobianElementA,
	        GB = this.jacobianElementB;

	    // g = 0
	    // gdot = axisA * wi - axisB * wj
	    // gdot = G * W = G * [vi wi vj wj]
	    // =>
	    // G = [0 axisA 0 -axisB]

	    GA.rotational.copy(axisA);
	    axisB.negate(GB.rotational);

	    var GW = this.computeGW() - this.targetVelocity,
	        GiMf = this.computeGiMf();

	    var B = - GW * b - h * GiMf;

	    return B;
	};

	},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(_dereq_,module,exports){
	var Utils = _dereq_('../utils/Utils');

	module.exports = ContactMaterial;

	/**
	 * Defines what happens when two materials meet.
	 * @class ContactMaterial
	 * @constructor
	 * @param {Material} m1
	 * @param {Material} m2
	 * @param {object} [options]
	 * @param {Number} [options.friction=0.3]
	 * @param {Number} [options.restitution=0.3]
	 * @param {number} [options.contactEquationStiffness=1e7]
	 * @param {number} [options.contactEquationRelaxation=3]
	 * @param {number} [options.frictionEquationStiffness=1e7]
	 * @param {Number} [options.frictionEquationRelaxation=3]
	 */
	function ContactMaterial(m1, m2, options){
	    options = Utils.defaults(options, {
	        friction: 0.3,
	        restitution: 0.3,
	        contactEquationStiffness: 1e7,
	        contactEquationRelaxation: 3,
	        frictionEquationStiffness: 1e7,
	        frictionEquationRelaxation: 3
	    });

	    /**
	     * Identifier of this material
	     * @property {Number} id
	     */
	    this.id = ContactMaterial.idCounter++;

	    /**
	     * Participating materials
	     * @property {Array} materials
	     * @todo  Should be .materialA and .materialB instead
	     */
	    this.materials = [m1, m2];

	    /**
	     * Friction coefficient
	     * @property {Number} friction
	     */
	    this.friction = options.friction;

	    /**
	     * Restitution coefficient
	     * @property {Number} restitution
	     */
	    this.restitution = options.restitution;

	    /**
	     * Stiffness of the produced contact equations
	     * @property {Number} contactEquationStiffness
	     */
	    this.contactEquationStiffness = options.contactEquationStiffness;

	    /**
	     * Relaxation time of the produced contact equations
	     * @property {Number} contactEquationRelaxation
	     */
	    this.contactEquationRelaxation = options.contactEquationRelaxation;

	    /**
	     * Stiffness of the produced friction equations
	     * @property {Number} frictionEquationStiffness
	     */
	    this.frictionEquationStiffness = options.frictionEquationStiffness;

	    /**
	     * Relaxation time of the produced friction equations
	     * @property {Number} frictionEquationRelaxation
	     */
	    this.frictionEquationRelaxation = options.frictionEquationRelaxation;
	}

	ContactMaterial.idCounter = 0;

	},{"../utils/Utils":53}],25:[function(_dereq_,module,exports){
	module.exports = Material;

	/**
	 * Defines a physics material.
	 * @class Material
	 * @constructor
	 * @param {object} [options]
	 * @author schteppe
	 */
	function Material(options){
	    var name = '';
	    options = options || {};

	    // Backwards compatibility fix
	    if(typeof(options) === 'string'){
	        name = options;
	        options = {};
	    } else if(typeof(options) === 'object') {
	        name = '';
	    }

	    /**
	     * @property name
	     * @type {String}
	     */
	    this.name = name;

	    /**
	     * material id.
	     * @property id
	     * @type {number}
	     */
	    this.id = Material.idCounter++;

	    /**
	     * Friction for this material. If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
	     * @property {number} friction
	     */
	    this.friction = typeof(options.friction) !== 'undefined' ? options.friction : -1;

	    /**
	     * Restitution for this material. If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
	     * @property {number} restitution
	     */
	    this.restitution = typeof(options.restitution) !== 'undefined' ? options.restitution : -1;
	}

	Material.idCounter = 0;

	},{}],26:[function(_dereq_,module,exports){
	module.exports = JacobianElement;

	var Vec3 = _dereq_('./Vec3');

	/**
	 * An element containing 6 entries, 3 spatial and 3 rotational degrees of freedom.
	 * @class JacobianElement
	 * @constructor
	 */
	function JacobianElement(){

	    /**
	     * @property {Vec3} spatial
	     */
	    this.spatial = new Vec3();

	    /**
	     * @property {Vec3} rotational
	     */
	    this.rotational = new Vec3();
	}

	/**
	 * Multiply with other JacobianElement
	 * @method multiplyElement
	 * @param  {JacobianElement} element
	 * @return {Number}
	 */
	JacobianElement.prototype.multiplyElement = function(element){
	    return element.spatial.dot(this.spatial) + element.rotational.dot(this.rotational);
	};

	/**
	 * Multiply with two vectors
	 * @method multiplyVectors
	 * @param  {Vec3} spatial
	 * @param  {Vec3} rotational
	 * @return {Number}
	 */
	JacobianElement.prototype.multiplyVectors = function(spatial,rotational){
	    return spatial.dot(this.spatial) + rotational.dot(this.rotational);
	};

	},{"./Vec3":30}],27:[function(_dereq_,module,exports){
	module.exports = Mat3;

	var Vec3 = _dereq_('./Vec3');

	/**
	 * A 3x3 matrix.
	 * @class Mat3
	 * @constructor
	 * @param array elements Array of nine elements. Optional.
	 * @author schteppe / http://github.com/schteppe
	 */
	function Mat3(elements){
	    /**
	     * A vector of length 9, containing all matrix elements
	     * @property {Array} elements
	     */
	    if(elements){
	        this.elements = elements;
	    } else {
	        this.elements = [0,0,0,0,0,0,0,0,0];
	    }
	}

	/**
	 * Sets the matrix to identity
	 * @method identity
	 * @todo Should perhaps be renamed to setIdentity() to be more clear.
	 * @todo Create another function that immediately creates an identity matrix eg. eye()
	 */
	Mat3.prototype.identity = function(){
	    var e = this.elements;
	    e[0] = 1;
	    e[1] = 0;
	    e[2] = 0;

	    e[3] = 0;
	    e[4] = 1;
	    e[5] = 0;

	    e[6] = 0;
	    e[7] = 0;
	    e[8] = 1;
	};

	/**
	 * Set all elements to zero
	 * @method setZero
	 */
	Mat3.prototype.setZero = function(){
	    var e = this.elements;
	    e[0] = 0;
	    e[1] = 0;
	    e[2] = 0;
	    e[3] = 0;
	    e[4] = 0;
	    e[5] = 0;
	    e[6] = 0;
	    e[7] = 0;
	    e[8] = 0;
	};

	/**
	 * Sets the matrix diagonal elements from a Vec3
	 * @method setTrace
	 * @param {Vec3} vec3
	 */
	Mat3.prototype.setTrace = function(vec3){
	    var e = this.elements;
	    e[0] = vec3.x;
	    e[4] = vec3.y;
	    e[8] = vec3.z;
	};

	/**
	 * Gets the matrix diagonal elements
	 * @method getTrace
	 * @return {Vec3}
	 */
	Mat3.prototype.getTrace = function(target){
	    var target = target || new Vec3();
	    var e = this.elements;
	    target.x = e[0];
	    target.y = e[4];
	    target.z = e[8];
	};

	/**
	 * Matrix-Vector multiplication
	 * @method vmult
	 * @param {Vec3} v The vector to multiply with
	 * @param {Vec3} target Optional, target to save the result in.
	 */
	Mat3.prototype.vmult = function(v,target){
	    target = target || new Vec3();

	    var e = this.elements,
	        x = v.x,
	        y = v.y,
	        z = v.z;
	    target.x = e[0]*x + e[1]*y + e[2]*z;
	    target.y = e[3]*x + e[4]*y + e[5]*z;
	    target.z = e[6]*x + e[7]*y + e[8]*z;

	    return target;
	};

	/**
	 * Matrix-scalar multiplication
	 * @method smult
	 * @param {Number} s
	 */
	Mat3.prototype.smult = function(s){
	    for(var i=0; i<this.elements.length; i++){
	        this.elements[i] *= s;
	    }
	};

	/**
	 * Matrix multiplication
	 * @method mmult
	 * @param {Mat3} m Matrix to multiply with from left side.
	 * @return {Mat3} The result.
	 */
	Mat3.prototype.mmult = function(m,target){
	    var r = target || new Mat3();
	    for(var i=0; i<3; i++){
	        for(var j=0; j<3; j++){
	            var sum = 0.0;
	            for(var k=0; k<3; k++){
	                sum += m.elements[i+k*3] * this.elements[k+j*3];
	            }
	            r.elements[i+j*3] = sum;
	        }
	    }
	    return r;
	};

	/**
	 * Scale each column of the matrix
	 * @method scale
	 * @param {Vec3} v
	 * @return {Mat3} The result.
	 */
	Mat3.prototype.scale = function(v,target){
	    target = target || new Mat3();
	    var e = this.elements,
	        t = target.elements;
	    for(var i=0; i!==3; i++){
	        t[3*i + 0] = v.x * e[3*i + 0];
	        t[3*i + 1] = v.y * e[3*i + 1];
	        t[3*i + 2] = v.z * e[3*i + 2];
	    }
	    return target;
	};

	/**
	 * Solve Ax=b
	 * @method solve
	 * @param {Vec3} b The right hand side
	 * @param {Vec3} target Optional. Target vector to save in.
	 * @return {Vec3} The solution x
	 * @todo should reuse arrays
	 */
	Mat3.prototype.solve = function(b,target){
	    target = target || new Vec3();

	    // Construct equations
	    var nr = 3; // num rows
	    var nc = 4; // num cols
	    var eqns = [];
	    for(var i=0; i<nr*nc; i++){
	        eqns.push(0);
	    }
	    var i,j;
	    for(i=0; i<3; i++){
	        for(j=0; j<3; j++){
	            eqns[i+nc*j] = this.elements[i+3*j];
	        }
	    }
	    eqns[3+4*0] = b.x;
	    eqns[3+4*1] = b.y;
	    eqns[3+4*2] = b.z;

	    // Compute right upper triangular version of the matrix - Gauss elimination
	    var n = 3, k = n, np;
	    var kp = 4; // num rows
	    var p, els;
	    do {
	        i = k - n;
	        if (eqns[i+nc*i] === 0) {
	            // the pivot is null, swap lines
	            for (j = i + 1; j < k; j++) {
	                if (eqns[i+nc*j] !== 0) {
	                    np = kp;
	                    do {  // do ligne( i ) = ligne( i ) + ligne( k )
	                        p = kp - np;
	                        eqns[p+nc*i] += eqns[p+nc*j];
	                    } while (--np);
	                    break;
	                }
	            }
	        }
	        if (eqns[i+nc*i] !== 0) {
	            for (j = i + 1; j < k; j++) {
	                var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
	                np = kp;
	                do {  // do ligne( k ) = ligne( k ) - multiplier * ligne( i )
	                    p = kp - np;
	                    eqns[p+nc*j] = p <= i ? 0 : eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
	                } while (--np);
	            }
	        }
	    } while (--n);

	    // Get the solution
	    target.z = eqns[2*nc+3] / eqns[2*nc+2];
	    target.y = (eqns[1*nc+3] - eqns[1*nc+2]*target.z) / eqns[1*nc+1];
	    target.x = (eqns[0*nc+3] - eqns[0*nc+2]*target.z - eqns[0*nc+1]*target.y) / eqns[0*nc+0];

	    if(isNaN(target.x) || isNaN(target.y) || isNaN(target.z) || target.x===Infinity || target.y===Infinity || target.z===Infinity){
	        throw "Could not solve equation! Got x=["+target.toString()+"], b=["+b.toString()+"], A=["+this.toString()+"]";
	    }

	    return target;
	};

	/**
	 * Get an element in the matrix by index. Index starts at 0, not 1!!!
	 * @method e
	 * @param {Number} row
	 * @param {Number} column
	 * @param {Number} value Optional. If provided, the matrix element will be set to this value.
	 * @return {Number}
	 */
	Mat3.prototype.e = function( row , column ,value){
	    if(value===undefined){
	        return this.elements[column+3*row];
	    } else {
	        // Set value
	        this.elements[column+3*row] = value;
	    }
	};

	/**
	 * Copy another matrix into this matrix object.
	 * @method copy
	 * @param {Mat3} source
	 * @return {Mat3} this
	 */
	Mat3.prototype.copy = function(source){
	    for(var i=0; i < source.elements.length; i++){
	        this.elements[i] = source.elements[i];
	    }
	    return this;
	};

	/**
	 * Returns a string representation of the matrix.
	 * @method toString
	 * @return string
	 */
	Mat3.prototype.toString = function(){
	    var r = "";
	    var sep = ",";
	    for(var i=0; i<9; i++){
	        r += this.elements[i] + sep;
	    }
	    return r;
	};

	/**
	 * reverse the matrix
	 * @method reverse
	 * @param {Mat3} target Optional. Target matrix to save in.
	 * @return {Mat3} The solution x
	 */
	Mat3.prototype.reverse = function(target){

	    target = target || new Mat3();

	    // Construct equations
	    var nr = 3; // num rows
	    var nc = 6; // num cols
	    var eqns = [];
	    for(var i=0; i<nr*nc; i++){
	        eqns.push(0);
	    }
	    var i,j;
	    for(i=0; i<3; i++){
	        for(j=0; j<3; j++){
	            eqns[i+nc*j] = this.elements[i+3*j];
	        }
	    }
	    eqns[3+6*0] = 1;
	    eqns[3+6*1] = 0;
	    eqns[3+6*2] = 0;
	    eqns[4+6*0] = 0;
	    eqns[4+6*1] = 1;
	    eqns[4+6*2] = 0;
	    eqns[5+6*0] = 0;
	    eqns[5+6*1] = 0;
	    eqns[5+6*2] = 1;

	    // Compute right upper triangular version of the matrix - Gauss elimination
	    var n = 3, k = n, np;
	    var kp = nc; // num rows
	    var p;
	    do {
	        i = k - n;
	        if (eqns[i+nc*i] === 0) {
	            // the pivot is null, swap lines
	            for (j = i + 1; j < k; j++) {
	                if (eqns[i+nc*j] !== 0) {
	                    np = kp;
	                    do { // do line( i ) = line( i ) + line( k )
	                        p = kp - np;
	                        eqns[p+nc*i] += eqns[p+nc*j];
	                    } while (--np);
	                    break;
	                }
	            }
	        }
	        if (eqns[i+nc*i] !== 0) {
	            for (j = i + 1; j < k; j++) {
	                var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
	                np = kp;
	                do { // do line( k ) = line( k ) - multiplier * line( i )
	                    p = kp - np;
	                    eqns[p+nc*j] = p <= i ? 0 : eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
	                } while (--np);
	            }
	        }
	    } while (--n);

	    // eliminate the upper left triangle of the matrix
	    i = 2;
	    do {
	        j = i-1;
	        do {
	            var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
	            np = nc;
	            do {
	                p = nc - np;
	                eqns[p+nc*j] =  eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
	            } while (--np);
	        } while (j--);
	    } while (--i);

	    // operations on the diagonal
	    i = 2;
	    do {
	        var multiplier = 1 / eqns[i+nc*i];
	        np = nc;
	        do {
	            p = nc - np;
	            eqns[p+nc*i] = eqns[p+nc*i] * multiplier ;
	        } while (--np);
	    } while (i--);

	    i = 2;
	    do {
	        j = 2;
	        do {
	            p = eqns[nr+j+nc*i];
	            if( isNaN( p ) || p ===Infinity ){
	                throw "Could not reverse! A=["+this.toString()+"]";
	            }
	            target.e( i , j , p );
	        } while (j--);
	    } while (i--);

	    return target;
	};

	/**
	 * Set the matrix from a quaterion
	 * @method setRotationFromQuaternion
	 * @param {Quaternion} q
	 */
	Mat3.prototype.setRotationFromQuaternion = function( q ) {
	    var x = q.x, y = q.y, z = q.z, w = q.w,
	        x2 = x + x, y2 = y + y, z2 = z + z,
	        xx = x * x2, xy = x * y2, xz = x * z2,
	        yy = y * y2, yz = y * z2, zz = z * z2,
	        wx = w * x2, wy = w * y2, wz = w * z2,
	        e = this.elements;

	    e[3*0 + 0] = 1 - ( yy + zz );
	    e[3*0 + 1] = xy - wz;
	    e[3*0 + 2] = xz + wy;

	    e[3*1 + 0] = xy + wz;
	    e[3*1 + 1] = 1 - ( xx + zz );
	    e[3*1 + 2] = yz - wx;

	    e[3*2 + 0] = xz - wy;
	    e[3*2 + 1] = yz + wx;
	    e[3*2 + 2] = 1 - ( xx + yy );

	    return this;
	};

	/**
	 * Transpose the matrix
	 * @method transpose
	 * @param  {Mat3} target Where to store the result.
	 * @return {Mat3} The target Mat3, or a new Mat3 if target was omitted.
	 */
	Mat3.prototype.transpose = function( target ) {
	    target = target || new Mat3();

	    var Mt = target.elements,
	        M = this.elements;

	    for(var i=0; i!==3; i++){
	        for(var j=0; j!==3; j++){
	            Mt[3*i + j] = M[3*j + i];
	        }
	    }

	    return target;
	};

	},{"./Vec3":30}],28:[function(_dereq_,module,exports){
	module.exports = Quaternion;

	var Vec3 = _dereq_('./Vec3');

	/**
	 * A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
	 * @class Quaternion
	 * @constructor
	 * @param {Number} x Multiplier of the imaginary basis vector i.
	 * @param {Number} y Multiplier of the imaginary basis vector j.
	 * @param {Number} z Multiplier of the imaginary basis vector k.
	 * @param {Number} w Multiplier of the real part.
	 * @see http://en.wikipedia.org/wiki/Quaternion
	 */
	function Quaternion(x,y,z,w){
	    /**
	     * @property {Number} x
	     */
	    this.x = x!==undefined ? x : 0;

	    /**
	     * @property {Number} y
	     */
	    this.y = y!==undefined ? y : 0;

	    /**
	     * @property {Number} z
	     */
	    this.z = z!==undefined ? z : 0;

	    /**
	     * The multiplier of the real quaternion basis vector.
	     * @property {Number} w
	     */
	    this.w = w!==undefined ? w : 1;
	}

	/**
	 * Set the value of the quaternion.
	 * @method set
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {Number} w
	 */
	Quaternion.prototype.set = function(x,y,z,w){
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    this.w = w;
	};

	/**
	 * Convert to a readable format
	 * @method toString
	 * @return string
	 */
	Quaternion.prototype.toString = function(){
	    return this.x+","+this.y+","+this.z+","+this.w;
	};

	/**
	 * Convert to an Array
	 * @method toArray
	 * @return Array
	 */
	Quaternion.prototype.toArray = function(){
	    return [this.x, this.y, this.z, this.w];
	};

	/**
	 * Set the quaternion components given an axis and an angle.
	 * @method setFromAxisAngle
	 * @param {Vec3} axis
	 * @param {Number} angle in radians
	 */
	Quaternion.prototype.setFromAxisAngle = function(axis,angle){
	    var s = Math.sin(angle*0.5);
	    this.x = axis.x * s;
	    this.y = axis.y * s;
	    this.z = axis.z * s;
	    this.w = Math.cos(angle*0.5);
	};

	/**
	 * Converts the quaternion to axis/angle representation.
	 * @method toAxisAngle
	 * @param {Vec3} targetAxis Optional. A vector object to reuse for storing the axis.
	 * @return Array An array, first elemnt is the axis and the second is the angle in radians.
	 */
	Quaternion.prototype.toAxisAngle = function(targetAxis){
	    targetAxis = targetAxis || new Vec3();
	    this.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
	    var angle = 2 * Math.acos(this.w);
	    var s = Math.sqrt(1-this.w*this.w); // assuming quaternion normalised then w is less than 1, so term always positive.
	    if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
	        // if s close to zero then direction of axis not important
	        targetAxis.x = this.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
	        targetAxis.y = this.y;
	        targetAxis.z = this.z;
	    } else {
	        targetAxis.x = this.x / s; // normalise axis
	        targetAxis.y = this.y / s;
	        targetAxis.z = this.z / s;
	    }
	    return [targetAxis,angle];
	};

	var sfv_t1 = new Vec3(),
	    sfv_t2 = new Vec3();

	/**
	 * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
	 * @method setFromVectors
	 * @param {Vec3} u
	 * @param {Vec3} v
	 */
	Quaternion.prototype.setFromVectors = function(u,v){
	    if(u.isAntiparallelTo(v)){
	        var t1 = sfv_t1;
	        var t2 = sfv_t2;

	        u.tangents(t1,t2);
	        this.setFromAxisAngle(t1,Math.PI);
	    } else {
	        var a = u.cross(v);
	        this.x = a.x;
	        this.y = a.y;
	        this.z = a.z;
	        this.w = Math.sqrt(Math.pow(u.norm(),2) * Math.pow(v.norm(),2)) + u.dot(v);
	        this.normalize();
	    }
	};

	/**
	 * Quaternion multiplication
	 * @method mult
	 * @param {Quaternion} q
	 * @param {Quaternion} target Optional.
	 * @return {Quaternion}
	 */
	var Quaternion_mult_va = new Vec3();
	var Quaternion_mult_vb = new Vec3();
	var Quaternion_mult_vaxvb = new Vec3();
	Quaternion.prototype.mult = function(q,target){
	    target = target || new Quaternion();
	    var w = this.w,
	        va = Quaternion_mult_va,
	        vb = Quaternion_mult_vb,
	        vaxvb = Quaternion_mult_vaxvb;

	    va.set(this.x,this.y,this.z);
	    vb.set(q.x,q.y,q.z);
	    target.w = w*q.w - va.dot(vb);
	    va.cross(vb,vaxvb);

	    target.x = w * vb.x + q.w*va.x + vaxvb.x;
	    target.y = w * vb.y + q.w*va.y + vaxvb.y;
	    target.z = w * vb.z + q.w*va.z + vaxvb.z;

	    return target;
	};

	/**
	 * Get the inverse quaternion rotation.
	 * @method inverse
	 * @param {Quaternion} target
	 * @return {Quaternion}
	 */
	Quaternion.prototype.inverse = function(target){
	    var x = this.x, y = this.y, z = this.z, w = this.w;
	    target = target || new Quaternion();

	    this.conjugate(target);
	    var inorm2 = 1/(x*x + y*y + z*z + w*w);
	    target.x *= inorm2;
	    target.y *= inorm2;
	    target.z *= inorm2;
	    target.w *= inorm2;

	    return target;
	};

	/**
	 * Get the quaternion conjugate
	 * @method conjugate
	 * @param {Quaternion} target
	 * @return {Quaternion}
	 */
	Quaternion.prototype.conjugate = function(target){
	    target = target || new Quaternion();

	    target.x = -this.x;
	    target.y = -this.y;
	    target.z = -this.z;
	    target.w = this.w;

	    return target;
	};

	/**
	 * Normalize the quaternion. Note that this changes the values of the quaternion.
	 * @method normalize
	 */
	Quaternion.prototype.normalize = function(){
	    var l = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
	    if ( l === 0 ) {
	        this.x = 0;
	        this.y = 0;
	        this.z = 0;
	        this.w = 0;
	    } else {
	        l = 1 / l;
	        this.x *= l;
	        this.y *= l;
	        this.z *= l;
	        this.w *= l;
	    }
	};

	/**
	 * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
	 * @method normalizeFast
	 * @see http://jsperf.com/fast-quaternion-normalization
	 * @author unphased, https://github.com/unphased
	 */
	Quaternion.prototype.normalizeFast = function () {
	    var f = (3.0-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2.0;
	    if ( f === 0 ) {
	        this.x = 0;
	        this.y = 0;
	        this.z = 0;
	        this.w = 0;
	    } else {
	        this.x *= f;
	        this.y *= f;
	        this.z *= f;
	        this.w *= f;
	    }
	};

	/**
	 * Multiply the quaternion by a vector
	 * @method vmult
	 * @param {Vec3} v
	 * @param {Vec3} target Optional
	 * @return {Vec3}
	 */
	Quaternion.prototype.vmult = function(v,target){
	    target = target || new Vec3();

	    var x = v.x,
	        y = v.y,
	        z = v.z;

	    var qx = this.x,
	        qy = this.y,
	        qz = this.z,
	        qw = this.w;

	    // q*v
	    var ix =  qw * x + qy * z - qz * y,
	    iy =  qw * y + qz * x - qx * z,
	    iz =  qw * z + qx * y - qy * x,
	    iw = -qx * x - qy * y - qz * z;

	    target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

	    return target;
	};

	/**
	 * Copies value of source to this quaternion.
	 * @method copy
	 * @param {Quaternion} source
	 * @return {Quaternion} this
	 */
	Quaternion.prototype.copy = function(source){
	    this.x = source.x;
	    this.y = source.y;
	    this.z = source.z;
	    this.w = source.w;
	    return this;
	};

	/**
	 * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
	 * @method toEuler
	 * @param {Vec3} target
	 * @param string order Three-character string e.g. "YZX", which also is default.
	 */
	Quaternion.prototype.toEuler = function(target,order){
	    order = order || "YZX";

	    var heading, attitude, bank;
	    var x = this.x, y = this.y, z = this.z, w = this.w;

	    switch(order){
	    case "YZX":
	        var test = x*y + z*w;
	        if (test > 0.499) { // singularity at north pole
	            heading = 2 * Math.atan2(x,w);
	            attitude = Math.PI/2;
	            bank = 0;
	        }
	        if (test < -0.499) { // singularity at south pole
	            heading = -2 * Math.atan2(x,w);
	            attitude = - Math.PI/2;
	            bank = 0;
	        }
	        if(isNaN(heading)){
	            var sqx = x*x;
	            var sqy = y*y;
	            var sqz = z*z;
	            heading = Math.atan2(2*y*w - 2*x*z , 1 - 2*sqy - 2*sqz); // Heading
	            attitude = Math.asin(2*test); // attitude
	            bank = Math.atan2(2*x*w - 2*y*z , 1 - 2*sqx - 2*sqz); // bank
	        }
	        break;
	    default:
	        throw new Error("Euler order "+order+" not supported yet.");
	    }

	    target.y = heading;
	    target.z = attitude;
	    target.x = bank;
	};

	/**
	 * See http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
	 * @method setFromEuler
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {String} order The order to apply angles: 'XYZ' or 'YXZ' or any other combination
	 */
	Quaternion.prototype.setFromEuler = function ( x, y, z, order ) {
	    order = order || "XYZ";

	    var c1 = Math.cos( x / 2 );
	    var c2 = Math.cos( y / 2 );
	    var c3 = Math.cos( z / 2 );
	    var s1 = Math.sin( x / 2 );
	    var s2 = Math.sin( y / 2 );
	    var s3 = Math.sin( z / 2 );

	    if ( order === 'XYZ' ) {

	        this.x = s1 * c2 * c3 + c1 * s2 * s3;
	        this.y = c1 * s2 * c3 - s1 * c2 * s3;
	        this.z = c1 * c2 * s3 + s1 * s2 * c3;
	        this.w = c1 * c2 * c3 - s1 * s2 * s3;

	    } else if ( order === 'YXZ' ) {

	        this.x = s1 * c2 * c3 + c1 * s2 * s3;
	        this.y = c1 * s2 * c3 - s1 * c2 * s3;
	        this.z = c1 * c2 * s3 - s1 * s2 * c3;
	        this.w = c1 * c2 * c3 + s1 * s2 * s3;

	    } else if ( order === 'ZXY' ) {

	        this.x = s1 * c2 * c3 - c1 * s2 * s3;
	        this.y = c1 * s2 * c3 + s1 * c2 * s3;
	        this.z = c1 * c2 * s3 + s1 * s2 * c3;
	        this.w = c1 * c2 * c3 - s1 * s2 * s3;

	    } else if ( order === 'ZYX' ) {

	        this.x = s1 * c2 * c3 - c1 * s2 * s3;
	        this.y = c1 * s2 * c3 + s1 * c2 * s3;
	        this.z = c1 * c2 * s3 - s1 * s2 * c3;
	        this.w = c1 * c2 * c3 + s1 * s2 * s3;

	    } else if ( order === 'YZX' ) {

	        this.x = s1 * c2 * c3 + c1 * s2 * s3;
	        this.y = c1 * s2 * c3 + s1 * c2 * s3;
	        this.z = c1 * c2 * s3 - s1 * s2 * c3;
	        this.w = c1 * c2 * c3 - s1 * s2 * s3;

	    } else if ( order === 'XZY' ) {

	        this.x = s1 * c2 * c3 - c1 * s2 * s3;
	        this.y = c1 * s2 * c3 - s1 * c2 * s3;
	        this.z = c1 * c2 * s3 + s1 * s2 * c3;
	        this.w = c1 * c2 * c3 + s1 * s2 * s3;

	    }

	    return this;

	};

	Quaternion.prototype.clone = function(){
	    return new Quaternion(this.x, this.y, this.z, this.w);
	};
	},{"./Vec3":30}],29:[function(_dereq_,module,exports){
	var Vec3 = _dereq_('./Vec3');
	var Quaternion = _dereq_('./Quaternion');

	module.exports = Transform;

	/**
	 * @class Transform
	 * @constructor
	 */
	function Transform(options) {
	    options = options || {};

		/**
		 * @property {Vec3} position
		 */
		this.position = new Vec3();
	    if(options.position){
	        this.position.copy(options.position);
	    }

		/**
		 * @property {Quaternion} quaternion
		 */
		this.quaternion = new Quaternion();
	    if(options.quaternion){
	        this.quaternion.copy(options.quaternion);
	    }
	}

	var tmpQuat = new Quaternion();

	/**
	 * @static
	 * @method pointToLocaFrame
	 * @param {Vec3} position
	 * @param {Quaternion} quaternion
	 * @param {Vec3} worldPoint
	 * @param {Vec3} result
	 */
	Transform.pointToLocalFrame = function(position, quaternion, worldPoint, result){
	    var result = result || new Vec3();
	    worldPoint.vsub(position, result);
	    quaternion.conjugate(tmpQuat);
	    tmpQuat.vmult(result, result);
	    return result;
	};

	/**
	 * Get a global point in local transform coordinates.
	 * @method pointToLocal
	 * @param  {Vec3} point
	 * @param  {Vec3} result
	 * @return {Vec3} The "result" vector object
	 */
	Transform.prototype.pointToLocal = function(worldPoint, result){
	    return Transform.pointToLocalFrame(this.position, this.quaternion, worldPoint, result);
	};

	/**
	 * @static
	 * @method pointToWorldFrame
	 * @param {Vec3} position
	 * @param {Vec3} quaternion
	 * @param {Vec3} localPoint
	 * @param {Vec3} result
	 */
	Transform.pointToWorldFrame = function(position, quaternion, localPoint, result){
	    var result = result || new Vec3();
	    quaternion.vmult(localPoint, result);
	    result.vadd(position, result);
	    return result;
	};

	/**
	 * Get a local point in global transform coordinates.
	 * @method pointToWorld
	 * @param  {Vec3} point
	 * @param  {Vec3} result
	 * @return {Vec3} The "result" vector object
	 */
	Transform.prototype.pointToWorld = function(localPoint, result){
	    return Transform.pointToWorldFrame(this.position, this.quaternion, localPoint, result);
	};


	Transform.prototype.vectorToWorldFrame = function(localVector, result){
	    var result = result || new Vec3();
	    this.quaternion.vmult(localVector, result);
	    return result;
	};

	Transform.vectorToWorldFrame = function(quaternion, localVector, result){
	    quaternion.vmult(localVector, result);
	    return result;
	};

	Transform.vectorToLocalFrame = function(position, quaternion, worldVector, result){
	    var result = result || new Vec3();
	    quaternion.w *= -1;
	    quaternion.vmult(worldVector, result);
	    quaternion.w *= -1;
	    return result;
	};

	},{"./Quaternion":28,"./Vec3":30}],30:[function(_dereq_,module,exports){
	module.exports = Vec3;

	var Mat3 = _dereq_('./Mat3');

	/**
	 * 3-dimensional vector
	 * @class Vec3
	 * @constructor
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @author schteppe
	 * @example
	 *     var v = new Vec3(1, 2, 3);
	 *     console.log('x=' + v.x); // x=1
	 */
	function Vec3(x,y,z){
	    /**
	     * @property x
	     * @type {Number}
	     */
	    this.x = x||0.0;

	    /**
	     * @property y
	     * @type {Number}
	     */
	    this.y = y||0.0;

	    /**
	     * @property z
	     * @type {Number}
	     */
	    this.z = z||0.0;
	}

	/**
	 * @static
	 * @property {Vec3} ZERO
	 */
	Vec3.ZERO = new Vec3(0, 0, 0);

	/**
	 * @static
	 * @property {Vec3} UNIT_X
	 */
	Vec3.UNIT_X = new Vec3(1, 0, 0);

	/**
	 * @static
	 * @property {Vec3} UNIT_Y
	 */
	Vec3.UNIT_Y = new Vec3(0, 1, 0);

	/**
	 * @static
	 * @property {Vec3} UNIT_Z
	 */
	Vec3.UNIT_Z = new Vec3(0, 0, 1);

	/**
	 * Vector cross product
	 * @method cross
	 * @param {Vec3} v
	 * @param {Vec3} target Optional. Target to save in.
	 * @return {Vec3}
	 */
	Vec3.prototype.cross = function(v,target){
	    var vx=v.x, vy=v.y, vz=v.z, x=this.x, y=this.y, z=this.z;
	    target = target || new Vec3();

	    target.x = (y * vz) - (z * vy);
	    target.y = (z * vx) - (x * vz);
	    target.z = (x * vy) - (y * vx);

	    return target;
	};

	/**
	 * Set the vectors' 3 elements
	 * @method set
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @return Vec3
	 */
	Vec3.prototype.set = function(x,y,z){
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	};

	/**
	 * Set all components of the vector to zero.
	 * @method setZero
	 */
	Vec3.prototype.setZero = function(){
	    this.x = this.y = this.z = 0;
	};

	/**
	 * Vector addition
	 * @method vadd
	 * @param {Vec3} v
	 * @param {Vec3} target Optional.
	 * @return {Vec3}
	 */
	Vec3.prototype.vadd = function(v,target){
	    if(target){
	        target.x = v.x + this.x;
	        target.y = v.y + this.y;
	        target.z = v.z + this.z;
	    } else {
	        return new Vec3(this.x + v.x,
	                               this.y + v.y,
	                               this.z + v.z);
	    }
	};

	/**
	 * Vector subtraction
	 * @method vsub
	 * @param {Vec3} v
	 * @param {Vec3} target Optional. Target to save in.
	 * @return {Vec3}
	 */
	Vec3.prototype.vsub = function(v,target){
	    if(target){
	        target.x = this.x - v.x;
	        target.y = this.y - v.y;
	        target.z = this.z - v.z;
	    } else {
	        return new Vec3(this.x-v.x,
	                               this.y-v.y,
	                               this.z-v.z);
	    }
	};

	/**
	 * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
	 * @method crossmat
	 * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
	 * @return {Mat3}
	 */
	Vec3.prototype.crossmat = function(){
	    return new Mat3([     0,  -this.z,   this.y,
	                            this.z,        0,  -this.x,
	                           -this.y,   this.x,        0]);
	};

	/**
	 * Normalize the vector. Note that this changes the values in the vector.
	 * @method normalize
	 * @return {Number} Returns the norm of the vector
	 */
	Vec3.prototype.normalize = function(){
	    var x=this.x, y=this.y, z=this.z;
	    var n = Math.sqrt(x*x + y*y + z*z);
	    if(n>0.0){
	        var invN = 1/n;
	        this.x *= invN;
	        this.y *= invN;
	        this.z *= invN;
	    } else {
	        // Make something up
	        this.x = 0;
	        this.y = 0;
	        this.z = 0;
	    }
	    return n;
	};

	/**
	 * Get the version of this vector that is of length 1.
	 * @method unit
	 * @param {Vec3} target Optional target to save in
	 * @return {Vec3} Returns the unit vector
	 */
	Vec3.prototype.unit = function(target){
	    target = target || new Vec3();
	    var x=this.x, y=this.y, z=this.z;
	    var ninv = Math.sqrt(x*x + y*y + z*z);
	    if(ninv>0.0){
	        ninv = 1.0/ninv;
	        target.x = x * ninv;
	        target.y = y * ninv;
	        target.z = z * ninv;
	    } else {
	        target.x = 1;
	        target.y = 0;
	        target.z = 0;
	    }
	    return target;
	};

	/**
	 * Get the length of the vector
	 * @method norm
	 * @return {Number}
	 * @deprecated Use .length() instead
	 */
	Vec3.prototype.norm = function(){
	    var x=this.x, y=this.y, z=this.z;
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Get the length of the vector
	 * @method length
	 * @return {Number}
	 */
	Vec3.prototype.length = Vec3.prototype.norm;

	/**
	 * Get the squared length of the vector
	 * @method norm2
	 * @return {Number}
	 * @deprecated Use .lengthSquared() instead.
	 */
	Vec3.prototype.norm2 = function(){
	    return this.dot(this);
	};

	/**
	 * Get the squared length of the vector.
	 * @method lengthSquared
	 * @return {Number}
	 */
	Vec3.prototype.lengthSquared = Vec3.prototype.norm2;

	/**
	 * Get distance from this point to another point
	 * @method distanceTo
	 * @param  {Vec3} p
	 * @return {Number}
	 */
	Vec3.prototype.distanceTo = function(p){
	    var x=this.x, y=this.y, z=this.z;
	    var px=p.x, py=p.y, pz=p.z;
	    return Math.sqrt((px-x)*(px-x)+
	                     (py-y)*(py-y)+
	                     (pz-z)*(pz-z));
	};

	/**
	 * Get squared distance from this point to another point
	 * @method distanceSquared
	 * @param  {Vec3} p
	 * @return {Number}
	 */
	Vec3.prototype.distanceSquared = function(p){
	    var x=this.x, y=this.y, z=this.z;
	    var px=p.x, py=p.y, pz=p.z;
	    return (px-x)*(px-x) + (py-y)*(py-y) + (pz-z)*(pz-z);
	};

	/**
	 * Multiply all the components of the vector with a scalar.
	 * @deprecated Use .scale instead
	 * @method mult
	 * @param {Number} scalar
	 * @param {Vec3} target The vector to save the result in.
	 * @return {Vec3}
	 * @deprecated Use .scale() instead
	 */
	Vec3.prototype.mult = function(scalar,target){
	    target = target || new Vec3();
	    var x = this.x,
	        y = this.y,
	        z = this.z;
	    target.x = scalar * x;
	    target.y = scalar * y;
	    target.z = scalar * z;
	    return target;
	};

	/**
	 * Multiply the vector with a scalar.
	 * @method scale
	 * @param {Number} scalar
	 * @param {Vec3} target
	 * @return {Vec3}
	 */
	Vec3.prototype.scale = Vec3.prototype.mult;

	/**
	 * Calculate dot product
	 * @method dot
	 * @param {Vec3} v
	 * @return {Number}
	 */
	Vec3.prototype.dot = function(v){
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};

	/**
	 * @method isZero
	 * @return bool
	 */
	Vec3.prototype.isZero = function(){
	    return this.x===0 && this.y===0 && this.z===0;
	};

	/**
	 * Make the vector point in the opposite direction.
	 * @method negate
	 * @param {Vec3} target Optional target to save in
	 * @return {Vec3}
	 */
	Vec3.prototype.negate = function(target){
	    target = target || new Vec3();
	    target.x = -this.x;
	    target.y = -this.y;
	    target.z = -this.z;
	    return target;
	};

	/**
	 * Compute two artificial tangents to the vector
	 * @method tangents
	 * @param {Vec3} t1 Vector object to save the first tangent in
	 * @param {Vec3} t2 Vector object to save the second tangent in
	 */
	var Vec3_tangents_n = new Vec3();
	var Vec3_tangents_randVec = new Vec3();
	Vec3.prototype.tangents = function(t1,t2){
	    var norm = this.norm();
	    if(norm>0.0){
	        var n = Vec3_tangents_n;
	        var inorm = 1/norm;
	        n.set(this.x*inorm,this.y*inorm,this.z*inorm);
	        var randVec = Vec3_tangents_randVec;
	        if(Math.abs(n.x) < 0.9){
	            randVec.set(1,0,0);
	            n.cross(randVec,t1);
	        } else {
	            randVec.set(0,1,0);
	            n.cross(randVec,t1);
	        }
	        n.cross(t1,t2);
	    } else {
	        // The normal length is zero, make something up
	        t1.set(1, 0, 0);
	        t2.set(0, 1, 0);
	    }
	};

	/**
	 * Converts to a more readable format
	 * @method toString
	 * @return string
	 */
	Vec3.prototype.toString = function(){
	    return this.x+","+this.y+","+this.z;
	};

	/**
	 * Converts to an array
	 * @method toArray
	 * @return Array
	 */
	Vec3.prototype.toArray = function(){
	    return [this.x, this.y, this.z];
	};

	/**
	 * Copies value of source to this vector.
	 * @method copy
	 * @param {Vec3} source
	 * @return {Vec3} this
	 */
	Vec3.prototype.copy = function(source){
	    this.x = source.x;
	    this.y = source.y;
	    this.z = source.z;
	    return this;
	};


	/**
	 * Do a linear interpolation between two vectors
	 * @method lerp
	 * @param {Vec3} v
	 * @param {Number} t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
	 * @param {Vec3} target
	 */
	Vec3.prototype.lerp = function(v,t,target){
	    var x=this.x, y=this.y, z=this.z;
	    target.x = x + (v.x-x)*t;
	    target.y = y + (v.y-y)*t;
	    target.z = z + (v.z-z)*t;
	};

	/**
	 * Check if a vector equals is almost equal to another one.
	 * @method almostEquals
	 * @param {Vec3} v
	 * @param {Number} precision
	 * @return bool
	 */
	Vec3.prototype.almostEquals = function(v,precision){
	    if(precision===undefined){
	        precision = 1e-6;
	    }
	    if( Math.abs(this.x-v.x)>precision ||
	        Math.abs(this.y-v.y)>precision ||
	        Math.abs(this.z-v.z)>precision){
	        return false;
	    }
	    return true;
	};

	/**
	 * Check if a vector is almost zero
	 * @method almostZero
	 * @param {Number} precision
	 */
	Vec3.prototype.almostZero = function(precision){
	    if(precision===undefined){
	        precision = 1e-6;
	    }
	    if( Math.abs(this.x)>precision ||
	        Math.abs(this.y)>precision ||
	        Math.abs(this.z)>precision){
	        return false;
	    }
	    return true;
	};

	var antip_neg = new Vec3();

	/**
	 * Check if the vector is anti-parallel to another vector.
	 * @method isAntiparallelTo
	 * @param  {Vec3}  v
	 * @param  {Number}  precision Set to zero for exact comparisons
	 * @return {Boolean}
	 */
	Vec3.prototype.isAntiparallelTo = function(v,precision){
	    this.negate(antip_neg);
	    return antip_neg.almostEquals(v,precision);
	};

	/**
	 * Clone the vector
	 * @method clone
	 * @return {Vec3}
	 */
	Vec3.prototype.clone = function(){
	    return new Vec3(this.x, this.y, this.z);
	};
	},{"./Mat3":27}],31:[function(_dereq_,module,exports){
	module.exports = Body;

	var EventTarget = _dereq_('../utils/EventTarget');
	var Shape = _dereq_('../shapes/Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Mat3 = _dereq_('../math/Mat3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Material = _dereq_('../material/Material');
	var AABB = _dereq_('../collision/AABB');
	var Box = _dereq_('../shapes/Box');

	/**
	 * Base class for all body types.
	 * @class Body
	 * @constructor
	 * @extends EventTarget
	 * @param {object} [options]
	 * @param {Vec3} [options.position]
	 * @param {Vec3} [options.velocity]
	 * @param {Vec3} [options.angularVelocity]
	 * @param {Quaternion} [options.quaternion]
	 * @param {number} [options.mass]
	 * @param {Material} [options.material]
	 * @param {number} [options.type]
	 * @param {number} [options.linearDamping=0.01]
	 * @param {number} [options.angularDamping=0.01]
	 * @param {boolean} [options.allowSleep=true]
	 * @param {number} [options.sleepSpeedLimit=0.1]
	 * @param {number} [options.sleepTimeLimit=1]
	 * @param {number} [options.collisionFilterGroup=1]
	 * @param {number} [options.collisionFilterMask=1]
	 * @param {boolean} [options.fixedRotation=false]
	 * @param {Body} [options.shape]
	 * @example
	 *     var body = new Body({
	 *         mass: 1
	 *     });
	 *     var shape = new Sphere(1);
	 *     body.addShape(shape);
	 *     world.add(body);
	 */
	function Body(options){
	    options = options || {};

	    EventTarget.apply(this);

	    this.id = Body.idCounter++;

	    /**
	     * Reference to the world the body is living in
	     * @property world
	     * @type {World}
	     */
	    this.world = null;

	    /**
	     * Callback function that is used BEFORE stepping the system. Use it to apply forces, for example. Inside the function, "this" will refer to this Body object.
	     * @property preStep
	     * @type {Function}
	     * @deprecated Use World events instead
	     */
	    this.preStep = null;

	    /**
	     * Callback function that is used AFTER stepping the system. Inside the function, "this" will refer to this Body object.
	     * @property postStep
	     * @type {Function}
	     * @deprecated Use World events instead
	     */
	    this.postStep = null;

	    this.vlambda = new Vec3();

	    /**
	     * @property {Number} collisionFilterGroup
	     */
	    this.collisionFilterGroup = typeof(options.collisionFilterGroup) === 'number' ? options.collisionFilterGroup : 1;

	    /**
	     * @property {Number} collisionFilterMask
	     */
	    this.collisionFilterMask = typeof(options.collisionFilterMask) === 'number' ? options.collisionFilterMask : 1;

	    /**
	     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
	     * @property {Number} collisionResponse
	     */
		this.collisionResponse = true;

	    /**
	     * @property position
	     * @type {Vec3}
	     */
	    this.position = new Vec3();

	    if(options.position){
	        this.position.copy(options.position);
	    }

	    /**
	     * @property {Vec3} previousPosition
	     */
	    this.previousPosition = new Vec3();

	    /**
	     * Initial position of the body
	     * @property initPosition
	     * @type {Vec3}
	     */
	    this.initPosition = new Vec3();

	    /**
	     * @property velocity
	     * @type {Vec3}
	     */
	    this.velocity = new Vec3();

	    if(options.velocity){
	        this.velocity.copy(options.velocity);
	    }

	    /**
	     * @property initVelocity
	     * @type {Vec3}
	     */
	    this.initVelocity = new Vec3();

	    /**
	     * Linear force on the body
	     * @property force
	     * @type {Vec3}
	     */
	    this.force = new Vec3();

	    var mass = typeof(options.mass) === 'number' ? options.mass : 0;

	    /**
	     * @property mass
	     * @type {Number}
	     * @default 0
	     */
	    this.mass = mass;

	    /**
	     * @property invMass
	     * @type {Number}
	     */
	    this.invMass = mass > 0 ? 1.0 / mass : 0;

	    /**
	     * @property material
	     * @type {Material}
	     */
	    this.material = options.material || null;

	    /**
	     * @property linearDamping
	     * @type {Number}
	     */
	    this.linearDamping = typeof(options.linearDamping) === 'number' ? options.linearDamping : 0.01;

	    /**
	     * One of: Body.DYNAMIC, Body.STATIC and Body.KINEMATIC.
	     * @property type
	     * @type {Number}
	     */
	    this.type = (mass <= 0.0 ? Body.STATIC : Body.DYNAMIC);
	    if(typeof(options.type) === typeof(Body.STATIC)){
	        this.type = options.type;
	    }

	    /**
	     * If true, the body will automatically fall to sleep.
	     * @property allowSleep
	     * @type {Boolean}
	     * @default true
	     */
	    this.allowSleep = typeof(options.allowSleep) !== 'undefined' ? options.allowSleep : true;

	    /**
	     * Current sleep state.
	     * @property sleepState
	     * @type {Number}
	     */
	    this.sleepState = 0;

	    /**
	     * If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
	     * @property sleepSpeedLimit
	     * @type {Number}
	     * @default 0.1
	     */
	    this.sleepSpeedLimit = typeof(options.sleepSpeedLimit) !== 'undefined' ? options.sleepSpeedLimit : 0.1;

	    /**
	     * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
	     * @property sleepTimeLimit
	     * @type {Number}
	     * @default 1
	     */
	    this.sleepTimeLimit = typeof(options.sleepTimeLimit) !== 'undefined' ? options.sleepTimeLimit : 1;

	    this.timeLastSleepy = 0;

	    this._wakeUpAfterNarrowphase = false;


	    /**
	     * Rotational force on the body, around center of mass
	     * @property {Vec3} torque
	     */
	    this.torque = new Vec3();

	    /**
	     * Orientation of the body
	     * @property quaternion
	     * @type {Quaternion}
	     */
	    this.quaternion = new Quaternion();

	    if(options.quaternion){
	        this.quaternion.copy(options.quaternion);
	    }

	    /**
	     * @property initQuaternion
	     * @type {Quaternion}
	     */
	    this.initQuaternion = new Quaternion();

	    /**
	     * @property angularVelocity
	     * @type {Vec3}
	     */
	    this.angularVelocity = new Vec3();

	    if(options.angularVelocity){
	        this.angularVelocity.copy(options.angularVelocity);
	    }

	    /**
	     * @property initAngularVelocity
	     * @type {Vec3}
	     */
	    this.initAngularVelocity = new Vec3();

	    this.interpolatedPosition = new Vec3();
	    this.interpolatedQuaternion = new Quaternion();

	    /**
	     * @property shapes
	     * @type {array}
	     */
	    this.shapes = [];

	    /**
	     * @property shapeOffsets
	     * @type {array}
	     */
	    this.shapeOffsets = [];

	    /**
	     * @property shapeOrientations
	     * @type {array}
	     */
	    this.shapeOrientations = [];

	    /**
	     * @property inertia
	     * @type {Vec3}
	     */
	    this.inertia = new Vec3();

	    /**
	     * @property {Vec3} invInertia
	     */
	    this.invInertia = new Vec3();

	    /**
	     * @property {Mat3} invInertiaWorld
	     */
	    this.invInertiaWorld = new Mat3();

	    this.invMassSolve = 0;

	    /**
	     * @property {Vec3} invInertiaSolve
	     */
	    this.invInertiaSolve = new Vec3();

	    /**
	     * @property {Mat3} invInertiaWorldSolve
	     */
	    this.invInertiaWorldSolve = new Mat3();

	    /**
	     * Set to true if you don't want the body to rotate. Make sure to run .updateMassProperties() after changing this.
	     * @property {Boolean} fixedRotation
	     * @default false
	     */
	    this.fixedRotation = typeof(options.fixedRotation) !== "undefined" ? options.fixedRotation : false;

	    /**
	     * @property {Number} angularDamping
	     */
	    this.angularDamping = typeof(options.angularDamping) !== 'undefined' ? options.angularDamping : 0.01;

	    /**
	     * @property aabb
	     * @type {AABB}
	     */
	    this.aabb = new AABB();

	    /**
	     * Indicates if the AABB needs to be updated before use.
	     * @property aabbNeedsUpdate
	     * @type {Boolean}
	     */
	    this.aabbNeedsUpdate = true;

	    this.wlambda = new Vec3();

	    if(options.shape){
	        this.addShape(options.shape);
	    }

	    this.updateMassProperties();
	}
	Body.prototype = new EventTarget();
	Body.prototype.constructor = Body;

	/**
	 * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
	 * @static
	 * @property DYNAMIC
	 * @type {Number}
	 */
	Body.DYNAMIC = 1;

	/**
	 * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
	 * @static
	 * @property STATIC
	 * @type {Number}
	 */
	Body.STATIC = 2;

	/**
	 * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
	 * @static
	 * @property KINEMATIC
	 * @type {Number}
	 */
	Body.KINEMATIC = 4;



	/**
	 * @static
	 * @property AWAKE
	 * @type {number}
	 */
	Body.AWAKE = 0;

	/**
	 * @static
	 * @property SLEEPY
	 * @type {number}
	 */
	Body.SLEEPY = 1;

	/**
	 * @static
	 * @property SLEEPING
	 * @type {number}
	 */
	Body.SLEEPING = 2;

	Body.idCounter = 0;

	/**
	 * Wake the body up.
	 * @method wakeUp
	 */
	Body.prototype.wakeUp = function(){
	    var s = this.sleepState;
	    this.sleepState = 0;
	    if(s === Body.SLEEPING){
	        this.dispatchEvent({type:"wakeup"});
	    }
	};

	/**
	 * Force body sleep
	 * @method sleep
	 */
	Body.prototype.sleep = function(){
	    this.sleepState = Body.SLEEPING;
	    this.velocity.set(0,0,0);
	    this.angularVelocity.set(0,0,0);
	};

	Body.sleepyEvent = {
	    type: "sleepy"
	};

	Body.sleepEvent = {
	    type: "sleep"
	};

	/**
	 * Called every timestep to update internal sleep timer and change sleep state if needed.
	 * @method sleepTick
	 * @param {Number} time The world time in seconds
	 */
	Body.prototype.sleepTick = function(time){
	    if(this.allowSleep){
	        var sleepState = this.sleepState;
	        var speedSquared = this.velocity.norm2() + this.angularVelocity.norm2();
	        var speedLimitSquared = Math.pow(this.sleepSpeedLimit,2);
	        if(sleepState===Body.AWAKE && speedSquared < speedLimitSquared){
	            this.sleepState = Body.SLEEPY; // Sleepy
	            this.timeLastSleepy = time;
	            this.dispatchEvent(Body.sleepyEvent);
	        } else if(sleepState===Body.SLEEPY && speedSquared > speedLimitSquared){
	            this.wakeUp(); // Wake up
	        } else if(sleepState===Body.SLEEPY && (time - this.timeLastSleepy ) > this.sleepTimeLimit){
	            this.sleep(); // Sleeping
	            this.dispatchEvent(Body.sleepEvent);
	        }
	    }
	};

	/**
	 * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
	 * @method updateSolveMassProperties
	 */
	Body.prototype.updateSolveMassProperties = function(){
	    if(this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC){
	        this.invMassSolve = 0;
	        this.invInertiaSolve.setZero();
	        this.invInertiaWorldSolve.setZero();
	    } else {
	        this.invMassSolve = this.invMass;
	        this.invInertiaSolve.copy(this.invInertia);
	        this.invInertiaWorldSolve.copy(this.invInertiaWorld);
	    }
	};

	/**
	 * Convert a world point to local body frame.
	 * @method pointToLocalFrame
	 * @param  {Vec3} worldPoint
	 * @param  {Vec3} result
	 * @return {Vec3}
	 */
	Body.prototype.pointToLocalFrame = function(worldPoint,result){
	    var result = result || new Vec3();
	    worldPoint.vsub(this.position,result);
	    this.quaternion.conjugate().vmult(result,result);
	    return result;
	};

	/**
	 * Convert a world vector to local body frame.
	 * @method vectorToLocalFrame
	 * @param  {Vec3} worldPoint
	 * @param  {Vec3} result
	 * @return {Vec3}
	 */
	Body.prototype.vectorToLocalFrame = function(worldVector, result){
	    var result = result || new Vec3();
	    this.quaternion.conjugate().vmult(worldVector,result);
	    return result;
	};

	/**
	 * Convert a local body point to world frame.
	 * @method pointToWorldFrame
	 * @param  {Vec3} localPoint
	 * @param  {Vec3} result
	 * @return {Vec3}
	 */
	Body.prototype.pointToWorldFrame = function(localPoint,result){
	    var result = result || new Vec3();
	    this.quaternion.vmult(localPoint,result);
	    result.vadd(this.position,result);
	    return result;
	};

	/**
	 * Convert a local body point to world frame.
	 * @method vectorToWorldFrame
	 * @param  {Vec3} localVector
	 * @param  {Vec3} result
	 * @return {Vec3}
	 */
	Body.prototype.vectorToWorldFrame = function(localVector, result){
	    var result = result || new Vec3();
	    this.quaternion.vmult(localVector, result);
	    return result;
	};

	var tmpVec = new Vec3();
	var tmpQuat = new Quaternion();

	/**
	 * Add a shape to the body with a local offset and orientation.
	 * @method addShape
	 * @param {Shape} shape
	 * @param {Vec3} offset
	 * @param {Quaternion} quaternion
	 * @return {Body} The body object, for chainability.
	 */
	Body.prototype.addShape = function(shape, _offset, _orientation){
	    var offset = new Vec3();
	    var orientation = new Quaternion();

	    if(_offset){
	        offset.copy(_offset);
	    }
	    if(_orientation){
	        orientation.copy(_orientation);
	    }

	    this.shapes.push(shape);
	    this.shapeOffsets.push(offset);
	    this.shapeOrientations.push(orientation);
	    this.updateMassProperties();
	    this.updateBoundingRadius();

	    this.aabbNeedsUpdate = true;

	    return this;
	};

	/**
	 * Update the bounding radius of the body. Should be done if any of the shapes are changed.
	 * @method updateBoundingRadius
	 */
	Body.prototype.updateBoundingRadius = function(){
	    var shapes = this.shapes,
	        shapeOffsets = this.shapeOffsets,
	        N = shapes.length,
	        radius = 0;

	    for(var i=0; i!==N; i++){
	        var shape = shapes[i];
	        shape.updateBoundingSphereRadius();
	        var offset = shapeOffsets[i].norm(),
	            r = shape.boundingSphereRadius;
	        if(offset + r > radius){
	            radius = offset + r;
	        }
	    }

	    this.boundingRadius = radius;
	};

	var computeAABB_shapeAABB = new AABB();

	/**
	 * Updates the .aabb
	 * @method computeAABB
	 * @todo rename to updateAABB()
	 */
	Body.prototype.computeAABB = function(){
	    var shapes = this.shapes,
	        shapeOffsets = this.shapeOffsets,
	        shapeOrientations = this.shapeOrientations,
	        N = shapes.length,
	        offset = tmpVec,
	        orientation = tmpQuat,
	        bodyQuat = this.quaternion,
	        aabb = this.aabb,
	        shapeAABB = computeAABB_shapeAABB;

	    for(var i=0; i!==N; i++){
	        var shape = shapes[i];

	        // Get shape world quaternion
	        shapeOrientations[i].mult(bodyQuat, orientation);

	        // Get shape world position
	        orientation.vmult(shapeOffsets[i], offset);
	        offset.vadd(this.position, offset);

	        // vec2.rotate(offset, shapeOffsets[i], bodyAngle);
	        // vec2.add(offset, offset, this.position);

	        // Get shape AABB
	        shape.calculateWorldAABB(offset, orientation, shapeAABB.lowerBound, shapeAABB.upperBound);

	        if(i === 0){
	            aabb.copy(shapeAABB);
	        } else {
	            aabb.extend(shapeAABB);
	        }
	    }

	    this.aabbNeedsUpdate = false;
	};

	var uiw_m1 = new Mat3(),
	    uiw_m2 = new Mat3(),
	    uiw_m3 = new Mat3();

	/**
	 * Update .inertiaWorld and .invInertiaWorld
	 * @method updateInertiaWorld
	 */
	Body.prototype.updateInertiaWorld = function(force){
	    var I = this.invInertia;
	    if (I.x === I.y && I.y === I.z && !force) {
	        // If inertia M = s*I, where I is identity and s a scalar, then
	        //    R*M*R' = R*(s*I)*R' = s*R*I*R' = s*R*R' = s*I = M
	        // where R is the rotation matrix.
	        // In other words, we don't have to transform the inertia if all
	        // inertia diagonal entries are equal.
	    } else {
	        var m1 = uiw_m1,
	            m2 = uiw_m2,
	            m3 = uiw_m3;
	        m1.setRotationFromQuaternion(this.quaternion);
	        m1.transpose(m2);
	        m1.scale(I,m1);
	        m1.mmult(m2,this.invInertiaWorld);
	        //m3.getTrace(this.invInertiaWorld);
	    }

	    /*
	    this.quaternion.vmult(this.inertia,this.inertiaWorld);
	    this.quaternion.vmult(this.invInertia,this.invInertiaWorld);
	    */
	};

	/**
	 * Apply force to a world point. This could for example be a point on the Body surface. Applying force this way will add to Body.force and Body.torque.
	 * @method applyForce
	 * @param  {Vec3} force The amount of force to add.
	 * @param  {Vec3} worldPoint A world point to apply the force on.
	 */
	var Body_applyForce_r = new Vec3();
	var Body_applyForce_rotForce = new Vec3();
	Body.prototype.applyForce = function(force,worldPoint){
	    if(this.type !== Body.DYNAMIC){
	        return;
	    }

	    // Compute point position relative to the body center
	    var r = Body_applyForce_r;
	    worldPoint.vsub(this.position,r);

	    // Compute produced rotational force
	    var rotForce = Body_applyForce_rotForce;
	    r.cross(force,rotForce);

	    // Add linear force
	    this.force.vadd(force,this.force);

	    // Add rotational force
	    this.torque.vadd(rotForce,this.torque);
	};

	/**
	 * Apply force to a local point in the body.
	 * @method applyLocalForce
	 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
	 * @param  {Vec3} localPoint A local point in the body to apply the force on.
	 */
	var Body_applyLocalForce_worldForce = new Vec3();
	var Body_applyLocalForce_worldPoint = new Vec3();
	Body.prototype.applyLocalForce = function(localForce, localPoint){
	    if(this.type !== Body.DYNAMIC){
	        return;
	    }

	    var worldForce = Body_applyLocalForce_worldForce;
	    var worldPoint = Body_applyLocalForce_worldPoint;

	    // Transform the force vector to world space
	    this.vectorToWorldFrame(localForce, worldForce);
	    this.pointToWorldFrame(localPoint, worldPoint);

	    this.applyForce(worldForce, worldPoint);
	};

	/**
	 * Apply impulse to a world point. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
	 * @method applyImpulse
	 * @param  {Vec3} impulse The amount of impulse to add.
	 * @param  {Vec3} worldPoint A world point to apply the force on.
	 */
	var Body_applyImpulse_r = new Vec3();
	var Body_applyImpulse_velo = new Vec3();
	var Body_applyImpulse_rotVelo = new Vec3();
	Body.prototype.applyImpulse = function(impulse, worldPoint){
	    if(this.type !== Body.DYNAMIC){
	        return;
	    }

	    // Compute point position relative to the body center
	    var r = Body_applyImpulse_r;
	    worldPoint.vsub(this.position,r);

	    // Compute produced central impulse velocity
	    var velo = Body_applyImpulse_velo;
	    velo.copy(impulse);
	    velo.mult(this.invMass,velo);

	    // Add linear impulse
	    this.velocity.vadd(velo, this.velocity);

	    // Compute produced rotational impulse velocity
	    var rotVelo = Body_applyImpulse_rotVelo;
	    r.cross(impulse,rotVelo);

	    /*
	    rotVelo.x *= this.invInertia.x;
	    rotVelo.y *= this.invInertia.y;
	    rotVelo.z *= this.invInertia.z;
	    */
	    this.invInertiaWorld.vmult(rotVelo,rotVelo);

	    // Add rotational Impulse
	    this.angularVelocity.vadd(rotVelo, this.angularVelocity);
	};

	/**
	 * Apply locally-defined impulse to a local point in the body.
	 * @method applyLocalImpulse
	 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
	 * @param  {Vec3} localPoint A local point in the body to apply the force on.
	 */
	var Body_applyLocalImpulse_worldImpulse = new Vec3();
	var Body_applyLocalImpulse_worldPoint = new Vec3();
	Body.prototype.applyLocalImpulse = function(localImpulse, localPoint){
	    if(this.type !== Body.DYNAMIC){
	        return;
	    }

	    var worldImpulse = Body_applyLocalImpulse_worldImpulse;
	    var worldPoint = Body_applyLocalImpulse_worldPoint;

	    // Transform the force vector to world space
	    this.vectorToWorldFrame(localImpulse, worldImpulse);
	    this.pointToWorldFrame(localPoint, worldPoint);

	    this.applyImpulse(worldImpulse, worldPoint);
	};

	var Body_updateMassProperties_halfExtents = new Vec3();

	/**
	 * Should be called whenever you change the body shape or mass.
	 * @method updateMassProperties
	 */
	Body.prototype.updateMassProperties = function(){
	    var halfExtents = Body_updateMassProperties_halfExtents;

	    this.invMass = this.mass > 0 ? 1.0 / this.mass : 0;
	    var I = this.inertia;
	    var fixed = this.fixedRotation;

	    // Approximate with AABB box
	    this.computeAABB();
	    halfExtents.set(
	        (this.aabb.upperBound.x-this.aabb.lowerBound.x) / 2,
	        (this.aabb.upperBound.y-this.aabb.lowerBound.y) / 2,
	        (this.aabb.upperBound.z-this.aabb.lowerBound.z) / 2
	    );
	    Box.calculateInertia(halfExtents, this.mass, I);

	    this.invInertia.set(
	        I.x > 0 && !fixed ? 1.0 / I.x : 0,
	        I.y > 0 && !fixed ? 1.0 / I.y : 0,
	        I.z > 0 && !fixed ? 1.0 / I.z : 0
	    );
	    this.updateInertiaWorld(true);
	};

	/**
	 * Get world velocity of a point in the body.
	 * @method getVelocityAtWorldPoint
	 * @param  {Vec3} worldPoint
	 * @param  {Vec3} result
	 * @return {Vec3} The result vector.
	 */
	Body.prototype.getVelocityAtWorldPoint = function(worldPoint, result){
	    var r = new Vec3();
	    worldPoint.vsub(this.position, r);
	    this.angularVelocity.cross(r, result);
	    this.velocity.vadd(result, result);
	    return result;
	};

	},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(_dereq_,module,exports){
	var Body = _dereq_('./Body');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var RaycastResult = _dereq_('../collision/RaycastResult');
	var Ray = _dereq_('../collision/Ray');
	var WheelInfo = _dereq_('../objects/WheelInfo');

	module.exports = RaycastVehicle;

	/**
	 * Vehicle helper class that casts rays from the wheel positions towards the ground and applies forces.
	 * @class RaycastVehicle
	 * @constructor
	 * @param {object} [options]
	 * @param {Body} [options.chassisBody] The car chassis body.
	 * @param {integer} [options.indexRightAxis] Axis to use for right. x=0, y=1, z=2
	 * @param {integer} [options.indexLeftAxis]
	 * @param {integer} [options.indexUpAxis]
	 */
	function RaycastVehicle(options){

	    /**
	     * @property {Body} chassisBody
	     */
	    this.chassisBody = options.chassisBody;

	    /**
	     * An array of WheelInfo objects.
	     * @property {array} wheelInfos
	     */
	    this.wheelInfos = [];

	    /**
	     * Will be set to true if the car is sliding.
	     * @property {boolean} sliding
	     */
	    this.sliding = false;

	    /**
	     * @property {World} world
	     */
	    this.world = null;

	    /**
	     * Index of the right axis, 0=x, 1=y, 2=z
	     * @property {integer} indexRightAxis
	     * @default 1
	     */
	    this.indexRightAxis = typeof(options.indexRightAxis) !== 'undefined' ? options.indexRightAxis : 1;

	    /**
	     * Index of the forward axis, 0=x, 1=y, 2=z
	     * @property {integer} indexForwardAxis
	     * @default 0
	     */
	    this.indexForwardAxis = typeof(options.indexForwardAxis) !== 'undefined' ? options.indexForwardAxis : 0;

	    /**
	     * Index of the up axis, 0=x, 1=y, 2=z
	     * @property {integer} indexUpAxis
	     * @default 2
	     */
	    this.indexUpAxis = typeof(options.indexUpAxis) !== 'undefined' ? options.indexUpAxis : 2;
	}

	var tmpVec1 = new Vec3();
	var tmpVec2 = new Vec3();
	var tmpVec3 = new Vec3();
	var tmpVec4 = new Vec3();
	var tmpVec5 = new Vec3();
	var tmpVec6 = new Vec3();
	var tmpRay = new Ray();

	/**
	 * Add a wheel. For information about the options, see WheelInfo.
	 * @method addWheel
	 * @param {object} [options]
	 */
	RaycastVehicle.prototype.addWheel = function(options){
	    options = options || {};

	    var info = new WheelInfo(options);
	    var index = this.wheelInfos.length;
	    this.wheelInfos.push(info);

	    return index;
	};

	/**
	 * Set the steering value of a wheel.
	 * @method setSteeringValue
	 * @param {number} value
	 * @param {integer} wheelIndex
	 */
	RaycastVehicle.prototype.setSteeringValue = function(value, wheelIndex){
	    var wheel = this.wheelInfos[wheelIndex];
	    wheel.steering = value;
	};

	var torque = new Vec3();

	/**
	 * Set the wheel force to apply on one of the wheels each time step
	 * @method applyEngineForce
	 * @param  {number} value
	 * @param  {integer} wheelIndex
	 */
	RaycastVehicle.prototype.applyEngineForce = function(value, wheelIndex){
	    this.wheelInfos[wheelIndex].engineForce = value;
	};

	/**
	 * Set the braking force of a wheel
	 * @method setBrake
	 * @param {number} brake
	 * @param {integer} wheelIndex
	 */
	RaycastVehicle.prototype.setBrake = function(brake, wheelIndex){
	    this.wheelInfos[wheelIndex].brake = brake;
	};

	/**
	 * Add the vehicle including its constraints to the world.
	 * @method addToWorld
	 * @param {World} world
	 */
	RaycastVehicle.prototype.addToWorld = function(world){
	    var constraints = this.constraints;
	    world.add(this.chassisBody);
	    var that = this;
	    this.preStepCallback = function(){
	        that.updateVehicle(world.dt);
	    };
	    world.addEventListener('preStep', this.preStepCallback);
	    this.world = world;
	};

	/**
	 * Get one of the wheel axles, world-oriented.
	 * @private
	 * @method getVehicleAxisWorld
	 * @param  {integer} axisIndex
	 * @param  {Vec3} result
	 */
	RaycastVehicle.prototype.getVehicleAxisWorld = function(axisIndex, result){
	    result.set(
	        axisIndex === 0 ? 1 : 0,
	        axisIndex === 1 ? 1 : 0,
	        axisIndex === 2 ? 1 : 0
	    );
	    this.chassisBody.vectorToWorldFrame(result, result);
	};

	RaycastVehicle.prototype.updateVehicle = function(timeStep){
	    var wheelInfos = this.wheelInfos;
	    var numWheels = wheelInfos.length;
	    var chassisBody = this.chassisBody;

	    for (var i = 0; i < numWheels; i++) {
	        this.updateWheelTransform(i);
	    }

	    this.currentVehicleSpeedKmHour = 3.6 * chassisBody.velocity.norm();

	    var forwardWorld = new Vec3();
	    this.getVehicleAxisWorld(this.indexForwardAxis, forwardWorld);

	    if (forwardWorld.dot(chassisBody.velocity) < 0){
	        this.currentVehicleSpeedKmHour *= -1;
	    }

	    // simulate suspension
	    for (var i = 0; i < numWheels; i++) {
	        this.castRay(wheelInfos[i]);
	    }

	    this.updateSuspension(timeStep);

	    var impulse = new Vec3();
	    var relpos = new Vec3();
	    for (var i = 0; i < numWheels; i++) {
	        //apply suspension force
	        var wheel = wheelInfos[i];
	        var suspensionForce = wheel.suspensionForce;
	        if (suspensionForce > wheel.maxSuspensionForce) {
	            suspensionForce = wheel.maxSuspensionForce;
	        }
	        wheel.raycastResult.hitNormalWorld.scale(suspensionForce * timeStep, impulse);

	        wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, relpos);
	        chassisBody.applyImpulse(impulse, wheel.raycastResult.hitPointWorld/*relpos*/);
	    }

	    this.updateFriction(timeStep);

	    var hitNormalWorldScaledWithProj = new Vec3();
	    var fwd  = new Vec3();
	    var vel = new Vec3();
	    for (i = 0; i < numWheels; i++) {
	        var wheel = wheelInfos[i];
	        //var relpos = new Vec3();
	        //wheel.chassisConnectionPointWorld.vsub(chassisBody.position, relpos);
	        chassisBody.getVelocityAtWorldPoint(wheel.chassisConnectionPointWorld, vel);

	        // Hack to get the rotation in the correct direction
	        var m = 1;
	        switch(this.indexUpAxis){
	        case 1:
	            m = -1;
	            break;
	        }

	        if (wheel.isInContact) {

	            this.getVehicleAxisWorld(this.indexForwardAxis, fwd);
	            var proj = fwd.dot(wheel.raycastResult.hitNormalWorld);
	            wheel.raycastResult.hitNormalWorld.scale(proj, hitNormalWorldScaledWithProj);

	            fwd.vsub(hitNormalWorldScaledWithProj, fwd);

	            var proj2 = fwd.dot(vel);
	            wheel.deltaRotation = m * proj2 * timeStep / wheel.radius;
	        }

	        if((wheel.sliding || !wheel.isInContact) && wheel.engineForce !== 0 && wheel.useCustomSlidingRotationalSpeed){
	            // Apply custom rotation when accelerating and sliding
	            wheel.deltaRotation = (wheel.engineForce > 0 ? 1 : -1) * wheel.customSlidingRotationalSpeed * timeStep;
	        }

	        // Lock wheels
	        if(Math.abs(wheel.brake) > Math.abs(wheel.engineForce)){
	            wheel.deltaRotation = 0;
	        }

	        wheel.rotation += wheel.deltaRotation; // Use the old value
	        wheel.deltaRotation *= 0.99; // damping of rotation when not in contact
	    }
	};

	RaycastVehicle.prototype.updateSuspension = function(deltaTime) {
	    var chassisBody = this.chassisBody;
	    var chassisMass = chassisBody.mass;
	    var wheelInfos = this.wheelInfos;
	    var numWheels = wheelInfos.length;

	    for (var w_it = 0; w_it < numWheels; w_it++){
	        var wheel = wheelInfos[w_it];

	        if (wheel.isInContact){
	            var force;

	            // Spring
	            var susp_length = wheel.suspensionRestLength;
	            var current_length = wheel.suspensionLength;
	            var length_diff = (susp_length - current_length);

	            force = wheel.suspensionStiffness * length_diff * wheel.clippedInvContactDotSuspension;

	            // Damper
	            var projected_rel_vel = wheel.suspensionRelativeVelocity;
	            var susp_damping;
	            if (projected_rel_vel < 0) {
	                susp_damping = wheel.dampingCompression;
	            } else {
	                susp_damping = wheel.dampingRelaxation;
	            }
	            force -= susp_damping * projected_rel_vel;

	            wheel.suspensionForce = force * chassisMass;
	            if (wheel.suspensionForce < 0) {
	                wheel.suspensionForce = 0;
	            }
	        } else {
	            wheel.suspensionForce = 0;
	        }
	    }
	};

	/**
	 * Remove the vehicle including its constraints from the world.
	 * @method removeFromWorld
	 * @param {World} world
	 */
	RaycastVehicle.prototype.removeFromWorld = function(world){
	    var constraints = this.constraints;
	    world.remove(this.chassisBody);
	    world.removeEventListener('preStep', this.preStepCallback);
	    this.world = null;
	};

	var castRay_rayvector = new Vec3();
	var castRay_target = new Vec3();
	RaycastVehicle.prototype.castRay = function(wheel) {
	    var rayvector = castRay_rayvector;
	    var target = castRay_target;

	    this.updateWheelTransformWorld(wheel);
	    var chassisBody = this.chassisBody;

	    var depth = -1;

	    var raylen = wheel.suspensionRestLength + wheel.radius;

	    wheel.directionWorld.scale(raylen, rayvector);
	    var source = wheel.chassisConnectionPointWorld;
	    source.vadd(rayvector, target);
	    var raycastResult = wheel.raycastResult;

	    var param = 0;

	    raycastResult.reset();
	    // Turn off ray collision with the chassis temporarily
	    var oldState = chassisBody.collisionResponse;
	    chassisBody.collisionResponse = false;

	    // Cast ray against world
	    this.world.rayTest(source, target, raycastResult);
	    chassisBody.collisionResponse = oldState;

	    var object = raycastResult.body;

	    wheel.raycastResult.groundObject = 0;

	    if (object) {
	        depth = raycastResult.distance;
	        wheel.raycastResult.hitNormalWorld  = raycastResult.hitNormalWorld;
	        wheel.isInContact = true;

	        var hitDistance = raycastResult.distance;
	        wheel.suspensionLength = hitDistance - wheel.radius;

	        // clamp on max suspension travel
	        var minSuspensionLength = wheel.suspensionRestLength - wheel.maxSuspensionTravel;
	        var maxSuspensionLength = wheel.suspensionRestLength + wheel.maxSuspensionTravel;
	        if (wheel.suspensionLength < minSuspensionLength) {
	            wheel.suspensionLength = minSuspensionLength;
	        }
	        if (wheel.suspensionLength > maxSuspensionLength) {
	            wheel.suspensionLength = maxSuspensionLength;
	            wheel.raycastResult.reset();
	        }

	        var denominator = wheel.raycastResult.hitNormalWorld.dot(wheel.directionWorld);

	        var chassis_velocity_at_contactPoint = new Vec3();
	        chassisBody.getVelocityAtWorldPoint(wheel.raycastResult.hitPointWorld, chassis_velocity_at_contactPoint);

	        var projVel = wheel.raycastResult.hitNormalWorld.dot( chassis_velocity_at_contactPoint );

	        if (denominator >= -0.1) {
	            wheel.suspensionRelativeVelocity = 0;
	            wheel.clippedInvContactDotSuspension = 1 / 0.1;
	        } else {
	            var inv = -1 / denominator;
	            wheel.suspensionRelativeVelocity = projVel * inv;
	            wheel.clippedInvContactDotSuspension = inv;
	        }

	    } else {

	        //put wheel info as in rest position
	        wheel.suspensionLength = wheel.suspensionRestLength + 0 * wheel.maxSuspensionTravel;
	        wheel.suspensionRelativeVelocity = 0.0;
	        wheel.directionWorld.scale(-1, wheel.raycastResult.hitNormalWorld);
	        wheel.clippedInvContactDotSuspension = 1.0;
	    }

	    return depth;
	};

	RaycastVehicle.prototype.updateWheelTransformWorld = function(wheel){
	    wheel.isInContact = false;
	    var chassisBody = this.chassisBody;
	    chassisBody.pointToWorldFrame(wheel.chassisConnectionPointLocal, wheel.chassisConnectionPointWorld);
	    chassisBody.vectorToWorldFrame(wheel.directionLocal, wheel.directionWorld);
	    chassisBody.vectorToWorldFrame(wheel.axleLocal, wheel.axleWorld);
	};


	/**
	 * Update one of the wheel transform.
	 * Note when rendering wheels: during each step, wheel transforms are updated BEFORE the chassis; ie. their position becomes invalid after the step. Thus when you render wheels, you must update wheel transforms before rendering them. See raycastVehicle demo for an example.
	 * @method updateWheelTransform
	 * @param {integer} wheelIndex The wheel index to update.
	 */
	RaycastVehicle.prototype.updateWheelTransform = function(wheelIndex){
	    var up = tmpVec4;
	    var right = tmpVec5;
	    var fwd = tmpVec6;

	    var wheel = this.wheelInfos[wheelIndex];
	    this.updateWheelTransformWorld(wheel);

	    wheel.directionLocal.scale(-1, up);
	    right.copy(wheel.axleLocal);
	    up.cross(right, fwd);
	    fwd.normalize();
	    right.normalize();

	    // Rotate around steering over the wheelAxle
	    var steering = wheel.steering;
	    var steeringOrn = new Quaternion();
	    steeringOrn.setFromAxisAngle(up, steering);

	    var rotatingOrn = new Quaternion();
	    rotatingOrn.setFromAxisAngle(right, wheel.rotation);

	    // World rotation of the wheel
	    var q = wheel.worldTransform.quaternion;
	    this.chassisBody.quaternion.mult(steeringOrn, q);
	    q.mult(rotatingOrn, q);

	    q.normalize();

	    // world position of the wheel
	    var p = wheel.worldTransform.position;
	    p.copy(wheel.directionWorld);
	    p.scale(wheel.suspensionLength, p);
	    p.vadd(wheel.chassisConnectionPointWorld, p);
	};

	var directions = [
	    new Vec3(1, 0, 0),
	    new Vec3(0, 1, 0),
	    new Vec3(0, 0, 1)
	];

	/**
	 * Get the world transform of one of the wheels
	 * @method getWheelTransformWorld
	 * @param  {integer} wheelIndex
	 * @return {Transform}
	 */
	RaycastVehicle.prototype.getWheelTransformWorld = function(wheelIndex) {
	    return this.wheelInfos[wheelIndex].worldTransform;
	};


	var updateFriction_surfNormalWS_scaled_proj = new Vec3();
	var updateFriction_axle = [];
	var updateFriction_forwardWS = [];
	var sideFrictionStiffness2 = 1;
	RaycastVehicle.prototype.updateFriction = function(timeStep) {
	    var surfNormalWS_scaled_proj = updateFriction_surfNormalWS_scaled_proj;

	    //calculate the impulse, so that the wheels don't move sidewards
	    var wheelInfos = this.wheelInfos;
	    var numWheels = wheelInfos.length;
	    var chassisBody = this.chassisBody;
	    var forwardWS = updateFriction_forwardWS;
	    var axle = updateFriction_axle;

	    var numWheelsOnGround = 0;

	    for (var i = 0; i < numWheels; i++) {
	        var wheel = wheelInfos[i];

	        var groundObject = wheel.raycastResult.body;
	        if (groundObject){
	            numWheelsOnGround++;
	        }

	        wheel.sideImpulse = 0;
	        wheel.forwardImpulse = 0;
	        if(!forwardWS[i]){
	            forwardWS[i] = new Vec3();
	        }
	        if(!axle[i]){
	            axle[i] = new Vec3();
	        }
	    }

	    for (var i = 0; i < numWheels; i++){
	        var wheel = wheelInfos[i];

	        var groundObject = wheel.raycastResult.body;

	        if (groundObject) {
	            var axlei = axle[i];
	            var wheelTrans = this.getWheelTransformWorld(i);

	            // Get world axle
	            wheelTrans.vectorToWorldFrame(directions[this.indexRightAxis], axlei);

	            var surfNormalWS = wheel.raycastResult.hitNormalWorld;
	            var proj = axlei.dot(surfNormalWS);
	            surfNormalWS.scale(proj, surfNormalWS_scaled_proj);
	            axlei.vsub(surfNormalWS_scaled_proj, axlei);
	            axlei.normalize();

	            surfNormalWS.cross(axlei, forwardWS[i]);
	            forwardWS[i].normalize();

	            wheel.sideImpulse = resolveSingleBilateral(
	                chassisBody,
	                wheel.raycastResult.hitPointWorld,
	                groundObject,
	                wheel.raycastResult.hitPointWorld,
	                axlei
	            );

	            wheel.sideImpulse *= sideFrictionStiffness2;
	        }
	    }

	    var sideFactor = 1;
	    var fwdFactor = 0.5;

	    this.sliding = false;
	    for (var i = 0; i < numWheels; i++) {
	        var wheel = wheelInfos[i];
	        var groundObject = wheel.raycastResult.body;

	        var rollingFriction = 0;

	        wheel.slipInfo = 1;
	        if (groundObject) {
	            var defaultRollingFrictionImpulse = 0;
	            var maxImpulse = wheel.brake ? wheel.brake : defaultRollingFrictionImpulse;

	            // btWheelContactPoint contactPt(chassisBody,groundObject,wheelInfraycastInfo.hitPointWorld,forwardWS[wheel],maxImpulse);
	            // rollingFriction = calcRollingFriction(contactPt);
	            rollingFriction = calcRollingFriction(chassisBody, groundObject, wheel.raycastResult.hitPointWorld, forwardWS[i], maxImpulse);

	            rollingFriction += wheel.engineForce * timeStep;

	            // rollingFriction = 0;
	            var factor = maxImpulse / rollingFriction;
	            wheel.slipInfo *= factor;
	        }

	        //switch between active rolling (throttle), braking and non-active rolling friction (nthrottle/break)

	        wheel.forwardImpulse = 0;
	        wheel.skidInfo = 1;

	        if (groundObject) {
	            wheel.skidInfo = 1;

	            var maximp = wheel.suspensionForce * timeStep * wheel.frictionSlip;
	            var maximpSide = maximp;

	            var maximpSquared = maximp * maximpSide;

	            wheel.forwardImpulse = rollingFriction;//wheelInfo.engineForce* timeStep;

	            var x = wheel.forwardImpulse * fwdFactor;
	            var y = wheel.sideImpulse * sideFactor;

	            var impulseSquared = x * x + y * y;

	            wheel.sliding = false;
	            if (impulseSquared > maximpSquared) {
	                this.sliding = true;
	                wheel.sliding = true;

	                var factor = maximp / Math.sqrt(impulseSquared);

	                wheel.skidInfo *= factor;
	            }
	        }
	    }

	    if (this.sliding) {
	        for (var i = 0; i < numWheels; i++) {
	            var wheel = wheelInfos[i];
	            if (wheel.sideImpulse !== 0) {
	                if (wheel.skidInfo < 1){
	                    wheel.forwardImpulse *= wheel.skidInfo;
	                    wheel.sideImpulse *= wheel.skidInfo;
	                }
	            }
	        }
	    }

	    // apply the impulses
	    for (var i = 0; i < numWheels; i++) {
	        var wheel = wheelInfos[i];

	        var rel_pos = new Vec3();
	        //wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, rel_pos);
	        // cannons applyimpulse is using world coord for the position
	        rel_pos.copy(wheel.raycastResult.hitPointWorld);

	        if (wheel.forwardImpulse !== 0) {
	            var impulse = new Vec3();
	            forwardWS[i].scale(wheel.forwardImpulse, impulse);
	            chassisBody.applyImpulse(impulse, rel_pos);
	        }

	        if (wheel.sideImpulse !== 0){
	            var groundObject = wheel.raycastResult.body;

	            var rel_pos2 = new Vec3();
	            //wheel.raycastResult.hitPointWorld.vsub(groundObject.position, rel_pos2);
	            rel_pos2.copy(wheel.raycastResult.hitPointWorld);
	            var sideImp = new Vec3();
	            axle[i].scale(wheel.sideImpulse, sideImp);

	            // Scale the relative position in the up direction with rollInfluence.
	            // If rollInfluence is 1, the impulse will be applied on the hitPoint (easy to roll over), if it is zero it will be applied in the same plane as the center of mass (not easy to roll over).
	            chassisBody.pointToLocalFrame(rel_pos, rel_pos);
	            rel_pos['xyz'[this.indexUpAxis]] *= wheel.rollInfluence;
	            chassisBody.pointToWorldFrame(rel_pos, rel_pos);
	            chassisBody.applyImpulse(sideImp, rel_pos);

	            //apply friction impulse on the ground
	            sideImp.scale(-1, sideImp);
	            groundObject.applyImpulse(sideImp, rel_pos2);
	        }
	    }
	};

	var calcRollingFriction_vel1 = new Vec3();
	var calcRollingFriction_vel2 = new Vec3();
	var calcRollingFriction_vel = new Vec3();

	function calcRollingFriction(body0, body1, frictionPosWorld, frictionDirectionWorld, maxImpulse) {
	    var j1 = 0;
	    var contactPosWorld = frictionPosWorld;

	    // var rel_pos1 = new Vec3();
	    // var rel_pos2 = new Vec3();
	    var vel1 = calcRollingFriction_vel1;
	    var vel2 = calcRollingFriction_vel2;
	    var vel = calcRollingFriction_vel;
	    // contactPosWorld.vsub(body0.position, rel_pos1);
	    // contactPosWorld.vsub(body1.position, rel_pos2);

	    body0.getVelocityAtWorldPoint(contactPosWorld, vel1);
	    body1.getVelocityAtWorldPoint(contactPosWorld, vel2);
	    vel1.vsub(vel2, vel);

	    var vrel = frictionDirectionWorld.dot(vel);

	    var denom0 = computeImpulseDenominator(body0, frictionPosWorld, frictionDirectionWorld);
	    var denom1 = computeImpulseDenominator(body1, frictionPosWorld, frictionDirectionWorld);
	    var relaxation = 1;
	    var jacDiagABInv = relaxation / (denom0 + denom1);

	    // calculate j that moves us to zero relative velocity
	    j1 = -vrel * jacDiagABInv;

	    if (maxImpulse < j1) {
	        j1 = maxImpulse;
	    }
	    if (j1 < -maxImpulse) {
	        j1 = -maxImpulse;
	    }

	    return j1;
	}

	var computeImpulseDenominator_r0 = new Vec3();
	var computeImpulseDenominator_c0 = new Vec3();
	var computeImpulseDenominator_vec = new Vec3();
	var computeImpulseDenominator_m = new Vec3();
	function computeImpulseDenominator(body, pos, normal) {
	    var r0 = computeImpulseDenominator_r0;
	    var c0 = computeImpulseDenominator_c0;
	    var vec = computeImpulseDenominator_vec;
	    var m = computeImpulseDenominator_m;

	    pos.vsub(body.position, r0);
	    r0.cross(normal, c0);
	    body.invInertiaWorld.vmult(c0, m);
	    m.cross(r0, vec);

	    return body.invMass + normal.dot(vec);
	}


	var resolveSingleBilateral_vel1 = new Vec3();
	var resolveSingleBilateral_vel2 = new Vec3();
	var resolveSingleBilateral_vel = new Vec3();

	//bilateral constraint between two dynamic objects
	function resolveSingleBilateral(body1, pos1, body2, pos2, normal, impulse){
	    var normalLenSqr = normal.norm2();
	    if (normalLenSqr > 1.1){
	        return 0; // no impulse
	    }
	    // var rel_pos1 = new Vec3();
	    // var rel_pos2 = new Vec3();
	    // pos1.vsub(body1.position, rel_pos1);
	    // pos2.vsub(body2.position, rel_pos2);

	    var vel1 = resolveSingleBilateral_vel1;
	    var vel2 = resolveSingleBilateral_vel2;
	    var vel = resolveSingleBilateral_vel;
	    body1.getVelocityAtWorldPoint(pos1, vel1);
	    body2.getVelocityAtWorldPoint(pos2, vel2);

	    vel1.vsub(vel2, vel);

	    var rel_vel = normal.dot(vel);

	    var contactDamping = 0.2;
	    var massTerm = 1 / (body1.invMass + body2.invMass);
	    var impulse = - contactDamping * rel_vel * massTerm;

	    return impulse;
	}
	},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(_dereq_,module,exports){
	var Body = _dereq_('./Body');
	var Sphere = _dereq_('../shapes/Sphere');
	var Box = _dereq_('../shapes/Box');
	var Vec3 = _dereq_('../math/Vec3');
	var HingeConstraint = _dereq_('../constraints/HingeConstraint');

	module.exports = RigidVehicle;

	/**
	 * Simple vehicle helper class with spherical rigid body wheels.
	 * @class RigidVehicle
	 * @constructor
	 * @param {Body} [options.chassisBody]
	 */
	function RigidVehicle(options){
	    this.wheelBodies = [];

	    /**
	     * @property coordinateSystem
	     * @type {Vec3}
	     */
	    this.coordinateSystem = typeof(options.coordinateSystem)==='undefined' ? new Vec3(1, 2, 3) : options.coordinateSystem.clone();

	    /**
	     * @property {Body} chassisBody
	     */
	    this.chassisBody = options.chassisBody;

	    if(!this.chassisBody){
	        // No chassis body given. Create it!
	        var chassisShape = new Box(new Vec3(5, 2, 0.5));
	        this.chassisBody = new Body(1, chassisShape);
	    }

	    /**
	     * @property constraints
	     * @type {Array}
	     */
	    this.constraints = [];

	    this.wheelAxes = [];
	    this.wheelForces = [];
	}

	/**
	 * Add a wheel
	 * @method addWheel
	 * @param {object} options
	 * @param {boolean} [options.isFrontWheel]
	 * @param {Vec3} [options.position] Position of the wheel, locally in the chassis body.
	 * @param {Vec3} [options.direction] Slide direction of the wheel along the suspension.
	 * @param {Vec3} [options.axis] Axis of rotation of the wheel, locally defined in the chassis.
	 * @param {Body} [options.body] The wheel body.
	 */
	RigidVehicle.prototype.addWheel = function(options){
	    options = options || {};
	    var wheelBody = options.body;
	    if(!wheelBody){
	        wheelBody =  new Body(1, new Sphere(1.2));
	    }
	    this.wheelBodies.push(wheelBody);
	    this.wheelForces.push(0);

	    // Position constrain wheels
	    var zero = new Vec3();
	    var position = typeof(options.position) !== 'undefined' ? options.position.clone() : new Vec3();

	    // Set position locally to the chassis
	    var worldPosition = new Vec3();
	    this.chassisBody.pointToWorldFrame(position, worldPosition);
	    wheelBody.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

	    // Constrain wheel
	    var axis = typeof(options.axis) !== 'undefined' ? options.axis.clone() : new Vec3(0, 1, 0);
	    this.wheelAxes.push(axis);

	    var hingeConstraint = new HingeConstraint(this.chassisBody, wheelBody, {
	        pivotA: position,
	        axisA: axis,
	        pivotB: Vec3.ZERO,
	        axisB: axis,
	        collideConnected: false
	    });
	    this.constraints.push(hingeConstraint);

	    return this.wheelBodies.length - 1;
	};

	/**
	 * Set the steering value of a wheel.
	 * @method setSteeringValue
	 * @param {number} value
	 * @param {integer} wheelIndex
	 * @todo check coordinateSystem
	 */
	RigidVehicle.prototype.setSteeringValue = function(value, wheelIndex){
	    // Set angle of the hinge axis
	    var axis = this.wheelAxes[wheelIndex];

	    var c = Math.cos(value),
	        s = Math.sin(value),
	        x = axis.x,
	        y = axis.y;
	    this.constraints[wheelIndex].axisA.set(
	        c*x -s*y,
	        s*x +c*y,
	        0
	    );
	};

	/**
	 * Set the target rotational speed of the hinge constraint.
	 * @method setMotorSpeed
	 * @param {number} value
	 * @param {integer} wheelIndex
	 */
	RigidVehicle.prototype.setMotorSpeed = function(value, wheelIndex){
	    var hingeConstraint = this.constraints[wheelIndex];
	    hingeConstraint.enableMotor();
	    hingeConstraint.motorTargetVelocity = value;
	};

	/**
	 * Set the target rotational speed of the hinge constraint.
	 * @method disableMotor
	 * @param {number} value
	 * @param {integer} wheelIndex
	 */
	RigidVehicle.prototype.disableMotor = function(wheelIndex){
	    var hingeConstraint = this.constraints[wheelIndex];
	    hingeConstraint.disableMotor();
	};

	var torque = new Vec3();

	/**
	 * Set the wheel force to apply on one of the wheels each time step
	 * @method setWheelForce
	 * @param  {number} value
	 * @param  {integer} wheelIndex
	 */
	RigidVehicle.prototype.setWheelForce = function(value, wheelIndex){
	    this.wheelForces[wheelIndex] = value;
	};

	/**
	 * Apply a torque on one of the wheels.
	 * @method applyWheelForce
	 * @param  {number} value
	 * @param  {integer} wheelIndex
	 */
	RigidVehicle.prototype.applyWheelForce = function(value, wheelIndex){
	    var axis = this.wheelAxes[wheelIndex];
	    var wheelBody = this.wheelBodies[wheelIndex];
	    var bodyTorque = wheelBody.torque;

	    axis.scale(value, torque);
	    wheelBody.vectorToWorldFrame(torque, torque);
	    bodyTorque.vadd(torque, bodyTorque);
	};

	/**
	 * Add the vehicle including its constraints to the world.
	 * @method addToWorld
	 * @param {World} world
	 */
	RigidVehicle.prototype.addToWorld = function(world){
	    var constraints = this.constraints;
	    var bodies = this.wheelBodies.concat([this.chassisBody]);

	    for (var i = 0; i < bodies.length; i++) {
	        world.add(bodies[i]);
	    }

	    for (var i = 0; i < constraints.length; i++) {
	        world.addConstraint(constraints[i]);
	    }

	    world.addEventListener('preStep', this._update.bind(this));
	};

	RigidVehicle.prototype._update = function(){
	    var wheelForces = this.wheelForces;
	    for (var i = 0; i < wheelForces.length; i++) {
	        this.applyWheelForce(wheelForces[i], i);
	    }
	};

	/**
	 * Remove the vehicle including its constraints from the world.
	 * @method removeFromWorld
	 * @param {World} world
	 */
	RigidVehicle.prototype.removeFromWorld = function(world){
	    var constraints = this.constraints;
	    var bodies = this.wheelBodies.concat([this.chassisBody]);

	    for (var i = 0; i < bodies.length; i++) {
	        world.remove(bodies[i]);
	    }

	    for (var i = 0; i < constraints.length; i++) {
	        world.removeConstraint(constraints[i]);
	    }
	};

	var worldAxis = new Vec3();

	/**
	 * Get current rotational velocity of a wheel
	 * @method getWheelSpeed
	 * @param {integer} wheelIndex
	 */
	RigidVehicle.prototype.getWheelSpeed = function(wheelIndex){
	    var axis = this.wheelAxes[wheelIndex];
	    var wheelBody = this.wheelBodies[wheelIndex];
	    var w = wheelBody.angularVelocity;
	    this.chassisBody.vectorToWorldFrame(axis, worldAxis);
	    return w.dot(worldAxis);
	};

	},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(_dereq_,module,exports){
	module.exports = SPHSystem;

	var Shape = _dereq_('../shapes/Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Particle = _dereq_('../shapes/Particle');
	var Body = _dereq_('../objects/Body');
	var Material = _dereq_('../material/Material');

	/**
	 * Smoothed-particle hydrodynamics system
	 * @class SPHSystem
	 * @constructor
	 */
	function SPHSystem(){
	    this.particles = [];
		
	    /**
	     * Density of the system (kg/m3).
	     * @property {number} density
	     */
	    this.density = 1;
		
	    /**
	     * Distance below which two particles are considered to be neighbors.
	     * It should be adjusted so there are about 15-20 neighbor particles within this radius.
	     * @property {number} smoothingRadius
	     */
	    this.smoothingRadius = 1;
	    this.speedOfSound = 1;
		
	    /**
	     * Viscosity of the system.
	     * @property {number} viscosity
	     */
	    this.viscosity = 0.01;
	    this.eps = 0.000001;

	    // Stuff Computed per particle
	    this.pressures = [];
	    this.densities = [];
	    this.neighbors = [];
	}

	/**
	 * Add a particle to the system.
	 * @method add
	 * @param {Body} particle
	 */
	SPHSystem.prototype.add = function(particle){
	    this.particles.push(particle);
	    if(this.neighbors.length < this.particles.length){
	        this.neighbors.push([]);
	    }
	};

	/**
	 * Remove a particle from the system.
	 * @method remove
	 * @param {Body} particle
	 */
	SPHSystem.prototype.remove = function(particle){
	    var idx = this.particles.indexOf(particle);
	    if(idx !== -1){
	        this.particles.splice(idx,1);
	        if(this.neighbors.length > this.particles.length){
	            this.neighbors.pop();
	        }
	    }
	};

	/**
	 * Get neighbors within smoothing volume, save in the array neighbors
	 * @method getNeighbors
	 * @param {Body} particle
	 * @param {Array} neighbors
	 */
	var SPHSystem_getNeighbors_dist = new Vec3();
	SPHSystem.prototype.getNeighbors = function(particle,neighbors){
	    var N = this.particles.length,
	        id = particle.id,
	        R2 = this.smoothingRadius * this.smoothingRadius,
	        dist = SPHSystem_getNeighbors_dist;
	    for(var i=0; i!==N; i++){
	        var p = this.particles[i];
	        p.position.vsub(particle.position,dist);
	        if(id!==p.id && dist.norm2() < R2){
	            neighbors.push(p);
	        }
	    }
	};

	// Temp vectors for calculation
	var SPHSystem_update_dist = new Vec3(),
	    SPHSystem_update_a_pressure = new Vec3(),
	    SPHSystem_update_a_visc = new Vec3(),
	    SPHSystem_update_gradW = new Vec3(),
	    SPHSystem_update_r_vec = new Vec3(),
	    SPHSystem_update_u = new Vec3(); // Relative velocity
	SPHSystem.prototype.update = function(){
	    var N = this.particles.length,
	        dist = SPHSystem_update_dist,
	        cs = this.speedOfSound,
	        eps = this.eps;

	    for(var i=0; i!==N; i++){
	        var p = this.particles[i]; // Current particle
	        var neighbors = this.neighbors[i];

	        // Get neighbors
	        neighbors.length = 0;
	        this.getNeighbors(p,neighbors);
	        neighbors.push(this.particles[i]); // Add current too
	        var numNeighbors = neighbors.length;

	        // Accumulate density for the particle
	        var sum = 0.0;
	        for(var j=0; j!==numNeighbors; j++){

	            //printf("Current particle has position %f %f %f\n",objects[id].pos.x(),objects[id].pos.y(),objects[id].pos.z());
	            p.position.vsub(neighbors[j].position, dist);
	            var len = dist.norm();

	            var weight = this.w(len);
	            sum += neighbors[j].mass * weight;
	        }

	        // Save
	        this.densities[i] = sum;
	        this.pressures[i] = cs * cs * (this.densities[i] - this.density);
	    }

	    // Add forces

	    // Sum to these accelerations
	    var a_pressure= SPHSystem_update_a_pressure;
	    var a_visc =    SPHSystem_update_a_visc;
	    var gradW =     SPHSystem_update_gradW;
	    var r_vec =     SPHSystem_update_r_vec;
	    var u =         SPHSystem_update_u;

	    for(var i=0; i!==N; i++){

	        var particle = this.particles[i];

	        a_pressure.set(0,0,0);
	        a_visc.set(0,0,0);

	        // Init vars
	        var Pij;
	        var nabla;
	        var Vij;

	        // Sum up for all other neighbors
	        var neighbors = this.neighbors[i];
	        var numNeighbors = neighbors.length;

	        //printf("Neighbors: ");
	        for(var j=0; j!==numNeighbors; j++){

	            var neighbor = neighbors[j];
	            //printf("%d ",nj);

	            // Get r once for all..
	            particle.position.vsub(neighbor.position,r_vec);
	            var r = r_vec.norm();

	            // Pressure contribution
	            Pij = -neighbor.mass * (this.pressures[i] / (this.densities[i]*this.densities[i] + eps) + this.pressures[j] / (this.densities[j]*this.densities[j] + eps));
	            this.gradw(r_vec, gradW);
	            // Add to pressure acceleration
	            gradW.mult(Pij , gradW);
	            a_pressure.vadd(gradW, a_pressure);

	            // Viscosity contribution
	            neighbor.velocity.vsub(particle.velocity, u);
	            u.mult( 1.0 / (0.0001+this.densities[i] * this.densities[j]) * this.viscosity * neighbor.mass , u );
	            nabla = this.nablaw(r);
	            u.mult(nabla,u);
	            // Add to viscosity acceleration
	            a_visc.vadd( u, a_visc );
	        }

	        // Calculate force
	        a_visc.mult(particle.mass, a_visc);
	        a_pressure.mult(particle.mass, a_pressure);

	        // Add force to particles
	        particle.force.vadd(a_visc, particle.force);
	        particle.force.vadd(a_pressure, particle.force);
	    }
	};

	// Calculate the weight using the W(r) weightfunction
	SPHSystem.prototype.w = function(r){
	    // 315
	    var h = this.smoothingRadius;
	    return 315.0/(64.0*Math.PI*Math.pow(h,9)) * Math.pow(h*h-r*r,3);
	};

	// calculate gradient of the weight function
	SPHSystem.prototype.gradw = function(rVec,resultVec){
	    var r = rVec.norm(),
	        h = this.smoothingRadius;
	    rVec.mult(945.0/(32.0*Math.PI*Math.pow(h,9)) * Math.pow((h*h-r*r),2) , resultVec);
	};

	// Calculate nabla(W)
	SPHSystem.prototype.nablaw = function(r){
	    var h = this.smoothingRadius;
	    var nabla = 945.0/(32.0*Math.PI*Math.pow(h,9)) * (h*h-r*r)*(7*r*r - 3*h*h);
	    return nabla;
	};

	},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(_dereq_,module,exports){
	var Vec3 = _dereq_('../math/Vec3');

	module.exports = Spring;

	/**
	 * A spring, connecting two bodies.
	 *
	 * @class Spring
	 * @constructor
	 * @param {Body} bodyA
	 * @param {Body} bodyB
	 * @param {Object} [options]
	 * @param {number} [options.restLength]   A number > 0. Default: 1
	 * @param {number} [options.stiffness]    A number >= 0. Default: 100
	 * @param {number} [options.damping]      A number >= 0. Default: 1
	 * @param {Vec3}  [options.worldAnchorA] Where to hook the spring to body A, in world coordinates.
	 * @param {Vec3}  [options.worldAnchorB]
	 * @param {Vec3}  [options.localAnchorA] Where to hook the spring to body A, in local body coordinates.
	 * @param {Vec3}  [options.localAnchorB]
	 */
	function Spring(bodyA,bodyB,options){
	    options = options || {};

	    /**
	     * Rest length of the spring.
	     * @property restLength
	     * @type {number}
	     */
	    this.restLength = typeof(options.restLength) === "number" ? options.restLength : 1;

	    /**
	     * Stiffness of the spring.
	     * @property stiffness
	     * @type {number}
	     */
	    this.stiffness = options.stiffness || 100;

	    /**
	     * Damping of the spring.
	     * @property damping
	     * @type {number}
	     */
	    this.damping = options.damping || 1;

	    /**
	     * First connected body.
	     * @property bodyA
	     * @type {Body}
	     */
	    this.bodyA = bodyA;

	    /**
	     * Second connected body.
	     * @property bodyB
	     * @type {Body}
	     */
	    this.bodyB = bodyB;

	    /**
	     * Anchor for bodyA in local bodyA coordinates.
	     * @property localAnchorA
	     * @type {Vec3}
	     */
	    this.localAnchorA = new Vec3();

	    /**
	     * Anchor for bodyB in local bodyB coordinates.
	     * @property localAnchorB
	     * @type {Vec3}
	     */
	    this.localAnchorB = new Vec3();

	    if(options.localAnchorA){
	        this.localAnchorA.copy(options.localAnchorA);
	    }
	    if(options.localAnchorB){
	        this.localAnchorB.copy(options.localAnchorB);
	    }
	    if(options.worldAnchorA){
	        this.setWorldAnchorA(options.worldAnchorA);
	    }
	    if(options.worldAnchorB){
	        this.setWorldAnchorB(options.worldAnchorB);
	    }
	}

	/**
	 * Set the anchor point on body A, using world coordinates.
	 * @method setWorldAnchorA
	 * @param {Vec3} worldAnchorA
	 */
	Spring.prototype.setWorldAnchorA = function(worldAnchorA){
	    this.bodyA.pointToLocalFrame(worldAnchorA,this.localAnchorA);
	};

	/**
	 * Set the anchor point on body B, using world coordinates.
	 * @method setWorldAnchorB
	 * @param {Vec3} worldAnchorB
	 */
	Spring.prototype.setWorldAnchorB = function(worldAnchorB){
	    this.bodyB.pointToLocalFrame(worldAnchorB,this.localAnchorB);
	};

	/**
	 * Get the anchor point on body A, in world coordinates.
	 * @method getWorldAnchorA
	 * @param {Vec3} result The vector to store the result in.
	 */
	Spring.prototype.getWorldAnchorA = function(result){
	    this.bodyA.pointToWorldFrame(this.localAnchorA,result);
	};

	/**
	 * Get the anchor point on body B, in world coordinates.
	 * @method getWorldAnchorB
	 * @param {Vec3} result The vector to store the result in.
	 */
	Spring.prototype.getWorldAnchorB = function(result){
	    this.bodyB.pointToWorldFrame(this.localAnchorB,result);
	};

	var applyForce_r =              new Vec3(),
	    applyForce_r_unit =         new Vec3(),
	    applyForce_u =              new Vec3(),
	    applyForce_f =              new Vec3(),
	    applyForce_worldAnchorA =   new Vec3(),
	    applyForce_worldAnchorB =   new Vec3(),
	    applyForce_ri =             new Vec3(),
	    applyForce_rj =             new Vec3(),
	    applyForce_ri_x_f =         new Vec3(),
	    applyForce_rj_x_f =         new Vec3(),
	    applyForce_tmp =            new Vec3();

	/**
	 * Apply the spring force to the connected bodies.
	 * @method applyForce
	 */
	Spring.prototype.applyForce = function(){
	    var k = this.stiffness,
	        d = this.damping,
	        l = this.restLength,
	        bodyA = this.bodyA,
	        bodyB = this.bodyB,
	        r = applyForce_r,
	        r_unit = applyForce_r_unit,
	        u = applyForce_u,
	        f = applyForce_f,
	        tmp = applyForce_tmp;

	    var worldAnchorA = applyForce_worldAnchorA,
	        worldAnchorB = applyForce_worldAnchorB,
	        ri = applyForce_ri,
	        rj = applyForce_rj,
	        ri_x_f = applyForce_ri_x_f,
	        rj_x_f = applyForce_rj_x_f;

	    // Get world anchors
	    this.getWorldAnchorA(worldAnchorA);
	    this.getWorldAnchorB(worldAnchorB);

	    // Get offset points
	    worldAnchorA.vsub(bodyA.position,ri);
	    worldAnchorB.vsub(bodyB.position,rj);

	    // Compute distance vector between world anchor points
	    worldAnchorB.vsub(worldAnchorA,r);
	    var rlen = r.norm();
	    r_unit.copy(r);
	    r_unit.normalize();

	    // Compute relative velocity of the anchor points, u
	    bodyB.velocity.vsub(bodyA.velocity,u);
	    // Add rotational velocity

	    bodyB.angularVelocity.cross(rj,tmp);
	    u.vadd(tmp,u);
	    bodyA.angularVelocity.cross(ri,tmp);
	    u.vsub(tmp,u);

	    // F = - k * ( x - L ) - D * ( u )
	    r_unit.mult(-k*(rlen-l) - d*u.dot(r_unit), f);

	    // Add forces to bodies
	    bodyA.force.vsub(f,bodyA.force);
	    bodyB.force.vadd(f,bodyB.force);

	    // Angular force
	    ri.cross(f,ri_x_f);
	    rj.cross(f,rj_x_f);
	    bodyA.torque.vsub(ri_x_f,bodyA.torque);
	    bodyB.torque.vadd(rj_x_f,bodyB.torque);
	};

	},{"../math/Vec3":30}],36:[function(_dereq_,module,exports){
	var Vec3 = _dereq_('../math/Vec3');
	var Transform = _dereq_('../math/Transform');
	var RaycastResult = _dereq_('../collision/RaycastResult');
	var Utils = _dereq_('../utils/Utils');

	module.exports = WheelInfo;

	/**
	 * @class WheelInfo
	 * @constructor
	 * @param {Object} [options]
	 *
	 * @param {Vec3} [options.chassisConnectionPointLocal]
	 * @param {Vec3} [options.chassisConnectionPointWorld]
	 * @param {Vec3} [options.directionLocal]
	 * @param {Vec3} [options.directionWorld]
	 * @param {Vec3} [options.axleLocal]
	 * @param {Vec3} [options.axleWorld]
	 * @param {number} [options.suspensionRestLength=1]
	 * @param {number} [options.suspensionMaxLength=2]
	 * @param {number} [options.radius=1]
	 * @param {number} [options.suspensionStiffness=100]
	 * @param {number} [options.dampingCompression=10]
	 * @param {number} [options.dampingRelaxation=10]
	 * @param {number} [options.frictionSlip=10000]
	 * @param {number} [options.steering=0]
	 * @param {number} [options.rotation=0]
	 * @param {number} [options.deltaRotation=0]
	 * @param {number} [options.rollInfluence=0.01]
	 * @param {number} [options.maxSuspensionForce]
	 * @param {boolean} [options.isFrontWheel=true]
	 * @param {number} [options.clippedInvContactDotSuspension=1]
	 * @param {number} [options.suspensionRelativeVelocity=0]
	 * @param {number} [options.suspensionForce=0]
	 * @param {number} [options.skidInfo=0]
	 * @param {number} [options.suspensionLength=0]
	 * @param {number} [options.maxSuspensionTravel=1]
	 * @param {boolean} [options.useCustomSlidingRotationalSpeed=false]
	 * @param {number} [options.customSlidingRotationalSpeed=-0.1]
	 */
	function WheelInfo(options){
	    options = Utils.defaults(options, {
	        chassisConnectionPointLocal: new Vec3(),
	        chassisConnectionPointWorld: new Vec3(),
	        directionLocal: new Vec3(),
	        directionWorld: new Vec3(),
	        axleLocal: new Vec3(),
	        axleWorld: new Vec3(),
	        suspensionRestLength: 1,
	        suspensionMaxLength: 2,
	        radius: 1,
	        suspensionStiffness: 100,
	        dampingCompression: 10,
	        dampingRelaxation: 10,
	        frictionSlip: 10000,
	        steering: 0,
	        rotation: 0,
	        deltaRotation: 0,
	        rollInfluence: 0.01,
	        maxSuspensionForce: Number.MAX_VALUE,
	        isFrontWheel: true,
	        clippedInvContactDotSuspension: 1,
	        suspensionRelativeVelocity: 0,
	        suspensionForce: 0,
	        skidInfo: 0,
	        suspensionLength: 0,
	        maxSuspensionTravel: 1,
	        useCustomSlidingRotationalSpeed: false,
	        customSlidingRotationalSpeed: -0.1
	    });

	    /**
	     * Max travel distance of the suspension, in meters.
	     * @property {number} maxSuspensionTravel
	     */
	    this.maxSuspensionTravel = options.maxSuspensionTravel;

	    /**
	     * Speed to apply to the wheel rotation when the wheel is sliding.
	     * @property {number} customSlidingRotationalSpeed
	     */
	    this.customSlidingRotationalSpeed = options.customSlidingRotationalSpeed;

	    /**
	     * If the customSlidingRotationalSpeed should be used.
	     * @property {Boolean} useCustomSlidingRotationalSpeed
	     */
	    this.useCustomSlidingRotationalSpeed = options.useCustomSlidingRotationalSpeed;

	    /**
	     * @property {Boolean} sliding
	     */
	    this.sliding = false;

	    /**
	     * Connection point, defined locally in the chassis body frame.
	     * @property {Vec3} chassisConnectionPointLocal
	     */
	    this.chassisConnectionPointLocal = options.chassisConnectionPointLocal.clone();

	    /**
	     * @property {Vec3} chassisConnectionPointWorld
	     */
	    this.chassisConnectionPointWorld = options.chassisConnectionPointWorld.clone();

	    /**
	     * @property {Vec3} directionLocal
	     */
	    this.directionLocal = options.directionLocal.clone();

	    /**
	     * @property {Vec3} directionWorld
	     */
	    this.directionWorld = options.directionWorld.clone();

	    /**
	     * @property {Vec3} axleLocal
	     */
	    this.axleLocal = options.axleLocal.clone();

	    /**
	     * @property {Vec3} axleWorld
	     */
	    this.axleWorld = options.axleWorld.clone();

	    /**
	     * @property {number} suspensionRestLength
	     */
	    this.suspensionRestLength = options.suspensionRestLength;

	    /**
	     * @property {number} suspensionMaxLength
	     */
	    this.suspensionMaxLength = options.suspensionMaxLength;

	    /**
	     * @property {number} radius
	     */
	    this.radius = options.radius;

	    /**
	     * @property {number} suspensionStiffness
	     */
	    this.suspensionStiffness = options.suspensionStiffness;

	    /**
	     * @property {number} dampingCompression
	     */
	    this.dampingCompression = options.dampingCompression;

	    /**
	     * @property {number} dampingRelaxation
	     */
	    this.dampingRelaxation = options.dampingRelaxation;

	    /**
	     * @property {number} frictionSlip
	     */
	    this.frictionSlip = options.frictionSlip;

	    /**
	     * @property {number} steering
	     */
	    this.steering = 0;

	    /**
	     * Rotation value, in radians.
	     * @property {number} rotation
	     */
	    this.rotation = 0;

	    /**
	     * @property {number} deltaRotation
	     */
	    this.deltaRotation = 0;

	    /**
	     * @property {number} rollInfluence
	     */
	    this.rollInfluence = options.rollInfluence;

	    /**
	     * @property {number} maxSuspensionForce
	     */
	    this.maxSuspensionForce = options.maxSuspensionForce;

	    /**
	     * @property {number} engineForce
	     */
	    this.engineForce = 0;

	    /**
	     * @property {number} brake
	     */
	    this.brake = 0;

	    /**
	     * @property {number} isFrontWheel
	     */
	    this.isFrontWheel = options.isFrontWheel;

	    /**
	     * @property {number} clippedInvContactDotSuspension
	     */
	    this.clippedInvContactDotSuspension = 1;

	    /**
	     * @property {number} suspensionRelativeVelocity
	     */
	    this.suspensionRelativeVelocity = 0;

	    /**
	     * @property {number} suspensionForce
	     */
	    this.suspensionForce = 0;

	    /**
	     * @property {number} skidInfo
	     */
	    this.skidInfo = 0;

	    /**
	     * @property {number} suspensionLength
	     */
	    this.suspensionLength = 0;

	    /**
	     * @property {number} sideImpulse
	     */
	    this.sideImpulse = 0;

	    /**
	     * @property {number} forwardImpulse
	     */
	    this.forwardImpulse = 0;

	    /**
	     * The result from raycasting
	     * @property {RaycastResult} raycastResult
	     */
	    this.raycastResult = new RaycastResult();

	    /**
	     * Wheel world transform
	     * @property {Transform} worldTransform
	     */
	    this.worldTransform = new Transform();

	    /**
	     * @property {boolean} isInContact
	     */
	    this.isInContact = false;
	}

	var chassis_velocity_at_contactPoint = new Vec3();
	var relpos = new Vec3();
	var chassis_velocity_at_contactPoint = new Vec3();
	WheelInfo.prototype.updateWheel = function(chassis){
	    var raycastResult = this.raycastResult;

	    if (this.isInContact){
	        var project= raycastResult.hitNormalWorld.dot(raycastResult.directionWorld);
	        raycastResult.hitPointWorld.vsub(chassis.position, relpos);
	        chassis.getVelocityAtWorldPoint(relpos, chassis_velocity_at_contactPoint);
	        var projVel = raycastResult.hitNormalWorld.dot( chassis_velocity_at_contactPoint );
	        if (project >= -0.1) {
	            this.suspensionRelativeVelocity = 0.0;
	            this.clippedInvContactDotSuspension = 1.0 / 0.1;
	        } else {
	            var inv = -1 / project;
	            this.suspensionRelativeVelocity = projVel * inv;
	            this.clippedInvContactDotSuspension = inv;
	        }

	    } else {
	        // Not in contact : position wheel in a nice (rest length) position
	        raycastResult.suspensionLength = this.suspensionRestLength;
	        this.suspensionRelativeVelocity = 0.0;
	        raycastResult.directionWorld.scale(-1, raycastResult.hitNormalWorld);
	        this.clippedInvContactDotSuspension = 1.0;
	    }
	};
	},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(_dereq_,module,exports){
	module.exports = Box;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');

	/**
	 * A 3d box shape.
	 * @class Box
	 * @constructor
	 * @param {Vec3} halfExtents
	 * @author schteppe
	 * @extends Shape
	 */
	function Box(halfExtents){
	    Shape.call(this);

	    this.type = Shape.types.BOX;

	    /**
	     * @property halfExtents
	     * @type {Vec3}
	     */
	    this.halfExtents = halfExtents;

	    /**
	     * Used by the contact generator to make contacts with other convex polyhedra for example
	     * @property convexPolyhedronRepresentation
	     * @type {ConvexPolyhedron}
	     */
	    this.convexPolyhedronRepresentation = null;

	    this.updateConvexPolyhedronRepresentation();
	    this.updateBoundingSphereRadius();
	}
	Box.prototype = new Shape();
	Box.prototype.constructor = Box;

	/**
	 * Updates the local convex polyhedron representation used for some collisions.
	 * @method updateConvexPolyhedronRepresentation
	 */
	Box.prototype.updateConvexPolyhedronRepresentation = function(){
	    var sx = this.halfExtents.x;
	    var sy = this.halfExtents.y;
	    var sz = this.halfExtents.z;
	    var V = Vec3;

	    var vertices = [
	        new V(-sx,-sy,-sz),
	        new V( sx,-sy,-sz),
	        new V( sx, sy,-sz),
	        new V(-sx, sy,-sz),
	        new V(-sx,-sy, sz),
	        new V( sx,-sy, sz),
	        new V( sx, sy, sz),
	        new V(-sx, sy, sz)
	    ];

	    var indices = [
	        [3,2,1,0], // -z
	        [4,5,6,7], // +z
	        [5,4,0,1], // -y
	        [2,3,7,6], // +y
	        [0,4,7,3], // -x
	        [1,2,6,5], // +x
	    ];

	    var axes = [
	        new V(0, 0, 1),
	        new V(0, 1, 0),
	        new V(1, 0, 0)
	    ];

	    var h = new ConvexPolyhedron(vertices, indices);
	    this.convexPolyhedronRepresentation = h;
	    h.material = this.material;
	};

	/**
	 * @method calculateLocalInertia
	 * @param  {Number} mass
	 * @param  {Vec3} target
	 * @return {Vec3}
	 */
	Box.prototype.calculateLocalInertia = function(mass,target){
	    target = target || new Vec3();
	    Box.calculateInertia(this.halfExtents, mass, target);
	    return target;
	};

	Box.calculateInertia = function(halfExtents,mass,target){
	    var e = halfExtents;
	    target.x = 1.0 / 12.0 * mass * (   2*e.y*2*e.y + 2*e.z*2*e.z );
	    target.y = 1.0 / 12.0 * mass * (   2*e.x*2*e.x + 2*e.z*2*e.z );
	    target.z = 1.0 / 12.0 * mass * (   2*e.y*2*e.y + 2*e.x*2*e.x );
	};

	/**
	 * Get the box 6 side normals
	 * @method getSideNormals
	 * @param {array}      sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
	 * @param {Quaternion} quat             Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
	 * @return {array}
	 */
	Box.prototype.getSideNormals = function(sixTargetVectors,quat){
	    var sides = sixTargetVectors;
	    var ex = this.halfExtents;
	    sides[0].set(  ex.x,     0,     0);
	    sides[1].set(     0,  ex.y,     0);
	    sides[2].set(     0,     0,  ex.z);
	    sides[3].set( -ex.x,     0,     0);
	    sides[4].set(     0, -ex.y,     0);
	    sides[5].set(     0,     0, -ex.z);

	    if(quat!==undefined){
	        for(var i=0; i!==sides.length; i++){
	            quat.vmult(sides[i],sides[i]);
	        }
	    }

	    return sides;
	};

	Box.prototype.volume = function(){
	    return 8.0 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
	};

	Box.prototype.updateBoundingSphereRadius = function(){
	    this.boundingSphereRadius = this.halfExtents.norm();
	};

	var worldCornerTempPos = new Vec3();
	var worldCornerTempNeg = new Vec3();
	Box.prototype.forEachWorldCorner = function(pos,quat,callback){

	    var e = this.halfExtents;
	    var corners = [[  e.x,  e.y,  e.z],
	                   [ -e.x,  e.y,  e.z],
	                   [ -e.x, -e.y,  e.z],
	                   [ -e.x, -e.y, -e.z],
	                   [  e.x, -e.y, -e.z],
	                   [  e.x,  e.y, -e.z],
	                   [ -e.x,  e.y, -e.z],
	                   [  e.x, -e.y,  e.z]];
	    for(var i=0; i<corners.length; i++){
	        worldCornerTempPos.set(corners[i][0],corners[i][1],corners[i][2]);
	        quat.vmult(worldCornerTempPos,worldCornerTempPos);
	        pos.vadd(worldCornerTempPos,worldCornerTempPos);
	        callback(worldCornerTempPos.x,
	                 worldCornerTempPos.y,
	                 worldCornerTempPos.z);
	    }
	};

	var worldCornersTemp = [
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3(),
	    new Vec3()
	];
	Box.prototype.calculateWorldAABB = function(pos,quat,min,max){

	    var e = this.halfExtents;
	    worldCornersTemp[0].set(e.x, e.y, e.z);
	    worldCornersTemp[1].set(-e.x,  e.y, e.z);
	    worldCornersTemp[2].set(-e.x, -e.y, e.z);
	    worldCornersTemp[3].set(-e.x, -e.y, -e.z);
	    worldCornersTemp[4].set(e.x, -e.y, -e.z);
	    worldCornersTemp[5].set(e.x,  e.y, -e.z);
	    worldCornersTemp[6].set(-e.x,  e.y, -e.z);
	    worldCornersTemp[7].set(e.x, -e.y,  e.z);

	    var wc = worldCornersTemp[0];
	    quat.vmult(wc, wc);
	    pos.vadd(wc, wc);
	    max.copy(wc);
	    min.copy(wc);
	    for(var i=1; i<8; i++){
	        var wc = worldCornersTemp[i];
	        quat.vmult(wc, wc);
	        pos.vadd(wc, wc);
	        var x = wc.x;
	        var y = wc.y;
	        var z = wc.z;
	        if(x > max.x){
	            max.x = x;
	        }
	        if(y > max.y){
	            max.y = y;
	        }
	        if(z > max.z){
	            max.z = z;
	        }

	        if(x < min.x){
	            min.x = x;
	        }
	        if(y < min.y){
	            min.y = y;
	        }
	        if(z < min.z){
	            min.z = z;
	        }
	    }

	    // Get each axis max
	    // min.set(Infinity,Infinity,Infinity);
	    // max.set(-Infinity,-Infinity,-Infinity);
	    // this.forEachWorldCorner(pos,quat,function(x,y,z){
	    //     if(x > max.x){
	    //         max.x = x;
	    //     }
	    //     if(y > max.y){
	    //         max.y = y;
	    //     }
	    //     if(z > max.z){
	    //         max.z = z;
	    //     }

	    //     if(x < min.x){
	    //         min.x = x;
	    //     }
	    //     if(y < min.y){
	    //         min.y = y;
	    //     }
	    //     if(z < min.z){
	    //         min.z = z;
	    //     }
	    // });
	};

	},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(_dereq_,module,exports){
	module.exports = ConvexPolyhedron;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Transform = _dereq_('../math/Transform');

	/**
	 * A set of polygons describing a convex shape.
	 * @class ConvexPolyhedron
	 * @constructor
	 * @extends Shape
	 * @description The shape MUST be convex for the code to work properly. No polygons may be coplanar (contained
	 * in the same 3D plane), instead these should be merged into one polygon.
	 *
	 * @param {array} points An array of Vec3's
	 * @param {array} faces Array of integer arrays, describing which vertices that is included in each face.
	 *
	 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
	 * @author schteppe / https://github.com/schteppe
	 * @see http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
	 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
	 *
	 * @todo Move the clipping functions to ContactGenerator?
	 * @todo Automatically merge coplanar polygons in constructor.
	 */
	function ConvexPolyhedron(points, faces, uniqueAxes) {
	    var that = this;
	    Shape.call(this);
	    this.type = Shape.types.CONVEXPOLYHEDRON;

	    /**
	     * Array of Vec3
	     * @property vertices
	     * @type {Array}
	     */
	    this.vertices = points||[];

	    this.worldVertices = []; // World transformed version of .vertices
	    this.worldVerticesNeedsUpdate = true;

	    /**
	     * Array of integer arrays, indicating which vertices each face consists of
	     * @property faces
	     * @type {Array}
	     */
	    this.faces = faces||[];

	    /**
	     * Array of Vec3
	     * @property faceNormals
	     * @type {Array}
	     */
	    this.faceNormals = [];
	    this.computeNormals();

	    this.worldFaceNormalsNeedsUpdate = true;
	    this.worldFaceNormals = []; // World transformed version of .faceNormals

	    /**
	     * Array of Vec3
	     * @property uniqueEdges
	     * @type {Array}
	     */
	    this.uniqueEdges = [];

	    /**
	     * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
	     * @property {Array} uniqueAxes
	     */
	    this.uniqueAxes = uniqueAxes ? uniqueAxes.slice() : null;

	    this.computeEdges();
	    this.updateBoundingSphereRadius();
	}
	ConvexPolyhedron.prototype = new Shape();
	ConvexPolyhedron.prototype.constructor = ConvexPolyhedron;

	var computeEdges_tmpEdge = new Vec3();
	/**
	 * Computes uniqueEdges
	 * @method computeEdges
	 */
	ConvexPolyhedron.prototype.computeEdges = function(){
	    var faces = this.faces;
	    var vertices = this.vertices;
	    var nv = vertices.length;
	    var edges = this.uniqueEdges;

	    edges.length = 0;

	    var edge = computeEdges_tmpEdge;

	    for(var i=0; i !== faces.length; i++){
	        var face = faces[i];
	        var numVertices = face.length;
	        for(var j = 0; j !== numVertices; j++){
	            var k = ( j+1 ) % numVertices;
	            vertices[face[j]].vsub(vertices[face[k]], edge);
	            edge.normalize();
	            var found = false;
	            for(var p=0; p !== edges.length; p++){
	                if (edges[p].almostEquals(edge) || edges[p].almostEquals(edge)){
	                    found = true;
	                    break;
	                }
	            }

	            if (!found){
	                edges.push(edge.clone());
	            }
	        }
	    }
	};

	/**
	 * Compute the normals of the faces. Will reuse existing Vec3 objects in the .faceNormals array if they exist.
	 * @method computeNormals
	 */
	ConvexPolyhedron.prototype.computeNormals = function(){
	    this.faceNormals.length = this.faces.length;

	    // Generate normals
	    for(var i=0; i<this.faces.length; i++){

	        // Check so all vertices exists for this face
	        for(var j=0; j<this.faces[i].length; j++){
	            if(!this.vertices[this.faces[i][j]]){
	                throw new Error("Vertex "+this.faces[i][j]+" not found!");
	            }
	        }

	        var n = this.faceNormals[i] || new Vec3();
	        this.getFaceNormal(i,n);
	        n.negate(n);
	        this.faceNormals[i] = n;
	        var vertex = this.vertices[this.faces[i][0]];
	        if(n.dot(vertex) < 0){
	            console.error(".faceNormals[" + i + "] = Vec3("+n.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");
	            for(var j=0; j<this.faces[i].length; j++){
	                console.warn(".vertices["+this.faces[i][j]+"] = Vec3("+this.vertices[this.faces[i][j]].toString()+")");
	            }
	        }
	    }
	};

	/**
	 * Get face normal given 3 vertices
	 * @static
	 * @method getFaceNormal
	 * @param {Vec3} va
	 * @param {Vec3} vb
	 * @param {Vec3} vc
	 * @param {Vec3} target
	 */
	var cb = new Vec3();
	var ab = new Vec3();
	ConvexPolyhedron.computeNormal = function ( va, vb, vc, target ) {
	    vb.vsub(va,ab);
	    vc.vsub(vb,cb);
	    cb.cross(ab,target);
	    if ( !target.isZero() ) {
	        target.normalize();
	    }
	};

	/**
	 * Compute the normal of a face from its vertices
	 * @method getFaceNormal
	 * @param  {Number} i
	 * @param  {Vec3} target
	 */
	ConvexPolyhedron.prototype.getFaceNormal = function(i,target){
	    var f = this.faces[i];
	    var va = this.vertices[f[0]];
	    var vb = this.vertices[f[1]];
	    var vc = this.vertices[f[2]];
	    return ConvexPolyhedron.computeNormal(va,vb,vc,target);
	};

	/**
	 * @method clipAgainstHull
	 * @param {Vec3} posA
	 * @param {Quaternion} quatA
	 * @param {ConvexPolyhedron} hullB
	 * @param {Vec3} posB
	 * @param {Quaternion} quatB
	 * @param {Vec3} separatingNormal
	 * @param {Number} minDist Clamp distance
	 * @param {Number} maxDist
	 * @param {array} result The an array of contact point objects, see clipFaceAgainstHull
	 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
	 */
	var cah_WorldNormal = new Vec3();
	ConvexPolyhedron.prototype.clipAgainstHull = function(posA,quatA,hullB,posB,quatB,separatingNormal,minDist,maxDist,result){
	    var WorldNormal = cah_WorldNormal;
	    var hullA = this;
	    var curMaxDist = maxDist;
	    var closestFaceB = -1;
	    var dmax = -Number.MAX_VALUE;
	    for(var face=0; face < hullB.faces.length; face++){
	        WorldNormal.copy(hullB.faceNormals[face]);
	        quatB.vmult(WorldNormal,WorldNormal);
	        //posB.vadd(WorldNormal,WorldNormal);
	        var d = WorldNormal.dot(separatingNormal);
	        if (d > dmax){
	            dmax = d;
	            closestFaceB = face;
	        }
	    }
	    var worldVertsB1 = [];
	    var polyB = hullB.faces[closestFaceB];
	    var numVertices = polyB.length;
	    for(var e0=0; e0<numVertices; e0++){
	        var b = hullB.vertices[polyB[e0]];
	        var worldb = new Vec3();
	        worldb.copy(b);
	        quatB.vmult(worldb,worldb);
	        posB.vadd(worldb,worldb);
	        worldVertsB1.push(worldb);
	    }

	    if (closestFaceB>=0){
	        this.clipFaceAgainstHull(separatingNormal,
	                                 posA,
	                                 quatA,
	                                 worldVertsB1,
	                                 minDist,
	                                 maxDist,
	                                 result);
	    }
	};

	/**
	 * Find the separating axis between this hull and another
	 * @method findSeparatingAxis
	 * @param {ConvexPolyhedron} hullB
	 * @param {Vec3} posA
	 * @param {Quaternion} quatA
	 * @param {Vec3} posB
	 * @param {Quaternion} quatB
	 * @param {Vec3} target The target vector to save the axis in
	 * @return {bool} Returns false if a separation is found, else true
	 */
	var fsa_faceANormalWS3 = new Vec3(),
	    fsa_Worldnormal1 = new Vec3(),
	    fsa_deltaC = new Vec3(),
	    fsa_worldEdge0 = new Vec3(),
	    fsa_worldEdge1 = new Vec3(),
	    fsa_Cross = new Vec3();
	ConvexPolyhedron.prototype.findSeparatingAxis = function(hullB,posA,quatA,posB,quatB,target, faceListA, faceListB){
	    var faceANormalWS3 = fsa_faceANormalWS3,
	        Worldnormal1 = fsa_Worldnormal1,
	        deltaC = fsa_deltaC,
	        worldEdge0 = fsa_worldEdge0,
	        worldEdge1 = fsa_worldEdge1,
	        Cross = fsa_Cross;

	    var dmin = Number.MAX_VALUE;
	    var hullA = this;
	    var curPlaneTests=0;

	    if(!hullA.uniqueAxes){

	        var numFacesA = faceListA ? faceListA.length : hullA.faces.length;

	        // Test face normals from hullA
	        for(var i=0; i<numFacesA; i++){
	            var fi = faceListA ? faceListA[i] : i;

	            // Get world face normal
	            faceANormalWS3.copy(hullA.faceNormals[fi]);
	            quatA.vmult(faceANormalWS3,faceANormalWS3);

	            var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
	            if(d===false){
	                return false;
	            }

	            if(d<dmin){
	                dmin = d;
	                target.copy(faceANormalWS3);
	            }
	        }

	    } else {

	        // Test unique axes
	        for(var i = 0; i !== hullA.uniqueAxes.length; i++){

	            // Get world axis
	            quatA.vmult(hullA.uniqueAxes[i],faceANormalWS3);

	            var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
	            if(d===false){
	                return false;
	            }

	            if(d<dmin){
	                dmin = d;
	                target.copy(faceANormalWS3);
	            }
	        }
	    }

	    if(!hullB.uniqueAxes){

	        // Test face normals from hullB
	        var numFacesB = faceListB ? faceListB.length : hullB.faces.length;
	        for(var i=0;i<numFacesB;i++){

	            var fi = faceListB ? faceListB[i] : i;

	            Worldnormal1.copy(hullB.faceNormals[fi]);
	            quatB.vmult(Worldnormal1,Worldnormal1);
	            curPlaneTests++;
	            var d = hullA.testSepAxis(Worldnormal1, hullB,posA,quatA,posB,quatB);
	            if(d===false){
	                return false;
	            }

	            if(d<dmin){
	                dmin = d;
	                target.copy(Worldnormal1);
	            }
	        }
	    } else {

	        // Test unique axes in B
	        for(var i = 0; i !== hullB.uniqueAxes.length; i++){
	            quatB.vmult(hullB.uniqueAxes[i],Worldnormal1);

	            curPlaneTests++;
	            var d = hullA.testSepAxis(Worldnormal1, hullB,posA,quatA,posB,quatB);
	            if(d===false){
	                return false;
	            }

	            if(d<dmin){
	                dmin = d;
	                target.copy(Worldnormal1);
	            }
	        }
	    }

	    // Test edges
	    for(var e0=0; e0 !== hullA.uniqueEdges.length; e0++){

	        // Get world edge
	        quatA.vmult(hullA.uniqueEdges[e0],worldEdge0);

	        for(var e1=0; e1 !== hullB.uniqueEdges.length; e1++){

	            // Get world edge 2
	            quatB.vmult(hullB.uniqueEdges[e1], worldEdge1);
	            worldEdge0.cross(worldEdge1,Cross);

	            if(!Cross.almostZero()){
	                Cross.normalize();
	                var dist = hullA.testSepAxis(Cross, hullB, posA, quatA, posB, quatB);
	                if(dist === false){
	                    return false;
	                }
	                if(dist < dmin){
	                    dmin = dist;
	                    target.copy(Cross);
	                }
	            }
	        }
	    }

	    posB.vsub(posA,deltaC);
	    if((deltaC.dot(target))>0.0){
	        target.negate(target);
	    }

	    return true;
	};

	var maxminA=[], maxminB=[];

	/**
	 * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
	 * @method testSepAxis
	 * @param {Vec3} axis
	 * @param {ConvexPolyhedron} hullB
	 * @param {Vec3} posA
	 * @param {Quaternion} quatA
	 * @param {Vec3} posB
	 * @param {Quaternion} quatB
	 * @return {number} The overlap depth, or FALSE if no penetration.
	 */
	ConvexPolyhedron.prototype.testSepAxis = function(axis, hullB, posA, quatA, posB, quatB){
	    var hullA=this;
	    ConvexPolyhedron.project(hullA, axis, posA, quatA, maxminA);
	    ConvexPolyhedron.project(hullB, axis, posB, quatB, maxminB);
	    var maxA = maxminA[0];
	    var minA = maxminA[1];
	    var maxB = maxminB[0];
	    var minB = maxminB[1];
	    if(maxA<minB || maxB<minA){
	        return false; // Separated
	    }
	    var d0 = maxA - minB;
	    var d1 = maxB - minA;
	    var depth = d0<d1 ? d0:d1;
	    return depth;
	};

	var cli_aabbmin = new Vec3(),
	    cli_aabbmax = new Vec3();

	/**
	 * @method calculateLocalInertia
	 * @param  {Number} mass
	 * @param  {Vec3} target
	 */
	ConvexPolyhedron.prototype.calculateLocalInertia = function(mass,target){
	    // Approximate with box inertia
	    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
	    this.computeLocalAABB(cli_aabbmin,cli_aabbmax);
	    var x = cli_aabbmax.x - cli_aabbmin.x,
	        y = cli_aabbmax.y - cli_aabbmin.y,
	        z = cli_aabbmax.z - cli_aabbmin.z;
	    target.x = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*z*2*z );
	    target.y = 1.0 / 12.0 * mass * ( 2*x*2*x + 2*z*2*z );
	    target.z = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*x*2*x );
	};

	/**
	 * @method getPlaneConstantOfFace
	 * @param  {Number} face_i Index of the face
	 * @return {Number}
	 */
	ConvexPolyhedron.prototype.getPlaneConstantOfFace = function(face_i){
	    var f = this.faces[face_i];
	    var n = this.faceNormals[face_i];
	    var v = this.vertices[f[0]];
	    var c = -n.dot(v);
	    return c;
	};

	/**
	 * Clip a face against a hull.
	 * @method clipFaceAgainstHull
	 * @param {Vec3} separatingNormal
	 * @param {Vec3} posA
	 * @param {Quaternion} quatA
	 * @param {Array} worldVertsB1 An array of Vec3 with vertices in the world frame.
	 * @param {Number} minDist Distance clamping
	 * @param {Number} maxDist
	 * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
	 */
	var cfah_faceANormalWS = new Vec3(),
	    cfah_edge0 = new Vec3(),
	    cfah_WorldEdge0 = new Vec3(),
	    cfah_worldPlaneAnormal1 = new Vec3(),
	    cfah_planeNormalWS1 = new Vec3(),
	    cfah_worldA1 = new Vec3(),
	    cfah_localPlaneNormal = new Vec3(),
	    cfah_planeNormalWS = new Vec3();
	ConvexPolyhedron.prototype.clipFaceAgainstHull = function(separatingNormal, posA, quatA, worldVertsB1, minDist, maxDist,result){
	    var faceANormalWS = cfah_faceANormalWS,
	        edge0 = cfah_edge0,
	        WorldEdge0 = cfah_WorldEdge0,
	        worldPlaneAnormal1 = cfah_worldPlaneAnormal1,
	        planeNormalWS1 = cfah_planeNormalWS1,
	        worldA1 = cfah_worldA1,
	        localPlaneNormal = cfah_localPlaneNormal,
	        planeNormalWS = cfah_planeNormalWS;

	    var hullA = this;
	    var worldVertsB2 = [];
	    var pVtxIn = worldVertsB1;
	    var pVtxOut = worldVertsB2;
	    // Find the face with normal closest to the separating axis
	    var closestFaceA = -1;
	    var dmin = Number.MAX_VALUE;
	    for(var face=0; face<hullA.faces.length; face++){
	        faceANormalWS.copy(hullA.faceNormals[face]);
	        quatA.vmult(faceANormalWS,faceANormalWS);
	        //posA.vadd(faceANormalWS,faceANormalWS);
	        var d = faceANormalWS.dot(separatingNormal);
	        if (d < dmin){
	            dmin = d;
	            closestFaceA = face;
	        }
	    }
	    if (closestFaceA < 0){
	        // console.log("--- did not find any closest face... ---");
	        return;
	    }
	    //console.log("closest A: ",closestFaceA);
	    // Get the face and construct connected faces
	    var polyA = hullA.faces[closestFaceA];
	    polyA.connectedFaces = [];
	    for(var i=0; i<hullA.faces.length; i++){
	        for(var j=0; j<hullA.faces[i].length; j++){
	            if(polyA.indexOf(hullA.faces[i][j])!==-1 /* Sharing a vertex*/ && i!==closestFaceA /* Not the one we are looking for connections from */ && polyA.connectedFaces.indexOf(i)===-1 /* Not already added */ ){
	                polyA.connectedFaces.push(i);
	            }
	        }
	    }
	    // Clip the polygon to the back of the planes of all faces of hull A, that are adjacent to the witness face
	    var numContacts = pVtxIn.length;
	    var numVerticesA = polyA.length;
	    var res = [];
	    for(var e0=0; e0<numVerticesA; e0++){
	        var a = hullA.vertices[polyA[e0]];
	        var b = hullA.vertices[polyA[(e0+1)%numVerticesA]];
	        a.vsub(b,edge0);
	        WorldEdge0.copy(edge0);
	        quatA.vmult(WorldEdge0,WorldEdge0);
	        posA.vadd(WorldEdge0,WorldEdge0);
	        worldPlaneAnormal1.copy(this.faceNormals[closestFaceA]);//transA.getBasis()* btVector3(polyA.m_plane[0],polyA.m_plane[1],polyA.m_plane[2]);
	        quatA.vmult(worldPlaneAnormal1,worldPlaneAnormal1);
	        posA.vadd(worldPlaneAnormal1,worldPlaneAnormal1);
	        WorldEdge0.cross(worldPlaneAnormal1,planeNormalWS1);
	        planeNormalWS1.negate(planeNormalWS1);
	        worldA1.copy(a);
	        quatA.vmult(worldA1,worldA1);
	        posA.vadd(worldA1,worldA1);
	        var planeEqWS1 = -worldA1.dot(planeNormalWS1);
	        var planeEqWS;
	        if(true){
	            var otherFace = polyA.connectedFaces[e0];
	            localPlaneNormal.copy(this.faceNormals[otherFace]);
	            var localPlaneEq = this.getPlaneConstantOfFace(otherFace);

	            planeNormalWS.copy(localPlaneNormal);
	            quatA.vmult(planeNormalWS,planeNormalWS);
	            //posA.vadd(planeNormalWS,planeNormalWS);
	            var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
	        } else  {
	            planeNormalWS.copy(planeNormalWS1);
	            planeEqWS = planeEqWS1;
	        }

	        // Clip face against our constructed plane
	        this.clipFaceAgainstPlane(pVtxIn, pVtxOut, planeNormalWS, planeEqWS);

	        // Throw away all clipped points, but save the reamining until next clip
	        while(pVtxIn.length){
	            pVtxIn.shift();
	        }
	        while(pVtxOut.length){
	            pVtxIn.push(pVtxOut.shift());
	        }
	    }

	    //console.log("Resulting points after clip:",pVtxIn);

	    // only keep contact points that are behind the witness face
	    localPlaneNormal.copy(this.faceNormals[closestFaceA]);

	    var localPlaneEq = this.getPlaneConstantOfFace(closestFaceA);
	    planeNormalWS.copy(localPlaneNormal);
	    quatA.vmult(planeNormalWS,planeNormalWS);

	    var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
	    for (var i=0; i<pVtxIn.length; i++){
	        var depth = planeNormalWS.dot(pVtxIn[i]) + planeEqWS; //???
	        /*console.log("depth calc from normal=",planeNormalWS.toString()," and constant "+planeEqWS+" and vertex ",pVtxIn[i].toString()," gives "+depth);*/
	        if (depth <=minDist){
	            console.log("clamped: depth="+depth+" to minDist="+(minDist+""));
	            depth = minDist;
	        }

	        if (depth <=maxDist){
	            var point = pVtxIn[i];
	            if(depth<=0){
	                /*console.log("Got contact point ",point.toString(),
	                  ", depth=",depth,
	                  "contact normal=",separatingNormal.toString(),
	                  "plane",planeNormalWS.toString(),
	                  "planeConstant",planeEqWS);*/
	                var p = {
	                    point:point,
	                    normal:planeNormalWS,
	                    depth: depth,
	                };
	                result.push(p);
	            }
	        }
	    }
	};

	/**
	 * Clip a face in a hull against the back of a plane.
	 * @method clipFaceAgainstPlane
	 * @param {Array} inVertices
	 * @param {Array} outVertices
	 * @param {Vec3} planeNormal
	 * @param {Number} planeConstant The constant in the mathematical plane equation
	 */
	ConvexPolyhedron.prototype.clipFaceAgainstPlane = function(inVertices,outVertices, planeNormal, planeConstant){
	    var n_dot_first, n_dot_last;
	    var numVerts = inVertices.length;

	    if(numVerts < 2){
	        return outVertices;
	    }

	    var firstVertex = inVertices[inVertices.length-1],
	        lastVertex =   inVertices[0];

	    n_dot_first = planeNormal.dot(firstVertex) + planeConstant;

	    for(var vi = 0; vi < numVerts; vi++){
	        lastVertex = inVertices[vi];
	        n_dot_last = planeNormal.dot(lastVertex) + planeConstant;
	        if(n_dot_first < 0){
	            if(n_dot_last < 0){
	                // Start < 0, end < 0, so output lastVertex
	                var newv = new Vec3();
	                newv.copy(lastVertex);
	                outVertices.push(newv);
	            } else {
	                // Start < 0, end >= 0, so output intersection
	                var newv = new Vec3();
	                firstVertex.lerp(lastVertex,
	                                 n_dot_first / (n_dot_first - n_dot_last),
	                                 newv);
	                outVertices.push(newv);
	            }
	        } else {
	            if(n_dot_last<0){
	                // Start >= 0, end < 0 so output intersection and end
	                var newv = new Vec3();
	                firstVertex.lerp(lastVertex,
	                                 n_dot_first / (n_dot_first - n_dot_last),
	                                 newv);
	                outVertices.push(newv);
	                outVertices.push(lastVertex);
	            }
	        }
	        firstVertex = lastVertex;
	        n_dot_first = n_dot_last;
	    }
	    return outVertices;
	};

	// Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
	ConvexPolyhedron.prototype.computeWorldVertices = function(position,quat){
	    var N = this.vertices.length;
	    while(this.worldVertices.length < N){
	        this.worldVertices.push( new Vec3() );
	    }

	    var verts = this.vertices,
	        worldVerts = this.worldVertices;
	    for(var i=0; i!==N; i++){
	        quat.vmult( verts[i] , worldVerts[i] );
	        position.vadd( worldVerts[i] , worldVerts[i] );
	    }

	    this.worldVerticesNeedsUpdate = false;
	};

	var computeLocalAABB_worldVert = new Vec3();
	ConvexPolyhedron.prototype.computeLocalAABB = function(aabbmin,aabbmax){
	    var n = this.vertices.length,
	        vertices = this.vertices,
	        worldVert = computeLocalAABB_worldVert;

	    aabbmin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	    aabbmax.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

	    for(var i=0; i<n; i++){
	        var v = vertices[i];
	        if     (v.x < aabbmin.x){
	            aabbmin.x = v.x;
	        } else if(v.x > aabbmax.x){
	            aabbmax.x = v.x;
	        }
	        if     (v.y < aabbmin.y){
	            aabbmin.y = v.y;
	        } else if(v.y > aabbmax.y){
	            aabbmax.y = v.y;
	        }
	        if     (v.z < aabbmin.z){
	            aabbmin.z = v.z;
	        } else if(v.z > aabbmax.z){
	            aabbmax.z = v.z;
	        }
	    }
	};

	/**
	 * Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
	 * @method computeWorldFaceNormals
	 * @param  {Quaternion} quat
	 */
	ConvexPolyhedron.prototype.computeWorldFaceNormals = function(quat){
	    var N = this.faceNormals.length;
	    while(this.worldFaceNormals.length < N){
	        this.worldFaceNormals.push( new Vec3() );
	    }

	    var normals = this.faceNormals,
	        worldNormals = this.worldFaceNormals;
	    for(var i=0; i!==N; i++){
	        quat.vmult( normals[i] , worldNormals[i] );
	    }

	    this.worldFaceNormalsNeedsUpdate = false;
	};

	/**
	 * @method updateBoundingSphereRadius
	 */
	ConvexPolyhedron.prototype.updateBoundingSphereRadius = function(){
	    // Assume points are distributed with local (0,0,0) as center
	    var max2 = 0;
	    var verts = this.vertices;
	    for(var i=0, N=verts.length; i!==N; i++) {
	        var norm2 = verts[i].norm2();
	        if(norm2 > max2){
	            max2 = norm2;
	        }
	    }
	    this.boundingSphereRadius = Math.sqrt(max2);
	};

	var tempWorldVertex = new Vec3();

	/**
	 * @method calculateWorldAABB
	 * @param {Vec3}        pos
	 * @param {Quaternion}  quat
	 * @param {Vec3}        min
	 * @param {Vec3}        max
	 */
	ConvexPolyhedron.prototype.calculateWorldAABB = function(pos,quat,min,max){
	    var n = this.vertices.length, verts = this.vertices;
	    var minx,miny,minz,maxx,maxy,maxz;
	    for(var i=0; i<n; i++){
	        tempWorldVertex.copy(verts[i]);
	        quat.vmult(tempWorldVertex,tempWorldVertex);
	        pos.vadd(tempWorldVertex,tempWorldVertex);
	        var v = tempWorldVertex;
	        if     (v.x < minx || minx===undefined){
	            minx = v.x;
	        } else if(v.x > maxx || maxx===undefined){
	            maxx = v.x;
	        }

	        if     (v.y < miny || miny===undefined){
	            miny = v.y;
	        } else if(v.y > maxy || maxy===undefined){
	            maxy = v.y;
	        }

	        if     (v.z < minz || minz===undefined){
	            minz = v.z;
	        } else if(v.z > maxz || maxz===undefined){
	            maxz = v.z;
	        }
	    }
	    min.set(minx,miny,minz);
	    max.set(maxx,maxy,maxz);
	};

	/**
	 * Get approximate convex volume
	 * @method volume
	 * @return {Number}
	 */
	ConvexPolyhedron.prototype.volume = function(){
	    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
	};

	/**
	 * Get an average of all the vertices positions
	 * @method getAveragePointLocal
	 * @param  {Vec3} target
	 * @return {Vec3}
	 */
	ConvexPolyhedron.prototype.getAveragePointLocal = function(target){
	    target = target || new Vec3();
	    var n = this.vertices.length,
	        verts = this.vertices;
	    for(var i=0; i<n; i++){
	        target.vadd(verts[i],target);
	    }
	    target.mult(1/n,target);
	    return target;
	};

	/**
	 * Transform all local points. Will change the .vertices
	 * @method transformAllPoints
	 * @param  {Vec3} offset
	 * @param  {Quaternion} quat
	 */
	ConvexPolyhedron.prototype.transformAllPoints = function(offset,quat){
	    var n = this.vertices.length,
	        verts = this.vertices;

	    // Apply rotation
	    if(quat){
	        // Rotate vertices
	        for(var i=0; i<n; i++){
	            var v = verts[i];
	            quat.vmult(v,v);
	        }
	        // Rotate face normals
	        for(var i=0; i<this.faceNormals.length; i++){
	            var v = this.faceNormals[i];
	            quat.vmult(v,v);
	        }
	        /*
	        // Rotate edges
	        for(var i=0; i<this.uniqueEdges.length; i++){
	            var v = this.uniqueEdges[i];
	            quat.vmult(v,v);
	        }*/
	    }

	    // Apply offset
	    if(offset){
	        for(var i=0; i<n; i++){
	            var v = verts[i];
	            v.vadd(offset,v);
	        }
	    }
	};

	/**
	 * Checks whether p is inside the polyhedra. Must be in local coords. The point lies outside of the convex hull of the other points if and only if the direction of all the vectors from it to those other points are on less than one half of a sphere around it.
	 * @method pointIsInside
	 * @param  {Vec3} p      A point given in local coordinates
	 * @return {Boolean}
	 */
	var ConvexPolyhedron_pointIsInside = new Vec3();
	var ConvexPolyhedron_vToP = new Vec3();
	var ConvexPolyhedron_vToPointInside = new Vec3();
	ConvexPolyhedron.prototype.pointIsInside = function(p){
	    var n = this.vertices.length,
	        verts = this.vertices,
	        faces = this.faces,
	        normals = this.faceNormals;
	    var positiveResult = null;
	    var N = this.faces.length;
	    var pointInside = ConvexPolyhedron_pointIsInside;
	    this.getAveragePointLocal(pointInside);
	    for(var i=0; i<N; i++){
	        var numVertices = this.faces[i].length;
	        var n = normals[i];
	        var v = verts[faces[i][0]]; // We only need one point in the face

	        // This dot product determines which side of the edge the point is
	        var vToP = ConvexPolyhedron_vToP;
	        p.vsub(v,vToP);
	        var r1 = n.dot(vToP);

	        var vToPointInside = ConvexPolyhedron_vToPointInside;
	        pointInside.vsub(v,vToPointInside);
	        var r2 = n.dot(vToPointInside);

	        if((r1<0 && r2>0) || (r1>0 && r2<0)){
	            return false; // Encountered some other sign. Exit.
	        } else {
	        }
	    }

	    // If we got here, all dot products were of the same sign.
	    return positiveResult ? 1 : -1;
	};

	/**
	 * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis. Results are saved in the array maxmin.
	 * @static
	 * @method project
	 * @param {ConvexPolyhedron} hull
	 * @param {Vec3} axis
	 * @param {Vec3} pos
	 * @param {Quaternion} quat
	 * @param {array} result result[0] and result[1] will be set to maximum and minimum, respectively.
	 */
	var project_worldVertex = new Vec3();
	var project_localAxis = new Vec3();
	var project_localOrigin = new Vec3();
	ConvexPolyhedron.project = function(hull, axis, pos, quat, result){
	    var n = hull.vertices.length,
	        worldVertex = project_worldVertex,
	        localAxis = project_localAxis,
	        max = 0,
	        min = 0,
	        localOrigin = project_localOrigin,
	        vs = hull.vertices;

	    localOrigin.setZero();

	    // Transform the axis to local
	    Transform.vectorToLocalFrame(pos, quat, axis, localAxis);
	    Transform.pointToLocalFrame(pos, quat, localOrigin, localOrigin);
	    var add = localOrigin.dot(localAxis);

	    min = max = vs[0].dot(localAxis);

	    for(var i = 1; i < n; i++){
	        var val = vs[i].dot(localAxis);

	        if(val > max){
	            max = val;
	        }

	        if(val < min){
	            min = val;
	        }
	    }

	    min -= add;
	    max -= add;

	    if(min > max){
	        // Inconsistent - swap
	        var temp = min;
	        min = max;
	        max = temp;
	    }
	    // Output
	    result[0] = max;
	    result[1] = min;
	};

	},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(_dereq_,module,exports){
	module.exports = Cylinder;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');

	/**
	 * @class Cylinder
	 * @constructor
	 * @extends ConvexPolyhedron
	 * @author schteppe / https://github.com/schteppe
	 * @param {Number} radiusTop
	 * @param {Number} radiusBottom
	 * @param {Number} height
	 * @param {Number} numSegments The number of segments to build the cylinder out of
	 */
	function Cylinder( radiusTop, radiusBottom, height , numSegments ) {
	    var N = numSegments,
	        verts = [],
	        axes = [],
	        faces = [],
	        bottomface = [],
	        topface = [],
	        cos = Math.cos,
	        sin = Math.sin;

	    // First bottom point
	    verts.push(new Vec3(radiusBottom*cos(0),
	                               radiusBottom*sin(0),
	                               -height*0.5));
	    bottomface.push(0);

	    // First top point
	    verts.push(new Vec3(radiusTop*cos(0),
	                               radiusTop*sin(0),
	                               height*0.5));
	    topface.push(1);

	    for(var i=0; i<N; i++){
	        var theta = 2*Math.PI/N * (i+1);
	        var thetaN = 2*Math.PI/N * (i+0.5);
	        if(i<N-1){
	            // Bottom
	            verts.push(new Vec3(radiusBottom*cos(theta),
	                                       radiusBottom*sin(theta),
	                                       -height*0.5));
	            bottomface.push(2*i+2);
	            // Top
	            verts.push(new Vec3(radiusTop*cos(theta),
	                                       radiusTop*sin(theta),
	                                       height*0.5));
	            topface.push(2*i+3);

	            // Face
	            faces.push([2*i+2, 2*i+3, 2*i+1,2*i]);
	        } else {
	            faces.push([0,1, 2*i+1, 2*i]); // Connect
	        }

	        // Axis: we can cut off half of them if we have even number of segments
	        if(N % 2 === 1 || i < N / 2){
	            axes.push(new Vec3(cos(thetaN), sin(thetaN), 0));
	        }
	    }
	    faces.push(topface);
	    axes.push(new Vec3(0,0,1));

	    // Reorder bottom face
	    var temp = [];
	    for(var i=0; i<bottomface.length; i++){
	        temp.push(bottomface[bottomface.length - i - 1]);
	    }
	    faces.push(temp);

	    this.type = Shape.types.CONVEXPOLYHEDRON;
	    ConvexPolyhedron.call( this, verts, faces, axes );
	}

	Cylinder.prototype = new ConvexPolyhedron();

	},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(_dereq_,module,exports){
	var Shape = _dereq_('./Shape');
	var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');
	var Vec3 = _dereq_('../math/Vec3');
	var Utils = _dereq_('../utils/Utils');

	module.exports = Heightfield;

	/**
	 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a given distance.
	 * @class Heightfield
	 * @extends Shape
	 * @constructor
	 * @param {Array} data An array of Y values that will be used to construct the terrain.
	 * @param {object} options
	 * @param {Number} [options.minValue] Minimum value of the data points in the data array. Will be computed automatically if not given.
	 * @param {Number} [options.maxValue] Maximum value.
	 * @param {Number} [options.elementSize=0.1] World spacing between the data points in X direction.
	 * @todo Should be possible to use along all axes, not just y
	 *
	 * @example
	 *     // Generate some height data (y-values).
	 *     var data = [];
	 *     for(var i = 0; i < 1000; i++){
	 *         var y = 0.5 * Math.cos(0.2 * i);
	 *         data.push(y);
	 *     }
	 *
	 *     // Create the heightfield shape
	 *     var heightfieldShape = new Heightfield(data, {
	 *         elementSize: 1 // Distance between the data points in X and Y directions
	 *     });
	 *     var heightfieldBody = new Body();
	 *     heightfieldBody.addShape(heightfieldShape);
	 *     world.addBody(heightfieldBody);
	 */
	function Heightfield(data, options){
	    options = Utils.defaults(options, {
	        maxValue : null,
	        minValue : null,
	        elementSize : 1
	    });

	    /**
	     * An array of numbers, or height values, that are spread out along the x axis.
	     * @property {array} data
	     */
	    this.data = data;

	    /**
	     * Max value of the data
	     * @property {number} maxValue
	     */
	    this.maxValue = options.maxValue;

	    /**
	     * Max value of the data
	     * @property {number} minValue
	     */
	    this.minValue = options.minValue;

	    /**
	     * The width of each element
	     * @property {number} elementSize
	     * @todo elementSizeX and Y
	     */
	    this.elementSize = options.elementSize;

	    if(options.minValue === null){
	        this.updateMinValue();
	    }
	    if(options.maxValue === null){
	        this.updateMaxValue();
	    }

	    this.cacheEnabled = true;

	    Shape.call(this);

	    this.pillarConvex = new ConvexPolyhedron();
	    this.pillarOffset = new Vec3();

	    this.type = Shape.types.HEIGHTFIELD;
	    this.updateBoundingSphereRadius();

	    // "i_j_isUpper" => { convex: ..., offset: ... }
	    // for example:
	    // _cachedPillars["0_2_1"]
	    this._cachedPillars = {};
	}
	Heightfield.prototype = new Shape();

	/**
	 * Call whenever you change the data array.
	 * @method update
	 */
	Heightfield.prototype.update = function(){
	    this._cachedPillars = {};
	};

	/**
	 * Update the .minValue property
	 * @method updateMinValue
	 */
	Heightfield.prototype.updateMinValue = function(){
	    var data = this.data;
	    var minValue = data[0][0];
	    for(var i=0; i !== data.length; i++){
	        for(var j=0; j !== data[i].length; j++){
	            var v = data[i][j];
	            if(v < minValue){
	                minValue = v;
	            }
	        }
	    }
	    this.minValue = minValue;
	};

	/**
	 * Update the .maxValue property
	 * @method updateMaxValue
	 */
	Heightfield.prototype.updateMaxValue = function(){
	    var data = this.data;
	    var maxValue = data[0][0];
	    for(var i=0; i !== data.length; i++){
	        for(var j=0; j !== data[i].length; j++){
	            var v = data[i][j];
	            if(v > maxValue){
	                maxValue = v;
	            }
	        }
	    }
	    this.maxValue = maxValue;
	};

	/**
	 * Set the height value at an index. Don't forget to update maxValue and minValue after you're done.
	 * @method setHeightValueAtIndex
	 * @param {integer} xi
	 * @param {integer} yi
	 * @param {number} value
	 */
	Heightfield.prototype.setHeightValueAtIndex = function(xi, yi, value){
	    var data = this.data;
	    data[xi][yi] = value;

	    // Invalidate cache
	    this.clearCachedConvexTrianglePillar(xi, yi, false);
	    if(xi > 0){
	        this.clearCachedConvexTrianglePillar(xi - 1, yi, true);
	        this.clearCachedConvexTrianglePillar(xi - 1, yi, false);
	    }
	    if(yi > 0){
	        this.clearCachedConvexTrianglePillar(xi, yi - 1, true);
	        this.clearCachedConvexTrianglePillar(xi, yi - 1, false);
	    }
	    if(yi > 0 && xi > 0){
	        this.clearCachedConvexTrianglePillar(xi - 1, yi - 1, true);
	    }
	};

	/**
	 * Get max/min in a rectangle in the matrix data
	 * @method getRectMinMax
	 * @param  {integer} iMinX
	 * @param  {integer} iMinY
	 * @param  {integer} iMaxX
	 * @param  {integer} iMaxY
	 * @param  {array} [result] An array to store the results in.
	 * @return {array} The result array, if it was passed in. Minimum will be at position 0 and max at 1.
	 */
	Heightfield.prototype.getRectMinMax = function (iMinX, iMinY, iMaxX, iMaxY, result) {
	    result = result || [];

	    // Get max and min of the data
	    var data = this.data,
	        max = this.minValue; // Set first value
	    for(var i = iMinX; i <= iMaxX; i++){
	        for(var j = iMinY; j <= iMaxY; j++){
	            var height = data[i][j];
	            if(height > max){
	                max = height;
	            }
	        }
	    }

	    result[0] = this.minValue;
	    result[1] = max;
	};

	/**
	 * Get the index of a local position on the heightfield. The indexes indicate the rectangles, so if your terrain is made of N x N height data points, you will have rectangle indexes ranging from 0 to N-1.
	 * @method getIndexOfPosition
	 * @param  {number} x
	 * @param  {number} y
	 * @param  {array} result Two-element array
	 * @param  {boolean} clamp If the position should be clamped to the heightfield edge.
	 * @return {boolean}
	 */
	Heightfield.prototype.getIndexOfPosition = function (x, y, result, clamp) {

	    // Get the index of the data points to test against
	    var w = this.elementSize;
	    var data = this.data;
	    var xi = Math.floor(x / w);
	    var yi = Math.floor(y / w);

	    result[0] = xi;
	    result[1] = yi;

	    if(clamp){
	        // Clamp index to edges
	        if(xi < 0){ xi = 0; }
	        if(yi < 0){ yi = 0; }
	        if(xi >= data.length - 1){ xi = data.length - 1; }
	        if(yi >= data[0].length - 1){ yi = data[0].length - 1; }
	    }

	    // Bail out if we are out of the terrain
	    if(xi < 0 || yi < 0 || xi >= data.length-1 || yi >= data[0].length-1){
	        return false;
	    }

	    return true;
	};

	Heightfield.prototype.getHeightAt = function(x, y, edgeClamp){
	    var idx = [];
	    this.getIndexOfPosition(x, y, idx, edgeClamp);

	    // TODO: get upper or lower triangle, then use barycentric interpolation to get the height in the triangle.
	    var minmax = [];
	    this.getRectMinMax(idx[0], idx[1] + 1, idx[0], idx[1] + 1, minmax);

	    return (minmax[0] + minmax[1]) / 2; // average
	};

	Heightfield.prototype.getCacheConvexTrianglePillarKey = function(xi, yi, getUpperTriangle){
	    return xi + '_' + yi + '_' + (getUpperTriangle ? 1 : 0);
	};

	Heightfield.prototype.getCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle){
	    return this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
	};

	Heightfield.prototype.setCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle, convex, offset){
	    this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)] = {
	        convex: convex,
	        offset: offset
	    };
	};

	Heightfield.prototype.clearCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle){
	    delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
	};

	/**
	 * Get a triangle in the terrain in the form of a triangular convex shape.
	 * @method getConvexTrianglePillar
	 * @param  {integer} i
	 * @param  {integer} j
	 * @param  {boolean} getUpperTriangle
	 */
	Heightfield.prototype.getConvexTrianglePillar = function(xi, yi, getUpperTriangle){
	    var result = this.pillarConvex;
	    var offsetResult = this.pillarOffset;

	    if(this.cacheEnabled){
	        var data = this.getCachedConvexTrianglePillar(xi, yi, getUpperTriangle);
	        if(data){
	            this.pillarConvex = data.convex;
	            this.pillarOffset = data.offset;
	            return;
	        }

	        result = new ConvexPolyhedron();
	        offsetResult = new Vec3();

	        this.pillarConvex = result;
	        this.pillarOffset = offsetResult;
	    }

	    var data = this.data;
	    var elementSize = this.elementSize;
	    var faces = result.faces;

	    // Reuse verts if possible
	    result.vertices.length = 6;
	    for (var i = 0; i < 6; i++) {
	        if(!result.vertices[i]){
	            result.vertices[i] = new Vec3();
	        }
	    }

	    // Reuse faces if possible
	    faces.length = 5;
	    for (var i = 0; i < 5; i++) {
	        if(!faces[i]){
	            faces[i] = [];
	        }
	    }

	    var verts = result.vertices;

	    var h = (Math.min(
	        data[xi][yi],
	        data[xi+1][yi],
	        data[xi][yi+1],
	        data[xi+1][yi+1]
	    ) - this.minValue ) / 2 + this.minValue;

	    if (!getUpperTriangle) {

	        // Center of the triangle pillar - all polygons are given relative to this one
	        offsetResult.set(
	            (xi + 0.25) * elementSize, // sort of center of a triangle
	            (yi + 0.25) * elementSize,
	            h // vertical center
	        );

	        // Top triangle verts
	        verts[0].set(
	            -0.25 * elementSize,
	            -0.25 * elementSize,
	            data[xi][yi] - h
	        );
	        verts[1].set(
	            0.75 * elementSize,
	            -0.25 * elementSize,
	            data[xi + 1][yi] - h
	        );
	        verts[2].set(
	            -0.25 * elementSize,
	            0.75 * elementSize,
	            data[xi][yi + 1] - h
	        );

	        // bottom triangle verts
	        verts[3].set(
	            -0.25 * elementSize,
	            -0.25 * elementSize,
	            -h-1
	        );
	        verts[4].set(
	            0.75 * elementSize,
	            -0.25 * elementSize,
	            -h-1
	        );
	        verts[5].set(
	            -0.25 * elementSize,
	            0.75  * elementSize,
	            -h-1
	        );

	        // top triangle
	        faces[0][0] = 0;
	        faces[0][1] = 1;
	        faces[0][2] = 2;

	        // bottom triangle
	        faces[1][0] = 5;
	        faces[1][1] = 4;
	        faces[1][2] = 3;

	        // -x facing quad
	        faces[2][0] = 0;
	        faces[2][1] = 2;
	        faces[2][2] = 5;
	        faces[2][3] = 3;

	        // -y facing quad
	        faces[3][0] = 1;
	        faces[3][1] = 0;
	        faces[3][2] = 3;
	        faces[3][3] = 4;

	        // +xy facing quad
	        faces[4][0] = 4;
	        faces[4][1] = 5;
	        faces[4][2] = 2;
	        faces[4][3] = 1;


	    } else {

	        // Center of the triangle pillar - all polygons are given relative to this one
	        offsetResult.set(
	            (xi + 0.75) * elementSize, // sort of center of a triangle
	            (yi + 0.75) * elementSize,
	            h // vertical center
	        );

	        // Top triangle verts
	        verts[0].set(
	            0.25 * elementSize,
	            0.25 * elementSize,
	            data[xi + 1][yi + 1] - h
	        );
	        verts[1].set(
	            -0.75 * elementSize,
	            0.25 * elementSize,
	            data[xi][yi + 1] - h
	        );
	        verts[2].set(
	            0.25 * elementSize,
	            -0.75 * elementSize,
	            data[xi + 1][yi] - h
	        );

	        // bottom triangle verts
	        verts[3].set(
	            0.25 * elementSize,
	            0.25 * elementSize,
	            - h-1
	        );
	        verts[4].set(
	            -0.75 * elementSize,
	            0.25 * elementSize,
	            - h-1
	        );
	        verts[5].set(
	            0.25 * elementSize,
	            -0.75 * elementSize,
	            - h-1
	        );

	        // Top triangle
	        faces[0][0] = 0;
	        faces[0][1] = 1;
	        faces[0][2] = 2;

	        // bottom triangle
	        faces[1][0] = 5;
	        faces[1][1] = 4;
	        faces[1][2] = 3;

	        // +x facing quad
	        faces[2][0] = 2;
	        faces[2][1] = 5;
	        faces[2][2] = 3;
	        faces[2][3] = 0;

	        // +y facing quad
	        faces[3][0] = 3;
	        faces[3][1] = 4;
	        faces[3][2] = 1;
	        faces[3][3] = 0;

	        // -xy facing quad
	        faces[4][0] = 1;
	        faces[4][1] = 4;
	        faces[4][2] = 5;
	        faces[4][3] = 2;
	    }

	    result.computeNormals();
	    result.computeEdges();
	    result.updateBoundingSphereRadius();

	    this.setCachedConvexTrianglePillar(xi, yi, getUpperTriangle, result, offsetResult);
	};

	Heightfield.prototype.calculateLocalInertia = function(mass, target){
	    target = target || new Vec3();
	    target.set(0, 0, 0);
	    return target;
	};

	Heightfield.prototype.volume = function(){
	    return Number.MAX_VALUE; // The terrain is infinite
	};

	Heightfield.prototype.calculateWorldAABB = function(pos, quat, min, max){
	    // TODO: do it properly
	    min.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	    max.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	};

	Heightfield.prototype.updateBoundingSphereRadius = function(){
	    // Use the bounding box of the min/max values
	    var data = this.data,
	        s = this.elementSize;
	    this.boundingSphereRadius = new Vec3(data.length * s, data[0].length * s, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).norm();
	};

	},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(_dereq_,module,exports){
	module.exports = Particle;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * Particle shape.
	 * @class Particle
	 * @constructor
	 * @author schteppe
	 * @extends Shape
	 */
	function Particle(){
	    Shape.call(this);

	    this.type = Shape.types.PARTICLE;
	}
	Particle.prototype = new Shape();
	Particle.prototype.constructor = Particle;

	/**
	 * @method calculateLocalInertia
	 * @param  {Number} mass
	 * @param  {Vec3} target
	 * @return {Vec3}
	 */
	Particle.prototype.calculateLocalInertia = function(mass,target){
	    target = target || new Vec3();
	    target.set(0, 0, 0);
	    return target;
	};

	Particle.prototype.volume = function(){
	    return 0;
	};

	Particle.prototype.updateBoundingSphereRadius = function(){
	    this.boundingSphereRadius = 0;
	};

	Particle.prototype.calculateWorldAABB = function(pos,quat,min,max){
	    // Get each axis max
	    min.copy(pos);
	    max.copy(pos);
	};

	},{"../math/Vec3":30,"./Shape":43}],42:[function(_dereq_,module,exports){
	module.exports = Plane;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * A plane, facing in the Z direction. The plane has its surface at z=0 and everything below z=0 is assumed to be solid plane. To make the plane face in some other direction than z, you must put it inside a RigidBody and rotate that body. See the demos.
	 * @class Plane
	 * @constructor
	 * @extends Shape
	 * @author schteppe
	 */
	function Plane(){
	    Shape.call(this);
	    this.type = Shape.types.PLANE;

	    // World oriented normal
	    this.worldNormal = new Vec3();
	    this.worldNormalNeedsUpdate = true;

	    this.boundingSphereRadius = Number.MAX_VALUE;
	}
	Plane.prototype = new Shape();
	Plane.prototype.constructor = Plane;

	Plane.prototype.computeWorldNormal = function(quat){
	    var n = this.worldNormal;
	    n.set(0,0,1);
	    quat.vmult(n,n);
	    this.worldNormalNeedsUpdate = false;
	};

	Plane.prototype.calculateLocalInertia = function(mass,target){
	    target = target || new Vec3();
	    return target;
	};

	Plane.prototype.volume = function(){
	    return Number.MAX_VALUE; // The plane is infinite...
	};

	var tempNormal = new Vec3();
	Plane.prototype.calculateWorldAABB = function(pos, quat, min, max){
	    // The plane AABB is infinite, except if the normal is pointing along any axis
	    tempNormal.set(0,0,1); // Default plane normal is z
	    quat.vmult(tempNormal,tempNormal);
	    var maxVal = Number.MAX_VALUE;
	    min.set(-maxVal, -maxVal, -maxVal);
	    max.set(maxVal, maxVal, maxVal);

	    if(tempNormal.x === 1){ max.x = pos.x; }
	    if(tempNormal.y === 1){ max.y = pos.y; }
	    if(tempNormal.z === 1){ max.z = pos.z; }

	    if(tempNormal.x === -1){ min.x = pos.x; }
	    if(tempNormal.y === -1){ min.y = pos.y; }
	    if(tempNormal.z === -1){ min.z = pos.z; }
	};

	Plane.prototype.updateBoundingSphereRadius = function(){
	    this.boundingSphereRadius = Number.MAX_VALUE;
	};
	},{"../math/Vec3":30,"./Shape":43}],43:[function(_dereq_,module,exports){
	module.exports = Shape;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Material = _dereq_('../material/Material');

	/**
	 * Base class for shapes
	 * @class Shape
	 * @constructor
	 * @author schteppe
	 * @todo Should have a mechanism for caching bounding sphere radius instead of calculating it each time
	 */
	function Shape(){

	    /**
	     * Identifyer of the Shape.
	     * @property {number} id
	     */
	    this.id = Shape.idCounter++;

	    /**
	     * The type of this shape. Must be set to an int > 0 by subclasses.
	     * @property type
	     * @type {Number}
	     * @see Shape.types
	     */
	    this.type = 0;

	    /**
	     * The local bounding sphere radius of this shape.
	     * @property {Number} boundingSphereRadius
	     */
	    this.boundingSphereRadius = 0;

	    /**
	     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
	     * @property {boolean} collisionResponse
	     */
	    this.collisionResponse = true;

	    /**
	     * @property {Material} material
	     */
	    this.material = null;
	}
	Shape.prototype.constructor = Shape;

	/**
	 * Computes the bounding sphere radius. The result is stored in the property .boundingSphereRadius
	 * @method updateBoundingSphereRadius
	 * @return {Number}
	 */
	Shape.prototype.updateBoundingSphereRadius = function(){
	    throw "computeBoundingSphereRadius() not implemented for shape type "+this.type;
	};

	/**
	 * Get the volume of this shape
	 * @method volume
	 * @return {Number}
	 */
	Shape.prototype.volume = function(){
	    throw "volume() not implemented for shape type "+this.type;
	};

	/**
	 * Calculates the inertia in the local frame for this shape.
	 * @method calculateLocalInertia
	 * @return {Vec3}
	 * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
	 */
	Shape.prototype.calculateLocalInertia = function(mass,target){
	    throw "calculateLocalInertia() not implemented for shape type "+this.type;
	};

	Shape.idCounter = 0;

	/**
	 * The available shape types.
	 * @static
	 * @property types
	 * @type {Object}
	 */
	Shape.types = {
	    SPHERE:1,
	    PLANE:2,
	    BOX:4,
	    COMPOUND:8,
	    CONVEXPOLYHEDRON:16,
	    HEIGHTFIELD:32,
	    PARTICLE:64,
	    CYLINDER:128,
	    TRIMESH:256
	};


	},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(_dereq_,module,exports){
	module.exports = Sphere;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');

	/**
	 * Spherical shape
	 * @class Sphere
	 * @constructor
	 * @extends Shape
	 * @param {Number} radius The radius of the sphere, a non-negative number.
	 * @author schteppe / http://github.com/schteppe
	 */
	function Sphere(radius){
	    Shape.call(this);

	    /**
	     * @property {Number} radius
	     */
	    this.radius = radius!==undefined ? Number(radius) : 1.0;
	    this.type = Shape.types.SPHERE;

	    if(this.radius < 0){
	        throw new Error('The sphere radius cannot be negative.');
	    }

	    this.updateBoundingSphereRadius();
	}
	Sphere.prototype = new Shape();
	Sphere.prototype.constructor = Sphere;

	Sphere.prototype.calculateLocalInertia = function(mass,target){
	    target = target || new Vec3();
	    var I = 2.0*mass*this.radius*this.radius/5.0;
	    target.x = I;
	    target.y = I;
	    target.z = I;
	    return target;
	};

	Sphere.prototype.volume = function(){
	    return 4.0 * Math.PI * this.radius / 3.0;
	};

	Sphere.prototype.updateBoundingSphereRadius = function(){
	    this.boundingSphereRadius = this.radius;
	};

	Sphere.prototype.calculateWorldAABB = function(pos,quat,min,max){
	    var r = this.radius;
	    var axes = ['x','y','z'];
	    for(var i=0; i<axes.length; i++){
	        var ax = axes[i];
	        min[ax] = pos[ax] - r;
	        max[ax] = pos[ax] + r;
	    }
	};

	},{"../math/Vec3":30,"./Shape":43}],45:[function(_dereq_,module,exports){
	module.exports = Trimesh;

	var Shape = _dereq_('./Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Transform = _dereq_('../math/Transform');
	var AABB = _dereq_('../collision/AABB');
	var Octree = _dereq_('../utils/Octree');

	/**
	 * @class Trimesh
	 * @constructor
	 * @param {array} vertices
	 * @param {array} indices
	 * @extends Shape
	 * @example
	 *     // How to make a mesh with a single triangle
	 *     var vertices = [
	 *         0, 0, 0, // vertex 0
	 *         1, 0, 0, // vertex 1
	 *         0, 1, 0  // vertex 2
	 *     ];
	 *     var indices = [
	 *         0, 1, 2  // triangle 0
	 *     ];
	 *     var trimeshShape = new Trimesh(vertices, indices);
	 */
	function Trimesh(vertices, indices) {
	    Shape.call(this);
	    this.type = Shape.types.TRIMESH;

	    /**
	     * @property vertices
	     * @type {Array}
	     */
	    this.vertices = new Float32Array(vertices);

	    /**
	     * Array of integers, indicating which vertices each triangle consists of. The length of this array is thus 3 times the number of triangles.
	     * @property indices
	     * @type {Array}
	     */
	    this.indices = new Int16Array(indices);

	    /**
	     * The normals data.
	     * @property normals
	     * @type {Array}
	     */
	    this.normals = new Float32Array(indices.length);

	    /**
	     * The local AABB of the mesh.
	     * @property aabb
	     * @type {Array}
	     */
	    this.aabb = new AABB();

	    /**
	     * References to vertex pairs, making up all unique edges in the trimesh.
	     * @property {array} edges
	     */
	    this.edges = null;

	    /**
	     * Local scaling of the mesh. Use .setScale() to set it.
	     * @property {Vec3} scale
	     */
	    this.scale = new Vec3(1, 1, 1);

	    /**
	     * The indexed triangles. Use .updateTree() to update it.
	     * @property {Octree} tree
	     */
	    this.tree = new Octree();

	    this.updateEdges();
	    this.updateNormals();
	    this.updateAABB();
	    this.updateBoundingSphereRadius();
	    this.updateTree();
	}
	Trimesh.prototype = new Shape();
	Trimesh.prototype.constructor = Trimesh;

	var computeNormals_n = new Vec3();

	/**
	 * @method updateTree
	 */
	Trimesh.prototype.updateTree = function(){
	    var tree = this.tree;

	    tree.reset();
	    tree.aabb.copy(this.aabb);
	    var scale = this.scale; // The local mesh AABB is scaled, but the octree AABB should be unscaled
	    tree.aabb.lowerBound.x *= 1 / scale.x;
	    tree.aabb.lowerBound.y *= 1 / scale.y;
	    tree.aabb.lowerBound.z *= 1 / scale.z;
	    tree.aabb.upperBound.x *= 1 / scale.x;
	    tree.aabb.upperBound.y *= 1 / scale.y;
	    tree.aabb.upperBound.z *= 1 / scale.z;

	    // Insert all triangles
	    var triangleAABB = new AABB();
	    var a = new Vec3();
	    var b = new Vec3();
	    var c = new Vec3();
	    var points = [a, b, c];
	    for (var i = 0; i < this.indices.length / 3; i++) {
	        //this.getTriangleVertices(i, a, b, c);

	        // Get unscaled triangle verts
	        var i3 = i * 3;
	        this._getUnscaledVertex(this.indices[i3], a);
	        this._getUnscaledVertex(this.indices[i3 + 1], b);
	        this._getUnscaledVertex(this.indices[i3 + 2], c);

	        triangleAABB.setFromPoints(points);
	        tree.insert(triangleAABB, i);
	    }
	    tree.removeEmptyNodes();
	};

	var unscaledAABB = new AABB();

	/**
	 * Get triangles in a local AABB from the trimesh.
	 * @method getTrianglesInAABB
	 * @param  {AABB} aabb
	 * @param  {array} result An array of integers, referencing the queried triangles.
	 */
	Trimesh.prototype.getTrianglesInAABB = function(aabb, result){
	    unscaledAABB.copy(aabb);

	    // Scale it to local
	    var scale = this.scale;
	    var isx = scale.x;
	    var isy = scale.y;
	    var isz = scale.z;
	    var l = unscaledAABB.lowerBound;
	    var u = unscaledAABB.upperBound;
	    l.x /= isx;
	    l.y /= isy;
	    l.z /= isz;
	    u.x /= isx;
	    u.y /= isy;
	    u.z /= isz;

	    return this.tree.aabbQuery(unscaledAABB, result);
	};

	/**
	 * @method setScale
	 * @param {Vec3} scale
	 */
	Trimesh.prototype.setScale = function(scale){
	    var wasUniform = this.scale.x === this.scale.y === this.scale.z;
	    var isUniform = scale.x === scale.y === scale.z;

	    if(!(wasUniform && isUniform)){
	        // Non-uniform scaling. Need to update normals.
	        this.updateNormals();
	    }
	    this.scale.copy(scale);
	    this.updateAABB();
	    this.updateBoundingSphereRadius();
	};

	/**
	 * Compute the normals of the faces. Will save in the .normals array.
	 * @method updateNormals
	 */
	Trimesh.prototype.updateNormals = function(){
	    var n = computeNormals_n;

	    // Generate normals
	    var normals = this.normals;
	    for(var i=0; i < this.indices.length / 3; i++){
	        var i3 = i * 3;

	        var a = this.indices[i3],
	            b = this.indices[i3 + 1],
	            c = this.indices[i3 + 2];

	        this.getVertex(a, va);
	        this.getVertex(b, vb);
	        this.getVertex(c, vc);

	        Trimesh.computeNormal(vb, va, vc, n);

	        normals[i3] = n.x;
	        normals[i3 + 1] = n.y;
	        normals[i3 + 2] = n.z;
	    }
	};

	/**
	 * Update the .edges property
	 * @method updateEdges
	 */
	Trimesh.prototype.updateEdges = function(){
	    var edges = {};
	    var add = function(indexA, indexB){
	        var key = a < b ? a + '_' + b : b + '_' + a;
	        edges[key] = true;
	    };
	    for(var i=0; i < this.indices.length / 3; i++){
	        var i3 = i * 3;
	        var a = this.indices[i3],
	            b = this.indices[i3 + 1],
	            c = this.indices[i3 + 2];
	        add(a,b);
	        add(b,c);
	        add(c,a);
	    }
	    var keys = Object.keys(edges);
	    this.edges = new Int16Array(keys.length * 2);
	    for (var i = 0; i < keys.length; i++) {
	        var indices = keys[i].split('_');
	        this.edges[2 * i] = parseInt(indices[0], 10);
	        this.edges[2 * i + 1] = parseInt(indices[1], 10);
	    }
	};

	/**
	 * Get an edge vertex
	 * @method getEdgeVertex
	 * @param  {number} edgeIndex
	 * @param  {number} firstOrSecond 0 or 1, depending on which one of the vertices you need.
	 * @param  {Vec3} vertexStore Where to store the result
	 */
	Trimesh.prototype.getEdgeVertex = function(edgeIndex, firstOrSecond, vertexStore){
	    var vertexIndex = this.edges[edgeIndex * 2 + (firstOrSecond ? 1 : 0)];
	    this.getVertex(vertexIndex, vertexStore);
	};

	var getEdgeVector_va = new Vec3();
	var getEdgeVector_vb = new Vec3();

	/**
	 * Get a vector along an edge.
	 * @method getEdgeVector
	 * @param  {number} edgeIndex
	 * @param  {Vec3} vectorStore
	 */
	Trimesh.prototype.getEdgeVector = function(edgeIndex, vectorStore){
	    var va = getEdgeVector_va;
	    var vb = getEdgeVector_vb;
	    this.getEdgeVertex(edgeIndex, 0, va);
	    this.getEdgeVertex(edgeIndex, 1, vb);
	    vb.vsub(va, vectorStore);
	};

	/**
	 * Get face normal given 3 vertices
	 * @static
	 * @method computeNormal
	 * @param {Vec3} va
	 * @param {Vec3} vb
	 * @param {Vec3} vc
	 * @param {Vec3} target
	 */
	var cb = new Vec3();
	var ab = new Vec3();
	Trimesh.computeNormal = function ( va, vb, vc, target ) {
	    vb.vsub(va,ab);
	    vc.vsub(vb,cb);
	    cb.cross(ab,target);
	    if ( !target.isZero() ) {
	        target.normalize();
	    }
	};

	var va = new Vec3();
	var vb = new Vec3();
	var vc = new Vec3();

	/**
	 * Get vertex i.
	 * @method getVertex
	 * @param  {number} i
	 * @param  {Vec3} out
	 * @return {Vec3} The "out" vector object
	 */
	Trimesh.prototype.getVertex = function(i, out){
	    var scale = this.scale;
	    this._getUnscaledVertex(i, out);
	    out.x *= scale.x;
	    out.y *= scale.y;
	    out.z *= scale.z;
	    return out;
	};

	/**
	 * Get raw vertex i
	 * @private
	 * @method _getUnscaledVertex
	 * @param  {number} i
	 * @param  {Vec3} out
	 * @return {Vec3} The "out" vector object
	 */
	Trimesh.prototype._getUnscaledVertex = function(i, out){
	    var i3 = i * 3;
	    var vertices = this.vertices;
	    return out.set(
	        vertices[i3],
	        vertices[i3 + 1],
	        vertices[i3 + 2]
	    );
	};

	/**
	 * Get a vertex from the trimesh,transformed by the given position and quaternion.
	 * @method getWorldVertex
	 * @param  {number} i
	 * @param  {Vec3} pos
	 * @param  {Quaternion} quat
	 * @param  {Vec3} out
	 * @return {Vec3} The "out" vector object
	 */
	Trimesh.prototype.getWorldVertex = function(i, pos, quat, out){
	    this.getVertex(i, out);
	    Transform.pointToWorldFrame(pos, quat, out, out);
	    return out;
	};

	/**
	 * Get the three vertices for triangle i.
	 * @method getTriangleVertices
	 * @param  {number} i
	 * @param  {Vec3} a
	 * @param  {Vec3} b
	 * @param  {Vec3} c
	 */
	Trimesh.prototype.getTriangleVertices = function(i, a, b, c){
	    var i3 = i * 3;
	    this.getVertex(this.indices[i3], a);
	    this.getVertex(this.indices[i3 + 1], b);
	    this.getVertex(this.indices[i3 + 2], c);
	};

	/**
	 * Compute the normal of triangle i.
	 * @method getNormal
	 * @param  {Number} i
	 * @param  {Vec3} target
	 * @return {Vec3} The "target" vector object
	 */
	Trimesh.prototype.getNormal = function(i, target){
	    var i3 = i * 3;
	    return target.set(
	        this.normals[i3],
	        this.normals[i3 + 1],
	        this.normals[i3 + 2]
	    );
	};

	var cli_aabb = new AABB();

	/**
	 * @method calculateLocalInertia
	 * @param  {Number} mass
	 * @param  {Vec3} target
	 * @return {Vec3} The "target" vector object
	 */
	Trimesh.prototype.calculateLocalInertia = function(mass,target){
	    // Approximate with box inertia
	    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
	    this.computeLocalAABB(cli_aabb);
	    var x = cli_aabb.upperBound.x - cli_aabb.lowerBound.x,
	        y = cli_aabb.upperBound.y - cli_aabb.lowerBound.y,
	        z = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
	    return target.set(
	        1.0 / 12.0 * mass * ( 2*y*2*y + 2*z*2*z ),
	        1.0 / 12.0 * mass * ( 2*x*2*x + 2*z*2*z ),
	        1.0 / 12.0 * mass * ( 2*y*2*y + 2*x*2*x )
	    );
	};

	var computeLocalAABB_worldVert = new Vec3();

	/**
	 * Compute the local AABB for the trimesh
	 * @method computeLocalAABB
	 * @param  {AABB} aabb
	 */
	Trimesh.prototype.computeLocalAABB = function(aabb){
	    var l = aabb.lowerBound,
	        u = aabb.upperBound,
	        n = this.vertices.length,
	        vertices = this.vertices,
	        v = computeLocalAABB_worldVert;

	    this.getVertex(0, v);
	    l.copy(v);
	    u.copy(v);

	    for(var i=0; i !== n; i++){
	        this.getVertex(i, v);

	        if(v.x < l.x){
	            l.x = v.x;
	        } else if(v.x > u.x){
	            u.x = v.x;
	        }

	        if(v.y < l.y){
	            l.y = v.y;
	        } else if(v.y > u.y){
	            u.y = v.y;
	        }

	        if(v.z < l.z){
	            l.z = v.z;
	        } else if(v.z > u.z){
	            u.z = v.z;
	        }
	    }
	};


	/**
	 * Update the .aabb property
	 * @method updateAABB
	 */
	Trimesh.prototype.updateAABB = function(){
	    this.computeLocalAABB(this.aabb);
	};

	/**
	 * Will update the .boundingSphereRadius property
	 * @method updateBoundingSphereRadius
	 */
	Trimesh.prototype.updateBoundingSphereRadius = function(){
	    // Assume points are distributed with local (0,0,0) as center
	    var max2 = 0;
	    var vertices = this.vertices;
	    var v = new Vec3();
	    for(var i=0, N=vertices.length / 3; i !== N; i++) {
	        this.getVertex(i, v);
	        var norm2 = v.norm2();
	        if(norm2 > max2){
	            max2 = norm2;
	        }
	    }
	    this.boundingSphereRadius = Math.sqrt(max2);
	};

	var tempWorldVertex = new Vec3();
	var calculateWorldAABB_frame = new Transform();
	var calculateWorldAABB_aabb = new AABB();

	/**
	 * @method calculateWorldAABB
	 * @param {Vec3}        pos
	 * @param {Quaternion}  quat
	 * @param {Vec3}        min
	 * @param {Vec3}        max
	 */
	Trimesh.prototype.calculateWorldAABB = function(pos,quat,min,max){
	    /*
	    var n = this.vertices.length / 3,
	        verts = this.vertices;
	    var minx,miny,minz,maxx,maxy,maxz;

	    var v = tempWorldVertex;
	    for(var i=0; i<n; i++){
	        this.getVertex(i, v);
	        quat.vmult(v, v);
	        pos.vadd(v, v);
	        if (v.x < minx || minx===undefined){
	            minx = v.x;
	        } else if(v.x > maxx || maxx===undefined){
	            maxx = v.x;
	        }

	        if (v.y < miny || miny===undefined){
	            miny = v.y;
	        } else if(v.y > maxy || maxy===undefined){
	            maxy = v.y;
	        }

	        if (v.z < minz || minz===undefined){
	            minz = v.z;
	        } else if(v.z > maxz || maxz===undefined){
	            maxz = v.z;
	        }
	    }
	    min.set(minx,miny,minz);
	    max.set(maxx,maxy,maxz);
	    */

	    // Faster approximation using local AABB
	    var frame = calculateWorldAABB_frame;
	    var result = calculateWorldAABB_aabb;
	    frame.position = pos;
	    frame.quaternion = quat;
	    this.aabb.toWorldFrame(frame, result);
	    min.copy(result.lowerBound);
	    max.copy(result.upperBound);
	};

	/**
	 * Get approximate volume
	 * @method volume
	 * @return {Number}
	 */
	Trimesh.prototype.volume = function(){
	    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
	};

	/**
	 * Create a Trimesh instance, shaped as a torus.
	 * @static
	 * @method createTorus
	 * @param  {number} [radius=1]
	 * @param  {number} [tube=0.5]
	 * @param  {number} [radialSegments=8]
	 * @param  {number} [tubularSegments=6]
	 * @param  {number} [arc=6.283185307179586]
	 * @return {Trimesh} A torus
	 */
	Trimesh.createTorus = function (radius, tube, radialSegments, tubularSegments, arc) {
	    radius = radius || 1;
	    tube = tube || 0.5;
	    radialSegments = radialSegments || 8;
	    tubularSegments = tubularSegments || 6;
	    arc = arc || Math.PI * 2;

	    var vertices = [];
	    var indices = [];

	    for ( var j = 0; j <= radialSegments; j ++ ) {
	        for ( var i = 0; i <= tubularSegments; i ++ ) {
	            var u = i / tubularSegments * arc;
	            var v = j / radialSegments * Math.PI * 2;

	            var x = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
	            var y = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
	            var z = tube * Math.sin( v );

	            vertices.push( x, y, z );
	        }
	    }

	    for ( var j = 1; j <= radialSegments; j ++ ) {
	        for ( var i = 1; i <= tubularSegments; i ++ ) {
	            var a = ( tubularSegments + 1 ) * j + i - 1;
	            var b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
	            var c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
	            var d = ( tubularSegments + 1 ) * j + i;

	            indices.push(a, b, d);
	            indices.push(b, c, d);
	        }
	    }

	    return new Trimesh(vertices, indices);
	};

	},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(_dereq_,module,exports){
	module.exports = GSSolver;

	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Solver = _dereq_('./Solver');

	/**
	 * Constraint equation Gauss-Seidel solver.
	 * @class GSSolver
	 * @constructor
	 * @todo The spook parameters should be specified for each constraint, not globally.
	 * @author schteppe / https://github.com/schteppe
	 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
	 * @extends Solver
	 */
	function GSSolver(){
	    Solver.call(this);

	    /**
	     * The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
	     * @property iterations
	     * @type {Number}
	     * @todo write more about solver and iterations in the wiki
	     */
	    this.iterations = 10;

	    /**
	     * When tolerance is reached, the system is assumed to be converged.
	     * @property tolerance
	     * @type {Number}
	     */
	    this.tolerance = 1e-7;
	}
	GSSolver.prototype = new Solver();

	var GSSolver_solve_lambda = []; // Just temporary number holders that we want to reuse each solve.
	var GSSolver_solve_invCs = [];
	var GSSolver_solve_Bs = [];
	GSSolver.prototype.solve = function(dt,world){
	    var iter = 0,
	        maxIter = this.iterations,
	        tolSquared = this.tolerance*this.tolerance,
	        equations = this.equations,
	        Neq = equations.length,
	        bodies = world.bodies,
	        Nbodies = bodies.length,
	        h = dt,
	        q, B, invC, deltalambda, deltalambdaTot, GWlambda, lambdaj;

	    // Update solve mass
	    if(Neq !== 0){
	        for(var i=0; i!==Nbodies; i++){
	            bodies[i].updateSolveMassProperties();
	        }
	    }

	    // Things that does not change during iteration can be computed once
	    var invCs = GSSolver_solve_invCs,
	        Bs = GSSolver_solve_Bs,
	        lambda = GSSolver_solve_lambda;
	    invCs.length = Neq;
	    Bs.length = Neq;
	    lambda.length = Neq;
	    for(var i=0; i!==Neq; i++){
	        var c = equations[i];
	        lambda[i] = 0.0;
	        Bs[i] = c.computeB(h);
	        invCs[i] = 1.0 / c.computeC();
	    }

	    if(Neq !== 0){

	        // Reset vlambda
	        for(var i=0; i!==Nbodies; i++){
	            var b=bodies[i],
	                vlambda=b.vlambda,
	                wlambda=b.wlambda;
	            vlambda.set(0,0,0);
	            if(wlambda){
	                wlambda.set(0,0,0);
	            }
	        }

	        // Iterate over equations
	        for(iter=0; iter!==maxIter; iter++){

	            // Accumulate the total error for each iteration.
	            deltalambdaTot = 0.0;

	            for(var j=0; j!==Neq; j++){

	                var c = equations[j];

	                // Compute iteration
	                B = Bs[j];
	                invC = invCs[j];
	                lambdaj = lambda[j];
	                GWlambda = c.computeGWlambda();
	                deltalambda = invC * ( B - GWlambda - c.eps * lambdaj );

	                // Clamp if we are not within the min/max interval
	                if(lambdaj + deltalambda < c.minForce){
	                    deltalambda = c.minForce - lambdaj;
	                } else if(lambdaj + deltalambda > c.maxForce){
	                    deltalambda = c.maxForce - lambdaj;
	                }
	                lambda[j] += deltalambda;

	                deltalambdaTot += deltalambda > 0.0 ? deltalambda : -deltalambda; // abs(deltalambda)

	                c.addToWlambda(deltalambda);
	            }

	            // If the total error is small enough - stop iterate
	            if(deltalambdaTot*deltalambdaTot < tolSquared){
	                break;
	            }
	        }

	        // Add result to velocity
	        for(var i=0; i!==Nbodies; i++){
	            var b=bodies[i],
	                v=b.velocity,
	                w=b.angularVelocity;
	            v.vadd(b.vlambda, v);
	            if(w){
	                w.vadd(b.wlambda, w);
	            }
	        }
	    }

	    return iter;
	};

	},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(_dereq_,module,exports){
	module.exports = Solver;

	/**
	 * Constraint equation solver base class.
	 * @class Solver
	 * @constructor
	 * @author schteppe / https://github.com/schteppe
	 */
	function Solver(){
	    /**
	     * All equations to be solved
	     * @property {Array} equations
	     */
	    this.equations = [];
	}

	/**
	 * Should be implemented in subclasses!
	 * @method solve
	 * @param  {Number} dt
	 * @param  {World} world
	 */
	Solver.prototype.solve = function(dt,world){
	    // Should return the number of iterations done!
	    return 0;
	};

	/**
	 * Add an equation
	 * @method addEquation
	 * @param {Equation} eq
	 */
	Solver.prototype.addEquation = function(eq){
	    if (eq.enabled) {
	        this.equations.push(eq);
	    }
	};

	/**
	 * Remove an equation
	 * @method removeEquation
	 * @param {Equation} eq
	 */
	Solver.prototype.removeEquation = function(eq){
	    var eqs = this.equations;
	    var i = eqs.indexOf(eq);
	    if(i !== -1){
	        eqs.splice(i,1);
	    }
	};

	/**
	 * Add all equations
	 * @method removeAllEquations
	 */
	Solver.prototype.removeAllEquations = function(){
	    this.equations.length = 0;
	};


	},{}],48:[function(_dereq_,module,exports){
	module.exports = SplitSolver;

	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var Solver = _dereq_('./Solver');
	var Body = _dereq_('../objects/Body');

	/**
	 * Splits the equations into islands and solves them independently. Can improve performance.
	 * @class SplitSolver
	 * @constructor
	 * @extends Solver
	 * @param {Solver} subsolver
	 */
	function SplitSolver(subsolver){
	    Solver.call(this);
	    this.iterations = 10;
	    this.tolerance = 1e-7;
	    this.subsolver = subsolver;
	    this.nodes = [];
	    this.nodePool = [];

	    // Create needed nodes, reuse if possible
	    while(this.nodePool.length < 128){
	        this.nodePool.push(this.createNode());
	    }
	}
	SplitSolver.prototype = new Solver();

	// Returns the number of subsystems
	var SplitSolver_solve_nodes = []; // All allocated node objects
	var SplitSolver_solve_nodePool = []; // All allocated node objects
	var SplitSolver_solve_eqs = [];   // Temp array
	var SplitSolver_solve_bds = [];   // Temp array
	var SplitSolver_solve_dummyWorld = {bodies:[]}; // Temp object

	var STATIC = Body.STATIC;
	function getUnvisitedNode(nodes){
	    var Nnodes = nodes.length;
	    for(var i=0; i!==Nnodes; i++){
	        var node = nodes[i];
	        if(!node.visited && !(node.body.type & STATIC)){
	            return node;
	        }
	    }
	    return false;
	}

	var queue = [];
	function bfs(root,visitFunc,bds,eqs){
	    queue.push(root);
	    root.visited = true;
	    visitFunc(root,bds,eqs);
	    while(queue.length) {
	        var node = queue.pop();
	        // Loop over unvisited child nodes
	        var child;
	        while((child = getUnvisitedNode(node.children))) {
	            child.visited = true;
	            visitFunc(child,bds,eqs);
	            queue.push(child);
	        }
	    }
	}

	function visitFunc(node,bds,eqs){
	    bds.push(node.body);
	    var Neqs = node.eqs.length;
	    for(var i=0; i!==Neqs; i++){
	        var eq = node.eqs[i];
	        if(eqs.indexOf(eq) === -1){
	            eqs.push(eq);
	        }
	    }
	}

	SplitSolver.prototype.createNode = function(){
	    return { body:null, children:[], eqs:[], visited:false };
	};

	/**
	 * Solve the subsystems
	 * @method solve
	 * @param  {Number} dt
	 * @param  {World} world
	 */
	SplitSolver.prototype.solve = function(dt,world){
	    var nodes=SplitSolver_solve_nodes,
	        nodePool=this.nodePool,
	        bodies=world.bodies,
	        equations=this.equations,
	        Neq=equations.length,
	        Nbodies=bodies.length,
	        subsolver=this.subsolver;

	    // Create needed nodes, reuse if possible
	    while(nodePool.length < Nbodies){
	        nodePool.push(this.createNode());
	    }
	    nodes.length = Nbodies;
	    for (var i = 0; i < Nbodies; i++) {
	        nodes[i] = nodePool[i];
	    }

	    // Reset node values
	    for(var i=0; i!==Nbodies; i++){
	        var node = nodes[i];
	        node.body = bodies[i];
	        node.children.length = 0;
	        node.eqs.length = 0;
	        node.visited = false;
	    }
	    for(var k=0; k!==Neq; k++){
	        var eq=equations[k],
	            i=bodies.indexOf(eq.bi),
	            j=bodies.indexOf(eq.bj),
	            ni=nodes[i],
	            nj=nodes[j];
	        ni.children.push(nj);
	        ni.eqs.push(eq);
	        nj.children.push(ni);
	        nj.eqs.push(eq);
	    }

	    var child, n=0, eqs=SplitSolver_solve_eqs;

	    subsolver.tolerance = this.tolerance;
	    subsolver.iterations = this.iterations;

	    var dummyWorld = SplitSolver_solve_dummyWorld;
	    while((child = getUnvisitedNode(nodes))){
	        eqs.length = 0;
	        dummyWorld.bodies.length = 0;
	        bfs(child, visitFunc, dummyWorld.bodies, eqs);

	        var Neqs = eqs.length;

	        eqs = eqs.sort(sortById);

	        for(var i=0; i!==Neqs; i++){
	            subsolver.addEquation(eqs[i]);
	        }

	        var iter = subsolver.solve(dt,dummyWorld);
	        subsolver.removeAllEquations();
	        n++;
	    }

	    return n;
	};

	function sortById(a, b){
	    return b.id - a.id;
	}
	},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(_dereq_,module,exports){
	/**
	 * Base class for objects that dispatches events.
	 * @class EventTarget
	 * @constructor
	 */
	var EventTarget = function () {

	};

	module.exports = EventTarget;

	EventTarget.prototype = {
	    constructor: EventTarget,

	    /**
	     * Add an event listener
	     * @method addEventListener
	     * @param  {String} type
	     * @param  {Function} listener
	     * @return {EventTarget} The self object, for chainability.
	     */
	    addEventListener: function ( type, listener ) {
	        if ( this._listeners === undefined ){ this._listeners = {}; }
	        var listeners = this._listeners;
	        if ( listeners[ type ] === undefined ) {
	            listeners[ type ] = [];
	        }
	        if ( listeners[ type ].indexOf( listener ) === - 1 ) {
	            listeners[ type ].push( listener );
	        }
	        return this;
	    },

	    /**
	     * Check if an event listener is added
	     * @method hasEventListener
	     * @param  {String} type
	     * @param  {Function} listener
	     * @return {Boolean}
	     */
	    hasEventListener: function ( type, listener ) {
	        if ( this._listeners === undefined ){ return false; }
	        var listeners = this._listeners;
	        if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {
	            return true;
	        }
	        return false;
	    },

	    /**
	     * Remove an event listener
	     * @method removeEventListener
	     * @param  {String} type
	     * @param  {Function} listener
	     * @return {EventTarget} The self object, for chainability.
	     */
	    removeEventListener: function ( type, listener ) {
	        if ( this._listeners === undefined ){ return this; }
	        var listeners = this._listeners;
	        if ( listeners[type] === undefined ){ return this; }
	        var index = listeners[ type ].indexOf( listener );
	        if ( index !== - 1 ) {
	            listeners[ type ].splice( index, 1 );
	        }
	        return this;
	    },

	    /**
	     * Emit an event.
	     * @method dispatchEvent
	     * @param  {Object} event
	     * @param  {String} event.type
	     * @return {EventTarget} The self object, for chainability.
	     */
	    dispatchEvent: function ( event ) {
	        if ( this._listeners === undefined ){ return this; }
	        var listeners = this._listeners;
	        var listenerArray = listeners[ event.type ];
	        if ( listenerArray !== undefined ) {
	            event.target = this;
	            for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
	                listenerArray[ i ].call( this, event );
	            }
	        }
	        return this;
	    }
	};

	},{}],50:[function(_dereq_,module,exports){
	var AABB = _dereq_('../collision/AABB');
	var Vec3 = _dereq_('../math/Vec3');

	module.exports = Octree;

	/**
	 * @class OctreeNode
	 * @param {object} [options]
	 * @param {Octree} [options.root]
	 * @param {AABB} [options.aabb]
	 */
	function OctreeNode(options){
	    options = options || {};

	    /**
	     * The root node
	     * @property {OctreeNode} root
	     */
	    this.root = options.root || null;

	    /**
	     * Boundary of this node
	     * @property {AABB} aabb
	     */
	    this.aabb = options.aabb ? options.aabb.clone() : new AABB();

	    /**
	     * Contained data at the current node level.
	     * @property {Array} data
	     */
	    this.data = [];

	    /**
	     * Children to this node
	     * @property {Array} children
	     */
	    this.children = [];
	}

	/**
	 * @class Octree
	 * @param {AABB} aabb The total AABB of the tree
	 * @param {object} [options]
	 * @param {number} [options.maxDepth=8]
	 * @extends OctreeNode
	 */
	function Octree(aabb, options){
	    options = options || {};
	    options.root = null;
	    options.aabb = aabb;
	    OctreeNode.call(this, options);

	    /**
	     * Maximum subdivision depth
	     * @property {number} maxDepth
	     */
	    this.maxDepth = typeof(options.maxDepth) !== 'undefined' ? options.maxDepth : 8;
	}
	Octree.prototype = new OctreeNode();

	OctreeNode.prototype.reset = function(aabb, options){
	    this.children.length = this.data.length = 0;
	};

	/**
	 * Insert data into this node
	 * @method insert
	 * @param  {AABB} aabb
	 * @param  {object} elementData
	 * @return {boolean} True if successful, otherwise false
	 */
	OctreeNode.prototype.insert = function(aabb, elementData, level){
	    var nodeData = this.data;
	    level = level || 0;

	    // Ignore objects that do not belong in this node
	    if (!this.aabb.contains(aabb)){
	        return false; // object cannot be added
	    }

	    var children = this.children;

	    if(level < (this.maxDepth || this.root.maxDepth)){
	        // Subdivide if there are no children yet
	        var subdivided = false;
	        if (!children.length){
	            this.subdivide();
	            subdivided = true;
	        }

	        // add to whichever node will accept it
	        for (var i = 0; i !== 8; i++) {
	            if (children[i].insert(aabb, elementData, level + 1)){
	                return true;
	            }
	        }

	        if(subdivided){
	            // No children accepted! Might as well just remove em since they contain none
	            children.length = 0;
	        }
	    }

	    // Too deep, or children didnt want it. add it in current node
	    nodeData.push(elementData);

	    return true;
	};

	var halfDiagonal = new Vec3();

	/**
	 * Create 8 equally sized children nodes and put them in the .children array.
	 * @method subdivide
	 */
	OctreeNode.prototype.subdivide = function() {
	    var aabb = this.aabb;
	    var l = aabb.lowerBound;
	    var u = aabb.upperBound;

	    var children = this.children;

	    children.push(
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,0,0) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,0,0) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,1,0) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,1,1) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,1,1) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,0,1) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,0,1) }) }),
	        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,1,0) }) })
	    );

	    u.vsub(l, halfDiagonal);
	    halfDiagonal.scale(0.5, halfDiagonal);

	    var root = this.root || this;

	    for (var i = 0; i !== 8; i++) {
	        var child = children[i];

	        // Set current node as root
	        child.root = root;

	        // Compute bounds
	        var lowerBound = child.aabb.lowerBound;
	        lowerBound.x *= halfDiagonal.x;
	        lowerBound.y *= halfDiagonal.y;
	        lowerBound.z *= halfDiagonal.z;

	        lowerBound.vadd(l, lowerBound);

	        // Upper bound is always lower bound + halfDiagonal
	        lowerBound.vadd(halfDiagonal, child.aabb.upperBound);
	    }
	};

	/**
	 * Get all data, potentially within an AABB
	 * @method aabbQuery
	 * @param  {AABB} aabb
	 * @param  {array} result
	 * @return {array} The "result" object
	 */
	OctreeNode.prototype.aabbQuery = function(aabb, result) {

	    var nodeData = this.data;

	    // abort if the range does not intersect this node
	    // if (!this.aabb.overlaps(aabb)){
	    //     return result;
	    // }

	    // Add objects at this level
	    // Array.prototype.push.apply(result, nodeData);

	    // Add child data
	    // @todo unwrap recursion into a queue / loop, that's faster in JS
	    var children = this.children;


	    // for (var i = 0, N = this.children.length; i !== N; i++) {
	    //     children[i].aabbQuery(aabb, result);
	    // }

	    var queue = [this];
	    while (queue.length) {
	        var node = queue.pop();
	        if (node.aabb.overlaps(aabb)){
	            Array.prototype.push.apply(result, node.data);
	        }
	        Array.prototype.push.apply(queue, node.children);
	    }

	    return result;
	};

	var tmpAABB = new AABB();

	/**
	 * Get all data, potentially intersected by a ray.
	 * @method rayQuery
	 * @param  {Ray} ray
	 * @param  {Transform} treeTransform
	 * @param  {array} result
	 * @return {array} The "result" object
	 */
	OctreeNode.prototype.rayQuery = function(ray, treeTransform, result) {

	    // Use aabb query for now.
	    // @todo implement real ray query which needs less lookups
	    ray.getAABB(tmpAABB);
	    tmpAABB.toLocalFrame(treeTransform, tmpAABB);
	    this.aabbQuery(tmpAABB, result);

	    return result;
	};

	/**
	 * @method removeEmptyNodes
	 */
	OctreeNode.prototype.removeEmptyNodes = function() {
	    var queue = [this];
	    while (queue.length) {
	        var node = queue.pop();
	        for (var i = node.children.length - 1; i >= 0; i--) {
	            if(!node.children[i].data.length){
	                node.children.splice(i, 1);
	            }
	        }
	        Array.prototype.push.apply(queue, node.children);
	    }
	};

	},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(_dereq_,module,exports){
	module.exports = Pool;

	/**
	 * For pooling objects that can be reused.
	 * @class Pool
	 * @constructor
	 */
	function Pool(){
	    /**
	     * The pooled objects
	     * @property {Array} objects
	     */
	    this.objects = [];

	    /**
	     * Constructor of the objects
	     * @property {mixed} type
	     */
	    this.type = Object;
	}

	/**
	 * Release an object after use
	 * @method release
	 * @param {Object} obj
	 */
	Pool.prototype.release = function(){
	    var Nargs = arguments.length;
	    for(var i=0; i!==Nargs; i++){
	        this.objects.push(arguments[i]);
	    }
	};

	/**
	 * Get an object
	 * @method get
	 * @return {mixed}
	 */
	Pool.prototype.get = function(){
	    if(this.objects.length===0){
	        return this.constructObject();
	    } else {
	        return this.objects.pop();
	    }
	};

	/**
	 * Construct an object. Should be implmented in each subclass.
	 * @method constructObject
	 * @return {mixed}
	 */
	Pool.prototype.constructObject = function(){
	    throw new Error("constructObject() not implemented in this Pool subclass yet!");
	};

	},{}],52:[function(_dereq_,module,exports){
	module.exports = TupleDictionary;

	/**
	 * @class TupleDictionary
	 * @constructor
	 */
	function TupleDictionary() {

	    /**
	     * The data storage
	     * @property data
	     * @type {Object}
	     */
	    this.data = { keys:[] };
	}

	/**
	 * @method get
	 * @param  {Number} i
	 * @param  {Number} j
	 * @return {Number}
	 */
	TupleDictionary.prototype.get = function(i, j) {
	    if (i > j) {
	        // swap
	        var temp = j;
	        j = i;
	        i = temp;
	    }
	    return this.data[i+'-'+j];
	};

	/**
	 * @method set
	 * @param  {Number} i
	 * @param  {Number} j
	 * @param {Number} value
	 */
	TupleDictionary.prototype.set = function(i, j, value) {
	    if (i > j) {
	        var temp = j;
	        j = i;
	        i = temp;
	    }
	    var key = i+'-'+j;

	    // Check if key already exists
	    if(!this.get(i,j)){
	        this.data.keys.push(key);
	    }

	    this.data[key] = value;
	};

	/**
	 * @method reset
	 */
	TupleDictionary.prototype.reset = function() {
	    var data = this.data,
	        keys = data.keys;
	    while(keys.length > 0){
	        var key = keys.pop();
	        delete data[key];
	    }
	};

	},{}],53:[function(_dereq_,module,exports){
	function Utils(){}

	module.exports = Utils;

	/**
	 * Extend an options object with default values.
	 * @static
	 * @method defaults
	 * @param  {object} options The options object. May be falsy: in this case, a new object is created and returned.
	 * @param  {object} defaults An object containing default values.
	 * @return {object} The modified options object.
	 */
	Utils.defaults = function(options, defaults){
	    options = options || {};

	    for(var key in defaults){
	        if(!(key in options)){
	            options[key] = defaults[key];
	        }
	    }

	    return options;
	};

	},{}],54:[function(_dereq_,module,exports){
	module.exports = Vec3Pool;

	var Vec3 = _dereq_('../math/Vec3');
	var Pool = _dereq_('./Pool');

	/**
	 * @class Vec3Pool
	 * @constructor
	 * @extends Pool
	 */
	function Vec3Pool(){
	    Pool.call(this);
	    this.type = Vec3;
	}
	Vec3Pool.prototype = new Pool();

	/**
	 * Construct a vector
	 * @method constructObject
	 * @return {Vec3}
	 */
	Vec3Pool.prototype.constructObject = function(){
	    return new Vec3();
	};

	},{"../math/Vec3":30,"./Pool":51}],55:[function(_dereq_,module,exports){
	module.exports = Narrowphase;

	var AABB = _dereq_('../collision/AABB');
	var Shape = _dereq_('../shapes/Shape');
	var Ray = _dereq_('../collision/Ray');
	var Vec3 = _dereq_('../math/Vec3');
	var Transform = _dereq_('../math/Transform');
	var ConvexPolyhedron = _dereq_('../shapes/ConvexPolyhedron');
	var Quaternion = _dereq_('../math/Quaternion');
	var Solver = _dereq_('../solver/Solver');
	var Vec3Pool = _dereq_('../utils/Vec3Pool');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var FrictionEquation = _dereq_('../equations/FrictionEquation');

	/**
	 * Helper class for the World. Generates ContactEquations.
	 * @class Narrowphase
	 * @constructor
	 * @todo Sphere-ConvexPolyhedron contacts
	 * @todo Contact reduction
	 * @todo  should move methods to prototype
	 */
	function Narrowphase(world){

	    /**
	     * Internal storage of pooled contact points.
	     * @property {Array} contactPointPool
	     */
	    this.contactPointPool = [];

	    this.frictionEquationPool = [];

	    this.result = [];
	    this.frictionResult = [];

	    /**
	     * Pooled vectors.
	     * @property {Vec3Pool} v3pool
	     */
	    this.v3pool = new Vec3Pool();

	    this.world = world;
	    this.currentContactMaterial = null;

	    /**
	     * @property {Boolean} enableFrictionReduction
	     */
	    this.enableFrictionReduction = false;
	}

	/**
	 * Make a contact object, by using the internal pool or creating a new one.
	 * @method createContactEquation
	 * @return {ContactEquation}
	 */
	Narrowphase.prototype.createContactEquation = function(bi, bj, si, sj, rsi, rsj){
	    var c;
	    if(this.contactPointPool.length){
	        c = this.contactPointPool.pop();
	        c.bi = bi;
	        c.bj = bj;
	    } else {
	        c = new ContactEquation(bi, bj);
	    }

	    c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;

	    var cm = this.currentContactMaterial;

	    c.restitution = cm.restitution;

	    c.setSpookParams(
	        cm.contactEquationStiffness,
	        cm.contactEquationRelaxation,
	        this.world.dt
	    );

	    var matA = si.material || bi.material;
	    var matB = sj.material || bj.material;
	    if(matA && matB && matA.restitution >= 0 && matB.restitution >= 0){
	        c.restitution = matA.restitution * matB.restitution;
	    }

	    c.si = rsi || si;
	    c.sj = rsj || sj;

	    return c;
	};

	Narrowphase.prototype.createFrictionEquationsFromContact = function(contactEquation, outArray){
	    var bodyA = contactEquation.bi;
	    var bodyB = contactEquation.bj;
	    var shapeA = contactEquation.si;
	    var shapeB = contactEquation.sj;

	    var world = this.world;
	    var cm = this.currentContactMaterial;

	    // If friction or restitution were specified in the material, use them
	    var friction = cm.friction;
	    var matA = shapeA.material || bodyA.material;
	    var matB = shapeB.material || bodyB.material;
	    if(matA && matB && matA.friction >= 0 && matB.friction >= 0){
	        friction = matA.friction * matB.friction;
	    }

	    if(friction > 0){

	        // Create 2 tangent equations
	        var mug = friction * world.gravity.length();
	        var reducedMass = (bodyA.invMass + bodyB.invMass);
	        if(reducedMass > 0){
	            reducedMass = 1/reducedMass;
	        }
	        var pool = this.frictionEquationPool;
	        var c1 = pool.length ? pool.pop() : new FrictionEquation(bodyA,bodyB,mug*reducedMass);
	        var c2 = pool.length ? pool.pop() : new FrictionEquation(bodyA,bodyB,mug*reducedMass);

	        c1.bi = c2.bi = bodyA;
	        c1.bj = c2.bj = bodyB;
	        c1.minForce = c2.minForce = -mug*reducedMass;
	        c1.maxForce = c2.maxForce = mug*reducedMass;

	        // Copy over the relative vectors
	        c1.ri.copy(contactEquation.ri);
	        c1.rj.copy(contactEquation.rj);
	        c2.ri.copy(contactEquation.ri);
	        c2.rj.copy(contactEquation.rj);

	        // Construct tangents
	        contactEquation.ni.tangents(c1.t, c2.t);

	        // Set spook params
	        c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);
	        c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);

	        c1.enabled = c2.enabled = contactEquation.enabled;

	        outArray.push(c1, c2);

	        return true;
	    }

	    return false;
	};

	var averageNormal = new Vec3();
	var averageContactPointA = new Vec3();
	var averageContactPointB = new Vec3();

	// Take the average N latest contact point on the plane.
	Narrowphase.prototype.createFrictionFromAverage = function(numContacts){
	    // The last contactEquation
	    var c = this.result[this.result.length - 1];

	    // Create the result: two "average" friction equations
	    if (!this.createFrictionEquationsFromContact(c, this.frictionResult) || numContacts === 1) {
	        return;
	    }

	    var f1 = this.frictionResult[this.frictionResult.length - 2];
	    var f2 = this.frictionResult[this.frictionResult.length - 1];

	    averageNormal.setZero();
	    averageContactPointA.setZero();
	    averageContactPointB.setZero();

	    var bodyA = c.bi;
	    var bodyB = c.bj;
	    for(var i=0; i!==numContacts; i++){
	        c = this.result[this.result.length - 1 - i];
	        if(c.bodyA !== bodyA){
	            averageNormal.vadd(c.ni, averageNormal); // vec2.add(eq.t, eq.t, c.normalA);
	            averageContactPointA.vadd(c.ri, averageContactPointA); // vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
	            averageContactPointB.vadd(c.rj, averageContactPointB);
	        } else {
	            averageNormal.vsub(c.ni, averageNormal); // vec2.sub(eq.t, eq.t, c.normalA);
	            averageContactPointA.vadd(c.rj, averageContactPointA); // vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
	            averageContactPointB.vadd(c.ri, averageContactPointB);
	        }
	    }

	    var invNumContacts = 1 / numContacts;
	    averageContactPointA.scale(invNumContacts, f1.ri); // vec2.scale(eq.contactPointA, eq.contactPointA, invNumContacts);
	    averageContactPointB.scale(invNumContacts, f1.rj); // vec2.scale(eq.contactPointB, eq.contactPointB, invNumContacts);
	    f2.ri.copy(f1.ri); // Should be the same
	    f2.rj.copy(f1.rj);
	    averageNormal.normalize();
	    averageNormal.tangents(f1.t, f2.t);
	    // return eq;
	};


	var tmpVec1 = new Vec3();
	var tmpVec2 = new Vec3();
	var tmpQuat1 = new Quaternion();
	var tmpQuat2 = new Quaternion();

	/**
	 * Generate all contacts between a list of body pairs
	 * @method getContacts
	 * @param {array} p1 Array of body indices
	 * @param {array} p2 Array of body indices
	 * @param {World} world
	 * @param {array} result Array to store generated contacts
	 * @param {array} oldcontacts Optional. Array of reusable contact objects
	 */
	Narrowphase.prototype.getContacts = function(p1, p2, world, result, oldcontacts, frictionResult, frictionPool){
	    // Save old contact objects
	    this.contactPointPool = oldcontacts;
	    this.frictionEquationPool = frictionPool;
	    this.result = result;
	    this.frictionResult = frictionResult;

	    var qi = tmpQuat1;
	    var qj = tmpQuat2;
	    var xi = tmpVec1;
	    var xj = tmpVec2;

	    for(var k=0, N=p1.length; k!==N; k++){

	        // Get current collision bodies
	        var bi = p1[k],
	            bj = p2[k];

	        // Get contact material
	        var bodyContactMaterial = null;
	        if(bi.material && bj.material){
	            bodyContactMaterial = world.getContactMaterial(bi.material,bj.material) || null;
	        }

	        for (var i = 0; i < bi.shapes.length; i++) {
	            bi.quaternion.mult(bi.shapeOrientations[i], qi);
	            bi.quaternion.vmult(bi.shapeOffsets[i], xi);
	            xi.vadd(bi.position, xi);
	            var si = bi.shapes[i];

	            for (var j = 0; j < bj.shapes.length; j++) {

	                // Compute world transform of shapes
	                bj.quaternion.mult(bj.shapeOrientations[j], qj);
	                bj.quaternion.vmult(bj.shapeOffsets[j], xj);
	                xj.vadd(bj.position, xj);
	                var sj = bj.shapes[j];

	                if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
	                    continue;
	                }

	                // Get collision material
	                var shapeContactMaterial = null;
	                if(si.material && sj.material){
	                    shapeContactMaterial = world.getContactMaterial(si.material,sj.material) || null;
	                }

	                this.currentContactMaterial = shapeContactMaterial || bodyContactMaterial || world.defaultContactMaterial;

	                // Get contacts
	                var resolver = this[si.type | sj.type];
	                if(resolver){
	                    if (si.type < sj.type) {
	                        resolver.call(this, si, sj, xi, xj, qi, qj, bi, bj, si, sj);
	                    } else {
	                        resolver.call(this, sj, si, xj, xi, qj, qi, bj, bi, si, sj);
	                    }
	                }
	            }
	        }
	    }
	};

	var numWarnings = 0;
	var maxWarnings = 10;

	function warn(msg){
	    if(numWarnings > maxWarnings){
	        return;
	    }

	    numWarnings++;

	    console.warn(msg);
	}

	Narrowphase.prototype[Shape.types.BOX | Shape.types.BOX] =
	Narrowphase.prototype.boxBox = function(si,sj,xi,xj,qi,qj,bi,bj){
	    si.convexPolyhedronRepresentation.material = si.material;
	    sj.convexPolyhedronRepresentation.material = sj.material;
	    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
	    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
	    this.convexConvex(si.convexPolyhedronRepresentation,sj.convexPolyhedronRepresentation,xi,xj,qi,qj,bi,bj,si,sj);
	};

	Narrowphase.prototype[Shape.types.BOX | Shape.types.CONVEXPOLYHEDRON] =
	Narrowphase.prototype.boxConvex = function(si,sj,xi,xj,qi,qj,bi,bj){
	    si.convexPolyhedronRepresentation.material = si.material;
	    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
	    this.convexConvex(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj,si,sj);
	};

	Narrowphase.prototype[Shape.types.BOX | Shape.types.PARTICLE] =
	Narrowphase.prototype.boxParticle = function(si,sj,xi,xj,qi,qj,bi,bj){
	    si.convexPolyhedronRepresentation.material = si.material;
	    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
	    this.convexParticle(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj,si,sj);
	};

	/**
	 * @method sphereSphere
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.SPHERE] =
	Narrowphase.prototype.sphereSphere = function(si,sj,xi,xj,qi,qj,bi,bj){
	    // We will have only one contact in this case
	    var r = this.createContactEquation(bi,bj,si,sj);

	    // Contact normal
	    xj.vsub(xi, r.ni);
	    r.ni.normalize();

	    // Contact point locations
	    r.ri.copy(r.ni);
	    r.rj.copy(r.ni);
	    r.ri.mult(si.radius, r.ri);
	    r.rj.mult(-sj.radius, r.rj);

	    r.ri.vadd(xi, r.ri);
	    r.ri.vsub(bi.position, r.ri);

	    r.rj.vadd(xj, r.rj);
	    r.rj.vsub(bj.position, r.rj);

	    this.result.push(r);

	    this.createFrictionEquationsFromContact(r, this.frictionResult);
	};

	/**
	 * @method planeTrimesh
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	var planeTrimesh_normal = new Vec3();
	var planeTrimesh_relpos = new Vec3();
	var planeTrimesh_projected = new Vec3();
	Narrowphase.prototype[Shape.types.PLANE | Shape.types.TRIMESH] =
	Narrowphase.prototype.planeTrimesh = function(
	    planeShape,
	    trimeshShape,
	    planePos,
	    trimeshPos,
	    planeQuat,
	    trimeshQuat,
	    planeBody,
	    trimeshBody
	){
	    // Make contacts!
	    var v = new Vec3();

	    var normal = planeTrimesh_normal;
	    normal.set(0,0,1);
	    planeQuat.vmult(normal,normal); // Turn normal according to plane

	    for(var i=0; i<trimeshShape.vertices.length / 3; i++){

	        // Get world vertex from trimesh
	        trimeshShape.getVertex(i, v);

	        // Safe up
	        var v2 = new Vec3();
	        v2.copy(v);
	        Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v);

	        // Check plane side
	        var relpos = planeTrimesh_relpos;
	        v.vsub(planePos, relpos);
	        var dot = normal.dot(relpos);

	        if(dot <= 0.0){
	            var r = this.createContactEquation(planeBody,trimeshBody,planeShape,trimeshShape);

	            r.ni.copy(normal); // Contact normal is the plane normal

	            // Get vertex position projected on plane
	            var projected = planeTrimesh_projected;
	            normal.scale(relpos.dot(normal), projected);
	            v.vsub(projected,projected);

	            // ri is the projected world position minus plane position
	            r.ri.copy(projected);
	            r.ri.vsub(planeBody.position, r.ri);

	            r.rj.copy(v);
	            r.rj.vsub(trimeshBody.position, r.rj);

	            // Store result
	            this.result.push(r);
	            this.createFrictionEquationsFromContact(r, this.frictionResult);
	        }
	    }
	};

	/**
	 * @method sphereTrimesh
	 * @param  {Shape}      sphereShape
	 * @param  {Shape}      trimeshShape
	 * @param  {Vec3}       spherePos
	 * @param  {Vec3}       trimeshPos
	 * @param  {Quaternion} sphereQuat
	 * @param  {Quaternion} trimeshQuat
	 * @param  {Body}       sphereBody
	 * @param  {Body}       trimeshBody
	 */
	var sphereTrimesh_normal = new Vec3();
	var sphereTrimesh_relpos = new Vec3();
	var sphereTrimesh_projected = new Vec3();
	var sphereTrimesh_v = new Vec3();
	var sphereTrimesh_v2 = new Vec3();
	var sphereTrimesh_edgeVertexA = new Vec3();
	var sphereTrimesh_edgeVertexB = new Vec3();
	var sphereTrimesh_edgeVector = new Vec3();
	var sphereTrimesh_edgeVectorUnit = new Vec3();
	var sphereTrimesh_localSpherePos = new Vec3();
	var sphereTrimesh_tmp = new Vec3();
	var sphereTrimesh_va = new Vec3();
	var sphereTrimesh_vb = new Vec3();
	var sphereTrimesh_vc = new Vec3();
	var sphereTrimesh_localSphereAABB = new AABB();
	var sphereTrimesh_triangles = [];
	Narrowphase.prototype[Shape.types.SPHERE | Shape.types.TRIMESH] =
	Narrowphase.prototype.sphereTrimesh = function (
	    sphereShape,
	    trimeshShape,
	    spherePos,
	    trimeshPos,
	    sphereQuat,
	    trimeshQuat,
	    sphereBody,
	    trimeshBody
	) {

	    var edgeVertexA = sphereTrimesh_edgeVertexA;
	    var edgeVertexB = sphereTrimesh_edgeVertexB;
	    var edgeVector = sphereTrimesh_edgeVector;
	    var edgeVectorUnit = sphereTrimesh_edgeVectorUnit;
	    var localSpherePos = sphereTrimesh_localSpherePos;
	    var tmp = sphereTrimesh_tmp;
	    var localSphereAABB = sphereTrimesh_localSphereAABB;
	    var v2 = sphereTrimesh_v2;
	    var relpos = sphereTrimesh_relpos;
	    var triangles = sphereTrimesh_triangles;

	    // Convert sphere position to local in the trimesh
	    Transform.pointToLocalFrame(trimeshPos, trimeshQuat, spherePos, localSpherePos);

	    // Get the aabb of the sphere locally in the trimesh
	    var sphereRadius = sphereShape.radius;
	    localSphereAABB.lowerBound.set(
	        localSpherePos.x - sphereRadius,
	        localSpherePos.y - sphereRadius,
	        localSpherePos.z - sphereRadius
	    );
	    localSphereAABB.upperBound.set(
	        localSpherePos.x + sphereRadius,
	        localSpherePos.y + sphereRadius,
	        localSpherePos.z + sphereRadius
	    );

	    trimeshShape.getTrianglesInAABB(localSphereAABB, triangles);
	    //for (var i = 0; i < trimeshShape.indices.length / 3; i++) triangles.push(i); // All

	    // Vertices
	    var v = sphereTrimesh_v;
	    var radiusSquared = sphereShape.radius * sphereShape.radius;
	    for(var i=0; i<triangles.length; i++){
	        for (var j = 0; j < 3; j++) {

	            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + j], v);

	            // Check vertex overlap in sphere
	            v.vsub(localSpherePos, relpos);

	            if(relpos.norm2() <= radiusSquared){

	                // Safe up
	                v2.copy(v);
	                Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v);

	                v.vsub(spherePos, relpos);

	                var r = this.createContactEquation(sphereBody,trimeshBody,sphereShape,trimeshShape);
	                r.ni.copy(relpos);
	                r.ni.normalize();

	                // ri is the vector from sphere center to the sphere surface
	                r.ri.copy(r.ni);
	                r.ri.scale(sphereShape.radius, r.ri);
	                r.ri.vadd(spherePos, r.ri);
	                r.ri.vsub(sphereBody.position, r.ri);

	                r.rj.copy(v);
	                r.rj.vsub(trimeshBody.position, r.rj);

	                // Store result
	                this.result.push(r);
	                this.createFrictionEquationsFromContact(r, this.frictionResult);
	            }
	        }
	    }

	    // Check all edges
	    for(var i=0; i<triangles.length; i++){
	        for (var j = 0; j < 3; j++) {

	            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + j], edgeVertexA);
	            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + ((j+1)%3)], edgeVertexB);
	            edgeVertexB.vsub(edgeVertexA, edgeVector);

	            // Project sphere position to the edge
	            localSpherePos.vsub(edgeVertexB, tmp);
	            var positionAlongEdgeB = tmp.dot(edgeVector);

	            localSpherePos.vsub(edgeVertexA, tmp);
	            var positionAlongEdgeA = tmp.dot(edgeVector);

	            if(positionAlongEdgeA > 0 && positionAlongEdgeB < 0){

	                // Now check the orthogonal distance from edge to sphere center
	                localSpherePos.vsub(edgeVertexA, tmp);

	                edgeVectorUnit.copy(edgeVector);
	                edgeVectorUnit.normalize();
	                positionAlongEdgeA = tmp.dot(edgeVectorUnit);

	                edgeVectorUnit.scale(positionAlongEdgeA, tmp);
	                tmp.vadd(edgeVertexA, tmp);

	                // tmp is now the sphere center position projected to the edge, defined locally in the trimesh frame
	                var dist = tmp.distanceTo(localSpherePos);
	                if(dist < sphereShape.radius){
	                    var r = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape);

	                    tmp.vsub(localSpherePos, r.ni);
	                    r.ni.normalize();
	                    r.ni.scale(sphereShape.radius, r.ri);

	                    Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
	                    tmp.vsub(trimeshBody.position, r.rj);

	                    Transform.vectorToWorldFrame(trimeshQuat, r.ni, r.ni);
	                    Transform.vectorToWorldFrame(trimeshQuat, r.ri, r.ri);

	                    this.result.push(r);
	                    this.createFrictionEquationsFromContact(r, this.frictionResult);
	                }
	            }
	        }
	    }

	    // Triangle faces
	    var va = sphereTrimesh_va;
	    var vb = sphereTrimesh_vb;
	    var vc = sphereTrimesh_vc;
	    var normal = sphereTrimesh_normal;
	    for(var i=0, N = triangles.length; i !== N; i++){
	        trimeshShape.getTriangleVertices(triangles[i], va, vb, vc);
	        trimeshShape.getNormal(triangles[i], normal);
	        localSpherePos.vsub(va, tmp);
	        var dist = tmp.dot(normal);
	        normal.scale(dist, tmp);
	        localSpherePos.vsub(tmp, tmp);

	        // tmp is now the sphere position projected to the triangle plane
	        dist = tmp.distanceTo(localSpherePos);
	        if(Ray.pointInTriangle(tmp, va, vb, vc) && dist < sphereShape.radius){
	            var r = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape);

	            tmp.vsub(localSpherePos, r.ni);
	            r.ni.normalize();
	            r.ni.scale(sphereShape.radius, r.ri);

	            Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
	            tmp.vsub(trimeshBody.position, r.rj);

	            Transform.vectorToWorldFrame(trimeshQuat, r.ni, r.ni);
	            Transform.vectorToWorldFrame(trimeshQuat, r.ri, r.ri);

	            this.result.push(r);
	            this.createFrictionEquationsFromContact(r, this.frictionResult);
	        }
	    }

	    triangles.length = 0;
	};

	var point_on_plane_to_sphere = new Vec3();
	var plane_to_sphere_ortho = new Vec3();

	/**
	 * @method spherePlane
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.SPHERE | Shape.types.PLANE] =
	Narrowphase.prototype.spherePlane = function(si,sj,xi,xj,qi,qj,bi,bj){
	    // We will have one contact in this case
	    var r = this.createContactEquation(bi,bj,si,sj);

	    // Contact normal
	    r.ni.set(0,0,1);
	    qj.vmult(r.ni, r.ni);
	    r.ni.negate(r.ni); // body i is the sphere, flip normal
	    r.ni.normalize(); // Needed?

	    // Vector from sphere center to contact point
	    r.ni.mult(si.radius, r.ri);

	    // Project down sphere on plane
	    xi.vsub(xj, point_on_plane_to_sphere);
	    r.ni.mult(r.ni.dot(point_on_plane_to_sphere), plane_to_sphere_ortho);
	    point_on_plane_to_sphere.vsub(plane_to_sphere_ortho,r.rj); // The sphere position projected to plane

	    if(-point_on_plane_to_sphere.dot(r.ni) <= si.radius){

	        // Make it relative to the body
	        var ri = r.ri;
	        var rj = r.rj;
	        ri.vadd(xi, ri);
	        ri.vsub(bi.position, ri);
	        rj.vadd(xj, rj);
	        rj.vsub(bj.position, rj);

	        this.result.push(r);
	        this.createFrictionEquationsFromContact(r, this.frictionResult);
	    }
	};

	// See http://bulletphysics.com/Bullet/BulletFull/SphereTriangleDetector_8cpp_source.html
	var pointInPolygon_edge = new Vec3();
	var pointInPolygon_edge_x_normal = new Vec3();
	var pointInPolygon_vtp = new Vec3();
	function pointInPolygon(verts, normal, p){
	    var positiveResult = null;
	    var N = verts.length;
	    for(var i=0; i!==N; i++){
	        var v = verts[i];

	        // Get edge to the next vertex
	        var edge = pointInPolygon_edge;
	        verts[(i+1) % (N)].vsub(v,edge);

	        // Get cross product between polygon normal and the edge
	        var edge_x_normal = pointInPolygon_edge_x_normal;
	        //var edge_x_normal = new Vec3();
	        edge.cross(normal,edge_x_normal);

	        // Get vector between point and current vertex
	        var vertex_to_p = pointInPolygon_vtp;
	        p.vsub(v,vertex_to_p);

	        // This dot product determines which side of the edge the point is
	        var r = edge_x_normal.dot(vertex_to_p);

	        // If all such dot products have same sign, we are inside the polygon.
	        if(positiveResult===null || (r>0 && positiveResult===true) || (r<=0 && positiveResult===false)){
	            if(positiveResult===null){
	                positiveResult = r>0;
	            }
	            continue;
	        } else {
	            return false; // Encountered some other sign. Exit.
	        }
	    }

	    // If we got here, all dot products were of the same sign.
	    return true;
	}

	var box_to_sphere = new Vec3();
	var sphereBox_ns = new Vec3();
	var sphereBox_ns1 = new Vec3();
	var sphereBox_ns2 = new Vec3();
	var sphereBox_sides = [new Vec3(),new Vec3(),new Vec3(),new Vec3(),new Vec3(),new Vec3()];
	var sphereBox_sphere_to_corner = new Vec3();
	var sphereBox_side_ns = new Vec3();
	var sphereBox_side_ns1 = new Vec3();
	var sphereBox_side_ns2 = new Vec3();

	/**
	 * @method sphereBox
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.SPHERE | Shape.types.BOX] =
	Narrowphase.prototype.sphereBox = function(si,sj,xi,xj,qi,qj,bi,bj){
	    var v3pool = this.v3pool;

	    // we refer to the box as body j
	    var sides = sphereBox_sides;
	    xi.vsub(xj,box_to_sphere);
	    sj.getSideNormals(sides,qj);
	    var R =     si.radius;
	    var penetrating_sides = [];

	    // Check side (plane) intersections
	    var found = false;

	    // Store the resulting side penetration info
	    var side_ns = sphereBox_side_ns;
	    var side_ns1 = sphereBox_side_ns1;
	    var side_ns2 = sphereBox_side_ns2;
	    var side_h = null;
	    var side_penetrations = 0;
	    var side_dot1 = 0;
	    var side_dot2 = 0;
	    var side_distance = null;
	    for(var idx=0,nsides=sides.length; idx!==nsides && found===false; idx++){
	        // Get the plane side normal (ns)
	        var ns = sphereBox_ns;
	        ns.copy(sides[idx]);

	        var h = ns.norm();
	        ns.normalize();

	        // The normal/distance dot product tells which side of the plane we are
	        var dot = box_to_sphere.dot(ns);

	        if(dot<h+R && dot>0){
	            // Intersects plane. Now check the other two dimensions
	            var ns1 = sphereBox_ns1;
	            var ns2 = sphereBox_ns2;
	            ns1.copy(sides[(idx+1)%3]);
	            ns2.copy(sides[(idx+2)%3]);
	            var h1 = ns1.norm();
	            var h2 = ns2.norm();
	            ns1.normalize();
	            ns2.normalize();
	            var dot1 = box_to_sphere.dot(ns1);
	            var dot2 = box_to_sphere.dot(ns2);
	            if(dot1<h1 && dot1>-h1 && dot2<h2 && dot2>-h2){
	                var dist = Math.abs(dot-h-R);
	                if(side_distance===null || dist < side_distance){
	                    side_distance = dist;
	                    side_dot1 = dot1;
	                    side_dot2 = dot2;
	                    side_h = h;
	                    side_ns.copy(ns);
	                    side_ns1.copy(ns1);
	                    side_ns2.copy(ns2);
	                    side_penetrations++;
	                }
	            }
	        }
	    }
	    if(side_penetrations){
	        found = true;
	        var r = this.createContactEquation(bi,bj,si,sj);
	        side_ns.mult(-R,r.ri); // Sphere r
	        r.ni.copy(side_ns);
	        r.ni.negate(r.ni); // Normal should be out of sphere
	        side_ns.mult(side_h,side_ns);
	        side_ns1.mult(side_dot1,side_ns1);
	        side_ns.vadd(side_ns1,side_ns);
	        side_ns2.mult(side_dot2,side_ns2);
	        side_ns.vadd(side_ns2,r.rj);

	        // Make relative to bodies
	        r.ri.vadd(xi, r.ri);
	        r.ri.vsub(bi.position, r.ri);
	        r.rj.vadd(xj, r.rj);
	        r.rj.vsub(bj.position, r.rj);

	        this.result.push(r);
	        this.createFrictionEquationsFromContact(r, this.frictionResult);
	    }

	    // Check corners
	    var rj = v3pool.get();
	    var sphere_to_corner = sphereBox_sphere_to_corner;
	    for(var j=0; j!==2 && !found; j++){
	        for(var k=0; k!==2 && !found; k++){
	            for(var l=0; l!==2 && !found; l++){
	                rj.set(0,0,0);
	                if(j){
	                    rj.vadd(sides[0],rj);
	                } else {
	                    rj.vsub(sides[0],rj);
	                }
	                if(k){
	                    rj.vadd(sides[1],rj);
	                } else {
	                    rj.vsub(sides[1],rj);
	                }
	                if(l){
	                    rj.vadd(sides[2],rj);
	                } else {
	                    rj.vsub(sides[2],rj);
	                }

	                // World position of corner
	                xj.vadd(rj,sphere_to_corner);
	                sphere_to_corner.vsub(xi,sphere_to_corner);

	                if(sphere_to_corner.norm2() < R*R){
	                    found = true;
	                    var r = this.createContactEquation(bi,bj,si,sj);
	                    r.ri.copy(sphere_to_corner);
	                    r.ri.normalize();
	                    r.ni.copy(r.ri);
	                    r.ri.mult(R,r.ri);
	                    r.rj.copy(rj);

	                    // Make relative to bodies
	                    r.ri.vadd(xi, r.ri);
	                    r.ri.vsub(bi.position, r.ri);
	                    r.rj.vadd(xj, r.rj);
	                    r.rj.vsub(bj.position, r.rj);

	                    this.result.push(r);
	                    this.createFrictionEquationsFromContact(r, this.frictionResult);
	                }
	            }
	        }
	    }
	    v3pool.release(rj);
	    rj = null;

	    // Check edges
	    var edgeTangent = v3pool.get();
	    var edgeCenter = v3pool.get();
	    var r = v3pool.get(); // r = edge center to sphere center
	    var orthogonal = v3pool.get();
	    var dist = v3pool.get();
	    var Nsides = sides.length;
	    for(var j=0; j!==Nsides && !found; j++){
	        for(var k=0; k!==Nsides && !found; k++){
	            if(j%3 !== k%3){
	                // Get edge tangent
	                sides[k].cross(sides[j],edgeTangent);
	                edgeTangent.normalize();
	                sides[j].vadd(sides[k], edgeCenter);
	                r.copy(xi);
	                r.vsub(edgeCenter,r);
	                r.vsub(xj,r);
	                var orthonorm = r.dot(edgeTangent); // distance from edge center to sphere center in the tangent direction
	                edgeTangent.mult(orthonorm,orthogonal); // Vector from edge center to sphere center in the tangent direction

	                // Find the third side orthogonal to this one
	                var l = 0;
	                while(l===j%3 || l===k%3){
	                    l++;
	                }

	                // vec from edge center to sphere projected to the plane orthogonal to the edge tangent
	                dist.copy(xi);
	                dist.vsub(orthogonal,dist);
	                dist.vsub(edgeCenter,dist);
	                dist.vsub(xj,dist);

	                // Distances in tangent direction and distance in the plane orthogonal to it
	                var tdist = Math.abs(orthonorm);
	                var ndist = dist.norm();

	                if(tdist < sides[l].norm() && ndist<R){
	                    found = true;
	                    var res = this.createContactEquation(bi,bj,si,sj);
	                    edgeCenter.vadd(orthogonal,res.rj); // box rj
	                    res.rj.copy(res.rj);
	                    dist.negate(res.ni);
	                    res.ni.normalize();

	                    res.ri.copy(res.rj);
	                    res.ri.vadd(xj,res.ri);
	                    res.ri.vsub(xi,res.ri);
	                    res.ri.normalize();
	                    res.ri.mult(R,res.ri);

	                    // Make relative to bodies
	                    res.ri.vadd(xi, res.ri);
	                    res.ri.vsub(bi.position, res.ri);
	                    res.rj.vadd(xj, res.rj);
	                    res.rj.vsub(bj.position, res.rj);

	                    this.result.push(res);
	                    this.createFrictionEquationsFromContact(res, this.frictionResult);
	                }
	            }
	        }
	    }
	    v3pool.release(edgeTangent,edgeCenter,r,orthogonal,dist);
	};

	var convex_to_sphere = new Vec3();
	var sphereConvex_edge = new Vec3();
	var sphereConvex_edgeUnit = new Vec3();
	var sphereConvex_sphereToCorner = new Vec3();
	var sphereConvex_worldCorner = new Vec3();
	var sphereConvex_worldNormal = new Vec3();
	var sphereConvex_worldPoint = new Vec3();
	var sphereConvex_worldSpherePointClosestToPlane = new Vec3();
	var sphereConvex_penetrationVec = new Vec3();
	var sphereConvex_sphereToWorldPoint = new Vec3();

	/**
	 * @method sphereConvex
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.SPHERE | Shape.types.CONVEXPOLYHEDRON] =
	Narrowphase.prototype.sphereConvex = function(si,sj,xi,xj,qi,qj,bi,bj){
	    var v3pool = this.v3pool;
	    xi.vsub(xj,convex_to_sphere);
	    var normals = sj.faceNormals;
	    var faces = sj.faces;
	    var verts = sj.vertices;
	    var R =     si.radius;
	    var penetrating_sides = [];

	    // if(convex_to_sphere.norm2() > si.boundingSphereRadius + sj.boundingSphereRadius){
	    //     return;
	    // }

	    // Check corners
	    for(var i=0; i!==verts.length; i++){
	        var v = verts[i];

	        // World position of corner
	        var worldCorner = sphereConvex_worldCorner;
	        qj.vmult(v,worldCorner);
	        xj.vadd(worldCorner,worldCorner);
	        var sphere_to_corner = sphereConvex_sphereToCorner;
	        worldCorner.vsub(xi, sphere_to_corner);
	        if(sphere_to_corner.norm2() < R * R){
	            found = true;
	            var r = this.createContactEquation(bi,bj,si,sj);
	            r.ri.copy(sphere_to_corner);
	            r.ri.normalize();
	            r.ni.copy(r.ri);
	            r.ri.mult(R,r.ri);
	            worldCorner.vsub(xj,r.rj);

	            // Should be relative to the body.
	            r.ri.vadd(xi, r.ri);
	            r.ri.vsub(bi.position, r.ri);

	            // Should be relative to the body.
	            r.rj.vadd(xj, r.rj);
	            r.rj.vsub(bj.position, r.rj);

	            this.result.push(r);
	            this.createFrictionEquationsFromContact(r, this.frictionResult);
	            return;
	        }
	    }

	    // Check side (plane) intersections
	    var found = false;
	    for(var i=0, nfaces=faces.length; i!==nfaces && found===false; i++){
	        var normal = normals[i];
	        var face = faces[i];

	        // Get world-transformed normal of the face
	        var worldNormal = sphereConvex_worldNormal;
	        qj.vmult(normal,worldNormal);

	        // Get a world vertex from the face
	        var worldPoint = sphereConvex_worldPoint;
	        qj.vmult(verts[face[0]],worldPoint);
	        worldPoint.vadd(xj,worldPoint);

	        // Get a point on the sphere, closest to the face normal
	        var worldSpherePointClosestToPlane = sphereConvex_worldSpherePointClosestToPlane;
	        worldNormal.mult(-R, worldSpherePointClosestToPlane);
	        xi.vadd(worldSpherePointClosestToPlane, worldSpherePointClosestToPlane);

	        // Vector from a face point to the closest point on the sphere
	        var penetrationVec = sphereConvex_penetrationVec;
	        worldSpherePointClosestToPlane.vsub(worldPoint,penetrationVec);

	        // The penetration. Negative value means overlap.
	        var penetration = penetrationVec.dot(worldNormal);

	        var worldPointToSphere = sphereConvex_sphereToWorldPoint;
	        xi.vsub(worldPoint, worldPointToSphere);

	        if(penetration < 0 && worldPointToSphere.dot(worldNormal)>0){
	            // Intersects plane. Now check if the sphere is inside the face polygon
	            var faceVerts = []; // Face vertices, in world coords
	            for(var j=0, Nverts=face.length; j!==Nverts; j++){
	                var worldVertex = v3pool.get();
	                qj.vmult(verts[face[j]], worldVertex);
	                xj.vadd(worldVertex,worldVertex);
	                faceVerts.push(worldVertex);
	            }

	            if(pointInPolygon(faceVerts,worldNormal,xi)){ // Is the sphere center in the face polygon?
	                found = true;
	                var r = this.createContactEquation(bi,bj,si,sj);

	                worldNormal.mult(-R, r.ri); // Contact offset, from sphere center to contact
	                worldNormal.negate(r.ni); // Normal pointing out of sphere

	                var penetrationVec2 = v3pool.get();
	                worldNormal.mult(-penetration, penetrationVec2);
	                var penetrationSpherePoint = v3pool.get();
	                worldNormal.mult(-R, penetrationSpherePoint);

	                //xi.vsub(xj).vadd(penetrationSpherePoint).vadd(penetrationVec2 , r.rj);
	                xi.vsub(xj,r.rj);
	                r.rj.vadd(penetrationSpherePoint,r.rj);
	                r.rj.vadd(penetrationVec2 , r.rj);

	                // Should be relative to the body.
	                r.rj.vadd(xj, r.rj);
	                r.rj.vsub(bj.position, r.rj);

	                // Should be relative to the body.
	                r.ri.vadd(xi, r.ri);
	                r.ri.vsub(bi.position, r.ri);

	                v3pool.release(penetrationVec2);
	                v3pool.release(penetrationSpherePoint);

	                this.result.push(r);
	                this.createFrictionEquationsFromContact(r, this.frictionResult);

	                // Release world vertices
	                for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
	                    v3pool.release(faceVerts[j]);
	                }

	                return; // We only expect *one* face contact
	            } else {
	                // Edge?
	                for(var j=0; j!==face.length; j++){

	                    // Get two world transformed vertices
	                    var v1 = v3pool.get();
	                    var v2 = v3pool.get();
	                    qj.vmult(verts[face[(j+1)%face.length]], v1);
	                    qj.vmult(verts[face[(j+2)%face.length]], v2);
	                    xj.vadd(v1, v1);
	                    xj.vadd(v2, v2);

	                    // Construct edge vector
	                    var edge = sphereConvex_edge;
	                    v2.vsub(v1,edge);

	                    // Construct the same vector, but normalized
	                    var edgeUnit = sphereConvex_edgeUnit;
	                    edge.unit(edgeUnit);

	                    // p is xi projected onto the edge
	                    var p = v3pool.get();
	                    var v1_to_xi = v3pool.get();
	                    xi.vsub(v1, v1_to_xi);
	                    var dot = v1_to_xi.dot(edgeUnit);
	                    edgeUnit.mult(dot, p);
	                    p.vadd(v1, p);

	                    // Compute a vector from p to the center of the sphere
	                    var xi_to_p = v3pool.get();
	                    p.vsub(xi, xi_to_p);

	                    // Collision if the edge-sphere distance is less than the radius
	                    // AND if p is in between v1 and v2
	                    if(dot > 0 && dot*dot<edge.norm2() && xi_to_p.norm2() < R*R){ // Collision if the edge-sphere distance is less than the radius
	                        // Edge contact!
	                        var r = this.createContactEquation(bi,bj,si,sj);
	                        p.vsub(xj,r.rj);

	                        p.vsub(xi,r.ni);
	                        r.ni.normalize();

	                        r.ni.mult(R,r.ri);

	                        // Should be relative to the body.
	                        r.rj.vadd(xj, r.rj);
	                        r.rj.vsub(bj.position, r.rj);

	                        // Should be relative to the body.
	                        r.ri.vadd(xi, r.ri);
	                        r.ri.vsub(bi.position, r.ri);

	                        this.result.push(r);
	                        this.createFrictionEquationsFromContact(r, this.frictionResult);

	                        // Release world vertices
	                        for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
	                            v3pool.release(faceVerts[j]);
	                        }

	                        v3pool.release(v1);
	                        v3pool.release(v2);
	                        v3pool.release(p);
	                        v3pool.release(xi_to_p);
	                        v3pool.release(v1_to_xi);

	                        return;
	                    }

	                    v3pool.release(v1);
	                    v3pool.release(v2);
	                    v3pool.release(p);
	                    v3pool.release(xi_to_p);
	                    v3pool.release(v1_to_xi);
	                }
	            }

	            // Release world vertices
	            for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
	                v3pool.release(faceVerts[j]);
	            }
	        }
	    }
	};

	var planeBox_normal = new Vec3();
	var plane_to_corner = new Vec3();

	/**
	 * @method planeBox
	 * @param  {Array}      result
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.PLANE | Shape.types.BOX] =
	Narrowphase.prototype.planeBox = function(si,sj,xi,xj,qi,qj,bi,bj){
	    sj.convexPolyhedronRepresentation.material = sj.material;
	    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
	    this.planeConvex(si,sj.convexPolyhedronRepresentation,xi,xj,qi,qj,bi,bj);
	};

	var planeConvex_v = new Vec3();
	var planeConvex_normal = new Vec3();
	var planeConvex_relpos = new Vec3();
	var planeConvex_projected = new Vec3();

	/**
	 * @method planeConvex
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.PLANE | Shape.types.CONVEXPOLYHEDRON] =
	Narrowphase.prototype.planeConvex = function(
	    planeShape,
	    convexShape,
	    planePosition,
	    convexPosition,
	    planeQuat,
	    convexQuat,
	    planeBody,
	    convexBody
	){
	    // Simply return the points behind the plane.
	    var worldVertex = planeConvex_v,
	        worldNormal = planeConvex_normal;
	    worldNormal.set(0,0,1);
	    planeQuat.vmult(worldNormal,worldNormal); // Turn normal according to plane orientation

	    var numContacts = 0;
	    var relpos = planeConvex_relpos;
	    for(var i = 0; i !== convexShape.vertices.length; i++){

	        // Get world convex vertex
	        worldVertex.copy(convexShape.vertices[i]);
	        convexQuat.vmult(worldVertex, worldVertex);
	        convexPosition.vadd(worldVertex, worldVertex);
	        worldVertex.vsub(planePosition, relpos);

	        var dot = worldNormal.dot(relpos);
	        if(dot <= 0.0){

	            var r = this.createContactEquation(planeBody, convexBody, planeShape, convexShape);

	            // Get vertex position projected on plane
	            var projected = planeConvex_projected;
	            worldNormal.mult(worldNormal.dot(relpos),projected);
	            worldVertex.vsub(projected, projected);
	            projected.vsub(planePosition, r.ri); // From plane to vertex projected on plane

	            r.ni.copy(worldNormal); // Contact normal is the plane normal out from plane

	            // rj is now just the vector from the convex center to the vertex
	            worldVertex.vsub(convexPosition, r.rj);

	            // Make it relative to the body
	            r.ri.vadd(planePosition, r.ri);
	            r.ri.vsub(planeBody.position, r.ri);
	            r.rj.vadd(convexPosition, r.rj);
	            r.rj.vsub(convexBody.position, r.rj);

	            this.result.push(r);
	            numContacts++;
	            if(!this.enableFrictionReduction){
	                this.createFrictionEquationsFromContact(r, this.frictionResult);
	            }
	        }
	    }

	    if(this.enableFrictionReduction && numContacts){
	        this.createFrictionFromAverage(numContacts);
	    }
	};

	var convexConvex_sepAxis = new Vec3();
	var convexConvex_q = new Vec3();

	/**
	 * @method convexConvex
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON] =
	Narrowphase.prototype.convexConvex = function(si,sj,xi,xj,qi,qj,bi,bj,rsi,rsj,faceListA,faceListB){
	    var sepAxis = convexConvex_sepAxis;

	    if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
	        return;
	    }

	    if(si.findSeparatingAxis(sj,xi,qi,xj,qj,sepAxis,faceListA,faceListB)){
	        var res = [];
	        var q = convexConvex_q;
	        si.clipAgainstHull(xi,qi,sj,xj,qj,sepAxis,-100,100,res);
	        var numContacts = 0;
	        for(var j = 0; j !== res.length; j++){
	            var r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
	                ri = r.ri,
	                rj = r.rj;
	            sepAxis.negate(r.ni);
	            res[j].normal.negate(q);
	            q.mult(res[j].depth, q);
	            res[j].point.vadd(q, ri);
	            rj.copy(res[j].point);

	            // Contact points are in world coordinates. Transform back to relative
	            ri.vsub(xi,ri);
	            rj.vsub(xj,rj);

	            // Make relative to bodies
	            ri.vadd(xi, ri);
	            ri.vsub(bi.position, ri);
	            rj.vadd(xj, rj);
	            rj.vsub(bj.position, rj);

	            this.result.push(r);
	            numContacts++;
	            if(!this.enableFrictionReduction){
	                this.createFrictionEquationsFromContact(r, this.frictionResult);
	            }
	        }
	        if(this.enableFrictionReduction && numContacts){
	            this.createFrictionFromAverage(numContacts);
	        }
	    }
	};


	/**
	 * @method convexTrimesh
	 * @param  {Array}      result
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	// Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON | Shape.types.TRIMESH] =
	// Narrowphase.prototype.convexTrimesh = function(si,sj,xi,xj,qi,qj,bi,bj,rsi,rsj,faceListA,faceListB){
	//     var sepAxis = convexConvex_sepAxis;

	//     if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
	//         return;
	//     }

	//     // Construct a temp hull for each triangle
	//     var hullB = new ConvexPolyhedron();

	//     hullB.faces = [[0,1,2]];
	//     var va = new Vec3();
	//     var vb = new Vec3();
	//     var vc = new Vec3();
	//     hullB.vertices = [
	//         va,
	//         vb,
	//         vc
	//     ];

	//     for (var i = 0; i < sj.indices.length / 3; i++) {

	//         var triangleNormal = new Vec3();
	//         sj.getNormal(i, triangleNormal);
	//         hullB.faceNormals = [triangleNormal];

	//         sj.getTriangleVertices(i, va, vb, vc);

	//         var d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
	//         if(!d){
	//             triangleNormal.scale(-1, triangleNormal);
	//             d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);

	//             if(!d){
	//                 continue;
	//             }
	//         }

	//         var res = [];
	//         var q = convexConvex_q;
	//         si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
	//         for(var j = 0; j !== res.length; j++){
	//             var r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
	//                 ri = r.ri,
	//                 rj = r.rj;
	//             r.ni.copy(triangleNormal);
	//             r.ni.negate(r.ni);
	//             res[j].normal.negate(q);
	//             q.mult(res[j].depth, q);
	//             res[j].point.vadd(q, ri);
	//             rj.copy(res[j].point);

	//             // Contact points are in world coordinates. Transform back to relative
	//             ri.vsub(xi,ri);
	//             rj.vsub(xj,rj);

	//             // Make relative to bodies
	//             ri.vadd(xi, ri);
	//             ri.vsub(bi.position, ri);
	//             rj.vadd(xj, rj);
	//             rj.vsub(bj.position, rj);

	//             result.push(r);
	//         }
	//     }
	// };

	var particlePlane_normal = new Vec3();
	var particlePlane_relpos = new Vec3();
	var particlePlane_projected = new Vec3();

	/**
	 * @method particlePlane
	 * @param  {Array}      result
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.PLANE | Shape.types.PARTICLE] =
	Narrowphase.prototype.planeParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
	    var normal = particlePlane_normal;
	    normal.set(0,0,1);
	    bj.quaternion.vmult(normal,normal); // Turn normal according to plane orientation
	    var relpos = particlePlane_relpos;
	    xi.vsub(bj.position,relpos);
	    var dot = normal.dot(relpos);
	    if(dot <= 0.0){
	        var r = this.createContactEquation(bi,bj,si,sj);
	        r.ni.copy(normal); // Contact normal is the plane normal
	        r.ni.negate(r.ni);
	        r.ri.set(0,0,0); // Center of particle

	        // Get particle position projected on plane
	        var projected = particlePlane_projected;
	        normal.mult(normal.dot(xi),projected);
	        xi.vsub(projected,projected);
	        //projected.vadd(bj.position,projected);

	        // rj is now the projected world position minus plane position
	        r.rj.copy(projected);
	        this.result.push(r);
	        this.createFrictionEquationsFromContact(r, this.frictionResult);
	    }
	};

	var particleSphere_normal = new Vec3();

	/**
	 * @method particleSphere
	 * @param  {Array}      result
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.PARTICLE | Shape.types.SPHERE] =
	Narrowphase.prototype.sphereParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
	    // The normal is the unit vector from sphere center to particle center
	    var normal = particleSphere_normal;
	    normal.set(0,0,1);
	    xi.vsub(xj,normal);
	    var lengthSquared = normal.norm2();

	    if(lengthSquared <= sj.radius * sj.radius){
	        var r = this.createContactEquation(bi,bj,si,sj);
	        normal.normalize();
	        r.rj.copy(normal);
	        r.rj.mult(sj.radius,r.rj);
	        r.ni.copy(normal); // Contact normal
	        r.ni.negate(r.ni);
	        r.ri.set(0,0,0); // Center of particle
	        this.result.push(r);
	        this.createFrictionEquationsFromContact(r, this.frictionResult);
	    }
	};

	// WIP
	var cqj = new Quaternion();
	var convexParticle_local = new Vec3();
	var convexParticle_normal = new Vec3();
	var convexParticle_penetratedFaceNormal = new Vec3();
	var convexParticle_vertexToParticle = new Vec3();
	var convexParticle_worldPenetrationVec = new Vec3();

	/**
	 * @method convexParticle
	 * @param  {Array}      result
	 * @param  {Shape}      si
	 * @param  {Shape}      sj
	 * @param  {Vec3}       xi
	 * @param  {Vec3}       xj
	 * @param  {Quaternion} qi
	 * @param  {Quaternion} qj
	 * @param  {Body}       bi
	 * @param  {Body}       bj
	 */
	Narrowphase.prototype[Shape.types.PARTICLE | Shape.types.CONVEXPOLYHEDRON] =
	Narrowphase.prototype.convexParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
	    var penetratedFaceIndex = -1;
	    var penetratedFaceNormal = convexParticle_penetratedFaceNormal;
	    var worldPenetrationVec = convexParticle_worldPenetrationVec;
	    var minPenetration = null;
	    var numDetectedFaces = 0;

	    // Convert particle position xi to local coords in the convex
	    var local = convexParticle_local;
	    local.copy(xi);
	    local.vsub(xj,local); // Convert position to relative the convex origin
	    qj.conjugate(cqj);
	    cqj.vmult(local,local);

	    if(sj.pointIsInside(local)){

	        if(sj.worldVerticesNeedsUpdate){
	            sj.computeWorldVertices(xj,qj);
	        }
	        if(sj.worldFaceNormalsNeedsUpdate){
	            sj.computeWorldFaceNormals(qj);
	        }

	        // For each world polygon in the polyhedra
	        for(var i=0,nfaces=sj.faces.length; i!==nfaces; i++){

	            // Construct world face vertices
	            var verts = [ sj.worldVertices[ sj.faces[i][0] ] ];
	            var normal = sj.worldFaceNormals[i];

	            // Check how much the particle penetrates the polygon plane.
	            xi.vsub(verts[0],convexParticle_vertexToParticle);
	            var penetration = -normal.dot(convexParticle_vertexToParticle);
	            if(minPenetration===null || Math.abs(penetration)<Math.abs(minPenetration)){
	                minPenetration = penetration;
	                penetratedFaceIndex = i;
	                penetratedFaceNormal.copy(normal);
	                numDetectedFaces++;
	            }
	        }

	        if(penetratedFaceIndex!==-1){
	            // Setup contact
	            var r = this.createContactEquation(bi,bj,si,sj);
	            penetratedFaceNormal.mult(minPenetration, worldPenetrationVec);

	            // rj is the particle position projected to the face
	            worldPenetrationVec.vadd(xi,worldPenetrationVec);
	            worldPenetrationVec.vsub(xj,worldPenetrationVec);
	            r.rj.copy(worldPenetrationVec);
	            //var projectedToFace = xi.vsub(xj).vadd(worldPenetrationVec);
	            //projectedToFace.copy(r.rj);

	            //qj.vmult(r.rj,r.rj);
	            penetratedFaceNormal.negate( r.ni ); // Contact normal
	            r.ri.set(0,0,0); // Center of particle

	            var ri = r.ri,
	                rj = r.rj;

	            // Make relative to bodies
	            ri.vadd(xi, ri);
	            ri.vsub(bi.position, ri);
	            rj.vadd(xj, rj);
	            rj.vsub(bj.position, rj);

	            this.result.push(r);
	            this.createFrictionEquationsFromContact(r, this.frictionResult);
	        } else {
	            console.warn("Point found inside convex, but did not find penetrating face!");
	        }
	    }
	};

	Narrowphase.prototype[Shape.types.BOX | Shape.types.HEIGHTFIELD] =
	Narrowphase.prototype.boxHeightfield = function (si,sj,xi,xj,qi,qj,bi,bj){
	    si.convexPolyhedronRepresentation.material = si.material;
	    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
	    this.convexHeightfield(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj);
	};

	var convexHeightfield_tmp1 = new Vec3();
	var convexHeightfield_tmp2 = new Vec3();
	var convexHeightfield_faceList = [0];

	/**
	 * @method convexHeightfield
	 */
	Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON | Shape.types.HEIGHTFIELD] =
	Narrowphase.prototype.convexHeightfield = function (
	    convexShape,
	    hfShape,
	    convexPos,
	    hfPos,
	    convexQuat,
	    hfQuat,
	    convexBody,
	    hfBody
	){
	    var data = hfShape.data,
	        w = hfShape.elementSize,
	        radius = convexShape.boundingSphereRadius,
	        worldPillarOffset = convexHeightfield_tmp2,
	        faceList = convexHeightfield_faceList;

	    // Get sphere position to heightfield local!
	    var localConvexPos = convexHeightfield_tmp1;
	    Transform.pointToLocalFrame(hfPos, hfQuat, convexPos, localConvexPos);

	    // Get the index of the data points to test against
	    var iMinX = Math.floor((localConvexPos.x - radius) / w) - 1,
	        iMaxX = Math.ceil((localConvexPos.x + radius) / w) + 1,
	        iMinY = Math.floor((localConvexPos.y - radius) / w) - 1,
	        iMaxY = Math.ceil((localConvexPos.y + radius) / w) + 1;

	    // Bail out if we are out of the terrain
	    if(iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMinY > data[0].length){
	        return;
	    }

	    // Clamp index to edges
	    if(iMinX < 0){ iMinX = 0; }
	    if(iMaxX < 0){ iMaxX = 0; }
	    if(iMinY < 0){ iMinY = 0; }
	    if(iMaxY < 0){ iMaxY = 0; }
	    if(iMinX >= data.length){ iMinX = data.length - 1; }
	    if(iMaxX >= data.length){ iMaxX = data.length - 1; }
	    if(iMaxY >= data[0].length){ iMaxY = data[0].length - 1; }
	    if(iMinY >= data[0].length){ iMinY = data[0].length - 1; }

	    var minMax = [];
	    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
	    var min = minMax[0];
	    var max = minMax[1];

	    // Bail out if we're cant touch the bounding height box
	    if(localConvexPos.z - radius > max || localConvexPos.z + radius < min){
	        return;
	    }

	    for(var i = iMinX; i < iMaxX; i++){
	        for(var j = iMinY; j < iMaxY; j++){

	            // Lower triangle
	            hfShape.getConvexTrianglePillar(i, j, false);
	            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
	            if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
	                this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, faceList, null);
	            }

	            // Upper triangle
	            hfShape.getConvexTrianglePillar(i, j, true);
	            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
	            if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
	                this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, faceList, null);
	            }
	        }
	    }
	};

	var sphereHeightfield_tmp1 = new Vec3();
	var sphereHeightfield_tmp2 = new Vec3();

	/**
	 * @method sphereHeightfield
	 */
	Narrowphase.prototype[Shape.types.SPHERE | Shape.types.HEIGHTFIELD] =
	Narrowphase.prototype.sphereHeightfield = function (
	    sphereShape,
	    hfShape,
	    spherePos,
	    hfPos,
	    sphereQuat,
	    hfQuat,
	    sphereBody,
	    hfBody
	){
	    var data = hfShape.data,
	        radius = sphereShape.radius,
	        w = hfShape.elementSize,
	        worldPillarOffset = sphereHeightfield_tmp2;

	    // Get sphere position to heightfield local!
	    var localSpherePos = sphereHeightfield_tmp1;
	    Transform.pointToLocalFrame(hfPos, hfQuat, spherePos, localSpherePos);

	    // Get the index of the data points to test against
	    var iMinX = Math.floor((localSpherePos.x - radius) / w) - 1,
	        iMaxX = Math.ceil((localSpherePos.x + radius) / w) + 1,
	        iMinY = Math.floor((localSpherePos.y - radius) / w) - 1,
	        iMaxY = Math.ceil((localSpherePos.y + radius) / w) + 1;

	    // Bail out if we are out of the terrain
	    if(iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMaxY > data[0].length){
	        return;
	    }

	    // Clamp index to edges
	    if(iMinX < 0){ iMinX = 0; }
	    if(iMaxX < 0){ iMaxX = 0; }
	    if(iMinY < 0){ iMinY = 0; }
	    if(iMaxY < 0){ iMaxY = 0; }
	    if(iMinX >= data.length){ iMinX = data.length - 1; }
	    if(iMaxX >= data.length){ iMaxX = data.length - 1; }
	    if(iMaxY >= data[0].length){ iMaxY = data[0].length - 1; }
	    if(iMinY >= data[0].length){ iMinY = data[0].length - 1; }

	    var minMax = [];
	    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
	    var min = minMax[0];
	    var max = minMax[1];

	    // Bail out if we're cant touch the bounding height box
	    if(localSpherePos.z - radius > max || localSpherePos.z + radius < min){
	        return;
	    }

	    var result = this.result;
	    for(var i = iMinX; i < iMaxX; i++){
	        for(var j = iMinY; j < iMaxY; j++){

	            var numContactsBefore = result.length;

	            // Lower triangle
	            hfShape.getConvexTrianglePillar(i, j, false);
	            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
	            if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
	                this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody);
	            }

	            // Upper triangle
	            hfShape.getConvexTrianglePillar(i, j, true);
	            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
	            if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
	                this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody);
	            }

	            var numContacts = result.length - numContactsBefore;

	            if(numContacts > 2){
	                return;
	            }
	            /*
	            // Skip all but 1
	            for (var k = 0; k < numContacts - 1; k++) {
	                result.pop();
	            }
	            */
	        }
	    }
	};

	},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(_dereq_,module,exports){
	/* global performance */

	module.exports = World;

	var Shape = _dereq_('../shapes/Shape');
	var Vec3 = _dereq_('../math/Vec3');
	var Quaternion = _dereq_('../math/Quaternion');
	var GSSolver = _dereq_('../solver/GSSolver');
	var Vec3Pool = _dereq_('../utils/Vec3Pool');
	var ContactEquation = _dereq_('../equations/ContactEquation');
	var FrictionEquation = _dereq_('../equations/FrictionEquation');
	var Narrowphase = _dereq_('./Narrowphase');
	var EventTarget = _dereq_('../utils/EventTarget');
	var ArrayCollisionMatrix = _dereq_('../collision/ArrayCollisionMatrix');
	var Material = _dereq_('../material/Material');
	var ContactMaterial = _dereq_('../material/ContactMaterial');
	var Body = _dereq_('../objects/Body');
	var TupleDictionary = _dereq_('../utils/TupleDictionary');
	var RaycastResult = _dereq_('../collision/RaycastResult');
	var AABB = _dereq_('../collision/AABB');
	var Ray = _dereq_('../collision/Ray');
	var NaiveBroadphase = _dereq_('../collision/NaiveBroadphase');

	/**
	 * The physics world
	 * @class World
	 * @constructor
	 * @extends EventTarget
	 */
	function World(){
	    EventTarget.apply(this);

	    /**
	     * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
	     * @property {Number} dt
	     */
	    this.dt = -1;

	    /**
	     * Makes bodies go to sleep when they've been inactive
	     * @property allowSleep
	     * @type {Boolean}
	     */
	    this.allowSleep = false;

	    /**
	     * All the current contacts (instances of ContactEquation) in the world.
	     * @property contacts
	     * @type {Array}
	     */
	    this.contacts = [];
	    this.frictionEquations = [];

	    /**
	     * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
	     * @property quatNormalizeSkip
	     * @type {Number}
	     */
	    this.quatNormalizeSkip = 0;

	    /**
	     * Set to true to use fast quaternion normalization. It is often enough accurate to use. If bodies tend to explode, set to false.
	     * @property quatNormalizeFast
	     * @type {Boolean}
	     * @see Quaternion.normalizeFast
	     * @see Quaternion.normalize
	     */
	    this.quatNormalizeFast = false;

	    /**
	     * The wall-clock time since simulation start
	     * @property time
	     * @type {Number}
	     */
	    this.time = 0.0;

	    /**
	     * Number of timesteps taken since start
	     * @property stepnumber
	     * @type {Number}
	     */
	    this.stepnumber = 0;

	    /// Default and last timestep sizes
	    this.default_dt = 1/60;

	    this.nextId = 0;
	    /**
	     * @property gravity
	     * @type {Vec3}
	     */
	    this.gravity = new Vec3();

	    /**
	     * @property broadphase
	     * @type {Broadphase}
	     */
	    this.broadphase = new NaiveBroadphase();

	    /**
	     * @property bodies
	     * @type {Array}
	     */
	    this.bodies = [];

	    /**
	     * @property solver
	     * @type {Solver}
	     */
	    this.solver = new GSSolver();

	    /**
	     * @property constraints
	     * @type {Array}
	     */
	    this.constraints = [];

	    /**
	     * @property narrowphase
	     * @type {Narrowphase}
	     */
	    this.narrowphase = new Narrowphase(this);

	    /**
	     * @property {ArrayCollisionMatrix} collisionMatrix
		 * @type {ArrayCollisionMatrix}
		 */
		this.collisionMatrix = new ArrayCollisionMatrix();

	    /**
	     * CollisionMatrix from the previous step.
	     * @property {ArrayCollisionMatrix} collisionMatrixPrevious
		 * @type {ArrayCollisionMatrix}
		 */
		this.collisionMatrixPrevious = new ArrayCollisionMatrix();

	    /**
	     * All added materials
	     * @property materials
	     * @type {Array}
	     */
	    this.materials = [];

	    /**
	     * @property contactmaterials
	     * @type {Array}
	     */
	    this.contactmaterials = [];

	    /**
	     * Used to look up a ContactMaterial given two instances of Material.
	     * @property {TupleDictionary} contactMaterialTable
	     */
	    this.contactMaterialTable = new TupleDictionary();

	    this.defaultMaterial = new Material("default");

	    /**
	     * This contact material is used if no suitable contactmaterial is found for a contact.
	     * @property defaultContactMaterial
	     * @type {ContactMaterial}
	     */
	    this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial, this.defaultMaterial, { friction: 0.3, restitution: 0.0 });

	    /**
	     * @property doProfiling
	     * @type {Boolean}
	     */
	    this.doProfiling = false;

	    /**
	     * @property profile
	     * @type {Object}
	     */
	    this.profile = {
	        solve:0,
	        makeContactConstraints:0,
	        broadphase:0,
	        integrate:0,
	        narrowphase:0,
	    };

	    /**
	     * @property subsystems
	     * @type {Array}
	     */
	    this.subsystems = [];

	    this.addBodyEvent = {
	        type:"addBody",
	        body : null,
	    };

	    this.removeBodyEvent = {
	        type:"removeBody",
	        body : null,
	    };
	}
	World.prototype = new EventTarget();

	// Temp stuff
	var tmpAABB1 = new AABB();
	var tmpArray1 = [];
	var tmpRay = new Ray();

	/**
	 * Get the contact material between materials m1 and m2
	 * @method getContactMaterial
	 * @param {Material} m1
	 * @param {Material} m2
	 * @return {ContactMaterial} The contact material if it was found.
	 */
	World.prototype.getContactMaterial = function(m1,m2){
	    return this.contactMaterialTable.get(m1.id,m2.id); //this.contactmaterials[this.mats2cmat[i+j*this.materials.length]];
	};

	/**
	 * Get number of objects in the world.
	 * @method numObjects
	 * @return {Number}
	 * @deprecated
	 */
	World.prototype.numObjects = function(){
	    return this.bodies.length;
	};

	/**
	 * Store old collision state info
	 * @method collisionMatrixTick
	 */
	World.prototype.collisionMatrixTick = function(){
		var temp = this.collisionMatrixPrevious;
		this.collisionMatrixPrevious = this.collisionMatrix;
		this.collisionMatrix = temp;
		this.collisionMatrix.reset();
	};

	/**
	 * Add a rigid body to the simulation.
	 * @method add
	 * @param {Body} body
	 * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
	 * @todo Adding an array of bodies should be possible. This would save some loops too
	 * @deprecated Use .addBody instead
	 */
	World.prototype.add = World.prototype.addBody = function(body){
	    if(this.bodies.indexOf(body) !== -1){
	        return;
	    }
	    body.index = this.bodies.length;
	    this.bodies.push(body);
	    body.world = this;
	    body.initPosition.copy(body.position);
	    body.initVelocity.copy(body.velocity);
	    body.timeLastSleepy = this.time;
	    if(body instanceof Body){
	        body.initAngularVelocity.copy(body.angularVelocity);
	        body.initQuaternion.copy(body.quaternion);
	    }
		this.collisionMatrix.setNumObjects(this.bodies.length);
	    this.addBodyEvent.body = body;
	    this.dispatchEvent(this.addBodyEvent);
	};

	/**
	 * Add a constraint to the simulation.
	 * @method addConstraint
	 * @param {Constraint} c
	 */
	World.prototype.addConstraint = function(c){
	    this.constraints.push(c);
	};

	/**
	 * Removes a constraint
	 * @method removeConstraint
	 * @param {Constraint} c
	 */
	World.prototype.removeConstraint = function(c){
	    var idx = this.constraints.indexOf(c);
	    if(idx!==-1){
	        this.constraints.splice(idx,1);
	    }
	};

	/**
	 * Raycast test
	 * @method rayTest
	 * @param {Vec3} from
	 * @param {Vec3} to
	 * @param {Function|RaycastResult} result
	 * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
	 */
	World.prototype.rayTest = function(from, to, result){
	    if(result instanceof RaycastResult){
	        // Do raycastclosest
	        this.raycastClosest(from, to, {
	            skipBackfaces: true
	        }, result);
	    } else {
	        // Do raycastAll
	        this.raycastAll(from, to, {
	            skipBackfaces: true
	        }, result);
	    }
	};

	/**
	 * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
	 * @method raycastAll
	 * @param  {Vec3} from
	 * @param  {Vec3} to
	 * @param  {Object} options
	 * @param  {number} [options.collisionFilterMask=-1]
	 * @param  {number} [options.collisionFilterGroup=-1]
	 * @param  {boolean} [options.skipBackfaces=false]
	 * @param  {boolean} [options.checkCollisionResponse=true]
	 * @param  {Function} callback
	 * @return {boolean} True if any body was hit.
	 */
	World.prototype.raycastAll = function(from, to, options, callback){
	    options.mode = Ray.ALL;
	    options.from = from;
	    options.to = to;
	    options.callback = callback;
	    return tmpRay.intersectWorld(this, options);
	};

	/**
	 * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
	 * @method raycastAny
	 * @param  {Vec3} from
	 * @param  {Vec3} to
	 * @param  {Object} options
	 * @param  {number} [options.collisionFilterMask=-1]
	 * @param  {number} [options.collisionFilterGroup=-1]
	 * @param  {boolean} [options.skipBackfaces=false]
	 * @param  {boolean} [options.checkCollisionResponse=true]
	 * @param  {RaycastResult} result
	 * @return {boolean} True if any body was hit.
	 */
	World.prototype.raycastAny = function(from, to, options, result){
	    options.mode = Ray.ANY;
	    options.from = from;
	    options.to = to;
	    options.result = result;
	    return tmpRay.intersectWorld(this, options);
	};

	/**
	 * Ray cast, and return information of the closest hit.
	 * @method raycastClosest
	 * @param  {Vec3} from
	 * @param  {Vec3} to
	 * @param  {Object} options
	 * @param  {number} [options.collisionFilterMask=-1]
	 * @param  {number} [options.collisionFilterGroup=-1]
	 * @param  {boolean} [options.skipBackfaces=false]
	 * @param  {boolean} [options.checkCollisionResponse=true]
	 * @param  {RaycastResult} result
	 * @return {boolean} True if any body was hit.
	 */
	World.prototype.raycastClosest = function(from, to, options, result){
	    options.mode = Ray.CLOSEST;
	    options.from = from;
	    options.to = to;
	    options.result = result;
	    return tmpRay.intersectWorld(this, options);
	};

	/**
	 * Remove a rigid body from the simulation.
	 * @method remove
	 * @param {Body} body
	 * @deprecated Use .removeBody instead
	 */
	World.prototype.remove = function(body){
	    body.world = null;
	    var n = this.bodies.length-1,
	        bodies = this.bodies,
	        idx = bodies.indexOf(body);
	    if(idx !== -1){
	        bodies.splice(idx, 1); // Todo: should use a garbage free method

	        // Recompute index
	        for(var i=0; i!==bodies.length; i++){
	            bodies[i].index = i;
	        }

	        this.collisionMatrix.setNumObjects(n);
	        this.removeBodyEvent.body = body;
	        this.dispatchEvent(this.removeBodyEvent);
	    }
	};

	/**
	 * Remove a rigid body from the simulation.
	 * @method removeBody
	 * @param {Body} body
	 */
	World.prototype.removeBody = World.prototype.remove;

	/**
	 * Adds a material to the World.
	 * @method addMaterial
	 * @param {Material} m
	 * @todo Necessary?
	 */
	World.prototype.addMaterial = function(m){
	    this.materials.push(m);
	};

	/**
	 * Adds a contact material to the World
	 * @method addContactMaterial
	 * @param {ContactMaterial} cmat
	 */
	World.prototype.addContactMaterial = function(cmat) {

	    // Add contact material
	    this.contactmaterials.push(cmat);

	    // Add current contact material to the material table
	    this.contactMaterialTable.set(cmat.materials[0].id,cmat.materials[1].id,cmat);
	};

	// performance.now()
	if(typeof performance === 'undefined'){
	    performance = {};
	}
	if(!performance.now){
	    var nowOffset = Date.now();
	    if (performance.timing && performance.timing.navigationStart){
	        nowOffset = performance.timing.navigationStart;
	    }
	    performance.now = function(){
	        return Date.now() - nowOffset;
	    };
	}

	var step_tmp1 = new Vec3();

	/**
	 * Step the physics world forward in time.
	 *
	 * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
	 *
	 * @method step
	 * @param {Number} dt                       The fixed time step size to use.
	 * @param {Number} [timeSinceLastCalled]    The time elapsed since the function was last called.
	 * @param {Number} [maxSubSteps=10]         Maximum number of fixed steps to take per function call.
	 *
	 * @example
	 *     // fixed timestepping without interpolation
	 *     world.step(1/60);
	 *
	 * @see http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World
	 */
	World.prototype.step = function(dt, timeSinceLastCalled, maxSubSteps){
	    maxSubSteps = maxSubSteps || 10;
	    timeSinceLastCalled = timeSinceLastCalled || 0;

	    if(timeSinceLastCalled === 0){ // Fixed, simple stepping

	        this.internalStep(dt);

	        // Increment time
	        this.time += dt;

	    } else {

	        // Compute the number of fixed steps we should have taken since the last step
	        var internalSteps = Math.floor((this.time + timeSinceLastCalled) / dt) - Math.floor(this.time / dt);
	        internalSteps = Math.min(internalSteps,maxSubSteps);

	        // Do some fixed steps to catch up
	        var t0 = performance.now();
	        for(var i=0; i!==internalSteps; i++){
	            this.internalStep(dt);
	            if(performance.now() - t0 > dt * 1000){
	                // We are slower than real-time. Better bail out.
	                break;
	            }
	        }

	        // Increment internal clock
	        this.time += timeSinceLastCalled;

	        // Compute "Left over" time step
	        var h = this.time % dt;
	        var h_div_dt = h / dt;
	        var interpvelo = step_tmp1;
	        var bodies = this.bodies;

	        for(var j=0; j !== bodies.length; j++){
	            var b = bodies[j];
	            if(b.type !== Body.STATIC && b.sleepState !== Body.SLEEPING){

	                // Interpolate
	                b.position.vsub(b.previousPosition, interpvelo);
	                interpvelo.scale(h_div_dt, interpvelo);
	                b.position.vadd(interpvelo, b.interpolatedPosition);

	                // TODO: interpolate quaternion
	                // b.interpolatedAngle = b.angle + (b.angle - b.previousAngle) * h_div_dt;

	            } else {

	                // For static bodies, just copy. Who else will do it?
	                b.interpolatedPosition.copy(b.position);
	                b.interpolatedQuaternion.copy(b.quaternion);
	            }
	        }
	    }
	};

	/**
	 * Step the simulation
	 * @method step
	 * @param {Number} dt
	 */
	var World_step_postStepEvent = {type:"postStep"}, // Reusable event objects to save memory
	    World_step_preStepEvent = {type:"preStep"},
	    World_step_collideEvent = {type:"collide", body:null, contact:null },
	    World_step_oldContacts = [], // Pools for unused objects
	    World_step_frictionEquationPool = [],
	    World_step_p1 = [], // Reusable arrays for collision pairs
	    World_step_p2 = [],
	    World_step_gvec = new Vec3(), // Temporary vectors and quats
	    World_step_vi = new Vec3(),
	    World_step_vj = new Vec3(),
	    World_step_wi = new Vec3(),
	    World_step_wj = new Vec3(),
	    World_step_t1 = new Vec3(),
	    World_step_t2 = new Vec3(),
	    World_step_rixn = new Vec3(),
	    World_step_rjxn = new Vec3(),
	    World_step_step_q = new Quaternion(),
	    World_step_step_w = new Quaternion(),
	    World_step_step_wq = new Quaternion(),
	    invI_tau_dt = new Vec3();
	World.prototype.internalStep = function(dt){
	    this.dt = dt;

	    var world = this,
	        that = this,
	        contacts = this.contacts,
	        p1 = World_step_p1,
	        p2 = World_step_p2,
	        N = this.numObjects(),
	        bodies = this.bodies,
	        solver = this.solver,
	        gravity = this.gravity,
	        doProfiling = this.doProfiling,
	        profile = this.profile,
	        DYNAMIC = Body.DYNAMIC,
	        profilingStart,
	        constraints = this.constraints,
	        frictionEquationPool = World_step_frictionEquationPool,
	        gnorm = gravity.norm(),
	        gx = gravity.x,
	        gy = gravity.y,
	        gz = gravity.z,
	        i=0;

	    if(doProfiling){
	        profilingStart = performance.now();
	    }

	    // Add gravity to all objects
	    for(i=0; i!==N; i++){
	        var bi = bodies[i];
	        if(bi.type & DYNAMIC){ // Only for dynamic bodies
	            var f = bi.force, m = bi.mass;
	            f.x += m*gx;
	            f.y += m*gy;
	            f.z += m*gz;
	        }
	    }

	    // Update subsystems
	    for(var i=0, Nsubsystems=this.subsystems.length; i!==Nsubsystems; i++){
	        this.subsystems[i].update();
	    }

	    // Collision detection
	    if(doProfiling){ profilingStart = performance.now(); }
	    p1.length = 0; // Clean up pair arrays from last step
	    p2.length = 0;
	    this.broadphase.collisionPairs(this,p1,p2);
	    if(doProfiling){ profile.broadphase = performance.now() - profilingStart; }

	    // Remove constrained pairs with collideConnected == false
	    var Nconstraints = constraints.length;
	    for(i=0; i!==Nconstraints; i++){
	        var c = constraints[i];
	        if(!c.collideConnected){
	            for(var j = p1.length-1; j>=0; j-=1){
	                if( (c.bodyA === p1[j] && c.bodyB === p2[j]) ||
	                    (c.bodyB === p1[j] && c.bodyA === p2[j])){
	                    p1.splice(j, 1);
	                    p2.splice(j, 1);
	                }
	            }
	        }
	    }

	    this.collisionMatrixTick();

	    // Generate contacts
	    if(doProfiling){ profilingStart = performance.now(); }
	    var oldcontacts = World_step_oldContacts;
	    var NoldContacts = contacts.length;

	    for(i=0; i!==NoldContacts; i++){
	        oldcontacts.push(contacts[i]);
	    }
	    contacts.length = 0;

	    // Transfer FrictionEquation from current list to the pool for reuse
	    var NoldFrictionEquations = this.frictionEquations.length;
	    for(i=0; i!==NoldFrictionEquations; i++){
	        frictionEquationPool.push(this.frictionEquations[i]);
	    }
	    this.frictionEquations.length = 0;

	    this.narrowphase.getContacts(
	        p1,
	        p2,
	        this,
	        contacts,
	        oldcontacts, // To be reused
	        this.frictionEquations,
	        frictionEquationPool
	    );

	    if(doProfiling){
	        profile.narrowphase = performance.now() - profilingStart;
	    }

	    // Loop over all collisions
	    if(doProfiling){
	        profilingStart = performance.now();
	    }

	    // Add all friction eqs
	    for (var i = 0; i < this.frictionEquations.length; i++) {
	        solver.addEquation(this.frictionEquations[i]);
	    }

	    var ncontacts = contacts.length;
	    for(var k=0; k!==ncontacts; k++){

	        // Current contact
	        var c = contacts[k];

	        // Get current collision indeces
	        var bi = c.bi,
	            bj = c.bj,
	            si = c.si,
	            sj = c.sj;

	        // Get collision properties
	        var cm;
	        if(bi.material && bj.material){
	            cm = this.getContactMaterial(bi.material,bj.material) || this.defaultContactMaterial;
	        } else {
	            cm = this.defaultContactMaterial;
	        }

	        // c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;

	        var mu = cm.friction;
	        // c.restitution = cm.restitution;

	        // If friction or restitution were specified in the material, use them
	        if(bi.material && bj.material){
	            if(bi.material.friction >= 0 && bj.material.friction >= 0){
	                mu = bi.material.friction * bj.material.friction;
	            }

	            if(bi.material.restitution >= 0 && bj.material.restitution >= 0){
	                c.restitution = bi.material.restitution * bj.material.restitution;
	            }
	        }

			// c.setSpookParams(
	  //           cm.contactEquationStiffness,
	  //           cm.contactEquationRelaxation,
	  //           dt
	  //       );

			solver.addEquation(c);

			// // Add friction constraint equation
			// if(mu > 0){

			// 	// Create 2 tangent equations
			// 	var mug = mu * gnorm;
			// 	var reducedMass = (bi.invMass + bj.invMass);
			// 	if(reducedMass > 0){
			// 		reducedMass = 1/reducedMass;
			// 	}
			// 	var pool = frictionEquationPool;
			// 	var c1 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
			// 	var c2 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
			// 	this.frictionEquations.push(c1, c2);

			// 	c1.bi = c2.bi = bi;
			// 	c1.bj = c2.bj = bj;
			// 	c1.minForce = c2.minForce = -mug*reducedMass;
			// 	c1.maxForce = c2.maxForce = mug*reducedMass;

			// 	// Copy over the relative vectors
			// 	c1.ri.copy(c.ri);
			// 	c1.rj.copy(c.rj);
			// 	c2.ri.copy(c.ri);
			// 	c2.rj.copy(c.rj);

			// 	// Construct tangents
			// 	c.ni.tangents(c1.t, c2.t);

	  //           // Set spook params
	  //           c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
	  //           c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);

	  //           c1.enabled = c2.enabled = c.enabled;

			// 	// Add equations to solver
			// 	solver.addEquation(c1);
			// 	solver.addEquation(c2);
			// }

	        if( bi.allowSleep &&
	            bi.type === Body.DYNAMIC &&
	            bi.sleepState  === Body.SLEEPING &&
	            bj.sleepState  === Body.AWAKE &&
	            bj.type !== Body.STATIC
	        ){
	            var speedSquaredB = bj.velocity.norm2() + bj.angularVelocity.norm2();
	            var speedLimitSquaredB = Math.pow(bj.sleepSpeedLimit,2);
	            if(speedSquaredB >= speedLimitSquaredB*2){
	                bi._wakeUpAfterNarrowphase = true;
	            }
	        }

	        if( bj.allowSleep &&
	            bj.type === Body.DYNAMIC &&
	            bj.sleepState  === Body.SLEEPING &&
	            bi.sleepState  === Body.AWAKE &&
	            bi.type !== Body.STATIC
	        ){
	            var speedSquaredA = bi.velocity.norm2() + bi.angularVelocity.norm2();
	            var speedLimitSquaredA = Math.pow(bi.sleepSpeedLimit,2);
	            if(speedSquaredA >= speedLimitSquaredA*2){
	                bj._wakeUpAfterNarrowphase = true;
	            }
	        }

	        // Now we know that i and j are in contact. Set collision matrix state
			this.collisionMatrix.set(bi, bj, true);

	        if (!this.collisionMatrixPrevious.get(bi, bj)) {
	            // First contact!
	            // We reuse the collideEvent object, otherwise we will end up creating new objects for each new contact, even if there's no event listener attached.
	            World_step_collideEvent.body = bj;
	            World_step_collideEvent.contact = c;
	            bi.dispatchEvent(World_step_collideEvent);

	            World_step_collideEvent.body = bi;
	            bj.dispatchEvent(World_step_collideEvent);
	        }
	    }
	    if(doProfiling){
	        profile.makeContactConstraints = performance.now() - profilingStart;
	        profilingStart = performance.now();
	    }

	    // Wake up bodies
	    for(i=0; i!==N; i++){
	        var bi = bodies[i];
	        if(bi._wakeUpAfterNarrowphase){
	            bi.wakeUp();
	            bi._wakeUpAfterNarrowphase = false;
	        }
	    }

	    // Add user-added constraints
	    var Nconstraints = constraints.length;
	    for(i=0; i!==Nconstraints; i++){
	        var c = constraints[i];
	        c.update();
	        for(var j=0, Neq=c.equations.length; j!==Neq; j++){
	            var eq = c.equations[j];
	            solver.addEquation(eq);
	        }
	    }

	    // Solve the constrained system
	    solver.solve(dt,this);

	    if(doProfiling){
	        profile.solve = performance.now() - profilingStart;
	    }

	    // Remove all contacts from solver
	    solver.removeAllEquations();

	    // Apply damping, see http://code.google.com/p/bullet/issues/detail?id=74 for details
	    var pow = Math.pow;
	    for(i=0; i!==N; i++){
	        var bi = bodies[i];
	        if(bi.type & DYNAMIC){ // Only for dynamic bodies
	            var ld = pow(1.0 - bi.linearDamping,dt);
	            var v = bi.velocity;
	            v.mult(ld,v);
	            var av = bi.angularVelocity;
	            if(av){
	                var ad = pow(1.0 - bi.angularDamping,dt);
	                av.mult(ad,av);
	            }
	        }
	    }

	    this.dispatchEvent(World_step_preStepEvent);

	    // Invoke pre-step callbacks
	    for(i=0; i!==N; i++){
	        var bi = bodies[i];
	        if(bi.preStep){
	            bi.preStep.call(bi);
	        }
	    }

	    // Leap frog
	    // vnew = v + h*f/m
	    // xnew = x + h*vnew
	    if(doProfiling){
	        profilingStart = performance.now();
	    }
	    var q = World_step_step_q;
	    var w = World_step_step_w;
	    var wq = World_step_step_wq;
	    var stepnumber = this.stepnumber;
	    var DYNAMIC_OR_KINEMATIC = Body.DYNAMIC | Body.KINEMATIC;
	    var quatNormalize = stepnumber % (this.quatNormalizeSkip+1) === 0;
	    var quatNormalizeFast = this.quatNormalizeFast;
	    var half_dt = dt * 0.5;
	    var PLANE = Shape.types.PLANE,
	        CONVEX = Shape.types.CONVEXPOLYHEDRON;

	    for(i=0; i!==N; i++){
	        var b = bodies[i],
	            force = b.force,
	            tau = b.torque;
	        if((b.type & DYNAMIC_OR_KINEMATIC) && b.sleepState !== Body.SLEEPING){ // Only for dynamic
	            var velo = b.velocity,
	                angularVelo = b.angularVelocity,
	                pos = b.position,
	                quat = b.quaternion,
	                invMass = b.invMass,
	                invInertia = b.invInertiaWorld;

	            velo.x += force.x * invMass * dt;
	            velo.y += force.y * invMass * dt;
	            velo.z += force.z * invMass * dt;

	            if(b.angularVelocity){
	                invInertia.vmult(tau,invI_tau_dt);
	                invI_tau_dt.mult(dt,invI_tau_dt);
	                invI_tau_dt.vadd(angularVelo,angularVelo);
	            }

	            // Use new velocity  - leap frog
	            pos.x += velo.x * dt;
	            pos.y += velo.y * dt;
	            pos.z += velo.z * dt;

	            if(b.angularVelocity){
	                w.set(angularVelo.x, angularVelo.y, angularVelo.z, 0);
	                w.mult(quat,wq);
	                quat.x += half_dt * wq.x;
	                quat.y += half_dt * wq.y;
	                quat.z += half_dt * wq.z;
	                quat.w += half_dt * wq.w;
	                if(quatNormalize){
	                    if(quatNormalizeFast){
	                        quat.normalizeFast();
	                    } else {
	                        quat.normalize();
	                    }
	                }
	            }

	            if(b.aabb){
	                b.aabbNeedsUpdate = true;
	            }

	            // Update world inertia
	            if(b.updateInertiaWorld){
	                b.updateInertiaWorld();
	            }
	        }
	    }
	    this.clearForces();

	    this.broadphase.dirty = true;

	    if(doProfiling){
	        profile.integrate = performance.now() - profilingStart;
	    }

	    // Update world time
	    this.time += dt;
	    this.stepnumber += 1;

	    this.dispatchEvent(World_step_postStepEvent);

	    // Invoke post-step callbacks
	    for(i=0; i!==N; i++){
	        var bi = bodies[i];
	        var postStep = bi.postStep;
	        if(postStep){
	            postStep.call(bi);
	        }
	    }

	    // Sleeping update
	    if(this.allowSleep){
	        for(i=0; i!==N; i++){
	            bodies[i].sleepTick(this.time);
	        }
	    }
	};

	/**
	 * Sets all body forces in the world to zero.
	 * @method clearForces
	 */
	World.prototype.clearForces = function(){
	    var bodies = this.bodies;
	    var N = bodies.length;
	    for(var i=0; i !== N; i++){
	        var b = bodies[i],
	            force = b.force,
	            tau = b.torque;

	        b.force.set(0,0,0);
	        b.torque.set(0,0,0);
	    }
	};

	},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])
	(2)
	});

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.26
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
	var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

	// detecting iOS UIWebView by indexedDB
	var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		iosVersionMatch: iosVersionMatch,
		iosVersion: iosVersion,
		hasMutationObserverBug: hasMutationObserverBug,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.26';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(39)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        return setTimeout(fun, 0);
	    } else {
	        return cachedSetTimeout.call(null, fun, 0);
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        clearTimeout(marker);
	    } else {
	        cachedClearTimeout.call(null, marker);
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);