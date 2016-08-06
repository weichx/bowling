webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(2);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(35);
	__webpack_require__(25);
	__webpack_require__(36);
	__webpack_require__(24);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(23);
	__webpack_require__(14);
	__webpack_require__(41);
	__webpack_require__(40);
	__webpack_require__(34);
	__webpack_require__(21);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(22);
	module.exports = __webpack_require__(35);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const GLUtil = __webpack_require__(2);

	class GLBuffer {

	    constructor(arrayType, fixedArray, itemSize) {
	        const gl = GLUtil.getGl();
	        this.glBuffer = gl.createBuffer();
	        // gl.bindBuffer(arrayType, this.glBuffer);
	        // gl.bufferData(arrayType, fixedArray, gl.STATIC_DRAW);
	        this.itemCount = 0;//fixedArray.length;
	        this.itemSize = 0;//itemSize;
	    }

	}

	module.exports = GLBuffer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var ShaderType = {
	    Vertex: "Vertex",
	    Fragment: "Fragment"
	};

	var gl = null;
	var canvas = null;

	class GLUtil {

	    static getGl() {
	        return gl;
	    }

	    static getCanvas() {
	        return canvas;
	    }

	    static initGL(canvasId) {
	        try {
	            canvas = document.getElementById(canvasId);
	            gl = canvas.getContext("webgl");
	            gl.viewportWidth = canvas.width;
	            gl.viewportHeight = canvas.height;
	        } catch (e) {
	            console.error(e);
	        }
	        if (!gl) {
	            alert("Could not initialise WebGL, try a different browser dude!");
	        }
	    }

	    static createShaderProgram(vertexSource, fragmentSource) {
	        var vertexShader = GLUtil.compileShader(ShaderType.Vertex, vertexSource);
	        var fragmentShader = GLUtil.compileShader(ShaderType.Fragment, fragmentSource);
	        var shaderProgram = gl.createProgram();
	        gl.attachShader(shaderProgram, vertexShader);
	        gl.attachShader(shaderProgram, fragmentShader);
	        gl.linkProgram(shaderProgram);
	        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	            alert("Could not initialize shaders");
	        }
	        return shaderProgram;
	    }

	    static compileShader(shaderType, shaderSource) {
	        var shader = null;
	        if (shaderType === ShaderType.Fragment) {
	            shader = gl.createShader(gl.FRAGMENT_SHADER);
	        }
	        else if (shaderType === ShaderType.Vertex) {
	            shader = gl.createShader(gl.VERTEX_SHADER);
	        }
	        gl.shaderSource(shader, shaderSource);
	        gl.compileShader(shader);
	        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	            alert(gl.getShaderInfoLog(shader));
	            return null;
	        }
	        return shader;
	    }

	    static loadTexture(url) {
	        var img = new Image();
	        return new Promise(function(resolve) {
	            img.onload = function () {
	                resolve(GLUtil.setupTexture(img));
	            };
	            img.src = url;
	        });
	    }

	    static setupTexture(image) {
	        const gl = GLUtil.getGl();
	        var tex = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, tex);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	        gl.generateMipmap(gl.TEXTURE_2D);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	        return tex;
	    }
	}

	module.exports = GLUtil;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const mat4 = __webpack_require__(4).mat4;
	const GLUtil = __webpack_require__(2);
	const SceneObject = __webpack_require__(14);

	class Camera extends SceneObject {

	    constructor(parent) {
	        super(parent);
	        this.fov = 45.0;
	        this.nearClipPlane = 0.01;
	        this.farClipPlane = 1000.0;
	        this.projectionMatrix = mat4.create();
	        mat4.identity(this.projectionMatrix);
	        this.setPosition(0, 2, -3);
	    }

	    updatePerspectiveMatrix() {
	        mat4.perspective(this.projectionMatrix, this.fov, this.aspectRatio, this.nearClipPlane, this.farClipPlane);
	    }

	    get aspectRatio() {
	        const gl = GLUtil.getGl();
	        return gl.drawingBufferWidth / gl.drawingBufferHeight;
	    }

	}

	module.exports = Camera;

/***/ },
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const vec3 = __webpack_require__(4).vec3;
	const quat = __webpack_require__(4).quat;
	const mat4 = __webpack_require__(4).mat4;
	const GLUtil = __webpack_require__(2);

	const forward = vec3.fromValues(0, 0, 1);
	const right = vec3.fromValues(1, 0, 0);
	const up = vec3.fromValues(0, 1, 0);

	class SceneObject {

	    constructor(parentNode) {
	        this.setParent(parentNode);
	        this.model = null;
	        this.material = null;
	        this.collider = null;
	        this.components = [];
	        this.children = [];
	        this.position = vec3.create();
	        this.rotation = quat.create();
	        quat.identity(this.rotation);
	        this.scale = vec3.fromValues(1, 1, 1);
	        this.__matrix = mat4.create();
	    }

	    initialize() {
	        for (var i = 0; i < this.components.length; i++) {
	            this.components[i].initialize();
	        }
	    }

	    render(parentWorldMatrix, viewMatrix, projectionMatrix) {
	        const wvp = mat4.create();
	        mat4.multiply(wvp, parentWorldMatrix, viewMatrix);
	        mat4.multiply(wvp, wvp, projectionMatrix);

	        this.renderSelf(parentWorldMatrix, viewMatrix, projectionMatrix);

	        var worldMatrix = this.getMatrix();
	        for (var i = 0; i < this.children.length; i++) {
	            this.children[i].render(worldMatrix, viewMatrix, projectionMatrix);
	        }
	    }

	    renderSelf(parentWorld, viewMatrix, projectionMatrix) {
	        if(!this.model) return;

	        const gl = GLUtil.getGl();
	        const material = this.material;
	        const shaderPointers = material.shaderPointers;
	        const vertexBuffer = this.model.vertexBuffer;
	        const indexBuffer = this.model.indexBuffer;
	        const uvBuffer = this.model.uvBuffer;

	        gl.useProgram(material.program);

	        var mvMatrix = mat4.create();
	        var world = this.getMatrix();
	        mat4.multiply(world, world, parentWorld);
	        mat4.multiply(mvMatrix, viewMatrix, world);

	        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.glBuffer);
	        gl.vertexAttribPointer(shaderPointers.aVertexPosition, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	        gl.enableVertexAttribArray(shaderPointers.aVertexPosition);

	        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer.glBuffer);
	        gl.vertexAttribPointer(shaderPointers.aTextureCoord, uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
	        gl.enableVertexAttribArray(shaderPointers.aTextureCoord);

	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
	        gl.uniformMatrix4fv(shaderPointers.uPMatrix, false, projectionMatrix);
	        gl.uniformMatrix4fv(shaderPointers.uMVMatrix, false, mvMatrix);

	        gl.activeTexture(gl.TEXTURE0);
	        gl.bindTexture(gl.TEXTURE_2D, material.mainTexture);
	        gl.uniform1i(shaderPointers.uSampler, 0);
	        gl.uniform2fv(shaderPointers.uTextureTiling, [1, 1]);

	        gl.drawElements(gl.TRIANGLES, indexBuffer.itemCount, gl.UNSIGNED_SHORT, 0);
	    }

	    update() {
	        for (var i = 0; i < this.components.length; i++) {
	            this.components[i].update();
	        }
	    }

	    destroy() {
	        for (var i = 0; i < this.components.length; i++) {
	            this.components[i].destroy();
	        }
	    }

	    setScale(x, y, z) {
	        vec3.set(this.scale, x, y, z);
	    }

	    setRotation(yaw, pitch, roll) {
	        throw Error("Not implemented");
	    }

	    setPosition(x, y, z) {
	        vec3.set(this.position, x, y, z);
	    }

	    getMatrix() {
	        mat4.identity(this.__matrix);
	        mat4.fromRotationTranslationScale(this.__matrix, this.rotation, this.position, this.scale);
	        return this.__matrix;
	    }

	    setParent(parent) {
	        if (this.parent) {
	            const idx = this.parent.children.indexOf(this);
	            if (idx !== -1) {
	                this.parent.children.splice(idx, 1);
	            }
	        }
	        this.parent = parent;
	        if (this.parent) {
	            this.parent.children.push(this);
	        }
	    }

	    getForward() {
	        var retn = vec3.create();
	        vec3.transformQuat(retn, forward, this.rotation); //may need to include parent rotation
	        return retn;
	    }

	    getRight() {
	        var retn = vec3.create();
	        vec3.transformQuat(retn, right, this.rotation);
	        return retn;
	    }

	    getUp() {
	        var retn = vec3.create();
	        vec3.transformQuat(retn, up, this.rotation);
	        return retn;
	    }

	}

	module.exports = SceneObject;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
	    Pending: 1 << 0,
	    Strike: 1 << 1,
	    Spare: 1 << 2,
	    Open: 1 << 3,
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {
	    BeginGame: "BeginGame",
	    BeginTurn: "BeginTurn",
	    BeginFrame: "BeginFrame",
	    EndTurn: "EndTurn",
	    EndFrame: "EndFrame",
	    EndGame: "EndGame"
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	class EventEmitter {

	    constructor() {
	        this.listeners = {};
	        this.subscribers = [];
	    }

	    addEventSubscriber(subscriber) {
	        if (!subscriber || typeof subscriber !== "object") return null;

	        this.subscribers.push(subscriber);
	        return () => {
	            return this.removeEventSubscriber(subscriber);
	        };
	    }

	    removeEventSubscriber(subscriber) {
	        var idx = this.subscribers.indexOf(subscriber);
	        if (idx !== -1) this.subscribers.splice(idx, 1);
	        return idx !== -1;
	    }

	    on(eventName, handler, once) {
	        this.listeners[eventName] = this.listeners[eventName] || [];
	        this.listeners[eventName].push({
	            fn: handler,
	            once: once
	        });
	    }

	    once(eventName, handler) {
	        this.on(eventName, handler, true);
	    }

	    emit(eventName, ...args) {
	        var listeners = this.listeners[eventName] || [];
	        for (var i = 0; i < listeners.length; i++) {
	            var listener = listeners[i];
	            listener.fn.apply(null, args);
	            if (listener.once) {
	                this.listeners[eventName].splice(i, 1);
	                i--;
	            }
	        }
	        for (i = 0; i < this.subscribers.length; i++) {
	            var handler = this.subscribers[i];
	            if (typeof handler[eventName] === "function") {
	                handler[eventName].apply(handler, args);
	            }
	        }
	    }

	    remove(eventName, handler) {
	        var listeners = this.listeners[eventName];
	        if (!listeners) return;
	        var index = listeners.indexOf(handler);
	        index !== -1 && listeners.splice(index, 1);
	    }

	    off(eventName, handler) {
	        this.remove(eventName, handler);
	    }

	    removeAllListeners() {
	        this.listeners = {};
	    }

	    removeAll(eventName) {
	        this.listeners[eventName] = [];
	    }

	}

	module.exports = EventEmitter;

/***/ },
/* 18 */
/***/ function(module, exports) {

	class GameScene {}

	module.exports = GameScene;

/***/ },
/* 19 */
/***/ function(module, exports) {

	

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	const GLUtil = __webpack_require__(2);
	GLUtil.initGL("render-surface");
	const Time = __webpack_require__(21);
	const Camera = __webpack_require__(3);
	const mat4 = __webpack_require__(4).mat4;
	const vec3 = __webpack_require__(4).vec3;
	const quat = __webpack_require__(4).quat;
	const degToRad = __webpack_require__(22).degToRad;
	const ResourceManager = __webpack_require__(23);
	const Scene = __webpack_require__(34);


	ResourceManager.readyPromise.then(() => {

	    const sceneRoot = Scene.load();
	    const world = mat4.create();
	    const camera = new Camera();
	    const gl = GLUtil.getGl();
	    camera.updatePerspectiveMatrix();


	    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	    gl.clearColor(0.2, 0.2, 0.2, 1.0);

	    (function tick(timestamp) {
	        Time.update(timestamp);
	        requestAnimationFrame(tick);
	        sceneRoot.update();
	        camera.update();
	        render();
	    })();

	    function render() {
	        const gl = GLUtil.getGl();
	        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	        gl.enable(gl.DEPTH_TEST);
	        // gl.enable(gl.CULL_FACE); //material dependent

	        var inv = camera.getMatrix();
	        mat4.invert(inv, inv);
	        sceneRoot.render(world, inv, camera.projectionMatrix);
	        //sorted by material
	        //foreach material group
	        //foreach rendered item
	        //material.setup();
	        //material.render();
	        //material.cleanup();
	    }

	    const scratch = vec3.create();
	    window.cameraSpeed = 5;
	    const canvas = GLUtil.getCanvas();
	    document.addEventListener("keypress", keyFn);
	    document.addEventListener("keydown", keyFn);

	    function keyFn(evt) {
	        vec3.set(scratch, 0, 0, 0);
	        if (evt.keyCode === 87) { //w
	            vec3.scale(scratch, camera.getForward(), -window.cameraSpeed * Time.deltaTime);
	            //position = position + forward * delta
	            vec3.add(camera.position, camera.position, scratch);
	        }
	        else if (evt.keyCode === 83) { //s
	            vec3.scale(scratch, camera.getForward(), window.cameraSpeed * Time.deltaTime);
	            vec3.add(camera.position, camera.position, scratch);
	        }
	        if (evt.keyCode === 65) { //a
	            vec3.scale(scratch, camera.getRight(), -window.cameraSpeed * Time.deltaTime);
	            vec3.add(camera.position, camera.position, scratch);
	        }
	        else if (evt.keyCode === 68) {//d
	            vec3.scale(scratch, camera.getRight(), window.cameraSpeed * Time.deltaTime);
	            vec3.add(camera.position, camera.position, scratch);
	        }

	        if (evt.keyCode === 81) { //q
	            quat.rotateY(camera.rotation, camera.rotation, degToRad(5));
	        }
	        else if (evt.keyCode === 69) { //e
	            quat.rotateY(camera.rotation, camera.rotation, -degToRad(5));
	        }
	    }

	    // var mouseDown = false;
	    // var lastMouseX = null;
	    // var lastMouseY = null;
	    //
	    // var moonRotationMatrix = mat4.create();
	    // mat4.identity(moonRotationMatrix);
	    //
	    // document.addEventListener("mouseup", handleMouseUp);
	    // document.addEventListener("mousedown", handleMouseDown);
	    // document.addEventListener("mousemove", handleMouseMove);
	    //
	    // function handleMouseDown(event) {
	    //     mouseDown = true;
	    //     lastMouseX = event.clientX;
	    //     lastMouseY = event.clientY;
	    // }
	    //
	    // function handleMouseUp(event) {
	    //     mouseDown = false;
	    // }
	    //
	    // function handleMouseMove(event) {
	    //     if (!mouseDown) {
	    //         return;
	    //     }
	    //     var newX = event.clientX;
	    //     var newY = event.clientY;
	    //
	    //     var deltaX = newX - lastMouseX;
	    //     var deltaY = newY - lastMouseY;
	    //
	    //     var xQuat = quat.create();
	    //     var yQuat = quat.create();
	    //     var outQuat = quat.create();
	    //     quat.setAxisAngle(xQuat, [1, 0, 0], degToRad(deltaX / 10));
	    //     quat.setAxisAngle(yQuat, [0, 1, 0], degToRad(deltaY / 10));
	    //
	    //
	    //     lastMouseX = newX;
	    //     lastMouseY = newY;
	    // }


	});


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {

	    totalTime: 0,
	    deltaTime: 0,
	    lastTime: 0,

	    update(timestamp) {
	        this.deltaTime = (timestamp - this.lastTime) / 1000.0;
	        this.totalTime += this.deltaTime;
	        this.lastTime = timestamp;
	    }
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	const RadConstant = Math.PI / 180;
	const DegreeConstant = 180 / Math.PI;

	module.exports = {

	    degToRad(degrees) {
	        return degrees * RadConstant;
	    },

	    radToDeg(radians) {
	        return radians * DegreeConstant;
	    }

	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	const GLUtil = __webpack_require__(2);
	const Model = __webpack_require__(24);
	const Material = __webpack_require__(25);

	class ResourceManager {

	    constructor() {
	        this.shaders = {};
	        this.models = {};
	        this.materials = {};
	        this.textures = {};
	        this.textureRequests = {};
	        this.promises = [];
	        this.readyPromise = Promise.resolve();
	    }

	    init() {
	        this.readyPromise = this.readyPromise.then(Promise.all(this.promises));
	    }

	    setShader(id, vertSrc, fragSrc) {
	        this.shaders[id] = GLUtil.createShaderProgram(vertSrc, fragSrc);
	    }

	    setModel(id, src) {
	        this.models[id] = new Model(src);
	    }

	    setTexture(id, texturePromise) {
	        this.promises.push(texturePromise.then((texture) => {
	            this.textures[id] = texture;
	            if(this.textureRequests[id]) {
	                for(var i = 0; i < this.textureRequests[id].length; i++) {
	                    this.textureRequests[id][i](texture);
	                }
	                this.textureRequests[id] = null;
	            }
	        }));
	    }

	    setMaterial(id, materialSrc) {
	        var material = new Material(this.getShader("default"));
	         for(var i = 0; i < materialSrc.textures.length; i++) {
	             var textData = materialSrc.textures[i];
	             var textureId = textData.id;
	             var texturePath = textData.path;
	             this.setTexture(textureId, GLUtil.loadTexture(texturePath));
	             this.textureRequests[textureId] = this.textureRequests[textureId] || [];
	             this.textureRequests[textureId].push((texture) => {
	                 material.mainTexture = texture; //todo support more texture
	             });
	         }
	        this.materials[id] = material;
	    }

	    getModel(modelId) {
	        return this.models[modelId];
	    }

	    getMaterial(materialId) {
	        return this.materials[materialId];
	    }

	    getShader(shaderId) {
	        return this.shaders[shaderId];
	    }

	    getTexture(textureId) {
	        return this.textures[textureId];
	    }

	}

	var manager = new ResourceManager();
	manager.setShader("default", __webpack_require__(26), __webpack_require__(27));
	manager.setModel("cube.json", __webpack_require__(28));
	manager.setModel("quad.json", __webpack_require__(29));
	manager.setModel("sphere.json", __webpack_require__(30));
	manager.setModel("pin.json", __webpack_require__(31));
	manager.setMaterial("default", __webpack_require__(46));
	manager.setMaterial("pin.mat", __webpack_require__(33));
	manager.init();

	module.exports = manager;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	const GLUtil = __webpack_require__(2);
	const GLBuffer = __webpack_require__(1);

	class Model {

	    constructor(modelJSON) {

	        const vertices = modelJSON.meshes[0].vertices;
	        const indices = modelJSON.meshes[0].indices;
	        const uvs = modelJSON.meshes[0].uvs;

	        const gl = GLUtil.getGl();

	        this.vertexBuffer = new GLBuffer();
	        this.indexBuffer = new GLBuffer();
	        this.uvBuffer = new GLBuffer();
	        //this.normalBuffer = new GLBuffer();

	        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer.glBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	        this.vertexBuffer.itemSize = 3;
	        this.vertexBuffer.numItems = vertices.length;

	        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer.glBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
	        this.uvBuffer.itemSize = 2;
	        this.uvBuffer.itemCount = uvs.length;

	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.glBuffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	        this.indexBuffer.itemSize = 1;
	        this.indexBuffer.itemCount = indices.length;

	    }


	}

	module.exports = Model;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	const GLUtil = __webpack_require__(2);

	class Material {

	    constructor(shaderProgram) {
	        const gl = GLUtil.getGl();
	        this.program = shaderProgram;
	        this.shaderPointers = {};
	        this.mainTexture = null;

	        this.shaderPointers.aVertexPosition = gl.getAttribLocation(this.program, "aVertexPosition");
	        this.shaderPointers.aTextureCoord = gl.getAttribLocation(this.program, "aTextureCoord");
	        this.shaderPointers.uPMatrix = gl.getUniformLocation(this.program, "uPMatrix");
	        this.shaderPointers.uMVMatrix = gl.getUniformLocation(this.program, "uMVMatrix");
	        this.shaderPointers.uSampler = gl.getUniformLocation(this.program, "uSampler");
	        this.shaderPointers.uTextureTiling = gl.getUniformLocation(this.program, "uTextureTiling");

	    }

	}

	module.exports = Material;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\r\nattribute vec3 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat4 uMVMatrix;\r\nuniform mat4 uPMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void) {\r\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\r\n    vTextureCoord = aTextureCoord;\r\n}"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec2 uTextureTiling;\r\n\r\nvoid main(void) {\r\n    vec2 texCoord = vTextureCoord * uTextureTiling;\r\n    gl_FragColor = texture2D(uSampler, texCoord);\r\n}"

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {
		"meshes": [
			{
				"indices": [
					0,
					1,
					2,
					0,
					2,
					3,
					4,
					5,
					6,
					4,
					6,
					7,
					8,
					9,
					10,
					8,
					10,
					11,
					12,
					13,
					14,
					12,
					14,
					15,
					16,
					17,
					18,
					16,
					18,
					19,
					20,
					21,
					22,
					20,
					22,
					23
				],
				"vertices": [
					-1,
					-1,
					1,
					1,
					-1,
					1,
					1,
					1,
					1,
					-1,
					1,
					1,
					-1,
					-1,
					-1,
					-1,
					1,
					-1,
					1,
					1,
					-1,
					1,
					-1,
					-1,
					-1,
					1,
					-1,
					-1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					-1,
					-1,
					-1,
					-1,
					1,
					-1,
					-1,
					1,
					-1,
					1,
					-1,
					-1,
					1,
					1,
					-1,
					-1,
					1,
					1,
					-1,
					1,
					1,
					1,
					1,
					-1,
					1,
					-1,
					-1,
					-1,
					-1,
					-1,
					1,
					-1,
					1,
					1,
					-1,
					1,
					-1
				],
				"uvs": [
					0,
					0,
					1,
					0,
					1,
					1,
					0,
					1,
					1,
					0,
					1,
					1,
					0,
					1,
					0,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					1,
					1,
					1,
					1,
					0,
					1,
					0,
					0,
					1,
					0,
					1,
					0,
					1,
					1,
					0,
					1,
					0,
					0,
					0,
					0,
					1,
					0,
					1,
					1,
					0,
					1
				]
			}
		]
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {
		"meshes": [
			{
				"vertices": [
					-0.5,
					0.5,
					0,
					-0.5,
					-0.5,
					0,
					0.5,
					-0.5,
					0,
					0.5,
					0.5,
					0
				],
				"indices": [
					3,
					2,
					1,
					3,
					1,
					0
				],
				"uvs": [
					0,
					0,
					1,
					0,
					1,
					1,
					0,
					1,
					0,
					0.5,
					0.5,
					0.5,
					0.5,
					1,
					0,
					1
				]
			}
		]
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
		"meshes": [
			{
				"indices": [
					0,
					1,
					2,
					0,
					2,
					3,
					3,
					2,
					4,
					3,
					4,
					5,
					5,
					4,
					6,
					5,
					6,
					7,
					7,
					6,
					8,
					7,
					8,
					9,
					1,
					10,
					2,
					1,
					11,
					10,
					2,
					10,
					12,
					2,
					12,
					4,
					4,
					12,
					13,
					4,
					13,
					6,
					6,
					13,
					14,
					6,
					14,
					8,
					11,
					15,
					10,
					11,
					16,
					15,
					10,
					15,
					17,
					10,
					17,
					12,
					12,
					17,
					18,
					12,
					18,
					13,
					13,
					18,
					19,
					13,
					19,
					14,
					16,
					20,
					15,
					16,
					21,
					20,
					15,
					20,
					22,
					15,
					22,
					17,
					17,
					22,
					23,
					17,
					24,
					18,
					18,
					23,
					25,
					18,
					26,
					19,
					14,
					19,
					27,
					14,
					27,
					28,
					28,
					27,
					29,
					28,
					29,
					30,
					30,
					29,
					31,
					30,
					31,
					32,
					32,
					31,
					33,
					32,
					33,
					34,
					35,
					32,
					34,
					35,
					34,
					36,
					37,
					35,
					36,
					37,
					36,
					38,
					31,
					39,
					33,
					31,
					40,
					39,
					29,
					40,
					31,
					41,
					35,
					37,
					41,
					42,
					35,
					42,
					30,
					32,
					42,
					32,
					35,
					29,
					43,
					40,
					44,
					42,
					41,
					44,
					45,
					42,
					45,
					30,
					42,
					45,
					28,
					30,
					9,
					45,
					44,
					9,
					8,
					45,
					8,
					28,
					45,
					8,
					14,
					28,
					27,
					46,
					43,
					27,
					43,
					29,
					19,
					46,
					27,
					19,
					47,
					46,
					48,
					49,
					50,
					48,
					50,
					51,
					51,
					50,
					52,
					51,
					52,
					53,
					53,
					52,
					54,
					53,
					54,
					55,
					55,
					54,
					56,
					55,
					56,
					57,
					49,
					58,
					50,
					49,
					59,
					58,
					50,
					58,
					60,
					50,
					60,
					52,
					52,
					60,
					61,
					52,
					61,
					54,
					54,
					61,
					62,
					54,
					62,
					56,
					59,
					63,
					58,
					59,
					64,
					63,
					58,
					63,
					65,
					58,
					65,
					60,
					60,
					65,
					66,
					60,
					66,
					61,
					61,
					66,
					67,
					61,
					67,
					62,
					64,
					68,
					63,
					64,
					69,
					68,
					63,
					68,
					70,
					63,
					70,
					65,
					65,
					70,
					71,
					65,
					71,
					66,
					66,
					71,
					72,
					66,
					73,
					67,
					62,
					67,
					74,
					62,
					74,
					75,
					75,
					74,
					76,
					75,
					76,
					77,
					77,
					76,
					78,
					77,
					78,
					79,
					79,
					78,
					80,
					79,
					80,
					81,
					82,
					79,
					81,
					82,
					81,
					83,
					84,
					82,
					83,
					84,
					83,
					85,
					78,
					21,
					80,
					78,
					20,
					21,
					76,
					20,
					78,
					86,
					82,
					84,
					86,
					87,
					82,
					87,
					77,
					79,
					87,
					79,
					82,
					76,
					22,
					20,
					88,
					87,
					86,
					88,
					89,
					87,
					89,
					77,
					87,
					89,
					75,
					77,
					57,
					89,
					88,
					57,
					56,
					89,
					56,
					75,
					89,
					56,
					62,
					75,
					74,
					23,
					22,
					74,
					22,
					76,
					67,
					90,
					23,
					67,
					91,
					74,
					92,
					93,
					94,
					92,
					94,
					95,
					95,
					94,
					96,
					95,
					96,
					97,
					97,
					96,
					98,
					97,
					98,
					99,
					99,
					98,
					100,
					99,
					100,
					101,
					93,
					102,
					94,
					93,
					103,
					102,
					94,
					102,
					104,
					94,
					104,
					96,
					96,
					104,
					105,
					96,
					105,
					98,
					98,
					105,
					106,
					98,
					106,
					100,
					103,
					107,
					102,
					103,
					108,
					107,
					102,
					107,
					109,
					102,
					109,
					104,
					104,
					109,
					110,
					104,
					110,
					105,
					105,
					110,
					111,
					105,
					111,
					106,
					108,
					112,
					107,
					108,
					113,
					112,
					107,
					112,
					114,
					107,
					114,
					109,
					109,
					114,
					115,
					109,
					115,
					110,
					110,
					115,
					116,
					110,
					117,
					111,
					106,
					111,
					118,
					106,
					118,
					119,
					119,
					118,
					120,
					119,
					120,
					121,
					121,
					120,
					122,
					121,
					122,
					123,
					123,
					122,
					124,
					123,
					124,
					125,
					126,
					123,
					125,
					126,
					125,
					127,
					128,
					126,
					127,
					128,
					127,
					129,
					122,
					130,
					124,
					122,
					131,
					130,
					120,
					131,
					122,
					132,
					126,
					128,
					132,
					133,
					126,
					133,
					121,
					123,
					133,
					123,
					126,
					120,
					134,
					131,
					135,
					133,
					132,
					135,
					136,
					133,
					136,
					121,
					133,
					136,
					119,
					121,
					101,
					136,
					135,
					101,
					100,
					136,
					100,
					119,
					136,
					100,
					106,
					119,
					137,
					130,
					131,
					137,
					131,
					138,
					138,
					131,
					134,
					139,
					137,
					138,
					139,
					138,
					140,
					141,
					139,
					140,
					141,
					140,
					142,
					143,
					141,
					142,
					143,
					142,
					144,
					144,
					142,
					145,
					144,
					145,
					146,
					146,
					145,
					147,
					146,
					147,
					148,
					148,
					147,
					149,
					148,
					149,
					150,
					142,
					140,
					151,
					142,
					151,
					145,
					145,
					151,
					152,
					145,
					152,
					147,
					147,
					152,
					153,
					147,
					153,
					149,
					140,
					138,
					154,
					140,
					154,
					151,
					151,
					154,
					155,
					151,
					155,
					152,
					152,
					155,
					156,
					152,
					156,
					153,
					154,
					157,
					155,
					154,
					134,
					157,
					118,
					157,
					134,
					118,
					134,
					120,
					111,
					157,
					118,
					111,
					158,
					157,
					138,
					134,
					154,
					155,
					157,
					159,
					155,
					160,
					156,
					161,
					162,
					163,
					161,
					163,
					164,
					162,
					165,
					163,
					162,
					166,
					165,
					166,
					167,
					165,
					166,
					168,
					167,
					168,
					113,
					167,
					168,
					112,
					113,
					169,
					162,
					161,
					169,
					170,
					162,
					170,
					166,
					162,
					170,
					171,
					166,
					171,
					168,
					166,
					171,
					172,
					168,
					172,
					112,
					168,
					172,
					114,
					112,
					173,
					170,
					169,
					173,
					174,
					170,
					174,
					171,
					170,
					174,
					175,
					171,
					175,
					172,
					171,
					175,
					176,
					172,
					176,
					114,
					172,
					176,
					115,
					114,
					177,
					174,
					173,
					177,
					178,
					174,
					178,
					175,
					174,
					178,
					179,
					175,
					179,
					176,
					175,
					179,
					180,
					176,
					180,
					115,
					176,
					180,
					181,
					115,
					182,
					183,
					184,
					182,
					184,
					185,
					185,
					184,
					186,
					185,
					186,
					187,
					187,
					186,
					188,
					187,
					188,
					189,
					189,
					188,
					190,
					189,
					190,
					191,
					183,
					192,
					184,
					183,
					193,
					192,
					184,
					192,
					194,
					184,
					194,
					186,
					186,
					194,
					195,
					186,
					195,
					188,
					188,
					195,
					196,
					188,
					196,
					190,
					193,
					197,
					192,
					193,
					198,
					197,
					192,
					197,
					199,
					192,
					199,
					194,
					194,
					199,
					200,
					194,
					200,
					195,
					195,
					200,
					201,
					195,
					201,
					196,
					198,
					202,
					197,
					198,
					203,
					202,
					197,
					202,
					204,
					197,
					204,
					199,
					199,
					204,
					205,
					199,
					205,
					200,
					200,
					205,
					206,
					200,
					206,
					201,
					196,
					201,
					207,
					196,
					207,
					208,
					208,
					207,
					209,
					208,
					209,
					210,
					210,
					209,
					211,
					210,
					211,
					212,
					212,
					211,
					213,
					212,
					213,
					214,
					215,
					212,
					214,
					215,
					214,
					216,
					217,
					215,
					216,
					217,
					216,
					218,
					211,
					219,
					213,
					211,
					220,
					219,
					209,
					220,
					211,
					221,
					215,
					217,
					221,
					222,
					215,
					222,
					210,
					212,
					222,
					212,
					215,
					209,
					223,
					220,
					224,
					222,
					221,
					224,
					225,
					222,
					225,
					210,
					222,
					225,
					208,
					210,
					191,
					225,
					224,
					191,
					190,
					225,
					190,
					208,
					225,
					190,
					196,
					208,
					226,
					219,
					220,
					226,
					220,
					227,
					227,
					220,
					223,
					228,
					226,
					227,
					228,
					227,
					229,
					230,
					228,
					229,
					230,
					229,
					231,
					232,
					230,
					231,
					232,
					231,
					233,
					233,
					231,
					234,
					233,
					234,
					235,
					235,
					234,
					236,
					235,
					236,
					237,
					237,
					236,
					238,
					237,
					238,
					239,
					231,
					229,
					240,
					231,
					240,
					234,
					234,
					240,
					241,
					234,
					241,
					236,
					236,
					241,
					242,
					236,
					242,
					238,
					229,
					227,
					243,
					229,
					243,
					240,
					240,
					243,
					244,
					240,
					244,
					241,
					241,
					244,
					245,
					241,
					245,
					242,
					243,
					246,
					244,
					243,
					223,
					246,
					207,
					246,
					223,
					207,
					223,
					209,
					201,
					246,
					207,
					201,
					206,
					246,
					244,
					246,
					206,
					244,
					206,
					245,
					227,
					223,
					243,
					239,
					238,
					247,
					239,
					247,
					248,
					248,
					247,
					249,
					248,
					249,
					250,
					250,
					249,
					251,
					250,
					251,
					252,
					252,
					251,
					253,
					252,
					253,
					254,
					251,
					255,
					253,
					251,
					256,
					255,
					249,
					256,
					251,
					256,
					257,
					255,
					256,
					258,
					257,
					258,
					203,
					257,
					258,
					202,
					203,
					249,
					259,
					256,
					259,
					258,
					256,
					247,
					259,
					249,
					259,
					260,
					258,
					260,
					202,
					258,
					260,
					204,
					202,
					261,
					260,
					259,
					247,
					261,
					259,
					261,
					262,
					260,
					262,
					204,
					260,
					262,
					205,
					204,
					238,
					261,
					247,
					238,
					242,
					261,
					242,
					262,
					261,
					242,
					245,
					262,
					245,
					205,
					262,
					245,
					206,
					205,
					263,
					264,
					265,
					263,
					265,
					266,
					266,
					265,
					267,
					266,
					267,
					268,
					268,
					267,
					269,
					268,
					269,
					270,
					270,
					269,
					271,
					270,
					271,
					272,
					264,
					273,
					265,
					264,
					274,
					273,
					265,
					273,
					275,
					265,
					275,
					267,
					267,
					275,
					276,
					267,
					276,
					269,
					269,
					276,
					277,
					269,
					277,
					271,
					274,
					278,
					273,
					274,
					279,
					278,
					273,
					278,
					280,
					273,
					280,
					275,
					275,
					280,
					281,
					275,
					281,
					276,
					276,
					281,
					282,
					276,
					282,
					277,
					279,
					283,
					278,
					279,
					284,
					283,
					278,
					283,
					285,
					278,
					285,
					280,
					280,
					285,
					286,
					280,
					286,
					281,
					281,
					286,
					287,
					281,
					287,
					282,
					277,
					282,
					288,
					277,
					288,
					289,
					289,
					288,
					290,
					289,
					290,
					291,
					291,
					290,
					292,
					291,
					292,
					293,
					293,
					292,
					294,
					293,
					294,
					295,
					296,
					293,
					295,
					296,
					295,
					297,
					298,
					296,
					297,
					298,
					297,
					299,
					292,
					300,
					294,
					292,
					301,
					300,
					290,
					301,
					292,
					302,
					296,
					298,
					302,
					303,
					296,
					303,
					291,
					293,
					303,
					293,
					296,
					290,
					304,
					301,
					305,
					303,
					302,
					305,
					306,
					303,
					306,
					291,
					303,
					306,
					289,
					291,
					272,
					306,
					305,
					272,
					271,
					306,
					271,
					289,
					306,
					271,
					277,
					289,
					307,
					300,
					301,
					307,
					301,
					308,
					308,
					301,
					304,
					309,
					307,
					308,
					309,
					308,
					310,
					311,
					309,
					310,
					311,
					310,
					312,
					313,
					311,
					312,
					313,
					312,
					314,
					314,
					312,
					315,
					314,
					315,
					316,
					316,
					315,
					317,
					316,
					317,
					318,
					318,
					317,
					319,
					318,
					319,
					320,
					312,
					310,
					321,
					312,
					321,
					315,
					315,
					321,
					322,
					315,
					322,
					317,
					317,
					322,
					323,
					317,
					323,
					319,
					310,
					308,
					324,
					310,
					324,
					321,
					321,
					324,
					325,
					321,
					325,
					322,
					322,
					325,
					326,
					322,
					326,
					323,
					324,
					327,
					325,
					324,
					304,
					327,
					288,
					327,
					304,
					288,
					304,
					290,
					282,
					327,
					288,
					282,
					287,
					327,
					325,
					327,
					287,
					325,
					287,
					326,
					308,
					304,
					324,
					320,
					319,
					328,
					320,
					328,
					329,
					329,
					328,
					330,
					329,
					330,
					331,
					331,
					330,
					332,
					331,
					332,
					333,
					333,
					332,
					334,
					333,
					334,
					335,
					332,
					336,
					334,
					332,
					337,
					336,
					330,
					337,
					332,
					337,
					338,
					336,
					337,
					339,
					338,
					339,
					284,
					338,
					339,
					283,
					284,
					330,
					340,
					337,
					340,
					339,
					337,
					328,
					340,
					330,
					340,
					341,
					339,
					341,
					283,
					339,
					341,
					285,
					283,
					342,
					341,
					340,
					328,
					342,
					340,
					342,
					343,
					341,
					343,
					285,
					341,
					343,
					286,
					285,
					319,
					342,
					328,
					319,
					323,
					342,
					323,
					343,
					342,
					323,
					326,
					343,
					326,
					286,
					343,
					326,
					287,
					286,
					344,
					345,
					346,
					344,
					346,
					347,
					347,
					346,
					348,
					347,
					348,
					349,
					349,
					348,
					350,
					349,
					350,
					351,
					351,
					350,
					352,
					351,
					352,
					353,
					345,
					354,
					346,
					345,
					355,
					354,
					346,
					354,
					356,
					346,
					356,
					348,
					348,
					356,
					357,
					348,
					357,
					350,
					350,
					357,
					358,
					350,
					358,
					352,
					355,
					359,
					354,
					355,
					360,
					359,
					354,
					359,
					361,
					354,
					361,
					356,
					356,
					361,
					362,
					356,
					362,
					357,
					357,
					362,
					363,
					357,
					363,
					358,
					360,
					364,
					359,
					360,
					365,
					364,
					359,
					364,
					366,
					359,
					366,
					361,
					361,
					366,
					367,
					361,
					367,
					362,
					362,
					367,
					368,
					362,
					368,
					363,
					369,
					364,
					365,
					369,
					365,
					370,
					371,
					369,
					370,
					371,
					370,
					372,
					373,
					371,
					372,
					373,
					372,
					374,
					375,
					373,
					374,
					375,
					374,
					376,
					377,
					373,
					375,
					377,
					378,
					373,
					378,
					371,
					373,
					378,
					379,
					371,
					379,
					369,
					371,
					379,
					380,
					369,
					380,
					366,
					364,
					380,
					364,
					369,
					381,
					378,
					377,
					381,
					382,
					378,
					382,
					379,
					378,
					382,
					383,
					379,
					383,
					380,
					379,
					383,
					384,
					380,
					384,
					366,
					380,
					384,
					367,
					366,
					385,
					382,
					381,
					385,
					386,
					382,
					386,
					383,
					382,
					386,
					387,
					383,
					387,
					384,
					383,
					387,
					388,
					384,
					388,
					367,
					384,
					388,
					368,
					367,
					389,
					390,
					391,
					389,
					391,
					392,
					390,
					393,
					391,
					390,
					394,
					393,
					394,
					395,
					393,
					394,
					396,
					395,
					396,
					397,
					395,
					396,
					398,
					397,
					399,
					390,
					389,
					399,
					400,
					390,
					400,
					394,
					390,
					400,
					401,
					394,
					401,
					396,
					394,
					401,
					402,
					396,
					402,
					398,
					396,
					402,
					403,
					398,
					404,
					400,
					399,
					404,
					405,
					400,
					405,
					401,
					400,
					405,
					406,
					401,
					406,
					402,
					401,
					406,
					407,
					402,
					407,
					403,
					402,
					407,
					408,
					403,
					409,
					405,
					404,
					409,
					410,
					405,
					410,
					406,
					405,
					410,
					411,
					406,
					411,
					407,
					406,
					411,
					412,
					407,
					412,
					408,
					407,
					412,
					413,
					408,
					414,
					398,
					403,
					415,
					398,
					414,
					416,
					415,
					414,
					416,
					414,
					417,
					418,
					416,
					417,
					418,
					417,
					419,
					420,
					418,
					419,
					420,
					419,
					421,
					421,
					419,
					422,
					421,
					422,
					423,
					423,
					422,
					424,
					423,
					424,
					425,
					425,
					424,
					426,
					425,
					426,
					427,
					419,
					417,
					428,
					419,
					428,
					422,
					422,
					428,
					429,
					422,
					429,
					424,
					424,
					429,
					430,
					424,
					430,
					426,
					417,
					431,
					428,
					417,
					414,
					431,
					428,
					431,
					432,
					428,
					432,
					429,
					429,
					432,
					433,
					429,
					433,
					430,
					414,
					403,
					431,
					431,
					403,
					408,
					431,
					408,
					432,
					432,
					408,
					413,
					432,
					413,
					433,
					415,
					397,
					398,
					434,
					435,
					436,
					434,
					436,
					437,
					437,
					436,
					438,
					437,
					438,
					439,
					439,
					438,
					440,
					439,
					440,
					441,
					441,
					440,
					442,
					441,
					442,
					443,
					435,
					444,
					436,
					435,
					445,
					444,
					436,
					444,
					446,
					436,
					446,
					438,
					438,
					446,
					447,
					438,
					447,
					440,
					440,
					447,
					448,
					440,
					448,
					442,
					445,
					449,
					444,
					445,
					450,
					449,
					444,
					449,
					451,
					444,
					451,
					446,
					446,
					451,
					452,
					446,
					452,
					447,
					447,
					452,
					453,
					447,
					453,
					448,
					450,
					454,
					449,
					450,
					455,
					454,
					449,
					454,
					456,
					449,
					456,
					451,
					451,
					456,
					457,
					451,
					457,
					452,
					452,
					457,
					458,
					452,
					458,
					453,
					448,
					453,
					459,
					448,
					459,
					460,
					460,
					459,
					461,
					460,
					461,
					462,
					462,
					461,
					463,
					462,
					463,
					464,
					464,
					463,
					465,
					464,
					465,
					466,
					467,
					464,
					466,
					467,
					466,
					468,
					469,
					467,
					468,
					469,
					468,
					470,
					463,
					471,
					465,
					463,
					472,
					471,
					461,
					472,
					463,
					473,
					467,
					469,
					473,
					474,
					467,
					474,
					462,
					464,
					474,
					464,
					467,
					461,
					475,
					472,
					476,
					474,
					473,
					476,
					477,
					474,
					477,
					462,
					474,
					477,
					460,
					462,
					443,
					477,
					476,
					443,
					442,
					477,
					442,
					460,
					477,
					442,
					448,
					460,
					478,
					471,
					472,
					478,
					472,
					479,
					479,
					472,
					475,
					480,
					478,
					479,
					480,
					479,
					481,
					482,
					480,
					481,
					482,
					481,
					483,
					484,
					482,
					483,
					484,
					483,
					485,
					485,
					483,
					486,
					485,
					486,
					487,
					487,
					486,
					488,
					487,
					488,
					489,
					489,
					488,
					490,
					489,
					490,
					491,
					483,
					481,
					492,
					483,
					492,
					486,
					486,
					492,
					493,
					486,
					493,
					488,
					488,
					493,
					494,
					488,
					494,
					490,
					481,
					479,
					495,
					481,
					495,
					492,
					492,
					495,
					496,
					492,
					496,
					493,
					493,
					496,
					497,
					493,
					497,
					494,
					495,
					498,
					496,
					495,
					475,
					498,
					459,
					498,
					475,
					459,
					475,
					461,
					453,
					498,
					459,
					453,
					458,
					498,
					496,
					498,
					458,
					496,
					458,
					497,
					479,
					475,
					495,
					491,
					490,
					499,
					491,
					499,
					500,
					500,
					499,
					501,
					500,
					501,
					502,
					502,
					501,
					503,
					502,
					503,
					504,
					504,
					503,
					505,
					504,
					505,
					506,
					503,
					507,
					505,
					503,
					508,
					507,
					501,
					508,
					503,
					508,
					509,
					507,
					508,
					510,
					509,
					510,
					455,
					509,
					510,
					454,
					455,
					501,
					511,
					508,
					511,
					510,
					508,
					499,
					511,
					501,
					511,
					512,
					510,
					512,
					454,
					510,
					512,
					456,
					454,
					513,
					512,
					511,
					499,
					513,
					511,
					513,
					514,
					512,
					514,
					456,
					512,
					514,
					457,
					456,
					490,
					513,
					499,
					490,
					494,
					513,
					494,
					514,
					513,
					494,
					497,
					514,
					497,
					457,
					514,
					497,
					458,
					457
				],
				"vertices": [
					0.2878271,
					-0.2878271,
					-0.2878271,
					0.3089014,
					-0.3089014,
					-0.2401929,
					0.2485034,
					-0.3535864,
					-0.2485034,
					0.2401929,
					-0.3089014,
					-0.3089014,
					0.1748779,
					-0.3852368,
					-0.2637085,
					0.1701416,
					-0.3313476,
					-0.3313476,
					0.0902124,
					-0.4055811,
					-0.2754956,
					0.0880603,
					-0.3469702,
					-0.3469702,
					-1.811975e-8,
					-0.4123633,
					-0.2801587,
					-5.340553e-8,
					-0.3525147,
					-0.3525147,
					0.2637085,
					-0.3852368,
					-0.1748779,
					0.3313476,
					-0.3313476,
					-0.1701416,
					0.1839429,
					-0.4252783,
					-0.1839429,
					0.09450744,
					-0.4502636,
					-0.1919995,
					-3.91007e-8,
					-0.4585547,
					-0.1956055,
					0.2754956,
					-0.4055811,
					-0.0902124,
					0.3469702,
					-0.3469702,
					-0.0880603,
					0.1919995,
					-0.4502636,
					-0.09450744,
					0.09875244,
					-0.4785693,
					-0.09875244,
					-1.182554e-8,
					-0.4882324,
					-0.1007947,
					0.2801587,
					-0.4123633,
					3.814697e-8,
					0.3525147,
					-0.3525147,
					3.814697e-8,
					0.1956055,
					-0.4585547,
					1.945489e-8,
					0.1007947,
					-0.4882324,
					-9.536743e-9,
					0.1007947,
					-0.4882324,
					-9.536743e-9,
					0,
					-0.5,
					0,
					0,
					-0.5,
					0,
					-0.09875244,
					-0.4785693,
					-0.09875244,
					-0.09450744,
					-0.4502636,
					-0.1919995,
					-0.1919995,
					-0.4502636,
					-0.09450744,
					-0.1839429,
					-0.4252783,
					-0.1839429,
					-0.2754956,
					-0.4055811,
					-0.0902124,
					-0.2637085,
					-0.3852368,
					-0.1748779,
					-0.3469702,
					-0.3469702,
					-0.0880603,
					-0.3313476,
					-0.3313476,
					-0.1701416,
					-0.2485034,
					-0.3535864,
					-0.2485034,
					-0.3089014,
					-0.3089014,
					-0.2401929,
					-0.2401929,
					-0.3089014,
					-0.3089014,
					-0.2878271,
					-0.2878271,
					-0.2878271,
					-0.3525147,
					-0.3525147,
					0,
					-0.2801587,
					-0.4123633,
					1.907349e-8,
					-0.1701416,
					-0.3313476,
					-0.3313476,
					-0.1748779,
					-0.3852368,
					-0.2637085,
					-0.1956055,
					-0.4585547,
					-3.814694e-10,
					-0.0880603,
					-0.3469702,
					-0.3469702,
					-0.0902124,
					-0.4055811,
					-0.2754956,
					-0.1007953,
					-0.4882324,
					0,
					0,
					-0.5,
					0,
					-0.2878271,
					-0.2878271,
					0.2878271,
					-0.3089014,
					-0.3089014,
					0.2401929,
					-0.2485034,
					-0.3535864,
					0.2485034,
					-0.2401929,
					-0.3089014,
					0.3089014,
					-0.1748779,
					-0.3852368,
					0.2637085,
					-0.1701416,
					-0.3313476,
					0.3313476,
					-0.0902124,
					-0.4055811,
					0.2754956,
					-0.0880603,
					-0.3469702,
					0.3469702,
					4.768371e-8,
					-0.4123633,
					0.2801587,
					5.722046e-8,
					-0.3525147,
					0.3525147,
					-0.2637085,
					-0.3852368,
					0.1748779,
					-0.3313476,
					-0.3313476,
					0.1701416,
					-0.1839429,
					-0.4252783,
					0.1839429,
					-0.09450744,
					-0.4502636,
					0.1919995,
					-2.002722e-8,
					-0.4585547,
					0.1956055,
					-0.2754956,
					-0.4055811,
					0.0902124,
					-0.3469702,
					-0.3469702,
					0.0880603,
					-0.1919995,
					-0.4502636,
					0.09450744,
					-0.09875244,
					-0.4785693,
					0.09875244,
					-2.136236e-8,
					-0.4882324,
					0.1007947,
					-0.2801587,
					-0.4123633,
					1.907349e-8,
					-0.3525147,
					-0.3525147,
					0,
					-0.1956055,
					-0.4585547,
					-3.814694e-10,
					-0.1007953,
					-0.4882324,
					0,
					0,
					-0.5,
					0,
					0,
					-0.5,
					0,
					0.09875244,
					-0.4785693,
					0.09875244,
					0.09450744,
					-0.4502636,
					0.1919995,
					0.1919995,
					-0.4502636,
					0.09450744,
					0.1839429,
					-0.4252783,
					0.1839429,
					0.2754956,
					-0.4055811,
					0.0902124,
					0.2637085,
					-0.3852368,
					0.1748779,
					0.3469702,
					-0.3469702,
					0.0880603,
					0.3313476,
					-0.3313476,
					0.1701416,
					0.2485034,
					-0.3535864,
					0.2485034,
					0.3089014,
					-0.3089014,
					0.2401929,
					0.2401929,
					-0.3089014,
					0.3089014,
					0.2878271,
					-0.2878271,
					0.2878271,
					0.1701416,
					-0.3313476,
					0.3313476,
					0.1748779,
					-0.3852368,
					0.2637085,
					0.0880603,
					-0.3469702,
					0.3469702,
					0.0902124,
					-0.4055811,
					0.2754956,
					0,
					-0.5,
					0,
					0.1007947,
					-0.4882324,
					-9.536743e-9,
					0.2888354,
					0.2879004,
					-0.2888354,
					0.2409058,
					0.3090894,
					-0.3099512,
					0.2492358,
					0.3538598,
					-0.2492358,
					0.3099512,
					0.3090894,
					-0.2409058,
					0.2646435,
					0.3856372,
					-0.1754565,
					0.3324731,
					0.3315698,
					-0.1707129,
					0.2764746,
					0.4060791,
					-0.09051941,
					0.3481274,
					0.3472266,
					-0.08835449,
					0.2811499,
					0.4128613,
					-9.059906e-8,
					0.3536914,
					0.3527881,
					-1.144409e-7,
					0.1754565,
					0.3856372,
					-0.2646435,
					0.1707129,
					0.3315698,
					-0.3324731,
					0.1845666,
					0.4257813,
					-0.1845666,
					0.1926355,
					0.4508106,
					-0.09482116,
					0.1962756,
					0.4591016,
					-6.198883e-8,
					0.09051941,
					0.4060791,
					-0.2764746,
					0.08835449,
					0.3472266,
					-0.3481274,
					0.09482116,
					0.4508106,
					-0.1926355,
					0.09908752,
					0.4791992,
					-0.09908752,
					0.1011365,
					0.4888574,
					-3.218651e-8,
					-1.239777e-7,
					0.4128613,
					-0.2811499,
					-1.573563e-7,
					0.3527881,
					-0.3536914,
					-8.583068e-8,
					0.4591016,
					-0.1962756,
					-4.410744e-8,
					0.4888574,
					-0.1011359,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					0.09908752,
					0.4791992,
					0.09908752,
					0.1926355,
					0.4508106,
					0.09482116,
					0.09482116,
					0.4508106,
					0.1926355,
					0.1845666,
					0.4257813,
					0.1845666,
					0.09051941,
					0.4060791,
					0.2764746,
					0.1754565,
					0.3856372,
					0.2646435,
					0.08835449,
					0.3472266,
					0.3481274,
					0.1707129,
					0.3315698,
					0.3324731,
					0.2492358,
					0.3538598,
					0.2492358,
					0.2409058,
					0.3090894,
					0.3099512,
					0.3099512,
					0.3090894,
					0.2409058,
					0.2888354,
					0.2879004,
					0.2888354,
					5.722046e-8,
					0.3527881,
					0.3536914,
					4.768371e-8,
					0.4128613,
					0.2811499,
					0.3324731,
					0.3315698,
					0.1707129,
					0.2646435,
					0.3856372,
					0.1754565,
					3.099441e-8,
					0.4591016,
					0.1962756,
					0.3481274,
					0.3472266,
					0.08835449,
					0.2764746,
					0.4060791,
					0.09051941,
					-0.08835449,
					0.3472266,
					0.3481274,
					-0.09051941,
					0.4060791,
					0.2764746,
					-0.1707129,
					0.3315698,
					0.3324731,
					-0.1754565,
					0.3856372,
					0.2646435,
					-0.2409058,
					0.3090894,
					0.3099512,
					-0.2492358,
					0.3538598,
					0.2492358,
					-0.2888354,
					0.2879004,
					0.2888354,
					-0.3099512,
					0.3090894,
					0.2409058,
					-0.2646435,
					0.3856372,
					0.1754565,
					-0.3324731,
					0.3315698,
					0.1707129,
					-0.2764746,
					0.4060791,
					0.09051941,
					-0.3481274,
					0.3472266,
					0.08835449,
					-0.2811499,
					0.4128613,
					0,
					-0.3536914,
					0.3527881,
					0,
					-0.1845666,
					0.4257813,
					0.1845666,
					-0.1926355,
					0.4508106,
					0.09482116,
					-0.1962756,
					0.4591016,
					0,
					-0.09482116,
					0.4508106,
					0.1926355,
					-0.09908752,
					0.4791992,
					0.09908752,
					-0.1011359,
					0.4888574,
					0,
					1.549721e-8,
					0.4888574,
					0.1011359,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					-0.3099512,
					0.3090894,
					-0.2409058,
					-0.2492358,
					0.3538598,
					-0.2492358,
					-0.2409058,
					0.3090894,
					-0.3099512,
					-0.2888354,
					0.2879004,
					-0.2888354,
					-0.1707129,
					0.3315698,
					-0.3324731,
					-0.1754565,
					0.3856372,
					-0.2646435,
					-0.08835449,
					0.3472266,
					-0.3481274,
					-0.09051879,
					0.4060791,
					-0.2764746,
					-0.3324731,
					0.3315698,
					-0.1707129,
					-0.2646435,
					0.3856372,
					-0.1754565,
					-0.1845666,
					0.4257813,
					-0.1845666,
					-0.09482116,
					0.4508106,
					-0.1926355,
					-0.3481274,
					0.3472266,
					-0.08835449,
					-0.2764746,
					0.4060791,
					-0.09051941,
					-0.1926355,
					0.4508106,
					-0.09482116,
					-0.09908752,
					0.4791992,
					-0.09908752,
					-0.3536914,
					0.3527881,
					0,
					-0.2811499,
					0.4128613,
					0,
					-0.1962756,
					0.4591016,
					0,
					-0.1011359,
					0.4888574,
					0,
					4.764297e-9,
					0.5,
					-4.768371e-9,
					0.2878271,
					-0.2878271,
					-0.2878271,
					0.3089014,
					-0.2401929,
					-0.3089014,
					0.3535864,
					-0.2485034,
					-0.2485034,
					0.3089014,
					-0.3089014,
					-0.2401929,
					0.3852368,
					-0.2637085,
					-0.1748779,
					0.3313476,
					-0.3313476,
					-0.1701416,
					0.4055811,
					-0.2754956,
					-0.0902124,
					0.3469702,
					-0.3469702,
					-0.0880603,
					0.4123633,
					-0.2801587,
					-3.814697e-8,
					0.3525147,
					-0.3525147,
					3.814697e-8,
					0.3852368,
					-0.1748791,
					-0.2637085,
					0.3313476,
					-0.1701416,
					-0.3313476,
					0.4252783,
					-0.1839429,
					-0.1839429,
					0.4502636,
					-0.1919995,
					-0.09450744,
					0.4585547,
					-0.1956055,
					-7.667521e-8,
					0.4055811,
					-0.0902124,
					-0.2754956,
					0.3469702,
					-0.0880603,
					-0.3469702,
					0.4502636,
					-0.09450744,
					-0.1919995,
					0.4785693,
					-0.09875244,
					-0.09875244,
					0.4882324,
					-0.1007953,
					-3.814697e-8,
					0.4137475,
					-0.0008836472,
					-0.2811499,
					0.3536914,
					-0.0008836466,
					-0.3536914,
					0.4598437,
					-0.0008836464,
					-0.1962756,
					0.4896582,
					-0.0008836508,
					-0.1011359,
					0.5,
					-4.764297e-9,
					-1.639128e-7,
					0.4785693,
					-0.09875244,
					0.09875244,
					0.4502636,
					-0.1919995,
					0.09450744,
					0.4502636,
					-0.09450744,
					0.1919995,
					0.4252783,
					-0.1839429,
					0.1839429,
					0.4055811,
					-0.0902124,
					0.2754956,
					0.3852368,
					-0.1748791,
					0.2637085,
					0.3469702,
					-0.0880603,
					0.3469702,
					0.3313476,
					-0.1701416,
					0.3313476,
					0.3535864,
					-0.2485034,
					0.2485034,
					0.3089014,
					-0.2401929,
					0.3089014,
					0.3089014,
					-0.3089014,
					0.2401929,
					0.2878271,
					-0.2878271,
					0.2878271,
					0.3535523,
					-3.128662e-11,
					0.3535523,
					0.4157349,
					2.270099e-11,
					0.2777856,
					0.3313476,
					-0.3313476,
					0.1701416,
					0.3852368,
					-0.2637085,
					0.1748779,
					0.4619385,
					3.492459e-11,
					0.1913415,
					0.3469702,
					-0.3469702,
					0.0880603,
					0.4055811,
					-0.2754956,
					0.0902124,
					0.3481274,
					0.08750671,
					0.3481274,
					0.4069678,
					0.08967713,
					0.2764746,
					0.3324731,
					0.1698926,
					0.3324731,
					0.3865088,
					0.1746521,
					0.2646435,
					0.3099512,
					0.2401733,
					0.3099512,
					0.354751,
					0.2485034,
					0.2492358,
					0.2888354,
					0.2879004,
					0.2888354,
					0.3099512,
					0.3090894,
					0.2409058,
					0.3865088,
					0.2637475,
					0.1754565,
					0.3324731,
					0.3315698,
					0.1707129,
					0.4069678,
					0.2755518,
					0.09051941,
					0.3481274,
					0.3472266,
					0.08835449,
					0.4137475,
					0.2802221,
					-1.335144e-7,
					0.3536914,
					0.3527881,
					-1.144409e-7,
					0.4265039,
					0.1837427,
					0.1845666,
					0.4515527,
					0.191842,
					0.09482116,
					0.4598437,
					0.195459,
					-1.525879e-7,
					0.4515527,
					0.09398254,
					0.1926355,
					0.479956,
					0.09823791,
					0.09908752,
					0.4896582,
					0.1002966,
					-1.621246e-7,
					0.4903906,
					7.275958e-12,
					0.09754516,
					0.4069678,
					0.2755518,
					-0.09051879,
					0.3481274,
					0.3472266,
					-0.08835449,
					0.3865088,
					0.2637475,
					-0.1754565,
					0.3324731,
					0.3315698,
					-0.1707129,
					0.354751,
					0.2485034,
					-0.2492358,
					0.3099512,
					0.3090894,
					-0.2409058,
					0.3099512,
					0.2401733,
					-0.3099512,
					0.2888354,
					0.2879004,
					-0.2888354,
					0.3324731,
					0.1698926,
					-0.3324731,
					0.3865088,
					0.1746521,
					-0.2646435,
					0.3481274,
					0.08750671,
					-0.3481274,
					0.4069678,
					0.08967713,
					-0.2764746,
					0.4265039,
					0.1837427,
					-0.1845666,
					0.4515527,
					0.09398254,
					-0.1926355,
					0.4515527,
					0.191842,
					-0.09482116,
					0.479956,
					0.09823791,
					-0.09908752,
					0.2878271,
					-0.2878271,
					0.2878271,
					0.3089014,
					-0.2401929,
					0.3089014,
					0.2485034,
					-0.2485034,
					0.3535864,
					0.2401929,
					-0.3089014,
					0.3089014,
					0.1748791,
					-0.2637085,
					0.3852368,
					0.1701416,
					-0.3313476,
					0.3313476,
					0.09021179,
					-0.2754956,
					0.4055811,
					0.0880603,
					-0.3469702,
					0.3469702,
					6.67572e-8,
					-0.2801587,
					0.4123633,
					5.722046e-8,
					-0.3525147,
					0.3525147,
					0.2637085,
					-0.1748791,
					0.3852368,
					0.3313476,
					-0.1701416,
					0.3313476,
					0.1839429,
					-0.1839429,
					0.4252783,
					0.09450744,
					-0.1919995,
					0.4502636,
					7.571769e-8,
					-0.1956055,
					0.4585547,
					0.2754956,
					-0.0902124,
					0.4055811,
					0.3469702,
					-0.0880603,
					0.3469702,
					0.1919995,
					-0.09450744,
					0.4502636,
					0.09875244,
					-0.09875244,
					0.4785693,
					8.038161e-8,
					-0.1007953,
					0.4882324,
					0.2777856,
					-3.143213e-11,
					0.4157349,
					0.3535523,
					-3.128662e-11,
					0.3535523,
					0.1913415,
					8.076313e-12,
					0.4619385,
					0.09754516,
					-3.605237e-11,
					0.4903906,
					8.19558e-8,
					-9.537071e-9,
					0.5,
					-0.09875244,
					-0.09875244,
					0.4785693,
					-0.09450744,
					-0.1919995,
					0.4502636,
					-0.1919995,
					-0.09450744,
					0.4502636,
					-0.1839429,
					-0.1839429,
					0.4252783,
					-0.2754956,
					-0.0902124,
					0.4055811,
					-0.2637085,
					-0.1748779,
					0.3852368,
					-0.3469702,
					-0.0880603,
					0.3469702,
					-0.3313476,
					-0.1701416,
					0.3313476,
					-0.2485034,
					-0.2485034,
					0.3535864,
					-0.3089014,
					-0.2401929,
					0.3089014,
					-0.2401929,
					-0.3089014,
					0.3089014,
					-0.2878271,
					-0.2878271,
					0.2878271,
					-0.3535523,
					3.128662e-11,
					0.3535523,
					-0.2777856,
					3.143213e-11,
					0.4157349,
					-0.1701416,
					-0.3313476,
					0.3313476,
					-0.1748779,
					-0.2637085,
					0.3852368,
					-0.1913415,
					-8.076313e-12,
					0.4619385,
					-0.0880603,
					-0.3469702,
					0.3469702,
					-0.09021179,
					-0.2754956,
					0.4055811,
					-0.3481274,
					0.08750671,
					0.3481274,
					-0.2764746,
					0.08967713,
					0.4069678,
					-0.3324731,
					0.1698926,
					0.3324731,
					-0.2646435,
					0.1746533,
					0.3865088,
					-0.3099512,
					0.2401733,
					0.3099512,
					-0.2492358,
					0.2485034,
					0.354751,
					-0.2888354,
					0.2879004,
					0.2888354,
					-0.2409058,
					0.3090894,
					0.3099512,
					-0.1754565,
					0.2637475,
					0.3865088,
					-0.1707129,
					0.3315698,
					0.3324731,
					-0.09051941,
					0.2755518,
					0.4069678,
					-0.08835449,
					0.3472266,
					0.3481274,
					6.67572e-8,
					0.2802221,
					0.4137475,
					5.722046e-8,
					0.3527881,
					0.3536914,
					-0.1845666,
					0.1837427,
					0.4265039,
					-0.09482116,
					0.191842,
					0.4515527,
					7.629394e-8,
					0.195459,
					0.4598437,
					-0.1926355,
					0.09398254,
					0.4515527,
					-0.09908752,
					0.09823791,
					0.479956,
					7.629394e-8,
					0.1002972,
					0.4896582,
					-0.09754516,
					3.588866e-11,
					0.4903906,
					0.09051941,
					0.2755518,
					0.4069678,
					0.08835449,
					0.3472266,
					0.3481274,
					0.1754565,
					0.2637475,
					0.3865088,
					0.1707129,
					0.3315698,
					0.3324731,
					0.2492358,
					0.2485034,
					0.354751,
					0.2409058,
					0.3090894,
					0.3099512,
					0.3099512,
					0.2401733,
					0.3099512,
					0.2888354,
					0.2879004,
					0.2888354,
					0.3324731,
					0.1698926,
					0.3324731,
					0.2646435,
					0.1746533,
					0.3865088,
					0.3481274,
					0.08750671,
					0.3481274,
					0.2764746,
					0.08967713,
					0.4069678,
					0.1845666,
					0.1837427,
					0.4265039,
					0.1926355,
					0.09398254,
					0.4515527,
					0.09482116,
					0.191842,
					0.4515527,
					0.09908752,
					0.09823791,
					0.479956,
					-0.2878271,
					-0.2878271,
					0.2878271,
					-0.3089014,
					-0.2401929,
					0.3089014,
					-0.3535864,
					-0.2485034,
					0.2485034,
					-0.3089014,
					-0.3089014,
					0.2401929,
					-0.3852368,
					-0.2637085,
					0.1748791,
					-0.3313476,
					-0.3313476,
					0.1701416,
					-0.4055811,
					-0.2754956,
					0.0902124,
					-0.3469702,
					-0.3469702,
					0.0880603,
					-0.4123633,
					-0.2801587,
					3.814697e-8,
					-0.3525147,
					-0.3525147,
					0,
					-0.3852368,
					-0.1748779,
					0.2637085,
					-0.3313476,
					-0.1701416,
					0.3313476,
					-0.4252783,
					-0.1839429,
					0.1839429,
					-0.4502636,
					-0.1919995,
					0.09450744,
					-0.4585547,
					-0.1956055,
					3.852852e-8,
					-0.4055811,
					-0.0902124,
					0.2754956,
					-0.3469702,
					-0.0880603,
					0.3469702,
					-0.4502636,
					-0.09450744,
					0.1919995,
					-0.4785693,
					-0.09875244,
					0.09875244,
					-0.4882324,
					-0.1007947,
					3.814697e-8,
					-0.4157349,
					-2.313754e-11,
					0.2777856,
					-0.3535523,
					3.128662e-11,
					0.3535523,
					-0.4619385,
					-3.492459e-11,
					0.1913415,
					-0.4903906,
					-7.275958e-12,
					0.09754516,
					-0.5,
					4.764297e-9,
					0,
					-0.4069678,
					0.08967713,
					0.2764746,
					-0.3481274,
					0.08750671,
					0.3481274,
					-0.3865088,
					0.1746533,
					0.2646435,
					-0.3324731,
					0.1698926,
					0.3324731,
					-0.354751,
					0.2485034,
					0.2492358,
					-0.3099512,
					0.2401733,
					0.3099512,
					-0.3099512,
					0.3090894,
					0.2409058,
					-0.2888354,
					0.2879004,
					0.2888354,
					-0.3324731,
					0.3315698,
					0.1707129,
					-0.3865088,
					0.2637475,
					0.1754565,
					-0.4265039,
					0.1837427,
					0.1845666,
					-0.4515527,
					0.09398254,
					0.1926355,
					-0.3481274,
					0.3472266,
					0.08835449,
					-0.4069678,
					0.2755518,
					0.09051941,
					-0.4515527,
					0.191842,
					0.09482116,
					-0.479956,
					0.09823791,
					0.09908752,
					-0.3536914,
					0.3527881,
					0,
					-0.4137475,
					0.2802221,
					0,
					-0.4598437,
					0.195459,
					0,
					-0.4896582,
					0.1002972,
					0,
					-0.3089014,
					-0.3089014,
					-0.2401929,
					-0.3535864,
					-0.2485034,
					-0.2485034,
					-0.3089014,
					-0.2401929,
					-0.3089014,
					-0.2878271,
					-0.2878271,
					-0.2878271,
					-0.3313476,
					-0.1701416,
					-0.3313476,
					-0.3852368,
					-0.1748779,
					-0.2637085,
					-0.3469702,
					-0.0880603,
					-0.3469702,
					-0.4055811,
					-0.0902124,
					-0.2754956,
					-0.3536914,
					-0.0008836116,
					-0.3536914,
					-0.4137475,
					-0.0008836098,
					-0.2811499,
					-0.3313476,
					-0.3313476,
					-0.1701416,
					-0.3852368,
					-0.2637085,
					-0.1748779,
					-0.4252783,
					-0.1839429,
					-0.1839429,
					-0.4502636,
					-0.09450744,
					-0.1919995,
					-0.4598437,
					-0.0008836057,
					-0.1962756,
					-0.3469702,
					-0.3469702,
					-0.0880603,
					-0.4055811,
					-0.2754956,
					-0.0902124,
					-0.4502636,
					-0.1919995,
					-0.09450744,
					-0.4785693,
					-0.09875244,
					-0.09875244,
					-0.4896582,
					-0.000883606,
					-0.1011359,
					-0.3525147,
					-0.3525147,
					0,
					-0.4123633,
					-0.2801587,
					3.814697e-8,
					-0.4585547,
					-0.1956055,
					3.852852e-8,
					-0.4882324,
					-0.1007947,
					3.814697e-8,
					-0.5,
					4.764297e-9,
					0,
					-0.4069678,
					0.08967713,
					-0.2764746,
					-0.3481274,
					0.08750671,
					-0.3481274,
					-0.3324731,
					0.1698926,
					-0.3324731,
					-0.3865088,
					0.1746533,
					-0.2646435,
					-0.3099512,
					0.2401733,
					-0.3099512,
					-0.354751,
					0.2485034,
					-0.2492358,
					-0.2888354,
					0.2879004,
					-0.2888354,
					-0.3099512,
					0.3090894,
					-0.2409058,
					-0.3865088,
					0.2637475,
					-0.1754565,
					-0.3324731,
					0.3315698,
					-0.1707129,
					-0.4069678,
					0.2755518,
					-0.09051941,
					-0.3481274,
					0.3472266,
					-0.08835449,
					-0.4137475,
					0.2802221,
					0,
					-0.3536914,
					0.3527881,
					0,
					-0.4265039,
					0.1837427,
					-0.1845666,
					-0.4515527,
					0.191842,
					-0.09482116,
					-0.4598437,
					0.195459,
					0,
					-0.4515527,
					0.09398254,
					-0.1926355,
					-0.479956,
					0.09823791,
					-0.09908752,
					-0.4896582,
					0.1002972,
					0,
					-0.2878271,
					-0.2878271,
					-0.2878271,
					-0.3089014,
					-0.2401929,
					-0.3089014,
					-0.2485034,
					-0.2485034,
					-0.3535864,
					-0.2401929,
					-0.3089014,
					-0.3089014,
					-0.1748791,
					-0.2637085,
					-0.3852368,
					-0.1701416,
					-0.3313476,
					-0.3313476,
					-0.0902124,
					-0.2754956,
					-0.4055811,
					-0.0880603,
					-0.3469702,
					-0.3469702,
					2.593995e-8,
					-0.2801587,
					-0.4123633,
					-5.340553e-8,
					-0.3525147,
					-0.3525147,
					-0.2637085,
					-0.1748779,
					-0.3852368,
					-0.3313476,
					-0.1701416,
					-0.3313476,
					-0.1839429,
					-0.1839429,
					-0.4252783,
					-0.09450744,
					-0.1919995,
					-0.4502636,
					-8.392307e-9,
					-0.1956055,
					-0.4585547,
					-0.2754956,
					-0.0902124,
					-0.4055811,
					-0.3469702,
					-0.0880603,
					-0.3469702,
					-0.1919995,
					-0.09450744,
					-0.4502636,
					-0.09875244,
					-0.09875244,
					-0.4785693,
					3.356923e-8,
					-0.1007953,
					-0.4882324,
					-0.2811499,
					-0.0008836147,
					-0.4137475,
					-0.3536914,
					-0.0008836116,
					-0.3536914,
					-0.1962756,
					-0.0008836184,
					-0.4598437,
					-0.1011359,
					-0.0008836251,
					-0.4896582,
					-2.235174e-7,
					3.274181e-13,
					-0.5,
					0.09875244,
					-0.09875244,
					-0.4785693,
					0.09450744,
					-0.1919995,
					-0.4502636,
					0.1919995,
					-0.09450744,
					-0.4502636,
					0.1839429,
					-0.1839429,
					-0.4252783,
					0.2754956,
					-0.0902124,
					-0.4055811,
					0.2637085,
					-0.1748791,
					-0.3852368,
					0.3469702,
					-0.0880603,
					-0.3469702,
					0.3313476,
					-0.1701416,
					-0.3313476,
					0.2485034,
					-0.2485034,
					-0.3535864,
					0.3089014,
					-0.2401929,
					-0.3089014,
					0.2401929,
					-0.3089014,
					-0.3089014,
					0.2878271,
					-0.2878271,
					-0.2878271,
					0.3536914,
					-0.0008836466,
					-0.3536914,
					0.2811499,
					-0.0008836342,
					-0.4137475,
					0.1701416,
					-0.3313476,
					-0.3313476,
					0.1748779,
					-0.2637085,
					-0.3852368,
					0.1962756,
					-0.0008836379,
					-0.4598437,
					0.0880603,
					-0.3469702,
					-0.3469702,
					0.0902124,
					-0.2754956,
					-0.4055811,
					0.3481274,
					0.08750671,
					-0.3481274,
					0.2764746,
					0.08967713,
					-0.4069678,
					0.3324731,
					0.1698926,
					-0.3324731,
					0.2646435,
					0.1746533,
					-0.3865088,
					0.3099512,
					0.2401733,
					-0.3099512,
					0.2492358,
					0.2485034,
					-0.354751,
					0.2888354,
					0.2879004,
					-0.2888354,
					0.2409058,
					0.3090894,
					-0.3099512,
					0.1754565,
					0.2637475,
					-0.3865088,
					0.1707129,
					0.3315698,
					-0.3324731,
					0.09051879,
					0.2755518,
					-0.4069678,
					0.08835449,
					0.3472266,
					-0.3481274,
					-1.811981e-7,
					0.2802221,
					-0.4137475,
					-1.573563e-7,
					0.3527881,
					-0.3536914,
					0.1845666,
					0.1837427,
					-0.4265039,
					0.09482116,
					0.191842,
					-0.4515527,
					-2.098083e-7,
					0.195459,
					-0.4598437,
					0.1926355,
					0.09398254,
					-0.4515527,
					0.09908752,
					0.09823791,
					-0.479956,
					-2.193451e-7,
					0.1002972,
					-0.4896582,
					0.1011359,
					-0.0008836288,
					-0.4896582,
					-0.09051879,
					0.2755518,
					-0.4069678,
					-0.08835449,
					0.3472266,
					-0.3481274,
					-0.1754565,
					0.2637475,
					-0.3865088,
					-0.1707129,
					0.3315698,
					-0.3324731,
					-0.2492358,
					0.2485034,
					-0.354751,
					-0.2409058,
					0.3090894,
					-0.3099512,
					-0.3099512,
					0.2401733,
					-0.3099512,
					-0.2888354,
					0.2879004,
					-0.2888354,
					-0.3324731,
					0.1698926,
					-0.3324731,
					-0.2646435,
					0.1746533,
					-0.3865088,
					-0.3481274,
					0.08750671,
					-0.3481274,
					-0.2764746,
					0.08967713,
					-0.4069678,
					-0.1845666,
					0.1837427,
					-0.4265039,
					-0.1926355,
					0.09398254,
					-0.4515527,
					-0.09482116,
					0.191842,
					-0.4515527,
					-0.09908752,
					0.09823791,
					-0.479956
				],
				"uvs": [
					0.3737993,
					0.3181914,
					0.3935962,
					0.3048138,
					0.3737993,
					0.2834,
					0.3540024,
					0.3048138,
					0.3420187,
					0.2507943,
					0.3243351,
					0.2905639,
					0.2992194,
					0.2378804,
					0.2884209,
					0.2806473,
					0.2488924,
					0.233575,
					0.2488924,
					0.2771286,
					0.4055798,
					0.2507943,
					0.4232635,
					0.2905639,
					0.3737993,
					0.2142188,
					0.3216372,
					0.1856271,
					0.2488924,
					0.1743396,
					0.4483792,
					0.2378804,
					0.4591776,
					0.2806473,
					0.4259613,
					0.1752676,
					0.3725803,
					0.1336257,
					0.2488924,
					0.1020471,
					0.4987062,
					0.233575,
					0.4987062,
					0.2771286,
					0.4987062,
					0.1695687,
					0.4987062,
					0.09756867,
					0.4987062,
					0.09756867,
					0.3734581,
					0.02175571,
					0.3734581,
					0.02175571,
					0.1252045,
					0.1421715,
					0.1761476,
					0.1848103,
					0.07182345,
					0.1859203,
					0.1239855,
					0.2096534,
					0.04940557,
					0.2378804,
					0.09220496,
					0.2507943,
					0.03860712,
					0.2806473,
					0.07452133,
					0.2905639,
					0.1239855,
					0.2834,
					0.1041886,
					0.3048139,
					0.1437824,
					0.3048138,
					0.1239855,
					0.3181914,
					-0.0009213686,
					0.2771286,
					-0.0009213686,
					0.233575,
					0.1734497,
					0.2905639,
					0.155766,
					0.2507943,
					-0.0009213686,
					0.1733436,
					0.2093638,
					0.2806473,
					0.1985654,
					0.2378804,
					-0.0009213686,
					0.1111187,
					0.119418,
					0.02175571,
					0.8734268,
					0.3181914,
					0.8932236,
					0.3048139,
					0.8734268,
					0.2834,
					0.8536299,
					0.3048138,
					0.8416463,
					0.2507943,
					0.8239627,
					0.2905639,
					0.798847,
					0.2378804,
					0.7880484,
					0.2806473,
					0.74852,
					0.233575,
					0.74852,
					0.2771286,
					0.9052075,
					0.2507943,
					0.922891,
					0.2905639,
					0.8734268,
					0.2096534,
					0.8212647,
					0.1818529,
					0.74852,
					0.1743396,
					0.9480067,
					0.2378804,
					0.9588053,
					0.2806473,
					0.925589,
					0.1859203,
					0.8819596,
					0.1395283,
					0.74852,
					0.1046903,
					0.9983337,
					0.233575,
					0.9983337,
					0.2771286,
					0.9983337,
					0.1733436,
					0.9983337,
					0.1035097,
					0.8739171,
					0.02038012,
					0.8739171,
					0.02038012,
					0.6150803,
					0.1321084,
					0.6757752,
					0.1830822,
					0.571451,
					0.1807698,
					0.6236131,
					0.2142188,
					0.5490332,
					0.2378804,
					0.5918325,
					0.2507943,
					0.5382347,
					0.2806473,
					0.5741488,
					0.2905639,
					0.6236131,
					0.2834,
					0.6038162,
					0.3048138,
					0.6434099,
					0.3048138,
					0.6236131,
					0.3181914,
					0.6730773,
					0.2905639,
					0.6553935,
					0.2507943,
					0.7089914,
					0.2806473,
					0.698193,
					0.2378804,
					0.6224174,
					0.01762898,
					0.4987062,
					0.09756867,
					0.3737993,
					0.683609,
					0.3540024,
					0.6969866,
					0.3737993,
					0.7253528,
					0.3935962,
					0.6969866,
					0.4055798,
					0.7454442,
					0.4232635,
					0.7112365,
					0.4483792,
					0.7583581,
					0.4591776,
					0.7211531,
					0.4987062,
					0.7626636,
					0.4987062,
					0.7246718,
					0.3420188,
					0.7454442,
					0.3243351,
					0.7112365,
					0.3737993,
					0.7708623,
					0.4259613,
					0.8105438,
					0.4987062,
					0.8162426,
					0.2992194,
					0.7583581,
					0.2884209,
					0.7211531,
					0.3216372,
					0.8105438,
					0.3737993,
					0.8706206,
					0.4987062,
					0.9020402,
					0.2488924,
					0.7626636,
					0.2488924,
					0.7246718,
					0.2488924,
					0.8162426,
					0.2488924,
					0.9020402,
					0.3847829,
					0.9717647,
					0.3847829,
					0.9717647,
					0.6236131,
					0.8706206,
					0.5714509,
					0.8105438,
					0.6757752,
					0.8105438,
					0.6236131,
					0.7708623,
					0.698193,
					0.7583581,
					0.6553935,
					0.7454442,
					0.7089914,
					0.7211531,
					0.6730773,
					0.7112365,
					0.6236131,
					0.7253528,
					0.6434099,
					0.6969866,
					0.6038162,
					0.6969866,
					0.6236131,
					0.683609,
					0.74852,
					0.7246718,
					0.74852,
					0.7626636,
					0.5741488,
					0.7112365,
					0.5918325,
					0.7454442,
					0.74852,
					0.8162426,
					0.5382347,
					0.7211531,
					0.5490332,
					0.7583581,
					0.7880484,
					0.7211531,
					0.798847,
					0.7583581,
					0.8239627,
					0.7112365,
					0.8416463,
					0.7454442,
					0.8536299,
					0.6969866,
					0.8734268,
					0.7253528,
					0.8734268,
					0.683609,
					0.8932238,
					0.6969866,
					0.9052075,
					0.7454442,
					0.922891,
					0.7112365,
					0.9480069,
					0.7583581,
					0.9588053,
					0.7211531,
					0.9983337,
					0.7626636,
					0.9983337,
					0.7246718,
					0.8734268,
					0.7708623,
					0.925589,
					0.8105438,
					0.9983337,
					0.8162426,
					0.8212647,
					0.8105438,
					0.8734268,
					0.8766438,
					0.9978603,
					0.8990951,
					0.748657,
					0.9019565,
					0.6197699,
					0.9758912,
					0.8750802,
					0.9731402,
					0.8750802,
					0.9731402,
					0.1041886,
					0.6969866,
					0.1239855,
					0.7253528,
					0.1437824,
					0.6969866,
					0.1239855,
					0.6836091,
					0.1734497,
					0.7112365,
					0.155766,
					0.7454442,
					0.2093638,
					0.7211531,
					0.1985654,
					0.7583581,
					0.07452133,
					0.7112365,
					0.09220496,
					0.7454442,
					0.1239855,
					0.7708623,
					0.1761476,
					0.8105438,
					0.03860712,
					0.7211531,
					0.04940557,
					0.7583581,
					0.07182345,
					0.8105438,
					0.1239855,
					0.8706206,
					-0.0009213686,
					0.7246718,
					-0.0009213686,
					0.7626636,
					-0.0009213686,
					0.8162426,
					-0.0009213686,
					0.9020402,
					0.1294726,
					0.9717647,
					0.3737993,
					0.3181914,
					0.3737993,
					0.348428,
					0.401279,
					0.3431527,
					0.3935962,
					0.3048138,
					0.4309353,
					0.3335016,
					0.4232635,
					0.2905639,
					0.4638988,
					0.3260186,
					0.4591776,
					0.2806473,
					0.4987062,
					0.3230592,
					0.4987062,
					0.2771286,
					0.4032414,
					0.3898893,
					0.3737993,
					0.3928966,
					0.4337836,
					0.3841356,
					0.4658029,
					0.3790208,
					0.4987062,
					0.3767318,
					0.4038135,
					0.4436346,
					0.3737993,
					0.4450004,
					0.4346031,
					0.4409079,
					0.4663434,
					0.4382135,
					0.4987062,
					0.4369167,
					0.403799,
					0.5009002,
					0.3737993,
					0.5009002,
					0.4345824,
					0.5009002,
					0.4663283,
					0.5009002,
					0.4987062,
					0.5009002,
					0.531069,
					0.4382135,
					0.5316095,
					0.3790208,
					0.5628092,
					0.4409079,
					0.5636287,
					0.3841356,
					0.5935988,
					0.4436346,
					0.5941709,
					0.3898893,
					0.6236131,
					0.4450004,
					0.6236131,
					0.3928966,
					0.5961333,
					0.3431527,
					0.6236131,
					0.348428,
					0.6038162,
					0.3048138,
					0.6236131,
					0.3181914,
					0.6236131,
					0.5009002,
					0.5936133,
					0.5009002,
					0.5741488,
					0.2905639,
					0.566477,
					0.3335016,
					0.56283,
					0.5009002,
					0.5382347,
					0.2806473,
					0.5335135,
					0.3260186,
					0.6236131,
					0.5568,
					0.5935988,
					0.5581658,
					0.6236131,
					0.6089039,
					0.5941709,
					0.6119112,
					0.6236131,
					0.6533725,
					0.5961334,
					0.6586478,
					0.6236131,
					0.683609,
					0.6038162,
					0.6969866,
					0.5664771,
					0.6682988,
					0.5741488,
					0.7112365,
					0.5335135,
					0.6757817,
					0.5382347,
					0.7211531,
					0.4987062,
					0.6787412,
					0.4987062,
					0.7246718,
					0.5636287,
					0.6176648,
					0.5316095,
					0.6227795,
					0.4987062,
					0.6250687,
					0.5628092,
					0.5608926,
					0.531069,
					0.563587,
					0.4987062,
					0.5648838,
					0.5310841,
					0.5009002,
					0.4638988,
					0.6757817,
					0.4591776,
					0.7211531,
					0.4309353,
					0.6682988,
					0.4232635,
					0.7112365,
					0.4012789,
					0.6586478,
					0.3935962,
					0.6969866,
					0.3737993,
					0.6533725,
					0.3737993,
					0.683609,
					0.3737993,
					0.6089039,
					0.4032414,
					0.6119112,
					0.3737993,
					0.5568,
					0.4038135,
					0.5581658,
					0.4337836,
					0.6176648,
					0.4346031,
					0.5608926,
					0.4658029,
					0.6227795,
					0.4663434,
					0.563587,
					0.6236131,
					0.3181914,
					0.6236131,
					0.348428,
					0.6510928,
					0.3431527,
					0.6434099,
					0.3048138,
					0.6807491,
					0.3335016,
					0.6730773,
					0.2905639,
					0.7137126,
					0.3260186,
					0.7089914,
					0.2806473,
					0.74852,
					0.3230592,
					0.74852,
					0.2771286,
					0.6530552,
					0.3898893,
					0.6236131,
					0.3928966,
					0.6835974,
					0.3841356,
					0.7156168,
					0.3790208,
					0.74852,
					0.3767318,
					0.6536273,
					0.4436346,
					0.6236131,
					0.4450004,
					0.684417,
					0.4409079,
					0.7161572,
					0.4382135,
					0.74852,
					0.4369167,
					0.6536129,
					0.5009002,
					0.6236131,
					0.5009002,
					0.6843961,
					0.5009002,
					0.7161421,
					0.5009002,
					0.74852,
					0.5009002,
					0.7808827,
					0.4382135,
					0.7814232,
					0.3790208,
					0.8126229,
					0.4409079,
					0.8134426,
					0.3841356,
					0.8434125,
					0.4436346,
					0.8439847,
					0.3898893,
					0.8734268,
					0.4450004,
					0.8734268,
					0.3928966,
					0.8459471,
					0.3431527,
					0.8734268,
					0.348428,
					0.8536299,
					0.3048138,
					0.8734268,
					0.3181914,
					0.8734268,
					0.5009002,
					0.8434271,
					0.5009002,
					0.8239627,
					0.2905639,
					0.8162909,
					0.3335016,
					0.8126438,
					0.5009002,
					0.7880484,
					0.2806473,
					0.7833273,
					0.3260186,
					0.8734268,
					0.5568,
					0.8434125,
					0.5581658,
					0.8734268,
					0.6089039,
					0.8439847,
					0.6119112,
					0.8734268,
					0.6533725,
					0.8459472,
					0.6586478,
					0.8734268,
					0.683609,
					0.8536299,
					0.6969866,
					0.8162909,
					0.6682988,
					0.8239627,
					0.7112365,
					0.7833273,
					0.6757817,
					0.7880484,
					0.7211531,
					0.74852,
					0.6787412,
					0.74852,
					0.7246718,
					0.8134426,
					0.6176648,
					0.7814232,
					0.6227797,
					0.74852,
					0.6250687,
					0.8126229,
					0.5608926,
					0.7808827,
					0.563587,
					0.74852,
					0.5648838,
					0.7808979,
					0.5009002,
					0.7137126,
					0.6757817,
					0.7089914,
					0.7211531,
					0.6807491,
					0.6682988,
					0.6730773,
					0.7112365,
					0.6510928,
					0.6586478,
					0.6434099,
					0.6969866,
					0.6236131,
					0.6533725,
					0.6236131,
					0.683609,
					0.6236131,
					0.6089039,
					0.6530552,
					0.6119112,
					0.6236131,
					0.5568,
					0.6536273,
					0.5581658,
					0.6835974,
					0.6176648,
					0.684417,
					0.5608926,
					0.7156168,
					0.6227797,
					0.7161572,
					0.563587,
					0.8734268,
					0.3181914,
					0.8734268,
					0.348428,
					0.9009064,
					0.3431527,
					0.8932236,
					0.3048139,
					0.9305627,
					0.3335016,
					0.922891,
					0.2905639,
					0.9635264,
					0.3260186,
					0.9588053,
					0.2806473,
					0.9983337,
					0.3230592,
					0.9983337,
					0.2771286,
					0.902869,
					0.3898893,
					0.8734268,
					0.3928966,
					0.9334112,
					0.3841356,
					0.9654305,
					0.3790208,
					0.9983337,
					0.3767318,
					0.9034411,
					0.4436346,
					0.8734268,
					0.4450004,
					0.9342307,
					0.4409079,
					0.965971,
					0.4382135,
					0.9983337,
					0.4369167,
					0.9034266,
					0.5009002,
					0.8734268,
					0.5009002,
					0.9342099,
					0.5009002,
					0.9659559,
					0.5009002,
					0.9983337,
					0.5009002,
					0.9034411,
					0.5581658,
					0.8734268,
					0.5568,
					0.902869,
					0.6119112,
					0.8734268,
					0.6089039,
					0.9009064,
					0.6586478,
					0.8734268,
					0.6533725,
					0.8932238,
					0.6969866,
					0.8734268,
					0.683609,
					0.922891,
					0.7112365,
					0.9305627,
					0.6682988,
					0.9334112,
					0.6176648,
					0.9342307,
					0.5608926,
					0.9588053,
					0.7211531,
					0.9635264,
					0.6757817,
					0.9654305,
					0.6227797,
					0.965971,
					0.563587,
					0.9983337,
					0.7246718,
					0.9983337,
					0.6787412,
					0.9983337,
					0.6250687,
					0.9983337,
					0.5648838,
					0.1041886,
					0.3048139,
					0.09650582,
					0.3431527,
					0.1239855,
					0.348428,
					0.1239855,
					0.3181914,
					0.1239855,
					0.3928966,
					0.0945434,
					0.3898893,
					0.1239855,
					0.4450004,
					0.09397122,
					0.4436346,
					0.1239855,
					0.5009002,
					0.09398577,
					0.5009002,
					0.07452133,
					0.2905639,
					0.06684953,
					0.3335016,
					0.06400123,
					0.3841356,
					0.06318161,
					0.4409079,
					0.06320244,
					0.5009002,
					0.03860712,
					0.2806473,
					0.03388602,
					0.3260186,
					0.03198189,
					0.3790208,
					0.03144142,
					0.4382135,
					0.03145653,
					0.5009002,
					-0.0009213686,
					0.2771286,
					-0.0009213686,
					0.3230592,
					-0.0009213686,
					0.3767318,
					-0.0009213686,
					0.4369167,
					-0.0009213686,
					0.5009002,
					0.09397122,
					0.5581658,
					0.1239855,
					0.5568,
					0.1239855,
					0.6089039,
					0.0945434,
					0.6119112,
					0.1239855,
					0.6533725,
					0.09650585,
					0.6586478,
					0.1239855,
					0.6836091,
					0.1041886,
					0.6969866,
					0.06684953,
					0.6682988,
					0.07452133,
					0.7112365,
					0.03388602,
					0.6757817,
					0.03860712,
					0.7211531,
					-0.0009213686,
					0.6787412,
					-0.0009213686,
					0.7246718,
					0.06400123,
					0.6176648,
					0.03198189,
					0.6227797,
					-0.0009213686,
					0.6250687,
					0.06318161,
					0.5608926,
					0.03144142,
					0.563587,
					-0.0009213686,
					0.5648838,
					0.1239855,
					0.3181914,
					0.1239855,
					0.348428,
					0.1514652,
					0.3431527,
					0.1437824,
					0.3048138,
					0.1811215,
					0.3335016,
					0.1734497,
					0.2905639,
					0.214085,
					0.3260186,
					0.2093638,
					0.2806473,
					0.2488924,
					0.3230592,
					0.2488924,
					0.2771286,
					0.1534276,
					0.3898893,
					0.1239855,
					0.3928966,
					0.1839698,
					0.3841356,
					0.2159891,
					0.3790208,
					0.2488924,
					0.3767318,
					0.1539998,
					0.4436346,
					0.1239855,
					0.4450004,
					0.1847894,
					0.4409079,
					0.2165296,
					0.4382135,
					0.2488924,
					0.4369167,
					0.1539853,
					0.5009002,
					0.1239855,
					0.5009002,
					0.1847686,
					0.5009002,
					0.2165145,
					0.5009002,
					0.2488924,
					0.5009002,
					0.2812552,
					0.4382135,
					0.2817956,
					0.3790208,
					0.3129954,
					0.4409079,
					0.313815,
					0.3841356,
					0.343785,
					0.4436346,
					0.3443572,
					0.3898893,
					0.3737993,
					0.4450004,
					0.3737993,
					0.3928966,
					0.3463196,
					0.3431527,
					0.3737993,
					0.348428,
					0.3540024,
					0.3048138,
					0.3737993,
					0.3181914,
					0.3737993,
					0.5009002,
					0.3437995,
					0.5009002,
					0.3243351,
					0.2905639,
					0.3166633,
					0.3335016,
					0.3130162,
					0.5009002,
					0.2884209,
					0.2806473,
					0.2836998,
					0.3260186,
					0.3737993,
					0.5568,
					0.343785,
					0.5581658,
					0.3737993,
					0.6089039,
					0.3443572,
					0.6119112,
					0.3737993,
					0.6533725,
					0.3463196,
					0.6586478,
					0.3737993,
					0.683609,
					0.3540024,
					0.6969866,
					0.3166633,
					0.6682988,
					0.3243351,
					0.7112365,
					0.2836998,
					0.6757817,
					0.2884209,
					0.7211531,
					0.2488924,
					0.6787412,
					0.2488924,
					0.7246718,
					0.313815,
					0.6176648,
					0.2817956,
					0.6227797,
					0.2488924,
					0.6250687,
					0.3129954,
					0.5608926,
					0.2812552,
					0.563587,
					0.2488924,
					0.5648838,
					0.2812703,
					0.5009002,
					0.214085,
					0.6757817,
					0.2093638,
					0.7211531,
					0.1811215,
					0.6682988,
					0.1734497,
					0.7112365,
					0.1514652,
					0.6586478,
					0.1437824,
					0.6969866,
					0.1239855,
					0.6533725,
					0.1239855,
					0.6836091,
					0.1239855,
					0.6089039,
					0.1534276,
					0.6119112,
					0.1239855,
					0.5568,
					0.1539998,
					0.5581658,
					0.1839698,
					0.6176648,
					0.1847894,
					0.5608926,
					0.2159891,
					0.6227797,
					0.2165296,
					0.563587
				],
				"normals": [
					0.5773503,
					-0.5773503,
					-0.5773503,
					0.6201137,
					-0.6201137,
					-0.4805394,
					0.4963527,
					-0.7122274,
					-0.4963527,
					0.4805394,
					-0.6201137,
					-0.6201137,
					0.3492379,
					-0.7746143,
					-0.5272623,
					0.3410981,
					-0.6647,
					-0.6647,
					0.1805437,
					-0.8148397,
					-0.5508541,
					0.1769334,
					-0.6959506,
					-0.6959506,
					0,
					-0.8287514,
					-0.559617,
					0,
					-0.7071068,
					-0.7071068,
					0.5272623,
					-0.7746143,
					-0.3492379,
					0.6647,
					-0.6647,
					-0.3410981,
					0.3670194,
					-0.8547476,
					-0.3670194,
					0.1887311,
					-0.9043397,
					-0.3828188,
					0,
					-0.9212493,
					-0.3889727,
					0.5508541,
					-0.8148397,
					-0.1805437,
					0.6959506,
					-0.6959507,
					-0.1769334,
					0.3828188,
					-0.9043397,
					-0.1887311,
					0.1982114,
					-0.9599085,
					-0.1982114,
					0,
					-0.9791253,
					-0.2032574,
					0.559617,
					-0.8287514,
					0,
					0.7071068,
					-0.7071068,
					0,
					0.3889727,
					-0.9212493,
					0,
					0.2032573,
					-0.9791253,
					0,
					0.2032573,
					-0.9791253,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					-0.1982115,
					-0.9599085,
					-0.1982117,
					-0.1887312,
					-0.9043397,
					-0.3828188,
					-0.382819,
					-0.9043396,
					-0.1887314,
					-0.3670194,
					-0.8547476,
					-0.3670194,
					-0.5508541,
					-0.8148397,
					-0.1805437,
					-0.5272623,
					-0.7746143,
					-0.3492379,
					-0.6959506,
					-0.6959506,
					-0.1769334,
					-0.6647,
					-0.6647,
					-0.3410981,
					-0.4963527,
					-0.7122274,
					-0.4963527,
					-0.6201137,
					-0.6201137,
					-0.4805394,
					-0.48054,
					-0.620114,
					-0.6201128,
					-0.5773503,
					-0.5773503,
					-0.5773503,
					-0.7071068,
					-0.7071068,
					0,
					-0.559617,
					-0.8287514,
					0,
					-0.3410983,
					-0.6647008,
					-0.664699,
					-0.3492379,
					-0.7746143,
					-0.5272623,
					-0.3889731,
					-0.9212492,
					0,
					-0.176933,
					-0.695951,
					-0.6959504,
					-0.1805437,
					-0.8148397,
					-0.5508541,
					-0.2032576,
					-0.9791253,
					0,
					0,
					-1,
					0,
					-0.5773503,
					-0.5773503,
					0.5773503,
					-0.6201128,
					-0.620114,
					0.48054,
					-0.4963527,
					-0.7122274,
					0.4963527,
					-0.4805394,
					-0.6201137,
					0.6201137,
					-0.3492379,
					-0.7746143,
					0.5272623,
					-0.3410979,
					-0.6646999,
					0.6647002,
					-0.1805437,
					-0.8148397,
					0.5508541,
					-0.1769333,
					-0.6959505,
					0.6959509,
					0,
					-0.8287514,
					0.559617,
					0,
					-0.7071066,
					0.7071069,
					-0.5272623,
					-0.7746143,
					0.3492379,
					-0.664699,
					-0.6647008,
					0.3410983,
					-0.3670194,
					-0.8547476,
					0.3670194,
					-0.1887312,
					-0.9043397,
					0.3828188,
					0,
					-0.9212493,
					0.3889727,
					-0.5508541,
					-0.8148397,
					0.1805437,
					-0.6959504,
					-0.695951,
					0.176933,
					-0.382819,
					-0.9043396,
					0.1887314,
					-0.1982115,
					-0.9599085,
					0.1982117,
					0,
					-0.9791253,
					0.2032574,
					-0.559617,
					-0.8287514,
					0,
					-0.7071068,
					-0.7071068,
					0,
					-0.3889731,
					-0.9212492,
					0,
					-0.2032576,
					-0.9791253,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0.1982114,
					-0.9599085,
					0.1982114,
					0.1887311,
					-0.9043397,
					0.3828188,
					0.3828188,
					-0.9043397,
					0.1887311,
					0.3670194,
					-0.8547476,
					0.3670194,
					0.5508541,
					-0.8148397,
					0.1805437,
					0.5272623,
					-0.7746143,
					0.3492379,
					0.6959507,
					-0.6959506,
					0.1769334,
					0.6647,
					-0.6647,
					0.3410981,
					0.4963527,
					-0.7122274,
					0.4963527,
					0.6201137,
					-0.6201137,
					0.4805394,
					0.48054,
					-0.620114,
					0.6201128,
					0.5773503,
					-0.5773503,
					0.5773503,
					0.3410981,
					-0.6647007,
					0.6646991,
					0.3492379,
					-0.7746143,
					0.5272623,
					0.1769328,
					-0.6959507,
					0.6959507,
					0.1805438,
					-0.8148397,
					0.5508541,
					0,
					-1,
					0,
					0.2032573,
					-0.9791253,
					0,
					0.5770534,
					0.5779435,
					-0.5770534,
					0.4803619,
					0.6204594,
					-0.6199054,
					0.4962236,
					0.7124074,
					-0.4962236,
					0.6199054,
					0.6204594,
					-0.4803619,
					0.5271254,
					0.7745599,
					-0.3495651,
					0.6645957,
					0.6646522,
					-0.3413944,
					0.5506793,
					0.8149741,
					-0.1804701,
					0.6960512,
					0.6958691,
					-0.176858,
					0.5594022,
					0.8288963,
					0,
					0.7072056,
					0.707008,
					0,
					0.3495651,
					0.7745599,
					-0.5271254,
					0.3413944,
					0.6646522,
					-0.6645957,
					0.3668588,
					0.8548855,
					-0.3668588,
					0.3822528,
					0.9046206,
					-0.188532,
					0.3883412,
					0.9215156,
					0,
					0.18047,
					0.8149742,
					-0.5506793,
					0.1768579,
					0.6958691,
					-0.6960513,
					0.1885317,
					0.9046208,
					-0.3822526,
					0.1972087,
					0.9603215,
					-0.1972089,
					0.2014461,
					0.9794996,
					0,
					0,
					0.8288963,
					-0.5594023,
					0,
					0.707008,
					-0.7072056,
					0,
					0.9215158,
					-0.3883408,
					0,
					0.9794996,
					-0.2014458,
					0,
					1,
					0,
					0,
					1,
					0,
					0.1972087,
					0.9603215,
					0.1972089,
					0.3822529,
					0.9046206,
					0.188532,
					0.1885318,
					0.9046208,
					0.3822526,
					0.3668588,
					0.8548855,
					0.3668588,
					0.1804701,
					0.8149741,
					0.5506793,
					0.3495651,
					0.7745599,
					0.5271254,
					0.1768581,
					0.6958693,
					0.6960511,
					0.3413946,
					0.6646523,
					0.6645954,
					0.4962236,
					0.7124074,
					0.4962236,
					0.4803619,
					0.6204594,
					0.6199054,
					0.6199054,
					0.6204594,
					0.4803619,
					0.5770534,
					0.5779435,
					0.5770534,
					0,
					0.707008,
					0.7072056,
					0,
					0.8288963,
					0.5594022,
					0.6645954,
					0.6646523,
					0.3413946,
					0.5271254,
					0.7745599,
					0.3495651,
					0,
					0.9215159,
					0.3883407,
					0.6960511,
					0.6958694,
					0.1768581,
					0.5506793,
					0.8149742,
					0.18047,
					-0.1768581,
					0.6958694,
					0.6960511,
					-0.18047,
					0.8149742,
					0.5506793,
					-0.3413946,
					0.6646523,
					0.6645954,
					-0.3495651,
					0.7745599,
					0.5271254,
					-0.4803619,
					0.6204594,
					0.6199054,
					-0.4962236,
					0.7124074,
					0.4962236,
					-0.5770534,
					0.5779435,
					0.5770534,
					-0.6199054,
					0.6204594,
					0.4803619,
					-0.5271254,
					0.7745599,
					0.3495651,
					-0.6645954,
					0.6646523,
					0.3413946,
					-0.5506793,
					0.8149742,
					0.1804701,
					-0.6960511,
					0.6958694,
					0.1768581,
					-0.5594022,
					0.8288963,
					0,
					-0.7072056,
					0.707008,
					0,
					-0.3668588,
					0.8548855,
					0.3668588,
					-0.3822526,
					0.9046208,
					0.1885318,
					-0.3883408,
					0.9215159,
					0,
					-0.1885318,
					0.9046208,
					0.3822526,
					-0.1972086,
					0.9603216,
					0.1972086,
					-0.2014458,
					0.9794997,
					0,
					0,
					0.9794996,
					0.2014458,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					-0.6199054,
					0.6204594,
					-0.4803619,
					-0.4962236,
					0.7124074,
					-0.4962236,
					-0.4803619,
					0.6204594,
					-0.6199054,
					-0.5770534,
					0.5779435,
					-0.5770534,
					-0.3413942,
					0.6646523,
					-0.6645955,
					-0.3495646,
					0.7745602,
					-0.5271254,
					-0.1768579,
					0.6958694,
					-0.6960511,
					-0.1804698,
					0.8149742,
					-0.5506793,
					-0.6645954,
					0.6646523,
					-0.3413946,
					-0.5271254,
					0.7745599,
					-0.3495651,
					-0.3668587,
					0.8548855,
					-0.3668591,
					-0.1885316,
					0.9046206,
					-0.3822529,
					-0.6960511,
					0.6958694,
					-0.1768581,
					-0.5506793,
					0.8149742,
					-0.18047,
					-0.3822526,
					0.9046208,
					-0.1885318,
					-0.1972086,
					0.9603216,
					-0.1972086,
					-0.7072056,
					0.707008,
					0,
					-0.5594022,
					0.8288963,
					0,
					-0.3883408,
					0.9215159,
					0,
					-0.2014458,
					0.9794997,
					0,
					0,
					1,
					0,
					0.5773503,
					-0.5773503,
					-0.5773503,
					0.6201131,
					-0.4805407,
					-0.6201131,
					0.7122266,
					-0.4963542,
					-0.4963524,
					0.6201137,
					-0.6201137,
					-0.4805394,
					0.7746142,
					-0.5272629,
					-0.3492372,
					0.6647,
					-0.6647,
					-0.3410981,
					0.8148397,
					-0.5508541,
					-0.1805438,
					0.6959506,
					-0.6959507,
					-0.1769334,
					0.8287514,
					-0.559617,
					0,
					0.7071068,
					-0.7071068,
					0,
					0.7746139,
					-0.3492387,
					-0.5272623,
					0.6646999,
					-0.3410986,
					-0.6646998,
					0.8547479,
					-0.3670197,
					-0.3670183,
					0.9043396,
					-0.382819,
					-0.1887314,
					0.9212492,
					-0.3889731,
					0,
					0.8134452,
					-0.189825,
					-0.549794,
					0.694679,
					-0.1866611,
					-0.694679,
					0.9028698,
					-0.1970319,
					-0.3821057,
					0.9590998,
					-0.2040402,
					-0.1962021,
					0.9782798,
					-0.2072886,
					-0.0003374418,
					0.8290441,
					-0.009544022,
					-0.5591018,
					0.7070715,
					-0.009976584,
					-0.7070715,
					0.9214768,
					-0.00855847,
					-0.3883391,
					0.9797992,
					-0.007640349,
					-0.1998379,
					0.999975,
					-0.007027187,
					-0.0009141061,
					0.9593295,
					-0.204362,
					0.1947386,
					0.9043396,
					-0.382819,
					0.1887314,
					0.9037763,
					-0.1963431,
					0.3803126,
					0.8547479,
					-0.3670197,
					0.3670183,
					0.8145636,
					-0.1877707,
					0.5488426,
					0.7746139,
					-0.3492387,
					0.5272623,
					0.6950383,
					-0.1839666,
					0.6950383,
					0.6646999,
					-0.3410986,
					0.6646998,
					0.7122266,
					-0.4963542,
					0.4963524,
					0.6201131,
					-0.4805407,
					0.6201131,
					0.6201137,
					-0.6201137,
					0.4805394,
					0.5773503,
					-0.5773503,
					0.5773503,
					0.707078,
					-0.009016315,
					0.707078,
					0.8306221,
					-0.008560009,
					0.5567707,
					0.6647,
					-0.6647,
					0.3410981,
					0.7746142,
					-0.527263,
					0.3492371,
					0.9230274,
					-0.007569675,
					0.3846596,
					0.6959507,
					-0.6959506,
					0.1769334,
					0.8148397,
					-0.550854,
					0.1805437,
					0.6961852,
					0.1750802,
					0.6961846,
					0.8163346,
					0.1793894,
					0.5490147,
					0.6646252,
					0.3413929,
					0.6646233,
					0.7750265,
					0.3493735,
					0.5265663,
					0.6199811,
					0.4808831,
					0.6199798,
					0.7125368,
					0.4964059,
					0.4958554,
					0.5770534,
					0.5779435,
					0.5770534,
					0.6199054,
					0.6204594,
					0.4803619,
					0.7749057,
					0.5268649,
					0.3491912,
					0.6645954,
					0.6646523,
					0.3413946,
					0.8152629,
					0.5502449,
					0.1804915,
					0.6960511,
					0.6958694,
					0.1768581,
					0.829181,
					0.5589803,
					0,
					0.7072056,
					0.707008,
					0,
					0.8552524,
					0.3665192,
					0.3663428,
					0.9047235,
					0.3819526,
					0.1886469,
					0.921612,
					0.3881125,
					0,
					0.9055392,
					0.1888714,
					0.379903,
					0.960723,
					0.1975649,
					0.1948826,
					0.9797031,
					0.2004529,
					-0.0005754959,
					0.9804376,
					-0.006910108,
					0.1967086,
					0.8152629,
					0.5502449,
					-0.1804913,
					0.6960512,
					0.6958691,
					-0.176858,
					0.7749059,
					0.526865,
					-0.3491908,
					0.6645957,
					0.6646522,
					-0.3413944,
					0.7125368,
					0.4964059,
					-0.4958554,
					0.6199054,
					0.6204594,
					-0.4803619,
					0.6199811,
					0.4808831,
					-0.6199798,
					0.5770534,
					0.5779435,
					-0.5770534,
					0.6646252,
					0.3413929,
					-0.6646233,
					0.7750265,
					0.3493734,
					-0.5265662,
					0.6959636,
					0.1768336,
					-0.695963,
					0.8153886,
					0.1804795,
					-0.5500622,
					0.8552524,
					0.3665194,
					-0.3663425,
					0.9048201,
					0.1885902,
					-0.3817516,
					0.9047233,
					0.3819529,
					-0.1886469,
					0.9605871,
					0.1965227,
					-0.1965994,
					0.5773503,
					-0.5773503,
					0.5773503,
					0.6201131,
					-0.4805407,
					0.6201131,
					0.4963539,
					-0.4963539,
					0.7122259,
					0.48054,
					-0.620114,
					0.6201128,
					0.3492374,
					-0.527263,
					0.7746141,
					0.3410981,
					-0.6647007,
					0.6646991,
					0.1805425,
					-0.5508541,
					0.81484,
					0.1769328,
					-0.6959507,
					0.6959507,
					0,
					-0.559617,
					0.8287514,
					0,
					-0.7071066,
					0.7071069,
					0.5272629,
					-0.3492379,
					0.7746139,
					0.6646999,
					-0.3410986,
					0.6646998,
					0.3670184,
					-0.3670188,
					0.8547482,
					0.1887308,
					-0.3828188,
					0.9043397,
					0,
					-0.3889733,
					0.921249,
					0.5488426,
					-0.1877707,
					0.8145636,
					0.6950383,
					-0.1839666,
					0.6950383,
					0.3803126,
					-0.1963431,
					0.9037763,
					0.1947386,
					-0.204362,
					0.9593295,
					0,
					-0.2076114,
					0.9782113,
					0.5567707,
					-0.008560009,
					0.8306221,
					0.707078,
					-0.009016315,
					0.707078,
					0.3846596,
					-0.007569675,
					0.9230274,
					0.1967088,
					-0.006910203,
					0.9804376,
					0,
					-0.006783585,
					0.999977,
					-0.1947386,
					-0.204362,
					0.9593295,
					-0.1887312,
					-0.3828192,
					0.9043395,
					-0.380313,
					-0.1963435,
					0.903776,
					-0.3670192,
					-0.3670197,
					0.8547476,
					-0.5488427,
					-0.1877716,
					0.8145635,
					-0.5272623,
					-0.3492379,
					0.7746143,
					-0.6950381,
					-0.1839675,
					0.6950381,
					-0.6647,
					-0.3410981,
					0.6647,
					-0.4963527,
					-0.4963527,
					0.7122274,
					-0.6201137,
					-0.4805394,
					0.6201137,
					-0.4805394,
					-0.6201137,
					0.6201137,
					-0.5773503,
					-0.5773503,
					0.5773503,
					-0.707078,
					-0.009016315,
					0.707078,
					-0.5567707,
					-0.008560009,
					0.8306221,
					-0.3410979,
					-0.6646999,
					0.6647002,
					-0.3492375,
					-0.5272624,
					0.7746145,
					-0.3846596,
					-0.007569675,
					0.9230274,
					-0.1769333,
					-0.6959505,
					0.6959509,
					-0.1805434,
					-0.5508541,
					0.8148397,
					-0.696185,
					0.1750798,
					0.696185,
					-0.5490147,
					0.1793885,
					0.8163348,
					-0.6646242,
					0.3413932,
					0.6646242,
					-0.5265663,
					0.3493741,
					0.7750263,
					-0.6199802,
					0.4808837,
					0.6199802,
					-0.495855,
					0.4964073,
					0.712536,
					-0.5770534,
					0.5779435,
					0.5770534,
					-0.4803619,
					0.6204594,
					0.6199054,
					-0.3491905,
					0.5268657,
					0.7749056,
					-0.3413946,
					0.6646523,
					0.6645954,
					-0.1804915,
					0.5502449,
					0.8152629,
					-0.1768581,
					0.6958694,
					0.6960511,
					0,
					0.5589803,
					0.829181,
					0,
					0.707008,
					0.7072056,
					-0.3663416,
					0.3665195,
					0.8552527,
					-0.1886471,
					0.3819528,
					0.9047233,
					0,
					0.3881129,
					0.9216118,
					-0.3799026,
					0.188871,
					0.9055395,
					-0.1948829,
					0.1975651,
					0.9607229,
					0,
					0.2010102,
					0.9795892,
					-0.1967087,
					-0.006910208,
					0.9804376,
					0.1804916,
					0.5502448,
					0.8152628,
					0.1768581,
					0.6958693,
					0.6960511,
					0.3491904,
					0.5268656,
					0.7749056,
					0.3413946,
					0.6646523,
					0.6645954,
					0.495855,
					0.4964073,
					0.712536,
					0.4803619,
					0.6204594,
					0.6199054,
					0.6199811,
					0.4808831,
					0.6199798,
					0.5770534,
					0.5779435,
					0.5770534,
					0.6646252,
					0.3413929,
					0.6646233,
					0.5265663,
					0.3493741,
					0.7750263,
					0.6961852,
					0.1750802,
					0.6961846,
					0.5490148,
					0.1793885,
					0.8163348,
					0.3663416,
					0.3665195,
					0.8552527,
					0.3799026,
					0.188871,
					0.9055395,
					0.1886472,
					0.3819528,
					0.9047233,
					0.194883,
					0.1975651,
					0.9607229,
					-0.5773503,
					-0.5773503,
					0.5773503,
					-0.6201137,
					-0.4805394,
					0.6201137,
					-0.7122266,
					-0.4963524,
					0.4963542,
					-0.6201128,
					-0.620114,
					0.48054,
					-0.7746139,
					-0.5272623,
					0.3492387,
					-0.664699,
					-0.6647008,
					0.3410983,
					-0.8148399,
					-0.5508541,
					0.1805429,
					-0.6959504,
					-0.695951,
					0.176933,
					-0.8287514,
					-0.559617,
					0,
					-0.7071068,
					-0.7071068,
					0,
					-0.7746142,
					-0.3492371,
					0.527263,
					-0.6647,
					-0.3410981,
					0.6647,
					-0.8547479,
					-0.3670183,
					0.3670197,
					-0.90434,
					-0.3828184,
					0.1887307,
					-0.9212493,
					-0.3889727,
					0,
					-0.8145635,
					-0.1877716,
					0.5488427,
					-0.6950381,
					-0.1839675,
					0.6950381,
					-0.903776,
					-0.1963435,
					0.380313,
					-0.9593295,
					-0.2043618,
					0.1947383,
					-0.9782799,
					-0.2072884,
					-0.0003373459,
					-0.8306221,
					-0.008560009,
					0.5567707,
					-0.707078,
					-0.009016315,
					0.707078,
					-0.9230274,
					-0.007569675,
					0.3846596,
					-0.9804376,
					-0.006910289,
					0.1967086,
					-0.999975,
					-0.00702751,
					-0.0009139705,
					-0.8163348,
					0.1793885,
					0.5490148,
					-0.696185,
					0.1750798,
					0.696185,
					-0.7750263,
					0.3493741,
					0.5265663,
					-0.6646242,
					0.3413932,
					0.6646242,
					-0.712536,
					0.4964073,
					0.495855,
					-0.6199802,
					0.4808837,
					0.6199802,
					-0.6199054,
					0.6204594,
					0.4803619,
					-0.5770534,
					0.5779435,
					0.5770534,
					-0.6645954,
					0.6646523,
					0.3413946,
					-0.7749056,
					0.5268656,
					0.3491904,
					-0.8552527,
					0.3665195,
					0.3663416,
					-0.9055395,
					0.188871,
					0.3799026,
					-0.6960511,
					0.6958694,
					0.1768581,
					-0.8152628,
					0.5502448,
					0.1804915,
					-0.9047233,
					0.3819528,
					0.1886472,
					-0.9607229,
					0.1975651,
					0.194883,
					-0.7072056,
					0.707008,
					0,
					-0.829181,
					0.5589803,
					0,
					-0.9216118,
					0.3881128,
					0,
					-0.9797031,
					0.2004532,
					-0.0005753229,
					-0.6201137,
					-0.6201137,
					-0.4805394,
					-0.7122274,
					-0.4963527,
					-0.4963527,
					-0.6201137,
					-0.4805394,
					-0.6201137,
					-0.5773503,
					-0.5773503,
					-0.5773503,
					-0.6647,
					-0.3410981,
					-0.6647,
					-0.7746143,
					-0.3492379,
					-0.5272623,
					-0.6946788,
					-0.186662,
					-0.6946788,
					-0.813445,
					-0.1898259,
					-0.5497938,
					-0.7070716,
					-0.009976553,
					-0.7070715,
					-0.8290441,
					-0.009543983,
					-0.5591018,
					-0.6647,
					-0.6647,
					-0.3410981,
					-0.7746143,
					-0.5272623,
					-0.3492379,
					-0.8547476,
					-0.3670194,
					-0.3670194,
					-0.9028695,
					-0.1970323,
					-0.382106,
					-0.9214768,
					-0.008558429,
					-0.3883391,
					-0.6959506,
					-0.6959506,
					-0.1769334,
					-0.8148397,
					-0.550854,
					-0.1805437,
					-0.9043397,
					-0.3828188,
					-0.1887311,
					-0.9590999,
					-0.2040401,
					-0.1962017,
					-0.9797992,
					-0.007640469,
					-0.1998378,
					-0.7071068,
					-0.7071068,
					0,
					-0.8287514,
					-0.559617,
					0,
					-0.9212493,
					-0.3889727,
					0,
					-0.9782799,
					-0.2072884,
					-0.0003373459,
					-0.999975,
					-0.00702751,
					-0.0009139705,
					-0.8153889,
					0.1804786,
					-0.5500622,
					-0.6959634,
					0.1768332,
					-0.6959634,
					-0.6646242,
					0.3413932,
					-0.6646242,
					-0.7750263,
					0.3493741,
					-0.5265663,
					-0.6199802,
					0.4808837,
					-0.6199802,
					-0.712536,
					0.4964073,
					-0.495855,
					-0.5770534,
					0.5779435,
					-0.5770534,
					-0.6199054,
					0.6204594,
					-0.4803619,
					-0.7749056,
					0.5268657,
					-0.3491905,
					-0.6645954,
					0.6646523,
					-0.3413946,
					-0.8152629,
					0.5502449,
					-0.1804915,
					-0.6960511,
					0.6958694,
					-0.1768581,
					-0.829181,
					0.5589803,
					0,
					-0.7072056,
					0.707008,
					0,
					-0.8552527,
					0.3665195,
					-0.3663416,
					-0.9047233,
					0.3819528,
					-0.1886472,
					-0.9216118,
					0.3881128,
					0,
					-0.9048204,
					0.1885898,
					-0.3817511,
					-0.960587,
					0.1965229,
					-0.1965996,
					-0.9797031,
					0.2004532,
					-0.0005753229,
					-0.5773503,
					-0.5773503,
					-0.5773503,
					-0.6201137,
					-0.4805394,
					-0.6201137,
					-0.4963542,
					-0.4963524,
					-0.7122266,
					-0.48054,
					-0.620114,
					-0.6201128,
					-0.3492387,
					-0.5272623,
					-0.7746139,
					-0.3410983,
					-0.6647008,
					-0.664699,
					-0.1805428,
					-0.5508541,
					-0.8148399,
					-0.176933,
					-0.695951,
					-0.6959504,
					0,
					-0.559617,
					-0.8287514,
					0,
					-0.7071068,
					-0.7071068,
					-0.527263,
					-0.3492371,
					-0.7746142,
					-0.6647,
					-0.3410981,
					-0.6647,
					-0.3670197,
					-0.3670183,
					-0.8547479,
					-0.1887309,
					-0.3828185,
					-0.9043399,
					0,
					-0.3889731,
					-0.9212492,
					-0.5497938,
					-0.1898259,
					-0.813445,
					-0.6946788,
					-0.186662,
					-0.6946788,
					-0.382106,
					-0.1970323,
					-0.9028695,
					-0.196202,
					-0.2040402,
					-0.9590998,
					0,
					-0.2069658,
					-0.9783482,
					-0.5591018,
					-0.009543994,
					-0.8290441,
					-0.7070716,
					-0.009976553,
					-0.7070715,
					-0.3883391,
					-0.008558438,
					-0.9214768,
					-0.199838,
					-0.007640417,
					-0.9797992,
					0,
					-0.007271087,
					-0.9999735,
					0.196202,
					-0.2040401,
					-0.9590998,
					0.1887314,
					-0.382819,
					-0.9043396,
					0.3821056,
					-0.1970319,
					-0.9028698,
					0.3670183,
					-0.3670197,
					-0.8547479,
					0.549794,
					-0.189825,
					-0.8134452,
					0.5272623,
					-0.3492387,
					-0.7746139,
					0.694679,
					-0.1866611,
					-0.694679,
					0.6646999,
					-0.3410986,
					-0.6646998,
					0.4963524,
					-0.4963542,
					-0.7122266,
					0.6201131,
					-0.4805407,
					-0.6201131,
					0.4805394,
					-0.6201137,
					-0.6201137,
					0.5773503,
					-0.5773503,
					-0.5773503,
					0.7070715,
					-0.009976584,
					-0.7070715,
					0.5591018,
					-0.009544019,
					-0.8290441,
					0.3410981,
					-0.6647,
					-0.6647,
					0.3492371,
					-0.527263,
					-0.7746142,
					0.388339,
					-0.008558459,
					-0.9214768,
					0.1769334,
					-0.6959506,
					-0.6959506,
					0.1805437,
					-0.5508541,
					-0.8148397,
					0.6959636,
					0.1768336,
					-0.695963,
					0.5500622,
					0.1804786,
					-0.8153889,
					0.6646252,
					0.3413929,
					-0.6646233,
					0.5265663,
					0.3493741,
					-0.7750263,
					0.6199811,
					0.4808831,
					-0.6199798,
					0.495855,
					0.4964073,
					-0.712536,
					0.5770534,
					0.5779435,
					-0.5770534,
					0.4803619,
					0.6204594,
					-0.6199054,
					0.3491899,
					0.5268657,
					-0.7749057,
					0.3413944,
					0.6646522,
					-0.6645957,
					0.1804911,
					0.5502449,
					-0.8152629,
					0.1768579,
					0.6958691,
					-0.6960513,
					0,
					0.5589804,
					-0.8291808,
					0,
					0.707008,
					-0.7072056,
					0.3663414,
					0.3665197,
					-0.8552527,
					0.188647,
					0.3819531,
					-0.9047232,
					0,
					0.388113,
					-0.9216118,
					0.3817511,
					0.1885898,
					-0.9048204,
					0.1965995,
					0.1965229,
					-0.960587,
					0,
					0.1998962,
					-0.9798171,
					0.1998378,
					-0.007640359,
					-0.9797992,
					-0.1804913,
					0.5502449,
					-0.8152629,
					-0.1768579,
					0.6958694,
					-0.6960511,
					-0.3491899,
					0.5268657,
					-0.7749057,
					-0.3413942,
					0.6646523,
					-0.6645955,
					-0.495855,
					0.4964073,
					-0.712536,
					-0.4803619,
					0.6204594,
					-0.6199054,
					-0.6199802,
					0.4808837,
					-0.6199802,
					-0.5770534,
					0.5779435,
					-0.5770534,
					-0.6646242,
					0.3413932,
					-0.6646242,
					-0.5265663,
					0.3493741,
					-0.7750263,
					-0.6959634,
					0.1768332,
					-0.6959634,
					-0.5500622,
					0.1804786,
					-0.8153889,
					-0.3663414,
					0.3665197,
					-0.8552527,
					-0.3817512,
					0.1885898,
					-0.9048204,
					-0.1886472,
					0.3819532,
					-0.9047232,
					-0.1965997,
					0.1965229,
					-0.960587
				]
			}
		]
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {
		"meshes": [
			{
				"indices": [
					0,
					1,
					2,
					0,
					2,
					3,
					3,
					2,
					4,
					3,
					4,
					5,
					5,
					4,
					6,
					5,
					6,
					7,
					2,
					8,
					4,
					2,
					9,
					8,
					1,
					9,
					2,
					8,
					9,
					10,
					8,
					10,
					11,
					10,
					12,
					11,
					10,
					13,
					12,
					14,
					12,
					13,
					14,
					15,
					12,
					16,
					15,
					14,
					16,
					17,
					15,
					18,
					17,
					16,
					18,
					19,
					17,
					19,
					20,
					17,
					19,
					21,
					20,
					22,
					19,
					18,
					22,
					23,
					19,
					23,
					21,
					19,
					24,
					23,
					22,
					24,
					25,
					23,
					25,
					26,
					23,
					23,
					26,
					21,
					25,
					27,
					26,
					28,
					25,
					24,
					28,
					29,
					25,
					29,
					27,
					25,
					30,
					29,
					28,
					31,
					30,
					28,
					31,
					28,
					32,
					32,
					28,
					24,
					30,
					33,
					29,
					33,
					34,
					29,
					29,
					34,
					27,
					33,
					35,
					34,
					36,
					33,
					30,
					36,
					37,
					33,
					37,
					35,
					33,
					38,
					37,
					36,
					38,
					39,
					37,
					39,
					40,
					37,
					37,
					40,
					35,
					39,
					41,
					40,
					42,
					39,
					38,
					42,
					43,
					39,
					43,
					41,
					39,
					44,
					43,
					42,
					44,
					45,
					43,
					45,
					46,
					43,
					43,
					46,
					41,
					45,
					47,
					46,
					48,
					45,
					44,
					48,
					49,
					45,
					49,
					47,
					45,
					50,
					49,
					48,
					50,
					51,
					49,
					51,
					52,
					49,
					49,
					52,
					47,
					51,
					53,
					52,
					54,
					51,
					50,
					54,
					55,
					51,
					55,
					53,
					51,
					55,
					56,
					53,
					53,
					57,
					52,
					53,
					58,
					57,
					56,
					58,
					53,
					58,
					59,
					57,
					58,
					60,
					59,
					56,
					61,
					58,
					61,
					60,
					58,
					61,
					62,
					60,
					52,
					57,
					63,
					52,
					63,
					47,
					47,
					63,
					64,
					63,
					65,
					64,
					63,
					66,
					65,
					57,
					59,
					66,
					57,
					66,
					63,
					47,
					64,
					46,
					46,
					64,
					67,
					46,
					67,
					41,
					41,
					67,
					68,
					67,
					69,
					68,
					67,
					70,
					69,
					64,
					65,
					70,
					64,
					70,
					67,
					41,
					68,
					40,
					40,
					68,
					71,
					40,
					71,
					35,
					35,
					71,
					72,
					71,
					73,
					72,
					71,
					74,
					73,
					68,
					69,
					74,
					68,
					74,
					71,
					35,
					72,
					34,
					66,
					75,
					65,
					66,
					76,
					75,
					76,
					77,
					75,
					76,
					78,
					77,
					79,
					78,
					76,
					59,
					79,
					76,
					60,
					79,
					59,
					60,
					80,
					79,
					80,
					81,
					79,
					79,
					81,
					78,
					80,
					82,
					81,
					62,
					80,
					60,
					62,
					83,
					80,
					83,
					82,
					80,
					83,
					84,
					82,
					59,
					76,
					66,
					82,
					85,
					81,
					82,
					86,
					85,
					84,
					86,
					82,
					84,
					87,
					86,
					78,
					88,
					77,
					78,
					89,
					88,
					81,
					85,
					89,
					81,
					89,
					78,
					77,
					88,
					90,
					77,
					90,
					91,
					75,
					77,
					91,
					75,
					91,
					92,
					92,
					91,
					93,
					92,
					93,
					94,
					70,
					92,
					94,
					70,
					94,
					69,
					65,
					75,
					92,
					65,
					92,
					70,
					69,
					94,
					95,
					69,
					95,
					74,
					74,
					95,
					96,
					95,
					97,
					96,
					95,
					98,
					97,
					94,
					93,
					98,
					94,
					98,
					95,
					74,
					96,
					73,
					91,
					90,
					99,
					91,
					99,
					93,
					98,
					100,
					97,
					98,
					101,
					100,
					93,
					99,
					101,
					93,
					101,
					98,
					73,
					96,
					102,
					73,
					102,
					103,
					72,
					73,
					103,
					72,
					103,
					104,
					104,
					103,
					105,
					104,
					105,
					106,
					27,
					104,
					106,
					27,
					106,
					26,
					34,
					72,
					104,
					34,
					104,
					27,
					26,
					106,
					107,
					26,
					107,
					21,
					21,
					107,
					108,
					21,
					108,
					20,
					106,
					105,
					109,
					106,
					109,
					107,
					109,
					108,
					107,
					20,
					108,
					110,
					20,
					110,
					111,
					17,
					20,
					111,
					17,
					111,
					15,
					112,
					111,
					110,
					112,
					113,
					111,
					15,
					111,
					113,
					114,
					113,
					112,
					11,
					113,
					114,
					115,
					11,
					114,
					115,
					8,
					11,
					11,
					12,
					113,
					15,
					113,
					12,
					4,
					8,
					115,
					4,
					115,
					6,
					116,
					115,
					114,
					6,
					115,
					116,
					116,
					114,
					117,
					114,
					112,
					117,
					6,
					116,
					118,
					7,
					6,
					118,
					7,
					118,
					119,
					119,
					118,
					120,
					119,
					120,
					121,
					118,
					116,
					122,
					118,
					122,
					120,
					122,
					116,
					117,
					121,
					120,
					123,
					121,
					123,
					124,
					124,
					123,
					125,
					124,
					125,
					126,
					120,
					122,
					127,
					120,
					127,
					123,
					123,
					127,
					128,
					123,
					128,
					125,
					126,
					125,
					129,
					126,
					129,
					130,
					125,
					128,
					131,
					125,
					131,
					129,
					131,
					128,
					132,
					127,
					132,
					128,
					131,
					132,
					133,
					132,
					134,
					133,
					132,
					135,
					134,
					136,
					134,
					135,
					136,
					137,
					134,
					138,
					137,
					136,
					138,
					139,
					137,
					140,
					139,
					138,
					140,
					141,
					139,
					142,
					141,
					140,
					143,
					142,
					140,
					102,
					142,
					143,
					102,
					144,
					142,
					103,
					102,
					143,
					103,
					143,
					105,
					96,
					144,
					102,
					96,
					97,
					144,
					105,
					143,
					145,
					143,
					140,
					145,
					105,
					145,
					109,
					144,
					146,
					142,
					142,
					146,
					141,
					144,
					147,
					146,
					97,
					147,
					144,
					97,
					100,
					147,
					140,
					148,
					145,
					140,
					138,
					148,
					145,
					148,
					149,
					145,
					149,
					109,
					109,
					149,
					108,
					149,
					110,
					108,
					149,
					150,
					110,
					148,
					150,
					149,
					148,
					151,
					150,
					138,
					151,
					148,
					150,
					151,
					152,
					150,
					152,
					153,
					138,
					136,
					151,
					153,
					152,
					154,
					153,
					154,
					155,
					112,
					153,
					155,
					112,
					110,
					150,
					112,
					150,
					153,
					112,
					155,
					117,
					122,
					117,
					155,
					122,
					155,
					154,
					122,
					154,
					127,
					127,
					154,
					132,
					152,
					132,
					154,
					152,
					135,
					132,
					151,
					136,
					135,
					151,
					135,
					152,
					156,
					44,
					42,
					156,
					42,
					157,
					158,
					156,
					157,
					158,
					157,
					159,
					160,
					158,
					159,
					160,
					159,
					161,
					162,
					158,
					160,
					162,
					163,
					158,
					163,
					156,
					158,
					164,
					163,
					162,
					164,
					165,
					163,
					166,
					165,
					164,
					166,
					167,
					165,
					165,
					168,
					163,
					163,
					168,
					156,
					168,
					44,
					156,
					165,
					169,
					168,
					167,
					169,
					165,
					169,
					48,
					168,
					168,
					48,
					44,
					169,
					50,
					48,
					167,
					170,
					169,
					170,
					50,
					169,
					170,
					54,
					50,
					161,
					159,
					171,
					161,
					171,
					172,
					172,
					171,
					173,
					172,
					173,
					174,
					174,
					173,
					175,
					174,
					175,
					176,
					176,
					175,
					177,
					176,
					177,
					178,
					171,
					179,
					173,
					171,
					180,
					179,
					180,
					36,
					179,
					180,
					38,
					36,
					159,
					180,
					171,
					159,
					157,
					180,
					157,
					38,
					180,
					157,
					42,
					38,
					175,
					32,
					177,
					175,
					31,
					32,
					173,
					179,
					31,
					173,
					31,
					175,
					179,
					36,
					30,
					179,
					30,
					31,
					178,
					177,
					181,
					178,
					181,
					182,
					182,
					181,
					183,
					182,
					183,
					184,
					184,
					183,
					185,
					184,
					185,
					186,
					186,
					185,
					187,
					186,
					187,
					188,
					181,
					189,
					183,
					181,
					190,
					189,
					190,
					22,
					189,
					190,
					24,
					22,
					32,
					24,
					190,
					177,
					32,
					190,
					177,
					190,
					181,
					185,
					191,
					187,
					185,
					192,
					191,
					183,
					189,
					192,
					183,
					192,
					185,
					192,
					16,
					191,
					192,
					18,
					16,
					189,
					22,
					18,
					189,
					18,
					192,
					188,
					187,
					193,
					188,
					193,
					194,
					187,
					191,
					195,
					187,
					195,
					193,
					196,
					193,
					195,
					196,
					197,
					193,
					194,
					193,
					197,
					191,
					16,
					14,
					191,
					14,
					195,
					198,
					197,
					196,
					199,
					197,
					198,
					200,
					199,
					198,
					200,
					201,
					199,
					199,
					202,
					197,
					194,
					197,
					202,
					203,
					201,
					200,
					203,
					200,
					204,
					205,
					203,
					204,
					205,
					204,
					206,
					206,
					204,
					1,
					206,
					1,
					0,
					207,
					200,
					198,
					204,
					200,
					207,
					204,
					207,
					1,
					207,
					198,
					208,
					198,
					196,
					208,
					9,
					207,
					208,
					1,
					207,
					9,
					9,
					208,
					10,
					208,
					13,
					10,
					208,
					196,
					13,
					13,
					196,
					195,
					13,
					195,
					14,
					209,
					210,
					211,
					211,
					212,
					209,
					211,
					213,
					212,
					211,
					214,
					213,
					214,
					215,
					213,
					214,
					216,
					215,
					216,
					217,
					215,
					217,
					218,
					215
				],
				"vertices": [
					-0.003767336,
					2.889062,
					-0.002738062,
					-0.08037603,
					2.873857,
					-0.05841649,
					-0.09940806,
					2.873857,
					-4.440892e-18,
					-0.004659393,
					2.889062,
					-2.081668e-19,
					-0.08037603,
					2.873857,
					0.05841649,
					-0.003767336,
					2.889062,
					0.002738062,
					-0.03068978,
					2.873857,
					0.09444133,
					-0.001438472,
					2.889062,
					0.004426595,
					-0.1485687,
					2.829323,
					0.1079782,
					-0.1837478,
					2.829323,
					-1.332268e-17,
					-0.2404021,
					2.75463,
					-1.776357e-17,
					-0.1943762,
					2.75463,
					0.1412707,
					-0.2172135,
					2.651836,
					0.1578686,
					-0.2686469,
					2.651836,
					-8.881784e-18,
					-0.2608679,
					2.459793,
					-2.220446e-17,
					-0.2109238,
					2.459793,
					0.1532973,
					-0.220512,
					2.26356,
					-1.776357e-17,
					-0.1782942,
					2.26356,
					0.1295824,
					-0.2024626,
					2.057275,
					-1.332268e-17,
					-0.1637004,
					2.057275,
					0.1189758,
					-0.06807765,
					2.26356,
					0.2094946,
					-0.06250532,
					2.057275,
					0.1923469,
					-0.2054521,
					1.87023,
					-1.776357e-17,
					-0.1661175,
					1.87023,
					0.1207326,
					-0.2426541,
					1.714335,
					-1.776357e-17,
					-0.1961971,
					1.714335,
					0.1425941,
					-0.06342825,
					1.87023,
					0.1951871,
					-0.07491345,
					1.714335,
					0.2305304,
					-0.3428729,
					1.507062,
					-2.664535e-17,
					-0.2772287,
					1.507062,
					0.201487,
					-0.4223327,
					1.33455,
					-3.552714e-17,
					-0.3414756,
					1.33455,
					-0.248181,
					-0.2772287,
					1.507062,
					-0.201487,
					-0.3414756,
					1.33455,
					0.248181,
					-0.1058535,
					1.507062,
					0.325742,
					-0.1303848,
					1.33455,
					0.4012317,
					-0.4844817,
					1.141907,
					-2.664535e-17,
					-0.391726,
					1.141907,
					0.2847025,
					-0.5065457,
					0.9415197,
					-6.217249e-17,
					-0.4095657,
					0.9415197,
					0.2976682,
					-0.1495717,
					1.141907,
					0.4602755,
					-0.1563834,
					0.9415197,
					0.4812371,
					-0.4948069,
					0.7488078,
					-2.664535e-17,
					-0.4000743,
					0.7488078,
					0.29077,
					-0.459684,
					0.592738,
					-1.776357e-17,
					-0.3716759,
					0.592738,
					0.2701303,
					-0.1527594,
					0.7488078,
					0.4700848,
					-0.1419161,
					0.592738,
					0.4367168,
					-0.3930105,
					0.3714038,
					-4.440892e-17,
					-0.3177672,
					0.3714038,
					0.23095,
					-0.3217489,
					0.1590626,
					-1.776357e-17,
					-0.2601489,
					0.1590626,
					0.1890736,
					-0.1213323,
					0.3714038,
					0.3733745,
					-0.09933201,
					0.1590626,
					0.3056734,
					-0.2629391,
					0.0002131529,
					-2.220446e-17,
					-0.2125985,
					0.0002131529,
					0.1545144,
					-0.08117595,
					0.0002131529,
					0.2498019,
					0.1212735,
					0.3714038,
					0.3733937,
					0.09928394,
					0.1590626,
					0.3056891,
					0.3178018,
					0.3714038,
					0.2309019,
					0.2601773,
					0.1590626,
					0.1890343,
					0.08113665,
					0.0002131529,
					0.2498147,
					0.2126216,
					0.0002131529,
					0.1544823,
					0.1418474,
					0.592738,
					0.4367393,
					0.1526854,
					0.7488078,
					0.470109,
					0.4001179,
					0.7488078,
					0.2907095,
					0.3717164,
					0.592738,
					0.2700741,
					0.1563078,
					0.9415197,
					0.4812619,
					0.1494994,
					1.141907,
					0.4602993,
					0.3917686,
					1.141907,
					0.2846432,
					0.4096103,
					0.9415197,
					0.2976063,
					0.1303217,
					1.33455,
					0.4012524,
					0.1058023,
					1.507062,
					0.3257587,
					0.2772589,
					1.507062,
					0.2014451,
					0.3415127,
					1.33455,
					0.2481294,
					0.4948069,
					0.7488078,
					1.598721e-16,
					0.459684,
					0.592738,
					1.509903e-16,
					0.4001179,
					0.7488078,
					-0.2907095,
					0.3717164,
					0.592738,
					-0.2700741,
					0.3930105,
					0.3714038,
					1.421085e-16,
					0.3217489,
					0.1590626,
					1.065814e-16,
					0.3178018,
					0.3714038,
					-0.2309019,
					0.2601773,
					0.1590626,
					-0.1890343,
					0.2629391,
					0.0002131529,
					9.769963e-17,
					0.2126216,
					0.0002131529,
					-0.1544823,
					0.1212735,
					0.3714038,
					-0.3733937,
					0.09928394,
					0.1590626,
					-0.3056891,
					0.08113665,
					0.0002131529,
					-0.2498147,
					0.1526854,
					0.7488078,
					-0.470109,
					0.1418474,
					0.592738,
					-0.4367393,
					0.1563078,
					0.9415197,
					-0.4812619,
					0.4096103,
					0.9415197,
					-0.2976063,
					0.5065457,
					0.9415197,
					1.598721e-16,
					0.3917686,
					1.141907,
					-0.2846432,
					0.4844817,
					1.141907,
					1.776357e-16,
					0.4223327,
					1.33455,
					1.421085e-16,
					0.3428729,
					1.507062,
					1.154632e-16,
					0.2772589,
					1.507062,
					-0.2014451,
					0.3415127,
					1.33455,
					-0.2481294,
					0.1494994,
					1.141907,
					-0.4602993,
					0.1058023,
					1.507062,
					-0.3257587,
					0.1303217,
					1.33455,
					-0.4012524,
					0.2426541,
					1.714335,
					8.881784e-17,
					0.1962185,
					1.714335,
					0.1425644,
					0.07487719,
					1.714335,
					0.2305422,
					0.1661356,
					1.87023,
					0.1207074,
					0.06339756,
					1.87023,
					0.1951971,
					0.06247507,
					2.057275,
					0.1923569,
					0.06804469,
					2.26356,
					0.2095054,
					0.1637182,
					2.057275,
					0.118951,
					0.08049754,
					2.459793,
					0.247847,
					-0.08053653,
					2.459793,
					0.2478342,
					0.08289795,
					2.651836,
					0.2552377,
					-0.0829381,
					2.651836,
					0.2552246,
					-0.0742182,
					2.75463,
					0.2283909,
					-0.0567276,
					2.829323,
					0.1745673,
					0.05670015,
					2.829323,
					0.1745762,
					0.07418227,
					2.75463,
					0.2284026,
					0.03067493,
					2.873857,
					0.0944462,
					0.001437776,
					2.889062,
					0.004426824,
					0.08038478,
					2.873857,
					0.05840433,
					0.003767746,
					2.889062,
					0.002737492,
					0.1485848,
					2.829323,
					0.1079557,
					0.09940806,
					2.873857,
					3.552714e-17,
					0.004659393,
					2.889062,
					1.595946e-18,
					0.08038478,
					2.873857,
					-0.05840433,
					0.003767746,
					2.889062,
					-0.002737492,
					0.1837478,
					2.829323,
					6.661338e-17,
					0.1485848,
					2.829323,
					-0.1079557,
					0.03067493,
					2.873857,
					-0.0944462,
					0.001437776,
					2.889062,
					-0.004426824,
					0.05670015,
					2.829323,
					-0.1745762,
					0.1943974,
					2.75463,
					-0.1412413,
					0.07418227,
					2.75463,
					-0.2284026,
					0.08289795,
					2.651836,
					-0.2552377,
					0.2172372,
					2.651836,
					-0.1578358,
					0.2109468,
					2.459793,
					-0.1532654,
					0.08049754,
					2.459793,
					-0.247847,
					0.1783136,
					2.26356,
					-0.1295555,
					0.06804469,
					2.26356,
					-0.2095054,
					0.1637182,
					2.057275,
					-0.118951,
					0.06247507,
					2.057275,
					-0.1923569,
					0.1661356,
					1.87023,
					-0.1207074,
					0.2054521,
					1.87023,
					7.105427e-17,
					0.1962185,
					1.714335,
					-0.1425644,
					0.2024626,
					2.057275,
					7.993605e-17,
					0.06339756,
					1.87023,
					-0.1951971,
					0.07487719,
					1.714335,
					-0.2305422,
					0.220512,
					2.26356,
					7.993605e-17,
					0.1783136,
					2.26356,
					0.1295555,
					0.2109468,
					2.459793,
					0.1532654,
					0.2608679,
					2.459793,
					9.325873e-17,
					0.2686469,
					2.651836,
					9.769963e-17,
					0.2172372,
					2.651836,
					0.1578358,
					0.2404021,
					2.75463,
					8.881784e-17,
					0.1943974,
					2.75463,
					0.1412413,
					-0.3716759,
					0.592738,
					-0.2701303,
					-0.4000743,
					0.7488078,
					-0.29077,
					-0.1419161,
					0.592738,
					-0.4367168,
					-0.1527594,
					0.7488078,
					-0.4700848,
					0.1418474,
					0.592738,
					-0.4367393,
					0.1526854,
					0.7488078,
					-0.470109,
					0.1212735,
					0.3714038,
					-0.3733937,
					-0.1213323,
					0.3714038,
					-0.3733745,
					0.09928394,
					0.1590626,
					-0.3056891,
					-0.09933201,
					0.1590626,
					-0.3056734,
					0.08113665,
					0.0002131529,
					-0.2498147,
					-0.08117595,
					0.0002131529,
					-0.2498019,
					-0.3177672,
					0.3714038,
					-0.23095,
					-0.2601489,
					0.1590626,
					-0.1890736,
					-0.2125985,
					0.0002131529,
					-0.1545144,
					-0.1563834,
					0.9415197,
					-0.4812371,
					0.1563078,
					0.9415197,
					-0.4812619,
					-0.1495717,
					1.141907,
					-0.4602755,
					0.1494994,
					1.141907,
					-0.4602993,
					-0.1303848,
					1.33455,
					-0.4012317,
					0.1303217,
					1.33455,
					-0.4012524,
					-0.1058535,
					1.507062,
					-0.325742,
					0.1058023,
					1.507062,
					-0.3257587,
					-0.391726,
					1.141907,
					-0.2847025,
					-0.4095657,
					0.9415197,
					-0.2976682,
					-0.07491345,
					1.714335,
					-0.2305304,
					0.07487719,
					1.714335,
					-0.2305422,
					-0.06342825,
					1.87023,
					-0.1951871,
					0.06339756,
					1.87023,
					-0.1951971,
					-0.06250532,
					2.057275,
					-0.1923469,
					0.06247507,
					2.057275,
					-0.1923569,
					-0.06807765,
					2.26356,
					-0.2094946,
					0.06804469,
					2.26356,
					-0.2095054,
					-0.1661175,
					1.87023,
					-0.1207326,
					-0.1961971,
					1.714335,
					-0.1425941,
					-0.1782942,
					2.26356,
					-0.1295824,
					-0.1637004,
					2.057275,
					-0.1189758,
					-0.08053653,
					2.459793,
					-0.2478342,
					0.08049754,
					2.459793,
					-0.247847,
					-0.2109238,
					2.459793,
					-0.1532973,
					-0.2172135,
					2.651836,
					-0.1578686,
					-0.0829381,
					2.651836,
					-0.2552246,
					-0.0742182,
					2.75463,
					-0.2283909,
					0.07418227,
					2.75463,
					-0.2284026,
					-0.0567276,
					2.829323,
					-0.1745673,
					0.05670015,
					2.829323,
					-0.1745762,
					0.08289795,
					2.651836,
					-0.2552377,
					0.03067493,
					2.873857,
					-0.0944462,
					-0.03068978,
					2.873857,
					-0.09444133,
					0.001437776,
					2.889062,
					-0.004426824,
					-0.001438472,
					2.889062,
					-0.004426595,
					-0.1485687,
					2.829323,
					-0.1079782,
					-0.1943762,
					2.75463,
					-0.1412707,
					-0.08117595,
					0.0002131529,
					-0.2498019,
					0.08113665,
					0.0002131529,
					-0.2498147,
					0.2126216,
					0.0002131529,
					-0.1544823,
					-0.2125985,
					0.0002131529,
					-0.1545144,
					-0.2629391,
					0.0002131529,
					-2.220446e-17,
					0.2629391,
					0.0002131529,
					9.769963e-17,
					-0.2125985,
					0.0002131529,
					0.1545144,
					0.2126216,
					0.0002131529,
					0.1544823,
					0.08113665,
					0.0002131529,
					0.2498147,
					-0.08117595,
					0.0002131529,
					0.2498019
				],
				"uvs": [
					0.8000448,
					1,
					0.8000448,
					0.9947367,
					0.7000191,
					0.9947367,
					0.7000191,
					1,
					0.5999933,
					0.9947367,
					0.5999933,
					1,
					0.500025,
					0.9947367,
					0.500025,
					1,
					0.5999933,
					0.9793209,
					0.7000191,
					0.9793209,
					0.7000191,
					0.9534652,
					0.5999933,
					0.9534652,
					0.5999933,
					0.917882,
					0.7000191,
					0.917882,
					0.7000191,
					0.8514047,
					0.5999933,
					0.8514047,
					0.7000191,
					0.7834769,
					0.5999933,
					0.7834769,
					0.7000191,
					0.7120696,
					0.5999933,
					0.7120696,
					0.500025,
					0.7834769,
					0.500025,
					0.7120696,
					0.7000191,
					0.6473226,
					0.5999933,
					0.6473226,
					0.7000191,
					0.5933582,
					0.5999933,
					0.5933582,
					0.500025,
					0.6473226,
					0.500025,
					0.5933582,
					0.7000191,
					0.5216088,
					0.5999933,
					0.5216088,
					0.7000191,
					0.4618922,
					0.8000448,
					0.4618922,
					0.8000448,
					0.5216088,
					0.5999933,
					0.4618922,
					0.500025,
					0.5216088,
					0.500025,
					0.4618922,
					0.7000191,
					0.3952073,
					0.5999933,
					0.3952073,
					0.7000191,
					0.3258414,
					0.5999933,
					0.3258414,
					0.500025,
					0.3952073,
					0.500025,
					0.3258414,
					0.7000191,
					0.2591325,
					0.5999933,
					0.2591325,
					0.7000191,
					0.2051076,
					0.5999933,
					0.2051076,
					0.500025,
					0.2591325,
					0.500025,
					0.2051076,
					0.7000191,
					0.1284909,
					0.5999933,
					0.1284909,
					0.7000191,
					0.05498713,
					0.5999933,
					0.05498713,
					0.500025,
					0.1284909,
					0.500025,
					0.05498713,
					0.7000191,
					2.980232e-8,
					0.5999933,
					2.980232e-8,
					0.500025,
					2.980232e-8,
					0.4000381,
					0.1284909,
					0.4000381,
					0.05498713,
					0.3000208,
					0.1284909,
					0.3000208,
					0.05498713,
					0.4000381,
					2.980232e-8,
					0.3000208,
					2.980232e-8,
					0.4000381,
					0.2051076,
					0.4000381,
					0.2591325,
					0.3000208,
					0.2591325,
					0.3000208,
					0.2051076,
					0.4000381,
					0.3258414,
					0.4000381,
					0.3952073,
					0.3000208,
					0.3952073,
					0.3000208,
					0.3258414,
					0.4000381,
					0.4618922,
					0.4000381,
					0.5216088,
					0.3000208,
					0.5216088,
					0.3000208,
					0.4618922,
					0.2000191,
					0.2591325,
					0.2000191,
					0.2051076,
					0.1000173,
					0.2591325,
					0.1000173,
					0.2051076,
					0.2000191,
					0.1284909,
					0.2000191,
					0.05498713,
					0.1000173,
					0.1284909,
					0.1000173,
					0.05498713,
					0.2000191,
					2.980232e-8,
					0.1000173,
					2.980232e-8,
					0,
					0.1284909,
					0,
					0.05498713,
					0,
					2.980232e-8,
					0,
					0.2591325,
					0,
					0.2051076,
					0,
					0.3258414,
					0.1000173,
					0.3258414,
					0.2000191,
					0.3258414,
					0.1000173,
					0.3952073,
					0.2000191,
					0.3952073,
					0.2000191,
					0.4618922,
					0.2000191,
					0.5216088,
					0.1000173,
					0.5216088,
					0.1000173,
					0.4618922,
					0,
					0.3952073,
					0,
					0.5216088,
					0,
					0.4618922,
					0.2000191,
					0.5933582,
					0.3000208,
					0.5933582,
					0.4000381,
					0.5933582,
					0.3000208,
					0.6473226,
					0.4000381,
					0.6473226,
					0.4000381,
					0.7120696,
					0.4000381,
					0.7834769,
					0.3000208,
					0.7120696,
					0.4000381,
					0.8514047,
					0.500025,
					0.8514047,
					0.4000381,
					0.917882,
					0.500025,
					0.917882,
					0.500025,
					0.9534652,
					0.500025,
					0.9793209,
					0.4000381,
					0.9793209,
					0.4000381,
					0.9534652,
					0.4000381,
					0.9947367,
					0.4000381,
					1,
					0.3000208,
					0.9947367,
					0.3000208,
					1,
					0.3000208,
					0.9793209,
					0.2000191,
					0.9947367,
					0.2000191,
					1,
					0.1000173,
					0.9947367,
					0.1000173,
					1,
					0.2000191,
					0.9793209,
					0.1000173,
					0.9793209,
					0,
					0.9947367,
					0,
					1,
					0,
					0.9793209,
					0.1000173,
					0.9534652,
					0,
					0.9534652,
					0,
					0.917882,
					0.1000173,
					0.917882,
					0.1000173,
					0.8514047,
					0,
					0.8514047,
					0.1000173,
					0.7834769,
					0,
					0.7834769,
					0.1000173,
					0.7120696,
					0,
					0.7120696,
					0.1000173,
					0.6473226,
					0.2000191,
					0.6473226,
					0.1000173,
					0.5933582,
					0.2000191,
					0.7120696,
					0,
					0.6473226,
					0,
					0.5933582,
					0.2000191,
					0.7834769,
					0.3000208,
					0.7834769,
					0.3000208,
					0.8514047,
					0.2000191,
					0.8514047,
					0.2000191,
					0.917882,
					0.3000208,
					0.917882,
					0.2000191,
					0.9534652,
					0.3000208,
					0.9534652,
					0.8000448,
					0.2051076,
					0.8000448,
					0.2591325,
					0.9000131,
					0.2051076,
					0.9000131,
					0.2591325,
					1,
					0.2051076,
					1,
					0.2591325,
					1,
					0.1284909,
					0.9000131,
					0.1284909,
					1,
					0.05498713,
					0.9000131,
					0.05498713,
					1,
					2.980232e-8,
					0.9000131,
					2.980232e-8,
					0.8000448,
					0.1284909,
					0.8000448,
					0.05498713,
					0.8000448,
					2.980232e-8,
					0.9000131,
					0.3258414,
					1,
					0.3258414,
					0.9000131,
					0.3952073,
					1,
					0.3952073,
					0.9000131,
					0.4618922,
					1,
					0.4618922,
					0.9000131,
					0.5216088,
					1,
					0.5216088,
					0.8000448,
					0.3952073,
					0.8000448,
					0.3258414,
					0.9000131,
					0.5933582,
					1,
					0.5933582,
					0.9000131,
					0.6473226,
					1,
					0.6473226,
					0.9000131,
					0.7120696,
					1,
					0.7120696,
					0.9000131,
					0.7834769,
					1,
					0.7834769,
					0.8000448,
					0.6473226,
					0.8000448,
					0.5933582,
					0.8000448,
					0.7834769,
					0.8000448,
					0.7120696,
					0.9000131,
					0.8514047,
					1,
					0.8514047,
					0.8000448,
					0.8514047,
					0.8000448,
					0.917882,
					0.9000131,
					0.917882,
					0.9000131,
					0.9534652,
					1,
					0.9534652,
					0.9000131,
					0.9793209,
					1,
					0.9793209,
					1,
					0.917882,
					1,
					0.9947367,
					0.9000131,
					0.9947367,
					1,
					1,
					0.9000131,
					1,
					0.8000448,
					0.9793209,
					0.8000448,
					0.9534652,
					0.9000131,
					2.980232e-8,
					1,
					2.980232e-8,
					0.1000173,
					2.980232e-8,
					0.8000448,
					2.980232e-8,
					0.7000191,
					2.980232e-8,
					0.2000191,
					2.980232e-8,
					0.5999933,
					2.980232e-8,
					0.3000208,
					2.980232e-8,
					0.4000381,
					2.980232e-8,
					0.500025,
					2.980232e-8
				],
				"normals": [
					-0.1281576,
					0.9873552,
					-0.09330309,
					-0.255674,
					0.948676,
					-0.1861306,
					-0.3161206,
					0.948719,
					-0.000002108825,
					-0.1584507,
					0.9873669,
					-0.00000415177,
					-0.2556741,
					0.9486765,
					0.1861284,
					-0.1281577,
					0.9873555,
					0.09329897,
					-0.09762868,
					0.9486222,
					0.3009729,
					-0.04893913,
					0.9873406,
					0.1508753,
					-0.5218976,
					0.7637306,
					0.3799192,
					-0.6453688,
					0.7638711,
					0,
					-0.8960848,
					0.4438828,
					0,
					-0.7245365,
					0.4437229,
					0.5274058,
					-0.8032421,
					0.1137924,
					0.5846823,
					-0.9934987,
					0.1138434,
					0,
					-0.9926,
					-0.1214305,
					0,
					-0.8025168,
					-0.1213753,
					0.5841531,
					-0.9894921,
					-0.1445875,
					0,
					-0.8000063,
					-0.144522,
					0.5823259,
					-0.9993644,
					-0.03564852,
					0,
					-0.8079816,
					-0.03563203,
					0.5881294,
					-0.3053518,
					-0.144438,
					0.9412215,
					-0.3083927,
					-0.03561091,
					0.9505923,
					-0.9921653,
					0.1249316,
					0,
					-0.8021655,
					0.1248752,
					0.5838979,
					-0.9418612,
					0.336002,
					0,
					-0.761525,
					0.3358651,
					0.5543233,
					-0.3061748,
					0.124803,
					0.943759,
					-0.2906769,
					0.3356901,
					0.8960017,
					-0.9043226,
					0.4268498,
					0,
					-0.7311953,
					0.4266877,
					0.532251,
					-0.9316127,
					0.3634527,
					0,
					-0.7532451,
					0.3633068,
					-0.5482973,
					-0.7311953,
					0.4266877,
					-0.5322509,
					-0.7532451,
					0.3633068,
					0.5482973,
					-0.2791101,
					0.4264797,
					0.8603561,
					-0.2875196,
					0.3631197,
					0.8862712,
					-0.9778074,
					0.2095058,
					0,
					-0.7905663,
					0.2094137,
					0.5754571,
					-0.9997016,
					0.0244277,
					0,
					-0.8082537,
					0.02441639,
					0.588328,
					-0.3017519,
					0.2092959,
					0.9301296,
					-0.3084964,
					0.02440188,
					0.9509124,
					-0.9900501,
					-0.1407158,
					0,
					-0.8004567,
					-0.1406521,
					0.5826542,
					-0.967156,
					-0.2541838,
					0,
					-0.7819616,
					-0.2540735,
					0.5691949,
					-0.3055235,
					-0.1405707,
					0.9417512,
					-0.298471,
					-0.2539321,
					0.9200182,
					-0.9528824,
					-0.3033398,
					0,
					-0.77043,
					-0.3032119,
					0.5608031,
					-0.9430246,
					-0.3327231,
					0,
					-0.7624657,
					-0.3325857,
					0.5550072,
					-0.2940735,
					-0.3030479,
					0.9064672,
					-0.2910362,
					-0.3324095,
					0.8971075,
					-0.9377936,
					-0.3471934,
					0,
					-0.7582393,
					-0.3470515,
					0.5519315,
					-0.2894245,
					-0.3468696,
					0.8921406,
					0.2940017,
					-0.303048,
					0.9064904,
					0.2909653,
					-0.3324096,
					0.8971304,
					0.77045,
					-0.3032117,
					0.5607758,
					0.7624851,
					-0.3325855,
					0.5549804,
					0.2893541,
					-0.3468699,
					0.8921635,
					0.7582586,
					-0.3470513,
					0.551905,
					0.2983979,
					-0.2539322,
					0.9200419,
					0.3054484,
					-0.1405708,
					0.9417755,
					0.8004778,
					-0.1406521,
					0.5826253,
					0.781982,
					-0.2540733,
					0.5691669,
					0.3084206,
					0.02440188,
					0.9509371,
					0.301678,
					0.2092961,
					0.9301535,
					0.7905869,
					0.2094137,
					0.5754287,
					0.8082751,
					0.02441634,
					0.5882986,
					0.2874497,
					0.3631199,
					0.8862937,
					0.2790427,
					0.4264798,
					0.8603779,
					0.7312137,
					0.4266874,
					0.5322258,
					0.7532643,
					0.3633066,
					0.5482711,
					0.9900501,
					-0.1407158,
					0,
					0.967156,
					-0.2541838,
					0,
					0.8004778,
					-0.1406521,
					-0.5826252,
					0.781982,
					-0.2540733,
					-0.5691669,
					0.9528824,
					-0.3033397,
					0,
					0.9430246,
					-0.332723,
					0,
					0.77045,
					-0.3032117,
					-0.5607758,
					0.7624851,
					-0.3325854,
					-0.5549803,
					0.9377936,
					-0.3471932,
					0,
					0.7582588,
					-0.3470513,
					-0.5519049,
					0.2940017,
					-0.303048,
					-0.9064904,
					0.2909653,
					-0.3324096,
					-0.8971304,
					0.2893541,
					-0.3468698,
					-0.8921634,
					0.3054485,
					-0.1405707,
					-0.9417755,
					0.2983979,
					-0.2539322,
					-0.9200419,
					0.3084206,
					0.02440188,
					-0.9509371,
					0.8082751,
					0.02441634,
					-0.5882986,
					0.9997016,
					0.02442767,
					0,
					0.7905869,
					0.2094137,
					-0.5754287,
					0.9778074,
					0.2095059,
					0,
					0.9316126,
					0.3634527,
					0,
					0.9043226,
					0.4268497,
					0,
					0.7312137,
					0.4266874,
					-0.5322258,
					0.7532644,
					0.3633066,
					-0.548271,
					0.301678,
					0.2092961,
					-0.9301535,
					0.2790426,
					0.4264799,
					-0.8603778,
					0.2874498,
					0.36312,
					-0.8862937,
					0.9418612,
					0.3360018,
					0,
					0.7615445,
					0.3358649,
					0.5542966,
					0.2906062,
					0.3356903,
					0.8960246,
					0.8021865,
					0.1248752,
					0.5838689,
					0.3060997,
					0.1248031,
					0.9437833,
					0.3083169,
					-0.03561094,
					0.9506168,
					0.3052768,
					-0.1444381,
					0.9412457,
					0.8080029,
					-0.03563201,
					0.5881,
					0.3062336,
					-0.1213047,
					0.944196,
					-0.306309,
					-0.1213046,
					0.9441716,
					0.3065097,
					0.1137275,
					0.945049,
					-0.306585,
					0.1137274,
					0.9450247,
					-0.2765687,
					0.44352,
					0.8525255,
					-0.1992541,
					0.7635531,
					0.6142349,
					0.1992073,
					0.7635538,
					0.6142492,
					0.2765021,
					0.443521,
					0.8525466,
					0.09760635,
					0.948622,
					0.3009804,
					0.04892825,
					0.9873406,
					0.150879,
					0.255679,
					0.9486761,
					0.1861234,
					0.12816,
					0.9873553,
					0.09329754,
					0.5219089,
					0.7637304,
					0.3799037,
					0.316121,
					0.948719,
					-6.763418e-7,
					0.1584507,
					0.9873669,
					-0.000002077748,
					0.2556789,
					0.9486759,
					-0.1861245,
					0.12816,
					0.9873551,
					-0.09330065,
					0.6453696,
					0.7638704,
					6.474516e-7,
					0.521909,
					0.7637306,
					-0.3799033,
					0.09760633,
					0.9486217,
					-0.3009813,
					0.04892824,
					0.9873404,
					-0.1508811,
					0.1992073,
					0.7635538,
					-0.6142492,
					0.7245545,
					0.4437231,
					-0.5273808,
					0.276502,
					0.4435208,
					-0.8525468,
					0.3065098,
					0.1137275,
					-0.945049,
					0.8032631,
					0.1137923,
					-0.5846535,
					0.8025379,
					-0.1213752,
					-0.5841241,
					0.3062336,
					-0.1213046,
					-0.944196,
					0.8000273,
					-0.1445219,
					-0.5822969,
					0.3052768,
					-0.1444381,
					-0.9412459,
					0.8080029,
					-0.03563201,
					-0.5881,
					0.308317,
					-0.03561094,
					-0.9506168,
					0.8021867,
					0.1248752,
					-0.5838687,
					0.9921653,
					0.1249316,
					0,
					0.7615445,
					0.335865,
					-0.5542964,
					0.9993644,
					-0.03564852,
					0,
					0.3060997,
					0.1248031,
					-0.9437833,
					0.2906063,
					0.3356903,
					-0.8960245,
					0.9894921,
					-0.1445875,
					0,
					0.8000273,
					-0.1445219,
					0.5822969,
					0.8025379,
					-0.1213752,
					0.5841241,
					0.9926,
					-0.1214305,
					0,
					0.9934988,
					0.1138432,
					0,
					0.8032631,
					0.1137924,
					0.5846535,
					0.8960851,
					0.4438822,
					2.526606e-7,
					0.7245545,
					0.4437232,
					0.5273808,
					-0.7819616,
					-0.2540735,
					-0.5691949,
					-0.8004567,
					-0.1406521,
					-0.5826542,
					-0.298471,
					-0.2539321,
					-0.9200183,
					-0.3055235,
					-0.1405707,
					-0.9417512,
					0.2983979,
					-0.2539322,
					-0.9200419,
					0.3054485,
					-0.1405707,
					-0.9417755,
					0.2940017,
					-0.303048,
					-0.9064904,
					-0.2940735,
					-0.3030478,
					-0.9064672,
					0.2909653,
					-0.3324096,
					-0.8971304,
					-0.2910362,
					-0.3324095,
					-0.8971075,
					0.2893541,
					-0.3468698,
					-0.8921634,
					-0.2894245,
					-0.3468696,
					-0.8921406,
					-0.77043,
					-0.3032119,
					-0.5608031,
					-0.7624655,
					-0.3325857,
					-0.5550072,
					-0.7582393,
					-0.3470515,
					-0.5519315,
					-0.3084964,
					0.02440189,
					-0.9509124,
					0.3084206,
					0.02440188,
					-0.9509371,
					-0.3017519,
					0.2092959,
					-0.9301296,
					0.301678,
					0.2092961,
					-0.9301535,
					-0.2875196,
					0.3631198,
					-0.8862712,
					0.2874498,
					0.36312,
					-0.8862937,
					-0.2791101,
					0.4264798,
					-0.8603561,
					0.2790426,
					0.4264799,
					-0.8603778,
					-0.7905663,
					0.2094137,
					-0.5754571,
					-0.8082537,
					0.02441639,
					-0.588328,
					-0.2906769,
					0.33569,
					-0.8960017,
					0.2906063,
					0.3356903,
					-0.8960245,
					-0.3061748,
					0.124803,
					-0.9437591,
					0.3060997,
					0.1248031,
					-0.9437833,
					-0.3083927,
					-0.03561093,
					-0.9505923,
					0.308317,
					-0.03561094,
					-0.9506168,
					-0.3053518,
					-0.144438,
					-0.9412215,
					0.3052768,
					-0.1444381,
					-0.9412459,
					-0.8021654,
					0.1248752,
					-0.5838979,
					-0.761525,
					0.3358651,
					-0.5543233,
					-0.8000063,
					-0.144522,
					-0.5823259,
					-0.8079816,
					-0.03563203,
					-0.5881294,
					-0.306309,
					-0.1213046,
					-0.9441716,
					0.3062336,
					-0.1213046,
					-0.944196,
					-0.8025168,
					-0.1213753,
					-0.5841532,
					-0.8032421,
					0.1137924,
					-0.5846824,
					-0.306585,
					0.1137274,
					-0.9450248,
					-0.2765686,
					0.4435197,
					-0.8525257,
					0.276502,
					0.4435208,
					-0.8525468,
					-0.199254,
					0.763553,
					-0.614235,
					0.1992073,
					0.7635538,
					-0.6142492,
					0.3065098,
					0.1137275,
					-0.945049,
					0.09760633,
					0.9486217,
					-0.3009813,
					-0.09762864,
					0.9486219,
					-0.3009733,
					0.04892824,
					0.9873404,
					-0.1508811,
					-0.04893914,
					0.9873405,
					-0.1508764,
					-0.5218974,
					0.7637305,
					-0.3799195,
					-0.7245365,
					0.4437228,
					-0.5274059,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0
				]
			}
		]
	};

/***/ },
/* 32 */,
/* 33 */
/***/ function(module, exports) {

	module.exports = {
		"textures": [
			{
				"id": "pin.tex",
				"path": "./textures/bowlingpin.png"
			}
		]
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	const SceneObject = __webpack_require__(14);
	const ResourceManager = __webpack_require__(23);
	const vec3 = __webpack_require__(4).vec3;

	module.exports = {
	    load: function () {

	        var root = new SceneObject();

	        var alley = new SceneObject(root);
	        alley.model = ResourceManager.getModel("cube.json");
	        alley.material = ResourceManager.getMaterial("default");
	        alley.scale = vec3.fromValues(2, 0.2, 12);
	        window.alley = alley;
	        window.vec3 = vec3;

	        var ball = new SceneObject(root);
	        // ball.model = ResourceManager.getModel("sphere.json");
	        var pinPositions = [
	            [-0.4, 0.14, -10.5],
	            [0.4, 0.14, -10.5],
	            [1.2, 0.14, -10.5],
	            [-1.2, 0.14, -10.5],
	            [0, 0.14, -9.5],
	            [-0.9, 0.14, -9.5],
	            [0.9, 0.14, -9.5],
	            [0.5, 0.14, -8.5],
	            [-0.5, 0.14, -8.5],
	            [0, 0.14, -7.5]
	        ];

	        for (var i = 0; i < 10; i++) {
	            var pin = new SceneObject(root);
	            pin.model = ResourceManager.getModel("pin.json");
	            pin.material = ResourceManager.getMaterial("pin.mat");
	            pin.setPosition(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]);
	            pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
	            window.pin = pin;
	        }

	        // var ground = new SceneObject(root);
	        // // ground.transform.setRotation();
	        // for (var i = 0; i < 10; i++) {
	        //     var groundElement = new SceneObject(ground);
	        //     groundElement.model = ResourceManager.getModel("quad.json");
	        //     groundElement.transform.setPosition(0, 0, i);
	        // }
	        //
	        // var ball = new SceneObject(root);
	        // var ballModel = ResourceManager.getModel("ball.json");
	        // ball.model = new Model(ballModel);
	        //
	        // var pinRoot = new SceneObject(root);
	        // for(i = 0; i < 10; i++) {
	        //     var pin = new SceneObject(pinRoot);
	        //     pin.model = ResourceManager.getModel("pin.json");
	        //     pin.transform.setPosition(0, 0, i);
	        // }

	        return root;
	    }
	};



/***/ },
/* 35 */
/***/ function(module, exports) {

	

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
	    clamp: function clamp(input, min, max) {
	        if (input < min) input = min;
	        if (input > max) input = max;
	        return input;
	    }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	const GameScene = __webpack_require__(18);

	const SceneState = {
	    Intro: 1 << 0,
	    TurnBegin: 1 << 1,
	    TurnAim: 1 << 2,
	    TurnRoll: 1 << 3,
	    TurnEnd: 1 << 4,
	    Summary: 1 << 5
	};

	class IntroPlayScene extends GameScene {

	}

	class TurnBeginScene extends GameScene {

	}

	class TurnAimScene extends GameScene {

	}

	class TurnRollState {

	}

	class PlayScene extends GameScene {

	    //states
	    //splash 'its your turn' screen
	    //aim + get input
	    //roll ball and see what happens (repeat until done rolling)
	    //record + report score
	    //summarize turn
	    //end

	    constructor(players, frameCount) {
	        this.players = players;
	        this.sceneState = SceneState.Intro;
	        this.currentPlayerIndex = 0;
	        this.totalFrames = frameCount || 10;
	        this.currentPlayer = this.players[this.currentPlayerIndex];
	    }

	    enter() {
	        this.activeScene = new IntroPlayScene();
	        this.activeScene.enter();
	    }

	    update() {
	        this.handleInput();
	        this.updateSceneObjects();
	        this.renderSceneObjects();
	    }

	    exit() {
	        this.activeScene.exit();
	    }

	    //true when all players have completed current frame #
	    isFrameCompleted() {

	    }

	    //true when current player has completed current frame
	    isTurnCompleted() {
	    }

	    //true when all players have finished the last frame
	    isGameCompleted() {

	    }

	}

	class TurnManager {

	}

	class InputManager {

	}

	class RenderEngine {

	}

	module.exports = PlayScene;

/***/ },
/* 38 */
/***/ function(module, exports) {

	class PlayerStats {

	    constructor() {
	        this.gamesPlayed = 0;
	        this.gamesWon = 0;
	        this.totalSpares = 0;
	        this.totalStrikes = 0;
	        this.highScore = 0;
	        this.totalScore = 0;
	    }
	}

	module.exports = PlayerStats;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	const ScoreKeeper = __webpack_require__(40);
	const PlayerStats = __webpack_require__(38);

	class Player {

	    constructor(name) {
	        this.name = name;
	        this.stats = new PlayerStats();
	        this.scoreKeeper = new ScoreKeeper();
	    }

	}

	module.exports = Player;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	const ScoreFrame = __webpack_require__(41);

	class ScoreKeeper {

	    constructor() {
	        this.currentFrameIndex = -1;
	        this.frames = [];
	        this.pendingList = [];
	    }

	    beginNewGame(frameCount) {
	        this.currentFrameIndex = -1;
	        this.frames = new Array(frameCount);
	        for (var i = 0; i < frameCount; i++) {
	            this.frames[i] = new ScoreFrame(i === frameCount - 1);
	        }
	    }

	    beginNewFrame() {
	        this.currentFrameIndex++;
	        this.pendingList.push(this.frames[this.currentFrameIndex]);
	    }

	    recordScore(pins) {
	        for(var i = 0; i < this.pendingList.length; i++) {
	            const pendingFrame = this.pendingList[i];
	            pendingFrame.scoreRoll(pins);

	            if(pendingFrame.isScoringCompleted) {
	                this.pendingList.splice(i--, 1);
	            }
	        }
	    }

	    get totalScore() {
	        return this.frames.reduce(function(prev, current, idx, array) {
	            return prev + array[idx].score;
	        }, 0);
	    }

	    get isCurrentRollingCompleted() {
	        return this.frames[this.currentFrameIndex].isRollingCompleted;
	    }

	    get isCurrentScoringCompleted() {
	        return this.frames[this.currentFrameIndex].isScoringCompleted;
	    }

	    get currentFrame() {
	        return this.frames[this.currentFrameIndex];
	    }

	}

	module.exports = ScoreKeeper;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	const clamp = __webpack_require__(22).clamp;
	const FrameResult = __webpack_require__(15);

	class ScoreFrame {

	    constructor(isLastFrame) {
	        this.isLastFrame = isLastFrame;
	        this.frameResult = FrameResult.Pending;
	        this.totalRolls = 0;
	        this.score = 0;
	    }

	    scoreRoll(pinCount) {
	        this.totalRolls++;
	        this.score += clamp(pinCount, 0, 10);
	        if (this.frameResult === FrameResult.Pending) {

	            if (this.score === 10 && this.totalRolls === 1) {
	                this.frameResult = FrameResult.Strike;
	            }
	            else if (this.score === 10 && this.totalRolls === 2) {
	                this.frameResult = FrameResult.Spare;
	            }
	            else if (this.totalRolls === 2) {
	                this.frameResult = FrameResult.Open;
	            }
	        }
	    }

	    get isScoringCompleted() {
	        if(this.isSpare || this.isStrike) return this.totalRolls === 3;
	        return !this.isPending;
	    }

	    get isRollingCompleted() {
	        if(this.isLastFrame) {
	            var targetRolls = (this.isStrike || this.isSpare) ? 3 : 2;
	            return targetRolls === this.totalRolls;
	        }
	        else {
	            return !this.isPending;
	        }
	    }

	    get isStrike() {
	        return this.frameResult === FrameResult.Strike;
	    }

	    get isSpare() {
	        return this.frameResult === FrameResult.Spare;
	    }

	    get isPending() {
	        return this.frameResult === FrameResult.Pending;
	    }

	    get isOpen() {
	        return this.frameResult === FrameResult.Open;
	    }

	}

	module.exports = ScoreFrame;

/***/ },
/* 42 */
/***/ function(module, exports) {

	// const vec3 = require("gl-matrix").vec3;
	// const quat = require("gl-matrix").quat;
	// const mat4 = require("gl-matrix").mat4;
	//
	// const forward = vec3.create(0, 0, -1);
	// const right = vec3.create(1, 0, 0);
	// const up = vec3.create(0, 1, 0);
	//
	// class Transform {
	//
	//     constructor(sceneObject) {
	//         var parentTransform = sceneObject && sceneObject.transform;
	//         this.setParent(parentTransform || null);
	//         this.sceneObject = sceneObject;
	//         this.position = vec3.create();
	//         this.rotation = quat.create();
	//         quat.identity(this.rotation);
	//         this.scale = vec3.fromValues(1, 1, 1);
	//         this.__matrix = mat4.create();
	//         this.children = [];
	//     }
	//
	//     setScale(x, y, z) {
	//         vec3.set(this.scale, x, y, z);
	//     }
	//
	//     setRotation(yaw, pitch, roll) {
	//         throw Error("Not implemented");
	//     }
	//
	//     setPosition(x, y, z) {
	//         vec3.set(this.position, x, y, z);
	//     }
	//
	//     getMatrix() {
	//         mat4.identity(this.__matrix);
	//         mat4.fromRotationTranslationScale(this.__matrix, this.rotation, this.position, this.scale);
	//         return this.__matrix;
	//     }
	//
	//     setParent(parent) {
	//         if (this.parent) {
	//             const idx = this.parent.children.indexOf(this);
	//             if (idx !== -1) {
	//                 this.parent.children.splice(idx, 1);
	//             }
	//         }
	//         this.parent = parent;
	//         if(this.parent) {
	//             this.parent.children.push(this);
	//         }
	//     }
	//
	//     getForward() {
	//         var retn = vec3.create();
	//         vec3.transformQuat(retn, forward, this.rotation);
	//         return retn;
	//     }
	//
	//     getRight() {
	//         var retn = vec3.create();
	//         vec3.transformQuat(retn, right, this.rotation);
	//         return retn;
	//     }
	//
	//     getUp() {
	//         var retn = vec3.create();
	//         vec3.transformQuat(retn, up, this.rotation);
	//         return retn;
	//     }
	//
	//     getLocalRotation() {
	//
	//     }
	//
	//     getWorldMatrix() {
	//
	//     }
	// }
	//
	//
	// module.exports = Transform;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	const GameEvent = __webpack_require__(16);
	const EventEmitter = __webpack_require__(17);

	class TurnManager extends EventEmitter {

	    constructor(players) {
	        super();
	        this.players = players;
	        this.currentPlayerIdx = 0;
	        this.currentFrameNumber = 0;
	        this.totalFrames = 10;
	    }

	    startGame(frameCount) {
	        this.totalFrames = frameCount || 10;
	        this.currentPlayerIdx = 0;
	        this.currentFrameNumber = 0;
	        for(var i = 0; i < this.players.length; i++) {
	            this.players[i].scoreKeeper.beginNewGame(this.totalFrames);
	        }
	        this.beginFrame();
	    }

	    beginFrame() {
	        this.currentFrameNumber++;
	        this.emit(GameEvent.BeginFrame, this.currentFrameNumber);
	        this.beginTurn();
	    }

	    beginTurn() {
	        this.emit(GameEvent.BeginTurn, this.currentPlayer, this.currentFrameNumber);
	        this.currentPlayer.scoreKeeper.beginNewFrame();
	    }

	    recordScore(pins) {
	        //dont record points if the game is over
	        if(this.isGameOver) return;
	        const scoreKeeper = this.currentPlayer.scoreKeeper;
	        scoreKeeper.recordScore(pins);
	        //if we are done rolling, end the turn. Note for the last frame
	        //this could be up to 3 rolls.
	        if (scoreKeeper.isCurrentRollingCompleted) {
	            this.endTurn();
	        }
	    }

	    endTurn() {
	        this.emit(GameEvent.EndTurn, this.currentPlayer, this.currentFrameNumber);
	        this.currentPlayerIdx = ++this.currentPlayerIdx % this.players.length;
	        //when we wrap around to the first player again we know the frame is over.
	        //if the frame isn't completed, start the next player's turn
	        if (this.currentPlayerIdx === 0) {
	            this.endFrame();
	        }
	        else {
	            this.beginTurn();
	        }
	    }

	    endFrame() {
	        this.emit(GameEvent.EndFrame, this.currentFrameNumber);
	        if (!this.isGameOver) {
	            this.beginFrame();
	        }
	    }

	    get isGameOver() {
	        return this.currentFrameNumber >= this.totalFrames
	            && this.players.every(function (player) {
	                return player.scoreKeeper.isCurrentRollingCompleted;
	            });
	    }

	    get currentPlayer() {
	        return this.players[this.currentPlayerIdx];
	    }
	}

	module.exports = TurnManager;

/***/ },
/* 44 */,
/* 45 */,
/* 46 */
/***/ function(module, exports) {

	module.exports = {
		"textures": [
			{
				"id": "alley",
				"path": "./textures/alley.png",
				"tiling": {
					"x": 1,
					"y": 1
				}
			}
		],
		"shader": "",
		"cullFace": true,
		"blendMode": "none"
	};

/***/ }
]);