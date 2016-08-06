
attribute vec3 aVertexPosition;
attribute vec3 aNormalPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
//uniform mat4 uNormalMatrix;

//varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vTextureCoord;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    //vec4 unprojectedPosition = uMVMatrix * vec4(aVertexPosition, 1);
    //vNormal = vec3(uNormalMatrix * vec4(aNormalPosition, 0));
    vTextureCoord = aTextureCoord;
}