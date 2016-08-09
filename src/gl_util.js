//Utility class for working with webgl constructs
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

    //setup the canvas and get the rending context
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
            alert("Could not initialize WebGL, try a different browser dude!");
        }
    }

    //make a webgl shader from source
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

    //compile a shader
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

    //setup textures, flip the y values, generate mip maps, and setup texture wrapping and filtering
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