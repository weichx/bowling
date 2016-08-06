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
	__webpack_require__(37);
	__webpack_require__(25);
	__webpack_require__(38);
	__webpack_require__(24);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(23);
	__webpack_require__(14);
	__webpack_require__(43);
	__webpack_require__(42);
	__webpack_require__(35);
	__webpack_require__(21);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(22);
	module.exports = __webpack_require__(37);


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
	        this.setPosition(0, 0.5, -5);
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
	const mat3 = __webpack_require__(4).mat3;
	const GLUtil = __webpack_require__(2);

	const forward = vec3.fromValues(0, 0, 1);
	const right = vec3.fromValues(1, 0, 0);
	const up = vec3.fromValues(0, 1, 0);

	class SceneObject {

	    constructor(parentNode) {
	        this.setParent(parentNode);
	        this.model = null;
	        this.material = null;
	        this.rigidBody = null;
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

	        var normalMatrix = mat3.create();
	        mat3.normalFromMat4(normalMatrix, mvMatrix);
	        gl.uniformMatrix3fv(shaderPointers.uNormalMatrix, false, normalMatrix);

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
	        if(this.rigidBody && !this.rigidBody.test) {
	            var v = this.rigidBody.position;
	            var q = this.rigidBody.quaternion;
	            this.setPosition(v.x, v.y, v.z);
	            this.setRotation(q.x, q.y, q.z, q.w);
	        }
	        for (var i = 0; i < this.children.length; i++) {
	            this.children[i].update();
	        }
	    }

	    destroy() {
	        for (var i = 0; i < this.children.length; i++) {
	            this.children[i].destroy();
	        }
	    }

	    setScale(x, y, z) {
	        vec3.set(this.scale, x, y, z);
	    }

	    setRotation(x, y, z, w) {
	        quat.set(this.rotation, x, y, z, w);
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
	const Scene = __webpack_require__(35);

	ResourceManager.readyPromise.then(() => {

	    const scene = Scene.load();
	    const sceneRoot = scene.root;
	    const scenePhysics = scene.physicsWorld;

	    const identityMatrix = mat4.create();
	    const camera = new Camera();
	    const gl = GLUtil.getGl();

	    camera.updatePerspectiveMatrix();

	    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	    gl.clearColor(0.2, 0.2, 0.2, 1.0);

	    (function tick(timestamp) {
	        Time.update(timestamp);
	        requestAnimationFrame(tick);
	        scenePhysics.step(1.0 / 60.0, Time.deltaTime, 3);
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
	        sceneRoot.render(identityMatrix, inv, camera.projectionMatrix);
	    }

	    const scratch = vec3.create();
	    window.cameraSpeed = 15;
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
	manager.setMaterial("default", __webpack_require__(32));
	manager.setMaterial("pin.mat", __webpack_require__(33));
	manager.setMaterial("ball.mat", __webpack_require__(34));

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
	        const normals = modelJSON.meshes[0].normals;
	        const uvs = modelJSON.meshes[0].uvs;

	        const gl = GLUtil.getGl();

	        this.vertexBuffer = new GLBuffer();
	        this.indexBuffer = new GLBuffer();
	        this.uvBuffer = new GLBuffer();
	        this.normalBuffer = new GLBuffer();

	        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer.glBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	        this.vertexBuffer.itemSize = 3;
	        this.vertexBuffer.numItems = vertices.length;

	        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer.glBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	        this.normalBuffer.itemSize = 3;
	        this.normalBuffer.numItems = normals.length;

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
	        this.shaderPointers.uNormalMatrix = gl.getUniformLocation(this.program, "uNormalMatrix");

	    }

	}

	module.exports = Material;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\r\nattribute vec3 aVertexPosition;\r\nattribute vec3 aNormalPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat4 uMVMatrix;\r\nuniform mat4 uPMatrix;\r\n//uniform mat4 uNormalMatrix;\r\n\r\n//varying vec3 vNormal;\r\nvarying vec3 vPosition;\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void) {\r\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\r\n    //vec4 unprojectedPosition = uMVMatrix * vec4(aVertexPosition, 1);\r\n    //vNormal = vec3(uNormalMatrix * vec4(aNormalPosition, 0));\r\n    vTextureCoord = aTextureCoord;\r\n}"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform vec2 uTextureTiling;\r\n\r\n//precision mediump float;\r\n//precision mediump int;\r\n//\r\n//uniform vec3 u_lightColor;\r\n//uniform vec3 u_lightDir;\r\n//uniform vec3 u_lightPos;\r\n//uniform vec3 u_viewPos;\r\n//uniform vec3 u_diffuseColor;\r\n//uniform float u_roughness;\r\n//uniform float u_fresnel;\r\n//uniform float u_alpha;\r\n//uniform vec3 u_ambientColor;\r\n//uniform samplerCube u_tCube;\r\n//uniform float u_time;\r\n//varying vec4 vPosition;\r\n//varying vec3 vViewPosition;\r\n//varying vec4 vNormal;\r\n//varying vec3 vViewNormal;\r\n//varying vec2 vUv;\r\n//\r\n//#define M_PI 3.1415926535897932384626433832795\r\n//\r\n//float dotClamped(vec3 a, vec3 b) {\r\n//    return max(dot(a,b), 0.0);\r\n//}\r\n//\r\n//float F(float f0, vec3 l, vec3 h) {\r\n//    float LoH = dot(l,h);\r\n//    float powTerm = (-5.55473 * LoH - 6.98316) * LoH;\r\n//    return f0 + (1.0 - f0) * pow(2.0, powTerm);\r\n//}\r\n//\r\n//float N(float a, vec3 n, vec3 h, float NoH) {\r\n//    float a2 = a*a;\r\n//    return a2 / (4.0 * pow(pow(NoH, 2.0) * (a2 - 1.0) + 1.0, 2.0));\r\n//}\r\n//\r\n//float G(float a, vec3 l, vec3 v, vec3 h, vec3 n, float NoL, float NoV) {\r\n//    float VdotH = max(dot(v,h), 0.0);\r\n//    float NdotH = max(dot(n,h), 0.0);\r\n//    float minV = 2.0 * NdotH * min(NoV, NoL) / VdotH;\r\n//    return min(1.0, minV);\r\n//}\r\n\r\nvoid main(void) {\r\n    vec2 texCoord = vTextureCoord * uTextureTiling;\r\n    vec4 albedo = texture2D(uSampler, texCoord);\r\n    gl_FragColor = albedo;\r\n}\r\n\r\n//param, normal dist, shadowing, main"

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {
		"meshes": [
			{
				"indices": [
					0,
					2,
					3,
					0,
					3,
					1,
					8,
					4,
					5,
					8,
					5,
					9,
					10,
					6,
					7,
					10,
					7,
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
					0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					0.5,
					0.5,
					0.5,
					-0.5,
					0.5,
					0.5,
					0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					-0.5,
					-0.5,
					-0.5,
					0.5,
					0.5,
					0.5,
					-0.5,
					0.5,
					0.5,
					0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					-0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					0.5,
					0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					-0.5,
					-0.5,
					0.5,
					-0.5,
					-0.5,
					0.5,
					0.5,
					-0.5,
					0.5,
					0.5,
					0.5,
					0.5,
					-0.5,
					0.5
				],
				"uvs": [
					0,
					0,
					1,
					0,
					0,
					1,
					1,
					1,
					0,
					1,
					1,
					1,
					0,
					1,
					1,
					1,
					0,
					0,
					1,
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					0
				],
				"normals": [
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					0,
					-1,
					0,
					0,
					-1,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					0,
					-1,
					0,
					0,
					-1,
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
					1,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					0
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
				"indices": [
					0,
					1,
					2,
					1,
					0,
					3
				],
				"vertices": [
					-0.5,
					-0.5,
					-3.061617e-17,
					0.5,
					0.5,
					3.061617e-17,
					0.5,
					-0.5,
					-3.061617e-17,
					-0.5,
					0.5,
					3.061617e-17
				],
				"uvs": [
					0,
					0,
					1,
					1,
					1,
					0,
					0,
					1
				],
				"normals": [
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
					-1
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
/* 32 */
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

/***/ },
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
/***/ function(module, exports) {

	module.exports = {
		"textures": [
			{
				"id": "ball.tex",
				"path": "./textures/bowling ball.png"
			}
		]
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	const SceneObject = __webpack_require__(14);
	const ResourceManager = __webpack_require__(23);
	const vec3 = __webpack_require__(4).vec3;
	const Physics = __webpack_require__(36);

	module.exports = {
	    load: function () {

	        const physicsWorld = new Physics.World();
	        physicsWorld.gravity.set(0, -9.82, 0);

	        // physicsWorld.broadphase = new Physics.NaiveBroadphase();
	        // physicsWorld.solver.iterations = 5;
	        // physicsWorld.defaultContactMaterial.contactEquationStiffness = 1e6;
	        // physicsWorld.defaultContactMaterial.contactEquationRelaxation = 10;

	        var root = new SceneObject();

	        var alley = new SceneObject(root);
	        alley.model = ResourceManager.getModel("cube.json");
	        alley.material = ResourceManager.getMaterial("default");
	        alley.scale = vec3.fromValues(5, 0.2, 25);
	        alley.rigidBody = new Physics.Body({
	            mass: 0,// mass == 0 makes the body static
	            shape: new Physics.Box(new Physics.Vec3(2.5, 0.1, 12)),
	            position: new Physics.Vec3(0, -0.5, 0) //need this collider lower than its mesh
	        });
	        alley.rigidBody.test = true;

	        var ball = new SceneObject(root);
	        ball.setPosition(0, 1.5, 12);
	        ball.model = ResourceManager.getModel("sphere.json");
	        ball.material = ResourceManager.getMaterial("ball.mat");
	        ball.rigidBody = new Physics.Body({
	            mass: 2.5, // kg
	            position: new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]),
	            shape: new Physics.Sphere(1)
	        });

	        physicsWorld.addBody(ball.rigidBody);
	        physicsWorld.addBody(alley.rigidBody);
	        ball.rigidBody.linearDamping = 0.25;

	        window.push = function() {
	            var world = new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]);
	            ball.rigidBody.applyImpulse(new Physics.Vec3(0, 0, -100), world);//new Physics.Vec3(0, 0.5, 15));
	        };
	        var pinPositions = [
	            [-0.4, 0.15, -10.5],
	            [0.4, 0.15, -10.5],
	            [1.2, 0.15, -10.5],
	            [-1.2, 0.15, -10.5],
	            [0, 0.15, -9.5],
	            [-0.9, 0.15, -9.5],
	            [0.9, 0.15, -9.5],
	            [0.5, 0.15, -8.5],
	            [-0.5, 0.15, -8.5],
	            [0, 1, -7.5]
	        ];

	        for (var i = 0; i < 10; i++) {
	            var pin = new SceneObject(root);
	            pin.model = ResourceManager.getModel("pin.json");
	            pin.material = ResourceManager.getMaterial("pin.mat");
	            pin.setPosition(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]);
	            pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
	            pin.rigidBody = new Physics.Body({
	                mass: 1,
	                position: new Physics.Vec3(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]),
	                shape: new Physics.Cylinder(0.4, 0.4, 2, 5) //todo this aint right, cant visualize it
	            });
	            physicsWorld.addBody(pin.rigidBody);
	        }


	        return {root, physicsWorld };
	    }
	};



/***/ },
/* 36 */
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
/* 37 */
/***/ function(module, exports) {

	

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {
	    clamp: function clamp(input, min, max) {
	        if (input < min) input = min;
	        if (input > max) input = max;
	        return input;
	    }
	};

/***/ },
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	const ScoreKeeper = __webpack_require__(42);
	const PlayerStats = __webpack_require__(40);

	class Player {

	    constructor(name) {
	        this.name = name;
	        this.stats = new PlayerStats();
	        this.scoreKeeper = new ScoreKeeper();
	    }

	}

	module.exports = Player;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	const ScoreFrame = __webpack_require__(43);

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
/* 43 */
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
/* 44 */
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
/* 45 */
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

/***/ }
]);