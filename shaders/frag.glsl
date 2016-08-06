precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 uTextureTiling;

void main(void) {
    vec2 texCoord = vTextureCoord * uTextureTiling;
    gl_FragColor = texture2D(uSampler, texCoord);
}